import React from 'react'
import {  BsCheck, BsCalendar2Date, BsThreeDots, BsTextCenter } from "react-icons/bs"
import { HiOutlineStar, HiOutlineMail } from "react-icons/hi"
import { AiOutlineFieldNumber} from "react-icons/ai"
import { IoCallOutline } from "react-icons/io5";
import { BiLinkAlt } from "react-icons/bi";

function Icon(type:any) {
  switch (type) {
    case 'multipleChoice':
        return <BsCheck />

    case 'feedback' :
        return <HiOutlineStar />

    case 'date' :
        return <BsCalendar2Date />

    case 'textbox':
        return <BsThreeDots />

    case 'website':
        return <BiLinkAlt />

    case 'textarea':
        return <BsTextCenter />

    case 'number':
        return <AiOutlineFieldNumber />

    case 'email':
        return <HiOutlineMail />

    case 'phone':
        return <IoCallOutline />
  
    default:
        return <></>
  }
}

Icon.propTypes = {

}

export default Icon

