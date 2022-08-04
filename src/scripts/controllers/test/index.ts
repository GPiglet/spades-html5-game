import PlayGround from "../../views/Board";
import { CardType } from "../../views/Board/CardFactory";
import DealGround from "../../views/Board/DealGround";
import resultPopover from "../../views/Board/ResultPopover";
import Player from "../../views/Player";
import Card from "../../views/Widgets/Card";
import mainController, { GAME_STATE } from "../main";

class TestController {
  isTestMode: boolean = false;
  dealGround: DealGround | null = null;
  constructor() {

  }

  enableTestMode() {
    this.isTestMode = true;
  }

  disableTestMode() {
    this.isTestMode = false;
  }

  initRound(playGround: PlayGround) {
    if ( playGround.topCard && playGround.leftCard && playGround.rightCard && playGround.bottomCard )
    {
      setTimeout(() => {
        playGround.onInitRound(Math.floor(Math.random()*4));
      }, 1000);
    }
  }

  onBid(dealGround: DealGround) {
    if ( !this.isTestMode ) return;
    this.dealGround = dealGround;
    const players = dealGround.players;
    players[3].showBidNotify(Math.floor(Math.random()*13));
    setTimeout(() => {
      players[0].showBidNotify(Math.floor(Math.random()*13));
    }, 1000);
    setTimeout(() => {
      players[1].showBidNotify(Math.floor(Math.random()*13));
    }, 2000);
    setTimeout(() => {
      players[2].showBidPopover();
    }, 3000);
  }

  onSelectBid(player: Player, level: number) {
    if ( !this.isTestMode ) return;
    player.showBidNotify(level);
    
    setTimeout(() => {
      this.dealGround?.players.forEach(p => {
        p.hideBidNotify();
      })
      mainController.setState(GAME_STATE.PLAY);
    }, 1000);

  }

  putOtherCard(player: Player, target: Card) {
    const cardType = Math.floor(3+Math.random()*52);
    player.putCard(cardType, player.cardList.cards.findIndex(c=>c==target));
  }

  checkFinish() {
    if ( this.dealGround?.players[0].cardList.cards.length == 0 ) resultPopover.show();
  }
}

const testController = new TestController();
export default testController;