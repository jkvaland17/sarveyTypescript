import React from "react";
import { notification } from "antd";
import Header from "./Header";
import { AiFillDelete } from "react-icons/ai";
import { addSurvey, removeSurvey } from "../Redux/todoAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Workplace = (props: any) => {
  let surveys = useSelector((state) => state);
  let dispatch = useDispatch();
  let navigator = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const initSurvey = {
    id: null,
    name: "My Survey",
    content: [
      {
        id: 1,
        type: "multipleChoice",
        description: "",
        item: [],
        require: true,
      },
    ],
    img: "https://surveyagency.netlify.app/images/bg-img.jpg",
    layout: 1,
  };
 

  const addData = (type: string) => {
    initSurvey.id = Math.floor(Math.random() * 100);
    dispatch(addSurvey(initSurvey));
    setTimeout(() => {
      api[type]({
        message: "Survey created successfully",
      });
    }, 1000);
  };

  const goToCreate = (id: any) => {
    navigator(`/create/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="layout_content">
        <div className="workplace">
          <div className="workplace_wrapper">
            <div className="create-form">
              <div className="create_form_name">New Survey Form</div>
              {contextHolder}
              <div onClick={() => addData("success")}>
                <img
                  src="https://surveyagency.netlify.app/images/plus.png"
                  className="create_form_icon"
                  alt=""
                />
              </div>
            </div>
            {surveys.map(
              (survey: {
                id: any;
                name:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
              }) => (
                <div className="created-form">
                  <div
                    className="create-form__name"
                    onClick={() => goToCreate(survey.id)}
                  >
                    {survey.name}
                  </div>
                  <div className="created-form__footer">
                    <div className="created-form__footer__response">
                      <div>no response</div>
                    </div>
                    <div
                      className="created-form__footer__delete"
                      onClick={() => dispatch(removeSurvey(survey.id))}
                    >
                      <span className="anticin">
                        <AiFillDelete />
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Workplace.propTypes = {};

export default Workplace;
