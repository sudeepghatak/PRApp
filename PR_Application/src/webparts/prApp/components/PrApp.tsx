import * as React from "react";
import styles from "./PrApp.module.scss";
import { IPrAppProps } from "./IPrAppProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { IPrAppState } from "./IPrAppState";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { SPFI, spfi } from "@pnp/sp";
import { getSP } from "./pnpjsConfig";
// import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
// import { ComboBoxListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
// import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { FieldPicker } from "@pnp/spfx-controls-react/lib/FieldPicker";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import { IPersonaProps } from "@fluentui/react/lib/Persona";
import {
  IBasePickerSuggestionsProps,
  NormalPeoplePicker,
  ValidationState,
} from "@fluentui/react/lib/Pickers";
import { IPRItem } from "./IPRItem";
import { ButtonType, DefaultPalette, Icon } from "office-ui-fabric-react";
import { DefaultButton } from "@fluentui/react";
import { Stack, IStackTokens } from "@fluentui/react/lib/Stack";
import { MainPage } from "./Middle/MainPage";
import { ConnectPr } from "../Api/api";
import PrMainPage from "./Middle/PrMainPage";
import FourthComponent from "./Middle/FourthComponent";
import * as pnp from "sp-pnp-js";
import { GlobalStore } from "../../../app/globalStore";
import Tippy from "@tippyjs/react";
import { GalaryMain } from "../components/Middle/Galary/galary_box/GalaryMain";
export default class PrApp extends React.Component<
  IPrAppProps,
  IPrAppState,
  {}
> {
  private _sp: SPFI;

  public constructor(props) {
    super(props);
    this.state = {
      PRAllListItems: [],
      PrMarketProjectCode: [],
      PrEngineerProjectCode: [],
      PREngineerProCodeNeedHelp: [],
      PRMarketProCodeNeedHelp: [],
      PRListItem: null,
      LoggedInUser:
        this.props.context.pageContext.legacyPageContext.userDisplayName,
    };
    this.context = this.props.context;
    this._sp = getSP();
    this.AddNewPRItem = this.AddNewPRItem.bind(this);
    this.UpdatePRItem = this.UpdatePRItem.bind(this);
    this.deletePRItem = this.deletePRItem.bind(this);
    this.OnDeleteButtonClick = this.OnDeleteButtonClick.bind(this);
    this.OnSubmitButtonClick = this.OnSubmitButtonClick.bind(this);
  }

  private async GetPRAllItems() {
    try {
      debugger;
      const spCache = spfi(this._sp);
      const response: any[] = await spCache.web.lists
        .getByTitle("PR_All_Requests")
        .items.getAll();
      console.log(response);
      this.setState({ PRAllListItems: response });
    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }
  // // PRMarketingProjectCode
  // private async GetPRMarketProjectCode() {
  //   try {
  //     // debugger;
  //     const spCache = spfi(this._sp);
  //     const response: IPRMarketProjectCode[] = await spCache.web.lists
  //       .getByTitle("PR_Mkt_Project_Codes")
  //       .items
  //       .select("Title")();
  //     console.log(response);
  //     this.setState({ PrMarketProjectCode: response });

  //   } catch (error) {
  //     console.log("Error in GetItem : " + error);
  //   }
  // }

  private async GetPRItemById(id: number) {
    try {
      debugger;
      const spCache = spfi(this._sp);
      const item: any = await spCache.web.lists
        .getByTitle("PR_All_Requests")
        .items.getById(id)();
      console.log(item);

      this.setState({ PRListItem: item });
    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }

  public async UpdatePRItem(item: IPRItem, PRId: number) {
    const spCache = spfi(this._sp);
    const addedItem: any = await spCache.web.lists
      .getByTitle("PR_All_Requests")
      .items.getById(PRId)
      .update({
        //Set the values from the object that is passed to the function
        ActCostCenter: item.ActCostCenter,
        // AesyntPRType: item.AesyntPRType,
        // AllApproversId: item.AllApproversId,
        // AllApproversStringId: item.AllApproversStringId,
        // AllManagersId: item.AllManagersId,
        // AllManagersStringId: item.AllManagersStringId,
        // ApprovalInstance: item.ApprovalInstance,
        // Attachments: item.Attachments,
        // AuthorId: item.AuthorId,
        // CCDescription: item.CCDescription,
        // CFOId: item.CFOId,
        // CFOStringId: item.CFOStringId,
        // CIP_Number: item.CIP_Number,
        // Comments: item.Comments,
        // Company: item.Company,
        // CompanyCode: item.CompanyCode,
        // ComplianceAssetId: item.ComplianceAssetId,
        // ContentTypeId: item.ContentTypeId,
        // ConvertedDollerAmount: item.ConvertedDollerAmount,
        // Cost_Center: item.Cost_Center,
        // CountryKey: item.CountryKey,
        // CreateDate: item.CreateDate,
        // Created: item.Created,
        // CurrentApprovalStep: item.CurrentApprovalStep,
        // EHDelegationCount: item.EHDelegationCount,
        // EHS: item.EHS,
        // EditorId: item.EditorId,
        // ExchangeRate: item.ExchangeRate,
        // ExchangeRateDate: item.ExchangeRateDate,
        // ExchangeRateV: item.ExchangeRateV,
        // FIDelegationCount: item.FIDelegationCount,
        // FIReminderCount: item.FIReminderCount,
        // FileSystemObjectType: item.FileSystemObjectType,
        // FinalApprovalDate: item.FinalApprovalDate,
        // FromCurrency: item.FromCurrency,
        // GL_Account: item.GL_Account,
        // GUID: item.GUID,
        // HRADCompanyCode: item.HRADCompanyCode,
        // HSRIPO: item.HSRIPO,
        // IsCFOApproved: item.IsCFOApproved,
        // IsCompleted: item.IsCompleted,
        // IsITVPApproved: item.IsITVPApproved,
        // IsOtherCC: item.IsOtherCC,
        // IsProjectPR: item.IsProjectPR,
        // JLReminderCount: item.JLReminderCount,
        // LastStatus: item.LastStatus,
        // LastWorkflowRun: item.LastWorkflowRun,
        // Location: item.Location,
        // Manager1Id: item.Manager1Id,
        // Manager1StringId: item.Manager1StringId,
        // Manager2Id: item.Manager2Id,
        // Manager2StringId: item.Manager2StringId,
        // Manager3: item.Manager3,
        // ManagerId: item.ManagerId,
        // ManagerLevel: item.ManagerLevel,
        // ManagerStringId: item.ManagerStringId,
        // Modified: item.Modified,
        // OldReqId: item.OldReqId,
        // Order_Amount: item.Order_Amount,
        // PONumber: item.PONumber,
        // PRID: item.PRID,
        // PR_Created_For_Self: item.PR_Created_For_Self,
        // PrepaidOrCapitalEquipment: item.PrepaidOrCapitalEquipment,
        // ProjectCode: item.ProjectCode,
        // ProjectDepartment: item.ProjectDepartment,
        // ProjectNumber: item.ProjectNumber,
        // QuickbookPO: item.QuickbookPO,
        // RequestForId: item.RequestForId,
        // RequestForStringId: item.RequestForStringId,
        // RequesterCurrency: item.RequesterCurrency,
        // SAPPOBalance: item.SAPPOBalance,
        // SAPPOEmailCount: item.SAPPOEmailCount,
        // SAPPONO: item.SAPPONO,
        // SAPPRId: item.SAPPRId,
        // SFADate: item.SFADate,
        // Shipping_ContactPhone: item.Shipping_ContactPhone,
        // Shipping_Country: item.Shipping_Country,
        // Shipping_Location: item.Shipping_Location,
        // Shipping_Name: item.Shipping_Name,
        // Shipping_Postal_Code: item.Shipping_Postal_Code,
        // Shipping_Region: item.Shipping_Region,
        // Shipping_Street: item.Shipping_Street,
        // Special_Instructions: item.Special_Instructions,
        // Status: item.Status,
        // Supplier_Account_Number: item.Supplier_Account_Number,
        // Supplier_Address: item.Supplier_Address,
        // Supplier_City: item.Supplier_City,
        // Supplier_Country: item.Supplier_Country,
        // Supplier_Name: item.Supplier_Name,
        // Supplier_State: item.Supplier_State,
        // Supplier_Zip: item.Supplier_Zip,
        // TaskCreatedForId: item.TaskCreatedForId,
        // TaskCreatedForStringId: item.TaskCreatedForStringId,
        // ThreeFortyBPO: item.ThreeFortyBPO,
        Title: item.Title,
        // ToCurrency: item.ToCurrency,
        // Type_Of_Buy: item.Type_Of_Buy,
        // Type_Of_Order: item.Type_Of_Order,
        // UFID: item.UFID,
        // submit_requestors_cost_center: item.submit_requestors_cost_center
      });
  }

  public async deletePRItem(PRId: number) {
    const spCache = spfi(this._sp);
    const addedItem: any = await spCache.web.lists
      .getByTitle("PR_All_Requests")
      .items.getById(PRId)
      .delete();

    console.log("Item deleted successfully");
  }

  public async AddNewPRItem(item: IPRItem) {
    const spCache = spfi(this._sp);
    const addedItem: any = await spCache.web.lists
      .getByTitle("PR_All_Requests")
      .items.add({
        //Set the values from the object that is passed to the function
        ActCostCenter: item.ActCostCenter,
        AesyntPRType: item.AesyntPRType,
        AllApproversId: item.AllApproversId,
        AllApproversStringId: item.AllApproversStringId,
        AllManagersId: item.AllManagersId,
        AllManagersStringId: item.AllManagersStringId,
        ApprovalInstance: item.ApprovalInstance,
        Attachments: item.Attachments,
        AuthorId: item.AuthorId,
        CCDescription: item.CCDescription,
        CFOId: item.CFOId,
        CFOStringId: item.CFOStringId,
        CIP_Number: item.CIP_Number,
        Comments: item.Comments,
        Company: item.Company,
        CompanyCode: item.CompanyCode,
        ComplianceAssetId: item.ComplianceAssetId,
        ContentTypeId: item.ContentTypeId,
        ConvertedDollerAmount: item.ConvertedDollerAmount,
        Cost_Center: item.Cost_Center,
        CountryKey: item.CountryKey,
        CreateDate: item.CreateDate,
        Created: item.Created,
        CurrentApprovalStep: item.CurrentApprovalStep,
        EHDelegationCount: item.EHDelegationCount,
        EHS: item.EHS,
        EditorId: item.EditorId,
        ExchangeRate: item.ExchangeRate,
        ExchangeRateDate: item.ExchangeRateDate,
        ExchangeRateV: item.ExchangeRateV,
        FIDelegationCount: item.FIDelegationCount,
        FIReminderCount: item.FIReminderCount,
        FileSystemObjectType: item.FileSystemObjectType,
        FinalApprovalDate: item.FinalApprovalDate,
        FromCurrency: item.FromCurrency,
        GL_Account: item.GL_Account,
        GUID: item.GUID,
        HRADCompanyCode: item.HRADCompanyCode,
        HSRIPO: item.HSRIPO,
        IsCFOApproved: item.IsCFOApproved,
        IsCompleted: item.IsCompleted,
        IsITVPApproved: item.IsITVPApproved,
        IsOtherCC: item.IsOtherCC,
        IsProjectPR: item.IsProjectPR,
        JLReminderCount: item.JLReminderCount,
        LastStatus: item.LastStatus,
        LastWorkflowRun: item.LastWorkflowRun,
        Location: item.Location,
        Manager1Id: item.Manager1Id,
        Manager1StringId: item.Manager1StringId,
        Manager2Id: item.Manager2Id,
        Manager2StringId: item.Manager2StringId,
        Manager3: item.Manager3,
        ManagerId: item.ManagerId,
        ManagerLevel: item.ManagerLevel,
        ManagerStringId: item.ManagerStringId,
        Modified: item.Modified,
        OldReqId: item.OldReqId,
        Order_Amount: item.Order_Amount,
        PONumber: item.PONumber,
        PRID: item.PRID,
        PR_Created_For_Self: item.PR_Created_For_Self,
        PrepaidOrCapitalEquipment: item.PrepaidOrCapitalEquipment,
        ProjectCode: item.ProjectCode,
        ProjectDepartment: item.ProjectDepartment,
        ProjectNumber: item.ProjectNumber,
        QuickbookPO: item.QuickbookPO,
        RequestForId: item.RequestForId,
        RequestForStringId: item.RequestForStringId,
        RequesterCurrency: item.RequesterCurrency,
        SAPPOBalance: item.SAPPOBalance,
        SAPPOEmailCount: item.SAPPOEmailCount,
        SAPPONO: item.SAPPONO,
        SAPPRId: item.SAPPRId,
        SFADate: item.SFADate,
        Shipping_ContactPhone: item.Shipping_ContactPhone,
        Shipping_Country: item.Shipping_Country,
        Shipping_Location: item.Shipping_Location,
        Shipping_Name: item.Shipping_Name,
        Shipping_Postal_Code: item.Shipping_Postal_Code,
        Shipping_Region: item.Shipping_Region,
        Shipping_Street: item.Shipping_Street,
        Special_Instructions: item.Special_Instructions,
        Status: item.Status,
        Supplier_Account_Number: item.Supplier_Account_Number,
        Supplier_Address: item.Supplier_Address,
        Supplier_City: item.Supplier_City,
        Supplier_Country: item.Supplier_Country,
        Supplier_Name: item.Supplier_Name,
        Supplier_State: item.Supplier_State,
        Supplier_Zip: item.Supplier_Zip,
        TaskCreatedForId: item.TaskCreatedForId,
        TaskCreatedForStringId: item.TaskCreatedForStringId,
        ThreeFortyBPO: item.ThreeFortyBPO,
        Title: item.Title,
        ToCurrency: item.ToCurrency,
        Type_Of_Buy: item.Type_Of_Buy,
        Type_Of_Order: item.Type_Of_Order,
        UFID: item.UFID,
        submit_requestors_cost_center: item.submit_requestors_cost_center,
      });

    console.log("Item added successfully:", addedItem);

    this.setState({ PRListItem: addedItem });
  }
  catch(error) {
    console.log("Error in Adding Item : " + error);
  }

  public componentDidMount(): void {
    // this.GetPRAllItems();
    //this.GetPRItemById(1);
    //  this.GetPRMarketProjectCode();
  }

  public async OnSubmitButtonClick() {
    let item: IPRItem = new IPRItem();
    item.Title = "Abc";
    item.ActCostCenter = 7;
    //this.AddNewPRItem(item);
    this.UpdatePRItem(item, 16);
  }

  public async OnDeleteButtonClick() {
    this.deletePRItem(17);
  }
  public async getEmail(siteURL: string) {
    const web = new pnp.Web(siteURL);
    const useDetails = await web.currentUser.get();
    GlobalStore.storeEmail(useDetails.Email, true);
    GlobalStore.storeName(useDetails.Title, true);
    console.log(useDetails.Email);
    console.log(useDetails.Title);
    console.log(useDetails.Id);
    console.log("HHHHHHHHHHHHHHH");
  }

  private onSelectedItem(items: []) {
    console.log("selected items:", items);
  }
  private _getPeoplePickerItems(items: any[]) {
    console.log("Items:", items);
  }
  public render(): React.ReactElement<IPrAppProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      siteUrl,
    } = this.props;
    this.getEmail(siteUrl);

    const suggestionProps: IBasePickerSuggestionsProps = {
      suggestionsHeaderText: "Suggested People",
      mostRecentlyUsedHeaderText: "Suggested Contacts",
      noResultsFoundText: "No results found",
      loadingText: "Loading",
      showRemoveButtons: true,
      suggestionsAvailableAlertText: "People Picker Suggestions available",
      suggestionsContainerAriaLabel: "Suggested contacts",
    };

    function onFilterChanged(
      filter: string,
      selectedItems?: IPersonaProps[]
    ): IPersonaProps[] | PromiseLike<IPersonaProps[]> {
      throw new Error("Function not implemented.");
    }

    function returnMostRecentlyUsed(
      selectedItems?: IPersonaProps[]
    ): IPersonaProps[] | PromiseLike<IPersonaProps[]> {
      throw new Error("Function not implemented.");
    }

    function getTextFromItem(
      item: IPersonaProps,
      currentValue?: string
    ): string {
      throw new Error("Function not implemented.");
    }

    function onRemoveSuggestion(item: IPersonaProps): void {
      throw new Error("Function not implemented.");
    }

    function validateInput(input: string): ValidationState {
      throw new Error("Function not implemented.");
    }

    return (
      <section
        className={`${styles.prApp} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={styles.welcome}>
          {/* <div>{siteUrl}</div>
           <div>{userDisplayName}</div> */}
          {/* <div>{userDisplayName}</div> */}
          {/* <button onClick={()=>this.GetPRMarketProjectCode()}>Save</button> */}

          {/* <h1>ComboBox</h1>
          <ComboBoxListItemPicker listId='Cities'
            columnInternalName='Country'
            orderBy='Country asc'
            keyColumnInternalName='Id'
            onSelectedItem={this.onSelectedItem}
            webUrl={this.props.context.pageContext.web.absoluteUrl}
            spHttpClient={this.props.context.spHttpClient as any} /> */}
          {/* <h1>
  People Picker
            </h1>
            <PeoplePicker
            context={this.props.context as any}
            titleText="People Picker"
            personSelectionLimit={1}
            showtooltip={true}
            required={true}
            disabled={false}
            onChange={this._getPeoplePickerItems}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} /> */}
          {/* <h1>Accordian</h1>
          {
            this.state.ListItems.map((item, index) => (
              <Accordion title={item.Title} defaultCollapsed={true} className={"itemCell"} key={index}>
                <div className={"itemContent"}>
                  <div className={"itemResponse"}>{item.Title}</div>
                  <div className={"itemIndex"}>{`Langue :  ${item.Country}`}</div>
                </div>
              </Accordion>
            )
           )
          }  */}

          {/* <Sample/> */}
          {/* <GalaryBox /> */}

          {/* <MainPage context={this.props.context as any}/>  */}
          
          <PrMainPage siteurl={siteUrl} />
          {/* <FourthComponent buttonContxtBack={function (): void {
            throw new Error('Function not implemented.');
          } } /> */}
        </div>
      </section>
    );
  }
}
