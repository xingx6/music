import {
  toSearch, searchvalue, categoryFilter, searchKey,
  updateShowMusicList, musicListfilterSize, showMusicListType
} from "../data/index.js";

const VSearch = {
  setup() {
    const { total, filterSize } = musicListfilterSize;
    const search = () => {
      toSearch(searchvalue.type, searchvalue.value);
    };
    return {
      search,
      searchvalue,
      categoryFilter,
      searchKey,
      updateShowMusicList,
      total,
      filterSize,
      showMusicListType
    };
  },
  template: `
  <article class="search">
    <div class="filter-size" v-if="filterSize.len === total">ALL - {{ filterSize.len }}</div>
    <div class="filter-size" v-else>{{ filterSize.len }} / {{ total }}</div>
    <div class="search-input">
      <input id="search" type="search" value="" required  @keyup.enter="search" v-model="searchvalue.value">
      <label>search</label>
    </div>
    <div class="button search-button" @click="search">搜索</div>
    <ul class="filter-type">
      <li v-for="p of categoryFilter" @click="updateShowMusicList.category(p)" class="button" :class="{'text-highlight':p===showMusicListType.category}">{{p}}</li>
    </ul>
  </article>
  `
};

export default VSearch;