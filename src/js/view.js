export class View {
  _render(show) {
    const HTML = this._generateMarkup(show);
    this._parentElement.innerHTML = HTML;
  }
  _renderErr() {
    this._parentElement.innerHTML = `<p class='err-mssg'>${this._errorMessage}.</p>`;
  }
}
