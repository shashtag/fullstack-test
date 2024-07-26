import { useState } from "react";
import ImageInput from "./Components/ImageInput";
import Loader from "./Components/Common/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImgPreview from "./Components/ImgPreview";
import TextDisplay from "./Components/TextDisplay";

function App() {
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  return (
    <div>
      <ToastContainer position='bottom-right' />

      <Loader loading={loading} />
      <ImageInput
        loading={loading}
        setLoading={setLoading}
        setPreviewUrl={setPreviewUrl}
        setText={setText}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "80vh",
        }}>
        <ImgPreview previewUrl={previewUrl} />
        <TextDisplay text={text} setText={setText} loading={loading} />
      </div>
    </div>
  );
}

export default App;
