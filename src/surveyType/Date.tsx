import React from "react";
import { DatePicker, Space } from "antd";
import { AiFillWarning } from "react-icons/ai";
import dayjs from "dayjs";

const Date = (
  changeDate:
    | ((value: dayjs.Dayjs | null, dateString: string) => void)
    | undefined,
  obj: {
    answer: {
      [x: string]: string | number | dayjs.Dayjs | Date | null | undefined;
    };
    activeQuestion: string | number;
    require: any;
  },
  last: any,
  next: React.MouseEventHandler<HTMLButtonElement> | undefined,
  submit: React.MouseEventHandler<HTMLButtonElement> | undefined
) => {
  const dateFormat = "YYYY-MM-DD";

  return (
    <div className="layout-one__right__answer">
      <div className="date">
        <Space direction="vertical" size={12}>
          <DatePicker
            defaultValue={dayjs(
              obj.answer[obj.activeQuestion] === ""
                ? "2015/01/01"
                : obj.answer[obj.activeQuestion],
              dateFormat
            )}
            onChange={changeDate}
          />
        </Space>
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

Date.propTypes = {};

export default Date;
