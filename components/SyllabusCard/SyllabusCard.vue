<template>
  <v-card hover @click="toSyllabus" outlined>
    <v-container>
      <v-row>
        <v-col class="title_text">{{syllabus.subject_name}}</v-col>
      </v-row>
      <v-row>
        <v-col class="little_text">
          {{teachers}}
        </v-col>
      </v-row>
      <v-row>
        <v-col xl="2">
          <v-img max-height="30px" max-width="30px" :src="fieldImg" />
        </v-col>
        <v-col xl="2" class="little_text">
          <v-img max-width="30px" max-height="30px" :src="methodImg" />
        </v-col>
        <v-col class="little_text" v-if="syllabus.term !== '通期'">
          <v-img max-width="30px" max-height="30px" :src="termImg" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Subject} from "@/pages/Types"
import {fieldIcon, methodIcon, termIcon} from "~/pages/Tools";

@Component
export default class SyllabusCard extends Vue{
  @Prop({type: Object, required: true})
  syllabus!: Subject;

  toSyllabus(){
    window.open(this.syllabus.url);
  }

  get fieldImg(){
    return fieldIcon(this.syllabus.field);
  }

  get methodImg(){
    return methodIcon(this.syllabus.method);
  }

  get termImg(){
    return termIcon(this.syllabus.term);
  }

  get teachers(){
    let s = ""
    const teachers = this.syllabus.staff;
    for(let i = 0; i < 3 && i < teachers.length; i++){

      s += teachers[i] + ((i === 2 || i === teachers.length - 1) ? "" : ", ");
    }
    if(teachers.length >= 3)
      s += "等"
    return s;
  }
}
</script>

<style scoped>

.title_text {
  font-size: 0.8em;
}

.little_text{
  font-size: 0.5em;
}
</style>
