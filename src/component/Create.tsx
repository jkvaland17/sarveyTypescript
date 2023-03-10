import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import {
  BsCheck,
  BsCalendar2Date,
  BsThreeDots,
  BsTextCenter,
} from "react-icons/bs";
import { HiOutlineStar, HiOutlineMail } from "react-icons/hi";
import { HiBars3BottomLeft } from "react-icons/hi2";
import {
  AiOutlineFieldNumber,
  AiFillStepForward,
  AiOutlineEye,
  AiFillDelete,
} from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { BiLinkAlt } from "react-icons/bi";
import { Switch, Button, Upload, Popover, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Select from "antd/es/select";
import { Option } from "antd/es/mentions";
import Icon from "./Icon";
import RightLayout from "./RightLayout";
import {
  addContent,
  editSurvey,
  removeContent,
  editContent,
} from "../Redux/todoAction";
import debounce from "lodash.debounce";
import User from "./User";
import { CaretDownOutlined } from "@ant-design/icons";

const Create = (props: any) => {
  const state: any = useSelector((state) => state);
  const obj = useParams();
  const id = obj.id;
  // eslint-disable-next-line eqeqeq
  let curSurvey = state.find((s: { id: string | undefined }) => s.id == id);
  const [active, setActive] = useState({
    newContent: false,
    index: 0,
    curContent: curSurvey.content[0],
    isModalOpen: false,
  });
  const dispatch = useDispatch();
  let layouts = curSurvey.layout;
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("result") || "{}");

  const setLayout = (layout: number) => {
    layouts = layout;
    dispatch(editSurvey([curSurvey.id, { layout }]));
  };

  const saveContent = (type: string) => {
    dispatch(editContent([curSurvey.id, active.curContent]));
  };

  function getChoices(choice: any) {
    setActive({
      ...active,
      curContent: { ...active.curContent, item: choice },
    });
  }

  const setData = (ind: number) => {
    setActive({ ...active, index: ind, curContent: curSurvey.content[ind] });
  };

  const multiContent = {
    id: curSurvey.content[curSurvey.content.length - 1].id + 1,
    description: "",
    require: true,
  };

  const handleChange = debounce((e: { target: { value: any } }) => {
    dispatch(editSurvey([curSurvey.id, { name: e.target.value }]));
  }, 1000);

  const handleImage = (e: { file: { originFileObj: any } }) => {
    const file = e.file.originFileObj;
    getBase64(file).then((img) => {
      dispatch(editSurvey([curSurvey.id, { img }]));
    });
  };

  const getBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleOpenChange = (
    newOpen: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOpen(newOpen);
  };

  const copyText = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/user/${curSurvey.id}/${user.id}`
    );
    setOpen(false);
  };

  const showModal = () => {
    setActive({ ...active, isModalOpen: true });
  };
  const handleOk = () => {
    setActive({ ...active, isModalOpen: false });
  };
  const handleCancel = () => {
    setActive({ ...active, isModalOpen: false });
  };

  const removeSurveyContent = (c_id: any) => {
    dispatch(removeContent([curSurvey.id, c_id]));
    setActive({ ...active, index: 0, curContent: curSurvey.content[0] });
  };

  return (
    <div>
      <div>
        <Header />
        <div className="create-survey">
          <div className="create-survey__wrapper">
            <div className="create-survey__wrapper__content">
              <div className="content-bar">
                <div className="content-bar__header">
                  <span>Content</span>
                  <div
                    className="content-bar__header__icon"
                    onClick={() =>
                      setActive({ ...active, newContent: !active.newContent })
                    }
                  >
                    <CaretDownOutlined />
                  </div>
                </div>
                <div className="content-bar__lists">
                  {curSurvey.content.map(
                    (con: { type: any; id: any }, ind: number) => {
                      return (
                        <div
                          className={
                            "content-bar__lists__list " +
                            // eslint-disable-next-line eqeqeq
                            (active.index == ind
                              ? " content-bar__lists__active"
                              : "")
                          }
                        >
                          <div
                            className="content-bar__lists__list__item"
                            onClick={() => setData(ind)}
                          >
                            <span className="anticon selection-bar__type__icon">
                              <Icon type={con.type} />
                            </span>
                            <span>{ind + 1}</span>
                          </div>
                          <div
                            className="content-bar__lists__list__delete"
                            onClick={() => removeSurveyContent(con.id)}
                          >
                            <AiFillDelete />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <div className="create-survey__wrapper__view">
              <div className="view">
                <div>
                  <div
                    className={
                      "layout-one" + (layouts === 2 ? " layout-two" : "")
                    }
                  >
                    <div className="layout-one__left ">
                      <img src={curSurvey.img} alt="" />
                    </div>
                    <div className="layout-one__right">
                      <div className="layout-one__right__question">
                        <div className="question">
                          <div className="question__left">
                            <span>{active.index + 1}</span>
                            <span className="anticon">
                              <AiFillStepForward />
                            </span>
                          </div>
                          <div className="question__right">
                            <div className="question__right__textInput">
                              <input
                                type="text"
                                className="ant-input"
                                value="..."
                              />
                              <input
                                type="text"
                                placeholder="Description"
                                className="ant-input"
                                value={active.curContent.description}
                                onChange={(e) =>
                                  setActive({
                                    ...active,
                                    curContent: {
                                      ...active.curContent,
                                      description: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <RightLayout
                        content={active.curContent}
                        getChoices={getChoices}
                      />
                      <Button
                        style={{ background: "black" }}
                        className="layout-one__right__btn"
                        type="primary"
                        onClick={() => saveContent("success")}
                      >
                        Completed
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-survey__wrapper__selection">
              <div className="selection-bar">
                <div className="selection-bar__name">
                  <span className="ant-input-affix-wrapper">
                    <span className="ant-input-prefix">
                      <HiBars3BottomLeft />
                    </span>

                    <input
                      type="text"
                      placeholder="Survey name"
                      className="ant-input"
                      defaultValue={curSurvey.name}
                      onChange={handleChange}
                    />
                  </span>
                </div>
                <div className="selection-bar__type">
                  <span>Type</span>
                  <Select
                    value={active.curContent.type}
                    onChange={(value) =>
                      setActive({
                        ...active,
                        curContent: { ...active.curContent, type: value },
                      })
                    }
                  >
                    <Option value="multipleChoice">
                      <BsCheck /> MultipleChoice
                    </Option>
                    <Option value="feedback">
                      <HiOutlineStar /> Feedback
                    </Option>
                    <Option value="date">
                      <BsCalendar2Date /> Date{" "}
                    </Option>
                    <Option value="textbox">
                      <BsThreeDots />
                      Textbox
                    </Option>
                    <Option value="textarea">
                      <BsTextCenter />
                      Textarea
                    </Option>
                    <Option value="number">
                      <AiOutlineFieldNumber />
                      Number
                    </Option>
                    <Option value="email">
                      <HiOutlineMail />
                      Email
                    </Option>
                    <Option value="website">
                      <BiLinkAlt />
                      Website
                    </Option>
                    <Option value="phone">
                      <IoCallOutline />
                      Phone
                    </Option>
                  </Select>
                </div>
                <div className="selection-bar__settings">
                  <span>Setting</span>
                  <div className="selection-bar__settings__req">
                    <span>Required</span>
                    <div>
                      <Switch
                        checked={active.curContent.require}
                        onClick={() =>
                          setActive({
                            ...active,
                            curContent: {
                              ...active.curContent,
                              require: !require,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="selection-bar__change">
                  <span>Change Image</span>
                  <div className="selection-bar__change__upload">
                    <span>
                      <Upload
                        accept="image/*"
                        name="file"
                        showUploadList={false}
                        onChange={handleImage}
                      >
                        <div className="selection-bar__change__upload_btn">
                          <UploadOutlined />
                        </div>
                      </Upload>
                    </span>
                  </div>
                </div>
                <div className="selection-bar__layout">
                  <span>Layout</span>
                  <div className="selection-bar__layout__wrapper">
                    <div
                      className={
                        "selection-bar__layout__wrapper__box" +
                        // eslint-disable-next-line eqeqeq
                        (layouts == 1 ? " selected" : "")
                      }
                      onClick={() => setLayout(1)}
                    >
                      1
                    </div>
                    <div
                      id=""
                      className={
                        "selection-bar__layout__wrapper__box" +
                        // eslint-disable-next-line eqeqeq
                        (layouts == 2 ? " selected" : "")
                      }
                      onClick={() => setLayout(2)}
                    >
                      2
                    </div>
                    <div
                      id=""
                      className={
                        "selection-bar__layout__wrapper__box" +
                        // eslint-disable-next-line eqeqeq
                        (layouts == 3 ? " selected" : "")
                      }
                      onClick={() => setLayout(3)}
                    >
                      3
                    </div>
                  </div>
                </div>
                <div className="selection-bar__action">
                  <Button
                    type="primary"
                    onClick={showModal}
                    className="selection-bar__action__preview"
                  >
                    <AiOutlineEye />
                  </Button>
                  <Modal
                    open={active.isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={1000}
                  >
                    <User s_id={curSurvey.id} u_id={user.id} />
                  </Modal>
                  <Popover
                    content={
                      <div className="link">
                        <div className="link__wrapper">
                          <div className="link__wrapper__text">
                            http://localhost:3000/user/{curSurvey.id}/{user.id}
                          </div>
                          <Button
                            type="default"
                            style={{ background: "#262627", color: "white" }}
                            onClick={copyText}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    }
                    title="Get the Link"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                  >
                    <Button className="selection-bar__action__publish">
                      Publish
                    </Button>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {active.newContent && (
        <div
          className="add_content_main"
          onClick={() => setActive({ ...active, newContent: false })}
        >
          <div
            className="add_content_main_option"
            onClick={() =>
              dispatch(
                addContent([
                  curSurvey.id,
                  { ...multiContent, item: [], type: "multipleChoice" },
                ])
              )
            }
          >
            MultipleChoice
          </div>
          <div
            className="add_content_main_option"
            onClick={() =>
              dispatch(
                addContent([
                  curSurvey.id,
                  { ...multiContent, type: "feedback" },
                ])
              )
            }
          >
            Feedback
          </div>
          <div
            className="add_content_main_option"
            onClick={() =>
              dispatch(
                addContent([curSurvey.id, { ...multiContent, type: "date" }])
              )
            }
          >
            Date{" "}
          </div>
          <div
            className="add_content_main_option"
            onClick={() =>
              dispatch(
                addContent([curSurvey.id, { ...multiContent, type: "textbox" }])
              )
            }
          >
            Textbox
          </div>
          <div
            className="add_content_main_option"
            onClick={() =>
              dispatch(
                addContent([
                  curSurvey.id,
                  { ...multiContent, type: "textarea" },
                ])
              )
            }
          >
            Textarea
          </div>
          <div
            className="add_content_main_option"
            onClick={() =>
              dispatch(
                addContent([curSurvey.id, { ...multiContent, type: "number" }])
              )
            }
          >
            Number
          </div>
          <div
            className="add_content_main_option"
            onClick={() =>
              dispatch(
                addContent([curSurvey.id, { ...multiContent, type: "email" }])
              )
            }
          >
            Email
          </div>
          <div
            className="add_content_main_option"
            onClick={() =>
              dispatch(
                addContent([curSurvey.id, { ...multiContent, type: "website" }])
              )
            }
          >
            Website
          </div>
          <div
            className="add_content_main_option"
            onClick={() =>
              dispatch(
                addContent([curSurvey.id, { ...multiContent, type: "phone" }])
              )
            }
          >
            Phone
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
