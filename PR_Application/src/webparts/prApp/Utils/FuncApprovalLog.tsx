// if(EHS === "Yes"){
//1.get EHS approvers
//2.get delegates if approval on leave
//3.save the info for approval log
// }
//4. get finance approvers
//5. get delegates if approval on leave
//6. insert info from approval log
// if(Totalamount > 250000){
//7.get Finance Director approvers
//8.get delegates if approval on leave
//9.save the info for approval log
// }

//11.get approver limit by job level details
// for(let i:number=0;i<lineItemDataValue.length;i++)
//12.get next des from json array step 11
//     if(totalamount>amount){
//       key:lineDataValue[i]
//       text:lineDataValue[i].Title
//     }
// }
// 10. get Line Managers approvers//getmanagersapi
// let value:string=null;
// for(let i:number=1;i<LineManagersData.length && value==null;i++ )
// {
//     //get next manager designation.
//     for(let j:number=0;j<(lineDataValue[i].Title).length,j++){
//         if(LineManagersData[i].designation===(lineDataValue[i].Title)[j].designation)
//         {
//             value=(lineDataValue[i].Title)[j].designation
//         }
//     }
//     if(value===null){
//13. delegates if approval on leave
//insert value in approval log
// }
// }
//get delegates if approval on leave
//insert value in approval log

import axios from "axios";
import { GlobalStore } from "../../../app/globalStore";
import { restApiCall } from "../Api/ApiCall";

export class FuncApprovalLog {
  //   static TotalAmount: number = 12000;
  static levelEnter: boolean = false;
  static ManagerList = [];
  static FinanceList = [];
  static listEHSApproval = [];
  static FinanceDirectorList = [];

  //delegate Check Here ------
  static async delegateCheck(testEmail: string) {
    let findDelegateList = [];
    let VacationLeaveDetails = await restApiCall.GetVacationLeave();
    let delegateMang = VacationLeaveDetails.filter((vactionRes) => {
      return vactionRes.Requester == testEmail;
    });
    console.log(
      "Delegate Manager Here 61 61 61 61 61 16 16 61 61",
      delegateMang,
      VacationLeaveDetails
    );
    if (delegateMang.length == 0) {
      return [testEmail];
    } else {
      let fTime: number = +Date.parse(
        new Date(delegateMang[0].StartDate).toString()
      );
      let eTime: number = +Date.parse(
        new Date(delegateMang[0].EndDate).toString()
      );
      let cTime: number = +Date.parse(new Date().toString());
      console.log(
        "fTime Here eTime and cTime 72 72 72 72 72 72 ",
        fTime,
        eTime,
        cTime,
        fTime <= cTime && eTime >= cTime
      );
      if (fTime <= cTime && eTime >= cTime) {
        findDelegateList = [
          ...(await this.delegateCheck(delegateMang[0].Delegatee)),
        ];
      } else {
        findDelegateList.push(testEmail);
      }
    }
    return findDelegateList;
  }

  static async ehsApproval() {
    let prInfo = await restApiCall.getPrbasicInfoContent(GlobalStore.getPrId());
    if (prInfo.EHS) {
      await this.recursiveEHSCall();
    }
    console.log(
      "List of EHS APproval Here 88 88 88 88 88 88 88 88",
      this.listEHSApproval
    );
    return this.listEHSApproval;
  }

  static async recursiveEHSCall() {
    let Ehsres = await restApiCall.getEHSapproval();
    let EhsEmail: string;
    if (Ehsres.length !== 0) {
      for (let i = 0; i < Ehsres.length; i++) {
        EhsEmail = Ehsres[i].Approver;
        console.log(
          "EHS Approval List Here ---- 102 102 102 102 102",
          EhsEmail
        );
        let Emailehs = await this.delegateCheck(EhsEmail);
        this.listEHSApproval.push(Emailehs[0]);
        // let VacationLeaveDetails = await restApiCall.GetVacationLeave();
        // let delegateMang = VacationLeaveDetails.filter((vactionRes) => {
        //   return vactionRes.Requester == EhsEmail;
        // });
        // if (delegateMang.length !== 0) {
        //   this.listEHSApproval.push(EhsEmail);
        // } else {
        //   let fTime: number = +Date.parse(
        //     new Date(delegateMang[0].StartDate).toString()
        //   );
        //   let eTime: number = +Date.parse(
        //     new Date(delegateMang[0].EndDate).toString()
        //   );
        //   let cTime: number = +Date.parse(new Date().toString());
        //   if (fTime <= cTime && eTime >= cTime) {
        //     this.listEHSApproval.push(delegateMang[0].Delegatee);
        //   } else {
        //     this.listEHSApproval.push(EhsEmail);
        //   }
        // }
      }
    }
  }

  static async delegateFinance() {
    let FinanApprval = await restApiCall.FinanceApprovallog();
    for (let i: number = 0; i < FinanApprval.length; i++) {
      let EmailFinanceApproval = await this.delegateCheck(
        FinanApprval[i].Approver
      );
      this.FinanceList.push(EmailFinanceApproval[0]);
      //   let VacationLeaveDetails = await restApiCall.GetVacationLeave();

      //   let delegateMang = VacationLeaveDetails.filter((vactionRes) => {
      //     return vactionRes.Requester == FinanApprval[i].Approver;
      //   });
      //   if (delegateMang.length == 0) {
      //     this.FinanceList.push(FinanApprval[i].Approver);
      //   } else {
      //     let fTime: number = +Date.parse(
      //       new Date(delegateMang[0].StartDate).toString()
      //     );
      //     let eTime: number = +Date.parse(
      //       new Date(delegateMang[0].EndDate).toString()
      //     );
      //     let cTime: number = +Date.parse(new Date().toString());
      //     if (fTime <= cTime && eTime >= cTime) {
      //       this.FinanceList.push(delegateMang[0].Delegatee);
      //     } else {
      //       this.FinanceList.push(FinanApprval[i].Approver);
      //     }
      //   }
    }
    console.log(
      "List of Finance List  Here 158 158 158 158 158 158 158 158",
      this.FinanceList
    );
    return this.FinanceList;
  }

  // finace Director Approval Log

  static async delegateFinanceDirector() {
    let FinanApprval = await restApiCall.FinanceApprovallog();
    for (let i: number = 0; i < FinanApprval.length; i++) {
      console.log("Finance Approval List 183 183 183 ", FinanApprval[i]);
      if (FinanApprval[i].FinanceDirector !== null) {
        let EmailFinanceDirectorApproval = await this.delegateCheck(
          FinanApprval[i].Approver
        );
        this.FinanceDirectorList.push(EmailFinanceDirectorApproval[0]);

        // let VacationLeaveDetails = await restApiCall.GetVacationLeave();
        // let delegateMang = VacationLeaveDetails.filter((vactionRes) => {
        //   return vactionRes.Requester == FinanApprval[i].Approver;
        // });
        // if (delegateMang.length == 0) {
        //   this.FinanceDirectorList.push(FinanApprval[i].Approver);
        // } else {
        //   let fTime: number = +Date.parse(
        //     new Date(delegateMang[0].StartDate).toString()
        //   );
        //   let eTime: number = +Date.parse(
        //     new Date(delegateMang[0].EndDate).toString()
        //   );
        //   let cTime: number = +Date.parse(new Date().toString());
        //   if (fTime <= cTime && eTime >= cTime) {
        //     this.FinanceList.push(delegateMang[0].Delegatee);
        //   } else {
        //     this.FinanceDirectorList.push(FinanApprval[i].Approver);
        //   }
        // }
      }
    }
    console.log(
      "List of Finance Director  List  Here 198 198 198 198 198 198 198 198",
      this.FinanceDirectorList
    );
    return this.FinanceDirectorList;
  }

  //-----------------------------------
  static async delegateApproval(TotalAmount: number, email: string) {
    let requstRes = await restApiCall.getRequestFor(email);

    let jobleveldetails = await restApiCall.GetJobLevelDetails();
    // 10. get Line Managers approvers
    let ManagerLevelDetails = await restApiCall.GetManagerDetails(email);
    //get delegates if approval on leave API
    let VacationLeaveDetails = await restApiCall.GetVacationLeave();
    let levelAmountCheck: number = 0;
    let empdetail;

    for (let i: number = 0; i < jobleveldetails.length; i++) {
      if (jobleveldetails[i].JobName === requstRes[0].JobLevel) {
        levelAmountCheck =
          jobleveldetails[i].Amount === null ? 0 : jobleveldetails[i].Amount;
        empdetail = requstRes[0];
        break;
      }
    }
    console.log(
      "Manager Name Find --- 140",
      empdetail,
      levelAmountCheck,
      TotalAmount,
      empdetail != undefined
    );
    if (TotalAmount < levelAmountCheck) {
      if (this.levelEnter) {
        return;
      }
      let upperManager = [];

      if (empdetail != undefined) {
        upperManager = ManagerLevelDetails.filter((newItem) => {
          return newItem.EmployeeID == empdetail.ManagerID;
        });
      }

      console.log(
        "Manager Name Find --- 143",
        upperManager,
        upperManager[0].Email
      );
      if (upperManager.length !== 0) {
        let delegateMang = VacationLeaveDetails.filter((vactionRes) => {
          return vactionRes.Requester == upperManager[0].Email;
        });
        console.log("Manager Name Find --- 163", delegateMang);
        if (delegateMang.length !== 0) {
          this.ManagerList.push(delegateMang[0].Delegatee);
        } else {
          console.log(
            "Manager Name Find This is The Upper manager here ---- ",
            upperManager
          );
          this.ManagerList.push(upperManager[0].Email);
        }
      }
    } else {
      this.levelEnter = true;
      console.log("Manager Name Find ------------------ ", TotalAmount);
      let upperManager = [];
      if (empdetail != undefined) {
        upperManager = ManagerLevelDetails.filter((newItem) => {
          return newItem.EmployeeID == empdetail.ManagerID;
        });
      }

      console.log("287 287 287 287 287 287 ", upperManager);
      if (upperManager.length !== 0) {
        let delegateMang = VacationLeaveDetails.filter((vactionRes) => {
          return vactionRes.Requester == upperManager[0].Email;
        });
        console.log("Manager Name Find --- 146", delegateMang);
        if (delegateMang.length !== 0) {
          this.ManagerList.push(delegateMang[0].Delegatee);
          this.delegateApproval(TotalAmount, upperManager[0].Email);
        } else {
          console.log(
            "Manager Name Find This is The Upper manager here ---- ",
            upperManager
          );
          this.ManagerList.push(upperManager[0].Email);
          this.delegateApproval(TotalAmount, upperManager[0].Email);
        }
      }
      console.log("Manager Name Find --- XXXXXXXX XXXX 175", upperManager);
      // this.ManagerList.push(upperManager[0].Email)
    }

    console.log("Manager Name Find ---311 311 311 311 311  ", this.ManagerList);

    return this.ManagerList;
  }

  static SaveandContinue = async (Totalamount: number, email: string) => {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
    const datePart = isoDate.split("T")[0];
    const formattedDate = `${datePart}T00:00:00`;

    //check EHS approval Here ...
    let ehsApprovalList = await this.ehsApproval();

    if (ehsApprovalList.length !== 0) {
      let ehsApiCallList = [];
      for (let i = 0; i < ehsApprovalList.length; i++) {
        let ehsData = {
          ApprovalType: "EHS Approval",
          ApprovalLevel: "Level 1",
          ConnectPRID: GlobalStore.getPrId(),
          ApproverName: ehsApprovalList[i],
          ApprovalStatus: "Waiting for approval",
          ApproverEmail: ehsApprovalList[i],
          ApprovalDate: formattedDate,
        };
        ehsApiCallList.push(ehsData);
      }
      await restApiCall.InsertApprovalLog(ehsApiCallList);
    }

    //Finance Approval Calll ...

    let financeList = await this.delegateFinance();
    if (financeList.length !== 0) {
      let saveFinanceLog = [];
      for (let i = 0; i < financeList.length; i++) {
        let finalApprovallog = {
          ApprovalType: "Finance Approval",
          ApprovalLevel: "Level 2",
          ConnectPRID: GlobalStore.getPrId(),
          ApproverName: financeList[i],
          ApprovalStatus: "Waiting for approval",
          ApproverEmail: financeList[i],
          ApprovalDate: formattedDate,
        };
        saveFinanceLog.push(finalApprovallog);
        console.log("saveApprovalLog", saveFinanceLog);
      }
      await restApiCall.InsertApprovalLog(saveFinanceLog);
    }

    // //Finance Director Check ----------------------
    if (GlobalStore.getTotal() > 250000) {
      let ListfinanceDirector = await this.delegateFinanceDirector();
      if (ListfinanceDirector.length !== 0) {
        let samplefinanceDirectorList = [];
        for (let i = 0; i < ListfinanceDirector.length; i++) {
          let financeDirectorData = {
            ApprovalType: "Finance Director Approval",
            ApprovalLevel: "Level 3",
            ConnectPRID: GlobalStore.getPrId(),
            ApproverName: ListfinanceDirector[i],
            ApprovalStatus: "Waiting for approval",
            ApproverEmail: ListfinanceDirector[i],
            ApprovalDate: formattedDate,
          };
          samplefinanceDirectorList.push(financeDirectorData);
        }
        await restApiCall.InsertApprovalLog(samplefinanceDirectorList);
      }
    }

    // //line item
    let managerList = await this.delegateApproval(Totalamount, email);
    if (managerList.length !== 0) {
      let saveApprovalLog = [];
      for (let i: number = 0; i < managerList.length; i++) {
        let managerEmail = managerList[i];

        let level = 4 + i;
        console.log("managerEmail--", managerEmail, managerList, level);
        let managerApprovalLog = {
          ApprovalType: "Line Manager Approval",
          ApprovalLevel: `Level ${level}`,
          ConnectPRID: GlobalStore.getPrId(),
          ApproverName: managerEmail,
          ApprovalStatus: "Waiting for approval",
          ApproverEmail: managerEmail,
          ApprovalDate: formattedDate,
        };
        saveApprovalLog.push(managerApprovalLog);
      }

      await restApiCall.InsertApprovalLog(saveApprovalLog);
    }

    let triggerRes = await axios.post(
      "https://prod-128.westus.logic.azure.com:443/workflows/285280455e04490faedf6fd3ffe48d23/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4E2jstWBRJhlIQG1ZBhY1dV91htB-zEy8vJy1J5oUW8",
      {
        PrId: GlobalStore.getPrId(),
      }
    );

    console.log(
      "Trigger PowerAutomation Successfully 399 399 39999 ",
      triggerRes
    );
  };
}
