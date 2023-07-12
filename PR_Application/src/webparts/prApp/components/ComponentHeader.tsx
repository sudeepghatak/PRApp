import * as React from 'react'
import { mergeStyles,DefaultPalette} from '@fluentui/react/lib/Styling';
interface ComponentProps{
    title:string,
}
const ComponentHeader = (props:ComponentProps) => {
    const {title}=props

    const stackItemStyles = mergeStyles({
        alignItems: 'center',
        background: DefaultPalette.black,
        color: DefaultPalette.white,
        display: 'flex',
        height: 50,
        justifyContent: 'flex-start',

      });
  return (
    <span className={stackItemStyles}>{title}</span>
  )
}

export default ComponentHeader