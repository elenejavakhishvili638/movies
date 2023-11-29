//container for state and state managing methods
//the Vault is initialized with an empty container object by default
//TERMS: "Vault" - outer container of all states of the instance, "Safe" - container of the state values
import { GeneralContainer } from "../interfaces/interfaces";

class Vault<T> {
  //!!!IMPORTANT>>if we want to give initial values to this class we MUST pass an container OBJECT containing items we want to set when instantiating
  // { <safeName>: {} }
  private container: GeneralContainer<T>;
  constructor(container = {}) {
    this.container = container;
  }

  //creates a safe in the container object
  //if no items are passed the safe is initialized with value of "null"
  createSafe(safeName: string | number, items: T[] | undefined) {
    this.container[safeName] = items;
  }

  //returns a safe by its name
  getSafe(safe: string | number) {
    return this.container[safe];
  }

  // update a safe
  updateSafe(safeName: string | number, data: T[]) {
    if (this.container.hasOwnProperty(safeName)) {
      const existingItems = this.container[safeName];
      if (existingItems) {
        this.container[safeName] = [...existingItems, ...data];
      }
    } else {
      this.createSafe(safeName, data);
    }
  }

  //stores an item in the selected safe //
  setItemToSafe(safe: string, item: T[]) {
    const selectedSafe = this.container[safe];

    if (selectedSafe) {
      this.container[safe] = item;
    } else {
      return console.error(
        `Safe with the name "${safe}" does not exist in this instance of the Vault`
      );
    }
  }
}

export default Vault;
