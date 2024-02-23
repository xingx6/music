import VMusicList from "./musicList.js";
import VSearch from "./search.js";
import VTip from "./tip.js";

const { createApp } = Vue;

const App = {
  components: {
    VSearch,
    VMusicList,
    VTip
  },
  setup() {
  },

  template: `
  <section class="user-info">
    <img src="./assets/userImg.jpg" alt="userImg">
    <div>
      <p>星星_Singer</p>
      <p class="info-introduction">温柔，治愈，实力歌势</p>
    </div>
  </section>
  <VSearch />
  <VMusicList />
  <VTip />
  `
};

export const init = () => {
  createApp(App).mount('.app');
};