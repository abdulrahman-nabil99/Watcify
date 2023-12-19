import * as model from "./model.js";
import showView from "./view/showView.js";
import searchView from "./view/searchView.js";
import paginationView from "./view/paginationView.js";
import likedView from "./view/likedView.js";
import laterView from "./view/laterView.js";
import { windowScroll } from "./helper.js";
if (module.hot) {
  module.hot.accept();
}
/**
 * Render Show from Current id of location
 * @returns void
 */
const controlShow = async function () {
  try {
    // render liked
    likedView._render(model.showObj.likedShows);
    // render later
    laterView._render(model.showObj.laterShows);
    // get id
    let id = window.location.hash.slice(1);
    if (!id) return;
    //get data
    const show = await model.loadShow(id);
    // render data
    showView._render(show);
    // render search
    if (!model.showObj.search) return;
    searchView._render(model.showObj.search);
  } catch (err) {
    showView._renderErr();
  }
};

/**
 * render Search Result and pagination
 * @param {*} page page to get from api : api give 10 result per page
 */
const controlSearch = async function (page = 1) {
  try {
    // get query
    const query = searchView._getQuery();
    if (!query) return;
    // get search result
    const searchResult = await model.getSearchResults(page, query);
    // render data
    searchView._render(searchResult);
    // render pagination
    paginationView._render(searchResult);
  } catch (err) {
    searchView._renderErr();
  }
};
const controlPagination = async function (page) {
  // get search result
  const searchResult = await model.getSearchResults(page);
  // render data
  searchView._render(searchResult);
  // render pagination
  paginationView._render(searchResult);
};

const controlLikedList = function () {
  if (model.showObj.show.liked)
    model.removeLikedShow(window.location.hash.slice(1));
  else if (!model.showObj.show.liked) model.addLikedShow();
  likedView._render(model.showObj.likedShows);
};

const controlLaterList = function () {
  if (model.showObj.show.later)
    model.removeLaterShow(window.location.hash.slice(1));
  else if (!model.showObj.show.later) model.addLaterShow();
  laterView._render(model.showObj.laterShows);
};
/**
 * Add eventsHadlers
 */
const init = function () {
  // render Liked and later Shows on load
  likedView._render(model.showObj.likedShows);
  laterView._render(model.showObj.laterShows);
  showView._addLinkChangeHandler(controlShow);
  searchView._addSearchHandler(controlSearch);
  paginationView._addPageBtnsHandler(controlPagination);
  likedView.likeHandler(controlLikedList);
  laterView.laterHandler(controlLaterList);
  // add move to top
  windowScroll();
};
init();
