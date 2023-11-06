export class BasicInfoObj{
    lineObjname:string;
    basicInfoObjList:basicInfoitem[]
    constructor(lineObjname:string){
        this.lineObjname=lineObjname;
        this.basicInfoObjList=[];
    }
}

export class basicInfoitem{
    
        description:string;
        costCenter:string;
        date:string;
        glAccount:string;
        qty:string;
        UOM:string;
        uintprice:string;
        unitpriceper:string;
        totalAmount: number;
        constructor( description:string,
            costCenter:string,
            date:string,
            glAccount:string,
            qty:string,
            UOM:string,
            uintprice:string,
            unitpriceper:string,
            totalAmount: number){
            this.description=description;
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