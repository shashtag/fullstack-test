import React from "react";

const TextDisplay = ({
  loading,
  text,
  setText,
}: {
  loading: boolean;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <textarea
      disabled={loading}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default TextDisplay;
