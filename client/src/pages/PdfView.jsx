import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Document, Page } from 'react-pdf';



const PdfView = () => {
    const loc = useLocation();
    const searchParams = new URLSearchParams(loc.search);
    const srclink = searchParams.get('srclink');

    const [pdfData, setPdfData] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(srclink, {
                    responseType: 'blob' // Ensure response is treated as a blob
                });
                setPdfData(response.data);
            } catch (error) {
                console.log('Error fetching PDF:', error);
            }
        };

        fetchData();
    }, [srclink]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }


    return (
        <div>
            {pdfData && (
        <Document
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      )}
      {numPages && <p>Page {pageNumber} of {numPages}</p>}
        </div>
    )
}

export default PdfView