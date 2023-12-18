import { SearchView } from "./searchView.js";
class LikedView extends SearchView {
  _showContainer = document.querySelector(".selected-result");
  _parentElement = document.querySelector("#liked-list");

  likeHandler(handler) {
    this._showContainer.addEventListener("click", function (e) {
      const likeBtn = e.target.closest("#likeBtn");
      if (!likeBtn) return;
      likeBtn.classList.toggle("fa-regular");
      likeBtn.classList.toggle("fa-solid");
      handler();
    });
  }
}

export default new LikedView();
