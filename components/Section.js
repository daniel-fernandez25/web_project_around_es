class Section {
  constructor({ items, renderer }, containerSelector) {
    ((this._items = items),
      (this._renderer = renderer),
      (this._container = document.querySelector(containerSelector)));
  }

  // clears a container
  clear() {
    this._container.innerHTML = "";
  }

  // first clears a container and then render initial items
  renderInitialItems() {
    this.clear();

    // this._items is the initial items info passed when the class is
    // instantiated.
    this._items.forEach((item) => {
      // this._renderer is an arrow function that provides instructions on
      // how to render the items. This function is passed when the class is
      // instantiated
      this._renderer(item);
    });
  }

  // method that appends one item to a container
  addItem(element) {
    this._container.append(element);
  }
}

export default Section;
