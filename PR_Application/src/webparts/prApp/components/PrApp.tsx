import * as React from 'react';
import styles from './PrApp.module.scss';
import { IPrAppProps } from './IPrAppProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IPrAppState } from './IPrAppState';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { SPFI, spfi } from '@pnp/sp';
import { getSP } from './pnpjsConfig';
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { ComboBoxListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import SecondComponent from './Middle/SecondComponent';
import FirstComponent from './Middle/FirstComponent';
import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { FieldPicker } from "@pnp/spfx-controls-react/lib/FieldPicker";
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { IBasePickerSuggestionsProps, NormalPeoplePicker, ValidationState } from '@fluentui/react/lib/Pickers';
import ThirdComponent from './Middle/ThirdComponent';
import TypeOfPurchase_Table from './Middle/LineItemTableFormat';
import { IPRItem } from './IPRItem';
import { ButtonType } from 'office-ui-fabric-react';
import { DefaultButton } from '@fluentui/react';


export default class PrApp extends React.Component<IPrAppProps, IPrAppState, {}> {

  private _sp: SPFI;

  public constructor(props) {
    super(props);
    this.state = {
      PRAllListItems: [],
      PRListItem: null,
      LoggedInUser: this.props.context.pageContext.legacyPageContext.userDisplayName
    };
    this.context = this.props.context;
    this._sp = getSP();
    this.AddNewPRItem = this.AddNewPRItem.bind(this);
    this.OnSubmitButtonClick = this.OnSubmitButtonClick.bind(this);
  }

  private async GetPRAllItems() {
    try {
      debugger;
      const spCache = spfi(this._sp);
      const response: any[] = await spCache.web.lists
        .getByTitle("PR_All_Requests")
        .items
        .getAll();
      console.log(response);
      this.setState({ PRAllListItems: response });

    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }
  private async GetPRItemById(id: number) {
    try {
      debugger;
      const spCache = spfi(this._sp);
      const item: any = await spCache.web.lists.getByTitle("PR_All_Requests").items.getById(id)();
      console.log(item);

      this.setState({ PRListItem: item });

    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }

  private async AddPRItem() {
    try {
      debugger;
      const spCache = spfi(this._sp);
      const item: any = await spCache.web.lists.getByTitle("PR_All_Requests").items.add({

        Title: "PR 2",
        ActCostCenter: 12334,
        AesyntPRType: "340B",
        // AllApproversId: null,
        // AllApproversStringId: null,
        // AllManagersId: null,
        // AllManagersStringId: null,
        ApprovalInstance: 3,
        Attachments: false,
        AuthorId: 12,
        CCDescription: "Finance",
        CFOId: 12,
        CFOStringId: "12",
        // CIP_Number: null,
        // Comments: null,
        Company: "HSRI",
        CompanyCode: "CO234",
        // ComplianceAssetId: null,
        // ContentTypeId: "0x010017849948E9E8F64B9FA27CED4A3849C7006C9BDB98B077894BA71FD84D8F0FBCE2",
        // ConvertedDollerAmount: null,
        Cost_Center: 456789,
        // CountryKey: null,
        CreateDate: "07-13-2023",
        Created: "2023-07-13T02:46:06Z",
        CurrentApprovalStep: "Finance",
        // EHDelegationCount: null,
        // EHS: true,
        // EditorId: 12,
        // ExchangeRate: null,
        // ExchangeRateDate: null,
        // ExchangeRateV:null,
        // FIDelegationCount: null,
        // FIReminderCount: null,
        // FileSystemObjectType: 0,
        // FinalApprovalDate: null,
        // FromCurrency: null,
        // GL_Account: null,
        // GUID: "7562bf9b-6adb-4427-be1c-915aa2e3ff6a",
        // HRADCompanyCode: null,
        // HSRIPO: null,
        // ID: 2,
        // Id: 2,
        IsCFOApproved: true,
        IsCompleted: true,
        IsITVPApproved: true,
        IsOtherCC: true,
        IsProjectPR: "Yes",
        // JLReminderCount: null,
        // LastStatus: null,
        // LastWorkflowRun: null,
        Location: "India",
        // Manager1Id: null,
        // Manager1StringId: null,
        // Manager2Id: null,
        // Manager2StringId:null,
        // Manager3: null,
        // ManagerId: null,
        // ManagerLevel: null,
        // ManagerStringId: null,
        // Modified: "2023-07-13T02:46:06Z",
        // OData__ColorTag: null,
        // OData__UIVersionString: "1.0",
        // OldReqId: null,
        // Order_Amount: null,
        PONumber: "PO12242",
        PRID: 2,
        PR_Created_For_Self: true,
        // PrepaidOrCapitalEquipment: null,
        ProjectCode: "PO2231",
        ProjectDepartment: "This is a test project",
        ProjectNumber: "PR 12237",
        // QuickbookPO:null,
        // RequestForId: 12,
        // RequestForStringId: 12,
        // RequesterCurrency:null,
        // SAPPOBalance: "7777",
        // SAPPOEmailCount: null,
        // SAPPONO: "167",
        // SAPPRId: null,
        // SFADate: null,
        // ServerRedirectedEmbedUri: null,
        // ServerRedirectedEmbedUrl: "",
        // Shipping_ContactPhone:null,
        // Shipping_Country: null,
        // Shipping_Location: null,
        // Shipping_Name: null,
        // Shipping_Postal_Code: null,
        // Shipping_Region:null,
        // Shipping_Street: null,
        // Special_Instructions: null,
        Status: "Draft",
        Supplier_Account_Number: "6753367",
        Supplier_Address: "Choice 3",
        Supplier_City: "Kolkata",
        Supplier_Country: "India",
        Supplier_Name: "Supplier 1",
        Supplier_State: "West Bengal",
        //Supplier_Zip: 713103,
        // TaskCreatedForId: null,
        // TaskCreatedForStringId: null,
        // ThreeFortyBPO: null,

        // ToCurrency: null,
        // Type_Of_Buy: "NPI Buy",
        // Type_Of_Order: null,
        // UFID: null,
        submit_requestors_cost_center: "Department"


      });

      console.log("Item added successfully:", item);

      this.setState({ PRListItem: item });

    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }


  public async AddNewPRItem(item: IPRItem) {
    const spCache = spfi(this._sp);
    const addedItem: any = await spCache.web.lists.getByTitle("PR_All_Requests").items.add({

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
      submit_requestors_cost_center: item.submit_requestors_cost_center


    });

    console.log("Item added successfully:", addedItem);

    this.setState({ PRListItem: addedItem });

  } catch(error) {
    console.log("Error in Adding Item : " + error);
  }


  public componentDidMount(): void {
    // this.GetPRAllItems();
    //this.GetPRItemById(1);

  }

  public async OnSubmitButtonClick() {

    let item: IPRItem = new IPRItem()
    item.Title = "Something";
    item.ActCostCenter = 12345;
    this.AddNewPRItem(item);
  }

  private onSelectedItem(items: []) {
    console.log("selected items:", items);
  }
  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  }
  public render(): React.ReactElement<IPrAppProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    const suggestionProps: IBasePickerSuggestionsProps = {
      suggestionsHeaderText: 'Suggested People',
      mostRecentlyUsedHeaderText: 'Suggested Contacts',
      noResultsFoundText: 'No results found',
      loadingText: 'Loading',
      showRemoveButtons: true,
      suggestionsAvailableAlertText: 'People Picker Suggestions available',
      suggestionsContainerAriaLabel: 'Suggested contacts',
    };


    function onFilterChanged(filter: string, selectedItems?: IPersonaProps[]): IPersonaProps[] | PromiseLike<IPersonaProps[]> {
      throw new Error('Function not implemented.');
    }

    function returnMostRecentlyUsed(selectedItems?: IPersonaProps[]): IPersonaProps[] | PromiseLike<IPersonaProps[]> {
      throw new Error('Function not implemented.');
    }

    function getTextFromItem(item: IPersonaProps, currentValue?: string): string {
      throw new Error('Function not implemented.');
    }

    function onRemoveSuggestion(item: IPersonaProps): void {
      throw new Error('Function not implemented.');
    }

    function validateInput(input: string): ValidationState {
      throw new Error('Function not implemented.');
    }



    return (
      <section className={`${styles.prApp} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <DefaultButton onClick={this.OnSubmitButtonClick}></DefaultButton>
          {/* <h1>ComboBox</h1>
          <ComboBoxListItemPicker listId='Cities'
            columnInternalName='Country'
            orderBy='Country asc'
            keyColumnInternalName='Id'
            onSelectedItem={this.onSelectedItem}
            webUrl={this.props.context.pageContext.web.absoluteUrl}
            spHttpClient={this.props.context.spHttpClient as any} /> */}
          {/*<h1>
 People Picker
            </h1>
            <PeoplePicker
            context={this.props.context as any}
            titleText="People Picker"
            personSelectionLimit={3}
            showtooltip={true}
            required={true}
            disabled={false}
            onChange={this._getPeoplePickerItems}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} />
          <h1>Accordian</h1>
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
          }  
           <MainPage/> */}
          {/*}  <FirstComponent />
            <SecondComponent/> 
         <ThirdComponent/>
          <TypeOfPurchase_Table/> */}

        </div>
      </section>
    );
  }
}
