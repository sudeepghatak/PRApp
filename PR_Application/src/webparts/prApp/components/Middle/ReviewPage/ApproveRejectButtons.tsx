import { DefaultButton, DefaultPalette, Stack } from "office-ui-fabric-react";
import * as React from "react";

interface ApproveRejectButtonsProps {
    ApprovalId: string;
    PrId: string;
    HideButtons: boolean;
}

export const ApproveRejectButtons: React.FunctionComponent<ApproveRejectButtonsProps> = (props) => {
    const [hideButtons, setHideButton] = React.useState<boolean>(true);

    React.useEffect(() => {
        setHideButton(props.HideButtons);
    }, [props.HideButtons]);


    function ApproveOrReject(outcome: string): void {
       //Call Flow API
        setHideButton(true)
    }

    return (<Stack>{!hideButtons ?
        <Stack horizontal horizontalAlign="end"><DefaultButton
            style={{
                background: DefaultPalette.greenDark,
                color: DefaultPalette.white,
                borderRadius: 5,
                height: "40px",
                margin: 5
            }}
            onClick={() => ApproveOrReject("Approved")}
        >
            <Stack horizontal>
                <span style={{ marginRight: 10, marginTop: 2 }}>
                    Approve
                </span>

            </Stack>
        </DefaultButton>
            <DefaultButton
                style={{
                    background: DefaultPalette.red,
                    color: DefaultPalette.white,
                    borderRadius: 5,
                    height: "40px",
                    margin: 5
                }}
                onClick={() => ApproveOrReject("Rejected")}
            >
                <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                        Reject
                    </span>

                </Stack>
            </DefaultButton>
            <DefaultButton
                style={{
                    background: DefaultPalette.blue,
                    color: DefaultPalette.white,
                    borderRadius: 5,
                    height: "40px",
                    margin: 5
                }}
                onClick={() => ApproveOrReject("Resend")}
            >
                <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                        Resend
                    </span>

                </Stack>
            </DefaultButton></Stack> : ( hideButtons && (
                <Stack>
                    <h4>This task has already been processed, or you may not have been assigned to it</h4>
                </Stack>
            )) }</Stack>)
}