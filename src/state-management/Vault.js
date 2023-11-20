//container for state and state managing methods
//the Vault is initialized with an empty container object by default
//TERMS: "Vault" - outer container of all states of the instance, "Safe" - container of the state values

class Vault {
  //!!!IMPORTANT>>if we want to give initial values to this class we MUST pass an container OBJECT containing items we want to set when instantiating
  // { <safeName>: {} }
  constructor(container = {}) {
    this.container = container;
  }

  //creates a safe in the container object
  //if no items are passed the safe is initialized with value of "null"
  createSafe(safeName, items = null) {
    this.container[safeName] = items;
  }

  //returns a safe by its name
  getSafe(safe) {
    return this.container[safe];
  }

  //stores an item in the selected safe //<<<<<incomplete
  setItemToSafe(safe, item) {
    console.log(this.container);
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
