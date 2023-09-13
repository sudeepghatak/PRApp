import * as React from 'react'
import { Stack, Text, Image, StackItem, Icon, IStackItemStyles, DefaultPalette, IStackStyles } from '@fluentui/react';

const requestData = [
    {
        PRId: 'ABC000123',
        requestStatus: 'Pending',
        Amount: '$12300',
        date: '1/1/2023',
        imageUrl: 'your-image-url1.jpg',
    },
    {
        PRId: 'XY0000456',
        requestStatus: 'Approved',
        Amount: '$565400',
        date: '5/6/2023',
        imageUrl: 'your-image-url2.jpg',
    },
    // Add more data objects as needed
];

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

const RequestDetailsList = () => {
    return (
        
        <div>
            <Stack styles={stackStyles}>
            <Stack.Item align='stretch' styles={stackItemStyles}>
                    <p>Order Details</p>
                </Stack.Item>
            {requestData.map((data, index) => (
                <Stack
                    key={index}
                    horizontal
                    horizontalAlign="space-between"
                    verticalAlign="center"
                    styles={{
                        root: {
                            border: '1px solid #ccc',
                            padding: '10px',
                            marginBottom: '10px',
                            textAlign:'left',
                        },
                    }}
                >
                    
                    <Stack.Item align="start">
                        <Stack verticalAlign="start">
                            <Stack horizontal verticalAlign="center">

                                <Text>{data.PRId}</Text>
                                <Icon iconName="Edit" style={{ marginRight: '5px', cursor: 'pointer' }} />
                                <Icon iconName="Delete" style={{ marginRight: '5px', cursor: 'pointer' }} />
                                <Icon iconName="Copy" style={{ cursor: 'pointer' }} />
                            </Stack>
                            
                            <Text>Amount in (USD)</Text>
                            <Text>{data.Amount}</Text>
                        </Stack>
                    </Stack.Item>
                    <Stack.Item>
                        <Stack verticalAlign="end">
                            <Text>Date: {data.date}</Text>
                            <Image src={data.imageUrl} alt="Image" width={100} height={100} />
                        </Stack>
                    </Stack.Item>
                </Stack>
            ))}
            </Stack>
        </div>
    );
};

export default RequestDetailsList;
