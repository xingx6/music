import { txt } from "./2.js";
export const initList = () => {
  const musicList = txt.split("\n\n");
  const newMusicList = {
    "日语": [],
    "汉语": []
  };
  musicList[0].replaceAll("(", "（").split("\n").forEach(p => {
    const name = p.split(".")[1];
    const alia = name.includes("（") ? name.split("（")[1].slice(0, -1) : "";
    newMusicList["日语"].push({
      name: name.trim().split("（")[0],
      atrist: "",
      language: "日语",
      describe: "",
      alia
    });
  });
  musicList[1].split("\n").forEach(p => {
    const name = p.split(".")[1];
    newMusicList["汉语"].push({
      name: name.trim(),
      atrist: "",
      language: "汉语",
      describe: "",
      alia: ""
    });
  });
  console.log(newMusicList);
};