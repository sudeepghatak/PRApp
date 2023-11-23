import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { IStackStyles, Link, Stack } from "office-ui-fabric-react";
import '../StyleFourthComponent.css';
import { GlobalStore } from "../../../../../app/globalStore";
import { useEffect, useState } from "react";
import { restApiCall } from "../../../Api/ApiCall";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchStatusContent } from "../../../../../features/reducers/statusSlice";
import LineDetails from "./LineDetails";
import Attachment from "./Attachment";

export const Type_of_buy: React.FunctionComponent = () => {
 const basicInfo = useSelector(
    (state: RootState) => state.statusreducer.basicInfo
  );
  console.log("Basic info ", basicInfo);
const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

const BlockSize: IStackStyles = {
    root: {
        blocksize: "12px",
        fontsize: "10px"
    },
  };
  const AtttachStyle:IStackStyles = {
    root: {
        marginBottom: "20px",
        marginTop: "20px"
    }
}


// useEffect(()=>{
//   dispatch(fetchStatusContent(GlobalStore.getPrId()));
  
// },[])

  return(
    <>
{/* --------------------------------------------------------------------------------- */}
      <div className='button-border-end '>
        <div className='borderline'>
          <Stack horizontal horizontalAlign="space-between" >
            <Stack.Item grow={5} >
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div className='text-heading' >Type of Buy: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <div className='text-des'>{basicInfo.Type_Of_Buy}</div>
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
                        <div className='text-des'>{basicInfo.Prepaid_or_Capital_buy} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
          </Stack>
          </div>
        </div>
{/* ----------------------------------------------------------------------- */}
          <div className='single-button-border-end '>
            <div className='singleborderline'>
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading' >Type of Purchase: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des'> {basicInfo.Type_of_Order} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </div>
            </div>
     {/* ----------------------------------------------------------------------- */}
      <div className='button-border-end '>
        <div className='borderline'>
          <Stack horizontal horizontalAlign="space-between" >
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'> Is this Project Related?: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des'> {basicInfo.Is_this_Project_Related} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item>
                      <div  className='text-heading'>Project Code: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des' >{basicInfo.Project_Code} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
            </div>
          </div>
     {/* ----------------------------------------------------------------------- */}
        <div className='single-button-border-end '>
          <div className='singleborderline'>
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'> Is this EHS relevant?:</div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des' > {basicInfo.EHS_Relevant} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </div>
            </div>
      {/* --------------------------------------------------------------------------------- */}
       <div className='button-border-end '>
        <div className='borderline'>
          <Stack horizontal horizontalAlign="space-between" >
            <Stack.Item grow={5} >
                  <Stack horizontal horizontalAlign="baseline">
                     <Stack.Item >
                     <div className='text-heading'>
                        <Link href="" underline>
                          Total Order Amount in ({GlobalStore.getChngCurr()}): {GlobalStore.getTotal()}
                       </Link>
                     </div>
                    </Stack.Item>
                    
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      {/* <div  className='text-des'>Total Order Amount in (CHF): (CHF)80.00 </div> */}
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
          </Stack>
          </div>
        </div>
    {/* ----------------------------------------------------------------------- */}
    <div className='button-border-end ss-btn-border'>
          <Stack horizontal horizontalAlign="space-between"  styles={BlockSize} >
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='heading'>Requested Items</div>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
          </div>
{/* --------------------------------------------------------------------------------- */}
{/* //------------------------------------------------------------------------------ */}
   <Stack style={{marginTop: "28px"}}>
    <div>
          {basicInfo.lineInfoList.length !== 0 ? (
            <>
              {basicInfo.lineInfoList.map((lineinfoItem) => {
                console.log("lineinfoItem:::", lineinfoItem);
                return( 
                <LineDetails  
                  newlineinfoItem={lineinfoItem} 
                  isPrepaidorExpense={basicInfo.Prepaid_or_Capital_buy} 
                />)
              })}
            </>
          ) : null}
        </div>
      </Stack> 
    {/* ----------------------------------------------------------------------- */}
    <div className='button-border-end ss-btn-border'>
          <Stack horizontal horizontalAlign="space-between"  styles={BlockSize} >
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='heading'>Attachments</div>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
          </div>
{/* --------------------------------------------------------------------------------- */}
{/* --------------------------------------------------------------------------------- */}
    <Stack styles={AtttachStyle}>
    <Attachment />
    </Stack>
      
{/* //------------------------------------------------------------------------------ */}
    </>
  )}