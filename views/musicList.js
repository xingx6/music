import { musicListObject, showMusicListType, musicListfilterSize } from "../data/index.js";
import { addTip } from "./tip.js";
const { ref } = Vue;

const VMusicList = {
  setup() {
    /** 
     * @param {string} name
     * @param {string} atrist
     */
    const copyMusicName = (name, atrist) => {
      let text = `点歌 ${name} ${atrist}`;
      if (text.length > 20) {
        text = `点歌 ${name.slice(0, 17)}`;
      }

      addTip("copy " + text.slice(3));
      navigator.clipboard.writeText(text.trimEnd()).then(() => { });
    };

    const currentIndex = ref();
    const updateCurrentIndex = (value) => {
      if (currentIndex.value === value) {
        currentIndex.value = undefined;
        return;
      }
      currentIndex.value = value;
    };
    return {
      musicListObject,
      show: showMusicListType,
      currentIndex,
      copyMusicName,
      updateCurrentIndex
    };
  },
  template: `
  <article class="music-list-box">
    <ul class="music-list">
      <li>
        <p>曲名</p>
        <p>歌手</p>
        <p>分类</p>
        <p>描述</p>
      </li>
      <template v-for="(value) in musicListObject">
        <li class="list-item-visibility" v-for="(item,index) of value" :class="{ 'current':item === currentIndex,'display-none':!(item.isShow && ( show.category === 'ALL' || show.category === item.category)) }"
         @click="updateCurrentIndex(item)">
          <p>
            <div class="copy" @click.stop="copyMusicName(item._name,item._atrist)">
              <svg t="1708630215853" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1011" width="28" height="28">
                <path d="M441.47 601.04999999h186.18v59.22H441.47zM441.47 735.03999999h280.56v59.22H441.47z" p-id="1012"></path><path d="M685.92 281.94999999c-0.62-0.65-1.27-1.25-1.93-1.84l-6.85-7.18h-9.52a29.56 29.56 0 0 0-6.31 0h-59.93l1.81-1.73-86.3-90.62H221.06a60.21 60.21 0 0 0-60.15 60.15V806.09999999a60.21 60.21 0 0 0 60.15 60.15h100.11v32.2a60.21 60.21 0 0 0 60.15 60.15h440.82a60.21 60.21 0 0 0 60.15-60.15V487.99999999L746.8 345.99999999z m93.95 184.69l-92.81-4.54a0.85 0.85 0 0 1-0.6-0.93l4.25-88.22 12.61 13.22zM221.06 806.99999999a1 1 0 0 1-0.93-0.93V240.72999999a1 1 0 0 1 0.93-0.93h270.45l31.55 33.13H381.32a60.21 60.21 0 0 0-60.15 60.15V806.99999999z m601.09 92.35H381.32a1 1 0 0 1-0.93-0.93V333.07999999a1 1 0 0 1 0.93-0.93h252.07l-6.08 126.27v0.12c-1.46 33.12 24.17 61.25 57 62.71L823.07 527.99999999v370.45a1 1 0 0 1-0.93 0.93z" p-id="1013"></path>
              </svg>
            </div>
            <div>
              <div v-html="item.name"></div>
              <div class="alia" v-html="item.alia"></div>
            </div>
          </p>
          <p v-html="item.atrist"></p>
          <p>{{ item.category }}</p>
          <p v-html="item.describe"></p>
          </li>
      </template>
    </ul>
  </article>
  `
};

export default VMusicList;