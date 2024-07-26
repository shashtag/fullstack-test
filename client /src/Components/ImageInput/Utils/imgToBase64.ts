// Export a default function that takes an image string as input and gives base64 string as output
export default (img: string) => img.replace("data:", "").replace(/^.+,/, "");
