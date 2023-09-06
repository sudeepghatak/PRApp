import * as React from 'react'
import { IStackItemStyles, Stack } from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react';
import { mergeStyles, DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton, IStackStyles } from 'office-ui-fabric-react';

export const FAQs: React.FunctionComponent = () => {

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


            <Stack horizontalAlign='stretch'>
                <Stack.Item align='stretch' styles={stackItemStyles}>
                    <p>We've got Answers</p>
                </Stack.Item>
                <Stack.Item align='stretch'>
                    <ul>
                        <li>How to Create a PR</li>
                        <li>How to Approve a PR</li>
                        <li>Do I need a quote?</li>

                    </ul>
                </Stack.Item>

            </Stack>
        </div>

    );
};