// import { IDropdownOption } from "@fluentui/react";

// export class TypeofPurchaseDetail{

//     typeofPurchaseName:string;
//     projectCode:string;
//     costCenter:string;
//     typeOfPurchaseInfoList:TypeLineItem[];
//     demotypeOfPurchaseInfoList:TypeLineItem[];
//     glaccount: IDropdownOption[] = [];
//     // tableviewItem: any;
 

//     constructor(typeofPurchaseName:string){

//         this.typeofPurchaseName=typeofPurchaseName;
//         this.projectCode="";
//         this.costCenter="";
//         this.typeOfPurchaseInfoList=[];
//         this.demotypeOfPurchaseInfoList=[];

//          }

 

// }
// export class TypeLineItem{
//     projectCode:string;
//     des:string;
//     CostCenter:string;
//     date:string;
//     glAccount:string;
//     qty:string;
//     uOM:string;
//     unitPrice:string;
//     unitPricePer:string;
//     totalamount:number;

//     constructor(projectCode:string,des:string,CostCenter:string,date:string,
//         glAccount:string,qty:string,uOM:string,unitPrice:string,unitPricePer:string,totalamount:number){
//           this.projectCode=projectCode,
//           this.des=des,
//           this.CostCenter=CostCenter,
//           this.date=date,
//           this.glAccount=glAccount,
//           this.qty=qty,
//           this.uOM=uOM,
//           this.unitPrice=unitPrice,
//           this.unitPricePer=unitPricePer,
//           this.totalamount=totalamount
//     }
// }


import { DropdownMenuItemType, IDropdownOption } from "@fluentui/react";

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
    CFID: string;
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
    glaccount:IDropdownOption[]

    constructor(CFID:string,projectCode:string,des:string,CostCenter:string,date:string,
        glAccount:string,qty:string,uOM:string,unitPrice:string,unitPricePer:string,totalamount:number){
          this.CFID=CFID,
          this.projectCode=projectCode,
          this.des=des,
          this.CostCenter=CostCenter,
          this.date=date,
          this.glAccount=glAccount,
          this.qty=qty,
          this.uOM=uOM,
          this.unitPrice=unitPrice,
          this.unitPricePer=unitPricePer,
          this.totalamount=totalamount,
          this.glaccount=new OptionList().getglAccountOption()
          console.log("this.glaccount--",this.glaccount);
          
    }
}

class OptionList{
   getglAccountOption=()=>{
        const options: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];
    return options;

  }

}
