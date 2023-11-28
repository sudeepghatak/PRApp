import { IDropdownOption } from "@fluentui/react";

export class TypeofPurchaseDetail{
    CFID: string;
    typeofPurchaseName:string;
    prType:string;
    typeofPurchaseOption:string;
    projectCode:string;
    costCenter:string;
    typeOfPurchaseInfoList:TypeLineItem[];
    demotypeOfPurchaseInfoList:TypeLineItem[];
    glaccount: IDropdownOption[] = [];
 
    constructor(typeofPurchaseName:string,prType:string,typeofPurchaseOption:string,CFID:string){

        this.typeofPurchaseName=typeofPurchaseName;
        this.projectCode="";
        this.costCenter="";
        this.prType=prType;
        this.typeofPurchaseOption=typeofPurchaseOption;
        this.typeOfPurchaseInfoList=[];
        this.demotypeOfPurchaseInfoList=[];
        this.CFID=CFID;
    }

}
export class TypeLineItem{
    PKID:string|null;
    CFID: string;
    projectCode:string;
    des:string;
    CostCenter:string;
    date:string;
    glAccount:string;
    expensegl:string;
    qty:string;
    uOM:string;
    unitPrice:string;
    unitPricePer:string;
    totalamount:number;
    prepaid_to_date:string;
    prepaid_from_date:string;
    // expensegl:string;
    // glaccount:IDropdownOption[]

    constructor(CFID:string,projectCode:string,des:string,CostCenter:string,date:string,
        glAccount:string,expensegl:string,qty:string,uOM:string,unitPrice:string,unitPricePer:string,totalamount:number,prepaid_to_date:string,prepaid_from_date:string){
          this.PKID=null,
          this.CFID=CFID,
          this.projectCode=projectCode,
          this.des=des,
          this.CostCenter=CostCenter,
          this.date=date,
          this.glAccount=glAccount,
          this.expensegl=expensegl,
          this.qty=qty,
          this.uOM=uOM,
          this.unitPrice=unitPrice,
          this.unitPricePer=unitPricePer,
          this.totalamount=totalamount,
          this.prepaid_to_date=prepaid_to_date,
          this.prepaid_from_date=prepaid_from_date
        //   this.expensegl=expensegl
          // this.glaccount=new OptionList().getglAccountOption()
          // console.log("this.glaccount--",this.glaccount);
          
    }
}


