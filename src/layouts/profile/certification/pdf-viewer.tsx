import { useEffect, useRef } from "react";
import pdfjs from "pdfjs-dist"; // Use pdfjs directly from pdfjs-dist

interface PdfViewerProps {
  url: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Set the workerSrc for PDF.js to use the correct worker
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    if (!url) return;

    const loadPdf = async () => {
      try {
        // Load the PDF document
        const loadingTask = pdfjs.getDocument(url);
        const pdf = await loadingTask.promise;

        console.log("PDF loaded");

        // Get the first page
        const pageNumber = 1;
        const page = await pdf.getPage(pageNumber);

        console.log("Page loaded");

        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        // Prepare canvas using PDF page dimensions
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d");
          if (context) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            const renderTask = page.render(renderContext);
            await renderTask.promise;
            console.log("Page rendered");
          }
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [url]);

  return (
    <div>
      <h1>PDF.js Viewer Example</h1>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
