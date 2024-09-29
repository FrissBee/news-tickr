'use strict';
(() => {
  const t = document.createElement('template');
  t.innerHTML = `
    <style>
      .ticker-container {  width: 100%; overflow: hidden; box-sizing: border-box; }
      .ticker-wrapper { width: 100%; padding-left: 100%; background-color: transparent; }
      .ticker-transition { display: inline-block; white-space: nowrap; padding-right: 100%; animation-iteration-count: infinite; animation-timing-function: linear; animation-name: ticker; animation-duration: 20s; }
      .ticker-transition:hover { animation-play-state: paused; cursor: default; }
      .ticker-item { display: inline-block; padding: 0 2rem; }
      @keyframes ticker { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-100%, 0, 0); } }
    </style>
    <div class="ticker-container" part="tickr-container-h">
      <div class="ticker-wrapper" part="tickr-wrapper-h">
        <div class="ticker-transition">
          <slot></slot>
        </div>
      </div>
    </div>
  `;
  class e extends HTMLElement {
    #root = null;
    #tickerContainer = null;
    #tickerTransition = null;
    #slot = null;
    #items = null;
    #tickerItems = null;
    constructor() {
      super(),
        (this.#root = this.attachShadow({ mode: 'closed' })),
        this.#root.appendChild(t.content.cloneNode(!0)),
        (this.#tickerContainer = this.#root.querySelector('.ticker-container')),
        (this.#tickerTransition = this.#root.querySelector('.ticker-transition')),
        (this.#slot = this.#root.querySelector('slot'));
    }
    static get observedAttributes() {
      return ['animation-time', 'bg-color', 'is-top', 'is-bottom', 'border-color', 'border-radius', 'item-padding'];
    }
    attributeChangedCallback(t, e, i) {
      'animation-time' === t
        ? (this.#tickerTransition.style.animationDuration = Number(i) + 's')
        : 'bg-color' === t
        ? (this.#tickerContainer.style.background = i)
        : 'border-color' === t
        ? (this.#tickerContainer.style.border = i)
        : 'border-radius' === t
        ? (this.#tickerContainer.style.borderRadius = i)
        : 'is-top' === t
        ? ((this.#tickerContainer.style.position = this.hasAttribute('is-fixed') ? 'fixed' : 'absolute'),
          (this.#tickerContainer.style.top = i),
          (this.#tickerContainer.style.left = 0),
          (this.#tickerContainer.style.zIndex = 99))
        : 'is-bottom' === t &&
          ((this.#tickerContainer.style.position = this.hasAttribute('is-fixed') ? 'fixed' : 'absolute'),
          (this.#tickerContainer.style.bottom = i),
          (this.#tickerContainer.style.left = 0),
          (this.#tickerContainer.style.zIndex = 99));
    }
    connectedCallback() {
      (this.#items = this.#slot.assignedElements()),
        this.#setItems(this.#items, this.#tickerTransition),
        this.hasAttribute('item-padding') &&
          ((this.#tickerItems = this.#root.querySelectorAll('.ticker-item')), this.#tickerItems.forEach((t) => (t.style.padding = this.getAttribute('item-padding'))));
    }
    #setItems(t, e) {
      let i = '';
      t.forEach((t) => {
        i += '<div class="ticker-item">' + t.innerHTML + '</div>';
      }),
        (e.innerHTML = i);
    }
  }
  customElements.define('news-tickr-h', e);
  const i = document.createElement('template');
  i.innerHTML = `
    <style class="keyframe">
      @keyframes ticker { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(0, calc(-100% - 40px), 0); } }
    </style>
    <style>
      .ticker-container { width: 100%; overflow: hidden; height: 40px; }
      .ticker-wrapper { width: 100%; padding-top: 40px; background-color: transparent; display: flex; justify-content: center; position: relative; }
      .ticker-transition { animation-iteration-count: infinite; animation-timing-function: linear; animation-name: ticker; animation-duration: 4s; text-align: center; position: relative; }
      .ticker-transition:hover { animation-play-state: paused; cursor: default; }
    </style>
    <div class="ticker-container" part="tickr-container-v">
      <div class="ticker-wrapper" part="trickr-wrapper-v">
        <div class="ticker-transition">
          <slot></slot>
        </div>
      </div>
    </div>
  `;
  class r extends HTMLElement {
    #root = null;
    #stylesheet = null;
    #tickerContainer = null;
    #tickerWrapper = null;
    #tickerTransition = null;
    #slot = null;
    #tickerItems = null;
    #items = null;
    #tickerContainerHeight = 40;
    constructor() {
      super(),
        (this.#root = this.attachShadow({ mode: 'closed' })),
        this.#root.appendChild(i.content.cloneNode(!0)),
        (this.#stylesheet = this.#root.querySelector('style.keyframe')),
        (this.#tickerContainer = this.#root.querySelector('.ticker-container')),
        (this.#tickerWrapper = this.#root.querySelector('.ticker-wrapper')),
        (this.#tickerTransition = this.#root.querySelector('.ticker-transition')),
        (this.#slot = this.#root.querySelector('slot'));
    }
    static get observedAttributes() {
      return ['animation-time', 'bg-color', 'ticker-height', 'item-padding', 'is-top', 'is-bottom', 'border-color', 'border-radius', 'text-position', 'pause-line'];
    }
    attributeChangedCallback(t, e, i) {
      'animation-time' === t
        ? (this.#tickerTransition.style.animationDuration = Number(i) + 's')
        : 'bg-color' === t
        ? (this.#tickerContainer.style.background = i)
        : 'border-color' === t
        ? (this.#tickerContainer.style.border = i)
        : 'border-radius' === t
        ? (this.#tickerContainer.style.borderRadius = i)
        : 'ticker-height' === t
        ? ((this.#tickerContainer.style.height = i),
          (this.#tickerContainerHeight = Number(i.replace('px', ''))),
          this.hasAttribute('pause-line') ||
            ((this.#tickerWrapper.style.paddingTop = i),
            (this.#stylesheet.innerHTML = `@keyframes ticker { 
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(0, calc(-100% - ${i}), 0); } 
            }`)))
        : 'is-top' === t
        ? ((this.#tickerContainer.style.position = this.hasAttribute('is-fixed') ? 'fixed' : 'absolute'),
          (this.#tickerContainer.style.top = i),
          (this.#tickerContainer.style.left = 0),
          (this.#tickerContainer.style.zIndex = 99))
        : 'is-bottom' === t
        ? ((this.#tickerContainer.style.position = this.hasAttribute('is-fixed') ? 'fixed' : 'absolute'),
          (this.#tickerContainer.style.bottom = i),
          (this.#tickerContainer.style.left = 0),
          (this.#tickerContainer.style.zIndex = 99))
        : 'text-position' === t && ((this.#tickerWrapper.style.justifyContent = i), (this.#tickerTransition.style.textAlign = i));
    }
    connectedCallback() {
      (this.#items = this.#slot.assignedElements()),
        this.#setItems(this.#items, this.#tickerTransition),
        (this.#tickerItems = this.#root.querySelectorAll('.ticker-item')),
        this.hasAttribute('pause-line')
          ? (this.#tickerItems.forEach((t) => {
              (t.style.height = this.#tickerContainerHeight + 'px'),
                (t.style.padding = this.hasAttribute('item-padding') ? this.getAttribute('item-padding') : '0'),
                (t.style.display = 'flex'),
                (t.style.alignItems = 'center');
            }),
            (this.#tickerWrapper.style.paddingTop = '0'),
            (this.#stylesheet.innerHTML = this.#setKeyframePause(this.#items.length, this.#tickerContainerHeight)))
          : this.#tickerItems.forEach((t) => (t.style.padding = this.getAttribute('item-padding')));
    }
    #setItems(t, e) {
      let i = '';
      t.forEach((t) => {
        i += '<div class="ticker-item">' + t.innerHTML + '</div>';
      }),
        (e.innerHTML = i);
    }
    #setKeyframePause = (e, i) => {
      var r = Number((100 / (2 * e + 1)).toFixed(3));
      let s = r,
        n = i - i,
        o = ` @keyframes ticker { 0% { top: ${i}px; }`;
      for (let t = 0; t < e; t++) (o += ` ${s}% { top: ${n}px; }`), (s = Number((s + r).toFixed(3))), (o += ` ${s}% { top: ${n}px; }`), (s = Number((s + r).toFixed(3))), (n -= i);
      return o + ` 100% { top: ${n}px;} }`;
    };
  }
  customElements.define('news-tickr-v', r);
})();
