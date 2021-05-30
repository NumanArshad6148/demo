import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import ExportPdf from "./ExportPdf";

const PdfButton = ({ headers, data }: any) => (
  <PDFDownloadLink
    document={<ExportPdf headers={headers} data={data} />}
    fileName="data.pdf"
  >
    {({ blob, url, loading, error }) =>
      loading ? "Loading document" : "Export Data!"
    }
  </PDFDownloadLink>
);

export default PdfButton;
