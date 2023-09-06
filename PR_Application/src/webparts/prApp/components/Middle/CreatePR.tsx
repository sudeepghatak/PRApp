import * as React from 'react'
import { IStackItemStyles, IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react';
import { mergeStyles, DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton, IStackStyles } from 'office-ui-fabric-react';

export const CreatePR: React.FunctionComponent = () => {

    const stackItemStyles: IStackItemStyles = {
        root: {
            background: DefaultPalette.green,
            color: DefaultPalette.white,
            textAlign:'left',
            paddingLeft:10
        },
      };

    return (

        <div>
            <Stack >
                <Stack.Item align='stretch' styles={stackItemStyles}>
                    <p>Create a Purchase Requisition</p>
                </Stack.Item>
                <Stack.Item align='start'>
                    <p>Create a new purchase requisition in few steps</p>
                </Stack.Item>
                <Stack.Item align='end'>
                    <DefaultButton text='Start your PR' />
                </Stack.Item>
            </Stack>
        </div>

    );
};