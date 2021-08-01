import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook';


export const AuthPage = () => {
    const { loading, request, error } = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({email: '', password: ''})

    useEffect(() => {
      // message('test')
    }, [error, message,  ])

    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };

    
    const requestHandler = async () => {
      const data = request("/api/auth/register", "POST", { ...form });
      console.log(data);
      message(data.message);
    }

    return (
      <div className="row">
        <div className="col s6 offset-s3">
          <h2>Сократи Ссылку</h2>
          <div className="card blue darken-1">
            <div className="card blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">Авторизация</span>
                <div>
                  <div className="input-field">
                    <input
                      placeholder="Введите email"
                      id="email"
                      type="text"
                      name="email"
                      className="yellow-input"
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
                >
                  Войти
                </button>
                <button
                  className="btn grey lighten-1 black-text"
                  onClick={requestHandler}
                  disabled={loading}
                >
                  Регистрация
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}