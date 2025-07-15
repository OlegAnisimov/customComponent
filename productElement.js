"use strict"

class productElement extends HTMLElement {
  constructor() {
    super()
  }
  
  breakpoints = {
    mobile: 480,
    tablet: 768,
    desktop: 1024
  };
  desctopDefaultView = `
    <div>
      desctop DefaultView
    </div>
  `;

  mobileDefaultView = `
    <div>
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

  connectedCallback() {
    console.log("Custom element added to page.");
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `<div class="product"></div>`
    console.log(shadow);
    
    const setDefaultDesign = () => {
      if (window.innerWidth <= this.breakpoints.mobile) {
        shadow.insertAdjacentHTML('beforeend', this.mobileDefaultView);
      } else {
        shadow.insertAdjacentHTML('beforeend', this.desctopDefaultView);
      }
    }

    this.eventsHandlers.windowResizeListener = window.addEventListener('resize', setDefaultDesign);

    setDefaultDesign();


    this.addEventListener('mouseenter', (e) => {
      // e.preventDefault();
      // if (this.hasAttribute('data-versions-list')) {
      //   shadow.innerHTML = `
      //     <div>
      //       ${this.getAttribute('data-versions-list')}
      //     </div>
      //   `;
      // }
      // console.log('hover', e);
    });

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



customElements.define("product-element", productElement);
