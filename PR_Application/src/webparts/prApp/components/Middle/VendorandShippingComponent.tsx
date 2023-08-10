import * as React from "react";
import { IStackStyles, Stack } from "@fluentui/react/lib/Stack";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { DefaultPalette } from "@fluentui/react/lib/Styling";
import { Icon } from "@fluentui/react/lib/Icon";
import { ITextFieldStyles, TextField } from "@fluentui/react/lib/TextField";
import { useState, useEffect ,useMemo } from "react";
// import styles from "../Style/style.scss";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import { Link } from "@fluentui/react";
import { SupplierModal } from "./SupplierModal";
import { VendorDetails } from "../../Model/vendor_details";
import { ConnectPr } from "../../Api/api";
import { ShipAddressChecking } from "../../Utils/ShipAddressChecking";
import OtherShippingAddComponent from "./OtherShippingAddComponent";
import { IPROtherShippingLoc } from "./IPrOtherShippingLoc";
// import SupplierModal from "./SupplierModal";
interface ISecondprops {
  buttonContxtSave: () => void;
  buttonContxtBack: () => void;
}
const VendorandShippingComponent: React.FunctionComponent<ISecondprops> = (
  props
) => {
  const { buttonContxtSave, buttonContxtBack } = props;
  const [textvalue, settextvalue] = useState({
    suppliername: " ",
    justificationorder: " ",
    downpayment: " ",
  });

  const [selectshipAddress, setselectshipAddress] = useState<boolean>(false);

  const [openSupplierSearch, setopenSupplierSearch] = useState<boolean>(false);
  const showSupplierSearchModal = () => {
    setopenSupplierSearch(!openSupplierSearch);
  };


  //Other Shipping Location Modal Design Here ...........................
  const [openOtherShipping, setopenOtherShipping] = useState<boolean>(false);
  const showOtherShipping = () => {
    setopenOtherShipping(!openOtherShipping);
  };



  const [vendorItem, setvendorItem] = useState<VendorDetails>(
    new VendorDetails(0, " ", " ", " ", " ", " ", " ", " ", " ")
  );

  const venderItemDatapick = (vendor: VendorDetails) => {
    console.log(vendor);
    console.log(vendor.vendorNumber);
    setvendorItem(vendor);
  };

 const [shippingItem, setShippingItem] = useState<IPROtherShippingLoc>(
    new IPROtherShippingLoc(" "," ",0," ")
  );

  const ShippingDataPick =(otheradd:IPROtherShippingLoc)=>{
      console.log(otheradd);
      setShippingItem(otheradd);
      
      
  }

    //this is for all dropdown option....................
  const [selectedItemsvendor, setSelectedItemsvendor] = useState<{
    [key: string]: IDropdownOption;
  }>({
    VendorPlantMatch: { key: "", text: "" }
    
  });

  const [newshipAddress, setnewshipAddress] = useState<IDropdownOption>({
    key: " ",
    text: " ",
  });

  const changeshipDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption | undefined,
    index?: number | undefined
  ) => {
    setnewshipAddress(option as IDropdownOption);
  };

  const [shipAddress,setshipAddress]=useState([]);
 const [countryOptions,setCountryOptions]=useState([]);
 const [regionOptions,setRegionOptions]=useState([]);

  useEffect(()=>{

  //Ship Address Company Code Compare------------------------------------------------------
    
  let listDataSupplierAdd=[]
  ShipAddressChecking.shipToAddressCheck("OM01").then((shipAddressValue)=>{

    for(let i:number=0;i<shipAddressValue.length;i++){
          let newObjSupplierAdd={
          key: shipAddressValue[i].toLowerCase(),
          text: shipAddressValue[i]
          }
          listDataSupplierAdd.push(newObjSupplierAdd)
    }
    setshipAddress([...listDataSupplierAdd])

  })

  //Shipping country ----------------------------------------------

   ConnectPr.getInstance().GetPRCountry().then((PrCountry)=>{
  
    let listDataCountry=[]
      for(let i=0;i<PrCountry.length;i++){
        if(PrCountry[i].IsActive==true){
          let newObjCountry={
          key: PrCountry[i] ,
          text: PrCountry[i].Title
          }
          listDataCountry.push(newObjCountry)
        }
      }
      setCountryOptions([...listDataCountry])
    })

//Shipping Region ----------------------------------------------

   ConnectPr.getInstance().GetPRRegion().then((PrRegion)=>{
  
    let listDataRegion=[]
      for(let i=0;i<PrRegion.length;i++){
        let newObjRegion={
          key: PrRegion[i] ,
          text: PrRegion[i].Title+ "(" + PrRegion[i].CountryKey + ")"
        }
        listDataRegion.push(newObjRegion)
      }
      setRegionOptions([...listDataRegion])
    })

  },[])

  

  useEffect(() => {
    if (newshipAddress.text === "Other Shipping Location") {
      setselectshipAddress(() => true);
    } else {
      setselectshipAddress(() => false);
    }
  }, [newshipAddress]);
  const textContext = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: Object | undefined
  ) => {
    console.log(textvalue);
    console.log(e.target);
    const id = (e.target as HTMLInputElement).id;
    console.log(id);
    settextvalue((prevValue) => ({
      ...prevValue,
      [id]: newValue || " ",
    }));
    console.log(id);
  };

  // where are you based....

  const basedOptions: IDropdownOption[] = [
    { key: "1", text: "US,- Strongsville, OH (STV) plant" },
    { key: "2", text: "US, Cranberry" },
    { key: "3", text: "US, Field Persons" },
    { key: "4", text: "US, HQ-Mountain View, CA (MTV)" },
    { key: "5", text: "US, Milpitas, (MIL) Plant" },
  ];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
  };
  const col1Style: IStackStyles = {
    root: {
      padding: "10px",
      textAlign: "right",
      width: "30%",
    },
  };
  const col2Style: IStackStyles = {
    root: {
      padding: "0px",
      textAlign: "left",
      width: "70%",
    },
  };
  const [buttonState, setbuttonState] = useState<boolean>(false);
  const iconButtonClick = () => {
    console.log("hi every one ");
    setbuttonState(!buttonState);
  };
  const textFieldStyles: Partial<ITextFieldStyles> = {
    field: { width: "450px" },
  };
  return (
    <>
      <div>
        <Stack tokens={{ childrenGap: 15 }}>
          <Stack tokens={{ childrenGap: 10 }}>
            <Stack horizontal horizontalAlign="space-between">
              <span>
                <DefaultButton
                  style={{
                    background: DefaultPalette.whiteTranslucent40,
                    color: DefaultPalette.blue,
                    borderRadius: 5,
                    height: "40px",
                  }}
                  onClick={() => buttonContxtBack()}
                >
                  <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <Icon iconName="Back" />
                    </span>
                    <span>Back</span>
                  </Stack>
                </DefaultButton>
              </span>

              <span>
                <DefaultButton
                  style={{
                    background: DefaultPalette.green,
                    color: DefaultPalette.white,
                    borderRadius: 5,
                    height: "40px",
                  }}
                  onClick={() => buttonContxtSave()}
                >
                  <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <Icon iconName="Save" />
                    </span>
                    <span>Save & Continue</span>
                  </Stack>
                </DefaultButton>
              </span>
            </Stack>
          </Stack>
          <Stack tokens={{ childrenGap: 10 }}>
            {/* _______________________________ */}
            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item styles={col1Style}>
                  <div>Supplier Name: </div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <TextField
                      id="suppliername"
                      value={vendorItem.vendorName}
                      onChange={textContext}
                    />
                    <DefaultButton
                      style={{ minWidth: 0 }}
                      onClick={() => showSupplierSearchModal()}
                    >
                      <Icon iconName="Search" style={{ color: "blue" }} />
                      {openSupplierSearch ? (
                        <SupplierModal
                          isModalOpen={openSupplierSearch}
                          showModal={showSupplierSearchModal}
                          venderItemDatapick={venderItemDatapick}
                        />
                      ) : null}
                    </DefaultButton>
                  </Stack>
                </Stack.Item>
              </Stack>
            </Stack.Item>

            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item
                  styles={col1Style}
                  // style={{ border: "1px solid black" }}
                >
                  <div>Supplier Number: </div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <TextField
                      disabled
                      id="suppliernumber "
                      value={vendorItem.vendorNumber}
                      onChange={textContext}
                    />
                    {/* (buttonState)? */}
                    {buttonState ? (
                      <DefaultButton
                        style={{ minWidth: 0 }}
                        onClick={iconButtonClick}
                      >
                        <Icon iconName="ChevronUp" style={{ color: "blue" }} />
                      </DefaultButton>
                    ) : (
                      <DefaultButton
                        style={{ minWidth: 0 }}
                        onClick={iconButtonClick}
                      >
                        <Icon
                          iconName="ChevronDown"
                          style={{ color: "blue" }}
                        />
                      </DefaultButton>
                    )}
                  </Stack>
                </Stack.Item>
              </Stack>
            </Stack.Item>

            {/* ______________________________________________________ */}

            {buttonState ? (
              <>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier Address: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          disabled
                          value={vendorItem.vendorAddress}
                          styles={textFieldStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier City: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          disabled
                          value={vendorItem.vendorCity}
                          styles={textFieldStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier State: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          disabled
                          value={vendorItem.vendorState}
                          styles={textFieldStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier Zip: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          disabled
                          value={vendorItem.vendorZip}
                          styles={textFieldStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier Country: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          disabled
                          value={vendorItem.vendorCountry}
                          styles={textFieldStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </>
            ) : null}
            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item
                  styles={col1Style}
                  // style={{ border: "1px solid black" }}
                >
                  <div>Justification/Reason for Order: </div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <div style={{ width: "450px" }}>
                    <TextField
                      id="justificationorder"
                      onChange={textContext}
                      multiline
                      rows={2}
                    />
                  </div>
                </Stack.Item>
              </Stack>
            </Stack.Item>

           {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item
                  styles={col1Style}
                  // style={{ border: "1px solid black" }}
                >
                  <div>Add Special Instructions/Down payment details:</div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <div style={{ width: "450px" }}>
                    <TextField
                      id="downpayment"
                      onChange={textContext}
                      multiline
                      rows={2}
                    />
                  </div>
                </Stack.Item>
              </Stack>
            </Stack.Item>
            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item
                  styles={col1Style}
                  // style={{ border: "1px solid black" }}
                >
                  <div>Ship To Address: </div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <Dropdown
                      placeholder="Select an option"
                      onChange={changeshipDropdownOption}
                      options={shipAddress}
                      styles={dropdownStyles}
                    />
                    {selectshipAddress ? (
                    <div>
                      <Link style={{ color: "blue", marginLeft: 10 }} onClick={showOtherShipping}>
                        Select from existing address list
                      </Link>
                       {openOtherShipping? (
                        <>
                          <OtherShippingAddComponent
                              isShippingAddOpen={openOtherShipping}
                              showShippingAdd={showOtherShipping} 
                              ShippingDataPick={ShippingDataPick}                                                  
                            
                          />
                        </>
                      ) : null}
                    </div>):null}
                  </Stack>
                </Stack.Item>
              </Stack>
            </Stack.Item>

            {selectshipAddress ? (
              <>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Name: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          placeholder="Provide Company/Recipient Name.Maximum length"
                          style={{ width: 350 }}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>House Number/Street: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          placeholder="House No."
                          value={shippingItem.HouseNumber}
                          style={{ width: 100 }}
                        />
                        <span style={{ marginTop: 10 }}>/</span>
                        <TextField
                          placeholder="Street Name"
                          style={{ width: 300 }}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Postal Code/City: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          placeholder="Postal Code"
                          style={{ width: 100 }}
                        />
                        <span>/</span>
                        <TextField placeholder="City" style={{ width: 250 }} />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Region: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <Dropdown
                          placeholder="Select an option"
                          // onChange={changeshipDropdownOption}
                          options={regionOptions}
                          styles={dropdownStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Country: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <Dropdown
                          placeholder="Select an option"
                          // onChange={changeshipDropdownOption}
                          options={countryOptions}
                          styles={dropdownStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Where are you based?: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <Dropdown
                          placeholder="Select an option"
                          // onChange={changeshipDropdownOption}
                          options={basedOptions}
                          styles={dropdownStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Contact Name and Phone Number: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          placeholder="Maximum length is 50 characters"
                          style={{ width: 300 }}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </>
            ) : null}

            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default VendorandShippingComponent;
function listDataSupplierComCode(): any {
  throw new Error("Function not implemented.");
}

