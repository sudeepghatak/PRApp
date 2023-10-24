import * as React from "react";
import "./Accrodian.css"; // Corrected typo in the import path

interface IAccordion {
  buttonName: string;
  collapseContent: React.FunctionComponent;
}

const BoxAccrodion: React.FunctionComponent<IAccordion> = (props) => {
  const { buttonName, collapseContent: CollapseContent } = props;
  const [isActive, setIsActive] = React.useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <button
        className={!isActive ? "collapsible" : "collapsible active"}
        onClick={toggleAccordion}
      >
        {buttonName}
      </button>
      {isActive ? <CollapseContent /> : null}
    </>
  );
};

export default BoxAccrodion;
