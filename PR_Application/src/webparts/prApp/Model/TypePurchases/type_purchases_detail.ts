import { IDropdownOption } from "@fluentui/react";

export class TypeofPurchaseDetail{

    typeofPurchaseName:string;
    projectCode:string;
    costCenter:string;
    typeOfPurchaseInfoList:TypeLineItem[];
    demotypeOfPurchaseInfoList:TypeLineItem[];
    glaccount: IDropdownOption[] = [];
    // tableviewItem: any;
 

    constructor(typeofPurchaseName:string){

        this.typeofPurchaseName=typeofPurchaseName;
        this.projectCode="";
        this.costCenter="";
        this.typeOfPurchaseInfoList=[];
        this.demotypeOfPurchaseInfoList=[];

         }

 

}
export class TypeLineItem{
    projectCode:string;
    des:string;
    CostCenter:string;
    date:string;
    glAccount:string;
    qty:string;
    uOM:string;
    unitPrice:string;
    unitPricePer:string;
    totalamount:number;

    constructor(projectCode:string,des:string,CostCenter:string,date:string,
        glAccount:string,qty:string,uOM:string,unitPrice:string,unitPricePer:string,totalamount:number){
          this.projectCode=projectCode,
          this.des=des,
          this.CostCenter=CostCenter,
          this.date=date,
          this.glAccount=glAccount,
          this.qty=qty,
          this.uOM=uOM,
          this.unitPrice=unitPrice,
          this.unitPricePer=unitPricePer,
          this.totalamount=totalamount
    }
}
