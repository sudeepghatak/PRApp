import * as React from "react";
import { useEffect } from "react";
import { restApiCall } from "../../../Api/ApiCall";
import { Stack } from '@fluentui/react/lib/Stack';
import { List } from '@fluentui/react/lib/List';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';



export const PendingApprovals: React.FunctionComponent = (props) => {
    const [approvalLogData, setApprovalLogData] = React.useState<any[]>([]);

    useEffect(() => {
        (async () => {
            let value = await restApiCall.getApprovalLog("490");

            // Convert ApprovalDate to MM/DD/YYYY format
            const formattedData = value.map((item: { ApprovalDate: string | number; }) => ({
                ...item,
                ApprovalDate: new Date(item.ApprovalDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),
            }));

            setApprovalLogData(formattedData);
        })();
    }, []);

    const classNames = mergeStyleSets({
        card: {
            padding: '10px',
            margin: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            textAlign: 'left'
        },
    });

    const renderItem = (item: { ConnectPRID: any; ApprovalType: any; ApproverEmail: any; ApprovalDate: any; }) => {
        return (
            <div className={classNames.card}>
                <Stack>
                    <Stack horizontal>
                        <Stack.Item grow={1}>Connect PRID</Stack.Item>
                        <Stack>{item.ConnectPRID}</Stack>
                    </Stack>

                    <Stack horizontal>
                        <Stack.Item grow={1}>Type</Stack.Item>
                        <Stack>{item.ApprovalType}</Stack>
                    </Stack>

                    <Stack horizontal>
                        <Stack.Item grow={1}>Approver</Stack.Item>
                        <Stack>{item.ApproverEmail}</Stack>
                    </Stack>

                    <Stack horizontal>
                        <Stack.Item grow={1}>Date</Stack.Item>
                        <Stack>{item.ApprovalDate}</Stack>
                        
                    </Stack>
                    <Stack>Click here to Approve/Reject</Stack>
                </Stack>
            </div>
        );
    };

    return <List items={approvalLogData} onRenderCell={renderItem} />;
};


