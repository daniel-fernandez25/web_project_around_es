class Section {
  constructor({ renderer }, containerSelector) {
    // renderer = callback that knows how to create and add each item.
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    // Render every initial item using the callback received in the constructor.
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    // Add a DOM element to the section container.
    this._container.append(element);
  }

  addItemToStart(element) {
    this._container.prepend(element);
  }
}

export default Section;
