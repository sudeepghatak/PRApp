import { Icon, Stack } from 'office-ui-fabric-react'
import * as React from 'react'
interface TypeofpurchaseName{
    text:string
}

const LineItemNameDefine:React.FunctionComponent<TypeofpurchaseName> = (props) => {
const{text}=props
  return (
    <div>
     <Stack>
    
    <Stack.Item   align='start'  style={{display:'flex'}}>
            <span style={{marginRight:"10px"}}> {text}  </span>
    </Stack.Item> 
    <Stack.Item   align='end'  style={{display:'flex'}}>
            <span style={{marginRight:"10px"}}> <Icon iconName="CompassNW" />  </span>
    </Stack.Item> 
    </Stack>
      
    </div>
  )
}

export default LineItemNameDefine
