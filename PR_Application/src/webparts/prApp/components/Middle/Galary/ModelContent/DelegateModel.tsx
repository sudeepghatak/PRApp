import * as React from "react";
// import { useState } from "react";
import { Modal, IIconProps, Stack } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import  PeoplePickerComponent  from "../../PeoplePickerComponent";
import { restApiCall } from "../../../../Api/ApiCall";
import { GlobalStore } from "../../../../../../app/globalStore";
interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  backgroundcolor?: string;
  title?: string;
}
let firstDate:string="";
let secondDate:string="";
export const DelegateModel: React.FunctionComponent<IModalProps> = (props) => {
  const { isModalOpen, showModal, backgroundcolor, title } = props;
  const background_color = backgroundcolor as string;
  const modal_title = title as string;
  const [firstselectedDate, setfirstSelectedDate] = React.useState("");

  const firsthandleChange = (e) => {
    console.log("First Date is Here ", e.target.value);
    var res = new Date(e.target.value);
    console.log(res.getUTCDate());
    console.log(res.toISOString());
    console.log(res.toTimeString());
    console.log("kkkkk");
    firstDate=res.toISOString().replace(".000Z", "");
    setfirstSelectedDate(e.target.value);
  };
  const [secondselectedDate, setsecondSelectedDate] = React.useState("");

  const secondhandleChange = (e) => {
    var res = new Date(e.target.value);
    secondDate=res.toISOString().replace(".000Z", "");
    setsecondSelectedDate(e.target.value);
  };
  const [employedetail, setEmployedetail] = React.useState([]);
  const companyCodeOptionSet = (newItem) => {
    if (newItem.length !== 0) {
      console.log(newItem[0].companyCode);

      let itemTest = {
        key: newItem[0].EmployeeId,

        text: newItem[0].text,
        email: newItem[0].email,
      };

      setEmployedetail([itemTest]);
    }
    console.log("Okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    console.log(newItem);
    // console.log(newItem[0]);
    // console.log(newItem[0].EmployeeId);
    // console.log("Do The Best Heer ----");
  };

  console.log(firstselectedDate);
  console.log(secondselectedDate);
  const saveDelegate = () => {
    let delegateBody = {
      Title: "1",
      StartDate: firstDate,
      EndDate: secondDate,
      Requester: GlobalStore.getmainEmail(),
      Delegatee: employedetail[0].email,
    };
    console.log("This is Save Data ----- ", employedetail, delegateBody);
    restApiCall.storeDelegateTask([delegateBody]).then((res) => {
      console.log("Insert Successfully --- ", res);
    });
  };
  return (
    <div className="delegate-model">
      <Modal isOpen={isModalOpen} onDismiss={showModal} isBlocking={false}>
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{
            backgroundColor: `${background_color}`,
            border: "3px solid #fff",
          }}
        >
          <span style={{ marginTop: -5, paddingLeft: 15 }}>
            <h2 style={{ color: "#fff" }}>{modal_title}</h2>
          </span>
          <span
            style={{
              marginTop: 15,
              marginRight: 15,
              backgroundColor: "whitesmoke",
              maxHeight: 30,
            }}
          >
            <IconButton
              style={{ color: "red" }}
              iconProps={cancelIcon}
              onClick={showModal}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15, color: "red" }}>
          <div>
            <div className="delegate-date-id">
              <span>From: </span>
              <input
                type="date"
                value={firstselectedDate}
                onChange={firsthandleChange}
              />
              <span>To: </span>
              <input
                type="date"
                value={secondselectedDate}
                onChange={secondhandleChange}
              />
            </div>
            <br></br>
            <div>
              <span>Delegate To:</span>
              <PeoplePickerComponent
                companyCodeOptionSet={companyCodeOptionSet}
              />
            </div>

            <br />
            <div className="delegate-date-id">
              <button onClick={() => saveDelegate()}>Submit</button>
              <button onClick={showModal}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };
