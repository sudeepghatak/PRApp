import * as React from 'react';
import { IStackItemStyles, Stack, Modal, IconButton } from '@fluentui/react/lib/';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ConnectPr } from '../../Api/api';
import { useEffect, useState } from 'react';

export const GettingStarted: React.FunctionComponent = () => {
    const stackItemStyles: IStackItemStyles = {
        root: {
            background: DefaultPalette.green,
            color: DefaultPalette.white,
            textAlign: 'left',
            paddingLeft: 10,
        },
    };

    const [GettingStartedOption, setGettingStartedOption] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const [selectedContent, setSelectedContent] = useState(''); // State to store the selected content
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedUrl, setSelectedUrl] = useState('');

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await ConnectPr.getInstance().GetGettingStarted();
                const choiceGroupOptions = response.map((item, index) => ({
                    key: index.toString(),
                    text: item.Title,
                    content: item.Html,
                    htmlOrUrl: item.HtmlOrUrl, // Assuming "HtmlOrUrl" corresponds to the property
                    url: item.Url, // Assuming "Url" corresponds to the property
                }));
                setGettingStartedOption(choiceGroupOptions);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to open the popup with the selected content
    const openPopup = (item) => {
        if (item.htmlOrUrl === 'Html') {
            setSelectedContent(item.content);
            setSelectedTitle(item.text);
            setSelectedUrl('');
            setShowPopup(true);
        } else {
            setSelectedUrl(item.url);
            setSelectedTitle(item.text);
            setSelectedContent('');
            setShowPopup(false);
        }
    };

    // Function to close the popup
    const closePopup = () => {
        setSelectedContent('');
        setSelectedTitle('');
        setSelectedUrl('');
        setShowPopup(false);
    };

    function HTMLRenderer({ htmlContent }) {
        return (
            <div style={{ textAlign: 'left', padding: '16px' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
        );
    }

    return (
        <div>
            <Stack>
                <Stack.Item align="stretch" styles={stackItemStyles}>
                    <p>Getting Started</p>
                </Stack.Item>
                <Stack.Item align="start">
                    <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                        {GettingStartedOption.map((item, index) => (
                            <li key={index}>
                                {item.htmlOrUrl === 'Html' ? (
                                    // Render a link with onClick for HTML content
                                    <a href="#" onClick={() => openPopup(item)}>{item.text}</a>
                                ) : (
                                    // Render a regular hyperlink for other content
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.text}</a>
                                )}
                            </li>
                        ))}
                    </ul>
                </Stack.Item>
            </Stack>
            {/* Modal popup */}
            <Modal
                isOpen={showPopup}
                onDismiss={closePopup}
                isBlocking={false}
            >
                <Stack>
                    <Stack.Item align="stretch" styles={stackItemStyles}>
                        <p>{selectedTitle}</p>
                    </Stack.Item>
                    <Stack.Item align="end"> {/* Move this item to the right */}
                        <IconButton
                            iconProps={{ iconName: 'Cancel' }}
                            ariaLabel="Close"
                            onClick={closePopup}
                        />
                    </Stack.Item>
                    <Stack.Item align="stretch">
                        <div>
                            {/* Display the selected content */}
                            <HTMLRenderer htmlContent={selectedContent} />
                        </div>
                    </Stack.Item>
                </Stack>
            </Modal>
        </div>
    );
};
