import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../app/store";

const SupplierInformationContent = () => {
  const supplierInfo = useSelector(
    (state: RootState) => state.statusreducer.supplier
  );
  return (
    <>
      <div>
        <div className="basic-status">
          <span>Supplier Number:</span>
          <span>{supplierInfo.Supplier_Number}</span>
          <span>Supplier Name:</span>
          <span>{supplierInfo.Supplier_Name}</span>
        </div>
        <div className="basic-status back-hover">
          <span>Supplier Address:</span>
          <span>{supplierInfo.Supplier_Address}</span>
          <span>Supplier City:</span>
          <span>{supplierInfo.Supplier_City}</span>
        </div>
        <div className="basic-status">
          <span>Supplier State:</span>
          <span>{supplierInfo.Supplier_State}</span>
          <span>Supplier Zip:</span>
          <span>{supplierInfo.Supplier_Zip}</span>
        </div>
        <div className="basic-status back-hover">
          <span>Supplier Country:</span>
          <span>{supplierInfo.Supplier_Country}</span>
        </div>
        <div className="basic-status">
          <span>Special Instructions:</span>
          <span>{supplierInfo.Comments}</span>
          {/* <span> Omnicell</span> */}
        </div>
        <div className="basic-status back-hover">
          <span>Justification/Reason for Order:</span>
          <span>{supplierInfo.Special_Instructions}</span>
        </div>
        <div className="basic-status">
          <span>Shipping Location:</span>
          <span>{supplierInfo.Location}</span>
        </div>
        {supplierInfo.Location === "Other Shipping Location" ? (
          <>
            <div className="basic-status back-hover">
              <span>Name:</span>
              <span>{supplierInfo.Shipping_Name}</span>
              <span>Street/House Number:</span>
              <span>{supplierInfo.Shipping_Street}</span>
            </div>
            <div className="basic-status">
              <span>Postal Code/City:</span>
              <span>{supplierInfo.Shipping_Postal_Code}</span>
              <span>Region:</span>
              <span>{supplierInfo.Shipping_Region}</span>
            </div>
            <div className="basic-status back-hover">
              <span>Country:</span>
              <span>{supplierInfo.Shipping_Country}</span>
              <span>Where are you based?:</span>
              <span>{supplierInfo.Shipping_Location}</span>
            </div>
            <div className="basic-status">
              <span>Contact with Phone Number:</span>
              <span>{supplierInfo.Shipping_ContactPhone}</span>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default SupplierInformationContent;
