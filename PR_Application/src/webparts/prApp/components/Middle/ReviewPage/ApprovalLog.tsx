
import * as React from "react";
import { useEffect } from "react";
import { restApiCall } from "../../../Api/ApiCall";
import {  Stack } from "@fluentui/react";
import { DetailsList, IStackItemStyles } from "office-ui-fabric-react";


const stackH1Styles: IStackItemStyles = {
    root: {
        textAlign: 'left',
        marginTop: 0,


    },
};

let columns = [
    {
        key: "column1",
        name: "Level",
        fieldName: "ApprovalType",
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
        name: "Approver",
        fieldName: "ApproverEmail",
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
        name: "Status",
        fieldName: "ApprovalStatus",
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
        key: "column4",
        name: "Date",
        fieldName: "ApprovalDate",
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



export const ApprovalLog: React.FunctionComponent<{PrId:string}> = (props) => {
    const [approvalLogData, setApprovalLogData] = React.useState<any[]>([]);
    const {PrId}= props;
    useEffect(() => {
        (async () => {
            let value = await restApiCall.getApprovalLog(PrId);

            // Convert ApprovalDate to MM/DD/YYYY format
            const formattedData = value.map((item: { ApprovalDate: string | number; }) => ({
                ...item,
                ApprovalDate: new Date(item.ApprovalDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),
            }));

            console.log("This is Approval Info", formattedData);

            setApprovalLogData(formattedData);
        })();
    }, []);


    return (<Stack styles={stackH1Styles}><h2>Approval Log</h2><DetailsList items={approvalLogData} columns={columns}></DetailsList></Stack>
        


    );



}