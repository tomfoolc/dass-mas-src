import React from "react";

interface ViewPDFProps {
  showAllPages: boolean;
  file: any;
}
export default function ViewPDF(props: ViewPDFProps) {
  const { file } = props;
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    const showPDF = async () => {
      let pdffile = file.replace("data:application/pdf;base64,", "");
      const pdfBytes = Uint8Array.from(window.atob(pdffile), (c) =>
        c.charCodeAt(0)
      );

      let blob = new Blob([pdfBytes], { type: "application/pdf" });
      let tempUrl = URL.createObjectURL(blob);
      if (tempUrl !== null) {
        setUrl(tempUrl);
      }
    };

    showPDF();
  }, [props, file]);

  return (
    <div className="App">
      <iframe
        title="viewPdf"
        src={url}
        frameBorder="0"
        width="800px"
        height="1200px"
      />
    </div>
  );
}
