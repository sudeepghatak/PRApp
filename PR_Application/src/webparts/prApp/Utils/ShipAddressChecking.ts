import { ConnectPr } from "../Api/api";
import { IPRShippingAddressCompanyCode } from "../components/Middle/IPrShippingAddress";

export class ShipAddressChecking{

    static async shipToAddressCheck(companyCode:string) {
    
     let prCompanyCodeList=await ConnectPr.getInstance().GetPRSupplierAddressCompanyCode()

    let  filterprCompanyCodeList= prCompanyCodeList.filter((prcompanyCodeItem:IPRShippingAddressCompanyCode)=>
    prcompanyCodeItem.Title===companyCode);
    
   let getPrSupplierAdd=await ConnectPr.getInstance().GetPRSupplierAddress()
    let shipToAddress:string[]=[];
      // console.log(getPrSupplierAdd);
      // console.log(filterprCompanyCodeList);
      
  for(let i:number=0; i<getPrSupplierAdd.length;i++){
    for(let j:number=0;j<filterprCompanyCodeList.length;j++){
         if(filterprCompanyCodeList[j].Plant == getPrSupplierAdd[i].PlantNumber ){
            shipToAddress.push(getPrSupplierAdd[i].Title)
             
         } 
         else if(filterprCompanyCodeList[j].Plant!==getPrSupplierAdd[i].PlantNumber &&  getPrSupplierAdd[i].Country==="Other")   
         {
            shipToAddress.push(getPrSupplierAdd[i].Title);
            break;
         }   
    }
  
   }
   return shipToAddress

}
}