<template>
  <v-navigation-drawer
    v-model="rightDrawer"
    temporary
    fixed
    right
  >
    <v-list>

    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component
export default class SearchNav extends  Vue{
  @Prop({type: Boolean, required: true})
  rightDrawer!: boolean;


}
</script>

<style scoped>

</style>
