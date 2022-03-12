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

      <Selections
        title="分野"
        :selections="fields"
        :callback="fieldUpdated"
        :initials="initFields"
      />

      <Selections
        title="授業形態"
        :initials="initMethods"
        :callback="methodUpdated"
        :selections="methods"
      />

      <Selections
        title="期間"
        :selections="terms"
        :callback="termUpdated"
        :initials="initTerms"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Fields, FieldTexts, MethodTexts, TermTexts} from "~/components/Navigation/Constants";
import Selections from "~/components/Navigation/Selections.vue";
@Component({
  components: {Selections}
})
export default class SearchNav extends  Vue{
  @Prop({type: Boolean, required: true})
  rightDrawer!: boolean;

  @Prop({type: Array, required: true})
  initFields!: string[];

  @Prop({type: Array, required: true})
  initMethods!: string[];

  @Prop({type: Array, required: true})
  initTerms!: string[];

  @Prop({type: Function})
  fieldUpdated!: (fields: string[]) => void;

  @Prop({type: Function})
  methodUpdated!: (methods: string[]) => void;

  @Prop({type: Function})
  termUpdated!: (terms: string[]) => void;

  selectedField: string[] = [];
  selectedMethods: string[] = [];
  selectedTerms: string[] = [];

  mounted(){
    this.selectedField = this.initFields;
    this.selectedMethods = this.initMethods;
  }

  get fields(){
    return FieldTexts;
  }

  get methods(){
    return MethodTexts;
  }

  get terms(){
    return TermTexts;
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
