import { View } from "../view.js";
class PaginationView extends View {
  _parentElement = document.querySelector("#pagination");

  _addPageBtnsHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".moveBtn");
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }

  _generateMarkup(data) {
    if (data.currentPage === 1 && data.currentPage === data.totalPages)
      return "";
    if (data.currentPage === 1 && data.currentPage !== data.totalPages) {
      return `${this.#generateNext(data.currentPage + 1)}`;
    }
    if (data.currentPage !== 1 && data.currentPage === data.totalPages) {
      return `${this.#generatePrev(data.currentPage - 1)}`;
    } else {
      return `${this.#generatePrev(data.currentPage - 1)} 
        ${this.#generateNext(data.currentPage + 1)}`;
    }
  }

  #generateNext(next) {
    return `
        <span class='moveBtn' data-goto='${next}' id="next-page"
              >Page ${next} <i class="fa-solid fa-arrow-right"></i
        ></span>
        `;
  }
  #generatePrev(prev) {
    return `
    <span class='moveBtn' data-goto='${prev}' id="prev-page"
        ><i class="fa-solid fa-arrow-left"></i> Page ${prev}</span>
    `;
  }
}

export default new PaginationView();
