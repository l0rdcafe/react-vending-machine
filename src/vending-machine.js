import React from "react";
import { Card, Heading, Subhead, Close, ButtonOutline } from "rebass";
import PropTypes from "prop-types";
import Product from "./product";
import Coins from "./coins";

const VendingMachine = ({ account, products, toggle, state, owed, handleInput }) => {
  let heading;
  let formattedAccount;

  if (state.value === "IDLE") {
    heading = "Please choose a product";
  } else if (state.value === "ACCEPTING") {
    const formattedPrice = `$${owed}${owed.toString().split("").length < 4 ? 0 : ""}`;
    heading = `Please input the amount of ${formattedPrice}`;
  } else if (state.value === "DISPENSE_WITH_CHANGE") {
    const formattedChange = (account - owed).toString().substring(0, 4);
    heading = `Your change is $${formattedChange}`;
  } else {
    heading = "You have no change. Please pick up your item.";
  }

  if (account === 0) {
    formattedAccount = `$${account}.00`;
  } else if (account.toString().split("").length > 4) {
    formattedAccount = `$${account.toString().substring(0, 4)}`.replace(/-/, "");
  } else {
    formattedAccount = `$${account}0`;
  }

  return (
    <Card borderRadius={8} bg="black">
      {state.value === "ACCEPTING" && (
        <Close
          style={{ float: "right", cursor: "pointer" }}
          onClick={() => toggle(state.value, "CANCEL", 0)}
          mr={2}
          color="white"
        />
      )}
      <Heading width={10} bg="gray" color="white" pl={1}>
        {formattedAccount}
      </Heading>
      <Subhead color="white" py={3} pl={1}>
        {heading}
      </Subhead>
      {state.value === "IDLE" &&
        products.map(product => (
          <Product key={product.name} product={product} toggle={() => toggle(state.value, "PICK", product.price)} />
        ))}
      {state.value === "ACCEPTING" && <Coins handleInput={handleInput} />}
      {state.value === "DISPENSE_WITH_CHANGE" && (
        <ButtonOutline style={{ cursor: "pointer" }} color="white" onClick={() => toggle(state.value, "DISPENSE", 0)}>
          Next
        </ButtonOutline>
      )}
      {state.value === "DISPENSE" && (
        <ButtonOutline style={{ cursor: "pointer" }} color="white" onClick={() => toggle(state.value, "END", 0)}>
          Claim
        </ButtonOutline>
      )}
    </Card>
  );
};

VendingMachine.propTypes = {
  account: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired, price: PropTypes.number.isRequired, color: PropTypes.string })
  ).isRequired,
  state: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  owed: PropTypes.number,
  handleInput: PropTypes.func.isRequired
};

export default VendingMachine;
