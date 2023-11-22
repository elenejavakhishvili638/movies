class Loading {
  private mainContentContainer: HTMLElement;
  private loadingElement: HTMLElement;
  constructor() {
    const mainContainer = document.querySelector("#movies");
    this.mainContentContainer = mainContainer as HTMLElement;
    this.loadingElement = document.createElement("div");
    this.loadingElement.setAttribute("id", "loading");
    this.loadingElement.innerHTML = `<div class="lds-dual-ring"></div>`;
    this.loadingElement.classList.add("z-10", "block", "place-self-center");
  }

  render() {
    this.mainContentContainer.appendChild(this.loadingElement);
  }
  hide() {
    this.mainContentContainer.contains(this.loadingElement) &&
      this.mainContentContainer.removeChild(this.loadingElement);
  }
}

export default Loading;
