import gsap from "gsap";
import Player from ".";
import mainController, { GAME_STATE } from "../../controllers/main";
import testController from "../../controllers/test";
import CardFactory, { CardType } from '../Board/CardFactory';
import Card from '../Widgets/Card';

class CardList {
  parent: HTMLElement | null;
  player: Player;
  container: HTMLElement;
  position: string;
  cards: Card[] = [];
  x: number = 0;
  y: number = 0;
  cardWidth: number = 0;
  cardHeight: number = 0;
  offsetX: number = 0;
  offsetY: number = 0;
  constructor(parent: HTMLElement | null, position: string, player: Player) {
    this.parent = parent;
    this.player = player;
    this.position = position;
    this.container = document.createElement('div');
    parent?.appendChild(this.container);
    this.container.classList.add('relative');
    this.calcPositions();

    window.addEventListener('resize', () => {
      this.onResize();
    })
  }

  isMine() {
    return this.position == 'bottom';
  }

  calcPositions(cardCount: number = 13) {
    const windowWidth = window.innerWidth, windowHeight = window.innerHeight;
    const parentWidth = this.parent ? this.parent.getBoundingClientRect().width - 10 : 0, parentHeight = this.parent ? this.parent.getBoundingClientRect().height - 10 : 0;
    let breakpoint = 0;
    if ( windowWidth > 370 ) breakpoint = 1;
    if ( windowWidth > 730 ) breakpoint = 2;

    const widths = [24, 39, 69], heights = [33, 54, 94];
    const offsets = [10, 18, 18], myOffsets = [16, 27, 18];

    this.cardWidth = this.isMine() ? 69 : widths[breakpoint];
    this.cardHeight = this.isMine() ? 94 : heights[breakpoint];

    let offset = this.isMine() ? myOffsets[breakpoint] : offsets[breakpoint];
    if ( windowWidth < 420 && this.isMine() ) offset = (parentWidth - 10 - this.cardWidth) / 12;

    switch( this.position ) {
      case 'top':
        {
          const ys = [70, 70, 70];
          this.x = (parentWidth - (cardCount - 1)*offset - this.cardWidth) / 2 + (cardCount - 1)*offset;
          this.y = ys[breakpoint];
          this.offsetX = -offset;
          this.offsetY = 0;
        }
        break;
      case 'left':
        {
          const xs = [60, 60, 70];
          this.x = xs[breakpoint]
          this.y = (parentHeight - (cardCount - 1)*offset - this.cardWidth) / 2;
          this.offsetX = 0;
          this.offsetY = offset;
        }  
        break;
      case 'right':
        {
          const xs = [parentWidth - 85, parentWidth - 105, 540];
          this.x = xs[breakpoint]
          this.y = (parentHeight - (cardCount - 1)*offset - this.cardWidth) / 2  + (cardCount - 1)*offset;
          this.offsetX = 0;
          this.offsetY = -offset;
        }
        break;
      case 'bottom':
        {
          const ys = [500, 500, 420];
          this.x = (parentWidth - (cardCount - 1)*offset - this.cardWidth) / 2;
          this.y = ys[breakpoint];
          this.offsetX = offset;
          this.offsetY = 0;
        }
        break;  
    }

  }

  onResize() {
    this.calcPositions(this.cards.length ? this.cards.length : 13);
    this.cards.forEach((card, i) => {
      const cardElement = card.getElement();
      cardElement.style.left = this.x + this.offsetX * i + 'px';
      cardElement.style.top = this.y + this.offsetY * i + 'px';
    })
  }

  init() {
    this.cards.forEach((card) => {
      card.getElement().parentNode?.removeChild(card.getElement());
    })
    this.cards = [];
    this.calcPositions(this.cards.length ? this.cards.length : 13);
  }

  addCard(card: Card) {
    const cardElement = card.getElement();
    this.container.appendChild(cardElement);
    cardElement.style.left = this.x + this.offsetX * this.cards.length + 'px';
    cardElement.style.top = this.y + this.offsetY * this.cards.length + 'px';
    
    cardElement.onclick = () => {
      this.onClickCard(card);
    }
    this.cards.push(card);
  }

  sortCards() {
    const originCards = [...this.cards];
    this.cards.sort((a, b) => a.cardType-b.cardType).forEach( (card, i) => {
      const cardElement = card.getElement();
      cardElement.style.zIndex = '' + i;
      const left = originCards[i].getElement().style.left;
      gsap.to(cardElement, {duration: 0.8, left});
    });

  }

  putCard(cardType: CardType, index: number) {
    if ( index == -1) index = Math.floor(Math.random() * this.cards.length);
    const card = CardFactory.create(cardType).hide();
    this.player.playGround?.addCard(card, this.position);
    let rotate = 0;
    switch ( this.position ) {
      case 'left':
        rotate = 180;
        break;
      case 'right':
        rotate = 0;
        break;
    }
    this.cards[index].getElement().style.backgroundImage = card.getElement().style.backgroundImage;
    this.cards[index].getElement().style.zIndex = '30';
    const rect = card.getElement().getBoundingClientRect();
    gsap.to(this.cards[index].getElement(), {
      duration: 0.4, 
      rotate, 
      left: card.getElement().style.left, 
      top: card.getElement().style.top, 
      width: rect.width,
      height: rect.height,
      onComplete: () => {
        card.show();
      }
    })

    //put first card
    if ( index == 0 ) {
      gsap.to(this.cards.slice(index + 1).map(c=>c.getElement()), {
        duration: 0.4,
        left: '-=' + this.offsetX/2,
        top: '-=' + this.offsetY/2,
        onComplete: () => {
          this.cards[index].destroy();
          this.cards.splice(index, 1);        
        }
      })
    }
    // put last card
    else if ( index == this.cards.length - 1 ) {
      gsap.to(this.cards.slice(0, index).map(c=>c.getElement()), {
        duration: 0.4,
        left: '+=' + this.offsetX/2,
        top: '+=' + this.offsetY/2,
        onComplete: () => {
          this.cards[index].destroy();
          this.cards.splice(index, 1);        
        }
      })
     
    }
    else {
      gsap.to(this.cards.slice(0, index).map(c=>c.getElement()), {
        duration: 0.4,
        left: '+=' + this.offsetX/2,
        top: '+=' + this.offsetY/2
      })
  
      gsap.to(this.cards.slice(index + 1).map(c=>c.getElement()), {
        duration: 0.4,
        left: '-=' + this.offsetX/2,
        top: '-=' + this.offsetY/2,
        onComplete: () => {
          this.cards[index].destroy();
          this.cards.splice(index, 1);        
        }
      })
    }

  }

  onClickCard(card: Card) {
    if ( mainController.getState() != GAME_STATE.PLAY ) return;
    // only for test
    if ( !this.isMine() ) testController.putOtherCard(this.player, card);

    if ( !this.isMine() ) return;
    this.putCard(card.cardType, this.cards.findIndex(c=>c.cardType==card.cardType));
  }

}

export default CardList;