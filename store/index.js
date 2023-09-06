export const state = () => ({
  listView: false
});
export const mutations = {
  setListView(state, value) {
    state.listView = value;
  }
};
