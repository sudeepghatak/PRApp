import * as React from 'react'
import { IStackItemStyles, Stack } from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react';
import { mergeStyles, DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton, IStackStyles } from 'office-ui-fabric-react';

export const GettingStarted: React.FunctionComponent = () => {

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
                    <p>Getting Started</p>
                </Stack.Item>
                <Stack.Item align='start'>
                    <ul>
                        <li>General Information</li>
                        <li>Contact Info</li>
                        <li>Create PR</li>
                        <li>Approve PR</li>
                        <li>Help</li>
                    </ul>
                </Stack.Item>

            </Stack>
        </div>

    );
};