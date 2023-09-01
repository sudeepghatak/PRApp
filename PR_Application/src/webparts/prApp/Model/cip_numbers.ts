export class CipNumberDetails{
    push(cipDetails: CipNumberDetails) {
        throw new Error("Method not implemented.");
    }
    cipNumber:string;
    details:string;
    companycode:string;

    constructor(cipNumber:string,details:string,companycode:string){
        this.cipNumber=cipNumber;
        this.details=details;
        this.companycode=companycode;
     }

}