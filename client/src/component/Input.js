import React, {useState} from "react";

export const Input = ({ sendMessage, loading }) => {
  const [text, setText] = useState("");
  const changeHandler = (event) => {
    setText(event.target.value);
  };

  const submitHandler = () => {
    if (!text.length) {
      return;
    }
    sendMessage(text);
    setText("");
  };
  return (
    <div className="col s6">
      <div className="col s10" style={{ paddingTop: "20px" }}>
        <div class="input-field ">
          <input
            id="icon_prefix2"
            class="materialize-textarea"
            onChange={changeHandler}
            value={text}
          ></input>
          <label for="icon_prefix2">Message</label>
        </div>
      </div>
      <div className="col s1" style={{ paddingTop: "40px" }}>
        <button
          className="waves-effect waves-light btn"
          onClick={submitHandler}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};
