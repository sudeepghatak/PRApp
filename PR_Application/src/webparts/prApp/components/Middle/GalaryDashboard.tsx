import * as React from "react";
import ComponentHeader from "./Galary/galary_box/ComponentHeader";
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import GalaryBoxCard from "./GalaryBoxCard";
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const options: IDropdownOption[] = [
  { key: "my_orders", text: "My Orders" },
  { key: "my_cost_center_orders", text: "My Cost Center Orders" },
  { key: "my_draft_orders", text: "My Draft Orders" },
  { key: "my_staff_orders", text: "My Staff Orders" },
];

const GalaryDashboard = () => {
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
            options={options}
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
          <GalaryBoxCard />
          <GalaryBoxCard />
          {/* </ScrollablePane> */}
        </div>
      </div>
    </>
  );
};

export default GalaryDashboard;
