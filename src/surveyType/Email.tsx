import { ChangeEventHandler, MouseEventHandler } from "react";
import { AiFillWarning } from "react-icons/ai";

const Email = (
  changeText: ChangeEventHandler<HTMLInputElement> | undefined,
  obj: {
    answer: { [x: string]: string | number | readonly string[] | undefined };
    activeQuestion: string | number;
    require: any;
  },
  last: any,
  next: MouseEventHandler<HTMLButtonElement> | undefined,
  submit: MouseEventHandler<HTMLButtonElement> | undefined
) => {
  return (
    <div className="layout-one__right__answer">
      <div className="textbox">
        <input
          id="email"
          type="email"
          defaultValue={obj.answer[obj.activeQuestion]}
          placeholder="survey@gmail.com"
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

export default Email;
