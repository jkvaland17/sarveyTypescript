import React from "react";
import { AiFillWarning } from "react-icons/ai";

const Phone = (
  changeText: React.ChangeEventHandler<HTMLInputElement> | undefined,
  obj: {
    answer: { [x: string]: string | number | readonly string[] | undefined };
    activeQuestion: string | number;
    require: any;
  },
  last: any,
  next: React.MouseEventHandler<HTMLButtonElement> | undefined,
  submit: React.MouseEventHandler<HTMLButtonElement> | undefined
) => {
  return (
    <div className="layout-one__right__answer">
      <div className="textbox">
        <input
          type="text"
          defaultValue={obj.answer[obj.activeQuestion]}
          placeholder="9090909090"
          className="ant-input"
          onChange={changeText}
        />
      </div>
      <div className="container__preview__right__submit">
        {last == obj.activeQuestion ? (
          <button onClick={submit}>Submit</button>
        ) : (
          <button onClick={next}>Ok</button>
        )}
      </div>
      {obj.require ? (
        <div className="container__preview__right__error">
          <AiFillWarning />
          <span>This answer is required</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

Phone.propTypes = {};

export default Phone;
