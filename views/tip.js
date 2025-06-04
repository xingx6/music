const { TransitionGroup, ref } = Vue;

/** @type {{value:string[]}} */
export const tip = ref([]);

/** @param {string} value */
export const addTip = (value) => {
  const existIndex = tip.value.findIndex(p => p === value);
  if (existIndex !== -1) {
    tip.value.splice(existIndex, 1);
  }
  if (tip.value.length > 3) {
    tip.value.pop();
  }
  tip.value.unshift(value);
  removeTip();
};

const removeTip = (() => {
  let timeout = 0;
  return () => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      tip.value.pop();
      if (tip.value.length) {
        removeTip();
      }
    }, 2000);
  };
})();

const VTip = {
  components: {
    TransitionGroup,
  },

  setup() {
    return {
      tip
    };
  },
  template: `
  <main id="tip">
    <TransitionGroup name="tip" tag="ul">
      <li v-for="(p) of tip" class="tip" :key="p">
        <div> {{ p }}</div>
      </li>
    </TransitionGroup>
  </main>
  `
};

export default VTip;