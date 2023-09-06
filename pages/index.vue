<template>
  <div>
    <v-container class="fill-height">
      <!--PC画面用 -->
      <v-row v-for="(row, i) in showingSyllabuses" class="fill-height" v-show="!$vuetify.breakpoint.mobile">
        <v-col v-for="(cols, j) in row">
          <v-card class="pa-2 fill-height">
            <v-container>
              <v-row class="mb-2 pa-2">
                <v-col class="text-h5">{{order2str(i,j)}}</v-col>
              </v-row>

              <div v-for="(col, t) in cols.subjects" :key="t">
                <SyllabusCard class="ma-2" :syllabus="col" v-show="!listView"/>
                <li class="li-subject py-1" @click="showModal(col)" v-show="listView">{{ col.subject_name }}</li>
              </div>

            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <!--スマホ画面用-->

      <v-tabs-items v-model="tab" v-show="$vuetify.breakpoint.mobile">
        <v-tab-item
          v-for="day in days"
          :key="day"
        >
          <v-row v-for="(row, i) in showingSyllabuses" class="row-filled">
            <v-col cols="12">
              <v-card>
                <v-container>
                  <v-row>
                    <v-col class="text-day-period my-3">{{order2str(i, dayDict[day])}}</v-col>
                  </v-row>
                  <div v-for="(col, t) in row[dayDict[day]].subjects" :key="t">
                    <SyllabusCard class="ma-2" :syllabus="col" v-show="!listView"/>
                    <li class="li-subject py-1" @click="showModal(col)" v-show="listView">{{ col.subject_name }}</li>
                  </div>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>


    </v-container>
    <!-- 絞り込み用-->
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
      :init-methods="availableMethods"
      :init-terms="availableTerms"
      :init-giga="availableGigas"
      :field-updated="fieldUpdated"
      :method-updated="methodUpdated"
      :term-updated="termUpdated"
      :giga-updated="gigaUpdated"
      @window="controlMenu"
    />

<!--    <v-footer fixed v-show="$vuetify.breakpoint.mobile">-->
<!--      <v-card width="100%" flat>-->
        <v-tabs grow v-model="tab" centered class="foot-tab" v-show="$vuetify.breakpoint.mobile">
          <v-tab
            v-for="day in days"
            :key="day"
            width="10px"
          >
            {{day}}
          </v-tab>
        </v-tabs>
<!--      </v-card>-->
<!--    </v-footer>-->
    <modal name="syllabus-card-modal" :adaptive="true" class="card-modal">
      <SyllabusCardModal :syllabus="selectedSubject" />
    </modal>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {get_order, parseOrder} from "./Tools"
import {Subject} from "~/pages/Types";
import SyllabusCard from "~/components/SyllabusCard/SyllabusCard.vue";
import SyllabusCardModal from "~/components/SyllabusCardModal/SyllabusCardModal.vue";
import SearchNav from "~/components/Navigation/SearchNav.vue";
import {Fields, Giga, Method, Term} from "~/components/Navigation/Constants";
@Component({
  components: {SearchNav, SyllabusCard, SyllabusCardModal}
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

  availableMethods: string[] = [
    Method.LIVE,
    Method.ON_DEMAND,
    Method.OFF_LINE
  ]

  availableTerms: string[] = [
    Term.FULL,
    Term.UPPER,
    Term.LOWER
  ]

  availableGigas: string[] = [
    Giga.GIGA,
    Giga.N_GIGA
  ]

  days: string[] = ["月", "火", "水", "木", "金"]
  dayDict: {[key: string]: number} = {
    "月": 0,
    "火": 1,
    "水": 2,
    "木": 3,
    "金": 4
  }
  tab = this.days[0];

  selectedSubject: Subject = {} as Subject;

  get listView() {
    return this.$store.state.listView;
  }

  controlMenu(newVal:boolean){
    this.showMenu = newVal;
  }

  created(){
    this.syllabuses = []

    const file_raw = require("~/assets/result.json")
    for(const i in file_raw){
      const raw_data = file_raw[i]

      if(raw_data["schedules"].length < 1)
        continue;

      if(raw_data["year"] !== 2023)
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

  methodUpdated(methods: string[]){
    this.availableMethods = methods;
    this.processAvailable();
  }

  termUpdated(terms: string[]){
    this.availableTerms = terms;
    this.processAvailable();
  }

  gigaUpdated(gigas: string[]){
    this.availableGigas = gigas;
    this.processAvailable();
  }


  processAvailable(){
    // fields
    const useOther = this.availableFields.indexOf(Fields.OTHER) >= 0;
    const checkField = (f: string) => {
      if(useOther && Object.values(Fields).indexOf(f) === -1)
        return true
      return this.availableFields.indexOf(f) >= 0;
    }

    let syllabuses: Subject[] = this.syllabuses;
    console.log(syllabuses);

    syllabuses = syllabuses.filter(syllabus =>
      checkField(syllabus.field)
    );

    console.log(syllabuses);

    // method
    syllabuses = syllabuses.filter(syllabus => this.availableMethods.indexOf(syllabus.method) >= 0);
    console.log(syllabuses);

    //term
    syllabuses = syllabuses.filter(syllabuses => this.availableTerms.indexOf(syllabuses.term) >= 0);
    console.log(syllabuses);

    //giga
    syllabuses = syllabuses.filter(
      syllabus => {
        if(this.availableGigas.indexOf(Giga.GIGA) >= 0 && syllabus.is_giga){
          return true;
        }
        if(this.availableGigas.indexOf(Giga.N_GIGA) >= 0 && !syllabus.is_giga){
          return true;
        }
        return false;
      }
    )
    console.log(syllabuses);

    this.showSyllabuses(syllabuses);
  }
  showModal(syllabus: Subject){
    this.selectedSubject = syllabus;
    this.$modal.show("syllabus-card-modal");
  }
}
</script>

<style scoped>

.button-filter {
  position: fixed;
  bottom: 10vh;
  right: 3vw;
}

.foot-tab {
  position: fixed;
  bottom: 0;
  width: 100%;
  right: 0;
}
.row-filled{
  width: 95vw;
}
.li-subject {
  list-style: none;
  border-bottom: 1px solid #383838;
  cursor: pointer;
  font-size: 0.9rem;
}
.li-subject:hover {
  opacity: 0.8;
}
.text-day-period {
  font-size: 1.2em;
  font-weight: bold;
}
.card-modal >>> .vm--modal  {
  background: #121212; /* 微妙にモーダルの四隅が白抜きされてしまうので色を合わせて修正 */
}

</style>
