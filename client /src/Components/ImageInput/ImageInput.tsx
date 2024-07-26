import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import validateImage from "./Utils/validateImage";
import imgToBase64 from "./Utils/imgToBase64";

const ImageInput = ({
  loading,
  setLoading,
  setPreviewUrl,
  setText,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPreviewUrl: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <input
        max={30}
        disabled={loading}
        type='file'
        accept='image/*'
        name='Image'
        id='Image'
        style={{ display: "none" }}
        onChange={async (e) => {
          setLoading(true);
          validateImage(e.target.files![0]);

          const reader = new FileReader();

          reader.onloadend = async () => {
            const base64Img = imgToBase64(reader.result as string);
            try {
              const res = await axios.post("http://localhost:8000/ocr", {
                image: base64Img,
              });

              setPreviewUrl(reader.result);
              setText(res.data.message);
            } catch (error: unknown) {
              toast(
                (error as AxiosError<{ error: string }>).response?.data?.error,
                {
                  theme: "dark",
                  type: "error",
                },
              );
              setPreviewUrl(null);
              setText("");
            } finally {
              setLoading(false);
            }
          };

          reader.readAsDataURL(e.target.files![0]);
        }}
      />
      <label
        htmlFor='Image'
        style={{ cursor: !loading ? "pointer" : "default" }}>
        Upload Image
      </label>
    </>
  );
};

export default ImageInput;
