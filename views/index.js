import VMusicList from "./musicList.js";
import VSearch from "./search.js";
import Vtip from "./tip.js";

const { createApp } = Vue;

const App = {
  components: {
    VSearch,
    VMusicList,
    Vtip
  },
  setup() {
  },

  template: `
    <section class="user-info">
      <img src="./assets/userImg.jpg" alt="userImg">
      <p>花青Tsuki</p>
      <p>似此星辰非昨夜</p>
      <p>点击歌名复制</p>
    </section>
    <VSearch />
    <VMusicList />
    <Vtip />
  `
};

export const init = () => {
  createApp(App).mount('.app');
};