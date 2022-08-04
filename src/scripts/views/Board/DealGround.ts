import gsap from "gsap";
import mainController, { GAME_STATE } from "../../controllers/main";
import testController from "../../controllers/test";
import Player from "../Player";
import Card from "../Widgets/Card";
import Hint from "../Widgets/Hint";
import CardFactory, { CardType } from "./CardFactory";

class DealGround {
  container: HTMLElement;
  cardWrapper: HTMLElement;
  buttonElement: HTMLElement;
  hintPopover: Hint;
  players: Array<Player>;
  cards: Array<Card>;

  constructor(parent: HTMLElement | null, players: Array<Player>) {
    this.players = players;
    this.onCompleteDeal = this.onCompleteDeal.bind(this);    
    
    this.container = document.createElement('div');
    parent?.appendChild(this.container);
    this.container.classList.add('absolute');
    this.container.classList.add('top-[280px]');
    this.container.classList.add('sm:top-[250px]');
    this.container.classList.add('z-20');
    this.container.classList.add('flex');
    this.container.classList.add('flex-col');
    this.container.classList.add('items-center');
    this.container.classList.add('sm:flex-row');
    this.container.classList.add('sm:justify-center');
    this.container.style.left = 'calc(50% - 80px)';

    this.cardWrapper = document.createElement('div');
    this.container.appendChild(this.cardWrapper);
    this.cardWrapper.classList.add('relative');
    this.cardWrapper.classList.add('sm:left-[-20px]');
    this.cardWrapper.classList.add('w-[69px]');
    this.cardWrapper.classList.add('h-[94px]');

    // add cards in deal ground
    this.cards = [];
    for ( let i = 0; i < 52; i++ )
    {
      const card = CardFactory.create(CardType.Blank);
      const cardElement = card.getElement();
      cardElement.classList.add('absolute');
      this.cards.push(card);
      this.cardWrapper.appendChild(card.getElement());
    }

    const buttonWrapper = document.createElement('div');
    this.container.appendChild(buttonWrapper);
    buttonWrapper.classList.add('relative');
    buttonWrapper.classList.add('top-[30px]');
    buttonWrapper.classList.add('sm:top-[-25px]');
    buttonWrapper.classList.add('sm:left-[15px]');

    this.buttonElement = document.createElement('button');
    buttonWrapper.appendChild(this.buttonElement);
    this.buttonElement.id = 'deal-button';
    this.buttonElement.innerHTML = 'Deal';
    this.buttonElement.onclick = (ev: MouseEvent) => {
      this.Deal();
    }

    this.hintPopover = new Hint(parent);
    this.hide();

  }
  
  init() {
    this.hintPopover.setText('Click Deal to start the game.');

    // reposition cards in deal ground
    for ( let i = 0; i < 52; i++ )
    {
      this.cards[i].show();
      const cardElement = this.cards[i].getElement();
      cardElement.style.top = `${Math.floor(0 - i*10/52)}px`;
      cardElement.style.left = `${Math.floor(0 - i*10/52)}px`;
      cardElement.style.zIndex = '' + i;
      gsap.set(cardElement, {rotate: 0});
    }

    // init players
    this.players.forEach((player) => {
      player.init();
    })

    return this;

  }

  playDealEffect(dealer: number, myCardTypes: Array<CardType>) {
    const dealEffect = gsap.timeline({onComplete: this.onCompleteDeal, paused: true});
    let myCardIndex = 0;
    this.cards.reverse().forEach( (card, i) => {
      const cardElement = card.getElement();
      const player = this.players[(dealer + 1 + i)%4];
      const playerCard = player.addCard(player.isMine() ? myCardTypes[myCardIndex++] : CardType.Blank).hide();
      const rect1 = playerCard.getElement().getBoundingClientRect(), rect2 = cardElement.getBoundingClientRect();
      let rotate = 0;
      switch ( player.position ) {
        case 'left':
          rotate = -90;
          break;
        case 'right':
          rotate = 90;
          break;
      }
      dealEffect.to(cardElement, {duration: 0.057, left: rect1.x - rect2.x, top: rect1.y - rect2.y, rotate, onComplete: ()=> {
        card.hide();
        playerCard.show();
      }});
    })
    dealEffect.play();
  }

  show() {
    gsap.to(this.container, {opacity: 1, onComplete: () => {
      this.container.style.visibility = 'visible';
    }});
    this.hintPopover.show();
    return this;
  }

  hide() {
    gsap.to(this.container, {opacity: 0, onComplete: () => {
      this.container.style.visibility = 'hidden';
    }});
    this.hintPopover.hide();
    return this;
  }

  Deal() {
    mainController.setState(GAME_STATE.DEAL);
    //get from service
    const dealer: number = 2;
    const myCards: Array<CardType> = [
      CardType.Diamond2, 
      CardType.Heart3, 
      CardType.Spade6, 
      CardType.HeartJ, 
      CardType.HeartA, 
      CardType.Diamond3, 
      CardType.DiamondJ, 
      CardType.Spade3, 
      CardType.HeartQ, 
      CardType.Heart9, 
      CardType.Heart4, 
      CardType.Diamond5, 
      CardType.Diamond10
    ];

    // set data
    this.players[dealer].setDealer();

    // deal effect, called onCompleteDeal when effect is completed
    this.playDealEffect(dealer, myCards);
  }

  onCompleteDeal() {
    this.hide();
    this.players.forEach( (player) => {
      if( player.isMine() ) player.sortCards();
    })

    //only for test
    setTimeout(() => {
      testController.onBid(this);
    }, 1000);
  }

}

export default DealGround;