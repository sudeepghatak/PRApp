import * as React from "react";
import { useEffect } from "react";
import { restApiCall } from "../../../Api/ApiCall";
import { IStackItemStyles, Stack } from '@fluentui/react/lib/Stack';
import { List } from '@fluentui/react/lib/List';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { RequestAndApprovalComponent } from "./RequestAndApprovalComponent";
import { Link } from "office-ui-fabric-react";
import { GlobalStore } from "../../../../../app/globalStore";



export const PendingApprovals: React.FunctionComponent<{ Email: string }> = (props) => {
    const [approvalLogData, setApprovalLogData] = React.useState<any[]>([]);
    const [isModalOpen, setisModalOpen] = React.useState<boolean>(false);
    const [launchApprovalScreenParams, setlaunchApprovalScreen] = React.useState<{ PRId: string, ApprovalId: string }>({ PRId: "", ApprovalId: "" });
    const showModal = () => {
        setisModalOpen(!isModalOpen);
    };

    function onClickingPRLink(prId: string, approvalId: string): void {
        console.log("21 21 21 ", prId, approvalId)
        setlaunchApprovalScreen({ PRId: prId, ApprovalId: approvalId });
        showModal()
        console.log("----------24")
    }


    useEffect(() => {
        (async () => {
            let value = await restApiCall.getPendingApprovalsByEmail(props.Email);

            // Convert ApprovalDate to MM/DD/YYYY format
            const formattedData = value.map((item: {
                ApprovalID: string;
                ConnectPRID: string; ApprovalDate: string | number;
            }) => ({
                ...item,
                ApprovalDate: new Date(item.ApprovalDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),
                LinkToPR: <Link
                    onClick={() => onClickingPRLink(item.ConnectPRID, item.ApprovalID)}
                    disabled={false}
                >
                    <b>{item.ConnectPRID}</b>
                </Link>
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

    const stackH1Styles: IStackItemStyles = {
        root: {
            textAlign: 'left',
            marginRight: 10,
            fontWeight: "bold"

        },
    };

    const renderItem = (item: {
        LinkToPR: any; ApprovalID: number; ConnectPRID: any; ApprovalType: any; ApproverEmail: any; ApprovalDate: any;
    }) => {
        console.log("isModel Open ", isModalOpen)
        return (
            <div className={classNames.card}>
                <Stack>
                    <Stack horizontal>
                        <Stack.Item styles={stackH1Styles}>Approval ID: </Stack.Item>
                        <Stack.Item>{item.ApprovalID}</Stack.Item>
                    </Stack>
                    <Stack horizontal>
                        <Stack.Item styles={stackH1Styles}>PR #: </Stack.Item>
                        <Stack.Item>{item.LinkToPR}</Stack.Item>
                    </Stack>

                    <Stack horizontal>
                        <Stack.Item styles={stackH1Styles}>Type: </Stack.Item>
                        <Stack>{item.ApprovalType}</Stack>
                    </Stack>

                    <Stack horizontal>
                        <Stack.Item styles={stackH1Styles}>Date assigned: </Stack.Item>
                        <Stack.Item>{item.ApprovalDate}</Stack.Item>

                    </Stack>

                </Stack>

                <Stack>

                </Stack>
            </div>
        );
    };

    return <>
        {isModalOpen ? (<RequestAndApprovalComponent userEmail={GlobalStore.getmainEmail()} isModalOpen={isModalOpen} showModal={showModal} PrId={launchApprovalScreenParams.PRId} ApprovalId={launchApprovalScreenParams.ApprovalId} />) : null}
        <List items={approvalLogData} onRenderCell={renderItem} /></>;
};




