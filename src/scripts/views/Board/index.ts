import gsap from "gsap";
import testController from "../../controllers/test";
import Player from "../Player";
import Card from "../Widgets/Card";
import Hint from "../Widgets/Hint";

class PlayGround {
  parent: HTMLElement | null;
  container: HTMLElement;
  topCard: Card | null = null;
  leftCard: Card | null = null;
  rightCard: Card | null = null;
  bottomCard: Card | null = null;
  players: Player[] = [];
  hintPopover: Hint;
  x: number = 0;
  y: number = 0;
  cardWidth: number = 69;
  cardHeight: number = 94;

  constructor(parent: HTMLElement | null, players: Player[]) {
    this.parent = parent;
    this.players = players;
    this.players.forEach( player => {
      player.setPlayGround(this);
    })

    this.container = document.createElement('div');
    parent?.appendChild(this.container);
    this.container.classList.add('absolute');
    this.container.classList.add('z-20');

    this.calcPositions();
    window.addEventListener('resize', () => {
      this.onResize();
    })

    this.hintPopover = new Hint(parent);
  }

  calcPositions() {
    const parentWidth = this.parent ? this.parent.getBoundingClientRect().width - 10 : 0, parentHeight = this.parent ? this.parent.getBoundingClientRect().height - 10 : 0;
    this.x = Math.floor(parentWidth / 2);
    this.y = Math.floor(parentHeight / 2 - 30);
  }

  onResize() {
    this.calcPositions();
    if ( this.topCard ) {
      this.topCard.getElement().style.left = this.x - this.cardWidth / 2 + 'px';
      this.topCard.getElement().style.top = this.y - 62 + 'px';
    }

    if ( this.leftCard ) {
      this.leftCard.getElement().style.left = this.x - this.cardWidth + 'px';
      this.leftCard.getElement().style.top = this.y - 31 + 'px';
    }

    if ( this.rightCard ) {
      this.rightCard.getElement().style.left = this.x + 'px';
      this.rightCard.getElement().style.top = this.y - 31 + 'px';
    }

    if ( this.bottomCard ) {
      this.bottomCard.getElement().style.left = this.x - this.cardWidth / 2 + 'px';
      this.bottomCard.getElement().style.top = this.y + 'px';
    }
  }

  addCard(card: Card, position: string) {    
    const cardElement = card.getElement();
    cardElement.classList.add('absolute');
    switch( position ) {
      case 'top':
        if ( this.topCard ) this.topCard.destroy();
        this.topCard = card;
        cardElement.style.left = this.x - this.cardWidth / 2 + 'px';
        cardElement.style.top = this.y - 62 + 'px';
        break;
      case 'left':
        if ( this.leftCard ) this.leftCard.destroy();
        this.leftCard = card;
        cardElement.style.left = this.x - this.cardWidth + 'px';
        cardElement.style.top = this.y - 31 + 'px';
        break;
      case 'right':
        if ( this.rightCard ) this.rightCard.destroy();
        this.rightCard = card;
        cardElement.style.left = this.x + 'px';
        cardElement.style.top = this.y - 31 + 'px';
        break;
      case 'bottom':
        if ( this.bottomCard ) this.bottomCard.destroy();
        this.bottomCard = card;
        cardElement.style.left = this.x - this.cardWidth / 2 + 'px';
        cardElement.style.top = this.y + 'px';
        break;
    }

    this.container.appendChild(card.getElement());

    // only for test
    testController.initRound(this);    
  }

  onInitRound(owner: number) {
    const ownerPlayer = this.players[owner];
    gsap.to([this.topCard?.getElement(), this.leftCard?.getElement(), this.rightCard?.getElement(), this.bottomCard?.getElement()],
      {
        zIndex: 40,
        left: ownerPlayer.scorePad.x,
        top: ownerPlayer.scorePad.y,
        scale: 0.2,
        transformOrigin: '50% 50%',
        onComplete: () => {
          ownerPlayer.scorePad.increaseScore();
          this.clear();
        }
      }
    )
    
  }

  clear() {
    if ( this.topCard ) this.topCard.destroy();
    if ( this.leftCard ) this.leftCard.destroy();
    if ( this.rightCard ) this.rightCard.destroy();
    if ( this.bottomCard ) this.bottomCard.destroy();
    this.topCard = this.leftCard = this.rightCard = this.bottomCard = null;

    //only for test
    testController.checkFinish();
  }
}

export default PlayGround;