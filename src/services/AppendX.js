//appends children to the chosen dom element

class AppendX {
  //clear inner content and append a new element
  clearAndAppendElement(nodeSelector, domNode) {
    const element = document.querySelector(nodeSelector);
    element.innerHTML = "";
    element.appendChild(domNode);
  }

  //keep the inner content and append a new element
  appendElement(nodeSelector, domNode) {
    const element = document.querySelector(nodeSelector)
    console.log(element)
    element.appendChild(domNode)
  }
}

export default AppendX;
