import React, {useState} from "react";

export const InputBox = ({loading, text, auth}) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="card-content ">
        <div>
          <div className="input-field">
            <input
              placeholder="Введите email"
              id="email"
              type="text"
              name="email"
              className="yellow-input"
              value={form.email}
              onChange={changeHandler}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-field">
            <input
              placeholder="Введите пароль"
              id="password"
              type="password"
              name="password"
              className="yellow-input"
              value={form.password}
              onChange={changeHandler}
            />
            <label htmlFor="email">Пароль</label>
          </div>
        </div>
      </div>
      <div className="card-action">
        <button
          className="btn yellow darken-4"
          style={{ marginRight: 10 }}
          disabled={loading}
          onClick={() => auth(form)}
        >
          {text}
        </button>
      </div>
    </>
  );
};
