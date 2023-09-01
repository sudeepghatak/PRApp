export class EmployeeDetails{
    EmployeeId:string;
    text:string;
    companyCode:string;
    costCenter:string;

    constructor(EmployeeId:string,text:string,companyCode:string,costCenter:string){
        this.EmployeeId=EmployeeId;
        this.text=text;
        this.companyCode=companyCode;
        this.costCenter=costCenter;
    }

}