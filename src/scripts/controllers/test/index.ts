import DealGround from "../../views/Board/DealGround";
import Player from "../../views/Player";

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
    }, 1000);

    setTimeout(() => {
      
    }, 2000);
  }
}

const testController = new TestController();
export default testController;