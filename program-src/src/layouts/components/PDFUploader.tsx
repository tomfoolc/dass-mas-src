import React from "react";
import Button from "./Button";

import "../css/pdfuploader.css";

export default function PDFUploader() {
  const [fileContent, setFileContent] = React.useState<any>();

  const changeHandler = (event: any) => {
    let selectedFile = event.target.files;
    let file = null;
    if (selectedFile.length > 0) {
      let fileToLoad = selectedFile[0];
      let fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        file = fileLoadedEvent.target?.result;
        setFileContent(file);
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  };

  const Upload = () => {
    console.log(fileContent);
  };

  return (
    <div>
      <input
        id="pdfuploader"
        type="file"
        name="file"
        onChange={changeHandler}
      />
      <Button text="Upload" onClick={Upload} />
    </div>
  );
}
