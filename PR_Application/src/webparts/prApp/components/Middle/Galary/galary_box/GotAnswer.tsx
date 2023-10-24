import { Stack } from "@fluentui/react";
import * as React from "react";
import ComponentHeader from "./ComponentHeader";
import BoxAccrodion from "./BoxAccrodian";
// import AccordianContent from "./AccrodianContent";
import CreatePr from "./got_answer_content/CreatePr";
import ApprovePr from "./got_answer_content/ApprovePr";
import QuoteContent from "./got_answer_content/QuoteContent";
import ProjectCodetoPrContent from "./got_answer_content/ProjectCodetoPrContent";
import CipNumberContent from "./got_answer_content/CipNumberContent";
import AssestsContent from "./got_answer_content/AssestsContent";
import StatementWorkContent from "./got_answer_content/StatementWorkContent";
import PrEhsContent from "./got_answer_content/PrEhsContent";

const GotAnswer = () => {
  return (
    <div>
      <Stack>
        <ComponentHeader title={"We've got Answers"} />
        <div className="boxaccrodian">
          <BoxAccrodion
            buttonName="How to Create a PR?"
            collapseContent={CreatePr} // Corrected typo in the component name
          />
        </div>
        <div className="boxaccrodian">
          <BoxAccrodion
            buttonName="How to Approve a PR?"
            collapseContent={ApprovePr} // Corrected typo in the component name
          />
        </div>
        <div className="boxaccrodian">
          <BoxAccrodion
            buttonName="Do I need a quote?"
            collapseContent={QuoteContent} // Corrected typo in the component name
          />
        </div>
        <div className="boxaccrodian">
          <BoxAccrodion
            buttonName="What is a Statement of Work and when do I need one?"
            collapseContent={StatementWorkContent} // Corrected typo in the component name
          />
        </div>
        <div className="boxaccrodian">
          <BoxAccrodion
            buttonName="What is considered an Asset and why do I need a CIP?"
            collapseContent={AssestsContent} // Corrected typo in the component name
          />
        </div>
        <div className="boxaccrodian">
          <BoxAccrodion
            buttonName="Where do I get a CIP number?"
            collapseContent={CipNumberContent} // Corrected typo in the component name
          />
        </div>
        <div className="boxaccrodian">
          <BoxAccrodion
            buttonName="When is a PR EHS Relevant?"
            collapseContent={PrEhsContent} // Corrected typo in the component name
          />
        </div>
        <div className="boxaccrodian">
          <BoxAccrodion
            buttonName="How do I add project codes to my PR?"
            collapseContent={ProjectCodetoPrContent} // Corrected typo in the component name
          />
        </div>
      </Stack>
    </div>
  );
};

export default GotAnswer;
