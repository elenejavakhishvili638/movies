class ErrorBox {
  private mainContentContainer: HTMLElement;
  private container: HTMLElement;
  constructor() {
    const mainContainer = document.querySelector("#main-container");
    this.mainContentContainer = mainContainer as HTMLElement;
    this.container = document.createElement("div");
    this.mainContentContainer.appendChild(this.container);
    this.container.classList.add(
      "fixed",
      "top-[40%]",
      "bg-gray-300",
      "h-[200px]",
      "w-[70%]",
      "flex",
      "items-center",
      "rounded-[12px]",
      "text-center",
      "justify-center"
    );
  }
  render(message: string, type: string) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;

    switch (type) {
      case "error":
        messageElement.style.color = "red";
        break;
      case "warning":
        messageElement.style.color = "orange";
        break;
      case "info":
      default:
        messageElement.style.color = "blue";
        break;
    }
    this.container.appendChild(messageElement);
    setTimeout(
      () => this.mainContentContainer.removeChild(this.container),
      5000
    );
  }
}

export default ErrorBox;
