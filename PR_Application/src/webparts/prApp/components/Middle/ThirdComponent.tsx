import * as React from 'react'
import {  Dropdown,IDropdownOption,IDropdownStyles, Icon, Stack, DefaultButton, DefaultPalette } from 'office-ui-fabric-react';
import LineItemTableFormat from './LineItemTableFormat';
import LineItemNameDefine from './LineItemNameDefine';

const ThirdComponent = () => {

//    const [qty,setQty] = React.useState<number>()
//    const [unitPrice,setUnitPrice] = React.useState<number>()
//    const [unitPricePer,setUnitPricePer] = React.useState<number>()
//    const [total,setTotal] = React.useState<number>()

//    const textChange=(e:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string)=>{
//     let valueqty:string= newValue as string
//     let valueunitPrice:string= newValue as string
//     let valueunitPricePer:string= newValue as string
//     let valuetotal:string= newValue as string
    
    
//     let qtyValue=parseInt(valueqty)
//     let unitPriceValue=parseInt(valueunitPrice)
//     let unitPricePerValue=parseInt(valueunitPricePer)
//     let totalValue=parseInt(valuetotal)

//     setQty(qtyValue)
//     setUnitPrice(unitPriceValue)
//     setUnitPricePer(unitPricePerValue)
//     setTotal(qtyValue*unitPriceValue/unitPricePerValue)

//    }


    const [selectedItems, setSelectedItems] = React.useState<{ [key: string]: IDropdownOption }>({
        GlAccount: { key: '', text: '' },
        UOM: { key: '', text: '' },
      });
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

const PrCurrency: IDropdownOption[] = [
        { key: '1', text: 'AED' },
        { key: '2', text: 'AUD' },
        { key: '2', text: 'CAD' },
        { key: '2', text: 'CHF' },
        { key: '2', text: 'USD' },
      ];

    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 200 },
      };
     const dropdownStyles1: Partial<IDropdownStyles> = {
        dropdown: { width: 150 },
      };
    
    //   let total1:string=total.toString()
    //   let unitPricePer1:string=unitPricePer.toString()
    //   let unitPrice1= unitPrice.toString()
    //   let qty1= unitPrice.toString()

 

  
 
  return (
    <>
    <div>
    
     <Stack>
        <Stack tokens={{ childrenGap: 10 }}>
        <Stack.Item align='start'>
        <DefaultButton style={{background: DefaultPalette.green,color:DefaultPalette.white}} >
        <Stack horizontal>
        <span style={{marginRight:10}}><Icon iconName="CompassNW" /></span>
        <span>Back</span>
        </Stack>
        </DefaultButton>

        </Stack.Item>
        <Stack.Item align='end'>
        <DefaultButton style={{background: DefaultPalette.green,color:DefaultPalette.white}} >
        <Stack horizontal>
        <span style={{marginRight:10}}><Icon iconName="CompassNW" /></span>
        <span>Save & Continue</span>
        </Stack>
        </DefaultButton>
        </Stack.Item>
    </Stack> 
    <Stack>
        <Stack.Item align='start' style={{display:'flex'}}>
            <span style={{marginRight:"10px"}}>Select Currency:   </span>
        <Dropdown
        placeholder="Select Currency"
        id="prCurrency"
        onChange={changeDropdownOption}
        options={PrCurrency}
        selectedKey={selectedItems['prCurrency']?.key}
        styles={dropdownStyles1}
      />
    </Stack.Item>

    <Stack.Item   align='end'  style={{display:'flex'}}>
            <span style={{marginRight:"10px"}}>Total Order Amount in (USD):   </span>
            <span> ($)80.00 </span>
    </Stack.Item>
    </Stack>

    
    <Stack.Item>
       <LineItemNameDefine text="Consulting "/>
        <LineItemTableFormat/> 

        <LineItemNameDefine text="Corporate "/>
        <LineItemTableFormat/> 
        
        <LineItemNameDefine text="Engineering   "/>
        <LineItemTableFormat/> 

        <LineItemNameDefine text="Field Services   "/>
        <LineItemTableFormat/> 

        <LineItemNameDefine text="Computer Equipment  "/>
        <LineItemTableFormat/> 

        <LineItemNameDefine text="Manufacturing   "/>
        <LineItemTableFormat/> 

        <LineItemNameDefine text="Marketing   "/>
        <LineItemTableFormat/> 

        <LineItemNameDefine text="Office Supply and Equipment  "/>
        <LineItemTableFormat/> 

        <LineItemNameDefine text="Software   "/>
        <LineItemTableFormat/> 

        <LineItemNameDefine text="GAAP   "/>
        <LineItemTableFormat/> 

        <LineItemNameDefine text="Benefits  "/>
        <LineItemTableFormat/> 

        <LineItemNameDefine text="Other  "/>
        <LineItemTableFormat/> 
    </Stack.Item>

    
    </Stack> 

    
    
    </div>
    </>
  );

}

export default ThirdComponent



