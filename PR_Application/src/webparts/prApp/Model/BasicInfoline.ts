export class BasicInfoObj{
    lineObjname:string;
    basicInfoObjList:basicInfoitem[];
    totalAmount:number;
    constructor(lineObjname:string){
        this.lineObjname=lineObjname;
        this.basicInfoObjList=[];
        this.totalAmount=0;
    }
}
 
export class basicInfoitem{
   
        description:string;
        prepaid_to_date:string;
        prepaid_from_date:string;
        costCenter:string;
        date:string;
        glAccount:string;
        qty:string;
        UOM:string;
        uintprice:string;
        unitpriceper:string;
        totalAmount: number;
        constructor( description:string,
            prepaid_to_date:string,
            prepaid_from_date:string,
            costCenter:string,
            date:string,
            glAccount:string,
            qty:string,
            UOM:string,
            uintprice:string,
            unitpriceper:string,
            totalAmount: number){
            this.description=description;
            this.prepaid_to_date=prepaid_to_date;
            this.prepaid_from_date=prepaid_from_date;
            this.costCenter=costCenter;
            this.date=date;
            this.glAccount=glAccount;
            this.qty=qty;
            this.UOM=UOM;
            this.uintprice=uintprice;
            this.unitpriceper=unitpriceper;
            this.totalAmount= totalAmount;
        }
     
}