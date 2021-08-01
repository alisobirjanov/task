import React from "react";
import { Link } from "react-router-dom";

export const MessageList = ({ msg }) => {
  return (
    <tr>
      <Link to={"/detail/" + msg._id}>
        {!msg.read ? (
          <td>
            <span className="read">new</span>
          </td>
        ) : null}
        <td>{msg.author.email}</td>
        <td>{msg.date.toString()}</td>
      </Link>
    </tr>
  );
};
