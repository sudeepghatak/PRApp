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
