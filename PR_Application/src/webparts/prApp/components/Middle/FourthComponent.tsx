import * as React from 'react'
import { Stack} from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react';
import { mergeStyles,DefaultPalette} from '@fluentui/react/lib/Styling';
const FourthComponent = () => {
    const stackItemStyles = mergeStyles({
        alignItems: 'center',
        background: DefaultPalette.black,
        color: DefaultPalette.white,
        display: 'flex',
        height: 50,
        justifyContent: 'flex-start',

      });
  return (
    <>
    <Stack>
        <span className={stackItemStyles}>Review - Order Details <Icon iconName="Question"   styles={{
    root: {
      borderRadius: '50%',
      backgroundColor: 'gray',
      padding: '8px',
    },
  }}/> </span>

    </Stack>
    </>
  )
}

export default FourthComponent