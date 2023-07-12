import * as React from 'react'
import { Stack,IStackTokens} from '@fluentui/react/lib/Stack';

import { DefaultButton} from '@fluentui/react/lib/Button';
import {DefaultPalette} from '@fluentui/react/lib/Styling';
import { Icon } from '@fluentui/react/lib/Icon';
import ComponentHeader from '../ComponentHeader';
const Main = () => {
    const sectionStackTokens: IStackTokens = { childrenGap: 15 };
    const buttonContxt=()=>{

    }
  return (
    <>
    <div>
    <Stack tokens={sectionStackTokens}>
        <ComponentHeader title='PR ID ------------------------------------------------------'/>
    <Stack >
        <Stack.Item align="center">
          <span>SHOHINI CHATTERJEE -----------------------------JJJJJJJJJJOOOOOOOOOOPPP--------EEEEEE</span>
        </Stack.Item>
    </Stack>

    <Stack>
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
    


    </Stack>
    </div>

    </>
  )
}

export default Main