import React from 'react';
import '../App.css';
import {AiOutlineStar} from 'react-icons/ai'

function Header(props) {
    const {active,category,stars}=props;
  return (
    <div className="header">
    <p> Question {active} of 20</p>
    <p>{category}</p>
    <p> {stars}<AiOutlineStar/><AiOutlineStar/>
    </p>

    </div>
  )
}

export default Header