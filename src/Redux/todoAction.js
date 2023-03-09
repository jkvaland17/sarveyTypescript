import {ADD_CONTENT, EDIT_CONTENT, ADD_SURVEY, REMOVE_SURVEY, REMOVE_CONTENT, EDIT_SURVEY, GET_USER} from './typeTodo'

export const getUser = (id) => {
    return ({
        type: GET_USER,
        payload : id
    })
}

export const addSurvey = (data) => {
    return ({
        type: ADD_SURVEY,
        payload : data
    })
} 

export const removeSurvey = (data) => {
    return ({
        type: REMOVE_SURVEY,
        payload : data
    })
}

export const addContent = (data) => {
    return ({
        type:ADD_CONTENT,
        payload:data
    })
}

export const removeContent = (data) => {
    return ({
        type: REMOVE_CONTENT,
        payload:data
    })
}

export const editContent = (data) => {
    return ({
        type:EDIT_CONTENT,
        payload:data
    })
}

export const editSurvey = (data) => {
    return({
        type:EDIT_SURVEY,
        payload: data
    })
}