

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
        background: DefaultPalette.white,
        color: DefaultPalette.black,
        display: 'flex',
        height: 50,
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



export const RequestHeader: React.FunctionComponent<{ PrId: string }> = (props) => {

    const { PrId } = props;

    const [prRow, setPrRow] = React.useState<any>({});


    useEffect(() => {
        (async () => {



            let value = await restApiCall.getPrbasicInfoContent(PrId);
            console.log("This is the message")
            console.log("This is PR Info", value);


            setPrRow(value);
        })();
    }, [props.PrId]);


    return (<Stack enableScopedSelectors tokens={outerStackTokens}>
        <Stack enableScopedSelectors styles={stackStyles} tokens={innerStackTokens}>
            <Stack styles={stackH1Styles}>
                <h2>Procurement Request Details</h2>
            </Stack>

            {/* Horizontal Stack for Groups */}
            <Stack horizontal styles={{ root: { width: '100%' } }}>
                {/* Group 1 */}
                <Stack grow={1}>
                    <Stack.Item styles={stackItemStyles}>Connect PRID</Stack.Item>
                    <Stack.Item styles={stackItemValueStyles}>{prRow.ConnectPRID || 'N/A'}</Stack.Item>

                    <Stack.Item styles={stackItemStyles}>Company Code</Stack.Item>
                    <Stack.Item styles={stackItemValueStyles}>{prRow.CompanyCode || 'N/A'}</Stack.Item>

                    <Stack.Item styles={stackItemStyles}>Type of Buy</Stack.Item>
                    <Stack.Item styles={stackItemValueStyles}>{prRow.Type_Of_Buy || 'N/A'}</Stack.Item>
                </Stack>

                {/* Group 2 */}
                <Stack grow={1}>
                    <Stack.Item styles={stackItemStyles}>Requester</Stack.Item>
                    <Stack.Item styles={stackItemValueStyles}>{prRow.RequestFor || 'N/A'}</Stack.Item>

                    <Stack.Item styles={stackItemStyles}>Cost Center</Stack.Item>
                    <Stack.Item styles={stackItemValueStyles}>{prRow.Cost_Center || 'N/A'}</Stack.Item>

                    <Stack.Item styles={stackItemStyles}>Prepaid or Capital Equipment Buy?</Stack.Item>
                    <Stack.Item styles={stackItemValueStyles}>{prRow.PrepaidOrCapitalEquipment || 'N/A'}</Stack.Item>
                </Stack>

                {/* Group 3 */}
                <Stack grow={1}>
                    <Stack.Item styles={stackItemStyles}>Total Order Amount</Stack.Item>
                    <Stack.Item styles={stackItemValueStyles}>{prRow.Order_Amount || 'N/A'}</Stack.Item>

                    <Stack.Item styles={stackItemStyles}>CIP Number</Stack.Item>
                    <Stack.Item styles={stackItemValueStyles}>{prRow.CIP_Number || 'N/A'}</Stack.Item>

                    <Stack.Item styles={stackItemStyles}>Type of Purchase</Stack.Item>
                    <Stack.Item styles={stackItemValueStyles}>{prRow.Type_Of_Order || 'N/A'}</Stack.Item>
                </Stack>
            </Stack>
        </Stack>




        <Stack styles={stackH1Styles}><h1>Additional Info</h1>
            <Stack enableScopedSelectors styles={stackStyles} tokens={innerStackTokens}>
                <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={stackTokens}>
                    <Stack grow={1}><Stack.Item  styles={stackItemStyles}>
                        Is This Project Related?
                    </Stack.Item> <Stack.Item  styles={stackItemValueStyles}>
                            {prRow.IsProjectPR ? "Yes" : "No"}
                        </Stack.Item> <Stack.Item  styles={stackItemStyles}>
                            Vendor Number
                        </Stack.Item><Stack.Item  styles={stackItemValueStyles}>
                            {prRow.Supplier_Account_Number || 'N/A'}
                        </Stack.Item><Stack.Item  styles={stackItemStyles}>
                            Justification/Reason for Order
                        </Stack.Item> <Stack.Item  styles={stackItemValueStyles}>
                            {prRow.Title || 'N/A'}
                        </Stack.Item></Stack>
                    <Stack ><Stack.Item  styles={stackItemStyles}>
                        Project Department (Project Code)
                    </Stack.Item><Stack.Item  styles={stackItemValueStyles}>
                            {prRow.ProjectCode || 'N/A'}
                    </Stack.Item><Stack.Item  styles={stackItemStyles}>
                        Vendor Name
                        </Stack.Item><Stack.Item styles={stackItemValueStyles}>
                            {prRow.Supplier_Name || 'N/A'}
                        </Stack.Item><Stack.Item styles={stackItemStyles}>
                            Special Instructions
                        </Stack.Item><Stack.Item styles={stackItemValueStyles}>
                            {prRow.Comments || 'N/A'}
                        </Stack.Item></Stack>

                    

                </Stack>
                

            </Stack>
        </Stack>



    </Stack>

    )
}


