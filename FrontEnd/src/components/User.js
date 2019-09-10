import React, { useState } from "react";
import {
  baseUrl,
  PrivledgeMap,
  setCrenditals,
  notAuthorized
} from "./Constants";
import axios from "axios";

function changePrivledge(user, newPrivledge, callback) {
  const params = setCrenditals();
  params.append("user", user);
  params.append("privledge", newPrivledge);
  axios({
    method: "post",
    url: baseUrl + "user/changePrivledge",
    data: params
  })
    .then(() => callback(newPrivledge))
    .catch(notAuthorized);
}

function User(props) {
  const [privledge, setPriv] = useState(props.privledge);
  return (
    <tr>
      <td>{props.username}</td>
      <td>{props.name}</td>
      <td>{PrivledgeMap[privledge]}</td>
      <td>
        <button
          onClick={() =>
            changePrivledge(props.username, 3 - privledge, setPriv)
          }
          className={PrivledgeMap[privledge]}
        >
          {"Change to " + PrivledgeMap[3 - privledge]}
        </button>
      </td>
    </tr>
  );
}

export default User;
