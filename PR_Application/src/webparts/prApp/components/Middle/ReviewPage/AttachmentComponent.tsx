
import * as React from "react";
import { useEffect } from "react";
import { restApiCall } from "../../../Api/ApiCall";
import { Stack } from "@fluentui/react";
import { DetailsList } from "office-ui-fabric-react";



let columns = [
    {
        key: "column1",
        name: "Doc Type",
        fieldName: "Doc_Type",
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
        key: "column2",
        name: "File Name",
        fieldName: "Filename",
        minWidth: 70,
        maxWidth: 90,
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
        name: "Content",
        fieldName: "Content",
        minWidth: 150,
        maxWidth: 180,
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
        key: "column4",
        name: "Modified By",
        fieldName: "Modified_By",
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
        name: "Modified Date",
        fieldName: "Modified_Date",
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
    }
];



export const AttachmentComponent: React.FunctionComponent<{ConnectPrId:string}> = (props) => {
    const [attachments, setAttachments] = React.useState<any[]>([]);


    useEffect(() => {
        (async () => {
            let value = await restApiCall.getDocTypeurl(props.ConnectPrId);

            // Convert ApprovalDate to MM/DD/YYYY format
            const formattedData = value.map((item: {
                Modified_Date: string | number; 
}) => ({
                ...item,
                Modified_Date: new Date(item.Modified_Date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }),
            }));

            console.log("This is Attachments Info", formattedData);

            setAttachments(formattedData);
        })();
    }, []);


    return (<Stack><Stack><h2>Attachments</h2></Stack><DetailsList items={attachments} columns={columns}></DetailsList></Stack>



    );



}