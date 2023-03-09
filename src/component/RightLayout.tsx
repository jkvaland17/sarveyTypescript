import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const RightLayout = (
  content: { item: any; type: any },
  getChoices: (arg0: any) => void
) => {
  const [choices, setChoise] = useState(content.item);

  const dateFormat = "YYYY-MM-DD";
  const onAdd = () => {
    if (choices === undefined) {
      setChoise([{ id: 1, name: "" }]);
    } else {
      setChoise([...choices, { id: choices.length + 1, name: "" }]);
    }
    getChoices(choices);
  };

  const addName = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
    let curItem = choices.find((c: { id: any }) => c.id == id);
    curItem["name"] = e.target.value;
    setChoise(
      choices.map((c: { id: any }) => (c.id == curItem.id ? curItem : c))
    );
    getChoices(choices);
  };

  const removeItem = (id: any) => {
    let newData = choices.filter((c: { id: any }) => c.id !== id);
    setChoise(newData);
    getChoices(choices);
  };

  switch (content.type) {
    case "multipleChoice":
      return (
        <div className="layout-one__right__answer">
          <div className="multiple-choice">
            <div className="multiple-choice__add" onClick={onAdd}>
              Add choice
            </div>
            <div className="multiple-choice__wrapper">
              {choices &&
                choices.map(
                  (
                    c: {
                      name: string | number | readonly string[] | undefined;
                      id: any;
                    },
                    ind: number
                  ) => (
                    <div className="multiple-choice__wrapper__choice ">
                      <span className="multiple-choice__wrapper__choice__num">
                        {ind + 1}
                      </span>
                      <input
                        type="text"
                        className="ant-input"
                        value={c.name}
                        onChange={(e) => addName(e, c.id)}
                      />
                      <AiOutlineCloseCircle onClick={() => removeItem(c.id)} />
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      );

    case "website":
      return (
        <div className="layout-one__right__answer">
          <div className="textbox">
            <input
              disabled
              type="text"
              placeholder="https://"
              className="ant-input ant-input-disabled"
            />
          </div>
        </div>
      );

    case "date":
      return (
        <div className="layout-one__right__answer">
          <div className="date">
            <Space direction="vertical" size={12}>
              <DatePicker
                defaultValue={dayjs("2015-06-06", dateFormat)}
                disabled
              />
            </Space>
          </div>
        </div>
      );

    case "textbox":
      return (
        <div className="layout-one__right__answer">
          <div className="textbox">
            <input
              disabled
              type="text"
              placeholder="Type your answer hear..."
              className="ant-input ant-input-disabled"
            />
          </div>
        </div>
      );

    case "textarea":
      return (
        <div className="layout-one__right__answer">
          <div className="textbox">
            <input
              disabled
              type="text"
              placeholder="Type your answer hear..."
              className="ant-input ant-input-disabled"
            />
          </div>
        </div>
      );

    case "number":
      return (
        <div className="layout-one__right__answer">
          <div className="textbox">
            <input
              disabled
              type="text"
              placeholder="Type your answer hear..."
              className="ant-input ant-input-disabled"
            />
          </div>
        </div>
      );

    case "email":
      return (
        <div className="layout-one__right__answer">
          <div className="textbox">
            <input
              disabled
              type="text"
              placeholder="survey@gmail.com"
              className="ant-input ant-input-disabled"
            />
          </div>
        </div>
      );

    case "phone":
      return (
        <div className="layout-one__right__answer">
          <div className="textbox">
            <input
              disabled
              type="text"
              placeholder="9090909090"
              className="ant-input ant-input-disabled"
            />
          </div>
        </div>
      );

    case "feedback":
      return (
        <div className="layout-one__right__answer">
          <div className="Feedback">
            <div className="Feedback__wrapper">
              <div className="Feedback__wrapper__img ">
                <img
                  src="https://surveyagency.netlify.app/images/feedback1.png"
                  alt=""
                />
              </div>
              <div className="Feedback__wrapper__img ">
                <img
                  src="https://surveyagency.netlify.app/images/feedback2.png"
                  alt=""
                />
              </div>
              <div className="Feedback__wrapper__img ">
                <img
                  src="https://surveyagency.netlify.app/images/feedback3.png"
                  alt=""
                />
              </div>
              <div className="Feedback__wrapper__img ">
                <img
                  src="https://surveyagency.netlify.app/images/feedback4.png"
                  alt=""
                />
              </div>
              <div className="Feedback__wrapper__img ">
                <img
                  src="https://surveyagency.netlify.app/images/feedback5.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return <></>;
  }
};

RightLayout.propTypes = {};

export default RightLayout;
