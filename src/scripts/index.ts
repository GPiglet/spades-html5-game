import '../styles/styles.css';
import Player from './views/Player';
import CardFactory, { CardType } from './views/Board/CardFactory';
import BidPopover from './views/Board/BidPopover';
import PlayGround from './views/Board';
import DealGround from './views/Board/DealGround';

const rootElement = document.getElementById('root');
const players: Array<Player> = [];
players.push(new Player(rootElement, 'top', 'Bill', 'assets/images/face-2.svg'));
players.push(new Player(rootElement, 'right', 'Lisa', 'assets/images/face-3.svg'));
players.push(new Player(rootElement, 'bottom', 'You', 'assets/images/face-0.svg'));
players.push(new Player(rootElement, 'left', 'Mike', 'assets/images/face-mike.svg'));

// leftPlayer.addCard(CardFactory.create(CardType.Blank, 'left'));
// leftPlayer.addCard(CardFactory.create(CardType.Blank, 'left'));
// leftPlayer.addCard(CardFactory.create(CardType.Blank, 'left'));
// leftPlayer.addCard(CardFactory.create(CardType.Blank, 'left'));
// leftPlayer.addCard(CardFactory.create(CardType.Blank, 'left'));

// const bidPopover = new BidPopover(rootElement);

// const playGround = new PlayGround(rootElement);
const dealGround = new DealGround(rootElement, players);
dealGround.init().show();
// playGround.putCard(CardFactory.create(CardType.Blank, 'bottom'), 'top');
// playGround.putCard(CardFactory.create(CardType.Blank, 'bottom'), 'right');
// playGround.putCard(CardFactory.create(CardType.Blank, 'bottom'), 'bottom');
// playGround.putCard(CardFactory.create(CardType.Blank, 'bottom'), 'left');