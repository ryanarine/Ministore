import React from "react";

function Product(props) {
  return (
    <ul onClick={props.click}>
      <li>{"Name: " + props.name}</li>
      <li>{"Category: " + props.category}</li>
      <li>{"Price: $" + props.price}</li>
      <li>{"Weight: " + props.weight + "g"}</li>
    </ul>
  );
}

export default Product;
