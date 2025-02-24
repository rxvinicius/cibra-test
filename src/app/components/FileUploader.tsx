import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui";
import Image from "next/image";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
  });

  return (
    <div
      {...getRootProps()}
      className="flex text-start flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} />

      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <Image
              src={fileUrl}
              alt="User photo preview"
              className="w-32 h-32 object-cover rounded-full"
              width={32}
              height={32}
            />
          </div>
          <p className="text-secondary">
            Clique ou arraste a foto para substituir
          </p>
        </>
      ) : (
        <div className="file_uploader-box">
          <Image
            src="/icons/file-upload.svg"
            alt="upload file"
            width={96}
            height={77}
          />

          <h3 className="base-medium text-secondary mb-2 mt-6">
            Arraste a foto aqui
          </h3>
          <p className="text-dark-1 small-regular mb-6">PNG, JPG, SVG</p>

          <Button className="bg-light-1">Selecione do computador</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
