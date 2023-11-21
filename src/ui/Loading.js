class Loading {
  constructor() {
    this.mainContentContainer = document.querySelector("#main-container");
    this.loadingElement = document.createElement("div");
    this.loadingElement.setAttribute("id", "loading");
    this.loadingElement.innerHTML = `<div class="lds-dual-ring"></div>`;
    this.loadingElement.classList.add("z-10", "block");
    let isLoading = false;
  }

  show() {
    this.isLoading = true
    this.mainContentContainer.appendChild(this.loadingElement);
  }
  hide() {
    this.isLoading = false
    this.mainContentContainer.contains(this.loadingElement) && this.mainContentContainer.removeChild(this.loadingElement);
  }
}

export default Loading;
