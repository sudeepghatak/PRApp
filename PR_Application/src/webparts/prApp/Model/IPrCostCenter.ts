export class IPRCostCenterSap {
  Title: string;
  Details: string;
  CompanyCode: string;
  constructor(Title:string,Details:string,CompanyCode:string)
    {
        this.Title=Title;
        this.Details=Details;
        this.CompanyCode=CompanyCode;
     }
}

export class IPRCostCenterHSRI {
  Title: string;
  HSRICC: string;
}

export class IPRCostCenterThreeFortyB {
  Title: string;
  ThreeFortyBCC: string;
}


export class CostCenterDetails{
  Title:string | undefined;
  CostCenterType:string | undefined;
  Details:string | undefined;
  CompanyCode:string | undefined;
  
  constructor(Title:string,CostCenterType:string ,Details:string ,CompanyCode:string){
     this.CompanyCode=CompanyCode;
     this.CostCenterType=CostCenterType;
     this.Details=Details;
     this.Title=Title;
     
  }
}