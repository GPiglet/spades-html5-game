import testController from "../../controllers/test";
import PlayGround from "../Board";
import BidPopover from "../Board/BidPopover";
import CardFactory, { CardType } from '../Board/CardFactory';
import Bubble from '../Widgets/Bubble';
import CardList from "./CardList";
import ScorePad from "./ScorePad";

class Player {
  container: HTMLElement;
  wrapper: HTMLElement;
  bubble: Bubble;
  position: string;
  bidPopover: BidPopover | null = null;
  playGround: PlayGround | null = null;
  scorePad: ScorePad;
  cardList: CardList;

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

    this.bubble = new Bubble(this.wrapper, position);
    this.scorePad = new ScorePad(parent, position);
    this.cardList = new CardList(parent, position, this);
    
  }

  init() {
    this.removeDealer();
    this.cardList.init();
    this.scorePad.init();    
  }

  setDealer() {
    this.container.classList.add('dealer');
  }

  removeDealer() {
    this.container.classList.remove('dealer');
  }

  addCard(cardType: CardType) {
    const card = CardFactory.create(cardType, this.position);
    this.cardList.addCard(card);
    return card;
  }

  isMine() {
    return this.position == 'bottom'
  }

  sortCards() {
    this.cardList.sortCards();
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
    this.scorePad.setBid(index);
  }

  hideBidNotify() {
    this.bubble.hide();
  }

  putCard(cardType: CardType, index: number=-1) {
    this.cardList.putCard(cardType, index);
  }

  setPlayGround(ground: PlayGround) {
    this.playGround = ground;
  }
}

export default Player;