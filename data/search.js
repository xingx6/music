/** @typedef {import("./types.js").MusicList} MusicList */

/**
 * @param {Record<string,MusicList[]>} musicListObject 
 */
export const search = (musicListObject) => {
  const musicList = initMusicListData(musicListObject);
  /** @type {MusicList[]} */
  let searchResults = [];
  /**
   * @param {"name"|"atrist"|"describe"} key
   * @param {string} searchText
   */
  return (key, searchText) => {
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
      if (p[key] && p[key].includes(searchText)) {
        p[`_${key}`] = p[key];
        p[key] = replaceText(p[key], searchText);
        p.isShow = true;
        searchResults.push(p);
      } else {
        p.isShow = false;
      }
    });
  };
};
/**
 * @param {Record<string,MusicList[]>} musicListObject 
 */
const initMusicListData = (musicListObject) => {
  const result = Object.values(musicListObject).flat(1);
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