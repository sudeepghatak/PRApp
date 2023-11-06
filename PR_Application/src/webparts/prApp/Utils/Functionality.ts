import { GlobalStore } from "../../../app/globalStore";
import { restApiCall } from "../Api/ApiCall";

export class Functionality{
    static async copynewConnetPrId(ConnectPRIDvalue){
        let prbasicInfo=await restApiCall.getPrbasicInfoContent(ConnectPRIDvalue);
        console.log("Data Here ",prbasicInfo);
        let lineinfo= await restApiCall.getPrlineItemContent(ConnectPRIDvalue)
       let attatchmentData=await restApiCall.getDocTypeurl(
        ConnectPRIDvalue
      );
      console.log("All data Here --------------- >>> copynewConnectprId",prbasicInfo,lineinfo,attatchmentData);
      let saveprimayData = [
       
      ];
      saveprimayData.push(prbasicInfo)
      console.log("This is The Save Data That Want to save Here ",saveprimayData)

    let getConnectPRIDvalue=await restApiCall
            .insertPrimaryInfoData(saveprimayData, true)


    
      let ConnectPRIDvaluestr: String = getConnectPRIDvalue.toString();
      let totalLoop = 10 - ConnectPRIDvaluestr.length;

      for (let k = 0; k < totalLoop; k++) {
        console.log("This is The Dta Fun --7", ConnectPRIDvaluestr);
        ConnectPRIDvaluestr = "0" + ConnectPRIDvaluestr;
      }
     console.log("This is Also -------------------",ConnectPRIDvaluestr);
      GlobalStore.storePrId(ConnectPRIDvaluestr);

      if (attatchmentData.length !== 0) {
        let fileInfo=[]
        for (
          let i: number = 0;
          i < attatchmentData.length;
          i++
        ) {
          let fileDatainfo = {
            PKID: ConnectPRIDvaluestr,
            ConnectPRID: ConnectPRIDvaluestr,
            Doc_Type: attatchmentData[i].Doc_Type,
            Filename: attatchmentData[i].Filename,
            Content: attatchmentData[i].Content,
            Modified_By: attatchmentData[i].Modified_By,
            Modified_Date: attatchmentData[i].Modified_Date,
          };

          fileInfo.push(fileDatainfo);
        }
        if(lineinfo.length !==0){
            for(let i=0;i<lineinfo.length;i++){
                lineinfo[i].PKID=ConnectPRIDvaluestr;
                lineinfo[i].ConnectPRID=ConnectPRIDvaluestr;

            }

        }
      
        await restApiCall.insertLineItem(lineinfo);
        await restApiCall
          .insertPrimaryInfoData(fileInfo, false)
        
      }

      return ConnectPRIDvaluestr  

   
       }

       static async deleteConnectprId(connectprID:string){
        let resDel = await restApiCall.deleteSelectedOrder(connectprID);

        console.log("Delete This item Here -----------------",resDel)
       }

} 