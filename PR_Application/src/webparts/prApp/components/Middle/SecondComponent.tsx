import * as React from 'react'
import { Stack} from '@fluentui/react/lib/Stack';
import { DefaultButton} from '@fluentui/react/lib/Button';
import {DefaultPalette} from '@fluentui/react/lib/Styling';
import { Icon } from '@fluentui/react/lib/Icon';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown,IDropdownOption,IDropdownStyles } from '@fluentui/react/lib/Dropdown';

const SecondComponent = () => {
    const [textvalue,settextvalue]=React.useState({
        suppliername:" ",
        justificationorder:" ",
        downpayment:" "
    })
    // const [suppliernumber,setsuppliernumber]=React.useState<number>()

    const buttonContxt=()=>{
        alert(`${textvalue.downpayment} and ${textvalue.justificationorder} and also ${textvalue.suppliername}`)
    }
    const changeshipDropdownOption=()=>{

    }

    const textContext=(e:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: Object | undefined)=>{
        console.log(e.target)
        const id = (e.target as HTMLInputElement).id;
        console.log(id)
        settextvalue((prevValue)=>({
            ...prevValue,
            [id]:newValue || " "
        }))
        console.log(id)
    }
    const shipAddress: IDropdownOption[] = [
        { key: 'apple', text: 'Apple' },
        { key: 'banana', text: 'Banana' },
      ];

    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 },
      };
  return (
    <>
    <div>
        <Stack>
<Stack tokens={{ childrenGap: 10 }}>
    <Stack.Item align='start'>
    <DefaultButton style={{background: DefaultPalette.green,color:DefaultPalette.white}} onClick={buttonContxt}>
    <Stack horizontal>
    <span style={{marginRight:10}}><Icon iconName="CompassNW" /></span>
    <span>Back</span>
    </Stack>
    </DefaultButton>

    </Stack.Item>
    <Stack.Item align='end'>
    <DefaultButton style={{background: DefaultPalette.green,color:DefaultPalette.white}} onClick={buttonContxt}>
    <Stack horizontal>
    <span style={{marginRight:10}}><Icon iconName="CompassNW" /></span>
    <span>Save & Continue</span>
    </Stack>
    </DefaultButton>
     </Stack.Item>
    </Stack>

    
    <Stack tokens={{ childrenGap: 10 }}>
        <Stack.Item align='center'>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <span>Supplier Name: </span>
            <TextField id="suppliername" onChange={textContext} />
            </Stack>
        </Stack.Item>
        <Stack.Item align='center'>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <span>Supplier Number: </span>
            <TextField id="suppliernumber " onChange={textContext} />
            </Stack>
        </Stack.Item>
        <Stack.Item align='center'>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <span>Justification/Reason for Order:  </span>
            <TextField id="justificationorder" style={{width:"300px"}} onChange={textContext}   multiline rows={2} />
            </Stack>

        </Stack.Item>
        <Stack.Item align='center'>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <span>Add Special Instructions/Down payment details:</span>
          <TextField id="downpayment" style={{width:"300px"}} onChange={textContext} multiline rows={2} />
        </Stack>
        </Stack.Item>
        <Stack.Item align='center'>
            <span>Ship To Address:  </span>
            <Dropdown
         placeholder="Select an option"
        onChange={changeshipDropdownOption}
         options={shipAddress} 
         styles={dropdownStyles}
         />

        </Stack.Item>

    </Stack>

        </Stack>
    </div>
    </>
  )
}

export default SecondComponent