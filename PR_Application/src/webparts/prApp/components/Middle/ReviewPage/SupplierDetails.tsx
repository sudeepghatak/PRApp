import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { IStackStyles, Stack } from "office-ui-fabric-react";
import '../StyleFourthComponent.css';
import { useEffect } from "react";
import { fetchStatusContent } from "../../../../../features/reducers/statusSlice";
import { GlobalStore } from "../../../../../app/globalStore";
import { ThunkDispatch } from "@reduxjs/toolkit";

export const SupplierDetails: React.FunctionComponent = () => {
  const supplierInfo = useSelector(
    (state: RootState) => state.statusreducer.supplier
  );
  console.log("supplierInfo:: ", supplierInfo);

const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

// useEffect(()=>{
//   dispatch(fetchStatusContent(GlobalStore.getPrId()));
  
// },[])

  
  const BlockSize: IStackStyles = {
    root: {
        blocksize: "12px",
        fontsize: "10px"
    },
  };
  return(
    <>
   <div className='button-border-end '>
        <div className='borderline'>
          <Stack horizontal horizontalAlign="space-between" >
            <Stack.Item grow={5} >
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div className='text-heading' >	Supplier Number: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <div className='text-des'> {supplierInfo.Supplier_Number} </div>
                      </Stack>
                    </Stack.Item>
                   
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'>	Supplier Name: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <div className='text-des'>{supplierInfo.Supplier_Name} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
          </Stack>
          </div>
        </div>

     {/* ----------------------------------------------------------------------- */}
      <div className='button-border-end '>
        <div className='borderline'>
          <Stack horizontal horizontalAlign="space-between" >
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'> Supplier Address: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des'> {supplierInfo.Supplier_Address} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item>
                      <div  className='text-heading'>Supplier City:</div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des' > {supplierInfo.Supplier_City} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
            </div>
          </div>
  {/* --------------------------------------------------------------------------------- */}
  
     <div className='button-border-end '>
        <div className='borderline'>
          <Stack horizontal horizontalAlign="space-between" >
            <Stack.Item grow={5} >
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div className='text-heading' >	Supplier State: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <div className='text-des'> {supplierInfo.Supplier_State} </div>
                      </Stack>
                    </Stack.Item>
                   
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'>Supplier Zip:	</div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <div className='text-des'>{supplierInfo.Supplier_Zip} </div>
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
                      <div  className='text-heading'> Supplier Country:</div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des' > {supplierInfo.Supplier_Country} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </div>
            </div>
{/* ----------------------------------------------------------------------- */}
          <div className='single-button-border-end '>
            <div className='singleborderline'>
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading' >Justification/Reason for Order: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des'> {supplierInfo.Justification_Reason_for_Order} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </div>
            </div>
{/* ----------------------------------------------------------------------- */}
          <div className='single-button-border-end '>
            <div className='singleborderline'>
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading' >Special Instructions: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des'> {supplierInfo.Special_Instructions} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </div>
            </div>
{/* ----------------------------------------------------------------------- */}
          <div className='single-button-border-end '>
            <div className='singleborderline'>
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading' >Ship To Address: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des'> {supplierInfo.Location} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </div>
            </div>
    {supplierInfo.Location === "Other Shipping Location" ? (
    <>
  {/* --------------------------------------------------------------------------------- */}
      <div className='button-border-end ss-btn-border'>
          <Stack horizontal horizontalAlign="space-between"  styles={BlockSize} >
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='heading'>Shipping Details </div>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
          </div>
{/* --------------------------------------------------------------------------------- */}
{/* --------------------------------------------------------------------------------- */}
     <div className='button-border-end '>
        <div className='borderline'>
          <Stack horizontal horizontalAlign="space-between" >
            <Stack.Item grow={5} >
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div className='text-heading' >	Name: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <div className='text-des'> {supplierInfo.Shipping_Name} </div>
                      </Stack>
                    </Stack.Item>
                   
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'>House Number/Street: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <div className='text-des'>{supplierInfo.Shipping_Street} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
          </Stack>
          </div>
        </div>

     {/* ----------------------------------------------------------------------- */}
      <div className='button-border-end '>
        <div className='borderline'>
          <Stack horizontal horizontalAlign="space-between" >
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'> Postal Code/City: </div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des'> {supplierInfo.Shipping_Postal_Code} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item>
                      <div  className='text-heading'>	Region:</div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des' >{supplierInfo.Shipping_Region}  </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
            </div>
          </div>
  {/* --------------------------------------------------------------------------------- */}
      <div className='button-border-end '>
        <div className='borderline'>
          <Stack horizontal horizontalAlign="space-between" >
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'> Country:</div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des'> {supplierInfo.Shipping_Country}</div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item>
                      <div  className='text-heading'>Location:</div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des' >	{supplierInfo.Shipping_Location}  </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
            </div>
          </div>
  {/* --------------------------------------------------------------------------------- */}
        <div className='single-button-border-end '>
          <div className='singleborderline'>
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='text-heading'> Contact with Phone Number:</div>
                    </Stack.Item>
                    <Stack.Item >
                      <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <div className='text-des' >{supplierInfo.Shipping_ContactPhone} </div>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </div>
            </div>
    </>
        ):null}
    </>  
  )}   