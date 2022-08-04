import DealGround from "../../views/Board/DealGround";

export enum GAME_STATE {
  INIT = 0,
  DEAL = 1,
  PLAY = 2
};

class MainController {
  currentState: GAME_STATE = GAME_STATE.INIT;
  dealGround: DealGround | null = null;
  constructor() {

  }

  setDealGround(dealGround: DealGround) {
    this.dealGround = dealGround;
  }

  setState(state: GAME_STATE) {
    this.currentState = state;
  }

  getState() {
    return this.currentState;
  }

  startGame() {
    if ( this.dealGround ) this.dealGround.init().show();
  }

}
const mainController = new MainController();
export default mainController;