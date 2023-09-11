import { SPFI,spfi } from "@pnp/sp";
import { getSP } from "../components/pnpjsConfig";
import { IPRItem } from "../components/IPRItem";
import { IPRMarketProCodeNeedHelp, IPRMarketProjectCode } from "../Model/IPrMarketProjectCode";
import { IPREngineerProCodeNeedHelp, IPREngineerProjectCode } from "../Model/IPrEngineerProjectCode";
import { IPRCompanyCode } from "../Model/IPrCompanyCode";
import { IPRCostCenterHSRI, IPRCostCenterSap, IPRCostCenterThreeFortyB } from "../Model/IPrCostCenter";
import { IPRShippingAddress, IPRShippingAddressCompanyCode } from "../Model/IPrShippingAddress";
import { IPRCountry, IPRRegion } from "../Model/IPrRegionCountry";
import { IPROtherShippingLoc } from "../Model/IPrOtherShippingLoc";
import { IPRExpenseGLLoc, IPRPrepaidGLLoc } from "../Model/IPrGLAccountLoc";

// import { ISearchQuery, SearchResults, SearchQueryBuilder } from "@pnp/sp/search";


export class ConnectPr{
    private static instance:ConnectPr;
    static sp:SPFI;
    private constructor(){
        ConnectPr.sp=getSP();

    }

    public static getInstance(): ConnectPr {
        if (!ConnectPr.instance) {
            ConnectPr.instance = new ConnectPr();
        }
        return ConnectPr.instance;
      }

    public printCheck(){
    }
    public async addNewPRItem(item:IPRItem) {
        const spCache = spfi(ConnectPr.sp);
        const addedItem: any = await spCache.web.lists.getByTitle("PR_All_Requests").items.add({
            Title:item.Title,
            AesyntPRType:item.AesyntPRType
        })
    //  console.log(`Hello  ${addedItem}`)
    }
// PROJECT CODE
// -----------------------------------------------------------------------------
    public async GetPRMarketProjectCode() {
        try {
          // debugger;
          const spCache = spfi(ConnectPr.sp);
          const response: IPRMarketProjectCode[] = await spCache.web.lists
            .getByTitle("PR_Mkt_Project_Codes")
            .items
            .select("Title","IsActive")();
          // console.log(response);
        //   this.setState({ PrMarketProjectCode: response });
        return response;
    
        } catch (error) {
          console.log("Error in GetItem : " + error);
        }
      }



      public async GetGettingStarted() {
        try {
          // debugger;
          const spCache = spfi(ConnectPr.sp);
          const response: any[] = await spCache.web.lists
            .getByTitle("Getting Started")
            .items
            .select("Title","Url")();
          // console.log(response);
        //   this.setState({ PrMarketProjectCode: response });
        return response;
    
        } catch (error) {
          console.log("Error in GetItem : " + error);
        }
      }


      public async GetPoliciesAndProcedures() {
        try {
          // debugger;
          const spCache = spfi(ConnectPr.sp);
          const response: any[] = await spCache.web.lists
            .getByTitle("Policies and Procedures")
            .items
            .select("Title","Url")();
          // console.log(response);
        //   this.setState({ PrMarketProjectCode: response });
        return response;
    
        } catch (error) {
          console.log("Error in GetItem : " + error);
        }
      }


      public async GetLegalDocuments() {
        try {
          // debugger;
          const spCache = spfi(ConnectPr.sp);
          const response: any[] = await spCache.web.lists
            .getByTitle("Legal Documents")
            .items
            .select("Title","Description")();
          // console.log(response);
        //   this.setState({ PrMarketProjectCode: response });
        return response;
    
        } catch (error) {
          console.log("Error in GetItem : " + error);
        }
      }


      public async GetFAQs() {
        try {
          // debugger;
          const spCache = spfi(ConnectPr.sp);
          const response: any[] = await spCache.web.lists
            .getByTitle("FAQs")
            .items
            .select("Title","Description")();
          // console.log(response);
        //   this.setState({ PrMarketProjectCode: response });
        return response;
    
        } catch (error) {
          console.log("Error in GetItem : " + error);
        }
      }

    public async GetPREnggProjectCodeItems() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPREngineerProjectCode[] = await spCache.web.lists
        .getByTitle("PR_Engg_Project_Codes")
        .items
        .select("Title","IsActive")();
      // console.log(response);
      
      return response;
    //   setState({ PrEngineerProjectCode: response });

    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }
 public async GetPRMarketProCodeNeedHelp() {
        try {
          // debugger;
          const spCache = spfi(ConnectPr.sp);
          const response: IPRMarketProCodeNeedHelp[] = await spCache.web.lists
            .getByTitle("PR_Mkt_Project_Codes")
            .items
            .select("Title","ProjectDesc","IsActive")();
            console.log("merket api..")
          console.log(response);
        //   this.setState({ PrMarketProjectCode: response });
        return response;
    
        } catch (error) {
          console.log("Error in GetItem : " + error);
        }
      }

    public async GetPREnggProCodeNeedHelp() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPREngineerProCodeNeedHelp[] = await spCache.web.lists
        .getByTitle("PR_Engg_Project_Codes")
        .items
        .select("Title","ProjDesc","IsActive")();
      // console.log(response);
      return response;
    //   setState({ PrEngineerProjectCode: response });

    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }
// ---------------------------------------------------------------------------

 public async GetPRCompanyCode() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPRCompanyCode[] = await spCache.web.lists
        .getByTitle("PR_Master_Company_Code")
        .items
        .select("MappedCompanyCode","IsValidSAPCompanyCode")();
      // console.log(response);
      return response;
    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }
// ------------------------------------------------------------------------
public async GetPRCostCenterSap() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPRCostCenterSap[] = await spCache.web.lists
        .getByTitle("PR_Unmapped_Cost_Center")
        .items
        .select("Title","Details","CompanyCode")();
      return response;
    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }

  public async GetPRCostCenterHSRI() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPRCostCenterHSRI[] = await spCache.web.lists
        .getByTitle("PR_HSRI_CC_Approval_Mapping")
        .items
        .select("Title","HSRICC")();
      // console.log(response);
      return response;
    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }

  public async GetPRCostCenterThreeFortyB() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPRCostCenterThreeFortyB[] = await spCache.web.lists
        .getByTitle("PR_340B_CC_Approval_Mapping")
        .items
        .select("Title","ThreeFortyBCC")();
      // console.log(response);
      return response;
    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }
// ------------------------------------------------------------------------

 public async GetPRSupplierAddress() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response:  IPRShippingAddress [] = 
        await spCache.web.lists
        .getByTitle("PR_Plant_Locations")
        .items
        .select("Title","PlantNumber","Country")();
      return response;
            
    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }

   public async GetPRSupplierAddressCompanyCode() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPRShippingAddressCompanyCode [] = await spCache.web.lists
        .getByTitle("PR_Company_Plant_Mapping")
        .items
        .select("Title","Plant")();
      // console.log(response);
      return response;

    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }

// ------------------------------------------------------------------------
 //Shipping Country.................
  public async GetPRCountry() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPRCountry[] = await spCache.web.lists
        .getByTitle("PR_Country")
        .items
        .select("Title","IsActive")();
      return response;
    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }

 //Shipping Region.................
  public async GetPRRegion() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPRRegion[] = await spCache.web.lists
        .getByTitle("PR_State")
        .items
        .select("Title","CountryKey")();
      return response;
    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }

// ------------------------------------------------------------------------

//Shipping Region...................................

  public async GetPROtherShippingLoc() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPROtherShippingLoc[] = await spCache.web.lists
        .getByTitle("PR_Other_Address_Mapping")
        .items
        .select("Title","HouseNumber","PostalCode","City")();
      return response;
    } 
    catch (error) {
      console.log("Error in GetItem : " + error);

    }
  }

// ------------------------------------------------------------------------
//Expense View GL Accounts ...................................

  public async GetPRExpenseGLLoc() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPRExpenseGLLoc[] = await spCache.web.lists
        .getByTitle("PR_GL_Account_Mapping")
        .items
        .select("Title","OrderType","Desc")();
        console.log("hello")
        console.log(response);
      return response;
    } 
    catch (error) {
      console.log("Error in GetItem : " + error);

    }
  }

// ------------------------------------------------------------------------
//Prepaid View GL Accounts ...................................

  public async GetPRPrepaidGLLoc() {
    try {
      const spCache = spfi(ConnectPr.sp);
      const response: IPRPrepaidGLLoc[] = await spCache.web.lists
        .getByTitle("Prepaid_View_GL_AC")
        .items
        .select("Type_of_Purchase","GL_Code","GL_Code_Description","Documents_Needed")();
      console.log("hi.........")
      console.log(response);
      return response;
            
    } 
    catch (error) {
      console.log("Error in GetItem : " + error);

    }
  }

// ------------------------------------------------------------------------


}