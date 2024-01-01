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

        contentType: string
    ) {
        console.log("Here Content Type is ", contentType, base64String);

        // Create a new window or tab

        let newTab = window.open();

        newTab = newTab as Window;

        // Decode the Base64 string to binary data

        const binaryData = atob(base64String);

        // Create a Uint8Array from the binary data

        const uint8Array = new Uint8Array(binaryData.length);

        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the binary data

        const blob = new Blob([uint8Array], { type: contentType });
        // Create a URL for the Blob

        const blobURL = URL.createObjectURL(blob);
        // console.log("---------------->>> ", blobURL);
        // console.log(contentType);
        // console.log(contentType.match("image/"))

        // Create an HTML template to display the content

        const htmlTemplate = `

      <!DOCTYPE html>

      <html>
      <body>

          <div>
            ${contentType.match("image/")
                ? `<img src="${blobURL}" alt="Base64 Content" />`
                : ""
            }
            <pre>${binaryData}</pre>
          </div>
      </body>
      </html>

    `;

        // Write the HTML template to the new tab

        newTab.document.open();

        newTab.document.write(htmlTemplate);

        newTab.document.close();
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
                        onClick={() => openBase64ContentInNewTab(item.Content, item.Doc_Type)}
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
