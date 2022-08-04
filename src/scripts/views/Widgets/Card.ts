import { CardType } from "../Board/CardFactory";

class Card {
  container: HTMLElement;
  cardType: CardType;
  constructor(cardType: CardType, classList: Array<string>) {
    this.cardType = cardType;
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

  destroy() {
    this.container.parentNode?.removeChild(this.container);
  }

}

export default Card;