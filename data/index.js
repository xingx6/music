import { MusicListData } from "../assets/list.js";
import { search } from "./search.js";

const { reactive, computed } = Vue;

/** @typedef {import("./types.js").Music} Music */

/** @type {{songList:Music[],categorys:string[],langs:string[]}} */
export const musicListObject = reactive(MusicListData);

/** @type {{type:string;value:string}} */
export const searchvalue = reactive({
  type: "标题",
  value: "",
});
/** @type {{lang:string,category:string}} */
export const showMusicListType = reactive({
  lang: "ALL",
  category: 'ALL'
});

export const searchKey = {
  name: "标题",
  atrist: "歌手",
  describe: "描述",
};
export const musicListfilterSize = (() => {
  const musicList = musicListObject.songList;

  /** @type {{value:{ len: number; musicKey: Record<string,boolean>;}}} */
  const filterSize = computed(() => {
    let newList = musicList;

    const filterSize = (key, value) => {
      newList = newList.filter((p) => {
        if (p[key] === value) return p;
      }, 0);
    };

    if (showMusicListType.lang !== "ALL") {
      filterSize("language", showMusicListType.lang);
    }
    if (showMusicListType.category !== "ALL") {
      filterSize("category", showMusicListType.category);
    }
    filterSize("isShow", true);

    const musicKey = newList.reduce((result, currentValue, index) => {
      result[currentValue.name + currentValue.category] = !(index % 2);
      return result;
    }, {});

    return { len: newList.length, musicKey };
  });

  return { total: musicList.length, filterSize };
})();

export const updateShowMusicList = {
  lang: (lang) => {
    showMusicListType.lang = lang;
  },
  category: (category) => {
    showMusicListType.category = category;
  }
};

export const toSearch = search(musicListObject);