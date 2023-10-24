import * as React from "react";
import { useState, useEffect, useMemo } from "react";
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
import { PeoplePickerComponent } from "./PeoplePickerComponent";
import { GLAccountComponent } from "./TableGLAccountComponent";
import { RootState } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeDisable,
  ChangeDisableToEdit,
  CheckboxItem,
  changeCheckbox,
  fileInformation,
  insertContent,
  rightchangeCheckbox,
  saveFileDoc,
  setValue,
  toolTipUpdate,
} from "../../../../features/reducers/primaryinfoSlice";
import { setlineitemValue } from "../../../../features/reducers/lineitemSlice";
import { TypeofPurchaseDetail } from "../../Model/TypePurchases/type_purchases_detail";
import { restApiCall } from "../../Api/ApiCall";
import { savePkid } from "../../../../features/reducers/vendorandshippingSlice";
import { WarningMessage } from "../../Utils/WarningBox";
import { GlobalStore } from "../../../../app/globalStore";
import TooltipShow from "./TooltipShow";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Tippy from "@tippyjs/react";
import { TooltipPurchases } from "../../Utils/tooltipTypeofpurchases";
import TableTooltipPurchases from "./TableTooltipPurchases";
import { ModalModelessExample } from "./Modalwarning";
import { IPrProjectCode } from "../../Model/IPrProjectCode";

interface IFirstProps {
  buttonContxtSave: () => void;
  setTableCreate: (value: ITableBuildProps) => void;
  setTile: (value) => void;
  // context:WebPartContext;
}
let costCenter: string = "";
const PrimaryInfoComponent: React.FunctionComponent<IFirstProps> = (props) => {
  const { buttonContxtSave, setTableCreate, setTile } = props;
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

  useEffect(() => {
    //  ConnectPr.getInstance().GetPRCompanyCode().then((PrCompanyValue)=>{

    //   let listData=[]
    //     for(let i=0;i<PrCompanyValue.length;i++){
    //       if(PrCompanyValue[i].IsValidSAPCompanyCode){
    //       let newObj={
    //         key:PrCompanyValue[i],text:PrCompanyValue[i].MappedCompanyCode
    //       }
    //       listData.push(newObj)
    //     }
    //     setCompanyCodeOption(listData)

    //   }})
    // setshowDialog(true);

    restApiCall.getDocTypeurl(GlobalStore.getPrId()).then((value) => {
      if (value !== 0) {
        for (let i: number = 0; i < value.length; i++) {
          if (
            !(
              value[i].Content === primaryinfoData.fileData[i].content &&
              value[i].Modified_Date ===
                primaryinfoData.fileData[i].fileModifiedTime
            )
          ) {
            let getfileData: fileInformation = {
              key: value[i].ConnectPRID,
              fileName: value[i].Filename,
              fileType: "file",
              modifiedBy: value[i].Modified_By,
              fileModifiedTime: value[i].Modified_Date,
              docType: value[i].Doc_Type,
              content: value[i].Content,
            };
            console.log(
              " get Doc type Data ---------------------- >> ",
              getfileData
            );

            dispatch(saveFileDoc(getfileData));
          }
        }
      }
    });

    restApiCall.getCompanycode().then((value) => {
      console.log("Company Code value", value);
      let companyCodeList = [];
      for (let i: number = 0; i < value.data.length; i++) {
        let newcompany = {
          Key: value.data[i].MappedCompanyCode.toLowerCase(),
          text: value.data[i].MappedCompanyCode,
        };
        companyCodeList.push(newcompany);
      }
      setCompanyCodeOption(companyCodeList);
    });
  }, []);

  

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

  // const companyCodeOption: IDropdownOption[] = [
  //   { key: "1", text: "OM01" },
  //   { key: "2", text: "OM06" },
  //   { key: "3", text: "OM31" },
  //   { key: "4", text: "OM32" },
  // ];

  //Link for Project Code-------------------------------------

  const [ProCodeItem, setProCodeItem] = useState<IPrProjectCode>(
    new IPrProjectCode(" ", " ")
  );
  // const ProCodeItemDatapick =(ProCode: IPrProjectCode) => {};
  // console.log("ProCode.project_code---ProCode.project_code",ProCode.project_code);
  // setProCodeItem(ProCode);
  // };
  // ................................................................

  const selectCostCenterOption: IChoiceGroupOption[] = [
    { key: "1", text: "Department" },
    { key: "2", text: "Alternate Cost Center" },
  ];
  const selectDepartmentOption: IDropdownOption[] = [
    { key: "engineering", text: "Engineering" },
    { key: "marketing", text: "Marketing" },
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

  //peoplepicker
  const companyCodeOptionSet = (newItem) => {
    if (newItem.length !== 0) {
      console.log(newItem[0].companyCode);

      let itemTest = {
        key: newItem[0].EmployeeId,

        text: newItem[0].companyCode,
      };

      costCenter = newItem[0].costCenter;
      setCompanyCodeOption([itemTest]);
    }
  };

  const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number
  ): void => {
    const { id } = event.target as HTMLDivElement;
    console.log("------------------Sap===Sap", item);
    console.log(id);
    let newSelectedItem: IDropdownOption = { key: "", text: "" };
    // let warningmsg={
    //     "Click on Alternate Cost Center radio button and then select needed Cost Center.":

    //   }
    newSelectedItem = { key: item?.key as string, text: item?.text as string };
    // if (item.key==="SAP") {
    //   newSelectedItem = { key: item?.key as string, text: item?.text as string };
    // }
    // else{
    //   <ModalModelessExample/>
    //   newSelectedItem = { key: item?.key as string, text: item?.text as string };
    // }
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

  //company Code Using Redux

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const primaryinfoData = useSelector((state: RootState) => state.primaryinfo);
  const lineintemData = useSelector((state: RootState) => state.lineiteminfo);

  useEffect(() => {
    console.log(
      "selectedItems.selectDepartment.text----",
      selectedItems.selectDepartment.text
    );

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

    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk");

    console.log(selectedItems["companyCode"]?.key);

    console.log(selectRadioItems.buyRadio.key);
  }, []);
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
    for (let j: number = 0; j < primaryinfoData.rightCheckbox.length; j++) {
      // TooltipPurchases.expenseTooltipdata(selectedItems.prOption.text,primaryinfoData.rightCheckbox[i].label);
      // TooltipPurchases.prepaidTooltipdata(selectedItems.prOption.text,primaryinfoData.rightCheckbox[i].label);
    }
  }, [selectedItems.prOption]);

  const [warningContent, setwarningContent] = useState<string>(" ");

  useEffect(() => {
    WarningMessage.firstWarningCheck().then((value) => {
      console.log(
        "selectRadioItems.buyRadio.text:::--",
        selectRadioItems.buyRadio.text
      );

      let titledata = {
        name: value.name,
        countryKey: value.CountryKey,
        currencyKey: value.CurrencyKey,
        costCenter: value.CostCenter,
        TypeofbuyOption: selectRadioItems.buyRadio.text,
        IsPrepaidCapital: selectRadioItems.prepaidcapitalRadio.text,
      };
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
    () => {
      // Select Other Cost Center Options ----------------------------------
      // if(selectedItems.prOption.key==="SAP"){

      restApiCall
        .getCostCenterList(selectedItems.companyCode.text)
        .then((Prcostcenter) => {
          let listDataCostCenterSap = [];
          for (let i = 0; i < Prcostcenter.length; i++) {
            let newObjCostCenter = {
              key: Prcostcenter[i],
              text: Prcostcenter[i].Title + "(" + Prcostcenter[i].Details + ")",
            };
            listDataCostCenterSap.push(newObjCostCenter);
          }
          setCostCenterOption([...listDataCostCenterSap]);
        });
    },
    //  }
    [selectedItems.companyCode]
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
  }

  const changeStrToBool = (value: string) => {
    if (value === "Yes") {
      return true;
    }
    return false;
  };

  const SaveandContinue = () => {
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
    let ListofTypePurchases: TypeofPurchaseDetail[] = [];

    checkboxList.map((item: CheckboxItem, index: number) => {
      let newpurchaseItem: TypeofPurchaseDetail;

      if (lineintemData.TypeofPurchaseDetailList.length !== 0) {
        if (
          lineintemData.TypeofPurchaseDetailList[index].typeofPurchaseName ===
          item.label
        ) {
          newpurchaseItem = lineintemData.TypeofPurchaseDetailList[index];
        } else {
          newpurchaseItem = new TypeofPurchaseDetail(item.label);
        }
      } else {
        newpurchaseItem = new TypeofPurchaseDetail(item.label);
      }
      newpurchaseItem.costCenter = costCenter;
      newpurchaseItem.projectCode = selectedItems["projectCode"]?.text;
      ListofTypePurchases.push(newpurchaseItem);
    });

    console.log("lineItemsaveTable");
    console.log(lineintemData);
    let setlineItemData = {
      // projectCode:selectedItems["projectCode"]?.text,
      saveTable: lineintemData.saveTable === 0 ? 0 : 1,
      selectDepartment: selectedItems["selectDepartment"]?.text,
      prProjectRadio: selectRadioItems["prProjectRadio"]?.text,
      TypeofPurchaseDetailList: ListofTypePurchases,
      Finalpage: false,
    };
    console.log("setlineItemData");
    console.log(setlineItemData);
    console.log(
      ",setlineItemData.prProjectRadio--,setlineItemData.prProjectRadio",
      setlineItemData.prProjectRadio
    );

    dispatch(setlineitemValue(setlineItemData));

    dispatch(setValue(saveData));

    console.log("1.SAVE PR ALL Values...........");
    let samplecheckbox = [];
    for (let i: number = 0; i < checkboxList.length; i++) {
      samplecheckbox.push(checkboxList[i].label);
    }
    let warningCheckData = {};
    if (selectRadioItems["constCenterRadio"].text == "Alternate Cost Center") {
      let warningmsg = {
        "Select Other Cost Center": selectedItems["SelectAltCostCenter"]?.text,
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
    let pkid: number = Math.floor(Math.random() * 100000000);
    let fileInfo = [];

    WarningMessage.accept(warningCheckData).then((warningRes) => {
      if (warningRes != "") {
        setwarningContent(warningRes);
        setshowDialog(true);
      } else if (warningRes === "") {
        let Type_Of_Order: string = samplecheckbox.join();

        let saveprimayData = [
          {
            PKID: pkid,
            ConnectPRID: "0123456",
            Type_Of_Buy: selectRadioItems.buyRadio.text,
            PrepaidOrCapitalEquipment:
              selectRadioItems.prepaidcapitalRadio.text,
            EHS: changeStrToBool(selectRadioItems.ehsRadio.text),
            Title: null,
            RequestFor: GlobalStore.getName(),
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
            Status: null,
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
            Company: null,
            ProjectNumber: null,
            ActCostCenter: +costCenter,
            CompanyCode: selectedItems.companyCode.text,
            FromCurrency: null,
            ToCurrency: null,
            RequesterCurrency: null,
            ExchangeRate: null,
            ExchangeRateV: null,
            ExchangeRateDate: null,
            ConvertedDollerAmount: null,
            CountryKey: null,
            HRADCompanyCode: null,
            QuickbookPO: null,
            CCDescription: null,
            IsProjectPR: changeStrToBool(selectRadioItems.prProjectRadio.text),
            ProjectDepartment: selectedItems.selectDepartment.text,
            ProjectCode: selectedItems.projectCode.text,
            Created: null,
            CreatedBy: null,
            Modified: null,
            ModifiedBy: null,
            PRNumber: null,
            DWCreateDate: null,
            PRId: null,
            OldAllApprovers: null,
            OldAllManagers: null,
            OldCFO: null,
            OldCreatedBy: null,
            OldManager: null,
            OldManager1: null,
            OldManager2: null,
            OldManager3: null,
            OldModifiedBy: null,
            OldRequestFor: null,
            OldTaskCreatedFor: null,
          },
        ];
        restApiCall
          .insertPrimaryInfoData(saveprimayData, true)
          .then((value: number) => {
            dispatch(savePkid(value));

            let ConnectPRID: string = "000000" + value;
            GlobalStore.storePrId(ConnectPRID);
            if (primaryinfoData.fileData.length !== 0) {
              for (
                let i: number = 0;
                i < primaryinfoData.fileData.length;
                i++
              ) {
                console.log(
                  "primaryinfoData-primaryinfoData=primaryinfoData",
                  primaryinfoData.fileData[i],
                  ConnectPRID
                );

                let fileDatainfo = {
                  PKID: value,
                  ConnectPRID: ConnectPRID,
                  Doc_Type: primaryinfoData.fileData[i].docType,
                  Filename: primaryinfoData.fileData[i].fileName,
                  Content: primaryinfoData.fileData[i].content,
                  Modified_By: GlobalStore.getmainName(),
                  Modified_Date: primaryinfoData.fileData[i].fileModifiedTime,
                };
                console.log("DocData save.........  ", fileDatainfo);
                fileInfo.push(fileDatainfo);
              }
              let fileDatapayload = {
                Attachment: fileInfo,
              };
              restApiCall
                .insertPrimaryInfoData(fileInfo, false)
                .then((value) => {
                  console.log(value);
                  console.log("Data Save Here ------------");
                  buttonContxtSave();
                });
            }
          });
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

  // const fileuploadhandleClick = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const fileObj = event?.target.files && event?.target.files[0];
  //   if (!fileObj) {
  //     return;
  //   }
  //   event.target.value = "";
  //   console.log(fileObj.name);
  // };

  //
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

  return (
    <>
      {showDialog ? (
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
              onClick={SaveandContinue}
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
                    "Select" +
                    ' "No" ' +
                    "if you are submitting this PR on behalf of someone else"
                  }
                />
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="prRadio"
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
                    onChange={changeDropdownOption}
                    selectedKey={selectedItems["companyCode"]?.key}
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
                    options={selectCostCenterOption}
                    onChange={radioOnChange}
                    selectedKey={selectRadioItems["constCenterRadio"]?.key}
                    required={true}
                    styles={choiceGroupStyles}
                  />
                  <Link
                    style={{ color: "blue", marginLeft: 15, marginTop: 10 }}
                    onClick={() => console.log("Hii")}
                  >
                    View All Cost Center Details
                  </Link>
                  {openGLAccount ? (
                    <>
                      {/* <GLAccountComponent
                            isGLAccountOpen={openGLAccount}
                            // showGLAccount={setopenGLAccount}
                            showGLAccount={showopenGLAccount}
                            GLAccountType={selectRadioItems.prepaidcapitalRadio.text}
                            
                          /> */}
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
                      onChange={changeDropdownOption}
                      style={{ width: "200px" }}
                      selectedKey={selectedItems["SelectAltCostCenter"]?.key}
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
                    "Some departments\n" +
                    "(e.g. Engineering and Marketing) track\n " +
                    "project-related expenses."
                  }
                />
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="prProjectRadio"
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
                        onChange={changeDropdownOption}
                        style={{ width: "150px" }}
                        selectedKey={selectedItems["selectDepartment"]?.key}
                        options={selectDepartmentOption}
                        styles={dropdownStyles}
                      />
                      <Dropdown
                        placeholder="Select an option"
                        id="projectCode"
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
                    "Expense Buy:  " +
                    "One time Purchase/ One PO-One invoice to be processed against it, might be goods or one-time services expenses."
                  }
                />
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="buyRadio"
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
                    "Blanket PR:   Multiple payments to be processed, This should be used when payment of the PO total will be split into 2 or De more invoices and/or budgeted recurrent orders for a preferred vendor for a period of time."
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
                    "Expense:  Standard Expense PR\n" +
                    "Prepaid: Payment in advance for goods or services over $12,000  USD and services provided beyond one year. This type of PR will always use GL 141010 or 141020 or 141030.\n" +
                    "Capital Equipment / Asset:   Anything tangible or intangible that is purchased and owned which adds economic value is considered an asset. An asset represents value or ownership that can be converted into cash."
                  }
                />
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="prepaidcapitalRadio"
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
                  {/* <Stack.Item align="start">
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Consulting"
                        id="Consulting"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Engineering"
                        id="Engineering"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Field Services"
                        id="Field Services"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Manufacturing"
                        id="Manufacturing"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Office Supply and Equipment"
                        id="Office Supply and Equipment"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="GAAP"
                        id="GAAP"
                        onChange={changeChakeBox}
                      />
                    </div>
                  </Stack.Item> */}

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
                                disabled={checkBoxItem.isDisable}
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
                              disabled={checkBoxItem.isDisable}
                              onChange={RightchangeCheckBox}
                            />
                          </div>
                        );
                      }
                    )}
                  </Stack.Item>

                  {/* <Stack.Item align="start">
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Corporate"
                        id="Corporate"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Facilities or Lease"
                        id="Facilities or Lease"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Computer Equipment"
                        id="Computer Equipment"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Marketing"
                        id="Marketing"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Software"
                        id="Software"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Benefits"
                        id="Benefits"
                        onChange={changeChakeBox}
                      />
                    </div>
                  </Stack.Item> */}
                  {selectRadioItems.prepaidcapitalRadio.text !==
                    "Capital Equipment / Asset" &&
                  selectRadioItems.prepaidcapitalRadio.text !== "Lease" ? (
                    <Link style={{ color: "blue" }} onClick={linkGLClickEvent}>
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
                  onChange={radioOnChange}
                  required={true}
                  selectedKey={selectRadioItems["ehsRadio"]?.key}
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

        <TableComponent />
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
