import * as React from 'react';
import { IStackItemStyles, Stack } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ConnectPr } from '../../Api/api';
import { useEffect, useState } from 'react';
import { IChoiceGroupOption } from '@fluentui/react';

export const GettingStarted: React.FunctionComponent = () => {
    const stackItemStyles: IStackItemStyles = {
        root: {
            background: DefaultPalette.green,
            color: DefaultPalette.white,
            textAlign: 'left',
            paddingLeft: 10,
        },
    };

    const [GettingStartedOption, setGettingStartedOption] = useState([]); // Initialize with an empty array of strings

    useEffect(() => {
        // Use a loading state to indicate that data is being fetched
        const fetchData = async (): Promise<void> => {
            try {
                const response = await ConnectPr.getInstance().GetGettingStarted();
                const choiceGroupOptions = response.map((item, index) => ({
                    key: index.toString(),
                    text: item.Title,
                    url:item.Url, // Assuming "Title" corresponds to the text property
                }));
                setGettingStartedOption(choiceGroupOptions);
            } catch (error) {
                console.log('Error fetching data:', error);
                // Handle the error state here (e.g., show an error message)
            }
        };

        fetchData(); // Call the fetchData function
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            <Stack>
                <Stack.Item align="stretch" styles={stackItemStyles}>
                    <p>Getting Started</p>
                </Stack.Item>
                <Stack.Item align="start">
                    <ul>
                        {GettingStartedOption.map((item, index) => (
                            <li key={index}><a href={item.url}>{item.text}</a></li>
                        ))}
                    </ul>
                </Stack.Item>
            </Stack>
        </div>
    );
};
