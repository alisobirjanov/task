import React, { useCallback, useEffect, useState , useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const DetailPage = () => {
  const [message, setMessage] = useState({});
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const messageId = useParams().id;

  const getMessages = useCallback(async () => {
    try {
      const fetched = await request(`/api/messages/${messageId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      console.log(fetched);
      setMessage(fetched);
    } catch (e) {}
  }, [token, messageId, request]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card  darken-1">
          <div className="card-content ">
            <span className="card-title">Message</span>
            <div>
              {/* <h5>Message</h5> */}
              <p>{message.text}</p>
            </div>
          </div>
          <div className="card-action">
            {message.date ? message.date.toString() : null}
          </div>
        </div>
      </div>
    </div>
  );
};
