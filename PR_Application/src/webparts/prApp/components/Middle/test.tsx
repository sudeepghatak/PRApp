import * as React from 'react'
import { IStackItemStyles, IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react';
import { mergeStyles, DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton, IStackStyles } from 'office-ui-fabric-react';
import { CreatePR } from './CreatePR';
import { DelegatePR } from './DelegatePR';
import { PendingApprovals } from './PendingApprovals';
import { GettingStarted } from './GettingStarted';
import { PoliciesProcedures } from './PoliciesProcedures';
import { LegalDocuments } from './LegalDocuments';
import { FAQs } from './FAQs';
import RequestGallery from './RequestGallery';

export const Test: React.FunctionComponent = () => {

    const stackStyles: IStackStyles = {
        root: {
          background: DefaultPalette.themeTertiary,
        },
      };
      const stackItemStyles: IStackItemStyles = {
        root: {
          alignItems: 'left',
          minWidth:200,
          justifyContent: 'center',
          paddingBottom:20
        },
      };
      
      // Tokens definition
      const stackTokens: IStackTokens = {
        childrenGap: 5,
        padding: 10
      };

    return (

        <div>
            <Stack enableScopedSelectors horizontal  tokens={stackTokens}>
                <Stack.Item align='stretch'  grow={2} >
                    <RequestGallery />
                </Stack.Item>
            </Stack>
        </div>

    );
};