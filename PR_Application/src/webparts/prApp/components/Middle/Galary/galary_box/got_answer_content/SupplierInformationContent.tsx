import * as React from "react";

const SupplierInformationContent = () => {
  return (
    <>
      <div>
        <div className="basic-status">
          <span>Supplier Number:</span>
          <span> Omnicell</span>
          <span>Supplier Name:</span>
          <span> (USD) $1.00</span>
        </div>
        <div className="basic-status back-hover">
          <span>Supplier Address:</span>
          <span> Omnicell</span>
          <span>Supplier City:</span>
          <span> 0000027007</span>
        </div>
        <div className="basic-status">
          <span>Supplier State:</span>
          <span>Draft</span>
          <span>Supplier Zip:</span>
          <span> 740001 (740001 - Information Technology)</span>
        </div>
        <div className="basic-status back-hover">
          <span>Supplier Country:</span>
          <span> Expense Buy</span>
          <span> Prepaid or Capital buy?:</span>
          <span> Expense</span>
        </div>
        <div className="basic-status">
          <span>Special Instructions:</span>
          <span> Omnicell</span>
          <span>UFID:</span>
          <span></span>
        </div>
        <div className="basic-status back-hover">
          <span>Justification/Reason for Order:</span>
          <span>Consulting; Other</span>
          <span>EHS Relevant?:</span>
          <span>No</span>
        </div>
        <div className="basic-status">
          <span>Shipping Location:</span>
          <span>No</span>
          <span>Project Code:</span>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default SupplierInformationContent;
