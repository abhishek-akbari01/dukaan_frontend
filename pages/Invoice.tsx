import React from "react";
// const Pdf = require("react-to-pdf");
import Pdf from "react-to-pdf";
import Document from "react-to-pdf";

const ref = React.createRef();

export default function Invoice() {
  return (
    <>
      <div>
        <h1>Hello</h1>
      </div>
      {/* <Document> */}
      <Pdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
      </Pdf>
      {/* </Document> */}
    </>
  );
}
