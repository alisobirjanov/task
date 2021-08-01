import React, { useEffect, useState, useContext } from "react";
import { Input } from "../component/Input";
import { Message } from "../component/Message";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const SendMessage = () => {
  const [messages, setMessages] = useState([]);
  const { loading, request } = useHttp();
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const res = await request("/api/message/get", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });

      setMessages(res);
    }

    fetchData();
  }, []);

  const sendMessageHandler = async (text) => {
    const res = await request(
      "/api/message/create",
      "POST",
      { text },
      {
        Authorization: `Bearer ${auth.token}`,
      }
    );
    setMessages((prev) => [res, ...prev]);
  };

  return (
    <div className="row">
      <Link to="/admin">sc</Link>
      <Input sendMessage={sendMessageHandler} loading={loading} />

      <div>
        <div class="col s6 m5">
          <div className="row">
            {messages.length ? (
              messages.map((msg) => <Message msg={msg} key={msg._id} />)
            ) : (
              <p>сообщеня пока нет</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
