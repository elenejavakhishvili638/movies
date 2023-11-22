//container for state and state managing methods
//the Vault is initialized with an empty container object by default
//TERMS: "Vault" - outer container of all states of the instance, "Safe" - container of the state values

// interface GeneralContainer<T> {
//   [key: string]: T | null;
// }

class Vault {
  //!!!IMPORTANT>>if we want to give initial values to this class we MUST pass an container OBJECT containing items we want to set when instantiating
  // { <safeName>: {} }
  private container: any;
  constructor(container = {}) {
    this.container = container;
  }

  //creates a safe in the container object
  //if no items are passed the safe is initialized with value of "null"
  createSafe(safeName: string, items = null) {
    this.container[safeName] = items;
  }

  //returns a safe by its name
  getSafe(safe: string) {
    return this.container[safe];
  }

  // update a safe
  updateSafe(safeName: string, data: any) {
    if (this.container.hasOwnProperty(safeName)) {
      this.container[safeName] = [...this.container[safeName], ...data];
    } else {
      this.createSafe(safeName, data);
    }
  }

  //stores an item in the selected safe //<<<<<incomplete
  setItemToSafe(safe: string, item: any) {
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
