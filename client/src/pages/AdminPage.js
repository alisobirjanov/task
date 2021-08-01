import React, { useEffect, useContext, useState } from "react";
import { InputBox } from "../component/InputBox";
import { MessageList } from "../component/MessageList";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AdminPage = () => {
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const [messages, setMessages] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const res = await request("/api/admin/get/messages", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });

      setMessages(res);
    }

    fetchData();
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const registerHandler = async (form) => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  return (
    <div>
      <div className="row">
        <div className="col s6">
          <div className="row">
            <div className="col s10 offset-s1">
              <h4>Create User</h4>
              <InputBox
                text="Create"
                auth={registerHandler}
                loading={loading}
              />
            </div>
          </div>
        </div>
        <div className="col s6">
          {messages.length ? (
            <table>
              <tbody>
                {messages.map((msg) => (
                  <MessageList msg={msg} key={msg._id} />
                ))}
              </tbody>
            </table>
          ) : (
            <p>сообщеня пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
};
