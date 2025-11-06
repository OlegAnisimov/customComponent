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
      
      this.versionsListStyleSheet.replaceSync(`.versions-list-container {
        display: flex;
        flex-direction: column;
        height: 400px;
        width: 100%;
        max-width: 400px;
        border: 1px green solid;
        }`);
      shadow.adoptedStyleSheets = [this.versionsListStyleSheet];
        console.log(shadow);
    }
      
      // this.versionsListContainer.innerText = '1111'
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
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
