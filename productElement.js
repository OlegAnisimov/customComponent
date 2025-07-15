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

  productContainerStyleSheet = new CSSStyleSheet();

  initialDesignType;
  
  connectedCallback() {
    console.log("Custom element added to page.");
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    console.log(shadow);

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
  border: 1px red solid;
}`);

  shadow.adoptedStyleSheets = [this.productContainerStyleSheet];
    
    this.eventsHandlers.windowResizeListener = window.addEventListener('resize', setDefaultDesign);
    
    setDefaultDesign();
    // if (this.getAttribute('data-product-name')) {
    //   shadow.innerHTML = this.getAttribute('data-product-name');
    // }
    // console.log(this.parentElement);
    

    this.addEventListener('mouseenter', (e) => {
      if (this.hasAttribute('data-versions-list')) {
        e.stopImmediatePropagation(); //TODO: research it
        // всегла на ивент будет создавать versionsList - есть смысл создать до тригерра ивента
        const versionsList = document.createElement('div');
        console.log(typeof this.getAttribute('data-versions-list'));
        
        this.getAttribute('data-versions-list').split(',').forEach(version => {
          versionsList.insertAdjacentHTML('afterbegin', `
              <a class="version"> Версия ${version}</a>
            `)
        });
        
        productContainer.innerHTML = versionsList.innerHTML;        
      }
    });

    this.addEventListener('mouseleave', () => {
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



customElements.define("product-element", productElement);
