<template>
    <v-card width="600px" height="300px" outlined variant="tonal">
      <v-container fill-height>
        <v-row>
          <v-col class="title_text">{{syllabus.subject_name}}</v-col>
        </v-row>
        <v-row>
          <v-col class="little_text">
            {{teachers}}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="little_text">
            開講場所: {{syllabus.place}}
          </v-col>
        </v-row>
        <v-row class="icons">
          <v-col xl="2" lg="4">
            <v-img max-height="30px" max-width="30px" :src="fieldImg" />
          </v-col>
          <v-col xl="2" lg="4n">
            <v-img max-width="30px" max-height="30px" :src="methodImg" />
          </v-col>
          <v-col xl="2" lg="4" v-if="syllabus.term !== '通期'">
            <v-img max-width="30px" max-height="30px" :src="termImg" />
          </v-col>
          <v-col xl="2" lg="4" v-if="syllabus.is_giga">
            <v-img max-width="30px" max-height="30px" :src="gigaImg" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="link_to_syllabus" align="center">
            <v-btn color="primary" @click="toSyllabus">シラバスを見る</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </template>
  
  <script lang="ts">
  import {Component, Prop, Vue} from "nuxt-property-decorator";
  import {Subject} from "@/pages/Types"
  import {fieldIcon, giga_icon, methodIcon, termIcon} from "~/pages/Tools";
  
  @Component
  export default class SyllabusCardModal extends Vue{
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
  
    get gigaImg(){
      return giga_icon;
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
    font-size: 1.3em;
    font-weight: bold;
  }
  
  .little_text{
    font-size: 0.9em;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  @media screen and (max-width: 600px) {
    .title_text {
      font-size: 1.1em;
    }
    .little_text{
      font-size: 0.8em;
    }
  }
  </style>
  