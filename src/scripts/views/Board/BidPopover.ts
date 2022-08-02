import gsap from "gsap";

class BidPopover {
  container: HTMLElement;
  buttons: Array<HTMLElement> = [];
  onSelectBid: any = null;
  constructor(parent: HTMLElement | null, onSelectBid: any = null) {
    this.onSelectBid = onSelectBid;
    this.container = document.createElement('div');
    this.container.id = 'bid-div';
    parent?.appendChild(this.container);
    this.container.classList.add('absolute');
    this.container.classList.add('w-full');
    this.container.classList.add('sm:w-4/5');
    this.container.classList.add('bottom-[290px]');
    this.container.classList.add('text-center');
    this.container.classList.add('sm:left-[70px]');
    this.container.style.zIndex = '60';

    const wrapper = document.createElement('div');
    this.container.appendChild(wrapper);
    wrapper.classList.add('bg-tip');
    wrapper.classList.add('inline-block');
    wrapper.classList.add('rounded-lg');
    wrapper.classList.add('border-[1px]');
    wrapper.classList.add('border-black');
    wrapper.classList.add('p-1');
    
    const title = document.createElement('h4');
    wrapper.appendChild(title);
    title.classList.add('text-[#800000]');
    title.classList.add('text-center');
    title.classList.add('z-10');
    title.innerHTML = "What's your bid?";
    for( let i = 0; i < 14; i++ ) {
      const button = document.createElement('span');
      button.innerHTML = '' + i;
      wrapper.appendChild(button);
      this.buttons.push(button);
      button.onclick = (e: MouseEvent) => {
        this.onClickBid(i);
      };
    }

    this.container.style.visibility = 'hidden';
  }

  onClickBid(level: number) {
    if ( this.onSelectBid ) this.onSelectBid(level);
    this.hide();
  }

  show(maxLevel: number = 13) {
    this.setBidLevel(maxLevel);
    gsap.set(this.container, {opacity: 0});
    gsap.to(this.container, {opacity: 1, onComplete: () => {
      this.container.style.visibility = 'visible';
    }})
  }

  hide() {
    gsap.to(this.container, {opacity: 0, onComplete: () => {
      this.container.style.visibility = 'hidden';
    }})
  }

  setBidLevel(maxLevel: number) {
    this.buttons.forEach( (btn, i) => {
      if ( i > maxLevel )
        btn.style.display = 'none';
      else
        btn.style.display = 'inline-block';
    })
  }
}

export default BidPopover;