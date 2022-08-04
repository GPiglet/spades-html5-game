import gsap from "gsap";

class ScorePad {
  parent: HTMLElement | null;
  container: HTMLElement;
  scoreLabel: HTMLElement;
  bid: number = 0;
  score: number = 0;
  position: string;
  x: number = 0;
  y: number = 0;
  offsetX: number = 0;
  offsetY: number = 0;
  cardWidth: number = 0;
  cardHeight: number = 0;
  constructor(parent: HTMLElement | null, position: string) {
    this.parent = parent;
    this.position = position;
    this.container = document.createElement('div');
    parent?.appendChild(this.container);
    this.container.classList.add('absolute');

    this.calcPositions();
    window.addEventListener('resize', () => {
      this.onResize();
    })

    this.scoreLabel = document.createElement('div');
    this.container.appendChild(this.scoreLabel);
    this.scoreLabel.classList.add('text-white');
    this.scoreLabel.classList.add('text-lg');
    this.scoreLabel.classList.add('font-medium');
    this.scoreLabel.classList.add('absolute');

    this.scoreLabel.style.left = this.x + 3 + 'px';
    this.scoreLabel.style.top = this.y + 5 + 'px';
  }

  init() {
    while ( true ) {
      if ( this.container.children.length == 1 ) break;
      this.container.firstChild?.remove();
    }
    this.setBid(0);
    this.setScore(0);
    this.onResize();
  }

  onResize() {
    this.calcPositions();
    let left = '', top = '';
    for ( let i = 0; i < this.container.children.length - 1; i++ ) {
      const trick = this.container.children[i];
      left = (this.position == 'bottom') ? this.x - this.cardWidth/2 + i * this.offsetX + 'px' : this.x + i * this.offsetX + 'px';
      top = (this.position == 'left') ? this.y - this.cardWidth/2 + i * this.offsetY + 'px' : this.y + i * this.offsetY + 'px';
      gsap.set(trick, {left, top});
    }

    left = this.x + 3 + 'px', top = this.y + 5 + 'px';
    gsap.set(this.scoreLabel, {left, top});
    if ( this.container.children.length > 1 ) {
      if ( this.position == 'top' ) gsap.set(this.scoreLabel, {left: '+=' + this.cardWidth});
      if ( this.position == 'left' ) gsap.set(this.scoreLabel, {top: '-=' + (this.cardWidth + 10)});
      if ( this.position == 'right' ) gsap.set(this.scoreLabel, {top: '+=' + this.cardWidth});
      if ( this.position == 'bottom' ) gsap.set(this.scoreLabel, {left: '-=' + (this.cardWidth + 20)});
    } 
  }

  calcPositions() {
    const windowWidth = window.innerWidth;
    const parentWidth = this.parent ? this.parent.getBoundingClientRect().width - 10 : 0, parentHeight = this.parent ? this.parent.getBoundingClientRect().height - 10 : 0;
    
    let breakpoint = 0;
    if ( windowWidth > 370 ) breakpoint = 1;
    if ( windowWidth > 730 ) breakpoint = 2;

    const widths = [27, 27, 33];
    this.cardWidth = widths[breakpoint];

    const offsets = [4, 6, 6];
    const offset = offsets[breakpoint];
    const diffFromCharac = 35;
    
    switch( this.position ) {
      case 'top':
        {
          const ys = [5, 5, 5];
          this.x = parentWidth / 2 + diffFromCharac;
          this.y = ys[breakpoint];
          this.offsetX = offset;
          this.offsetY = 0;
        }
        break;
      case 'left':
        {
          const xs = [8, 8, 8];
          this.x = xs[breakpoint]
          this.y = parentHeight / 2 - diffFromCharac - 30;
          this.offsetX = 0;
          this.offsetY = -offset;
        }  
        break;
      case 'right':
        {
          const xs = [parentWidth - 37, parentWidth - 37, 643];
          this.x = xs[breakpoint]
          this.y = parentHeight / 2  + diffFromCharac + 10;
          this.offsetX = 0;
          this.offsetY = offset;
        }
        break;
      case 'bottom':
        {
          const ys = [625, 625, 420 + 100];
          const diffX = [55, 55, 65];
          this.x = parentWidth / 2 - diffX[breakpoint];
          this.y = ys[breakpoint];
          this.offsetX = -offset;
          this.offsetY = 0;
        }
        break;  
    }
  }

  setBid(n: number) {
    this.bid = n;
    this.scoreLabel.innerHTML = `${this.score}/${this.bid}`;
  }

  setScore(n: number) {
    this.score = n;
    this.scoreLabel.innerHTML = `${this.score}/${this.bid}`;
  }

  increaseScore() {
    this.setScore(this.score+1);

    // move effect
    gsap.to(this.container.children, {duration: 0.2, left: '+=' + this.offsetX, top: '+=' + this.offsetY});
    if ( this.container.children.length == 1 ) {
      if ( this.position == 'top' ) gsap.set(this.scoreLabel, {left: '+=' + this.cardWidth});
      if ( this.position == 'left' ) gsap.set(this.scoreLabel, {top: '-=' + this.cardWidth});
      if ( this.position == 'right' ) gsap.set(this.scoreLabel, {top: '+=' + this.cardWidth});
      if ( this.position == 'bottom' ) gsap.set(this.scoreLabel, {left: '-=' + (this.cardWidth + 10)});
    } 

    // insert a card
    const trick = document.createElement('div');
    this.container.insertBefore(trick, this.container.firstChild);
    trick.classList.add("bg-[url('../public/assets/images/trick-card.png')]");
    trick.classList.add("bg-cover");
    trick.classList.add("absolute");
    trick.classList.add("w-[27px]");
    trick.classList.add("h-[37px]");
    trick.classList.add("sm:w-[33px]");
    trick.classList.add("sm:h-[45px]");
    if ( this.position == 'left' || this.position == 'right' ) trick.classList.add("rotate-90");
    trick.style.left = (this.position == 'bottom') ? this.x - this.cardWidth/2 + 'px' : this.x + 'px';
    trick.style.top = (this.position == 'left') ? this.y - this.cardWidth/2 + 'px' : this.y + 'px';
    
    //first insert
    if ( this.container.children.length == 2 ) {
      gsap.set(trick, {opacity: 0});
      gsap.to(trick, {duration: 0.2, opacity: 1});
    }

    return trick;
  }

}

export default ScorePad;