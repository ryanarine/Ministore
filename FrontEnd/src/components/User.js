import React, { useState } from "react";
import { baseUrl, PrivledgeMap } from "./Constants";
import axios from "axios";

function changePrivledge(username, newPrivledge) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("privledge", newPrivledge);
  axios({
    method: "post",
    url: baseUrl + "user/changePrivledge",
    data: params
  });
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
          onClick={() => {
            changePrivledge(props.username, 3 - privledge);
            setPriv(3 - privledge);
          }}
          className={PrivledgeMap[privledge]}
        >
          {"Change to " + PrivledgeMap[3 - privledge]}
        </button>
      </td>
    </tr>
  );
}

export default User;
