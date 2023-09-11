import * as React from 'react';
import { IStackItemStyles, Stack } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ConnectPr } from '../../Api/api';
import { useEffect, useState } from 'react';
import { IChoiceGroupOption } from '@fluentui/react';

export const LegalDocuments: React.FunctionComponent = () => {
    const stackItemStyles: IStackItemStyles = {
        root: {
            background: DefaultPalette.green,
            color: DefaultPalette.white,
            textAlign: 'left',
            paddingLeft: 10,
        },
    };

    const [GetLegalDocumentsText, setLegalDocumentsOption] = useState([]); // Initialize with an empty array of strings

    useEffect(() => {
        // Use a loading state to indicate that data is being fetched
        const fetchData = async (): Promise<void> => {
            try {
                const response = await ConnectPr.getInstance().GetLegalDocuments();
           
                setLegalDocumentsOption(response[0].Description);
            } catch (error) {
                console.log('Error fetching data:', error);
                // Handle the error state here (e.g., show an error message)
            }
        };

        fetchData(); // Call the fetchData function
    }, []); // Empty dependency array to run the effect only once

    function HTMLRenderer({ htmlContent }) {
        return (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        );
      }

    return (
        <div>
            <Stack>
                <Stack.Item align="stretch" styles={stackItemStyles}>
                    <p>Legal Documents</p>
                </Stack.Item>
                <Stack.Item align="start">
                <HTMLRenderer htmlContent={GetLegalDocumentsText} />
                </Stack.Item>
            </Stack>
        </div>
    );
};
