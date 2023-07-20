import { WebPartContext } from "@microsoft/sp-webpart-base";
import{SPHttpClient} from "@microsoft/sp-http";
import { IPRItem } from "./IPRItem";
import { IPRMarketProCodeNeedHelp, IPRMarketProjectCode } from "./Middle/IPrMarketProjectCode";
import { IPREngineerProCodeNeedHelp, IPREngineerProjectCode } from "./Middle/IPrEngineerProjectCode";

export interface IPrAppState {
  PRAllListItems:IPRItem[];
  PRListItem: IPRItem;
  LoggedInUser:any;
  PrMarketProjectCode:IPRMarketProjectCode[];
  PrEngineerProjectCode:IPREngineerProjectCode[];
  PREngineerProCodeNeedHelp:IPREngineerProCodeNeedHelp[];
  PRMarketProCodeNeedHelp:IPRMarketProCodeNeedHelp[];
}
