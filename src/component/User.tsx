import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillStepForward } from "react-icons/ai";
import { Button, message } from "antd";
import UserRightLayout from "./UserRightLayout";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const User = (s_id: any, u_id: any) => {
  const navigate = useNavigate();
  let { id = s_id, uid = u_id } = useParams();
  const surveys = JSON.parse(localStorage.getItem(`survey${uid}`) || "{}");
  const curSurvey = surveys.find((s: any) => s.id == id);
  const [obj, setObj] = useState({
    require: false,
    activeQuestion: 0,
    answer: { 0: "" },
  });
  const [messageApi, contextHolder] = message.useMessage();
  const last = curSurvey.content.length - 1;

  const next = () => {
    let temp = { ...obj };
    if (
      curSurvey.content[obj.activeQuestion].require &&
      obj.answer[obj.activeQuestion].toString().length < 1
    ) {
      temp.require = true;
      setObj({ ...temp });
    } else {
      temp.activeQuestion = temp.activeQuestion + 1;
      if (Object.keys(temp.answer).includes(temp.activeQuestion.toString())) {
        temp.require = false;
        setObj({ ...temp });
      } else {
        temp.require = false;
        temp.answer = { ...temp.answer, [temp.activeQuestion]: "" };
        setObj({ ...temp });
      }
    }
  };

  const previous = () => {
    let temp = { ...obj };
    temp.require = false;
    setObj({ ...temp });
    if (obj.activeQuestion > 0) {
      temp.activeQuestion = temp.activeQuestion - 1;
      setObj({ ...temp });
    }
  };

  const changeAnswer = (ans: any) => {
    let temp = { ...obj };
    temp.require = false;
    temp.answer = { ...temp.answer, [temp.activeQuestion]: ans };
    setObj({ ...temp });
  };

  const submit: () => void = () => {
    messageApi.open({
      type: "success",
      content: "Preview Done!",
    });
    navigate(`/thanks/${id}/${uid}`);
  };
  return (
    <>
      {contextHolder}
      <div
        className={
          "user_layout-one" + (curSurvey.layout === 2 ? " layout-two" : "")
        }
      >
        <div className="user_layout-one__left ">
          <img src={curSurvey.img} alt="img" />
        </div>
        <div className="layout-one__right user_layout-one__right">
          <div className="layout-one__right__question">
            <div className="question">
              <div className="question__left">
                <span>{obj.activeQuestion + 1}</span>
                <span className="anticon">
                  <AiFillStepForward />
                </span>
              </div>
              <div className="question__right">
                <div className="question__right__textInput">
                  <input type="text" className="ant-input" value="..." />
                  <input
                    type="text"
                    placeholder="Description"
                    className="ant-input"
                    value={curSurvey.content[obj.activeQuestion].description}
                  />
                </div>
              </div>
            </div>
          </div>
          <UserRightLayout
            key={curSurvey.content[obj.activeQuestion]}
            submit={submit}
            content={curSurvey.content[obj.activeQuestion]}
            changeAnswer={changeAnswer}
            obj={obj}
            next={next}
            last={last}
          />
        </div>
        <div className="container__submit">
          {!curSurvey.content[obj.activeQuestion].require ? (
            <button className="container__submit__skip" onClick={next}>
              Skip
            </button>
          ) : (
            <></>
          )}
          <div className="container__submit__changePage">
            <Button onClick={previous}>
              <ArrowUpOutlined />
            </Button>
            {obj.activeQuestion === curSurvey.content.length - 1 ? (
              <></>
            ) : (
              <Button onClick={next}>
                <ArrowDownOutlined />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

User.propTypes = {};

export default User;
