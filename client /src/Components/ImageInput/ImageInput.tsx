import validateImage from "./Utils/validateImage";
import imgToBase64 from "./Utils/imgToBase64";
import sendImgToBackend from "./Utils/sendImgToBackend";
import compressImage from "./Utils/compressImage";

// Component for handling image input
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
        disabled={loading}
        type='file'
        accept='image/*'
        name='Image'
        id='Image'
        style={{ display: "none" }}
        onChange={async (e) => {
          setLoading(true);
          if (validateImage(e.target.files![0]) === 0) return; // Validate the image

          // Compress the image before uploading
          compressImage(e.target.files![0], (compressedResult) => {
            const reader = new FileReader();

            reader.onloadend = async () => {
              await sendImgToBackend(
                imgToBase64(reader.result as string),
                setPreviewUrl,
                setText,
                setLoading,
                reader,
              );
            };

            reader.readAsDataURL(compressedResult); // Read the compressed image as a data URL
          });
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
