import { WebPartContext } from "@microsoft/sp-webpart-base";
import{SPHttpClient} from "@microsoft/sp-http";
import { IPRItem } from "./IPRItem";
import { IPRMarketProCodeNeedHelp, IPRMarketProjectCode } from "../Model/IPrMarketProjectCode";
import { IPREngineerProCodeNeedHelp, IPREngineerProjectCode } from "../Model/IPrEngineerProjectCode";

export interface IPrAppState {
  PRAllListItems:IPRItem[];
  PRListItem: IPRItem;
  LoggedInUser:any;
  PrMarketProjectCode:IPRMarketProjectCode[];
  PrEngineerProjectCode:IPREngineerProjectCode[];
  PREngineerProCodeNeedHelp:IPREngineerProCodeNeedHelp[];
  PRMarketProCodeNeedHelp:IPRMarketProCodeNeedHelp[];
}
