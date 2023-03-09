import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Email from "../surveyType/Email";
import MultiChoice from "../surveyType/MultiChoice";
import Website from "../surveyType/Website";
import Date from "../surveyType/Date";
import Textbox from "../surveyType/Textbox";
import Textarea from "../surveyType/Textarea";
import Number from "../surveyType/Number";
import Phone from "../surveyType/Phone";
import Feedback from "../surveyType/Feedback";

dayjs.extend(customParseFormat);

const UserRightLayout = (
  content: { type: any },
  changeAnswer: (arg0: any) => void,
  next: any,
  last: any,
  obj: any,
  submit: any
) => {
  const changeText = (e: { target: { value: any } }) => {
    changeAnswer(e.target.value);
  };

  const changeDate = (date: any, dateString: any) => {
    changeAnswer(dateString);
  };

  switch (content.type) {
    case "multipleChoice":
      return (
        <MultiChoice
          changeAnswer={changeAnswer}
          last={last}
          next={next}
          obj={obj}
          content={content}
          submit={submit}
        />
      );

    case "website":
      return (
        <Website
          changeText={changeText}
          obj={obj}
          last={last}
          next={next}
          submit={submit}
        />
      );

    case "date":
      return (
        <Date
          changeDate={changeDate}
          obj={obj}
          last={last}
          next={next}
          submit={submit}
        />
      );

    case "textbox":
      return (
        <Textbox
          changeText={changeText}
          obj={obj}
          last={last}
          next={next}
          submit={submit}
        />
      );

    case "textarea":
      return (
        <Textarea
          changeText={changeText}
          obj={obj}
          last={last}
          next={next}
          submit={submit}
        />
      );

    case "number":
      return (
        <Number
          changeText={changeText}
          obj={obj}
          last={last}
          next={next}
          submit={submit}
        />
      );

    case "email":
      return (
        <Email
          changeText={changeText}
          obj={obj}
          last={last}
          next={next}
          submit={submit}
        />
      );

    case "phone":
      return (
        <Phone
          changeText={changeText}
          obj={obj}
          last={last}
          next={next}
          submit={submit}
        />
      );

    case "feedback":
      return (
        <Feedback
          changeAnswer={changeAnswer}
          last={last}
          next={next}
          obj={obj}
          submit={submit}
        />
      );

    default:
      return <></>;
  }
};

export default UserRightLayout;
