import React, { useState } from "react";
import { AiFillWarning } from "react-icons/ai";

const Feedback = (
  changeAnswer: (arg0: any) => void,
  obj: {
    answer: { [x: string]: any };
    activeQuestion: string | number;
    require: any;
  },
  last: any,
  next: React.MouseEventHandler<HTMLButtonElement> | undefined,
  submit: React.MouseEventHandler<HTMLButtonElement> | undefined
) => {
  const [activeCheck, setActiveCheck] = useState(
    obj.answer[obj.activeQuestion]
  );

  const changeChoice = (id: number) => {
    setActiveCheck(id);
    changeAnswer(id);
  };

  return (
    <div className="layout-one__right__answer">
      <div className="Feedback">
        <div className="Feedback__wrapper">
          <div
            className={
              "Feedback__wrapper__img" +
              (activeCheck === 1 ? " Feedback__wrapper__active" : "")
            }
            onClick={() => changeChoice(1)}
          >
            <img src="https://surveyagency.netlify.app/images/feedback1.png" />
          </div>
          <div
            className={
              "Feedback__wrapper__img" +
              (activeCheck === 2 ? " Feedback__wrapper__active" : "")
            }
            onClick={() => changeChoice(2)}
          >
            <img src="https://surveyagency.netlify.app/images/feedback2.png" />
          </div>
          <div
            className={
              "Feedback__wrapper__img" +
              (activeCheck === 3 ? " Feedback__wrapper__active" : "")
            }
            onClick={() => changeChoice(3)}
          >
            <img src="https://surveyagency.netlify.app/images/feedback3.png" />
          </div>
          <div
            className={
              "Feedback__wrapper__img" +
              (activeCheck === 4 ? " Feedback__wrapper__active" : "")
            }
            onClick={() => changeChoice(4)}
          >
            <img src="https://surveyagency.netlify.app/images/feedback4.png" />
          </div>
          <div
            className={
              "Feedback__wrapper__img" +
              (activeCheck === 5 ? " Feedback__wrapper__active" : "")
            }
            onClick={() => changeChoice(5)}
          >
            <img src="https://surveyagency.netlify.app/images/feedback5.png" />
          </div>
        </div>
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

Feedback.propTypes = {};

export default Feedback;
