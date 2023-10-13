import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

import "./style.css";
import { fireToBase64 } from "../../helpers/fileToBase64";
import { Avatar } from "@gapo_ui/components";
interface Props {
  setAvatarUrl?: (val: any) => void;
  size?: number;
  avatar?: string;
}
const Uploader = ({
  setAvatarUrl = () => {},
  size = 100,
  avatar = "/assets/avatar.img/avatar.jpg",
}: Props) => {
  // const [imageSrc, setImageSrc] = useState<any>(avatar);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({});
  const isdragactive = useDropzone({}).isDragActive.toString();

  useEffect(() => {
    if (acceptedFiles[0]) {
      fireToBase64(acceptedFiles[0]).then((data) => {
        // const src = URL.createObjectURL(acceptedFiles[0]);
        setAvatarUrl(data);
      });
    }
  }, [acceptedFiles, setAvatarUrl]);

  return (
    <section
      className="wfp--dropzone"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div
        {...getRootProps({ isdragactive })}
        // style={{ height: `${size}px` }}
        className="wrapper-avatar"
      >
        <input {...getInputProps()} />
        {/* <div> */}
        <Avatar
          src={avatar}
          size={size}
          UNSAFE_style={{
            overflow: "hidden",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
        {/* </div> */}
      </div>
    </section>
  );
};

export default Uploader;
