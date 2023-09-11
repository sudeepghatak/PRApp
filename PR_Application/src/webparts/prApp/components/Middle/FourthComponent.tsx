import * as React from 'react'
import { Stack} from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react';
import { mergeStyles,DefaultPalette} from '@fluentui/react/lib/Styling';
import { DefaultButton, IStackStyles, Link } from 'office-ui-fabric-react';
import './StyleFourthComponent.css'


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
        blockSize: "20px"

      });

    const BlockSize: IStackStyles = {
    root: {
        blocksize: "12px",
        fontsize: "10px"
    },
  };

    const col2Style: IStackStyles = {
    root: {
      padding: "0px",
      textAlign: "left",
      width: "70%",
      color:'Black',
      fontsize: "10px",
      marginTop: "10px",
      blocksize: "10px"
    },
  };
   const col1Style: IStackStyles = {
    root: {
      padding: "10px",
      textAlign: "left",
      width: "30%",
      fontsize: "10px",
      color:'green',
      blocksize: "10px"
    },
  };
  const col1StyleSingleLine : IStackStyles = {
    root: {
      padding: "10px",
      textAlign: "left",
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
              <span className={stackItemStyles}> Review - Order Details <Icon iconName="Question"   styles={{
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
          {/* <div className='button-border-end'> */}
          <Stack horizontal horizontalAlign="space-between"  styles={BlockSize} >
             <Stack.Item grow={20}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='heading'>Type of Buy </div>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={0}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='heading'>
                        <Link href="" underline>
                          View PR Approvals Needed
                       </Link>
                     </div>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
          </Stack>
          {/* </div> */}
  {/* --------------------------------------------------------------------------------- */}
         <div className='button-border-end'>
          <Stack horizontal horizontalAlign="space-between" >
            <Stack.Item grow={5} >
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div className='text-heading' >Type of Buy: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <div className='text-des'> Expense Buy </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'>Prepaid or Capital buy? </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <div className='text-des'>Expense </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
          </Stack>
        </div>
{/* ----------------------------------------------------------------------- */}
            <Stack styles={BlockSize} >
             <Stack.Item grow={10}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading' >Type of Purchase: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des'> Consulting; Other; </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
     {/* ----------------------------------------------------------------------- */}

          <Stack horizontal horizontalAlign="space-between" styles={BlockSize}>
             <Stack.Item grow={10}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'> Is this Project Related?: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des'> Yes </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={10}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item>
                      <div  className='text-heading'>Project Code: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des' >Engineering (ACP.DAP) </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
          </Stack>
     {/* ----------------------------------------------------------------------- */}
         <Stack styles={BlockSize}>
             <Stack.Item grow={10}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'> Is this EHS relevant?:</div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des' > No </div>
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