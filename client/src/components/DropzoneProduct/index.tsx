import React, { useEffect, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { List, ListItem } from "@wfp/ui";
import { Button } from "rsuite";

import "./style.css";

const UploaderProduct = ({ setAvatarUrl }: any) => {
  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/100");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({});
  const isdragactive = useDropzone({}).isDragActive.toString();

  const files = acceptedFiles.map((file: FileWithPath) => (
    <ListItem key={file.path}>{file.path}</ListItem>
  ));
  useEffect(() => {
    if (acceptedFiles[0]) {
      const src = URL.createObjectURL(acceptedFiles[0]);
      setImageSrc(src);
      acceptedFiles.map((file: FileWithPath) => setAvatarUrl(file.path));
    }
  }, [acceptedFiles, setAvatarUrl]);

  return (
    <section className="wfp--dropzone">
      <img className="avatar-dropzone" src={imageSrc} alt={imageSrc} />
      <div style={{ height: "25px", paddingRight: "40px" }}>
        {files ? <List>{files}</List> : <div></div>}
      </div>
      <div {...getRootProps({ isdragactive })}>
        <input {...getInputProps()} />
        <Button appearance="primary">Thêm</Button>
      </div>
    </section>
  );
};

export default UploaderProduct;
