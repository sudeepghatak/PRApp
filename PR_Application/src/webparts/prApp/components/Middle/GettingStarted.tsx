import * as React from 'react';
import { IStackItemStyles, Stack, Modal, IconButton } from '@fluentui/react/lib/';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ConnectPr } from '../../Api/api';
import { useEffect, useState } from 'react';
import { TableCostCenterMapping } from './TableCostCenterMapping';
import { TableApprovalMapping } from './TableApprovalMapping';

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
    const [selectedContent, setSelectedContent] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedUrl, setSelectedUrl] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await ConnectPr.getInstance().GetGettingStarted();
                const choiceGroupOptions = response.map((item, index) => ({
                    key: index.toString(),
                    text: item.Title,
                    content: item.Html,
                    htmlOrUrl: item.HtmlOrUrl,
                    url: item.Url,
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
        setSelectedTitle(item.text);
        setSelectedType(item.htmlOrUrl);
        setSelectedUrl(item.url);
        setSelectedContent(item.content);
        setShowPopup(true);
    };

    // Function to close the popup
    const closePopup = () => {
        setSelectedContent('');
        setSelectedTitle('');
        setSelectedUrl('');
        setSelectedType('');
        setShowPopup(false);
    };


    const togglePopUp = () => {
        setShowPopup(!showPopup);
    }

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
                                ) : item.htmlOrUrl === 'Url' ? (
                                    // Render a link to an external URL
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.text}</a>
                                ) : item.htmlOrUrl === 'CostCenter' ? (
                                    // Render a link for CostCenter content
                                    <a href="#" onClick={() => openPopup(item)}>{item.text}</a>
                                ) : (
                                    // Render a regular hyperlink for other content
                                    <a href="#" onClick={() => openPopup(item)}>{item.text}</a>
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
                    <Stack.Item align="end">
                        <IconButton
                            iconProps={{ iconName: 'Cancel' }}
                            ariaLabel="Close"
                            onClick={closePopup}
                        />
                    </Stack.Item>
                    <Stack.Item align="stretch">
                        <div>
                            {selectedType === "CostCenter" ? (
                                <TableCostCenterMapping isModalOpen={showPopup} closeModal={closePopup} />
                            ) : selectedType === "ApprovalMapping" ? (
                                <TableApprovalMapping isModalOpen={showPopup} closeModal={closePopup} />
                            ) : (
                                <HTMLRenderer htmlContent={selectedContent} />
                            )}
                        </div>

                    </Stack.Item>
                </Stack>
            </Modal>
        </div>
    );
};
