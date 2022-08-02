class Card {
  container: HTMLElement;
  constructor(classList: Array<string>) {
    this.container = document.createElement('div');
    classList.forEach((className) => {
      this.container.classList.add(className);
    });
  }

  addClass(className: string) {
    this.container.classList.add(className);
    return this;
  }

  getElement() {
    return this.container;
  }

  show() {
    this.container.style.visibility = 'visible';
    return this;
  }

  hide() {
    this.container.style.visibility = 'hidden';
    return this;
  }
}

export default Card;