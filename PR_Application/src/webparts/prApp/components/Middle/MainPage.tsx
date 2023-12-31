import * as React from "react";
import { useState, createContext } from "react";
import { Stack, IStackTokens } from "@fluentui/react/lib/Stack";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Spinner, mergeStyles } from "@fluentui/react";
import ComponentHeader from "../ComponentHeader";
import { DefaultPalette } from "@fluentui/react/lib/Styling";
import { escape } from "@microsoft/sp-lodash-subset";
import PrimaryInfoComponent from "./PrimaryInfoComponent";
import VendorandShippingComponent from "./VendorandShippingComponent";
import LineItemComponent from "./LineItemComponent";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {lazy, Suspense } from "react";

const LazyFourth= lazy(() => import('./FourthComponent'));

export interface ITableBuildProps {
  name: string;
}

export interface IPDeleteTableContent {
  deleteTable: (index: number) => void;
}

export const tableBuildContext = createContext<ITableBuildProps[] | undefined>(
  undefined
);

export const tableDeleteContext = createContext<
  IPDeleteTableContent | undefined
>(undefined);

interface IPMainComponent{
  context:WebPartContext
}
export const MainPage:React.FunctionComponent = () => {
  // const {context}=props;
  let userDisplayName: string = " Blank";

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [tableCreate, settableCreate] = useState<ITableBuildProps[]>([]);
  const setTableCreate = (newtableName: ITableBuildProps) => {
    let copytableCreate = [...tableCreate];
    copytableCreate.push(newtableName);
    settableCreate(copytableCreate);
  };

  const deleteTableContent = (index: number) => {
    console.log(index);
    
    let copytableCreate = [...tableCreate];
    settableCreate(
      copytableCreate.filter((item, item_index) => item_index != index)
    );

    console.log(tableCreate);
    
  };
  

  const buttonContxtSave = () => {
    if (pageNumber < 4) {
      setPageNumber(pageNumber + 1);
    }

    console.log(pageNumber);
  };
  const buttonContxtBack = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const sectionStackTokens: IStackTokens = { childrenGap: 15 };
  const customButtonStyles = mergeStyles({
    width: "150px", // Adjust the width to your desired value
  });
  const custommiddleButtonStyles = mergeStyles({
    width: "250px", // Adjust the width to your desired value
  });

  return (
    <>
      <div>
        {/* {hideDialog ? (
          <DialogComponent
            hideDialog={hideDialog}
            toggleHideDialog={toggleHideDialog}
          />
        ) : null} */}
        <Stack tokens={sectionStackTokens}>
          <ComponentHeader title="[PR ID - 30928] [Expense Buy][Expense] for-Sunanda Parvathaneni [US][USD] 740001 " />
          <Stack horizontal disableShrink>
            <Stack.Item order={1}>
              <span>
                <DefaultButton
                  style={
                    pageNumber === 1
                      ? {
                          background: DefaultPalette.green,
                          color: DefaultPalette.white,
                        }
                      : {}
                  }
                  className={customButtonStyles}
                >
                  1 Primary Information
                </DefaultButton>
              </span>
            </Stack.Item>
            <Stack.Item order={2}>
              <span>
                <DefaultButton
                  style={
                    pageNumber === 2
                      ? {
                          background: DefaultPalette.green,
                          color: DefaultPalette.white,
                        }
                      : {}
                  }
                  className={custommiddleButtonStyles}
                >
                  2 Vendor Details and Shipping Address
                </DefaultButton>
              </span>
            </Stack.Item>
            <Stack.Item order={3}>
              <span>
                <DefaultButton
                  style={
                    pageNumber === 3
                      ? {
                          background: DefaultPalette.green,
                          color: DefaultPalette.white,
                        }
                      : {}
                  }
                  className={customButtonStyles}
                >
                  3 Line Item Information
                </DefaultButton>
              </span>
            </Stack.Item>
            <Stack.Item order={4}>
              <span>
                <DefaultButton
                  style={
                    pageNumber === 4
                      ? {
                          background: DefaultPalette.green,
                          color: DefaultPalette.white,
                        }
                      : {}
                  }
                  className={customButtonStyles}
                >
                  4 Verify and submit Order
                </DefaultButton>
              </span>
            </Stack.Item>
          </Stack>

          <Stack>
            <Stack.Item align="center">
              {/* <h2>Well done, !</h2> */}
              <span>{escape(userDisplayName)} (TC) Has Requested</span>
            </Stack.Item>
          </Stack>
        </Stack>
        <tableDeleteContext.Provider
          value={{ deleteTable: deleteTableContent }}
        >
          <tableBuildContext.Provider value={tableCreate}>
            {pageNumber === 1 ? (
              <PrimaryInfoComponent
                buttonContxtSave={buttonContxtSave}
                setTableCreate={setTableCreate}
                // context={context}
              />
            ) : null}
            {pageNumber === 2 ? (
              <VendorandShippingComponent
                buttonContxtSave={buttonContxtSave}
                buttonContxtBack={buttonContxtBack}
              />
            ) : null}
            {pageNumber === 3 ? (
              <LineItemComponent
                buttonContxtSave={buttonContxtSave}
                buttonContxtBack={buttonContxtBack}
              />
            ) : null}
             {pageNumber === 4 ? (
              <>
              <Suspense fallback={"Loading .."} >
                {/* <Spinner label= "Please wait .."> */}
               <LazyFourth
                  buttonContxtBack={buttonContxtBack}
                /> 
                {/* </Spinner> */}
              </Suspense>
              </>
              ):null
            }

          </tableBuildContext.Provider>
        </tableDeleteContext.Provider>
      </div>
    </>
  );
};