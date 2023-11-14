import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Stack, IStackTokens, IStackStyles } from "@fluentui/react/lib/Stack";
import { DefaultButton, IconButton } from "@fluentui/react/lib/Button";
import { Icon } from "@fluentui/react/lib/Icon";
import { DefaultPalette } from "@fluentui/react/lib/Styling";
import "./TooltipShow.css";
import styles from "../PrApp.module.scss";
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";
import { Checkbox, TextField } from "@fluentui/react";

import TableComponent from "./TableComponent";
import { Link } from "@fluentui/react";
import { ModalComponent } from "./ModalComponent";
import { FilePickModal } from "./FilePickModal";
import { ITableBuildProps } from "./MainPage";
import ProjectCodeComponent from "./TableProjectCodeComponent";
import { any } from "prop-types";
import { SPFI, spfi } from "@pnp/sp";
import { getSP } from "../pnpjsConfig";
import { ConnectPr } from "../../Api/api";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import PeopleComponent from "./PeopleComponent";
import { CipModal } from "./TableCipModal";
import PeoplePickerComponent from "./PeoplePickerComponent";
import { GLAccountComponent } from "./TableGLAccountComponent";
import { RootState } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeDisable,
  ChangeDisableToEdit,
  CheckboxItem,
  changeCheckbox,
  clearFileDoc,
  fileInformation,
  insertContent,
  refreshCheckBox,
  rightchangeCheckbox,
  saveFileDoc,
  setValue,
  toolTipUpdate,
} from "../../../../features/reducers/primaryinfoSlice";
import { setlineitemValue } from "../../../../features/reducers/lineitemSlice";
import {
  TypeLineItem,
  TypeofPurchaseDetail,
} from "../../Model/TypePurchases/type_purchases_detail";
import { restApiCall } from "../../Api/ApiCall";
import {
  savePkid,
  saveVendorandShippingData,
} from "../../../../features/reducers/vendorandshippingSlice";
import { WarningMessage } from "../../Utils/WarningBox";
import { GlobalStore } from "../../../../app/globalStore";
import TooltipShow from "./TooltipShow";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Tippy from "@tippyjs/react";
import { TooltipPurchases } from "../../Utils/tooltipTypeofpurchases";
import TableTooltipPurchases from "./TableTooltipPurchases";
import { ModalModelessExample } from "./Modalwarning";
import { IPrProjectCode } from "../../Model/IPrProjectCode";
import { fetchStatusContent } from "../../../../features/reducers/statusSlice";
import { EmployeeDetails } from "../../Model/employee_details";
import LoadingBox from "./LoadingBox";
import { VendorDetails } from "../../Model/vendor_details";
import { fetchSearchContent } from "../../../../features/reducers/searchSlice";
import { Functionality } from "../../Utils/Functionality";
import { CostCenterComponent } from "./TableCostCenter";

interface IFirstProps {
  buttonContxtSave: () => void;
  setTableCreate: (value: ITableBuildProps) => void;
  setTile: (value) => void;
  isViewMode: boolean;
  // context:WebPartContext;
}
let costCenter: string = "";
const PrimaryInfoComponent: React.FunctionComponent<IFirstProps> = (props) => {
  const { buttonContxtSave, setTableCreate, setTile, isViewMode } = props;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const primaryinfoData = useSelector((state: RootState) => state.primaryinfo);
  const lineintemData = useSelector((state: RootState) => state.lineiteminfo);
  //use for Modal Show ...........
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setisModalOpen(!isModalOpen);
  };

  //Project Code Modal Design Here ...........................
  const [openProjectCode, setopenProjectCode] = useState<boolean>(false);
  const showProjectCodeModal = () => {
    setopenProjectCode(!openProjectCode);
  };

  //GL Account Modal Design Here ...........................
  const [openGLAccount, setopenGLAccount] = useState<boolean>(false);
  const showopenGLAccount = () => {
    setopenGLAccount(!openGLAccount);
  };

  //Cost Center Modal Design Here ...........................
  const [openCostCenter, setopenCostCenter] = useState<boolean>(false);
  const showopenCostCenter = () => {
    setopenCostCenter(!openCostCenter);
  };

  //this use state for Dialog is visible or not .......................
  const [showDialog, setshowDialog] = useState<boolean>(false);

  const showAlertDialog = () => {
    setshowDialog(!showDialog);
  };

  //--------------------   -------

  const sectionStackTokens: IStackTokens = { childrenGap: 15 };
  //CIP Number for saving
  const CIPInput = React.useRef();

  // Company Code Get ..................................................
  const [companyCodeOption, setCompanyCodeOption] = useState([]);

  //For save ---------------------------------------------------
  interface Textbox {
    CIPNum: string;
    UFID: string;
  }

  const [textbox, setTextbox] = useState<Textbox>({
    CIPNum: "",
    UFID: "",
  });
  console.log(
    "Line Item OF data Here 138 ----------------",
    lineintemData.Finalpage,
    isViewMode
  );
  const newhandleInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string
  ) => {
    let name: string = (e.target as HTMLInputElement).name;
    let newtextBox = {
      ...textbox,
      [name]: newValue,
    };

    setTextbox(newtextBox);
    console.log("Textvalue ........", newtextBox);
  };
  console.log("Call Here For Update ----- 137 -- PrimaryinfoComponent");
  useEffect(() => {
    (async () => {
      let value = await restApiCall.getCompanycode();
      console.log("Company Code value164", value);
      let companyCodeList = [];
      for (let i: number = 0; i < value.data.length; i++) {
        let newcompany = {
          Key: value.data[i].MappedCompanyCode,
          text: value.data[i].MappedCompanyCode,
        };
        companyCodeList.push(newcompany);
      }
      setCompanyCodeOption(companyCodeList);
    })();
  }, []);

  console.log(
    "--------------PrimaryInfoComponent ---210",
    lineintemData.Finalpage
  );
  const [isLoadingComp, setisLoadingComp] = useState(false);
  // useEffect(() => {
  //   dispatch(clearFileDoc());
  // }, [lineintemData.Finalpage]);
  useEffect(() => {
    (async () => {
      if (
        lineintemData.Finalpage === `edit${GlobalStore.getPrId()}` ||
        lineintemData.Finalpage === `view${GlobalStore.getPrId()}`
      ) {
        // dispatch(refreshStore());
        setpeople({
          EmployeeId: "",
          email: "",
          text: "",
          companyCode: "",
          costCenter: "",
          LegacyCompany: "",
        });
        console.log(
          "Enter For Loading ------------------ 260 260 ",
          lineintemData.Finalpage,
          isViewMode
        );
 
        setisLoadingComp(true);
        let prInfo = await restApiCall.getPrbasicInfoContent(
          GlobalStore.getPrId()
        );
 
        console.log("------------------------ 207 ", prInfo);
 
        let saveRadioGroupData: IradioSave[] = [
          {
            ehsRadio: {
              key: prInfo.EHS ? "yes" : "no",
 
              text: prInfo.EHS ? "Yes" : "No",
            },
          },
 
          {
            prepaidcapitalRadio: {
              key: prInfo.PrepaidOrCapitalEquipment.split(" ")
                .join("")
                .toLowerCase(),
 
              text: prInfo.PrepaidOrCapitalEquipment,
            },
          },
 
          {
            constCenterRadio: {
              key:
                prInfo.ActCostCenter == 0
                  ? "department"
                  : "alternatecostcenter",
 
              text:
                prInfo.ActCostCenter == 0
                  ? "Department"
                  : "Alternate Cost Center",
            },
          },
 
          {
            prRadio: {
              key: prInfo.RequestFor === null ? "yes" : "no",
 
              text: prInfo.RequestFor === null ? "Yes" : "No",
            },
          },
 
          {
            buyRadio: {
              key: prInfo.Type_Of_Buy.split(" ").join("").toLowerCase(),
 
              text: prInfo.Type_Of_Buy,
            },
          },
 
          {
            prProjectRadio: {
              key:
                prInfo.IsProjectPR === null
                  ? ""
                  : prInfo.IsProjectPR === true
                  ? "yes"
                  : "no",
 
              text:
                prInfo.IsProjectPR === null
                  ? ""
                  : prInfo.IsProjectPR === true
                  ? "Yes"
                  : "No",
            },
          },
        ];
 
        console.log("Radio Group Here ---340 340", saveRadioGroupData);
        let saveOptionGroupData: IoptionSave[] = [
          {
            prOption: {
              key: prInfo.AesyntPRType,
 
              text: `${
                prInfo.AesyntPRType
              }(${prInfo.Company[0].toUpperCase()}${prInfo.Company.slice(1)})`,
            },
          },
 
          {
            companyCode: {
              key: prInfo.CompanyCode,
 
              text: prInfo.CompanyCode,
            },
          },
          {
            SelectAltCostCenter: {
              key:
                prInfo.ActCostCenter.toString() === undefined
                  ? ""
                  : prInfo.ActCostCenter.toString(),
 
              text: "",
            },
          },
 
          {
            selectDepartment: {
              key: prInfo.ProjectDepartment,
 
              text: prInfo.ProjectDepartment,
            },
          },
 
          {
            projectCode: {
              key: prInfo.ProjectCode.toLowerCase(),
 
              text: prInfo.ProjectCode,
            },
          },
        ];
 
        let emp_details =
          prInfo.RequestFor !== null
            ? await restApiCall.getallEmployeList(prInfo.RequestFor)
            : "";
        console.log(
          "EMp Details Here ----------------------",
          emp_details,
          prInfo.RequestFor,
          emp_details[0].text,
          emp_details[0].email
        );
        GlobalStore.storeName(emp_details[0].text, false);
        GlobalStore.storeEmail(emp_details[0].email, false);
        let saveData: ISaveData = {
          radioGroup: saveRadioGroupData,
 
          optionGroup: saveOptionGroupData,
          requestfor: emp_details[0],
        };
 
        console.log(
          "This is The Save Data Here ---------------------",
          saveData,
          GlobalStore.getPrId()
        );
 
        let fileValue = await restApiCall.getDocTypeurl(GlobalStore.getPrId());
        console.log(
          "This is The FileValue Here 353 353 353 ",
          fileValue,
          primaryinfoData.fileData.length
        );
        let getfileData;
        if (fileValue.length !== 0) {
          if (primaryinfoData.fileData.length === 0) {
            for (let i: number = 0; i < fileValue.length; i++) {
              getfileData = {
                key: fileValue[i].PKID,
                fileName: fileValue[i].Filename,
                fileType: "file",
                modifiedBy: fileValue[i].Modified_By,
                fileModifiedTime: fileValue[i].Modified_Date,
                docType: fileValue[i].Doc_Type,
                content: fileValue[i].Content,
              };
              if (getfileData.content !== undefined) {
                dispatch(saveFileDoc(getfileData));
              }
            }
          } else {
            console.log(
              "I am Here 373 373 373 373 ",
              primaryinfoData.fileData,
              fileValue
            );
            let saveFileData = [];
            let removeFileData = [];
            // if (primaryinfoData.fileData.length >= fileValue.length) {
            saveFileData = primaryinfoData.fileData.filter((itemData) =>
              fileValue.some((obj) => obj.PKID === itemData.key)
            );
            saveFileData = fileValue.filter(
              (value) => !saveFileData.some((obj) => obj.key === value.key)
            );
 
            removeFileData = primaryinfoData.fileData.filter(
              (itemData) => !fileValue.some((obj) => obj.PKID === itemData.key)
            );
 
            console.log(
              "This is All SaveFile Doc Here 382",
              saveFileData,
              removeFileData
            );
            if (saveFileData.length !== 0) {
              for (let m = 0; m < saveFileData.length; m++) {
                getfileData = {
                  key: saveFileData[m].PKID,
                  fileName: saveFileData[m].Filename,
                  fileType: "file",
                  modifiedBy: saveFileData[m].Modified_By,
                  fileModifiedTime: saveFileData[m].Modified_Date,
                  docType: saveFileData[m].Doc_Type,
                  content: saveFileData[m].Content,
                };
                if (getfileData.content !== undefined) {
                  console.log(
                    "This is SaVE fiLE doC hERE 394 394 ",
                    getfileData
                  );
                  dispatch(saveFileDoc(getfileData));
                }
              }
            }
            if (removeFileData.length !== 0) {
              for (let n = 0; n < removeFileData.length; n++) {
                getfileData = {
                  key: removeFileData[n].key,
                  fileName: removeFileData[n].fileName,
                  fileType: "file",
                  modifiedBy: removeFileData[n].modifiedBy,
                  fileModifiedTime: removeFileData[n].fileModifiedTime,
                  docType: removeFileData[n].docType,
                  content: removeFileData[n].content,
                };
                console.log("434 434 434 434 434 ", getfileData);
                if (getfileData.content !== undefined) {
                  dispatch(clearFileDoc(getfileData));
                }
              }
            }
            // }
          }
        }
       
        let Shipping_Postal_CodeList =
          prInfo.Shipping_Postal_Code == null
            ? []
            : prInfo.Shipping_Postal_Code.split("#");
        let Shipping_StreetList =
          prInfo.Shipping_Street == null
            ? []
            : prInfo.Shipping_Street.split("#");
        dispatch(
          saveVendorandShippingData({
            vendorDetails: new VendorDetails(
              0,
 
              prInfo.Supplier_Account_Number,
              prInfo.Supplier_Name,
              prInfo.Supplier_Address,
              prInfo.Supplier_City,
              prInfo.Supplier_State,
              prInfo.Supplier_Zip,
              prInfo.Supplier_Country,
              prInfo.CompanyCode
            ),
 
            vendorOtherDetails: {
              justificatiOnOrder: prInfo.Comments,
              downPaymentDetails: prInfo.Special_Instructions,
              Name: prInfo.Shipping_Name,
              HouseNumber:
                Shipping_StreetList[0] == undefined
                  ? ""
                  : Shipping_StreetList[0],
              StreetName:
                Shipping_StreetList[1] == undefined
                  ? ""
                  : Shipping_StreetList[1],
              PostalCode:
                Shipping_Postal_CodeList[0] == undefined
                  ? ""
                  : Shipping_Postal_CodeList[0],
              City:
                Shipping_Postal_CodeList[1] == undefined
                  ? ""
                  : Shipping_Postal_CodeList[1],
              ContactName: prInfo.Shipping_ContactPhone,
            },
            ship_to_address: {
              key: prInfo.Location == null ? "" : prInfo.Location,
              text: prInfo.Location == null ? "" : prInfo.Location,
            },
            shipping_region: {
              key: prInfo.Shipping_Region == null ? "" : prInfo.Shipping_Region,
              text:
                prInfo.Shipping_Region == null ? "" : prInfo.Shipping_Region,
            },
            Shipping_Location: {
              key:
                prInfo.Shipping_Location == null
                  ? ""
                  : prInfo.Shipping_Location,
              text:
                prInfo.Shipping_Location == null
                  ? ""
                  : prInfo.Shipping_Location,
            },
          })
        );
 
        dispatch(setValue(saveData));
        dispatch(refreshCheckBox());
        let type_of_order_list = prInfo.Type_Of_Order.split(",");
        for (let i = 0; i < type_of_order_list.length; i++) {
          dispatch(changeCheckbox(type_of_order_list[i]));
          dispatch(rightchangeCheckbox(type_of_order_list[i]));
        }
 
        setisLoadingComp(false);
        console.log("----------------Insert Data ", getfileData);
      }
    })();
  }, [lineintemData.Finalpage]);

  // .....................................................................

  //this is for all radio option
  const [selectRadioItems, setSelectRadioItems] = useState<{
    [key: string]: IChoiceGroupOption;
  }>({
    prRadio: { key: "", text: "" },
    constCenterRadio: { key: "", text: "" },
    prProjectRadio: { key: "", text: "" },
    buyRadio: { key: "", text: "" },
    prepaidcapitalRadio: { key: "", text: "" },
    ehsRadio: { key: "", text: "" },
  });

  const [people, setpeople] = useState({
    EmployeeId: "",
    email: "",
    text: "",
    companyCode: "",
    costCenter: "",
    LegacyCompany: "",
  });

  const [isPrepaidCapitalbuy, setisPrepaidCapitalbuy] =
    useState<boolean>(false);

  const [isPrProject, setisPrProject] = useState<boolean>(false);

  const [isBlanketPrSelect, setisBlanketPrSelect] = useState<boolean>(false);

  const [isPRsubmit, setisPRsubmit] = useState<boolean>(false);

  const [isAlternetCostcenterSelect, setisAlternetCostcenterSelect] =
    useState<boolean>(false);

  //cip Number pop up --- for capital equipment select

  const [openCipNumberModal, setopenCipNumberModal] = useState<boolean>(false);

  const showCipNumberModal = () => {
    setopenCipNumberModal(!openCipNumberModal);
  };

  const prOption: IChoiceGroupOption[] = [
    { key: "yes", text: "Yes" },
    { key: "no", text: "No" },
  ];

  const prProjectOption: IChoiceGroupOption[] = [
    { key: "yes", text: "Yes" },
    { key: "no", text: "No" },
  ];

  const buyOption: IChoiceGroupOption[] = [
    { key: "expensebuy", text: "Expense Buy" },
    { key: "blanketpr", text: "Blanket PR" },
  ];

  const prepaidcapitalOption: IChoiceGroupOption[] = [
    { key: "expense", text: "Expense" },
    { key: "prepaid", text: "Prepaid" },
    // { key: "capitalequipmentasset", text: "Capital Equipment / Asset" },
    // { key: "lease", text: "Lease" },
  ];

  const newprepaidcapitalOption: IChoiceGroupOption[] = [
    { key: "expense", text: "Expense" },
    { key: "prepaid", text: "Prepaid" },
    { key: "capitalequipmentasset", text: "Capital Equipment / Asset" },
    { key: "lease", text: "Lease" },
  ];

  const ehsOption: IChoiceGroupOption[] = [
    { key: "yes", text: "Yes" },
    { key: "no", text: "No" },
  ];

  const choiceGroupStyles = {
    label: {
      display: "inline",
    },
    flexContainer: {
      columnGap: "1em",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  };

  const radioOnChange = (
    ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    option?: IChoiceGroupOption | undefined
  ) => {
    const { name } = ev?.target as HTMLInputElement;
    console.log(name);
    let newSelectedItem: IChoiceGroupOption = { key: "", text: "" };
    // if (option) {
    newSelectedItem = {
      key: option?.key as string,
      text: option?.text as string,
    };
    // }
    // console.log(newSelectedItem);
    setSelectRadioItems((prevSelectRadioItems) => ({
      ...prevSelectRadioItems,
      [name]: newSelectedItem, // Update the specific option state key
    }));
  };

  useEffect(() => {
    if (selectRadioItems.constCenterRadio.text == "Alternate Cost Center") {
      setisAlternetCostcenterSelect(true);
    } else {
      setisAlternetCostcenterSelect(false);
    }
    if (selectRadioItems.buyRadio.text == "Blanket PR") {
      setisBlanketPrSelect(true);
    } else {
      setisBlanketPrSelect(false);
    }
    if (selectRadioItems.prProjectRadio.text == "Yes") {
      // GetPREnggProjectCodeItems()
      setisPrProject(true);
    } else {
      setisPrProject(false);
    }

    if (selectRadioItems.prRadio.text == "No") {
      setisPRsubmit(true);
    } else {
      console.log("I Just Enter For Check Here --------------------------- ");
      GlobalStore.storeEmail(GlobalStore.getmainEmail(), false);
      GlobalStore.storeName(GlobalStore.getmainName(), false);
      setisPRsubmit(false);
    }

    if (
      selectRadioItems.prepaidcapitalRadio.text === "Capital Equipment / Asset"
    ) {
      setisPrepaidCapitalbuy(true);
    } else {
      setisPrepaidCapitalbuy(false);
    }
    if (selectRadioItems.prepaidcapitalRadio.text === "Lease") {
      dispatch(ChangeDisable(true));
    } else {
      dispatch(ChangeDisableToEdit(true));
    }
  }, [selectRadioItems]);

  //this is for all dropdown option....................
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: IDropdownOption;
  }>({
    prOption: { key: "", text: "" },
    companyCode: { key: "", text: "" },
    selectDepartment: { key: "", text: "" },
    projectCode: { key: "", text: "" },
    SelectAltCostCenter: { key: "", text: "" },
  });

  const [ProCodeItem, setProCodeItem] = useState<IPrProjectCode>(
    new IPrProjectCode(" ", " ")
  );

  const selectCostCenterOption: IChoiceGroupOption[] = [
    { key: "department", text: "Department" },
    { key: "alternatecostcenter", text: "Alternate Cost Center" },
  ];
  const selectDepartmentOption: IDropdownOption[] = [
    { key: "Engineering", text: "Engineering" },
    { key: "Marketing", text: "Marketing" },
  ];

  const [projectCodeOption, setprojectCodeOption] = useState([]);
  // Cost Center Code Get UseState ..................................................
  const [costCenterOption, setCostCenterOption] = useState([]);

  const PrOption: IDropdownOption[] = [
    { key: "SAP", text: "SAP(Omnicell)" },
    { key: "HSRI", text: "HSRI" },
    { key: "340B", text: "340B" },
  ];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };
  console.log(
    "This is Company Code Option Here ---- XXXX ",

    selectedItems
  );
  //peoplepicker
  const companyCodeOptionSet = useCallback((newItem) => {
    if (newItem.length !== 0) {
      // console.log(newItem[0].companyCode);

      let itemTest = {
        key: newItem[0].companyCode,

        text: newItem[0].companyCode,
      };

      costCenter = newItem[0].costCenter;
      setpeople(newItem[0]);
      setCompanyCodeOption([itemTest]);
      console.log("----------------->>>>>>>750 750 750", newItem[0]);
      // setSelectedItems((prevSelectedItems) => ({
      //   ...prevSelectedItems,
      //   ...itemTest,
      // }));
    }
  }, []);
  console.log("option data ", selectedItems, companyCodeOption);

  const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number
  ): void => {
    const { id } = event.target as HTMLDivElement;
    console.log("------------------Sap===Sap", item);
    console.log(id);
    let newSelectedItem: IDropdownOption = { key: "", text: "" };

    newSelectedItem = { key: item?.key as string, text: item?.text as string };
    console.log(
      "------------------ newSelectedItem === newSelectedItem",
      newSelectedItem
    );
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: newSelectedItem,
    }));
    if (id === "prOption") {
      // setshowDialog(true);
      // <ModalModelessExample/>
    }
  };
  //------------------------------------------

  //this is set all data in redux store ...
  useEffect(() => {
    console.log(
      "selectedItems.selectDepartment.text----",
      selectedItems.selectDepartment.text
    );
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk499", lineintemData.Finalpage);
    for (let i = 0; i < Object.keys(primaryinfoData.optionGroup).length; i++) {
      let newSelectedItem = {
        key: primaryinfoData.optionGroup[
          Object.keys(primaryinfoData.optionGroup)[i]
        ].key,

        text: primaryinfoData.optionGroup[
          Object.keys(primaryinfoData.optionGroup)[i]
        ].text,
      };

      setSelectedItems((prevSelectedItems) => ({
        ...prevSelectedItems,

        [Object.keys(primaryinfoData.optionGroup)[i]]: newSelectedItem,
      }));
    }
    // setCompanyCodeOption(() => [selectedItems.companyCode]);
    for (let i = 0; i < Object.keys(primaryinfoData.radioGroup).length; i++) {
      console.log(
        "       -------------------------------                       --------------------               ----------------------             ",
        primaryinfoData.radioGroup[Object.keys(primaryinfoData.radioGroup)[i]]
          .key,
        primaryinfoData.radioGroup[Object.keys(primaryinfoData.radioGroup)[i]]
          .text
      );
      let newSelectedItem = {
        key: primaryinfoData.radioGroup[
          Object.keys(primaryinfoData.radioGroup)[i]
        ].key,

        text: primaryinfoData.radioGroup[
          Object.keys(primaryinfoData.radioGroup)[i]
        ].text,
      };

      setSelectRadioItems((prevSelectRadioItems) => ({
        ...prevSelectRadioItems,

        [Object.keys(primaryinfoData.radioGroup)[i]]: newSelectedItem, // Update the specific option state key
      }));
    }
    console.log("Primary info Component here ----685", [
      primaryinfoData.requestfor,
    ]);
    companyCodeOptionSet([primaryinfoData.requestfor]);
  }, [lineintemData.Finalpage, primaryinfoData.dataInsert]);

  useEffect(() => {
    let prType: string = selectedItems.prOption.key as string;

    console.log("prType......prType.....prType :::", prType);

    for (let i: number = 0; i < primaryinfoData.leftCheckbox.length; i++) {
      TooltipPurchases.expenseTooltipdata(
        prType,
        primaryinfoData.leftCheckbox[i].label
      );
      TooltipPurchases.prepaidTooltipdata(
        prType,
        primaryinfoData.leftCheckbox[i].label
      );
    }
  }, [selectedItems.prOption]);

  const [warningContent, setwarningContent] = useState<string>(" ");

  useEffect(() => {
    WarningMessage.firstWarningCheck().then((value) => {
      console.log(
        "selectRadioItems.buyRadio.text:::--",
        selectRadioItems.buyRadio.text,
        value
      );

      let titledata = {
        name: value.name,
        countryKey: value.CountryKey,
        currencyKey: value.CurrencyKey,
        costCenter: value.CostCenter,
        TypeofbuyOption: selectRadioItems.buyRadio.text,
        IsPrepaidCapital: selectRadioItems.prepaidcapitalRadio.text,
        LegacyCompany: value.LegacyCompany,
      };
      GlobalStore.storeTitledata(titledata);
      setTile(titledata);

      if (value.warningMsg !== " ") {
        setwarningContent(value.warningMsg);
        setshowDialog(true);
      }
    });
  }, [
    GlobalStore.getName(),
    selectRadioItems.buyRadio.text,
    selectRadioItems.prepaidcapitalRadio.text,
  ]);

  useMemo(
    async () => {
      // Select Other Cost Center Options ----------------------------------
      // if(selectedItems.prOption.key==="SAP"){

      let Prcostcenter = await restApiCall.getCostCenterList(
        selectedItems.companyCode.text
      );

      let listDataCostCenterSap = [];
      for (let i = 0; i < Prcostcenter.length; i++) {
        let newObjCostCenter = {
          key: Prcostcenter[i].Title,
          text: Prcostcenter[i].Title + "(" + Prcostcenter[i].Details + ")",
        };
        listDataCostCenterSap.push(newObjCostCenter);
      }
      setCostCenterOption([...listDataCostCenterSap]);

      console.log("856 856 856 ---", selectedItems, costCenterOption);
    },

    //  }
    [selectedItems.companyCode]
  );

  useEffect(() => {
    let costCentervalue = primaryinfoData.optionGroup.SelectAltCostCenter;
    console.log(
      "------newcostCenter Value ",
      costCentervalue,
      costCenterOption
    );
    let newcostCenterValue = costCenterOption.filter(
      (costItem) => costItem.key == costCentervalue.key
    );

    console.log("------newcostCenter Value ", newcostCenterValue);
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      SelectAltCostCenter:
        newcostCenterValue[0] == undefined
          ? { key: "", text: "" }
          : newcostCenterValue[0],
    }));
  }, [costCenterOption]);

  console.log(
    "This is The Main Cost Center Here 866",
    selectedItems,
    costCenterOption
  );

  useMemo(() => {
    let listProjectCode = [];
    restApiCall
      .getProjetCodeList(selectedItems.selectDepartment.text)
      .then((projectCodeList) => {
        for (let i = 0; i < projectCodeList.length; i++) {
          if (projectCodeList[i].IsActive) {
            let newOption = {
              key: projectCodeList[i].Title.toLowerCase(),
              text: projectCodeList[i].Title,
            };
            listProjectCode.push(newOption);
          }
        }
        setprojectCodeOption([...listProjectCode]);
      });
  }, [selectedItems.selectDepartment]);
  console.log("This is The Department Option Find Now--- ", projectCodeOption);
  // useEffect(()=>{

  // },[]);

  const hoverCallfunction = (
    prType: string,
    ebuy: string,
    toolName: string
  ) => {
    let queryData = {
      prType: prType,
      ebuy: ebuy,
      toolName: toolName,
    };
    dispatch(toolTipUpdate(queryData));
  };
  //......................................

  //for file upload .........................

  interface IoptionSave {
    [key: string]: IDropdownOption;
  }

  interface IradioSave {
    [key: string]: IChoiceGroupOption;
  }

  interface ISaveData {
    radioGroup: IradioSave[];
    optionGroup: IoptionSave[];
    requestfor?: EmployeeDetails;
  }

  const changeStrToBool = (value: string) => {
    if (value === "Yes") {
      return true;
    }
    return false;
  };
  console.log(
    "This is All Data For Api Call -------------- 1144",
    lineintemData.Finalpage
  );

  const lineintemInfoContent = async (checkboxList, ConnectPrId) => {
    let lineinfo = await restApiCall.getPrlineItemContent(ConnectPrId);
    let ListofTypePurchases: TypeofPurchaseDetail[] = [];
    if (lineinfo.length === 0) {
      checkboxList.map((item: CheckboxItem, index: number) => {
        let newpurchaseItem: TypeofPurchaseDetail;
        newpurchaseItem = new TypeofPurchaseDetail(
          item.label,
          selectedItems["prOption"]?.key as string,
          selectRadioItems["prepaidcapitalRadio"]?.key,
          textbox.CIPNum
        );
        newpurchaseItem.costCenter = costCenter;
        newpurchaseItem.projectCode = selectedItems["projectCode"]?.text;
        ListofTypePurchases.push(newpurchaseItem);
      });
    } else {
      checkboxList.map((item: CheckboxItem, index: number) => {
        let onelineinfoList = lineinfo.filter(
          (newlineItem) => newlineItem.TypeOfOrder === item.label
        );
        let newpurchaseItem: TypeofPurchaseDetail;
        if (onelineinfoList.length === 0) {
          newpurchaseItem = new TypeofPurchaseDetail(
            item.label,
            selectedItems["prOption"]?.key as string,
            selectRadioItems["prepaidcapitalRadio"]?.key,
            textbox.CIPNum
          );
          newpurchaseItem.costCenter = costCenter;
          newpurchaseItem.projectCode = selectedItems["projectCode"]?.text;
        } else {
          newpurchaseItem = new TypeofPurchaseDetail(
            item.label,
            selectedItems["prOption"]?.key as string,
            selectRadioItems["prepaidcapitalRadio"]?.key,
            textbox.CIPNum
          );
          console.log(
            "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU XXXXXXXXXXXXXXXXXXXXXX",
            newpurchaseItem
          );
          // newpurchaseItem.typeofPurchaseName = item.label;
          // newpurchaseItem.typeOfPurchaseInfoList.clear();
          for (let kl = 0; kl < onelineinfoList.length; kl++) {
            console.log(
              "979 979 979 979 979 979 979 979 ",
              onelineinfoList[kl],
              onelineinfoList[kl].PKID
            );
            let onepuchase: TypeLineItem = {
              PKID: onelineinfoList[kl].PKID,
              CFID:
                onelineinfoList[kl].Plant === null
                  ? ""
                  : onelineinfoList[kl].Plant,
              projectCode:
                onelineinfoList[kl].ProjCode === null
                  ? ""
                  : onelineinfoList[kl].ProjCode,
              des:
                onelineinfoList[kl].ItemDescription === null
                  ? ""
                  : onelineinfoList[kl].ItemDescription,
              CostCenter:
                onelineinfoList[kl].Cost_Center === null
                  ? ""
                  : onelineinfoList[kl].Cost_Center,
              date:
                onelineinfoList[kl].DateRequired === null
                  ? new Date().toString()
                  : onelineinfoList[kl].DateRequired,
              glAccount:
                onelineinfoList[kl].GL_Account === null
                  ? ""
                  : onelineinfoList[kl].GL_Account.toString(),
              expensegl:
                onelineinfoList[kl].ExpenseGL === null
                  ? ""
                  : onelineinfoList[kl].ExpenseGL,
              qty:
                onelineinfoList[kl].Qty === null ? "" : onelineinfoList[kl].Qty,
              uOM:
                onelineinfoList[kl].UOM === null ? "" : onelineinfoList[kl].UOM,
              unitPrice:
                onelineinfoList[kl].Unit_Price === null
                  ? ""
                  : onelineinfoList[kl].Unit_Price,
              unitPricePer:
                onelineinfoList[kl].UnitPricePer === null
                  ? ""
                  : onelineinfoList[kl].UnitPricePer,
              totalamount:
                onelineinfoList[kl].Amount === null
                  ? 0
                  : onelineinfoList[kl].Amount,
              prepaid_to_date:
                onelineinfoList[kl].PrepaidFromDate === null ||
                onelineinfoList[kl].PrepaidFromDate == ""
                  ? new Date().toString()
                  : onelineinfoList[kl].PrepaidFromDate,
              prepaid_from_date:
                onelineinfoList[kl].PrepaidToDate === null ||
                onelineinfoList[kl].PrepaidToDate == ""
                  ? new Date().toString()
                  : onelineinfoList[kl].PrepaidToDate,
            };
            newpurchaseItem.typeOfPurchaseInfoList.push(onepuchase);
          }
          newpurchaseItem.costCenter = costCenter;
          newpurchaseItem.projectCode = selectedItems["projectCode"]?.text;
        }
        if (newpurchaseItem !== undefined) {
          ListofTypePurchases.push(newpurchaseItem);
        }
        console.log(
          "1107 this the the PrimaryInfoComponent here so ",
          ListofTypePurchases
        );
      });
    }
 
    let setlineItemData = {
      // projectCode:selectedItems["projectCode"]?.text,
      saveTable: lineintemData.saveTable === 0 ? 0 : 1,
      selectDepartment: selectedItems["selectDepartment"]?.text,
      prProjectRadio: selectRadioItems["prProjectRadio"]?.text,
      TypeofPurchaseDetailList: ListofTypePurchases,
      Finalpage: lineintemData.Finalpage,
    };
    console.log("setlineItemData");
    console.log(setlineItemData);
    console.log(
      ",setlineItemData.prProjectRadio--,setlineItemData.prProjectRadio",
      setlineItemData.prProjectRadio
    );
 
    dispatch(setlineitemValue(setlineItemData));
    // return ListofTypePurchases;
  };
  const changeCompanyName = (companyName: string) => {
    if (companyName.trim() === "OMNI") {
      return "Omnicell";
    } else {
      return companyName.trim();
    }
  };
  const SaveandContinue = async () => {
    //------------- start storing- ---------------

    let saveRadioGroupData: IradioSave[] = [
      {
        ehsRadio: {
          key: selectRadioItems.ehsRadio.key,

          text: selectRadioItems.ehsRadio.text,
        },
      },

      {
        prepaidcapitalRadio: {
          key: selectRadioItems.prepaidcapitalRadio.key,

          text: selectRadioItems.prepaidcapitalRadio.text,
        },
      },

      {
        constCenterRadio: {
          key: selectRadioItems.constCenterRadio.key,

          text: selectRadioItems.constCenterRadio.text,
        },
      },

      {
        prRadio: {
          key: selectRadioItems.prRadio.key,

          text: selectRadioItems.prRadio.text,
        },
      },

      {
        buyRadio: {
          key: selectRadioItems.buyRadio.key,

          text: selectRadioItems.buyRadio.text,
        },
      },

      {
        prProjectRadio: {
          key: selectRadioItems.prProjectRadio.key,

          text: selectRadioItems.prProjectRadio.text,
        },
      },
    ];

    let saveOptionGroupData: IoptionSave[] = [
      {
        prOption: {
          key: selectedItems.prOption.key,

          text: selectedItems.prOption.text,
        },
      },

      {
        companyCode: {
          key: selectedItems.companyCode.key,

          text: selectedItems.companyCode.text,
        },
      },

      {
        selectDepartment: {
          key: selectedItems.selectDepartment.key,

          text: selectedItems.selectDepartment.text,
        },
      },

      {
        projectCode: {
          key: selectedItems.projectCode.key,

          text: selectedItems.projectCode.text,
        },
      },
    ];

    let saveData: ISaveData = {
      radioGroup: saveRadioGroupData,

      optionGroup: saveOptionGroupData,
    };

    let checkboxList = [];
    checkboxList = [
      ...checkboxList,
      ...primaryinfoData.leftCheckbox.filter(
        (checkItem: CheckboxItem) => checkItem.isChecked
      ),
    ];
    checkboxList = [
      ...checkboxList,
      ...primaryinfoData.rightCheckbox.filter(
        (checkItem: CheckboxItem) => checkItem.isChecked
      ),
    ];



    console.log("lineItemsaveTable");
    console.log(lineintemData);

    dispatch(setValue(saveData));

    console.log("1.SAVE PR ALL Values...........");
    // ---------end storing ---------------------
    let samplecheckbox = [];
    for (let i: number = 0; i < checkboxList.length; i++) {
      samplecheckbox.push(checkboxList[i].label);
    }

    let warningCheckData = {};
    if (selectRadioItems["constCenterRadio"].text == "Alternate Cost Center") {
      let warningmsg = {
        "Select Other Cost Center": selectedItems["SelectAltCostCenter"]?.key,
      };
      warningCheckData = { ...warningCheckData, ...warningmsg };
    }

    if (
      selectRadioItems["prepaidcapitalRadio"]?.text ==
      "Capital Equipment / Asset"
    ) {
      let warningmsg = {
        "CIP Number": textbox.CIPNum,
        UFID: textbox.UFID,
      };
      warningCheckData = { ...warningCheckData, ...warningmsg };
    }
    if (selectRadioItems["prProjectRadio"].text === "Yes") {
      let warningmsg = {
        "Select Department and Project Code":
          selectedItems["projectCode"]?.text,
      };
      warningCheckData = { ...warningCheckData, ...warningmsg };
    }

    warningCheckData = {
      ...warningCheckData,
      "Type of Purchase": samplecheckbox[0],
      //cip number, ufid,project code ,Select Other Cost Center,Upload Important Documents:,document type
    };
    console.log("warningCheckData", warningCheckData);

    let pkid: string | number = Math.floor(Math.random() * 100000000);
    let conecctPkid: string | number = Math.floor(Math.random() * 100000000);
    conecctPkid = "00" + conecctPkid;
    let fileInfo = [];

    WarningMessage.accept(warningCheckData).then(async (warningRes) => {
      if (warningRes != "") {
        setwarningContent(warningRes);
        setshowDialog(true);
      } else if (warningRes === "") {
        let Type_Of_Order: string = samplecheckbox.join();

        let saveprimayData = [
          {
            PKID: pkid,
            ConnectPRID: conecctPkid,
            Type_Of_Buy: selectRadioItems.buyRadio.text,
            PrepaidOrCapitalEquipment:
              selectRadioItems.prepaidcapitalRadio.text,
            EHS: changeStrToBool(selectRadioItems.ehsRadio.text),
            Title:
              "Requested By " +
              GlobalStore.getmainName() +
              " On " +
              new Date() +
              " on behalf of " +
              GlobalStore.getName(),
            RequestFor: GlobalStore.getEmail(),
            Type_Of_Order: Type_Of_Order,
            Order_Amount: null,
            CIP_Number: textbox.CIPNum,
            UFID: textbox.UFID,
            Supplier_Account_Number: null,
            Supplier_Name: null,
            Supplier_Address: null,
            Supplier_City: null,
            Supplier_State: null,
            Supplier_Zip: null,
            Supplier_Country: null,
            Manager: null,
            Manager1: null,
            Manager2: null,
            Manager3: null,
            GL_Account: null,
            Status: "Draft",
            TaskCreatedFor: null,
            ApprovalInstance: null,
            Comments: null,
            Cost_Center: +costCenter,
            Location: null,
            IsDeleted: null,
            Special_Instructions: null,
            Shipping_Name: null,
            Shipping_Street: null,
            Shipping_Postal_Code: null,
            Shipping_Location: null,
            Shipping_Region: null,
            Shipping_Country: null,
            Shipping_ContactPhone: null,
            OldReqId: null,
            SAPPRId: null,
            LastWorkflowRun: null,
            CurrentApprovalStep: null,
            ManagerLevel: null,
            FinalApprovalDate: null,
            IsOtherCC: null,
            IsCFOApproved: null,
            CFO: null,
            AllApprovers: null,
            CreateDate: null,
            LastStatus: null,
            AllManagers: null,
            JLReminderCount: 0,
            FIReminderCount: 0,
            AesyntPRType: selectedItems.prOption.key,
            PONumber: null,
            IsCompleted: null,
            Company: changeCompanyName(
              GlobalStore.getTitledata().LegacyCompany
            ),

            ProjectNumber: null,
            ActCostCenter: +selectedItems.SelectAltCostCenter.key,
            CompanyCode: selectedItems.companyCode.text,
            FromCurrency: GlobalStore.getTitledata().currencyKey,
            ToCurrency: GlobalStore.getTitledata().currencyKey,
            RequesterCurrency: GlobalStore.getTitledata().currencyKey,
            ExchangeRate: 0.0,
            ExchangeRateV: null,
            ExchangeRateDate: null,
            ConvertedDollerAmount: null,
            CountryKey: GlobalStore.getTitledata().countryKey,
            HRADCompanyCode: selectedItems.companyCode.text,
            QuickbookPO: null,
            CCDescription: null,
            IsProjectPR: changeStrToBool(selectRadioItems.prProjectRadio.text),
            ProjectDepartment: selectedItems.selectDepartment.text,
            ProjectCode: selectedItems.projectCode.text,
            Created: new Date(),
            CreatedBy: GlobalStore.getmainEmail(),
            Modified: null,
            ModifiedBy: null,
            PRNumber: null,
            DWCreateDate: null,
            PRId: null,
            OldAllApprovers: null,
            OldAllManagers: null,
            OldCFO: null,
            OldCreatedBy: GlobalStore.getmainEmail(),
            OldManager: null,
            OldManager1: null,
            OldManager2: null,
            OldManager3: null,
            OldModifiedBy: null,
            OldRequestFor: GlobalStore.getEmail(),
            OldTaskCreatedFor: null,
          },
        ];

        console.log(
          "1344 1344 1344 ",
          saveprimayData,
          lineintemData.Finalpage,
          GlobalStore.getPrId(),
          lineintemData.Finalpage === `edit${GlobalStore.getPrId()}`
        );

        if (lineintemData.Finalpage === `edit${GlobalStore.getPrId()}`) {
          console.log(
            "This is PrimaryInfoComponent tsx file ---------",
            GlobalStore.getPrId()
          );
          saveprimayData[0].PKID = GlobalStore.getPrId();
          saveprimayData[0].ConnectPRID = GlobalStore.getPrId();
          saveprimayData[0].Created = null;
          saveprimayData[0].Modified = new Date();
          saveprimayData[0].ModifiedBy = GlobalStore.getmainEmail();
          saveprimayData[0].PRId = GlobalStore.getPrId();
          saveprimayData[0].ActCostCenter =
            selectCostCenterOption[0].key === "department"
              ? 0
              : +selectedItems.SelectAltCostCenter.key;
          // saveprimayData[0].ActCostCenter=selectCostCenterOption.key==="department"?:
          // let fileValue = await restApiCall.getDocTypeurl(
          //   GlobalStore.getconnectPRID()
          // );

          restApiCall.getDocTypeurl(GlobalStore.getPrId()).then((fileValue) => {
            console.log(
              "This is The File Value DocType here ",
              fileValue,
              primaryinfoData.fileData
            );
            restApiCall.insertVendorDetails(saveprimayData).then(async (_) => {
              let extraFileData = [];
              if (
                primaryinfoData.fileData.length !== 0 &&
                fileValue.length == 0
              ) {
                extraFileData = [...primaryinfoData.fileData];
              }
              if (
                primaryinfoData.fileData.length !== 0 &&
                fileValue.length !== 0
              ) {
                if (primaryinfoData.fileData.length > fileValue.length) {
                  extraFileData = primaryinfoData.fileData.filter(
                    (itemData) =>
                      !fileValue.some((obj) => obj.PKID === itemData.key)
                  );
                }
              }
              console.log(
                "Extra Data ------------ CCCCCCCCCCCCCCCc ",
                extraFileData,
                extraFileData[0]
              );
              await lineintemInfoContent(checkboxList, GlobalStore.getPrId());
              if (extraFileData.length !== 0) {
                for (let l = 0; l < extraFileData.length; l++) {
                  let fileDatainfo = {
                    PKID: GlobalStore.getPrId(),
                    ConnectPRID: GlobalStore.getPrId(),
                    Doc_Type: extraFileData[l].docType,
                    Filename: extraFileData[l].fileName,
                    Content: extraFileData[l].content,
                    Modified_By: GlobalStore.getmainName(),
                    Modified_Date: extraFileData[l].fileModifiedTime,
                  };
                  fileInfo.push(fileDatainfo);
                }
              }

              if (fileInfo.length !== 0) {
                restApiCall
                  .insertPrimaryInfoData(fileInfo, false)
                  .then((value) => {
                    console.log(value);
                    dispatch(fetchSearchContent("MyOrder"));
                    console.log("Data Save Here ------------");
                    buttonContxtSave();
                  });
              } else {
                dispatch(fetchSearchContent("MyOrder"));
                buttonContxtSave();
              }
              // }
            });
          });
        } else if (lineintemData.Finalpage === "prsubmit") {
          restApiCall
            .insertPrimaryInfoData(saveprimayData, true)
            .then(async (ConnectPRIDvalue) => {
              let ConnectPRIDvaluestr: String = ConnectPRIDvalue.toString();
              let totalLoop = 10 - ConnectPRIDvaluestr.length;

              for (let k = 0; k < totalLoop; k++) {
                console.log("This is The Dta Fun --7", ConnectPRIDvaluestr);
                ConnectPRIDvaluestr = "0" + ConnectPRIDvaluestr;
              }
              // Functionality.findConnectPrId(ConnectPRIDvalue);
              dispatch(savePkid(ConnectPRIDvaluestr));

              // let ConnectPRID: string =value;
              GlobalStore.storePrId(ConnectPRIDvaluestr);
              await lineintemInfoContent(checkboxList, ConnectPRIDvaluestr);
              if (primaryinfoData.fileData.length !== 0) {
                for (
                  let i: number = 0;
                  i < primaryinfoData.fileData.length;
                  i++
                ) {
                  let fileDatainfo = {
                    PKID: ConnectPRIDvaluestr,
                    ConnectPRID: ConnectPRIDvaluestr,
                    Doc_Type: primaryinfoData.fileData[i].docType,
                    Filename: primaryinfoData.fileData[i].fileName,
                    Content: primaryinfoData.fileData[i].content,
                    Modified_By: GlobalStore.getmainName(),
                    Modified_Date: primaryinfoData.fileData[i].fileModifiedTime,
                  };

                  fileInfo.push(fileDatainfo);
                }

                restApiCall
                  .insertPrimaryInfoData(fileInfo, false)
                  .then((value) => {
                    console.log(value);
                    dispatch(fetchSearchContent("MyOrder"));
                    console.log("Data Save Here ------------");
                    buttonContxtSave();
                  });
              }
            });
        } else if (lineintemData.Finalpage === `view${GlobalStore.getPrId()}`) {
          await lineintemInfoContent(checkboxList, GlobalStore.getPrId());

          buttonContxtSave();
        }
        // buttonContxtSave();
      }
    });
  };
  //select checkBox.............
  // const []=useState({

  // })
  const changeChakeBox = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    checked?: boolean | undefined
  ) => {
    const id = (ev?.target as HTMLInputElement).id;
    console.log("This is The Id Here --------------", id);
    let newTablename: ITableBuildProps = {
      name: id,
    };

    dispatch(changeCheckbox(id));
    settypeofPurchases(id);
    setTableCreate(newTablename);
  };

  const RightchangeCheckBox = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    checked?: boolean | undefined
  ) => {
    const id = (ev?.target as HTMLInputElement).id;
    let newTablename: ITableBuildProps = {
      name: id,
    };

    dispatch(rightchangeCheckbox(id));
    settypeofPurchases(id);
    setTableCreate(newTablename);
  };

  //handle file change ....

  //file upload modal open
  const [fileUploadModal, setfileUploadModal] = useState<boolean>(false);
  const showfileUploadModal = () => {
    setfileUploadModal(!fileUploadModal);
  };
  const handleFileChange = () => {
    showfileUploadModal();
    // const inputElement = inputRef.current;
    // if (inputElement) {
    //   inputElement.click();
    // }
  };

  const col1Style: IStackStyles = {
    root: {
      padding: "10px",
      textAlign: "right",
      width: "30%",
    },
  };
  const hoverStyle: IStackStyles = {
    root: {
      textAlign: "left",
      marginBottom: "-10px",
      marginRight: "3px",
      marginLeft: "2px",
      paddingBottom: "-10px",
    },
  };
  const col2Style: IStackStyles = {
    root: {
      padding: "0px",
      textAlign: "left",
      width: "70%",
    },
  };

  //Onclick for ProjectCodeModal
  const linkClickEvent = () => {
    // showModal();
    showProjectCodeModal();
  };

  //Onclick for ProjectCodeModal
  const linkGLClickEvent = () => {
    showopenGLAccount();
  };
  //Onclick for View All Cost Center Modal
  const linkCostCenterClickEvent = () => {
    showopenCostCenter();
  };
  console.log(
    "Here This is The Data Here ---- 1514",
    lineintemData.Finalpage,
    showDialog,
    isViewMode,
    !(lineintemData.Finalpage === `edit${GlobalStore.getPrId()}`)
  );
  return (
    <>
      {isLoadingComp ? <LoadingBox /> : null}
      {showDialog && lineintemData.Finalpage === "prsubmit" ? (
        // !isViewMode &&
        // !(lineintemData.Finalpage === `edit${GlobalStore.getPrId()}`
        // )
        <ModalComponent
          isModalOpen={showDialog}
          showModal={showAlertDialog}
          backgroundcolor="#750800"
          title="Purchase Request Error"
          content={warningContent}
        />
      ) : null}

      <Stack tokens={sectionStackTokens}>
        {/* Button */}
        <Stack>
          <Stack.Item align="end">
            <DefaultButton
              style={{
                background: DefaultPalette.green,
                color: DefaultPalette.white,
                borderRadius: 5,
                height: "40px",
              }}
              onClick={() => SaveandContinue()}
            >
              <Stack horizontal>
                <span style={{ marginRight: 10, marginTop: 2 }}>
                  <Icon iconName="Save" />
                </span>
                <span>Save & Continue</span>
              </Stack>
            </DefaultButton>
          </Stack.Item>
        </Stack>
        {/* Select Option */}

        <Stack tokens={sectionStackTokens}>
          {/* Pr Drop down option  */}
          {/* ----------------------------------------- */}
          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item
                styles={col1Style}
                // style={{ border: "1px solid black" }}
              >
                <div>What type of PR want to create?: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <Dropdown
                  placeholder="Select an option"
                  id="prOption"
                  disabled={isViewMode}
                  onChange={changeDropdownOption}
                  options={PrOption}
                  selectedKey={selectedItems["prOption"]?.key}
                  style={{ width: "200px" }}
                  styles={dropdownStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Are you submitting PR for yourself?:</div>
              </Stack.Item>
              <Stack.Item styles={hoverStyle}>
                <TooltipShow
                  context={
                    <p>
                      {" "}
                      Select "No" if you are submitting this PR <br /> on behalf
                      of someone else{" "}
                    </p>
                  }
                />
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="prRadio"
                  disabled={isViewMode}
                  options={prOption}
                  onChange={radioOnChange}
                  required={true}
                  selectedKey={selectRadioItems["prRadio"]?.key}
                  styles={choiceGroupStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>

          {/* ----------------------------------- */}

          {isPRsubmit ? (
            <>
              <Stack.Item grow={12}>
                <Stack horizontal horizontalAlign="baseline">
                  <Stack.Item styles={col1Style}>
                    <div>Requesting for: </div>
                  </Stack.Item>
                  <Stack.Item styles={col2Style}>
                    <div style={{ width: 250 }}>
                      <PeoplePickerComponent
                        companyCodeOptionSet={companyCodeOptionSet}
                        defaultValue={people}
                        isViewMode={isViewMode}
                      />
                      {/* <PeopleComponent context={context} /> */}
                    </div>
                  </Stack.Item>
                </Stack>
              </Stack.Item>
            </>
          ) : null}

          {/* //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy */}
          {selectedItems.prOption.text === "SAP(Omnicell)" ? (
            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item styles={col1Style}>
                  <div>Company Code: </div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <Dropdown
                    placeholder="Select an option"
                    id="companyCode"
                    disabled={isViewMode}
                    onChange={changeDropdownOption}
                    selectedKey={selectedItems["companyCode"]?.key}
                    defaultSelectedKey={selectedItems["companyCode"]?.key}
                    style={{ width: "200px" }}
                    options={companyCodeOption}
                    styles={dropdownStyles}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>
          ) : null}
          {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Are you submitting for the requestors cost center?: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <ChoiceGroup
                    name="constCenterRadio"
                    disabled={isViewMode}
                    options={selectCostCenterOption}
                    onChange={radioOnChange}
                    selectedKey={selectRadioItems["constCenterRadio"]?.key}
                    required={true}
                    styles={choiceGroupStyles}
                  />
                  <Link
                    style={{ color: "blue", marginLeft: 15, marginTop: 10 }}
                    disabled={isViewMode}
                    onClick={() => linkCostCenterClickEvent()}
                  >
                    View All Cost Center Details
                  </Link>
                  {openCostCenter ? (
                    <>
                      <CostCenterComponent
                        isCostCenterOpen={openCostCenter}
                        showCostCenter={showopenCostCenter}
                        companyCode={selectedItems.companyCode.text}
                        // CostCenterDatapick={CostCenterDatapick}
                        // GlPRType={""}
                      />
                    </>
                  ) : null}
                </Stack>
              </Stack.Item>
            </Stack>
          </Stack.Item>

          {/* ------------------------------------------------------ */}
          {isAlternetCostcenterSelect ? (
            <>
              <Stack.Item grow={12}>
                <Stack horizontal horizontalAlign="baseline">
                  <Stack.Item styles={col1Style}>
                    <div>Select Other Cost Center: </div>
                  </Stack.Item>
                  <Stack.Item styles={col2Style}>
                    <Dropdown
                      placeholder="---Select Other Cost Center---"
                      id="SelectAltCostCenter"
                      disabled={isViewMode}
                      onChange={changeDropdownOption}
                      style={{ width: "200px" }}
                      selectedKey={
                        selectedItems.SelectAltCostCenter == undefined &&
                        selectedItems.SelectAltCostCenter.key == undefined
                          ? ""
                          : selectedItems.SelectAltCostCenter.key
                      }
                      options={costCenterOption}
                      styles={dropdownStyles}
                    />
                  </Stack.Item>
                </Stack>
              </Stack.Item>
            </>
          ) : null}

          {/* jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Is this PR related to a Project?: </div>
              </Stack.Item>
              <Stack.Item styles={hoverStyle}>
                <TooltipShow
                  context={
                    <p>
                      Some departments <br />
                      (e.g. Engineering and Marketing) track <br />
                      project-related expenses.
                    </p>
                  }
                />
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="prProjectRadio"
                  disabled={isViewMode}
                  options={prProjectOption}
                  onChange={radioOnChange}
                  selectedKey={selectRadioItems["prProjectRadio"]?.key}
                  required={true}
                  styles={choiceGroupStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}

          {isPrProject ? (
            <>
              <Stack.Item grow={12}>
                <Stack horizontal horizontalAlign="baseline">
                  <Stack.Item styles={col1Style}>
                    <div>Select Department and Project Code?: </div>
                  </Stack.Item>
                  <Stack.Item styles={col2Style}>
                    <Stack
                      horizontal
                      tokens={{ childrenGap: 5 }}
                      style={{ marginTop: 15 }}
                    >
                      <Dropdown
                        placeholder="Select an option"
                        id="selectDepartment"
                        disabled={isViewMode}
                        onChange={changeDropdownOption}
                        style={{ width: "150px" }}
                        selectedKey={selectedItems["selectDepartment"]?.key}
                        options={selectDepartmentOption}
                        styles={dropdownStyles}
                      />
                      <Dropdown
                        placeholder="Select an option"
                        id="projectCode"
                        disabled={isViewMode}
                        onChange={changeDropdownOption}
                        style={{ width: "200px" }}
                        selectedKey={selectedItems["projectCode"]?.key}
                        options={projectCodeOption}
                        styles={dropdownStyles}
                      />
                      <Link
                        style={{ color: "blue", marginLeft: 15 }}
                        onClick={linkClickEvent}
                      >
                        Need help?
                      </Link>
                      {openProjectCode ? (
                        <>
                          <ProjectCodeComponent
                            isProjectCodeOpen={openProjectCode}
                            showProjectCode={showProjectCodeModal}
                            ProjectCode_title={
                              selectedItems.selectDepartment.text
                            }
                            // ProCodeItemDatapick={ProCodeItemDatapick}
                            checkProCode={false}
                          />
                        </>
                      ) : null}
                    </Stack>
                  </Stack.Item>
                </Stack>
              </Stack.Item>
            </>
          ) : null}

          {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Type of Buy: </div>
              </Stack.Item>
              <Stack.Item styles={hoverStyle}>
                <TooltipShow
                  context={
                    <p>
                      <b>
                        <u>Expense Buy: </u>
                      </b>{" "}
                      One time Purchase/ One PO-One invoice to be processed
                      against it, might be goods or one-time services expenses.{" "}
                    </p>
                  }
                />
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="buyRadio"
                  disabled={isViewMode}
                  options={buyOption}
                  onChange={radioOnChange}
                  required={true}
                  selectedKey={selectRadioItems["buyRadio"]?.key}
                  // selectedtext={selectRadioItems.buyRadio.text}
                  styles={choiceGroupStyles}
                />
              </Stack.Item>
              <Stack.Item styles={hoverStyle}>
                <TooltipShow
                  context={
                    <p>
                      <b>
                        <u> Blanket PR: </u>
                      </b>{" "}
                      Multiple payments to be processed, This should be used
                      when payment of the PO total will be split into 2 or De
                      more invoices and/or budgeted recurrent orders for a
                      preferred vendor for a period of time.
                    </p>
                  }
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          {/* -------------------------------------------------------------------------- */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Is this Prepaid or Capital Equipment buy?: </div>
              </Stack.Item>
              <Stack.Item styles={hoverStyle}>
                {/* style={{ width: "150px" }} */}
                <TooltipShow
                  context={
                    <p>
                      <b>
                        <u> Expense: </u>
                      </b>{" "}
                      Standard Expense PR <br />
                      <br />
                      <b>
                        <u>Prepaid: </u>
                      </b>{" "}
                      Payment in advance for goods or services over $12,000 USD
                      and services provided beyond one year. This type of PR
                      will always use GL 141010 or 141020 or 141030. <br />
                      <br />
                      <b>
                        <u>Capital Equipment / Asset: </u>
                      </b>{" "}
                      Anything tangible or intangible that is purchased and
                      owned which adds economic value is considered an asset. An
                      asset represents value or ownership that can be converted
                      into cash.{" "}
                    </p>
                  }
                />
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="prepaidcapitalRadio"
                  disabled={isViewMode}
                  options={
                    isBlanketPrSelect
                      ? prepaidcapitalOption
                      : newprepaidcapitalOption
                  }
                  onChange={radioOnChange}
                  selectedKey={selectRadioItems["prepaidcapitalRadio"]?.key}
                  required={true}
                  styles={choiceGroupStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          {isPrepaidCapitalbuy &&
          selectedItems.prOption.text === "SAP(Omnicell)" ? (
            <>
              <Stack.Item grow={12}>
                <Stack horizontal horizontalAlign="baseline">
                  <Stack.Item styles={col1Style}>
                    <div>CIP Number: </div>
                  </Stack.Item>
                  <Stack.Item styles={col2Style}>
                    <Stack horizontal tokens={{ childrenGap: 10 }}>
                      <div style={{ width: 350 }}>
                        <TextField
                          name="CIPNum"
                          value={textbox.CIPNum}
                          onChange={(e, newValue) =>
                            newhandleInputChange(e, newValue as string)
                          }
                          placeholder="Provide a valid CIP number"
                        />
                      </div>
                      <Link onClick={() => showCipNumberModal()}>
                        View All CIP Numbers
                      </Link>
                      {openCipNumberModal ? (
                        <>
                          <CipModal
                            isModalOpen={openCipNumberModal}
                            showModal={showCipNumberModal}
                            companyCode={selectedItems.companyCode.text}
                          />
                        </>
                      ) : null}
                    </Stack>
                  </Stack.Item>
                </Stack>
              </Stack.Item>

              <Stack.Item grow={12}>
                <Stack horizontal horizontalAlign="baseline">
                  <Stack.Item styles={col1Style}>
                    <div>UFID: </div>
                  </Stack.Item>
                  <Stack.Item styles={col2Style}>
                    <div style={{ width: 350 }}>
                      <TextField
                        name="UFID"
                        value={textbox.UFID}
                        onChange={(e, newValue) =>
                          newhandleInputChange(e, newValue as string)
                        }
                        placeholder="Provide UFID number"
                      />
                    </div>
                  </Stack.Item>
                </Stack>
              </Stack.Item>
            </>
          ) : null}

          {/* ---------------------------------------------------------------------  */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Type of Purchase: </div>
              </Stack.Item>
              <Stack.Item styles={hoverStyle}>
                <TooltipShow context={"Please select order type for this PR"} />
              </Stack.Item>

              <Stack.Item style={{ marginTop: 5 }} styles={col2Style}>
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <Stack.Item align="start">
                    {primaryinfoData.leftCheckbox.map(
                      (checkBoxItem: CheckboxItem) => {
                        return (
                          <Tippy
                            content={
                              <TableTooltipPurchases
                                store={checkBoxItem.store}
                              />
                            }
                            onShow={() =>
                              hoverCallfunction(
                                selectedItems.prOption.key as string,
                                selectRadioItems.prepaidcapitalRadio.text,
                                checkBoxItem.label
                              )
                            }
                          >
                            <div className={styles.checkboxgroup}>
                              <Checkbox
                                label={checkBoxItem.label}
                                id={checkBoxItem.id}
                                checked={checkBoxItem.isChecked}
                                disabled={
                                  isViewMode
                                    ? isViewMode
                                    : checkBoxItem.isDisable
                                }
                                onChange={changeChakeBox}
                              />
                            </div>
                          </Tippy>
                        );
                      }
                    )}
                  </Stack.Item>

                  <Stack.Item align="start">
                    {primaryinfoData.rightCheckbox.map(
                      (checkBoxItem: CheckboxItem) => {
                        return (
                          <div className={styles.checkboxgroup}>
                            <Checkbox
                              label={checkBoxItem.label}
                              id={checkBoxItem.id}
                              checked={checkBoxItem.isChecked}
                              disabled={
                                isViewMode ? isViewMode : checkBoxItem.isDisable
                              }
                              onChange={RightchangeCheckBox}
                            />
                          </div>
                        );
                      }
                    )}
                  </Stack.Item>

                  {selectRadioItems.prepaidcapitalRadio.text !==
                    "Capital Equipment / Asset" &&
                  selectRadioItems.prepaidcapitalRadio.text !== "Lease" ? (
                    <Link
                      style={{ color: "blue" }}
                      disabled={isViewMode}
                      onClick={linkGLClickEvent}
                    >
                      View All GL Accounts
                    </Link>
                  ) : null}
                  {openGLAccount ? (
                    <>
                      <GLAccountComponent
                        isGLAccountOpen={openGLAccount}
                        // showGLAccount={setopenGLAccount}
                        showGLAccount={showopenGLAccount}
                        GlPRType={selectedItems.prOption.key}
                        GLAccountType={
                          selectRadioItems.prepaidcapitalRadio.text
                        }
                      />
                    </>
                  ) : null}
                </Stack>
              </Stack.Item>
            </Stack>
          </Stack.Item>

          {/* kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div> Is this EHS relevant?: </div>
              </Stack.Item>
              <Stack.Item styles={hoverStyle}>
                <TooltipShow
                  context={
                    "Select " +
                    '"Yes"' +
                    " if the purchase or use of the material or chemical could cause harm to human health and/or the environment."
                  }
                />
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="ehsRadio"
                  options={ehsOption}
                  disabled={isViewMode}
                  onChange={radioOnChange}
                  required={true}
                  selectedKey={
                    // primaryinfoData.radioGroup["ehsRadio"].key
                    selectRadioItems["ehsRadio"]?.key
                  }
                  styles={choiceGroupStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>

          {/* kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Upload Important Documents: </div>
              </Stack.Item>
              <Stack.Item styles={hoverStyle}>
                <TooltipShow context={"Please upload files"} />
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                {/* <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  onChange={fileuploadhandleClick}
                /> */}
                <IconButton
                  iconProps={{ iconName: "Upload" }}
                  title="Upload"
                  disabled={isViewMode}
                  ariaLabel="Upload"
                  onClick={handleFileChange}
                />
                {fileUploadModal ? (
                  <FilePickModal
                    isModalOpen={fileUploadModal}
                    showModal={showfileUploadModal}
                  />
                ) : null}
              </Stack.Item>
            </Stack>
          </Stack.Item>
          {/* lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll */}
        </Stack>

        <TableComponent isViewMode={isViewMode} />
      </Stack>
      {isModalOpen ? (
        <ModalComponent isModalOpen={isModalOpen} showModal={showModal} />
      ) : null}
    </>
  );
};

export default PrimaryInfoComponent;

function settypeofPurchases(id: string) {
  throw new Error("Function not implemented.");
}
