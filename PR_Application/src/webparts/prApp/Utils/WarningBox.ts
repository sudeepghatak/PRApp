import { log } from "sp-pnp-js";
import { GlobalStore } from "../../../app/globalStore";
import { restApiCall } from "../Api/ApiCall";

export class WarningMessage{
    static  firstWarningCheck=async()=>{
    console.log("func Entry............");
    
    console.log("GlobalStore.getName()",GlobalStore.getName());

    console.log("Split Name::",GlobalStore.getName().split(" "));
    let name=GlobalStore.getName().split(" ")
    
      let nameRes=await restApiCall.getRequestFor(name[0])
      console.log("nameRes:",nameRes);
       if(nameRes.length!==0)
       {
        for(let i:number=0;i<=nameRes.length;i++)
        {
           if(nameRes[i].Email===GlobalStore.getEmail()) 
           {
            // "AssignmentCategory": "Regular (Employee)"
            if(nameRes[i].AssignmentCategory!=="Regular (Employee)")
            {
                let warningMsg={
                    name:GlobalStore.getName(),
                    CountryKey:nameRes[i].CountryKey,
                    CurrencyKey:nameRes[i].CurrencyKey,
                    CostCenter:nameRes[i].CostCenter,
                    // warningMsg:`${GlobalStore.getName()} has no company code `
                    warningMsg:"Temporary Employees and Contractors are not allowed to submit Purchase Requests!"

                };
                console.log("warningMsg",warningMsg);
                return warningMsg
                
                
            }
            console.log("name",name);
            
             return {
                 name:GlobalStore.getName(),
                    CountryKey:nameRes[i].CountryKey,
                    CurrencyKey:nameRes[i].CurrencyKey,
                    CostCenter:nameRes[i].CostCenter,
                    warningMsg:" "

                };
                
           }
        }

       }
    }
    //accept data from ui
    // [
    //     {
    //         "pr_create":"sap",
    //         "pr_yourself":yes
    //     },
    // loginName:"Shohini Chattergee"
    // ]
    static async  accept(data){
        //call api for check ...........this name 
        let warningList=[];
        for(let value  in data){
            console.log("let value  in data:", value,data);
            
            if(data[value]==="" || data[value]===undefined){
                console.log("value",value);
                
               warningList.push(value);
            }

        }
        console.log("warningList accept",warningList);
        
         let loginName=GlobalStore.getName().split(" ")
        let nameRes=await restApiCall.getRequestFor(loginName[0]);
        console.log("11.res",nameRes);
        if(nameRes.length!==0)
       {
        for(let i:number=0;i<=nameRes.length;i++)
        {
             if(nameRes[i].Email===GlobalStore.getEmail()) 
           {
            let warningMsg:string="";

            if(warningList.length !==0){
                    for(let i:number=0;i<warningList.length;i++)
                    {
                        let allWarningMsg:string= warningList[i];
                        allWarningMsg="Please Select  "+ allWarningMsg+"\n";
                        warningMsg=warningMsg+allWarningMsg;
                        console.log("Please Select+ allWarningMsg;", warningMsg);
                        
                    }
                   

                }
            // "AssignmentCategory": "Regular (Employee)"
            if(nameRes[i].AssignmentCategory!=="Regular (Employee)")
            {
                warningMsg="Temporary Employees and Contractors are not allowed to submit Purchase Requests!"+"\n"+warningMsg;
                console.log("if condition Regular (Employee)",warningMsg);

            }
            console.log("Regular (Employee)",warningMsg);
            
        return warningMsg;

        }

        }
    }
        

    }
    //then first check using login name check company code exist or not or check Temporary  employee(Tc)
    //then check type of purchases blank or not
}

