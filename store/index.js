export const state = () => ({
  switchValue: false
});

export const mutations = {
  SET_SWITCH(state, value) {
    state.switchValue = value;
  }
};
