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

      <v-list-item-content>
        <v-list-item-title>授業形態</v-list-item-title>
        <v-divider />
      </v-list-item-content>

      <v-list-item v-for="method in methods">
        <template v-slot:default="{active}">
          <v-list-item-action>
            <v-checkbox
              v-model="selectedMethods"
              :value="method.method"
              @change="methodSelected"
            />
          </v-list-item-action>
          <v-img
            max-width="30"
            max-height="30"
            :src="method.iconName"
            class="mr-5"
          />

          <v-list-item-title>
            {{method.name}}
          </v-list-item-title>
        </template>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Fields, FieldTexts, MethodTexts} from "~/components/Navigation/Constants";


@Component
export default class SearchNav extends  Vue{
  @Prop({type: Boolean, required: true})
  rightDrawer!: boolean;

  @Prop({type: Array, required: true})
  initFields!: string[];

  @Prop({type: Array, required: true})
  initMethods!: string[];

  @Prop({type: Function})
  fieldUpdated!: (fields: string[]) => void;

  @Prop({type: Function})
  methodUpdated!: (methods: string[]) => void;

  selectedField: string[] = [];
  selectedMethods: string[] = [];

  mounted(){
    this.selectedField = this.initFields;
    this.selectedMethods = this.initMethods;
  }

  fieldSelected(){
    this.fieldUpdated(this.selectedField);
  }

  methodSelected(){
    this.methodUpdated(this.selectedMethods);
  }

  get fields(){
    return FieldTexts;
  }

  get methods(){
    return MethodTexts;
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
