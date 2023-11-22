//appends children to the chosen dom element

class AppendX {
  //clear inner content and append a new element
  clearAndAppendElement(nodeSelector: string, domNode: HTMLElement | null) {
    const element = document.querySelector(nodeSelector); //<< do we need typing this
    if(element && domNode) {
      element.innerHTML = "";
      element.appendChild(domNode);
    }
  }

  //keep the inner content and append a new element
  appendElement(nodeSelector: string, domNode: HTMLElement | null) {
    const element = document.querySelector(nodeSelector);
    (element && domNode) && element.appendChild(domNode);
  }
}

export default AppendX;
