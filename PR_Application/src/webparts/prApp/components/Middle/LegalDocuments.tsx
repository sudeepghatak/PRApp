import * as React from 'react'
import { IStackItemStyles, Stack } from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react';
import { mergeStyles, DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton, IStackStyles } from 'office-ui-fabric-react';

export const LegalDocuments: React.FunctionComponent = () => {

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
                <Stack.Item align='stretch' styles={stackItemStyles}><p>Legal Documents</p></Stack.Item>
                <Stack.Item align='stretch' style={{textAlign:'left'}}>
                    <div>
                        For assistance with Omnicell vendor  For assistance with Omnicell vendor For assistance with Omnicell vendor For assistance with Omnicell vendor For assistance with Omnicell vendor</div>
                    
                </Stack.Item>
            </Stack>

        </div>

    );
};