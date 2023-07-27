export class VendorDetails{
    vendorId:number|undefined;
     vendorName:string | undefined;
     vendorNumber:string | undefined;
     vendorAddress:string|undefined;
     vendorCity:string|undefined;
     vendorState:string|undefined;
     vendorZip:string|undefined;
     vendorCountry:string|undefined;
     venderCompanyCode:string;

     constructor(vendorId:number,vendorNumber:string,vendorName:string,vendorAddress:string,vendorCity:string,vendorState:string,vendorZip:string,vendorCountry:string,venderCompanyCode:string){
        this.vendorId=vendorId;
        this.vendorName=vendorName;
        this.vendorNumber=vendorNumber;
        this.vendorAddress=vendorAddress;
        this.vendorCity=vendorCity;
        this.vendorState=vendorState;
        this.vendorZip=vendorZip;
        this.vendorCountry=vendorCountry;
        this.venderCompanyCode=venderCompanyCode;
     }
}