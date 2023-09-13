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

export const LandingScreen: React.FunctionComponent = () => {


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
            <Stack.Item align='start' styles={stackItemStyles}> <RequestGallery /></Stack.Item>
                </Stack.Item>
                <Stack.Item align='stretch'  grow={1} >
                    <Stack.Item align='start' styles={stackItemStyles}> <CreatePR /></Stack.Item>
                    <Stack.Item align='start' styles={stackItemStyles}>
                        <DelegatePR />
                    </Stack.Item>
                    <Stack.Item align='start' styles={stackItemStyles}>
                        <PendingApprovals />
                    </Stack.Item>
                </Stack.Item>
                <Stack.Item  align='stretch' grow={1}>
                    <Stack.Item align='start' styles={stackItemStyles}> <GettingStarted /></Stack.Item>
                    <Stack.Item align='start' styles={stackItemStyles}>
                        <PoliciesProcedures />
                    </Stack.Item>
                    <Stack.Item align='start' styles={stackItemStyles}>
                        <LegalDocuments />
                    </Stack.Item>
                </Stack.Item>
                <Stack.Item  align='stretch' grow>
                    <Stack.Item align='start' styles={stackItemStyles}> <FAQs /></Stack.Item>

                </Stack.Item>
            </Stack>
        </div>

    );
};