class Section {
  constructor({ items, renderer }, containerSelector) {
    // items = initial data to render.
    // renderer = callback that knows how to create and add each item.
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // Render every initial item using the callback received in the constructor.
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    // Add a DOM element to the section container.
    this._container.append(element);
  }
}

export default Section;
