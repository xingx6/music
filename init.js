import { songList } from "./list.js";
export const initMusicList = () => {
  const langKey = {
    "流行": "中文",
    "说唱": "中文",
    "古风": "中文",
    "日文": "日文",
    "英文": "英文",
  };
  const musciList = { songList: [] };

  for (const [key, item] of Object.entries(songList)) {
    const items = item.map((p) => {
      return {
        name: p,
        atrist: "",
        category: key,
        language: langKey[key],
        describe: ""
      };
    });
    musciList.songList.push(...items);
  }
  musciList.categorys = Object.keys(songList);
  musciList.langs = ["中文", "日文", "英文"];
  console.log(musciList);
};