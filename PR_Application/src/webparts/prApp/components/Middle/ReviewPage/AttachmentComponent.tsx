import * as React from "react";
import { useEffect } from "react";
import { restApiCall } from "../../../Api/ApiCall";
import { Stack } from "@fluentui/react";
import { DetailsList, IStackItemStyles, Link, SelectionMode } from "office-ui-fabric-react";

const stackH1Styles: IStackItemStyles = {
    root: {
        textAlign: 'left',
        marginTop: 0,


    },
};

const columns = [
    {
        key: "column1",
        name: "File Name",
        fieldName: "File_Name",
        minWidth: 100,
        maxWidth: 200,
        styles: {
            root: {
                backgroundColor: "green", // Replace with your desired color
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid", // Replace with your desired text color
            },
        },
    },
    {
        key: "column2",
        name: "Document Type",
        fieldName: "Doc_Type",
        minWidth: 100,
        maxWidth: 150,
        styles: {
            root: {
                backgroundColor: "green", // Replace with your desired color
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid", // Replace with your desired text color
            },
        },
    },
    {
        key: "column3",
        name: "Modified By",
        fieldName: "Modified_By",
        minWidth: 150,
        maxWidth: 200,
        styles: {
            root: {
                backgroundColor: "green", // Replace with your desired color
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid", // Replace with your desired text color
            },
        },
    },
    {
        key: "column4",
        name: "Modified Date",
        fieldName: "Modified_Date",
        minWidth: 150,
        maxWidth: 200,
        styles: {
            root: {
                backgroundColor: "green", // Replace with your desired color
                color: "white",
                borderRightColor: "white", // Set the right border color to white
                borderRightWidth: "1px", // Optional: Adjust the border width if needed
                borderRightStyle: "solid", // Replace with your desired text color
            },
        },
    }
];

export const AttachmentComponent: React.FunctionComponent<{ ConnectPrId: string }> = (props) => {
    const [attachments, setAttachments] = React.useState<any[]>([]);

    function openBase64ContentInNewTab(
        base64String: string,
        contentType: string,
        fileName: string
    ) {
        console.log("Here Content Type is ", contentType, base64String);
        const linkSource = "data:application/png;base64," + base64String;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

       
    }

    useEffect(() => {
        (async () => {
            let value = await restApiCall.getDocTypeurl(props.ConnectPrId);

            // Convert ApprovalDate to MM/DD/YYYY format
            const formattedData = value.map((item: { Modified_Date: string | number; Content: string; Doc_Type: string; Filename: any; }) => ({
                ...item,
                Modified_Date: new Date(item.Modified_Date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }),
                File_Name: (
                    <Link
                        onClick={() => openBase64ContentInNewTab(item.Content, item.Doc_Type, item.Filename)}
                        disabled={false}
                    >
                        <b>{item.Filename}</b>
                    </Link>
                ),
            }));

          

            setAttachments(formattedData);
        })();
    }, [props.ConnectPrId]);

    return (
        <Stack>
            <Stack styles={stackH1Styles}><h2>Attachments</h2></Stack>
            <DetailsList selectionMode={SelectionMode.none} compact={true} items={attachments} columns={columns} />
        </Stack>
    );
};
