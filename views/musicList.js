import { musicListObject, showMusicListType, musicListfilterSize } from "../data/index.js";
import { addTip } from "./tip.js";

const { ref } = Vue;
/** @typedef {import("../data/types.js").Music} Music */

const VMusicList = {
  setup() {
    const { filterSize } = musicListfilterSize;
    /** 
    * @param {string} name
    * @param {string} atrist
    */
    const copyMusicName = (name, atrist) => {
      let text = `点歌 ${name}`;
      if (atrist) text += ` ${atrist}`;

      navigator.clipboard.writeText(text).catch(() => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      });
      addTip("已复制 " + text.slice(3));
    };

    const currentIndex = ref();

    /**
     * @param {Music} value 
     */
    const isShow = (value) => {
      return value.isShow && (showMusicListType.lang === "ALL" || showMusicListType.lang === value.language) && (showMusicListType.category === "ALL" || showMusicListType.category === value.category);
    };
    return {
      musicListObject,
      show: showMusicListType,
      currentIndex,
      filterSize,
      copyMusicName,
      isShow,
      musicListfilterSize
    };
  },
  template: `
  <table class="song-list">
    <thead>
      <tr>
        <th>标题</th>
        <th>歌手</th>
        <th>类别</th>
        <th>语言</th>
        <th>描述</th>
      </tr>
    </thead>
    <tbody>
      <tr @click="currentIndex = index" v-for="(item,index) of musicListObject.songList" :class="{ show: isShow(item),odd:filterSize.musicKey[item.name+item.category], selected: index === currentIndex }">
        <td>
          <div :title="item._name" @click="copyMusicName(item._name, item._atrist)" v-html="item.name"></div>
        </td>
        <td>
          <div :title="item._atrist" v-html="item.atrist"></div>
        </td>
        <td>{{ item.category }}</td>
        <td>{{ item.language }}</td>
        <td v-html="item.describe"></td>
        </tr>
    </tbody>
  </table>
  `
};

export default VMusicList;