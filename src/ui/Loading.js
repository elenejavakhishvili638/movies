class Loading {
  constructor() {
    this.mainContentContainer = document.querySelector("#movies");
    this.loadingElement = document.createElement("div");
    this.loadingElement.setAttribute("id", "loading");
    this.loadingElement.innerHTML = `<div class="lds-dual-ring"></div>`;
    this.loadingElement.classList.add("z-10", "block", "place-self-center");
  }

  show() {
    this.mainContentContainer.appendChild(this.loadingElement);
  }
  hide() {
    this.mainContentContainer.contains(this.loadingElement) &&
      this.mainContentContainer.removeChild(this.loadingElement);
  }
}

export default Loading;
