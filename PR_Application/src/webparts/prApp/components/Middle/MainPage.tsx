import * as React from "react";
import { useState, createContext, useEffect } from "react";
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
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { GlobalStore } from "../../../../app/globalStore";
import { refreshStore } from "../../../../features/reducers/primaryinfoSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

const LazyFourth = lazy(() => import("./FourthComponent"));

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

interface IPMainComponent {
  context: WebPartContext;
}
interface IMainPage {
  isViewMode: boolean;
}
export const MainPage: React.FunctionComponent<IMainPage> = (props) => {
  const { isViewMode } = props;
  let userDisplayName: string = " Blank";
  const [title, settitle] = useState({
    name: "",
    countryKey: "",
    currencyKey: "",
    costCenter: "",
    TypeofbuyOption: "",
    IsPrepaidCapital: "",
  });
  const lineintemData = useSelector((state: RootState) => state.lineiteminfo);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [tableCreate, settableCreate] = useState<ITableBuildProps[]>([]);
  const setTableCreate = (newtableName: ITableBuildProps) => {
    let copytableCreate = [...tableCreate];
    copytableCreate.push(newtableName);
    settableCreate(copytableCreate);
  };
  useEffect(() => {
    if (lineintemData.Finalpage === `edit${GlobalStore.getPrId()}`) {
      setPageNumber(1);
    }
  }, [lineintemData.Finalpage]);
  // const useEffectny(()=>{
  //   if(lineintemData.Finalpage === `edit${GlobalStore.getPrId()}`){

  //   }

  // },[lineintemData.Finalpage])
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

  const setTile = (value) => {
    settitle(value);
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
          <ComponentHeader
            title={
              "[" +
              title.TypeofbuyOption +
              "][" +
              title.IsPrepaidCapital +
              "] for- " +
              title.name +
              "[" +
              title.countryKey +
              "]" +
              "[" +
              title.currencyKey +
              "] - " +
              title.costCenter
            }
          />
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
                setTile={setTile}
                isViewMode={isViewMode}
              />
            ) : null}
            {pageNumber === 2 ? (
              <VendorandShippingComponent
                buttonContxtSave={buttonContxtSave}
                buttonContxtBack={buttonContxtBack}
                isViewMode={isViewMode}
              />
            ) : null}
            {pageNumber === 3 ? (
              <LineItemComponent
                buttonContxtSave={buttonContxtSave}
                buttonContxtBack={buttonContxtBack}
                isViewMode={isViewMode}
              />
            ) : null}
            {pageNumber === 4 ? (
              <>
                <Suspense fallback={"Loading .."}>
                  {/* <Spinner label= "Please wait .."> */}
                  <LazyFourth buttonContxtBack={buttonContxtBack} />
                  {/* </Spinner> */}
                </Suspense>
              </>
            ) : null}
          </tableBuildContext.Provider>
        </tableDeleteContext.Provider>
      </div>
    </>
  );
};
