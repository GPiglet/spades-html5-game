import '../styles/styles.css';
import Player from './views/Player';
import PlayGround from './views/Board';
import DealGround from './views/Board/DealGround';
import testController from './controllers/test';
import mainController from './controllers/main';

window.addEventListener('load', () => {
  // root element
  const rootElement = document.getElementById('root');

  // init players
  const players: Array<Player> = [];
  players.push(new Player(rootElement, 'top', 'Bill', 'assets/images/face-2.svg'));
  players.push(new Player(rootElement, 'right', 'Lisa', 'assets/images/face-3.svg'));
  players.push(new Player(rootElement, 'bottom', 'You', 'assets/images/face-0.svg'));
  players.push(new Player(rootElement, 'left', 'Mike', 'assets/images/face-mike.svg'));

  // init deal ground
  const dealGround = new DealGround(rootElement, players);
  mainController.setDealGround(dealGround);
  dealGround.init().show();

  // init play ground
  const playGround = new PlayGround(rootElement, players);

  // enable test mode
  testController.enableTestMode();

})
