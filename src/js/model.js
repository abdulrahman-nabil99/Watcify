import { AJAX } from "./helper.js";
import { API_URL } from "./config.js";
export const showObj = {
  laterShows: localStorage.getItem("laterList")
    ? JSON.parse(localStorage.getItem("laterList"))
    : [],
  likedShows: localStorage.getItem("likedList")
    ? JSON.parse(localStorage.getItem("likedList"))
    : [],
  show: {},
};

/**
 * set data to our show object
 * @param {*} data  response we get from api
 */
export const setShowData = function (data) {
  showObj.show.title = data.Title;
  showObj.show.runtime = data.Runtime;
  showObj.show.genre = data.Genre;
  showObj.show.releaseDate = data.Released;
  showObj.show.year = data.Year;
  showObj.show.actors = data.Actors;
  showObj.show.plot = data.Plot;
  showObj.show.language = data.Language;
  showObj.show.country = data.Country;
  showObj.show.poster = data.Poster;
  showObj.show.imdbRating = data.imdbRating;
  showObj.show.type = data.Type;
  showObj.show.totalSeasons = data.Type === "series" ? data.totalSeasons : "1";
  showObj.show.id = data.imdbID;
  if (showObj.likedShows.some((show) => show.id === showObj.show.id))
    showObj.show.liked = true;
  else showObj.show.liked = false;
  if (showObj.laterShows.some((show) => show.id === showObj.show.id))
    showObj.show.later = true;
  else showObj.show.later = false;
};

/**
 *  get data from api and edit it and give it to controller
 * @param {*} id id we get from page
 * @returns return object after editing
 */
export const loadShow = async function (id) {
  try {
    const data = await AJAX(`${API_URL}i=${id}`);
    if (data.Response === "False") throw err;
    setShowData(data);
    return showObj.show;
  } catch (err) {
    throw err;
  }
};
/**
 * get search result
 * @param {*} query search input from user
 * @param {*} page page to get result from
 * @returns
 */
export const getSearchResults = async function (
  page,
  query = showObj.search.query
) {
  try {
    const data = await AJAX(`${API_URL}s=${query}&page=${page}`);
    if (!data.Response === "True") throw err;
    // edit data
    const searchResult = data.Search.map((result) => {
      return {
        title: result.Title,
        year: result.Year,
        id: result.imdbID,
        type: result.Type,
        poster: result.Poster,
      };
    });
    showObj.search = {
      query,
      searchResult,
      totalResult: data.totalResults,
      totalPages: Math.ceil(data.totalResults / 10),
      currentPage: page,
    };
    return showObj.search;
  } catch (err) {
    throw err;
  }
};

/**
 * save show to liked list
 */
export const addLikedShow = function () {
  showObj.show.liked = true;

  showObj.likedShows.push({
    title: showObj.show.title,
    year: showObj.show.year,
    poster: showObj.show.poster,
    id: showObj.show.id,
    type: showObj.show.type,
  });
  setLocalStorage();
};
/**
 * remove show from liked list
 */
export const removeLikedShow = function (id) {
  let index = showObj.likedShows.findIndex((show) => show.id === id);
  showObj.show.liked = false;
  showObj.likedShows.splice(index, 1);
  setLocalStorage();
};

/**
 * save show to later list
 */
export const addLaterShow = function () {
  showObj.show.later = true;
  showObj.laterShows.push({
    title: showObj.show.title,
    year: showObj.show.year,
    poster: showObj.show.poster,
    id: showObj.show.id,
    type: showObj.show.type,
  });
  setLocalStorage();
};
/**
 * remove show from later list
 */
export const removeLaterShow = function (id) {
  let index = showObj.laterShows.findIndex((show) => show.id === id);
  showObj.show.later = false;
  showObj.laterShows.splice(index, 1);
  setLocalStorage();
};

/**
 * Save liked and later shows in local storage
 */
const setLocalStorage = function () {
  localStorage.setItem("likedList", JSON.stringify(showObj.likedShows));
  localStorage.setItem("laterList", JSON.stringify(showObj.laterShows));
};
