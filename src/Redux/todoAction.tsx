import {
  ADD_CONTENT,
  EDIT_CONTENT,
  ADD_SURVEY,
  REMOVE_SURVEY,
  REMOVE_CONTENT,
  EDIT_SURVEY,
  GET_USER,
} from "./typeTodo";

export const getUser = (id: any) => {
  return {
    type: GET_USER,
    payload: id,
  };
};

export const addSurvey = (data: any) => {
  return {
    type: ADD_SURVEY,
    payload: data,
  };
};

export const removeSurvey = (data: any) => {
  return {
    type: REMOVE_SURVEY,
    payload: data,
  };
};

export const addContent = (data: any[]) => {
  return {
    type: ADD_CONTENT,
    payload: data,
  };
};

export const removeContent = (data: any[]) => {
  return {
    type: REMOVE_CONTENT,
    payload: data,
  };
};

export const editContent = (data: any[]) => {
  return {
    type: EDIT_CONTENT,
    payload: data,
  };
};

export const editSurvey = (data: any[]) => {
  return {
    type: EDIT_SURVEY,
    payload: data,
  };
};
