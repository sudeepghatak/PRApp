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


import { GlobalStore } from "../../../app/globalStore";
import { restApiCall } from "../Api/ApiCall";


export class FuncApprovalLog{
 
     static TotalAmount:number=12000;
     static levelEnter:boolean=false;
     static ManagerList=[];
     static FinanceList=[];
    static async FuncApprovalLogConnetPrId(){
       
        let requstRes=await restApiCall.getRequestFor("sunandap@omnicell.com")
        
        let jobleveldetails=await restApiCall.GetJobLevelDetails();
        // 10. get Line Managers approvers
        let ManagerLevelDetails=await restApiCall.GetManagerDetails("sunandap@omnicell.com");
        //get delegates if approval on leave API
        let VacationLeaveDetails=await restApiCall.GetVacationLeave();

        console.log("Response Data -------------------------58",requstRes,jobleveldetails,ManagerLevelDetails,VacationLeaveDetails)
    //     console.log("jobleveldetails::",jobleveldetails);
    //     console.log("jobleveldetails.length--",jobleveldetails.length);
    //     let joblevelList=[]
    //     for(let i:number=0;i<jobleveldetails.length;i++){
    //         let jobdataamount=jobleveldetails[i].Amount==null?0:jobleveldetails[i].Amount;
    //         if(TotalAmount>jobdataamount){
    //               let jobamountItem={
    //                 "text":jobdataamount,
                   
    //              }
    //         console.log("jobdataamount...",jobdataamount) 
    //         joblevelList.push(jobamountItem)

    //         }   
    //     }

    //     let ManagerName=[];
    //     let value:string=null;
    //     //&& value==null
    //     for(let i:number=0;i<ManagerLevelDetails.length && value==null ;i++ )
    //     {
    //         //get next manager designation.
    //         let ManagerDetails=ManagerLevelDetails[i];
    //         console.log("ManagerDetails::",ManagerDetails)
    //         for(let j:number=0;j<(joblevelList.length);j++){
    //             let JobLevel=joblevelList[i]
    //             console.log("joblevelList.length--",joblevelList.length);
    //             console.log("ManagerDetails:::::",ManagerDetails.JobLevel===JobLevel.JobName,ManagerDetails.JobLevel,JobLevel.JobName)
    //             if(ManagerDetails.JobLevel!==JobLevel.JobName)
    //             {
    //                 console.log("ManagerDetails===JobName:",ManagerDetails.JobLevel===JobLevel.JobName)
    //                 value=ManagerDetails.Email;
    //                 console.log("value ManagerDetails::",value);
    //             }
    //         }
    //     }
    //     if(value===null){
    //      // 13. delegates if approval on leave
    //         for(let i:number=0;i<VacationLeaveDetails.length;i++){
    //            if(value===VacationLeaveDetails[i].Requester){
    //                 let delegator=VacationLeaveDetails[i].Delegatee
    //                 // insert value in approval log 
    //                 ManagerName.push(delegator)
    //                 console.log("delegator::",delegator);
                    
    //            }
    //            else{
    //               ManagerName.push(value)
    //               console.log("value::",value);    
    //            }
    //         }
        
    //     }
    //     //get delegates if approval on leave
    //     //insert value in approval log 
    


    }
    static async delegateFinance()
{
    let FinanApprval= await restApiCall.FinanceApprovallog();
    for(let i:number=0;i<FinanApprval.length;i++){
        this.FinanceList.push(FinanApprval[i].Approver)

    }
    return this.FinanceList;


}
    static async delegateApproval(TotalAmount:number,email:string){
        let requstRes=await restApiCall.getRequestFor(email)
        
        let jobleveldetails=await restApiCall.GetJobLevelDetails();
        // 10. get Line Managers approvers
        let ManagerLevelDetails=await restApiCall.GetManagerDetails(email);
        //get delegates if approval on leave API
        let VacationLeaveDetails=await restApiCall.GetVacationLeave();
        let levelAmountCheck:number=0;
        let empdetail;

        for(let i:number=0;i<jobleveldetails.length;i++){
            if(jobleveldetails[i].JobName === requstRes[0].JobLevel){
                levelAmountCheck=jobleveldetails[i].Amount ===null?0:jobleveldetails[i].Amount
                empdetail=requstRes[0];
                break;

            }
        }
        console.log("Manager Name Find --- 140",empdetail,levelAmountCheck,TotalAmount,empdetail !=undefined)
        if(TotalAmount<levelAmountCheck){
            if(this.levelEnter){
                return;

            }
        let upperManager=[];
            
            if(empdetail !=undefined){
                    upperManager=ManagerLevelDetails.filter((newItem)=>{
                         
                        return newItem.EmployeeID==empdetail.ManagerID
                    })

            }
        
            console.log("Manager Name Find --- 143",upperManager,upperManager[0].Email)
            if(upperManager.length !==0){
                let delegateMang=VacationLeaveDetails.filter((vactionRes)=>{
                    return vactionRes.Requester== upperManager[0].Email

                } )
                console.log("Manager Name Find --- 163",delegateMang)
                if(delegateMang.length !==0){
                     this.ManagerList.push(delegateMang[0].Delegatee)
                }else{
                    console.log("Manager Name Find This is The Upper manager here ---- ",upperManager)
                    this.ManagerList.push(upperManager[0].Email)
                }

            }

        }
        else{
            this.levelEnter=true;
            console.log("Manager Name Find ------------------ ",TotalAmount)
            let upperManager=[];
            if(empdetail !=undefined){
                    upperManager=ManagerLevelDetails.filter((newItem)=>{
                        
                         
                        return newItem.EmployeeID==empdetail.ManagerID
                    })
            }
                        if(upperManager.length !==0){
                let delegateMang=VacationLeaveDetails.filter((vactionRes)=>{
                    return vactionRes.Requester== upperManager[0].Email

                } )
                console.log("Manager Name Find --- 146",delegateMang)
                if(delegateMang.length !==0){
                     this.ManagerList.push(delegateMang[0].Delegatee)
            this.delegateApproval(TotalAmount,delegateMang[0].Delegatee);

                }else{
                    console.log("Manager Name Find This is The Upper manager here ---- ",upperManager)
                    this.ManagerList.push(upperManager[0].Email)
            this.delegateApproval(TotalAmount,upperManager[0].Email);

                }

            }
            console.log("Manager Name Find --- 175",upperManager)
    // this.ManagerList.push(upperManager[0].Email)
             
        }
        // if(this.levelEnter){
        //     this.ManagerList.pop()

        // }
        console.log("Manager Name Find --- ",this.ManagerList)

        return  this.ManagerList;
        
    }
    static  SaveandContinue = async (Totalamount:number,email:string) => {
      let managerList=await this.delegateApproval(Totalamount,email)
      for(let i:number=0;i<managerList.length;i++){
        let managerEmail=managerList[i]
        console.log("managerEmail--",managerEmail,managerList);
        
            let saveApprovalLog=[{
        "ApprovalType": "Line Manager Approval",
        "ApprovalLevel": "Level 4",
        "ConnectPRID": GlobalStore.getPrId(),
        "ApproverName": managerEmail,
        "ApprovalStatus": "Waiting for approval",
        "ApproverEmail": managerEmail,
        "ApprovalDate": "2023-10-16T00:00:00"
    }]
    console.log("saveApprovalLog",saveApprovalLog);
    
    await restApiCall.InsertApprovalLog(saveApprovalLog)
      }

      let financeList=await this.delegateFinance();

      for(let i=0;i<financeList.length;i++){
        let saveFinanceLog=[{
        "ApprovalType": "Finance Approval",
        "ApprovalLevel": "Level 2",
        "ConnectPRID": GlobalStore.getPrId(),
        "ApproverName": financeList[i],
        "ApprovalStatus": "Waiting for approval",
        "ApproverEmail": financeList[i],
        "ApprovalDate": "2023-10-16T00:00:00"
    }]
    console.log("saveApprovalLog",saveFinanceLog);
    
    await restApiCall.InsertApprovalLog(saveFinanceLog)
      }

    
}

}


