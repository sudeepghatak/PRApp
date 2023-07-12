import * as React from 'react'
import { CheckboxVisibility, DatePicker, DetailsList, Dropdown,IDropdownOption,IDropdownStyles, IColumn, Icon, Stack, TextField} from 'office-ui-fabric-react';


const LineItemTableFormat = () => {

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

const glaccount: IDropdownOption[] = [
        { key: '1', text: '500120(COGS - Semi Finished Good)' },
        { key: '2', text: '500120(COGS - Finished Good)' },
      ];
const uom: IDropdownOption[] = [
        { key: '1', text: 'Acre(ACR)' },
        { key: '2', text: 'Activity Unit(AU)' },
        { key: '1', text: 'Bag(BAG)' },
        { key: '2', text: 'Bottle(BT)' },
      ];
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
  

 const columns: IColumn[] = [
    { key: 'column1', name: 'Copy', fieldName: 'column1', minWidth: 50, maxWidth: 100},
    { key: 'column2', name: 'Project Code', fieldName: 'column2', minWidth: 100, maxWidth: 200 },
    { key: 'column3', name: 'Description', fieldName: 'column3', minWidth: 200, maxWidth: 500 },
    { key: 'column4', name: 'Cost Center', fieldName: 'column4', minWidth: 100, maxWidth: 200 },
    { key: 'column5', name: 'Date Required', fieldName: 'column5', minWidth: 100, maxWidth: 300 },
    { key: 'column6', name: 'GL Account', fieldName: 'column6', minWidth: 200, maxWidth: 300 },
    { key: 'column7', name: 'Qty', fieldName: 'column7', minWidth: 50, maxWidth: 100 },
    { key: 'column8', name: 'UOM', fieldName: 'column8', minWidth: 200, maxWidth: 300 },
    { key: 'column9', name: 'Unit Price', fieldName: 'column9', minWidth: 100, maxWidth: 200 },
    { key: 'column10', name: 'Unit Price Per', fieldName: 'column10', minWidth: 100, maxWidth: 200 },
    { key: 'column11', name: 'Total Amount ($)', fieldName: 'column11', minWidth: 100, maxWidth: 200 },
    { key: 'column12', name: '+', fieldName: 'column12', minWidth: 100, maxWidth: 200 },

  ];

  const items = [

    { key: 'item1', column1: <Icon iconName="CompassNW" />, column2:<span><TextField/></span>, column3:<span><TextField/></span>,
     column4:<span><TextField/></span>, column5:<span><DatePicker/></span>,
     column6:<span>
        <Dropdown placeholder="- Select GL Account -" id="GlAccount"   
        onChange={changeDropdownOption}  styles={dropdownStyles}  selectedKey={selectedItems['GlAccount']?.key}
        options={glaccount}/>
        </span>,
     column7:<span><TextField /></span>,
     column8:<span>
        <Dropdown placeholder="- Select UOM -" id="UOM" 
        onChange={changeDropdownOption} styles={dropdownStyles}
        options={uom}/></span>, 
    column9:<span><TextField /></span>,
    column10:<span><TextField /></span>,
    column11:<span><TextField /></span>, 
    column12: <Icon iconName="CompassNW" />},
   ];

 
  return (
    <>
    <div>
    <Stack>
    
    <Stack.Item>
    <DetailsList items={items} columns={columns} checkboxVisibility={CheckboxVisibility.hidden}/>
     </Stack.Item>

    <Stack.Item   align='end'  style={{display:'flex'}}>
            <span style={{marginRight:"5px"}}>Total Amount in (USD):   </span>
            <span> ($)80.00 </span>
    </Stack.Item>
    
    </Stack> 

  </div>
    </>
  );

}

export default LineItemTableFormat
