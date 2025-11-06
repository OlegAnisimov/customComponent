"use strict"
import { VersionsListComponent } from "./versions-list-component.js";

// TODO: think about do it like <template>
// https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots#the_truth_about_templates
class ProductElement extends HTMLElement {
  constructor() {
    super()
    if (this.getAttribute('data-versions-list')) {
      this.versionsListComponent = new VersionsListComponent(this.getAttribute('data-versions-list'));
      // console.log('super', this.getAttribute('data-versions-list'));
    }    
  }
  
  breakpoints = {
    mobile: 480,
    tablet: 768,
    desktop: 1024
  };
  desctopDefaultView = `
    <div class="default-view default-view_desctop">
      desctop DefaultView
    </div>
  `;

  mobileDefaultView = `
    <div class="default-view default-view_mobile">
      mobile DefaultView
    </div>
  `;


  currentStateInterface = {
    defaultView: {
      desctop: this.desctopDefaultView,
      mobile: this.mobileDefaultView
    },
    versionsList: {
      desctop: this.desctopVersionsList,
      mobile: this.mobileVersionsList
    }
  };
  currentState;

  desctopVersionsList;
  mobileVersionsList;

  eventsHandlers = {
    windowResizeListener: null,
  }

  productContainerStyleSheet = new CSSStyleSheet();

  initialDesignType;
  versionsListComponent; 

  
  connectedCallback() {
    // console.log("Custom element added to page.");
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    // console.log(shadow);

    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');
    shadow.appendChild(productContainer);
    
    const setDefaultDesign = () => {
      if (window.innerWidth <= this.breakpoints.mobile) {
        productContainer.innerHTML = this.mobileDefaultView;
      } else {
        productContainer.innerHTML = this.desctopDefaultView; 
      }
    }

// 
    this.productContainerStyleSheet.replaceSync(`.product-container {
  display: block;
  height: 400px;
  width: 400px;
}`);

  shadow.adoptedStyleSheets = [this.productContainerStyleSheet];
    
    this.eventsHandlers.windowResizeListener = window.addEventListener('resize', setDefaultDesign);
    
    setDefaultDesign();
    // if (this.getAttribute('data-product-name')) {
    //   shadow.innerHTML = this.getAttribute('data-product-name');
    // }
    // console.log(this.parentElement);
    

    this.addEventListener('mouseenter', (e) => {
      if (this.hasAttribute('data-versions-list') && this.getAttribute('data-versions-list')) {        
        e.stopImmediatePropagation(); //TODO: research it
        // всегла на ивент будет создавать versionsList - есть смысл создать до тригерра ивента
        productContainer.querySelector('.default-view').classList.add('hidden');
        productContainer.insertBefore(this.versionsListComponent, productContainer.firstChild);
      }
    });

    this.addEventListener('mouseleave', () => {
      
      this.versionsListComponent.remove();
      setDefaultDesign();
    })
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
    window.removeEventListener('resize', this.eventsHandlers.windowResizeListener);
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

};



customElements.define("product-element", ProductElement);
