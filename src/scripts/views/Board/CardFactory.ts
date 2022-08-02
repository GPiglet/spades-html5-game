import Card from '../Widgets/Card';
export enum  CardType {
  Blank = 0,
  JokerA,
  JokerB,
  Heart2, Heart3, Heart4, Heart5, Heart6, Heart7, Heart8, Heart9, Heart10, HeartJ, HeartQ, HeartK, HeartA, 
  Spade2, Spade3, Spade4, Spade5, Spade6, Spade7, Spade8, Spade9, Spade10, SpadeJ, SpadeQ, SpadeK, SpadeA, 
  Diamond2, Diamond3, Diamond4, Diamond5, Diamond6, Diamond7, Diamond8, Diamond9, Diamond10, DiamondJ, DiamondQ, DiamondK, DiamondA, 
  Club2, Club3, Club4, Club5, Club6, Club7, Club8, Club9, Club10, ClubJ, ClubQ, ClubK, ClubA, 
}
const CardFactory = (cardType: CardType, position: string = 'default') => {
  const card = new Card(cardType, ['bg-cover']);
  const images = [
    //blank, jokera, jokerb
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]",
    // heart2
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/heart-3.png')]", "bg-[url('/assets/images/heart-4.png')]", 
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", 
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/heart-9.png')]", "bg-[url('/assets/images/card-back.png')]", 
    "bg-[url('/assets/images/heart-J.png')]", "bg-[url('/assets/images/heart-Q.png')]", "bg-[url('/assets/images/card-back.png')]",
    "bg-[url('/assets/images/heart-A.png')]",
    // spade2
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/spade-3.png')]", "bg-[url('/assets/images/card-back.png')]", 
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/spade-6.png')]", "bg-[url('/assets/images/card-back.png')]", 
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", 
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]",
    "bg-[url('/assets/images/card-back.png')]", 
    // diamond2
    "bg-[url('/assets/images/diamond-2.png')]", "bg-[url('/assets/images/diamond-3.png')]", "bg-[url('/assets/images/card-back.png')]", 
    "bg-[url('/assets/images/diamond-5.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", 
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/diamond-10.png')]", 
    "bg-[url('/assets/images/diamond-J.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]",
    "bg-[url('/assets/images/card-back.png')]", 
    // club2
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]",
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]",
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]",
    "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]", "bg-[url('/assets/images/card-back.png')]",
    "bg-[url('/assets/images/card-back.png')]",
  ]

  card.addClass(images[cardType]);

  switch ( position ) {
    case 'top':
      card.addClass("w-[24px]");
      card.addClass("h-[33px]");
      card.addClass("xs:w-[39px]");
      card.addClass("xs:h-[54px]");
      card.addClass("sm:w-[69px]");
      card.addClass("sm:h-[94px]");
      break;
    case 'left':
      card.addClass("w-[24px]");
      card.addClass("h-[33px]");
      card.addClass("xs:w-[39px]");
      card.addClass("xs:h-[54px]");
      card.addClass("sm:w-[69px]");
      card.addClass("sm:h-[94px]");
      card.addClass("rotate-90");
      break;
    case 'right':
      card.addClass("w-[24px]");
      card.addClass("h-[33px]");
      card.addClass("xs:w-[39px]");
      card.addClass("xs:h-[54px]");
      card.addClass("sm:w-[69px]");
      card.addClass("sm:h-[94px]");
      card.addClass("rotate-90");
      break;
    case 'default':
    case 'bottom':
      card.addClass("w-[69px]");
      card.addClass("h-[94px]");
      break;
  }
  return card;
}

export default {create: CardFactory};