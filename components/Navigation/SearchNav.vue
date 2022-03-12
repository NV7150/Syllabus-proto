<template>
  <v-navigation-drawer
    v-model="opened"
    temporary
    fixed
    width="30vw"
  >
    <v-list
      nav
      dense
      permanent
    >
      <v-list-item-content>
        <v-list-item-title>分野</v-list-item-title>
        <v-divider />
      </v-list-item-content>

      <v-list-item v-for="field in fields">
        <template v-slot:default="{active}">
          <v-list-item-action>
            <v-checkbox
              v-model="selectedField"
              :value="field.field"
              @change="fieldSelected"
            />
          </v-list-item-action>
          <v-img
            max-width="30"
            max-height="30"
            :src="field.iconName"
            class="mr-5"
          />

          <v-list-item-title>
            {{field.name}}
          </v-list-item-title>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Fields, FieldTexts} from "~/components/Navigation/Constants";


@Component
export default class SearchNav extends  Vue{
  @Prop({type: Boolean, required: true})
  rightDrawer!: boolean;

  @Prop({type: Array, required: true})
  initFields!: string[];

  @Prop({type: Function})
  fieldUpdated!: (fields: string[]) => void;

  selectedField: string[] = [];

  mounted(){
    this.selectedField = this.initFields;
  }

  fieldSelected(){
    this.fieldUpdated(this.selectedField);
  }

  get fields(){
    return FieldTexts;
  }

  get opened(){
    return this.rightDrawer;
  }

  set opened(newVal){
    this.$emit("window", newVal);
  }

}
</script>

<style scoped>

</style>
