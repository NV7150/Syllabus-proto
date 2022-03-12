<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-list-item-title>科目検索.死ぬ.com</v-list-item-title>
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <SearchNav
      :right-drawer="rightDrawer"
    />
<!--    <v-navigation-drawer-->
<!--      v-model="rightDrawer"-->
<!--      temporary-->
<!--      fixed-->
<!--      right-->
<!--    >-->
<!--      <v-list>-->

<!--      </v-list>-->
<!--    </v-navigation-drawer>-->
  </v-app>
</template>

<script lang="ts">

import {Component, Vue} from "nuxt-property-decorator";
import SearchNav from "~/components/Navigation/SearchNav.vue";
@Component({
  components: {SearchNav}
})
export default class DefaultLayout extends Vue{
  rightDrawer: boolean = false;
}
</script>
