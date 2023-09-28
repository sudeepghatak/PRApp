
import * as React from "react";
import Tippy from "@tippyjs/react";
import './TooltipShow.css'
import 'tippy.js/dist/tippy.css';


interface  tooltipType{
  context:string
}


const TooltipShow = (props:tooltipType) => {
const {context}=props;
  return (
    <>
    <div className="myContainer" >
      <Tippy content={context} className="tooltip"  >
        <button id="question-button" className="iconDesign">?</button>
       </Tippy>
      </div>
     
      
    </>
  )
}

export default TooltipShow

