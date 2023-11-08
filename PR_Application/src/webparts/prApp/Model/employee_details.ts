export class EmployeeDetails{
    EmployeeId:string;
    email:string;
    text:string;
    companyCode:string;
    costCenter:string;
    LegacyCompany:string;

    constructor(EmployeeId:string,email:string,text:string,companyCode:string,costCenter:string,LegacyCompany:string){
        this.EmployeeId=EmployeeId;
        this.email=email;
        this.text=text;
        this.companyCode=companyCode;
        this.costCenter=costCenter;
        this.LegacyCompany=LegacyCompany;
    }

}