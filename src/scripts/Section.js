export default class Section {
  constructor(sectionConfig, containerSelector) {
    this._renderedItems = sectionConfig.items;
    this._renderer = sectionConfig.renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  addItem(el) {
    this._container.prepend(el);
  }
}
