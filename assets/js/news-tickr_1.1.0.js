'use strict';

(() => {
  const templateH = document.createElement('template');

  templateH.innerHTML = /* html */ `
    <style>
      .ticker-container {  width: 100%; overflow: hidden; box-sizing: border-box; }
      .ticker-wrapper { width: 100%; padding-left: 100%; background-color: transparent; }
      .ticker-transition {
        display: inline-block;
        white-space: nowrap;
        padding-right: 100%;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-name: ticker;
        animation-duration: 20s;
      }
      .ticker-transition:hover { animation-play-state: paused; cursor: default; }
      .ticker-item { display: inline-block; padding: 0 2rem; }
      @keyframes ticker {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-100%, 0, 0); }
      }
    </style>
    <div class="ticker-container" part="tickr-container-h">
      <div class="ticker-wrapper" part="tickr-wrapper-h">
        <div class="ticker-transition">
          <slot></slot>
        </div>
      </div>
    </div>
  `;

  class NewsTickrH extends HTMLElement {
    #root = null;
    #tickerContainer = null;
    #tickerTransition = null;
    #slot = null;
    #items = null;
    #tickerItems = null;

    constructor() {
      super();
      this.#root = this.attachShadow({ mode: 'closed' });
      this.#root.appendChild(templateH.content.cloneNode(true));

      this.#tickerContainer = this.#root.querySelector('.ticker-container');
      this.#tickerTransition = this.#root.querySelector('.ticker-transition');
      this.#slot = this.#root.querySelector('slot');
    }

    static get observedAttributes() {
      return ['animation-time', 'bg-color', 'is-top', 'is-bottom', 'border-color', 'border-radius', 'item-padding'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'animation-time') {
        this.#tickerTransition.style.animationDuration = Number(newValue) + 's';
      } else if (name === 'bg-color') {
        this.#tickerContainer.style.background = newValue;
      } else if (name === 'border-color') {
        this.#tickerContainer.style.border = newValue;
      } else if (name === 'border-radius') {
        this.#tickerContainer.style.borderRadius = newValue;
      } else if (name === 'is-top') {
        this.#tickerContainer.style.position = this.hasAttribute('is-fixed') ? 'fixed' : 'absolute';
        this.#tickerContainer.style.top = newValue;
        this.#tickerContainer.style.left = 0;
        this.#tickerContainer.style.zIndex = 99;
      } else if (name === 'is-bottom') {
        this.#tickerContainer.style.position = this.hasAttribute('is-fixed') ? 'fixed' : 'absolute';
        this.#tickerContainer.style.bottom = newValue;
        this.#tickerContainer.style.left = 0;
        this.#tickerContainer.style.zIndex = 99;
      }
    }

    connectedCallback() {
      this.#items = this.#slot.assignedElements();
      this.#setItems(this.#items, this.#tickerTransition);

      if (this.hasAttribute('item-padding')) {
        this.#tickerItems = this.#root.querySelectorAll('.ticker-item');
        this.#tickerItems.forEach((elem) => (elem.style.padding = this.getAttribute('item-padding')));
      }
    }

    #setItems(items, tickerTransition) {
      let result = '';
      items.forEach((elem) => {
        result += '<div class="ticker-item">' + elem.innerHTML + '</div>';
      });
      tickerTransition.innerHTML = result;
    }
  }

  customElements.define('news-tickr-h', NewsTickrH);

  // =================================================

  const defaultHeight = 40;

  const templateV = document.createElement('template');

  templateV.innerHTML = /* html */ `
    <style class="keyframe">
      @keyframes ticker {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(0, calc(-100% - ${defaultHeight}px), 0); }
      }
    </style>
    <style>
      .ticker-container { width: 100%; overflow: hidden; height: ${defaultHeight}px; }
      .ticker-wrapper {
        width: 100%;
        padding-top: ${defaultHeight}px;
        background-color: transparent;
        display: flex;
        justify-content: center;
        position: relative;
      }
      .ticker-transition {
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-name: ticker;
        animation-duration: 4s;
        text-align: center;
        position: relative;
      }
      .ticker-transition:hover { animation-play-state: paused; cursor: default; }
      .ticker-item { display: flex; align-items: center; }
    </style>
    <div class="ticker-container" part="tickr-container-v">
      <div class="ticker-wrapper" part="trickr-wrapper-v">
        <div class="ticker-transition">
          <slot></slot>
        </div>
      </div>
    </div>
  `;

  class NewsTickrV extends HTMLElement {
    #root = null;
    #stylesheet = null;
    #tickerContainer = null;
    #tickerWrapper = null;
    #tickerTransition = null;
    #slot = null;
    #tickerItems = null;
    #items = null;
    #tickerContainerHeight = defaultHeight;

    constructor() {
      super();
      this.#root = this.attachShadow({ mode: 'closed' });
      this.#root.appendChild(templateV.content.cloneNode(true));

      this.#stylesheet = this.#root.querySelector('style.keyframe');
      this.#tickerContainer = this.#root.querySelector('.ticker-container');
      this.#tickerWrapper = this.#root.querySelector('.ticker-wrapper');
      this.#tickerTransition = this.#root.querySelector('.ticker-transition');
      this.#slot = this.#root.querySelector('slot');
    }

    static get observedAttributes() {
      return ['animation-time', 'bg-color', 'ticker-height', 'item-padding', 'is-top', 'is-bottom', 'border-color', 'border-radius', 'text-position', 'pause-line'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'animation-time') {
        this.#tickerTransition.style.animationDuration = Number(newValue) + 's';
      } else if (name === 'bg-color') {
        this.#tickerContainer.style.background = newValue;
      } else if (name === 'border-color') {
        this.#tickerContainer.style.border = newValue;
      } else if (name === 'border-radius') {
        this.#tickerContainer.style.borderRadius = newValue;
      } else if (name === 'ticker-height') {
        this.#tickerContainer.style.height = newValue;
        this.#tickerContainerHeight = Number(newValue.replace('px', ''));
        if (!this.hasAttribute('pause-line')) {
          this.#tickerWrapper.style.paddingTop = newValue;
          this.#stylesheet.innerHTML = `@keyframes ticker { 
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(0, calc(-100% - ${newValue}), 0); } 
            }`;
        }
      } else if (name === 'is-top') {
        this.#tickerContainer.style.position = this.hasAttribute('is-fixed') ? 'fixed' : 'absolute';
        this.#tickerContainer.style.top = newValue;
        this.#tickerContainer.style.left = 0;
        this.#tickerContainer.style.zIndex = 99;
      } else if (name === 'is-bottom') {
        this.#tickerContainer.style.position = this.hasAttribute('is-fixed') ? 'fixed' : 'absolute';
        this.#tickerContainer.style.bottom = newValue;
        this.#tickerContainer.style.left = 0;
        this.#tickerContainer.style.zIndex = 99;
      } else if (name === 'text-position') {
        this.#tickerWrapper.style.justifyContent = newValue;
        this.#tickerTransition.style.textAlign = newValue;
      }
    }

    connectedCallback() {
      this.#items = this.#slot.assignedElements();
      this.#setItems(this.#items, this.#tickerTransition);
      this.#tickerItems = this.#root.querySelectorAll('.ticker-item');

      if (!this.hasAttribute('pause-line')) {
        this.#tickerItems.forEach((elem) => (elem.style.padding = this.getAttribute('item-padding')));
      } else {
        this.#tickerItems.forEach((elem) => {
          elem.style.height = this.#tickerContainerHeight + 'px';
          elem.style.padding = this.hasAttribute('item-padding') ? this.getAttribute('item-padding') : '0';
        });
        this.#tickerWrapper.style.paddingTop = '0';
        this.#stylesheet.innerHTML = this.#setKeyframePause(this.#items.length, this.#tickerContainerHeight);
      }
    }

    #setItems(items, tickerTransition) {
      let result = '';
      items.forEach((elem) => {
        result += '<div class="ticker-item">' + elem.innerHTML + '</div>';
      });
      tickerTransition.innerHTML = result;
    }

    #setKeyframePause = (nbrOfItems, divHeight) => {
      const devisor = nbrOfItems * 2 + 1;
      const percentInterval = Number((100 / devisor).toFixed(3));
      let nextPercent = percentInterval;
      let nextTop = divHeight - divHeight;
      let result = ` @keyframes ticker { 0% { top: ${divHeight}px; }`;

      for (let i = 0; i < nbrOfItems; i++) {
        result += ` ${nextPercent}% { top: ${nextTop}px; }`;
        nextPercent = Number((nextPercent + percentInterval).toFixed(3));
        result += ` ${nextPercent}% { top: ${nextTop}px; }`;
        nextPercent = Number((nextPercent + percentInterval).toFixed(3));
        nextTop = nextTop - divHeight;
      }

      return result + ` 100% { top: ${nextTop}px;} }`;
    };
  }

  customElements.define('news-tickr-v', NewsTickrV);
})();
