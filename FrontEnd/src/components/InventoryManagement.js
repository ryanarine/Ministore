import React from "react";
import { STAFF, MASTER, homeUrl } from "./Constants";
import AddProduct from "./AddProduct";
import AddDelCategory from "./AddDelCategory";

const userlistUrl = "userlist";

function InventoryManagement(props) {
  if (props.privledge === STAFF) {
    return (
      <div>
        <AddProduct />
        <button className="negButton" onClick={props.click}>
          Delete Product
        </button>
      </div>
    );
  }
  if (props.privledge === MASTER) {
    return (
      <div>
        <AddProduct />
        <button className="negButton" onClick={props.click}>
          Delete Product
        </button>
        <AddDelCategory />
        <button className="posButton" onClick={() => (window.location = homeUrl + userlistUrl)}>
          View Users
        </button>
      </div>
    );
  }
  return <React.Fragment></React.Fragment>;
}

export default InventoryManagement;
