import React from "react";
import { ButtonCircle } from "rebass";
import PropTypes from "prop-types";

const Product = ({ product, toggle }) => (
  <ButtonCircle pl={6} bg={product.color || "blue"} style={{ cursor: "pointer" }} onClick={toggle} mr={2}>
    {product.name}
  </ButtonCircle>
);

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string
  }).isRequired,
  toggle: PropTypes.func.isRequired
};

export default Product;
