import { toast } from "react-toastify";

// Function to validate the image file
const validateImage = (file: File) => {
  // Check if a file is present
  if (!file) {
    // Display an error toast notification if no file is present
    toast(
      "Whoops! It seems you did not select an image. Please choose one to continue.",
      {
        theme: "dark",
        type: "error",
      },
    );
    return 0; // Return 0 indicating validation failure
  }

  // Check if the file size exceeds 5MB
  if (file!.size > 5 * 1024 * 1024) {
    toast("Please ensure that the file size is less than 5MB.", {
      theme: "dark",
      type: "error",
    });
    return 0; // Return 0 indicating validation failure
  }
  return 1; // Return 1 indicating validation success
};

export default validateImage;
