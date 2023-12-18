import { View } from "../view.js";
export class SearchView extends View {
  _parentElement = document.querySelector(".result");
  _errorMessage = "<i class='fa-solid fa-xmark'></i> No result found!";
  #form = document.querySelector("#searchForm");
  #input = document.querySelector("#queryInput");
  _getQuery() {
    const query = this.#input.value.trim();
    this.#input.value = "";
    return query;
  }

  _addSearchHandler(handler) {
    this.#form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
  _generateMarkup(data) {
    return (data.searchResult ? data.searchResult : data)
      .map((result) => {
        const currentId = window.location.hash.slice(1);
        return `
        <a href="#${result.id}" class="result-el ${
          result.id === currentId ? "active-select" : ""
        }">
            <img
            src="${result.poster}"
            alt="${result.title}"
            />
            <div>
            <h4>${result.title}</h4>
            <p>${result.year}</p>
            <p>${result.type.toUpperCase()}</p>
            </div>
        </a>
        `;
      })
      .join("");
  }
}

export default new SearchView();
