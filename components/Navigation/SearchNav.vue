<template>
  <v-navigation-drawer
    v-model="opened"
    temporary
    fixed
    right
    :width="$vuetify.breakpoint.mobile ? '100vw' : '30vw'"
  >
    <v-toolbar>
      絞り込み
      <v-spacer></v-spacer>
      <v-btn icon @click="() => {this.opened = false;}"> <v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>

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

      <Selections
        title="GIGA対象"
        :selections="gigas"
        :callback="gigaUpdated"
        :initials="initGiga"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Fields, FieldTexts, GigaTexts, MethodTexts, TermTexts} from "~/components/Navigation/Constants";
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

  @Prop({type: Array, required: true})
  initGiga!: string[];

  @Prop({type: Function})
  fieldUpdated!: (fields: string[]) => void;

  @Prop({type: Function})
  methodUpdated!: (methods: string[]) => void;

  @Prop({type: Function})
  termUpdated!: (terms: string[]) => void;

  @Prop({type: Function})
  gigaUpdated!: (giga: string[]) => void;

  get fields(){
    return FieldTexts;
  }

  get methods(){
    return MethodTexts;
  }

  get terms(){
    return TermTexts;
  }

  get gigas(){
    return GigaTexts;
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
