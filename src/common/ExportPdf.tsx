import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    //  flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: "15px",
  },
  header: {
    fontSize: "24px",
    padding: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  //   section: {
  //     // margin: 10,
  //     padding: 10,
  //     border: "1px solid black",
  //     // flexGrow: 1,
  //   },
  td: {
    fontSize: "10px",
    border: "1px solid black",
    width: "100%",
    padding: 10,
  },
});

// Create Document Component
const ExportPdf = ({ headers, data }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Graph Data</Text>
      <View style={styles.row}>
        {headers?.map(({ label }: any) => (
          <Text style={styles.td}>{label}</Text>
        ))}
      </View>

      {data?.map((val: any) => (
        <View style={styles.row}>
          {headers?.map(({ key }: any) => (
            <Text style={styles.td}>{val[key] || " "}</Text>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

export default ExportPdf;
