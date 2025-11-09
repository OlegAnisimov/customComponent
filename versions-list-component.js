"use strict"

export class VersionsListComponent extends HTMLElement {
  constructor(versionsArray) {
    
    super()
    // console.log(1, versionsArray);
    if (versionsArray) {
            this.versionsArray = Array.from(versionsArray.split(','));
    }
  }

  versionsArray;
  activeVersionId = 0;

  versionsListStyleSheet = new CSSStyleSheet();
  versionsListContainer = document.createElement('div');

  isInitialized = {
    isInit: false};

  connectedCallback() {
    if (this.isInitialized.isInit === false) {
      this.isInitialized.isInit = true;
      Object.freeze(this.isInitialized);
      console.log(2);
      
      const shadow = this.attachShadow({ mode: "open" });
      this.versionsListContainer.classList.add('versions-list-container');
      console.log(this.versionsArray);
      
      shadow.appendChild(this.versionsListContainer);
      console.log(this.versionsArray);
      
      this.versionsArray.forEach(version => {
        this.versionsListContainer.insertAdjacentHTML('afterbegin', `
                <a class="version"> Версия ${version}</a>
              `)
      });

      this.versionsListStyleSheet.replaceSync(`
        .versions-list-container {
          display: flex;
          flex-direction: column;
          height: 400px;
          width: 100%;
          max-width: 400px;
          border: 1px green solid;
              }
              
        .version__link {
          width: 98%;
          height: 77px;
          display: none;
          justify-content: space-around;
          align-items: center;
          position: relative;
          font-size: 16px;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease;
          line-height: 20px;
          opacity: 0.5;
          pointer-events: none;
      }

      .version__link.mobile {
          transition: all .3s ease-in-out .3s;
      }

      .version__link.active {
        display: block;
        font-size: 32px;
        opacity: 1;
        transform: scale(1);
        cursor: pointer;
        pointer-events: auto;
        background: rgba(217, 217, 217, 1);
        border-radius: 12px;
      }

      .version__link.adjacent {
        display: block;
        font-size: 24px;
        opacity: 0.8;
        transform: scale(0.8);
        height: 20px;
      }

      .version__link.distant {
        display: block;
        font-size: 20px;
        opacity: 0.6;
        transform: scale(0.6);
        height: 20px;
      }

      .top-version {
        margin-top: 77px;
      }

      .bottom-version {
        margin-bottom: 77px;
      }
        `);
      shadow.adoptedStyleSheets = [this.versionsListStyleSheet];
        console.log(shadow);
    }
      
      // this.versionsListContainer.innerText = '1111'
  }

  disconnectedCallback() {
    console.log("Custom element VersionsListComponent removed from page.");
  }

  connectedMoveCallback() {
    console.log("Custom element moved with moveBefore()");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("versions-list-container", VersionsListComponent);
/* TODO: 
  СХЕМА ПОЛУЧЕНИЯ ДАННЫХ
  при mouseenter делать запос
  

  минусы
  каждый раз при mouseenter делать запрос
**/