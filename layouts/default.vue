<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      hide-on-scroll
    >
      <v-list-item-title>科目検索.死ぬ.com</v-list-item-title>
      <v-switch v-model="switchValue" label="リスト表示" class="switch-list" inset hide-details></v-switch>
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
import { mapState, mapMutations } from 'vuex';
import {Component, Vue} from "nuxt-property-decorator";
import SearchNav from "~/components/Navigation/SearchNav.vue";
@Component({
  components: {SearchNav},
  computed: {
    ...mapState(['switchValue'])
  },
  methods: {
    ...mapMutations(['SET_SWITCH'])
  },
  watch: {
    switchValue: {
      handler(newValue: boolean) {
        this.SET_SWITCH(newValue);
      },
      immediate: true
    }
  }
})
export default class DefaultLayout extends Vue{
  SET_SWITCH!: (value: boolean) => void;
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
