import { toast } from "react-toastify";

const validateImage = (file: File) => {
  if (!file) {
    toast(
      "Whoops! It seems you did not select an image. Please choose one to continue.",
      {
        theme: "dark",
        type: "error",
      },
    );
    return 0;
  }
  if (file!.size > 5 * 1024 * 1024) {
    toast("Please ensure that the file size is less than 5MB.", {
      theme: "dark",
      type: "error",
    });
    return 0;
  }
  return 1;
};

export default validateImage;
