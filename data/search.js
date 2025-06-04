/** @typedef {import("./types.js").Music} Music */

/** @type {{songList:Music[],categorys:string[],langs:string[]}} */
export const search = (musicListObject) => {
  const musicList = initMusicListData(musicListObject);
  /** @type {Music[]} */
  let searchResults = [];
  /**
   * @param {string} searchText
   */
  return (searchText) => {
    if (searchResults[0]) {
      searchResults.forEach((p) => {
        p.name = p._name;
        p.atrist = p._atrist;
        p.alia = p._alia;
        p.describe = p._describe;
      });
      searchResults = [];
    }
    if (!searchText) {
      musicList.forEach(p => p.isShow = true);
      return;
    };

    musicList.forEach((p) => {
      if (p.name.includes(searchText) || p.atrist.includes(searchText)) {
        p.name = replaceText(p.name, searchText);
        p.atrist = replaceText(p.atrist, searchText);
        p.isShow = true;
        searchResults.push(p);
      } else {
        p.isShow = false;
      }
    });
  };
};
/**
 * @param {Record<string,Music[]>} musicListObject 
 * @returns {Music[]}
 */
const initMusicListData = (musicListObject) => {
  const result = musicListObject.songList;
  result.forEach((p) => {
    p.isShow = true;
    p._name = p.name;
    p._atrist = p.atrist;
    p._alia = p.alia;
    p._describe = p.describe;
  });

  return result;
};

/** 
 * @param {string} value 
 * @param {string} text 
 */
const replaceText = (value, text) => {
  return value.replace(text, `<span class=\"text-highlight\">${text}</span>`);
};