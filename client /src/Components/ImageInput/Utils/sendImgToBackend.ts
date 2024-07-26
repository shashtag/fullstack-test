import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

// Export an asynchronous function that calls OCR processing API
export default async (
  base64Img: string,
  setPreviewUrl: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  reader: FileReader,
) => {
  try {
    const res = await axios.post(import.meta.env.VITE_API + "/api/ocr", {
      image: base64Img,
    });

    // Set the preview URL and OCR text in case of a successful request
    setPreviewUrl(reader.result);
    setText(res.data.message);
  } catch (error: unknown) {
    // Display an error toast notification if the request fails
    toast((error as AxiosError<{ error: string }>).response?.data?.error, {
      theme: "dark",
      type: "error",
    });

    // Reset the preview URL and OCR text in case of an error
    setPreviewUrl(null);
    setText("");
  } finally {
    // Set the loading state to false once the request is complete
    setLoading(false);
  }
};
