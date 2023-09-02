import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
// import pdfjs from 'pdfjs-dist/es6/pdf.min.js';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
const PDFViewer = ({ fileUrl }) => {
    
        const [numPages, setNumPages] = useState(null);
        const [pageNumber, setPageNumber] = useState(1);
      
        const onDocumentLoadSuccess = ({ numPages }) => {
          setNumPages(numPages);
        };
      
        const nextPage = () => {
          if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
          }
        };
      
        const prevPage = () => {
          if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
          }
        };

  return (
    <div>
    <div className="controls">
      <button onClick={prevPage} disabled={pageNumber === 1}>
        Prev
      </button>
      <button onClick={nextPage} disabled={pageNumber === numPages}>
        Next
      </button>
    </div>

    <Document
      file={fileUrl}
      onLoadSuccess={onDocumentLoadSuccess}
      onContextMenu={(e) => e.preventDefault()}
      className="pdf-container"
    >
      <Page pageNumber={pageNumber} />
    </Document>
  </div>
  );
};

export default PDFViewer;
