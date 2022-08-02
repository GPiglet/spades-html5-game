import Card from "../Widgets/Card";
import Hint from "../Widgets/Hint";

class PlayGround {
  container: HTMLElement;
  wrapper: HTMLElement;
  cards: Array<Card>;
  hintPopover: Hint;

  constructor(parent: HTMLElement | null) {
    this.cards = [];
    this.container = document.createElement('div');
    parent?.appendChild(this.container);
    this.container.classList.add('absolute');
    this.container.classList.add('top-[200px]');
    this.container.classList.add('z-20');
    this.container.classList.add('flex');
    this.container.classList.add('justify-center');
    this.container.classList.add('w-full');

    this.wrapper = document.createElement('div');
    this.container.appendChild(this.wrapper);
    this.wrapper.classList.add('relative');

    this.hintPopover = new Hint(parent);
  }

  putCard(card: Card, position: string) {
    this.cards.push(card);
    this.wrapper.appendChild(card.getElement());
    const cardElement = card.getElement();
    cardElement.classList.add('absolute');
    switch( position ) {
      case 'top':
        cardElement.classList.add('left-[-34px]');
        break;
      case 'left':
        cardElement.classList.add('left-[-75px]');
        cardElement.classList.add('top-[30px]');
        break;
      case 'right':
        cardElement.classList.add('top-[30px]');
        cardElement.classList.add('left-[5px]');
        break;
      case 'bottom':
        cardElement.classList.add('left-[-34px]');
        cardElement.classList.add('top-[70px]');
        break;
    }
  }
}

export default PlayGround;