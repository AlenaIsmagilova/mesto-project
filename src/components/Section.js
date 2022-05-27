export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);

    this.addItem = this.addItem.bind(this);
  }

  //метод для отрисовки всех элементов
  addItem(card) {
    this._container.prepend(card);
  }

  //метод для отрисовки каждого отдельного элемента
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
