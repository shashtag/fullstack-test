import Compressor from "compressorjs";

const compressImage = (file: File, success: (file: File | Blob) => void) =>
  new Compressor(file, {
    quality: 0.8,
    mimeType: "image/jpeg",
    success: success,
  });

export default compressImage;
