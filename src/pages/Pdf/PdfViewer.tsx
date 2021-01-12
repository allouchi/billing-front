import React, { FC, ReactElement, useState } from "react";
import DataPDF from "../../domains/DataPDF";
import PDFViewer from "pdf-viewer-reactjs";
import { useStoreActions, useStoreState } from "../../store/hooks";
import CircularProgress from "@material-ui/core/CircularProgress";

const PdfViewer: FC<{}> = (): ReactElement => {
  const pdf: DataPDF[] = useStoreState((state) => state.pdf.items);
  const isLoaded: boolean = useStoreState((state) => state.pdf.isLoaded);
/*
  if (!isLoaded) {
    return <CircularProgress color="inherit" />;
  }
  */
  let fileName = '';
  let data : any = [];
  const objectArray = Object.entries(pdf);

  objectArray.forEach(([key, value]) => {
    if(key === "fileName"){
      fileName = value.fileName;
    }
    if(key === "fileContent"){
      data = value.fileContent;
    }    
  });

  var pdfAsDataUri = "data:application/pdf;base64,"+data;
  window.open(pdfAsDataUri);
  

  return (
    <div className="pdf">
        <embed src="http://localhost:8080/editions/831 502 141 00011/1/1" type="application/pdf" />
     </div>
  )

  
};

export default PdfViewer;