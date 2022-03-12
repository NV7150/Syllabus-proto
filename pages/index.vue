<template>
  <v-container>
    <v-row v-for="(row, i) in showingSyllabuses">
      <v-col v-for="(cols, j) in row">
        <v-card class="pa-2">
          <v-container>
             <v-row>
               <v-col>{{order2str(i,j)}}</v-col>
             </v-row>

            <div v-for="col in cols.subjects">
              <SyllabusCard class="ma-2" :syllabus="col" />
            </div>

          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      fab
      dark
      big
      class="button-filter blue darken-2"
      @click="() => {controlMenu(true)}"
    >
      <v-icon>mdi-filter</v-icon>
    </v-btn>

    <SearchNav
      :right-drawer="showMenu"
      :init-fields="availableFields"
      :field-updated="fieldUpdated"
      @window="controlMenu"
    />
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {get_order, parseOrder} from "./Tools"
import {Subject} from "~/pages/Types";
import SyllabusCard from "~/components/SyllabusCard/SyllabusCard.vue";
import SearchNav from "~/components/Navigation/SearchNav.vue";
import {Fields} from "~/components/Navigation/Constants";
@Component({
  components: {SearchNav, SyllabusCard}
})
export default class Index extends Vue{
  // 時限->曜日
  showingSyllabuses?: {
    subjects: Subject[]
  }[][]
  syllabuses: Subject[] = [];

  showMenu: boolean = false;

  availableFields: string[] = [
    Fields.GENERAL,
    Fields.DS1,
    Fields.DS2,
    Fields.OTHER,
    Fields.INFO_ENV,
    Fields.POLICY_MAN,
    Fields.SHARED
  ];

  controlMenu(newVal:boolean){
    this.showMenu = newVal;
  }

  created(){
    this.syllabuses = []

    const file_raw = require("@/assets/result.json")
    for(const i in file_raw){
      const raw_data = file_raw[i]

      if(raw_data["schedules"].length < 1)
        continue;

      if(raw_data["year"] !== 2022)
        continue;

      const schedules = raw_data["schedules"];
      for(const j in schedules){
        const orders = get_order(raw_data["schedules"][j]["day"], raw_data["schedules"][j]["period"])

        if(orders[0] === -1 || orders[0] === -1){
          continue
        }

        if(raw_data["fields"][0]["faculty"] !== "総合政策・環境情報学部")
          continue

        const staffs = []
        for(const j in raw_data["staffs"]){
          staffs.push(raw_data["staffs"][j]["staff_name"])
        }

        const data: Subject = {
          subject_name: raw_data["subject_name"],
          term: raw_data["term"],
          url: raw_data["url"],
          field: raw_data["fields"][0]["field"],
          credit: raw_data["fields"][0]["credit"],
          place: raw_data["place"],
          is_giga: raw_data["is_giga"],
          method: raw_data["method"],
          staff: staffs,
          lang: raw_data["lang"],
          day: raw_data["schedules"][j]["day"],
          period: Number(raw_data["schedules"][j]["period"])
        }
        this.syllabuses.push(data)
      }
    }
    this.processAvailable();
  }

  showSyllabuses(syllabuses: Subject[]){
    this.showingSyllabuses = []
    for(let i = 0; i < 7; i++){
      this.showingSyllabuses.push([])
      for(let j = 0; j < 5; j++){
        this.showingSyllabuses[i].push({subjects: []})
      }
    }

    for(const i in syllabuses){
      const syllabus = syllabuses[i];
      const orders = get_order(syllabus.day, syllabus.period);

      if(orders[0] == -1 || orders[1] == -1)
        continue;

      this.showingSyllabuses[orders[1]][orders[0]].subjects.push(syllabus);
    }
  }

  order2str(i: number, j: number){
    return parseOrder(j, i);
  }

  fieldUpdated(fields: string[]){
    this.availableFields = fields;
    this.processAvailable();
  }

  processAvailable(){
    let syllabuses: Subject[] = this.syllabuses;
    console.log(syllabuses[0].field in ["研究プロジェクト科目"])
    syllabuses = syllabuses.filter(syllabus => this.availableFields.indexOf(syllabus.field) >= 0);
    this.showSyllabuses(syllabuses);
  }
}
</script>

<style scoped>
.button-filter{
  position: fixed;
  bottom: 3vh;
  left: 3vw;
}
</style>
