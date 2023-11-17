//appends children to the chosen dom element

class AppendX {

    clearAndAppendElement (nodeClass, domNode) {
        const element = document.querySelector(nodeClass)
        element.innerHTML = ""
        element.appendChild(domNode)
    }
}

export default AppendX