import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

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
          if (!e.target.files?.[0]) {
            toast("No file selected", { theme: "dark", type: "error" });
            return;
          }
          if (e.target.files?.[0]!.size > 5 * 1024 * 1024) {
            console.log(e.target.files?.[0]!.size);
            toast("File size should be less than 5MB", {
              theme: "dark",
              type: "error",
            });
            return;
          }
          setLoading(true);
          let base64Img = "";
          const reader = new FileReader();

          reader.onloadend = async () => {
            base64Img = (reader.result as string)
              .replace("data:", "")
              .replace(/^.+,/, "");
            try {
              const res = await axios.post("http://localhost:8000/ocr", {
                image: base64Img,
              });

              setPreviewUrl(reader.result);
              setText(res.data.message);
            } catch (error: unknown) {
              console.error(
                "smnjsnjssn",
                (error as AxiosError<{ message: string }>).response?.data!
                  .message,
              );
              toast(
                (error as AxiosError<{ message: string }>).response?.data!
                  .message,
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
