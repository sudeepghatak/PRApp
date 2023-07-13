import { WebPartContext } from "@microsoft/sp-webpart-base";
import{SPHttpClient} from "@microsoft/sp-http";
import { IPRItem } from "./IPRItem";

export interface IPrAppState {
  ListItems:IPRItem[];
  LoggedInUser:any;
}
