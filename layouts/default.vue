<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      hide-on-scroll
    >
      <v-list-item-title>科目検索.死ぬ.com</v-list-item-title>
      <v-switch v-model="listView" label="リスト表示" class="switch-list" inset hide-details></v-switch>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
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
import { Component, Vue, Watch } from "nuxt-property-decorator";
import SearchNav from "~/components/Navigation/SearchNav.vue";

@Component({
  components: {SearchNav}
})
export default class DefaultLayout extends Vue{
  listView = false;
  @Watch('listView')
  onSwitchValueChange() {
    this.$store.commit('setListView', this.listView);
  }
}
</script>

<style scoped>
  .switch-list {
    min-width: 150px;
  }
  .switch-list >>> .v-label {
    font-size: 0.9rem;
  }
</style>
