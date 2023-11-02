import * as React from "react";
import "./TooltipShow.css";

const TooltipShow = (props: any) => {
  const { context } = props;
  return (
    <div>
      {/* <h2>Top Tooltip w/ Bottom Arrow</h2> */}
      <div className="tooltip">
        <button id="question-button" className="iconDesign">
          ?
        </button>
        <span className="tooltiptext">{context}</span>
      </div>
    </div>
  );
};
export default TooltipShow;
