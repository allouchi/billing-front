import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import PagePdf from './PagePdf';

// Create Document Component
const DocumentPdf = () => (
    
    <PDFViewer>
       <PagePdf />
     </PDFViewer>
  );
  
  export default DocumentPdf;