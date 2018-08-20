import React from "react";
import PropTypes from "prop-types";
import { Circle } from "rebass";

const coinStyles = {
  borderRadius: "50%",
  height: "24px",
  width: "18px",
  fontSize: "9px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  fontWeight: "400",
  justifyContent: "center"
};

const Coins = ({ handleInput }) => (
  <ul style={{ padding: "0", display: "flex", alignItems: "center" }}>
    <Circle onClick={() => handleInput(0.1)} style={coinStyles} bg="gray" mr={8}>
      10 ¢
    </Circle>
    <Circle
      onClick={() => handleInput(0.25)}
      style={{ ...coinStyles, height: "30px", width: "24px", fontSize: "10px", border: "2px solid #aa9" }}
      bg="gray"
      mr={8}
    >
      25 ¢
    </Circle>
    <Circle
      onClick={() => handleInput(0.5)}
      style={{ ...coinStyles, height: "32px", width: "26px", border: "4px solid #aa7" }}
      bg="gray"
      mr={8}
    >
      50 ¢
    </Circle>
    <Circle
      onClick={() => handleInput(1.0)}
      style={{ ...coinStyles, height: "38px", width: "32px", border: "4px solid #aa2" }}
      bg="yellow"
      color="gray"
      mr={8}
    >
      $1
    </Circle>
    <Circle
      onClick={() => handleInput(2.0)}
      style={{ ...coinStyles, height: "40px", width: "34px", border: "4px solid #aa2" }}
      bg="gray"
      mr={8}
    >
      $2
    </Circle>
  </ul>
);

Coins.propTypes = {
  handleInput: PropTypes.func.isRequired
};

export default Coins;
