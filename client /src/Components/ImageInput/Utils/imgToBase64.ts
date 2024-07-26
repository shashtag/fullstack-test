export default (img: string) => {
  img.replace("data:", "").replace(/^.+,/, "");
};
