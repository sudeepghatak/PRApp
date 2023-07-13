import * as React from 'react'
import {useState,useRef,useEffect} from 'react'
import { Stack,IStackTokens} from '@fluentui/react/lib/Stack';

import { DefaultButton, IconButton} from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import {DefaultPalette} from '@fluentui/react/lib/Styling';
import { Dropdown,IDropdownStyles, IDropdownOption  } from '@fluentui/react/lib/Dropdown';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Checkbox,mergeStyles} from '@fluentui/react';
import ComponentHeader from '../ComponentHeader';
import TableComponent from './TableComponent';
import { ComboBoxListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { getSP } from '../pnpjsConfig';
import { SPFI, spfi } from '@pnp/sp';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import {map} from 'lodash'
const FirstComponent = () => {
    //for file Upload ..use useRef..
    const inputRef=useRef<HTMLInputElement>(null)
    

      const GetItems=async()=> {
        const sp = getSP();
    try {
      // debugger;
      const spCache = spfi(sp);
      const response: any[] = await spCache.web.lists
        .getByTitle("PR_All_Requests")
        .items
        .getAll();
      console.log(response);
      console.log("-----------")
      // setState({ ListItems: response });
return response
    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }
const [countryCode,setcountryCode]=useState([])
    useEffect(()=>{
      GetItems().then((value)=>{
        console.log("Do Error Here ...")
        console.log(value)
        // const code=map(value,({odata.id,Title})=>({key:odata.id,text:Title}))
        const code =[];
        for(let i=0;i<value.length;i++){
          let newobj={};
          newobj["key"]=i
          newobj["text"]=value[i].Title
      
          code.push(newobj)

        }
        console.log(code)
        setcountryCode(code)

      })
      console.log("Somthing happen here ...")
      

    },[])
  
    const sectionStackTokens: IStackTokens = { childrenGap: 15 };
    
    //this is for all radio option
    const [selectRadioItems, setSelectRadioItems] = useState<{
        [key: string]: IChoiceGroupOption;
      }>({
        prRadio: { key: '', text: '' },
        constCenterRadio: { key: '', text: '' },
        prProjectRadio: { key: '', text: '' },
        buyRadio: { key: '', text: '' },
        prepaidcapitalRadio: { key: '', text: '' },
        ehsRadio: { key: '', text: '' },
      });
    
      const prOption: IChoiceGroupOption[] = [
        { key: 'm1', text: 'male' },
        { key: 'f1', text: 'female' },
      ];
    
      const constCenterOption: IChoiceGroupOption[] = [
        { key: 'department', text: 'Department' },
        { key: 'alternatecostcenter', text: 'Alternate Cost Center' },
      ];
    
      const prProjectOption: IChoiceGroupOption[] = [
        { key: 'yes', text: 'Yes' },
        { key: 'no', text: 'No' },
      ];
    
      const buyOption: IChoiceGroupOption[] = [
        { key: 'yes', text: 'Yes' },
        { key: 'no', text: 'No' },
      ];
    
      const prepaidcapitalOption: IChoiceGroupOption[] = [
        { key: 'expense', text: 'Expense' },
        { key: 'prepaid', text: 'Prepaid' },
        { key: 'capitalequipmentasset', text: 'Capital Equipment / Asset' },
        { key: 'lease', text: 'Lease' },
      ];
    
      const ehsOption: IChoiceGroupOption[] = [
        { key: 'yes', text: 'Yes' },
        { key: 'no', text: 'No' },
      ];
    
      const choiceGroupStyles = {
        label: {
          display: 'inline',
        },
        flexContainer: {
          columnGap: '1em',
          display: 'inline-flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
      };
    
      const radioOnChange = (
        ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
        option?: IChoiceGroupOption | undefined
      ) => {
        const { name } = ev?.target as HTMLInputElement;
        console.log(name)
        let newSelectedItem: IChoiceGroupOption = { key: '', text: '' };
        // if (option) {
          newSelectedItem = { key: option?.key as string, text: option?.text as string };
        // }
        console.log(newSelectedItem)
        setSelectRadioItems((prevSelectRadioItems) => ({
          ...prevSelectRadioItems,
          [name]: newSelectedItem, // Update the specific option state key
        }));
        console.log(selectRadioItems);
      };
    //this is for all dropdown option....................
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: IDropdownOption }>({
        prOption: { key: '', text: '' },
        companyCode: { key: '', text: '' },
        selectDepartment: { key: '', text: '' },
        projectCode: { key: '', text: '' },
      });
    
      const companyCodeOption: IDropdownOption[] = [
        { key: 'apple', text: 'Apple' },
        { key: 'banana', text: 'Banana' },
      ];
      const selectDepartmentOption: IDropdownOption[] = [
        { key: 'apple', text: 'Apple' },
        { key: 'banana', text: 'Banana' },
      ];
      const projectCodeOption: IDropdownOption[] = [
        { key: 'apple', text: 'Apple' },
        { key: 'banana', text: 'Banana' },
      ];
      const PrOption: IDropdownOption[] = [
        { key: 'apple', text: 'Apple' },
        { key: 'banana', text: 'Banana' },
      ];
    
      const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 },
      };
    
      const changeDropdownOption = (
        event: React.FormEvent<HTMLDivElement>,
        item: IDropdownOption | undefined,
        index: number
      ): void => {
        const { id } = event.target as HTMLDivElement;
        let newSelectedItem: IDropdownOption = { key: '', text: '' };
        // if (item) {
          newSelectedItem = { key: item?.key as string, text: item?.text as string };
        // }
        setSelectedItems((prevSelectedItems) => ({
          ...prevSelectedItems,
          [id]: newSelectedItem,
        }));
        console.log(selectedItems)
      };

    //......................................

    //for file upload .........................

const SaveandContinue=()=>{

    alert(`${selectRadioItems.prRadio.text} -- ${selectRadioItems.constCenterRadio.text} -- ${selectRadioItems.prProjectRadio.text} ---- ${selectRadioItems.buyRadio.text} ---- ${selectRadioItems.prepaidcapitalRadio.text} and ---- ${selectedItems.prOption.text} -- ${selectedItems.companyCode  .text} -- ${selectedItems.selectDepartment.text} ---- ${selectedItems.projectCode  .text} ---- `)
}
//select checkBox.............
// const []=useState({

// })

const changeChakeBox=(ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked?: boolean | undefined)=>{
    const id = ev?.target;
    console.log(id);
    console.log(checked);
    console.log(ev?.target)
    console.log(id)
    console.log(checked)

}

//handle file change ....
const handleFileChange=()=>{
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.click();
    }

}

const fileuploadhandleClick=(event: React.ChangeEvent<HTMLInputElement>)=>{
  
    const fileObj = event?.target.files && event?.target.files[0];
    if (!fileObj) {
      return;
    }
    event.target.value = '';
    console.log(fileObj.name);

}

//
const customButtonStyles = mergeStyles({
    width: '150px' // Adjust the width to your desired value
  });
  const custommiddleButtonStyles = mergeStyles({
    width: '250px' // Adjust the width to your desired value
  });

// const _getPeoplePickerItems (items: any[]) =>() ={
//   console.log('Items:', items)
// }

  
  return (
    <>
    <Stack tokens={sectionStackTokens}>
        <ComponentHeader title='[PR ID - 30928] [Expense Buy][Expense] for-Sunanda Parvathaneni [US][USD] 740001 '/>
        <Stack  horizontal disableShrink>
        <Stack.Item order={1}>
          <span><DefaultButton className={customButtonStyles} >1 Primary Information</DefaultButton></span>
        </Stack.Item>
        <Stack.Item order={2}>
        <span><DefaultButton className={custommiddleButtonStyles} >2 Vendor Details and Shipping Address</DefaultButton></span>
        </Stack.Item>
        <Stack.Item order={3}>
        <span><DefaultButton className={customButtonStyles} >3 Line Item Information</DefaultButton></span>
        </Stack.Item>
        <Stack.Item order={4}>
        <span><DefaultButton className={customButtonStyles}>4 Verify and submit Order</DefaultButton></span>
        </Stack.Item>
      </Stack>
    <Stack >
        <Stack.Item align="center">
          <span>SHOHINI CHATTERJEE (TC) Has Requested</span>
        </Stack.Item>
    </Stack>
{/* Button */}
    <Stack >
        <Stack.Item align="end">
        <DefaultButton style={{background: DefaultPalette.green,color:DefaultPalette.white}} onClick={SaveandContinue}>
    <Stack horizontal>
    <span style={{marginRight:10}}><Icon iconName="CompassNW" /></span>
    <span>Save & Continue</span>
    </Stack>
    </DefaultButton>
        
        </Stack.Item>
    </Stack>
    {/* Select Option */}

    <Stack tokens={sectionStackTokens}>
        <Stack.Item align='center' style={{display:'flex'}}>
            <span style={{marginRight:"10px"}}>What type of PR want to create?:   </span>
        <Dropdown
        placeholder="Select an option"
        id="prOption"
        onChange={changeDropdownOption}
        options={PrOption}
        selectedKey={selectedItems['prOption']?.key}
        styles={dropdownStyles}
      />
        </Stack.Item>
        <Stack.Item align='center'  style={{display:'flex'}}>
            <span style={{marginRight:"10px"}} >Are you submitting PR for yourself?:  </span>
            <ChoiceGroup name='prRadio' options={prOption} onChange={radioOnChange} required={true} selectedKey={selectRadioItems['prRadio']?.key}
            styles={choiceGroupStyles}/>
        </Stack.Item>

        <Stack.Item align='center'  style={{display:'flex'}}>
            <span style={{marginRight:"10px"}} >Requesting for:  </span>
        
           
            
        </Stack.Item>



        <Stack.Item align='center' style={{display:'flex'}}>
            <span>Company Code:  </span>
        <Dropdown
        // listId='da8daf15-d84f-4ab1-9800-7568f82fed3f'
         placeholder="Select an option"
         id="companyCode"
        onChange={changeDropdownOption}
        selectedKey={selectedItems['companyCode']?.key}
         options={countryCode} 
         styles={dropdownStyles}
         />
        </Stack.Item>
        <Stack.Item align='center' style={{display:'flex'}}>
            <span>Are you submitting for the requestors cost center?: </span>
          
            <ChoiceGroup name='constCenterRadio' options={constCenterOption} onChange={radioOnChange} selectedKey={selectRadioItems['constCenterRadio']?.key}  required={true} styles={choiceGroupStyles}/>
        </Stack.Item>
        <Stack.Item align='center' style={{display:'flex'}}>
            <span>Is this PR related to a Project?: </span>
            <ChoiceGroup name='prProjectRadio' options={prProjectOption} onChange={radioOnChange} selectedKey={selectRadioItems['prProjectRadio']?.key}  required={true} styles={choiceGroupStyles}/>
        </Stack.Item>
        <Stack.Item align='center' style={{display:'flex'}}>
            <span>Select Department and Project Code?: </span>
            <Dropdown
         placeholder="Select an option"
         id="selectDepartment"
        onChange={changeDropdownOption}
        selectedKey={selectedItems['selectDepartment']?.key}
         options={selectDepartmentOption} 
         styles={dropdownStyles}
         />
           <Dropdown
         placeholder="Select an option"
         id="projectCode"
        onChange={changeDropdownOption}
        selectedKey={selectedItems['projectCode']?.key}
         options={projectCodeOption} 
         styles={dropdownStyles}
         />
        </Stack.Item>
                <Stack.Item align='center' style={{display:'flex'}}>
            <span>Type of Buy:  </span>
            <ChoiceGroup name='buyRadio' options={buyOption} onChange={radioOnChange} required={true} selectedKey={selectedItems['buyRadio']?.key}  styles={choiceGroupStyles}/>
        </Stack.Item>

        <Stack.Item align='center' style={{display:'flex'}}>
            <span>Is this Prepaid or Capital Equipment buy?:  </span>
            <ChoiceGroup name='prepaidcapitalRadio' options={prepaidcapitalOption} onChange={radioOnChange} selectedKey={selectRadioItems['prepaidcapitalRadio']?.key}  required={true} styles={choiceGroupStyles}/>
        </Stack.Item>

        <Stack.Item align='center' style={{display:'flex'}}>
            <span>Type of Purchase:  </span>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
                <Stack.Item align='start'>

                <Checkbox label="Consulting" id='Consulting' onChange={changeChakeBox} />
                <Checkbox label="Engineering" id='Engineering' onChange={changeChakeBox} />
                <Checkbox label="Field Services" id='Field Services'  onChange={changeChakeBox} />
                <Checkbox label="Manufacturing" id='Manufacturing' onChange={changeChakeBox} />
                <Checkbox label="Office Supply and Equipment" id='Office Supply and Equipment' onChange={changeChakeBox} />
                <Checkbox label="GAAP" id='GAAP' onChange={changeChakeBox} />

                </Stack.Item>
                <Stack.Item align='end'>
                <Checkbox label="Corporate" id='Corporate'  onChange={changeChakeBox} />
                <Checkbox label="Facilities or Lease"  id='Facilities or Lease' onChange={changeChakeBox} />
                <Checkbox label="Computer Equipment" id='Computer Equipment' onChange={changeChakeBox} />
                <Checkbox label="Marketing" id='Marketing' onChange={changeChakeBox} />
                <Checkbox label="Software" id='Software' onChange={changeChakeBox} />
                <Checkbox label="Benefits" id='Benefits' onChange={changeChakeBox} />

                </Stack.Item>
            </Stack>
        </Stack.Item>

        <Stack.Item align='center' style={{display:'flex'}}>
            <span>Is this EHS relevant?:   </span>
            <ChoiceGroup name='ehsRadio' options={ehsOption} onChange={radioOnChange} required={true} selectedKey={selectRadioItems['ehsRadio']?.key}  styles={choiceGroupStyles}/>
        </Stack.Item>

        <Stack.Item align='center' style={{display:'flex'}}>
            <span>Upload Important Documents: </span>
        <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={fileuploadhandleClick}
      />
        <IconButton iconProps={{ iconName: 'Add' }} title="Add" ariaLabel="Add" onClick={handleFileChange} />
        </Stack.Item>
        
    </Stack>

<TableComponent/>

      </Stack>
    </>
  )
}

export default FirstComponent