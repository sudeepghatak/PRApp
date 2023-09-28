import { GlobalStore } from "../../../app/globalStore";
import { restApiCall } from "../Api/ApiCall";
import { IPRPrepaidGLLoc } from "../Model/IPrGLAccountLoc";

export class TooltipPurchases{

    static async expenseTooltipdata(prType:string,tooltipName:string) {
    console.log("prType-----prType-----expense",prType);
    
        const expenseData=await restApiCall.GetTypeOfPurGLCodeOdrType(prType,"Expense",tooltipName);
        let data:IPRPrepaidGLLoc[]=[];
        if(expenseData.length !==0){
            for(let i:number=0;i<expenseData.length;i++){
                    
            let newItemExp={
            key: expenseData[i] ,
            Type_of_Purchase: expenseData[i].OrderType,
            GL_Code: expenseData[i].GL_Code,
            GL_Code_Description: expenseData[i].Dscription,
            Documents_Needed: expenseData[i].DocNeeded
          }
          data.push(newItemExp)
        
            }

        }


       console.log("Data Here dviuhdsoigjerhrgowj Expense",data);
       
        GlobalStore.storeTooltipData(prType,"Expense",tooltipName,data);
    

    }
    static async prepaidTooltipdata(prType:string,tooltipName:string){
        console.log("prType-----prType-----prepaid",prType);
       const prepaidData= await restApiCall.GetTypeOfPurGLCodeOdrType(prType,"Prepaid",tooltipName);
        let data:IPRPrepaidGLLoc[]=[];
        if(prepaidData.length !==0){
        for(let i:number=0;i<prepaidData.length;i++){
                 
            let newItemExp={
            key: prepaidData[i] ,
            Type_of_Purchase: prepaidData[i].OrderType,
            GL_Code: prepaidData[i].GL_Code,
            GL_Code_Description: prepaidData[i].Dscription,
            Documents_Needed: prepaidData[i].DocNeeded
          }
          data.push(newItemExp)
        
            }

        }


console.log("GlobalStore.storeTooltipData prepaid",data);

        GlobalStore.storeTooltipData(prType,"Prepaid",tooltipName,data);

    }


    
}