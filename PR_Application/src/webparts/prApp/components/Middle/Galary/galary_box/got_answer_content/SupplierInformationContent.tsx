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
          {/* <span>Consulting; Other</span>
          <span>EHS Relevant?:</span>
          <span>No</span> */}
        </div>
        <div className="basic-status">
          {/* <span>Shipping Location:</span>
          <span></span>
          <span>Project Code:</span>
          <span></span> */}
        </div>
      </div>
    </>
  );
};

export default SupplierInformationContent;
