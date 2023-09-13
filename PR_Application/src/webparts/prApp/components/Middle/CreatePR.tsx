import * as React from 'react'
import { IStackItemStyles, IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react';
import { mergeStyles, DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton, IStackStyles } from 'office-ui-fabric-react';
import { MainPage } from './MainPage';

export const CreatePR: React.FunctionComponent = () => {
    const [load,setload]
=React.useState(false)
    const stackItemStyles: IStackItemStyles = {
        root: {
            background: DefaultPalette.green,
            color: DefaultPalette.white,
            paddingLeft: 10
        },
    };

    const stackStyles: IStackStyles = {
        root: {
            textAlign: 'left' // Set the text alignment for the entire stack
        },
    };

    return (
        <div>
            <Stack styles={stackStyles}>
                <Stack.Item align='stretch' styles={stackItemStyles}>
                    <p>Create a Purchase Requisition</p>
                </Stack.Item>
                <Stack.Item align='start'>
                    <p>Create a new purchase requisition in a few steps</p>
                </Stack.Item>
                <Stack.Item align='end'>
                    <DefaultButton text='Start your PR' onClick={()=>setload(true)}/>
                </Stack.Item>
            </Stack>
            
        </div>
    );
};
