import * as React from 'react'
import { Stack } from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react';
import { mergeStyles, DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton, IStackStyles } from 'office-ui-fabric-react';

export const GettingStarted: React.FunctionComponent = () => {


    return (
        <>
            <div>
                <h1>Getting Started</h1>
                <ul>
                    <li>General Information</li>
                    <li>Contact Info</li>
                    <li>Create PR</li>
                    <li>Approve PR</li>
                    <li>Help</li>
                </ul>
            </div>
        </>
    );
};