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
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {get_order, parseOrder} from "./Tools"
import {Subject} from "~/pages/Types";
import SyllabusCard from "~/components/SyllabusCard/SyllabusCard.vue";
@Component({
  components: {SyllabusCard}
})
export default class Index extends Vue{
  // 時限->曜日
  showingSyllabuses?: {
    subjects: Subject[]
  }[][]
  syllabuses: Subject[] = [];

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
    this.showSyllabuses(this.syllabuses);
  }

  showSyllabuses(syllabuses: Subject[]){
    this.showingSyllabuses = []
    for(let i = 0; i < 7; i++){
      this.showingSyllabuses.push([])
      for(let j = 0; j < 5; j++){
        this.showingSyllabuses[i].push({subjects: []})
      }
    }
    console.log(this.showingSyllabuses)

    for(const i in syllabuses){
      const syllabus = syllabuses[i];
      const orders = get_order(syllabus.day, syllabus.period);

      if(orders[0] == -1 || orders[1] == -1)
        continue;
      console.log(orders)

      this.showingSyllabuses[orders[1]][orders[0]].subjects.push(syllabus);
    }
  }

  order2str(i: number, j: number){
    return parseOrder(j, i);
  }
}
</script>
