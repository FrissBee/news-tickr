"use strict";(()=>{const t=document.createElement("template");t.innerHTML=`
    <style>
      .ticker-container {  width: 100%; overflow: hidden; }
      .ticker-wrapper { width: 100%; padding-left: 100%; background-color: transparent; }
      @keyframes ticker {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-100%, 0, 0); }
      }
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
    </style>
    <div class="ticker-container" part="tickr-container-v">
      <div class="ticker-wrapper">
        <div class="ticker-transition">
          <slot></slot>
        </div>
      </div>
    </div>
  `;class i extends HTMLElement{#root=null;#tickerContainer=null;#tickerTransition=null;#slot=null;#items=null;#tickerItems=null;constructor(){super(),this.#root=this.attachShadow({mode:"closed"}),this.#root.appendChild(t.content.cloneNode(!0)),this.#tickerContainer=this.#root.querySelector(".ticker-container"),this.#tickerTransition=this.#root.querySelector(".ticker-transition"),this.#slot=this.#root.querySelector("slot")}static get observedAttributes(){return["animation-time","bg-color","is-top","is-bottom","border-color","border-radius","item-padding"]}attributeChangedCallback(t,i,e){"animation-time"===t?this.#tickerTransition.style.animationDuration=Number(e)+"s":"bg-color"===t?this.#tickerContainer.style.background=e:"border-color"===t?this.#tickerContainer.style.border=e:"border-radius"===t?this.#tickerContainer.style.borderRadius=e:"is-top"===t?(this.#tickerContainer.style.position=this.hasAttribute("is-fixed")?"fixed":"absolute",this.#tickerContainer.style.top=e,this.#tickerContainer.style.left=0,this.#tickerContainer.style.zIndex=99):"is-bottom"===t&&(this.#tickerContainer.style.position=this.hasAttribute("is-fixed")?"fixed":"absolute",this.#tickerContainer.style.bottom=e,this.#tickerContainer.style.left=0,this.#tickerContainer.style.zIndex=99)}connectedCallback(){this.#items=this.#slot.assignedElements(),this.#setItems(this.#items,this.#tickerTransition),this.hasAttribute("item-padding")&&(this.#tickerItems=this.#root.querySelectorAll(".ticker-item"),this.#tickerItems.forEach(t=>t.style.padding=this.getAttribute("item-padding")))}#setItems(t,i){let e="";t.forEach(t=>{e+='<div class="ticker-item">'+t.innerHTML+"</div>"}),i.innerHTML=e}}customElements.define("news-tickr-h",i)})(),(()=>{const t=document.createElement("template");t.innerHTML=`
    <style class="keyframe">
      @keyframes ticker {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(0, calc(-100% - 40px), 0); }
      }
    </style>
    <style>
      .ticker-container { width: 100%; overflow: hidden; height: 40px; }
      .ticker-wrapper {
        width: 100%;
        padding-top: 40px;
        background-color: transparent;
        display: flex;
        justify-content: center;
      }
      .ticker-transition {
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-name: ticker;
        animation-duration: 4s;
        text-align: center;
      }
      .ticker-transition:hover { animation-play-state: paused; cursor: default; }
      .ticker-item { display: block; padding: 18px 0;  }
    </style>
    <div class="ticker-container" part="tickr-container-v">
      <div class="ticker-wrapper">
        <div class="ticker-transition">
          <slot></slot>
        </div>
      </div>
    </div>
  `;class i extends HTMLElement{#root=null;#stylesheet=null;#tickerContainer=null;#tickerWrapper=null;#tickerTransition=null;#slot=null;#tickerItems=null;#items=null;constructor(){super(),this.#root=this.attachShadow({mode:"closed"}),this.#root.appendChild(t.content.cloneNode(!0)),this.#stylesheet=this.#root.querySelector("style.keyframe"),this.#tickerContainer=this.#root.querySelector(".ticker-container"),this.#tickerWrapper=this.#root.querySelector(".ticker-wrapper"),this.#tickerTransition=this.#root.querySelector(".ticker-transition"),this.#slot=this.#root.querySelector("slot")}static get observedAttributes(){return["animation-time","bg-color","ticker-height","item-padding","is-top","is-bottom","border-color","border-radius","text-position"]}attributeChangedCallback(t,i,e){"animation-time"===t?this.#tickerTransition.style.animationDuration=Number(e)+"s":"bg-color"===t?this.#tickerContainer.style.background=e:"border-color"===t?this.#tickerContainer.style.border=e:"border-radius"===t?this.#tickerContainer.style.borderRadius=e:"ticker-height"===t?(this.#tickerContainer.style.height=e,this.#tickerWrapper.style.paddingTop=e,this.#stylesheet.innerHTML=`@keyframes ticker { 
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(0, calc(-100% - ${e}), 0); } 
          }`):"is-top"===t?(this.#tickerContainer.style.position=this.hasAttribute("is-fixed")?"fixed":"absolute",this.#tickerContainer.style.top=e,this.#tickerContainer.style.left=0,this.#tickerContainer.style.zIndex=99):"is-bottom"===t?(this.#tickerContainer.style.position=this.hasAttribute("is-fixed")?"fixed":"absolute",this.#tickerContainer.style.bottom=e,this.#tickerContainer.style.left=0,this.#tickerContainer.style.zIndex=99):"text-position"===t&&(this.#tickerWrapper.style.justifyContent=e,this.#tickerTransition.style.textAlign=e)}connectedCallback(){this.#items=this.#slot.assignedElements(),this.#setItems(this.#items,this.#tickerTransition),this.hasAttribute("item-padding")&&(this.#tickerItems=this.#root.querySelectorAll(".ticker-item"),this.#tickerItems.forEach(t=>t.style.padding=this.getAttribute("item-padding")))}#setItems(t,i){let e="";t.forEach(t=>{e+='<div class="ticker-item">'+t.innerHTML+"</div>"}),i.innerHTML=e}}customElements.define("news-tickr-v",i)})();