const ImgPreview = ({
  previewUrl,
}: {
  previewUrl: string | ArrayBuffer | null;
}) => {
  return (
    <div
      style={{
        backgroundColor: "#7B937F",
        backgroundImage: `url(${previewUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    />
  );
};

export default ImgPreview;
