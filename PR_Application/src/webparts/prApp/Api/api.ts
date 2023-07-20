import { SPFI,spfi } from "@pnp/sp";
import { getSP } from "../components/pnpjsConfig";
import { IPRItem } from "../components/IPRItem";
import { IPRMarketProCodeNeedHelp, IPRMarketProjectCode } from "../components/Middle/IPrMarketProjectCode";
import { IPREngineerProCodeNeedHelp, IPREngineerProjectCode } from "../components/Middle/IPrEngineerProjectCode";

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
        console.log("I am Here For do....")
    }
    public async addNewPRItem(item:IPRItem) {
        const spCache = spfi(ConnectPr.sp);
        console.log("Enter Here --------- >>  addNewPRItem Function Here ----  ");
        console.log(item.AesyntPRType);
        const addedItem: any = await spCache.web.lists.getByTitle("PR_All_Requests").items.add({
            Title:item.Title,
            AesyntPRType:item.AesyntPRType
        })

        console.log("Doing this type of Work Here ---------------------------")
        console.log(`Hello  ${addedItem}`)
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
            console.log("Enter Into ....................")
          console.log(response);
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
      console.log(response);
      console.log("----");
      
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
      console.log(response);
      return response;
    //   setState({ PrEngineerProjectCode: response });

    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }
// ---------------------------------------------------------------------------





}