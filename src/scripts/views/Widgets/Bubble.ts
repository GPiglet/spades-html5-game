import gsap from 'gsap';

class Bubble {
  container: HTMLElement;
  wrapper: HTMLElement;

  constructor(parent: HTMLElement, position: string, message: string | null = null) {
    this.container = document.createElement('div');
    parent.appendChild(this.container);
    this.container.classList.add('w-[130px]');
    this.container.classList.add('h-[97px]');
    this.container.classList.add('bg-no-repeat');
    this.container.classList.add('cursor-pointer');
    this.container.classList.add('absolute');
    this.container.classList.add('z-50');

    this.wrapper = document.createElement('p');
    this.container.appendChild(this.wrapper);    
    this.wrapper.classList.add('ml-[30px]');
    this.wrapper.classList.add('text-[22px]');
    
    switch( position ) {
      case 'top':
        this.container.classList.add("bg-[url('../public/assets/images/speech-top.svg')]");
        this.container.classList.add('top-[32px]');
        this.container.classList.add('right-[42px]');
        this.wrapper.classList.add('mt-[40px]');
        break;
      case 'left':
        this.container.classList.add("bg-[url('../public/assets/images/speech-left.svg')]");
        this.container.classList.add('bottom-[15px]');
        this.container.classList.add('left-[54px]');
        this.wrapper.classList.add('mt-[20px]');
        break;
      case 'right':
        this.container.classList.add("bg-[url('../public/assets/images/speech-right.svg')]");
        this.container.classList.add('bottom-[15px]');
        this.container.classList.add('right-[54px]');
        this.wrapper.classList.add('mt-[20px]');
        break;
      case 'bottom':
        this.container.classList.add("bg-[url('../public/assets/images/speech-left.svg')]");
        this.container.classList.add('bottom-[10px]');
        this.container.classList.add('left-[50px]');
        this.wrapper.classList.add('mt-[20px]');
        break;
    }

    gsap.set(this.container, {display: 'none'});
    if ( message ) this.show(message);
    
  }

  show(message: string, autoHide: boolean=true) {
    this.wrapper.innerHTML = message;    
    gsap.to(this.container, {opacity: 1, onComplete: () => {
      this.container.style.display = 'block';
    }});
    if ( autoHide ) setTimeout(() => {
      this.hide();
    }, 3000);;
  }  

  hide() {
    gsap.to(this.container, {opacity: 0, onComplete: () => {
      this.container.style.display = 'none';
    }});
  }
}

export default Bubble;