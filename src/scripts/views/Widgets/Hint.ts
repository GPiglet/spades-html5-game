import gsap from "gsap";

class Hint {
  container: HTMLElement;
  wrapper: HTMLElement;

  constructor(parent: HTMLElement | null) {
    this.container = document.createElement('div');
    parent?.appendChild(this.container);
    this.container.classList.add('absolute');
    this.container.classList.add('sm:block');
    this.container.classList.add('left-[175px]');
    this.container.classList.add('top-[365px]');
    this.container.classList.add('w-1/2');
    this.container.classList.add('hidden');

    this.wrapper = document.createElement('p');
    this.container.appendChild(this.wrapper);
    this.wrapper.classList.add('h-[38px]');
    this.wrapper.classList.add('text-xs');
    this.wrapper.classList.add('bg-tip');
    this.wrapper.classList.add('rounded-md');
    this.wrapper.classList.add('px-[6px]');
    this.wrapper.classList.add('text-gray-800');
    this.wrapper.classList.add('py-[3px]');
    this.wrapper.classList.add('w-full');
  }

  setText(text: string) {
    this.wrapper.innerHTML = text;
  }

  show() {
    gsap.to(this.container, {opacity: 1, onComplete: () => {
      this.container.style.visibility = 'visible';
    }});
  }

  hide() {
    gsap.to(this.container, {opacity: 0, onComplete: () => {
      this.container.style.visibility = 'hidden';
    }});
  }
}

export default Hint;