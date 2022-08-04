import mainController from "../../controllers/main";

class ResultPopover {
  container:HTMLElement | null;
  constructor() {
    this.container = document.getElementById('result-box');
    const startGameButton = document.getElementById('start-new-game');

    if ( startGameButton ) startGameButton.onclick = () => {
      this.startGame();
      this.hide();
    }
  }

  show() {
    if ( this.container ) this.container.style.display = 'flex';
  }

  hide() {
    if ( this.container ) this.container.style.display = 'none';
  }

  startGame() {
    mainController.startGame();
  }



}
const resultPopover = new ResultPopover();
export default resultPopover;