import React, { Component } from "react";
import { Container } from "rebass";
import { Machine } from "xstate";
import { Decimal } from "decimal.js";
import VendingMachine from "./vending-machine";

const toggleMachine = Machine({
  initial: "IDLE",
  states: {
    IDLE: {
      on: { PICK: "ACCEPTING" }
    },
    ACCEPTING: {
      on: { CANCEL: "IDLE", NO_CHANGE: "DISPENSE", CHANGE: "DISPENSE_WITH_CHANGE" }
    },
    DISPENSE_WITH_CHANGE: {
      on: {
        DISPENSE: "IDLE"
      }
    },
    DISPENSE: {
      on: {
        END: "IDLE"
      }
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currAccount: 0.0,
      products: [
        { name: "Loca Kola", price: 1.5, color: "red" },
        { name: "Boreo", price: 0.75, color: "purple" },
        { name: "Wixt", price: 0.85, color: "brown" },
        { name: "Reeso'z", price: 1.25, color: "orange" },
        { name: "Limt", price: 1.95, color: "green" }
      ],
      currState: toggleMachine.initialState,
      owed: 0.0
    };
  }
  toggleState = (state, e, price) => {
    const { currState } = this.state;
    const nextState = toggleMachine.transition(currState.value, e);
    const owed = new Decimal(price);
    this.setState({ currState: nextState, owed });
  };
  handleInput = input => {
    const { currState, owed } = this.state;

    this.setState(prevState => {
      let transitionState;
      const nextAccount = new Decimal(prevState.currAccount).plus(new Decimal(input));
      if (nextAccount.greaterThan(owed)) {
        transitionState = "CHANGE";
        const nextState = toggleMachine.transition(currState.value, transitionState);
        const currAccount = nextAccount.minus(owed);
        return { currState: nextState, currAccount, owed: 0.0 };
      } else if (nextAccount.equals(owed)) {
        transitionState = "NO_CHANGE";
        const nextState = toggleMachine.transition(currState.value, transitionState);
        return { currState: nextState, currAccount: 0.0, owed: 0.0 };
      }
      return { currAccount: new Decimal(prevState.currAccount).plus(new Decimal(input)) };
    });
  };
  render() {
    const { currAccount, products, currState, owed } = this.state;
    return (
      <Container maxWidth={600} mt={5}>
        <VendingMachine
          owed={owed}
          account={currAccount}
          products={products}
          state={currState}
          toggle={this.toggleState}
          handleInput={this.handleInput}
        />
      </Container>
    );
  }
}

export default App;
