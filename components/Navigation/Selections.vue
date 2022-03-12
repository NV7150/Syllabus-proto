<template>
  <div>
    <v-list-item-content>
      <v-list-item-title>{{title}}</v-list-item-title>
      <v-divider />
    </v-list-item-content>

    <v-list-item v-for="selection in selections">
      <template v-slot:default="{active}">
        <v-list-item-action>
          <v-checkbox
            v-model="selectedItems"
            :value="selection.key"
            @change="selected"
          />
        </v-list-item-action>
        <v-img
          max-width="30"
          max-height="30"
          :src="selection.iconName"
          class="mr-5"
        />

        <v-list-item-title>
          {{selection.name}}
        </v-list-item-title>
      </template>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Selection} from "~/components/Navigation/Constants";

@Component
export default class Selections extends Vue{
  @Prop({type: Array, required: true})
  selections!: Selection[];

  @Prop({type: Array, default: []})
  initials!: string[];

  @Prop({type: Function})
  callback!: (selections: string[]) => void;

  @Prop({type: String, required: true})
  title!: string;

  selectedItems: string[] = [];

  mounted(){
    this.selectedItems = this.initials;
  }

  selected(){
    this.callback(this.selectedItems);
  }
}
</script>

<style scoped>

</style>
