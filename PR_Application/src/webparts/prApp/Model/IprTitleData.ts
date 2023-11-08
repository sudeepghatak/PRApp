export class IPRTitleData{
     name:string;
     countryKey:string ;
     currencyKey:string ;
     costCenter:string ;
     TypeofbuyOption:string ;
     IsPrepaidCapital:string ;
     LegacyCompany:string;
     
     constructor(name:string,countryKey:string ,currencyKey:string ,costCenter:string,
                TypeofbuyOption:string ,IsPrepaidCapital:string,LegacyCompany:string){
        this.name=name;
        this.countryKey=countryKey;
        this.currencyKey=currencyKey;
        this.costCenter=costCenter;
        this.TypeofbuyOption=TypeofbuyOption;
        this.IsPrepaidCapital=IsPrepaidCapital;
        this.LegacyCompany=LegacyCompany;
     }
}