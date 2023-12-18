import { View } from "../view.js";
class ShowView extends View {
  _parentElement = document.querySelector(".selected-result");
  _errorMessage =
    "<i class='fa-solid fa-xmark'></i> could not load your show data!";

  _addLinkChangeHandler(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }
  _generateMarkup(data) {
    return `
    <img
    src="${data.poster}"
    alt="${data.title}"
    />
    <div class="head-tv">
        <p>Runtime: <span class='header-span'>${data.runtime}</span></p>
        <p>IMDb Rating: <span class='header-span'>${data.imdbRating}</span></p>
        <div class="icon-trigger">
        <i id='likeBtn' title="add to liked" class="fa-${
          data.liked ? "solid" : "regular"
        } fa-heart"></i
        ><i id='laterBtn' title="add to watch later" class="fa-${
          data.later ? "solid" : "regular"
        } fa-clock"></i>
        </div>
    </div>
    <div class="details">
        <h2>${data.title} (${data.year}) - <span class="type">${
      data.type
    }</span></h2>
        <p id="plot">${data.plot}</p>
        <p><span class="detail-big">Release Date:</span> ${data.releaseDate}</p>
        <p><span class="detail-big">Genre:</span> ${data.genre}</p>
        <p>
        <span class="detail-big">Language:</span> ${data.language}</p>
        <p><span class="detail-big">Country:</span> ${data.country}</p>
        <p>
        <span class="detail-big">Actors:</span> ${data.actors}</p>
        <p><span class="detail-big">Total Seasons:</span> ${
          data.totalSeasons
        }</p>
        <p><a href="https://www.imdb.com/title/${data.id}/">IMDb</a></p>
    </div>
    `;
  }
}

export default new ShowView();
