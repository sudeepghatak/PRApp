import * as React from 'react'
import { Stack} from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react';
import { mergeStyles,DefaultPalette} from '@fluentui/react/lib/Styling';
import { DefaultButton, IStackStyles } from 'office-ui-fabric-react';


interface IFourthprops {
  buttonContxtBack: () => void;
}


const FourthComponent: React.FunctionComponent<IFourthprops> = (props) => {

  const {buttonContxtBack} = props;
    const stackItemStyles = mergeStyles({
        alignItems: 'center',
        background: DefaultPalette.black,
        color: DefaultPalette.white,
        display: 'flex',
        height: 50,
        justifyContent: 'flex-start',
        // blockSize: "10px"

      });

    const col2Style: IStackStyles = {
    root: {
      padding: "0px",
      textAlign: "left",
      width: "70%",
      color:'Black',
      fontsize: "10px",
      marginTop: "10px",
    },
  };
   const col1Style: IStackStyles = {
    root: {
      padding: "10px",
      textAlign: "right",
      width: "30%",
      fontsize: "10px",
      color:'green'
    },
  };
  const col1StyleSingleLine : IStackStyles = {
    root: {
      padding: "10px",
      textAlign: "right",
      fontsize: "10px",
      marginRight:" 0px",
      color:'green',
      width: "18%"
    },
  };


  return (
     <div>
        <Stack>
        <Stack tokens={{ childrenGap: 15 }}>
          <Stack tokens={{ childrenGap: 10 }}>
            <Stack horizontal horizontalAlign="space-between">
              <span>
                <DefaultButton
                  style={{
                    background: DefaultPalette.whiteTranslucent40,
                    color: DefaultPalette.blue,
                    borderRadius: 5,
                    height: "40px",
                  }}
                  onClick={() => buttonContxtBack()}
                >
                  <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <Icon iconName="Back" />
                    </span>
                    <span>Back</span>
                  </Stack>
                </DefaultButton>
              </span>
           </Stack>
          
           <Stack>
              <span className={stackItemStyles}>Review - Order Details <Icon iconName="Question"   styles={{
                root: {
                  borderRadius: '50%',
                  backgroundColor: 'gray',
                  padding: '8px',
                  color:"black"
                },
              }}/> 
             </span>              
          </Stack>
          </Stack>

          <Stack horizontal horizontalAlign="space-between">
             <Stack.Item grow={4}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Type of Buy: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <div> Expense Buy </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={4}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Prepaid or Capital buy? </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <div>Expense </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
          </Stack>
     {/* ----------------------------------------------------------------------- */}
            <Stack >
             <Stack.Item grow={4}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1StyleSingleLine}>
                      <div>Type of Purchase: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <div> Consulting; Other; </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
     {/* ----------------------------------------------------------------------- */}

          <Stack horizontal horizontalAlign="space-between">
             <Stack.Item grow={4}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1StyleSingleLine}>
                      <div>Is this Project Related?: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <div> Yes </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={4}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>	Project Code: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <div>Engineering (ACP.DAP) </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
          </Stack>
     {/* ----------------------------------------------------------------------- */}
         <Stack >
             <Stack.Item grow={4}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Is this EHS relevant?:</div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <div> No </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
     {/* ----------------------------------------------------------------------- */}

        </Stack>
        </Stack>
    
      </div>
  )
}

export default FourthComponent