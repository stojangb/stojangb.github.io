import {initChoritoCycle} from './main.js';

class ChoritoCycle extends HTMLElement{
  constructor(){super();this.attachShadow({mode:'open'});}
  connectedCallback(){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href=new URL('./style.css', import.meta.url);
    this.shadowRoot.appendChild(link);
    const iconsUrl = new URL('./assets/infographic-icons.svg', import.meta.url);
    this.shadowRoot.innerHTML+=`
    <h1 class="title">Chilean Mussel Production Cycle</h1>
    <section class="timeline">
      <svg class="timeline__icons">
        <use href="${iconsUrl}#seed" id="icon-seed"></use>
        <use href="${iconsUrl}#juvenile" id="icon-juvenile"></use>
        <use href="${iconsUrl}#grow" id="icon-grow"></use>
        <use href="${iconsUrl}#harvest" id="icon-harvest"></use>
        <use href="${iconsUrl}#export" id="icon-export"></use>
      </svg>
      <input type="range" id="timeSlider" class="timeline__slider" min="0" max="30" step="1" value="0" aria-label="months">
      <div id="stageInfo" class="timeline__panel is-hidden"></div>
    </section>`;
    initChoritoCycle(this.shadowRoot, iconsUrl.toString());
  }
}
customElements.define('chorito-cycle', ChoritoCycle);
