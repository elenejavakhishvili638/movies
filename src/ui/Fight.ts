import batoniVano from "../assets/batoni-vano.png"
import batoniGurami from "../assets/batoni-gurami.png"

class Fight {

    // #addIdentifiers (selector:string, identifier:string): void {
    //     const element = document.querySelector(selector)

    //      if (identifier.startsWith(".")) {
    //         element?.classList.add(selector)
    //     } else {
    //         console.error("invalid selector passed")
    //     }
    // }

    epicBattle () {
        const mainContainer = document.querySelector("#main-container")

        const ring = document.createElement("div")
        const mentorOne = document.createElement("div")
        const mentorTwo = document.createElement("div")
        const figOne = document.createElement("div")
        const figTwo = document.createElement("div")
        const armOne = document.createElement("div")
        const armTwo = document.createElement("div")
        const figOneSword = document.createElement("div")
        const figTwoSword = document.createElement("div")
        const armAndSwordOne = document.createElement("div")
        const armAndSwordTwo = document.createElement("div")
        const headOne = document.createElement("img")
        const headTwo = document.createElement("img")
        const feetOne = document.createElement("div")
        const feetTwo = document.createElement("div")
        
        ring.classList.add("ring")
        mentorOne.classList.add("mentor")
        mentorTwo.classList.add("mentor")
        mentorOne.setAttribute("id","batoni-gurami")
        mentorTwo.setAttribute("id","batoni-vano")
        headOne.classList.add("mentor-head")
        headTwo.classList.add("mentor-head")
        figOne.classList.add("mentor-body")
        figTwo.classList.add("mentor-body")
        figOne.setAttribute("id", "batoni-gurami-body")
        figTwo.setAttribute("id", "batoni-vano-body")
        armAndSwordOne.classList.add("guram-hand-and-sword")
        armAndSwordTwo.classList.add("vano-hand-and-sword")
        armOne.classList.add("batoni-gurami-arm")
        armTwo.classList.add("batoni-vano-arm")
        figOneSword.setAttribute("id","batoni-gurami-sword")
        figTwoSword.setAttribute("id","batoni-vano-sword")
        figOneSword.classList.add("weapon")
        figTwoSword.classList.add("weapon")
        feetOne.classList.add("feet")
        feetTwo.classList.add("feet")
        
        headOne.setAttribute("src",batoniGurami)
        headTwo.setAttribute("src", batoniVano)

        armAndSwordOne.append(armOne, figOneSword)
        armAndSwordTwo.append(armTwo, figTwoSword)

        figOne.appendChild(armAndSwordOne)
        figTwo.appendChild(armAndSwordTwo)

        mentorOne.append(headOne, figOne, feetOne)
        mentorTwo.append(headTwo, figTwo, feetTwo)

        
        ring.append(mentorOne, mentorTwo)
        mainContainer?.appendChild(ring)
    }
}

export default Fight