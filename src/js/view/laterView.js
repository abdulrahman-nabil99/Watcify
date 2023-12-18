import { SearchView } from "./searchView.js";
class LaterView extends SearchView {
  _showContainer = document.querySelector(".selected-result");
  _parentElement = document.querySelector("#later-list");

  laterHandler(handler) {
    this._showContainer.addEventListener("click", function (e) {
      const laterBtn = e.target.closest("#laterBtn");
      if (!laterBtn) return;
      laterBtn.classList.toggle("fa-regular");
      laterBtn.classList.toggle("fa-solid");
      handler();
    });
  }
}

export default new LaterView();
