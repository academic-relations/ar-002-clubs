import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface PutFileS3Params {
  files: File[];
  uploadUrls: string[];
}

const usePutFileS3 = () =>
  useMutation<void, Error, PutFileS3Params>({
    mutationFn: async ({
      files,
      uploadUrls,
    }: PutFileS3Params): Promise<void> => {
      try {
        const uploadPromises = files.map((file, index) =>
          axios.put(uploadUrls[index], file, {
            headers: {
              "Content-Type": file.type,
            },
            withCredentials: false,
          }),
        );

        await Promise.all(uploadPromises);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to upload file: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred while uploading the file");
        }
      }
    },
  });

export default usePutFileS3;
