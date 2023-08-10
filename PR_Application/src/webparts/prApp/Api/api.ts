import { SPFI,spfi } from "@pnp/sp";
import { getSP } from "../components/pnpjsConfig";
import { IPRItem } from "../components/IPRItem";
import { IPRMarketProCodeNeedHelp, IPRMarketProjectCode } from "../components/Middle/IPrMarketProjectCode";
import { IPREngineerProCodeNeedHelp, IPREngineerProjectCode } from "../components/Middle/IPrEngineerProjectCode";
import { IPRCostCenterHSRI, IPRCostCenterSap, IPRCostCenterThreeFortyB } from "../components/Middle/IPrCostCenter";
import { IPRShippingAddress, IPRShippingAddressCompanyCode } from "../components/Middle/IPrShippingAddress";
import { IPRCompanyCode } from "../components/Middle/IPrCompanyCode";
import { IPRCountry, IPRRegion } from "../components/Middle/IPrRegionCountry";
import { IPROtherShippingLoc } from "../components/Middle/IPrOtherShippingLoc";
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
        .select("Title","Details")();
      // console.log(response);
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

}