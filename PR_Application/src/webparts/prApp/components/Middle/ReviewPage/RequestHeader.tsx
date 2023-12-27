

import { DefaultPalette, IStackStyles, IStackTokens, Stack } from "@fluentui/react";
import * as React from "react";
import { restApiCall } from "../../../Api/ApiCall";
import { useEffect } from "react";
import { IStackItemStyles } from "office-ui-fabric-react";


const stackStyles: IStackStyles = {
    root: {
        background: DefaultPalette.white,

    },
};




const stackItemStyles: IStackItemStyles = {
    root: {
        alignItems: 'center',
        background: DefaultPalette.green,
        color: DefaultPalette.white,
        display: 'flex',
        height: 50,
        paddingLeft: 5
    },
};

const stackH1Styles: IStackItemStyles = {
    root: {
        textAlign: 'left',
        marginTop: 0,


    },
};

const stackItemValueStyles: IStackItemStyles = {
    root: {
        alignItems: 'center',
        background: DefaultPalette.red,
        color: DefaultPalette.black,
        display: 'flex',
        paddingLeft: 5
    },
};

// Tokens definition
const stackTokens: IStackTokens = {
    childrenGap: 5,
    padding: 0,
};
// Tokens definition
const outerStackTokens: IStackTokens = { childrenGap: 10 };
const innerStackTokens: IStackTokens = {
    childrenGap: 5,
    padding: 2,
};

interface RequestHeaderParams{
    PrId: string, 
    Message: string
}

export const RequestHeader: React.FunctionComponent<RequestHeaderParams> = (props) => {

    const{PrId,Message}=props;
   
    const [prRow, setPrRow] = React.useState<any>({});
    ;

    useEffect(() => {
        (async () => {
            let value = await restApiCall.getPrbasicInfoContent(PrId);
            console.log("This is the message",Message)
            console.log("This is PR Info", value);

            setPrRow(value);
        })();
    }, []);


    return (<Stack enableScopedSelectors tokens={outerStackTokens}>
        <Stack enableScopedSelectors styles={stackStyles} tokens={innerStackTokens}>
            <Stack styles={stackH1Styles}>  <h2>PR Info</h2></Stack>
            <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens} >
                <Stack.Item grow={1} styles={stackItemStyles}>
                    Connect PRID
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemStyles}>
                    Requester
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemStyles}>
                    Total Order Amount
                </Stack.Item>
            </Stack>
            <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                <Stack.Item grow={1} styles={stackItemValueStyles}>
                    {prRow.ConnectPRID}
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemValueStyles}>
                    {prRow.RequestFor}
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemValueStyles}>
                    ({prRow.RequesterCurrency}) {prRow.Order_Amount}
                </Stack.Item>
            </Stack>
            <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                <Stack.Item grow={1} styles={stackItemStyles}>
                    Company Code
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemStyles}>
                    Cost Center
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemStyles}>
                    CIP Number
                </Stack.Item>
            </Stack>
            <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                <Stack.Item grow={1} styles={stackItemValueStyles}>
                    {prRow.CompanyCode}
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemValueStyles}>
                    {prRow.Cost_Center}
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemValueStyles}>
                    {prRow.CIP_Number}
                </Stack.Item>
            </Stack>
            <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                <Stack.Item grow={1} styles={stackItemStyles}>
                    Type of Buy
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemStyles}>
                    Prepaid or Capital Equipment Buy?
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemStyles}>
                    Type of Purchase
                </Stack.Item>
            </Stack>
            <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                <Stack.Item grow={1} styles={stackItemValueStyles}>
                    {prRow.Type_Of_Buy}
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemValueStyles}>
                    {prRow.PrepaidOrCapitalEquipment}
                </Stack.Item>
                <Stack.Item grow={1} styles={stackItemValueStyles}>
                    {prRow.Type_Of_Order}
                </Stack.Item>
            </Stack>

        </Stack>




        <Stack styles={stackH1Styles}><h1>Additional Info</h1>
            <Stack enableScopedSelectors styles={stackStyles} tokens={innerStackTokens}>
                <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                    <Stack.Item grow={1} styles={stackItemStyles}>
                        Is This Project Related?
                    </Stack.Item>
                    <Stack.Item grow={1} styles={stackItemStyles}>
                        Project Department (Project Code)
                    </Stack.Item>

                </Stack>
                <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                    <Stack.Item grow={1} styles={stackItemValueStyles}>
                        {prRow.IsProjectPR ? "Yes" : "No"}
                    </Stack.Item>

                    <Stack.Item grow={1} styles={stackItemValueStyles}>
                        {prRow.ProjectCode}
                    </Stack.Item>

                </Stack>
                <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                    <Stack.Item grow={1} styles={stackItemStyles}>
                        Vendor Number
                    </Stack.Item>
                    <Stack.Item grow={1} styles={stackItemStyles}>
                        Vendor Name
                    </Stack.Item>

                </Stack>
                <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                    <Stack.Item grow={3} styles={stackItemValueStyles}>
                        {prRow.Supplier_Account_Number}
                    </Stack.Item>
                    <Stack.Item grow={2} styles={stackItemValueStyles}>
                        {prRow.Supplier_Name}
                    </Stack.Item>

                </Stack>
                <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                    <Stack.Item grow={3} styles={stackItemStyles}>
                        Justification/Reason for Order
                    </Stack.Item>
                    <Stack.Item grow={2} styles={stackItemStyles}>
                        Special Instructions
                    </Stack.Item>

                </Stack>
                <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                    <Stack.Item grow={3} styles={stackItemValueStyles}>
                        {prRow.Title}
                    </Stack.Item>
                    <Stack.Item grow={2} styles={stackItemValueStyles}>
                        {prRow.Comments}
                    </Stack.Item>

                </Stack>

            </Stack>
        </Stack>



    </Stack>

    )
}


