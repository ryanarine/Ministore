import React from "react";
import "./styles/Table.css";
import User from "./User";

function UserTable(props) {
  let users = props.users.map((user, index) => {
    return <User key={index} {...user} />;
  });
  return (
    <table>
      <tbody>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Privledge</th>
          <th>Privledge Options</th>
        </tr>
        {users}
      </tbody>
    </table>
  );
}

export default UserTable;
