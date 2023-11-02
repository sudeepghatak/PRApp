import * as React from "react";
import ComponentHeader from "./Galary/galary_box/ComponentHeader";
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import GalaryBoxCard from "./GalaryBoxCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchSearchContent } from "../../../../features/reducers/searchSlice";
import { RootState } from "../../../../app/store";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const options: IDropdownOption[] = [
  { key: "MyOrder", text: "My Orders" },
  { key: "MyCenterOrder", text: "My Cost Center Orders" },
  { key: "MyDeaftOrder", text: "My Draft Orders" },
  { key: "MyTeamOrder", text: "My Staff Orders" },
];

const GalaryDashboard = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const searchResultInfo = useSelector(
    (state: RootState) => state.searchreducer
  );
  const initialDropOption: IDropdownOption = {
    key: "MyOrder",
    text: "My Orders",
  };
  const [searchOption, setsearchOption] = useState(initialDropOption);
  const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number
  ): void => {
    const { id } = event.target as HTMLDivElement;
    console.log("------------------Sap===Sap", item);
    console.log(id);
    let newSelectedItem: IDropdownOption = { key: "", text: "" };
    newSelectedItem = { key: item?.key as string, text: item?.text as string };
    setsearchOption(newSelectedItem);
  };

  console.log("Here I am From GalaryDashboard Here ", searchResultInfo);

  useEffect(() => {
    dispatch(fetchSearchContent(searchOption.key as string));
  }, [searchOption]);
  return (
    <>
      <div style={{ paddingBottom: 5 }}>
        <ComponentHeader title="Dashboard" color="green" />
      </div>
      {/* first */}
      <div>
        <div id="order-details">
          <span>Order Details</span>
          <span>h</span>
        </div>
        {/* middle */}

        <div id="search-by">
          <span>Search By:</span>

          <Dropdown
            id="search-drop"
            placeholder="Select options"
            onChange={changeDropdownOption}
            options={options}
            selectedKey={searchOption?.key}
            styles={dropdownStyles}
          />
          <span></span>
        </div>
        {/* last */}

        <div
        // className={classNames.wrapper}
        >
          {/* <ScrollablePane
            scrollContainerFocus={true}
            scrollContainerAriaLabel="Sticky component example"
            styles={scrollablePaneStyles}
          > */}
          {!searchResultInfo.isLoading ? (
            searchResultInfo.listSearchResult.map((searchItem) => {
              return <GalaryBoxCard cardItem={searchItem} />;
            })
          ) : (
            <div>
              <Spinner label="Please wait .." />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GalaryDashboard;