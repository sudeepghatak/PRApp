import * as React from "react";
import { restApiCall } from "../../../Api/ApiCall";
import { Stack } from "@fluentui/react";
import { DetailsList, IStackItemStyles, SelectionMode } from "office-ui-fabric-react";
import { useEffect } from "react";

const stackH1Styles: IStackItemStyles = {
    root: {
        textAlign: 'left',
        marginTop: 0,


    },
};


let columns = [
    {
        key: "column1",
        name: "Project",
        fieldName: "ProjCode",
        minWidth: 80,
        maxWidth: 100,
        isResizable: true,
        styles: {
            root: {
                backgroundColor: "green",
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid",
                selectors: {
                    ":hover": {
                        backgroundColor: "green", // Change the background color on hover
                        cursor: "pointer",
                        color: "white",
                        // Optional: Show a pointer cursor on hover
                    },
                },
            },
        },
    },
    {
        key: "column2",
        name: "Description",
        fieldName: "ItemDescription",
        minWidth: 150,
        maxWidth: 180,
        isResizable: true,
        styles: {
            root: {
                backgroundColor: "green",
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid",
                selectors: {
                    ":hover": {
                        backgroundColor: "green", // Change the background color on hover
                        cursor: "pointer",
                        color: "white",
                        // Optional: Show a pointer cursor on hover
                    },
                },
            },
        },
    },
    {
        key: "column3",
        name: "Cost Center",
        fieldName: "Cost_Center",
        minWidth: 50,
        maxWidth: 80,
        isResizable: true,
        styles: {
            root: {
                backgroundColor: "green",
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid",
                selectors: {
                    ":hover": {
                        backgroundColor: "green", // Change the background color on hover
                        cursor: "pointer",
                        color: "white",
                        // Optional: Show a pointer cursor on hover
                    },
                },
            },
        },
    },
    {
        key: "column4",
        name: "Date",
        fieldName: "DateRequired",
        minWidth: 50,
        maxWidth: 80,
        data: "string",
        isResizable: true,
        styles: {
            root: {
                backgroundColor: "green",
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid",
                selectors: {
                    ":hover": {
                        backgroundColor: "green", // Change the background color on hover
                        cursor: "pointer",
                        color: "white",
                        // Optional: Show a pointer cursor on hover
                    },
                },
            },
        },
    },
    {
        key: "column5",
        name: "GL Account",
        fieldName: "GL_Account",
        minWidth: 50,
        maxWidth: 80,
        data: "string",
        isResizable: true,
        styles: {
            root: {
                backgroundColor: "green",
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid",
                selectors: {
                    ":hover": {
                        backgroundColor: "green", // Change the background color on hover
                        cursor: "pointer",
                        color: "white",
                        // Optional: Show a pointer cursor on hover
                    },
                },
            },
        },
    },
    {
        key: "column6",
        name: "Quantity",
        fieldName: "Qty",
        minWidth: 50,
        maxWidth: 80,
        data: "string",
        isResizable: true,
        styles: {
            root: {
                backgroundColor: "green",
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid",
                selectors: {
                    ":hover": {
                        backgroundColor: "green", // Change the background color on hover
                        cursor: "pointer",
                        color: "white",
                        // Optional: Show a pointer cursor on hover
                    },
                },
            },
        },
    },
    {
        key: "column7",
        name: "UOM",
        fieldName: "UOM",
        minWidth: 50,
        maxWidth: 80,
        data: "string",
        isResizable: true,
        styles: {
            root: {
                backgroundColor: "green",
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid",
                selectors: {
                    ":hover": {
                        backgroundColor: "green", // Change the background color on hover
                        cursor: "pointer",
                        color: "white",
                        // Optional: Show a pointer cursor on hover
                    },
                },
            },
        },
    },
    {
        key: "column8",
        name: "Unit Price($)",
        fieldName: "Unit_Price",
        minWidth: 50,
        maxWidth: 80,
        data: "string",
        isResizable: true,
        styles: {
            root: {
                backgroundColor: "green",
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid",
                selectors: {
                    ":hover": {
                        backgroundColor: "green", // Change the background color on hover
                        cursor: "pointer",
                        color: "white",
                        // Optional: Show a pointer cursor on hover
                    },
                },
            },
        },
    },
    {
        key: "column9",
        name: "Unit Price Per",
        fieldName: "UnitPricePer",
        minWidth: 50,
        maxWidth: 80,
        data: "string",
        isResizable: true,
        styles: {
            root: {
                backgroundColor: "green",
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid",
                selectors: {
                    ":hover": {
                        backgroundColor: "green", // Change the background color on hover
                        cursor: "pointer",
                        color: "white",
                        // Optional: Show a pointer cursor on hover
                    },
                },
            },
        },
    },
    {
        key: "column10",
        name: "Total Amount ($)",
        fieldName: "Amount",
        minWidth: 50,
        maxWidth: 80,
        data: "string",
        isResizable: true,
        styles: {
            root: {
                backgroundColor: "green",
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid",
                selectors: {
                    ":hover": {
                        backgroundColor: "green", // Change the background color on hover
                        cursor: "pointer",
                        color: "white",
                        // Optional: Show a pointer cursor on hover
                    },
                },
            },
        },
    },
];

export const LineItemDetails: React.FunctionComponent<{PrId:string}> = (props) => {
    const [lineItemData, setLineItemData] = React.useState<any[]>([]);
const {PrId}=props;

    useEffect(() => {
        (async () => {
            let value = await restApiCall.getPrlineItemContent(PrId);

            // Convert ApprovalDate to MM/DD/YYYY format
            const formattedData = value.map((item: { DateRequired: string | number; }) => ({
                ...item,
                DateRequired: new Date(item.DateRequired).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),
            }));

            console.log("This is Line Items Info", formattedData);

            setLineItemData(formattedData);
        })();
    }, []);


    return (<Stack styles={stackH1Styles}><h2>Line Item Details</h2><DetailsList selectionMode={SelectionMode.none} compact={true} items={lineItemData} columns={columns}></DetailsList></Stack>
    )

}