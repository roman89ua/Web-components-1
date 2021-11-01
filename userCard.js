const template = document.createElement('template');
template.innerHTML = `
  <style>
  .user-card {
    font-family: 'Arial', sans-serif;
    background: #f4f4f4;
    width: 500px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    margin-bottom: 15px;
    border-bottom: darkorchid 5px solid;
   }

  .user-card img {
    width: 100%;
  }

  .user-card button {
      cursor: pointer;
      background: darkorchid;
      color: #fff;
      border: 0;
      border-radius: 5px;
      padding: 5px 10px;
  }
  
  .user-card div h3 {
    margin: 16px 0;
  }
  </style>
  <div class="user-card">
    <img src="" alt="User avatar"/>
    <div>
      <h3></h3>
      <button id="toggle-info"> Hide info</button>
      <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
    </div>
  </div>
`;


class UserCard extends HTMLElement {
  constructor() {
    super();

    this.infoVisible = true;

    this.attachShadow({mode: 'open'});

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('h3').innerText = this.getAttribute("userName");

    this.shadowRoot.querySelector('img').src = this.getAttribute("avatar");
  }

  toggleInfo = () => {
    this.infoVisible = !this.infoVisible;

    const infoBtn = this.shadowRoot.querySelector('#toggle-info');
    const infoBlock = this.shadowRoot.querySelector('.info');

    if(this.infoVisible) {
      infoBlock.style.display = 'block';
      infoBtn.innerText = "Hide info";
    } else {
      infoBlock.style.display = 'none';
      infoBtn.innerText = "Show info";
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', this.toggleInfo)
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener('click', this.toggleInfo)
  }

  // static get observedAttributes() {
  //   return ;
  // }
  //
  // attributeChangedCallback() {
  //
  // }
  //
  // adoptedCallback() {
  //
  // }
}
window.customElements.define('user-card', UserCard);