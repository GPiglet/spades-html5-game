// <div id="bid-div" class="absolute z-40 w-full bottom-[290px] text-center">
//     <div id="bid-div-inner" class="bg-tip inline-block z-40 rounded-lg border-[1px] border-black p-1">
//         <h4 class="text-[#800000] text-center z-10">What's your bid?</h4>
//         <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span>
//     </div>
// </div>
class BidPopover {
  container: HTMLElement;
  constructor(parent: HTMLElement | null) {
    this.container = document.createElement('div');
    this.container.id = 'bid-div';
    parent?.appendChild(this.container);
    this.container.classList.add('absolute');
    this.container.classList.add('z-40');
    this.container.classList.add('w-full');
    this.container.classList.add('bottom-[290px]');
    this.container.classList.add('text-center');

    const wrapper = document.createElement('div');
    this.container.appendChild(wrapper);
    wrapper.classList.add('bg-tip');
    wrapper.classList.add('inline-block');
    wrapper.classList.add('z-40');
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
    }
  }
}

export default BidPopover;