import gsap from "gsap";
import testController from "../../controllers/test";
import BidPopover from "../Board/BidPopover";
import CardFactory, { CardType } from '../Board/CardFactory';
import Bubble from '../Widgets/Bubble';
import Card from '../Widgets/Card';

class Player {
  container: HTMLElement;
  wrapper: HTMLElement;
  bubble: Bubble;
  cardContainer: HTMLElement;
  cardWrapper: HTMLElement;
  cards: Array<Card>;
  position: string;
  bidPopover: BidPopover | null = null;

  constructor(parent: HTMLElement | null, position: string, username: string, avatar: string) {
    this.onSelectBid = this.onSelectBid.bind(this);
    
    this.position = position;
    this.container = document.createElement('div');
    parent?.appendChild(this.container);
    this.container.classList.add('absolute');
    switch( position ) {
      case 'top':
        this.container.classList.add('left-1/2');
        this.container.classList.add('ml-[-25px]');
        break;
      case 'left':
        this.container.classList.add('top-1/2');
        this.container.classList.add('mt-[-25px]');
        break;
      case 'right':
        this.container.classList.add('top-1/2');
        this.container.classList.add('right-[5px]');
        this.container.classList.add('mt-[-25px]');
        break;
      case 'bottom':
        this.container.classList.add('left-1/2');
        this.container.classList.add('bottom-[25px]');
        this.container.classList.add('ml-[-25px]');
        this.bidPopover = new BidPopover(parent, this.onSelectBid);
        break;
  
    }
  
    this.wrapper = document.createElement('div');
    this.container.appendChild(this.wrapper);
    this.wrapper.classList.add('relative');
  
    const avatarElement = document.createElement('img');
    this.wrapper.appendChild(avatarElement);
    avatarElement.src = avatar;
    avatarElement.classList.add('w-[50px]');
    avatarElement.classList.add('h-[50px]');
    avatarElement.classList.add('cursor-pointer');
  
    const nameElement = document.createElement('small');
    this.wrapper.appendChild(nameElement);
    nameElement.classList.add('text-white');
    nameElement.classList.add('w-[220%]');
    nameElement.classList.add('left-[-55%]');
    nameElement.classList.add('text-[13px]');
    nameElement.classList.add('absolute');
    nameElement.classList.add('text-center');
    nameElement.classList.add('l-[55px]');
    nameElement.innerHTML = username;

    // create bubble object
    this.bubble = new Bubble(this.wrapper, position);

    // init card list
    this.cards = [];
    this.cardContainer = document.createElement('div');
    parent?.appendChild(this.cardContainer);
    this.cardContainer.classList.add('absolute');
    this.cardContainer.classList.add('flex');
    this.cardContainer.classList.add('justify-center');

    this.cardWrapper = document.createElement('div');
    this.cardContainer.appendChild(this.cardWrapper);
    this.cardWrapper.classList.add('grid');

    switch( position ) {
      case 'top':
        this.cardContainer.classList.add('w-full');
        this.cardContainer.classList.add('top-[80px]');
        this.cardWrapper.classList.add('sm-card-grid-col');
        this.cardWrapper.classList.add('sm:md-card-grid-col');
        this.cardWrapper.classList.add('rotate-180');
        this.cardWrapper.classList.add('sm:ml-[50px]');
        break;

      case 'left':
        this.cardContainer.classList.add('flex-col');
        this.cardContainer.classList.add('h-full');
        this.cardContainer.classList.add('left-[80px]');
        this.cardWrapper.classList.add('sm-card-grid-row');
        this.cardWrapper.classList.add('sm:md-card-grid-row');
        this.cardWrapper.classList.add('sm:mb-[50px]');
        break;

      case 'right':
        this.cardContainer.classList.add('flex-col');
        this.cardContainer.classList.add('h-full');
        this.cardContainer.classList.add('right-[80px]');
        this.cardContainer.classList.add('mt-[23px]');
        this.cardContainer.classList.add('xs:mt-[45px]');
        this.cardContainer.classList.add('sm:mt-[50px]');        
        this.cardWrapper.classList.add('sm-card-grid-row');
        this.cardWrapper.classList.add('sm:md-card-grid-row');
        this.cardWrapper.classList.add('rotate-180');
        break;

      case 'bottom':
        this.cardContainer.classList.add('w-full');
        this.cardContainer.classList.add('bottom-[80px]');
        this.cardWrapper.classList.add('sm-my-card-grid-col');
        this.cardWrapper.classList.add('mr-[50px]');
        break;
    }
    
  }

  init() {
    this.removeDealer();
    this.cards.forEach((card) => {
      card.getElement().parentNode?.removeChild(card.getElement());
    })
    this.cards = [];
  }

  setDealer() {
    this.container.classList.add('dealer');
  }

  removeDealer() {
    this.container.classList.remove('dealer');
  }

  addCard(cardType: CardType) {
    const card = CardFactory.create(cardType, this.position);
    this.cards.push(card);
    this.cardWrapper.appendChild(card.getElement());
    return card;
  }

  isMine() {
    return this.position == 'bottom'
  }

  playSortEffect() {
    const originCards = [...this.cards];
    this.cards.sort((a, b) => a.cardType-b.cardType).forEach( (card, i) => {
      const cardElement = card.getElement();
      cardElement.style.zIndex = '' + i;
      const rect1 = originCards[i].getElement().getBoundingClientRect(), rect2 = cardElement.getBoundingClientRect();
      gsap.to(cardElement, {duration: 0.8, x: rect1.x - rect2.x});
    });

    setTimeout(() => {
      this.cards.forEach( (card, i) => {
        const cardElement = card.getElement();
        gsap.set(cardElement, {x: 0});
        cardElement.style.zIndex = '0';
      })

      this.cards.forEach( (card, i) => {
        this.cards[i] = card.copyDOMFrom(originCards[i]);
      })
    }, 1000);
  }

  onSelectBid(level: number) {
    //only for test
    testController.onSelectBid(this, level);
  }

  showBidPopover() {
    this.bidPopover?.show();
  }

  showBidNotify(index: number) {
    this.bubble.show(`I bid ${index}`, false);
  }

  hideBidNotify() {
    this.bubble.hide();
  }
}

export default Player;