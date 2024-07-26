import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

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
    const res = await axios.post("http://localhost:8000/ocr", {
      image: base64Img,
    });

    setPreviewUrl(reader.result);
    setText(res.data.message);
  } catch (error: unknown) {
    toast((error as AxiosError<{ error: string }>).response?.data?.error, {
      theme: "dark",
      type: "error",
    });
    setPreviewUrl(null);
    setText("");
  } finally {
    setLoading(false);
  }
};
