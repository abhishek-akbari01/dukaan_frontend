import React, { Fragment, ReactElement } from "react";
import Head from "next/head";
import Invoice from "../pages/Invoice";
interface Props {
  title: string;
  children: React.ReactNode;
}
import { PDFViewer } from "@react-pdf/renderer";

export default function Layout({ title, children }: Props): ReactElement {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <script type="text/javascript" src="../pages/worker.js"></script> */}
      </Head>

      <Fragment>{children}</Fragment>
    </Fragment>
  );
}
