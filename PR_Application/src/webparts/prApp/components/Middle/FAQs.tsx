import * as React from 'react';
import { IStackItemStyles, Stack } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ConnectPr } from '../../Api/api';
import { useEffect, useState } from 'react';
import { IChoiceGroupOption, Icon } from '@fluentui/react';

export const FAQs: React.FunctionComponent = () => {
    const stackItemStyles: IStackItemStyles = {
        root: {
            background: DefaultPalette.green,
            color: DefaultPalette.white,
            textAlign: 'left',
            paddingLeft: 10,
        },
    };

    const [FAQOption, setFAQOption] = useState([]); // Initialize with an empty array of FAQ items

    useEffect(() => {
        // Use a loading state to indicate that data is being fetched
        const fetchData = async (): Promise<void> => {
            try {
                const response = await ConnectPr.getInstance().GetFAQs();
                const faqItems = response.map((item, index) => ({
                    key: index.toString(),
                    title: item.Title,
                    content: item.Description, // Assuming "Description" corresponds to the content property
                    isOpen: false, // Initialize the accordion state as closed
                }));
                setFAQOption(faqItems);
            } catch (error) {
                console.log('Error fetching data:', error);
                // Handle the error state here (e.g., show an error message)
            }
        };

        fetchData(); // Call the fetchData function
    }, []); // Empty dependency array to run the effect only once

    const toggleAccordion = (key) => {
        setFAQOption((prevState) =>
            prevState.map((item) => ({
                ...item,
                isOpen: item.key === key ? !item.isOpen : item.isOpen,
            }))
        );
    };

    return (
        <Stack>
            <Stack.Item align='stretch' styles={stackItemStyles}>
                <p>We've got Answers</p>
            </Stack.Item>
            <Stack.Item>
                {FAQOption.map((faqItem) => (
                    <FAQAccordionItem
                        key={faqItem.key}
                        title={faqItem.title}
                        content={faqItem.content}
                        isOpen={faqItem.isOpen}
                        onClick={() => toggleAccordion(faqItem.key)}
                    />
                ))}
            </Stack.Item>
        </Stack>
    );
};

// Create a separate FAQAccordionItem component
const FAQAccordionItem: React.FC<{
    title: string;
    content: string;
    isOpen: boolean;
    onClick: () => void;
}> = ({ title, content, isOpen, onClick }) => {
    const stackTitleItemStyles: IStackItemStyles = {
        root: {
            background: DefaultPalette.green,
            color: DefaultPalette.white,
            textAlign: 'left',
            paddingLeft: 10,
        },
    };

    const stackDescItemStyles: IStackItemStyles = {
        root: {
            background: DefaultPalette.white,
            color: DefaultPalette.black,
            textAlign: 'left',
            paddingLeft: 10,
        },
    };

    function HTMLRenderer({ htmlContent }) {
        return (
          <div style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
        );
      }

    return (
        <div>
            <Stack style={{paddingTop:10}}>
                <Stack.Item align='stretch' styles={stackTitleItemStyles}>
                    <div className={`accordion-button ${isOpen ? 'accordion-open' : 'accordion-closed'}`} onClick={onClick}>
                        <Icon iconName={isOpen ? 'ChevronDown' : 'ChevronRight'} />
                        {title}
                    </div>
                </Stack.Item>
                <Stack.Item align='stretch' styles={stackDescItemStyles}>
                    {isOpen && <div className='accordion-content'><HTMLRenderer htmlContent={content}/></div>}
                </Stack.Item>
            </Stack>
        </div>
    );
};
