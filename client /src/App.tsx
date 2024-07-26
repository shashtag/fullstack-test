import { useState } from "react";

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null,
  );
  return (
    <>
      <input
        type='file'
        accept='image/*'
        name='Image'
        id='Image'
        style={{ display: "none" }}
        onChange={(e) => {
          setImage(e.target.files![0]);
          const reader = new FileReader();

          reader.onloadend = () => {
            setPreviewUrl(reader.result);
          };

          reader.readAsDataURL(e.target.files![0]);
        }}
      />
      <label
        htmlFor='Image'
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#99A8B7",
          height: "20vh",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}>
        Upload Image
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "80vh",
        }}>
        <div
          style={{
            backgroundColor: "#7B937F",
            backgroundImage: `url(${previewUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}></div>
        <textarea />
      </div>
    </>
  );
}

export default App;
