const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webn" || fileExt === "ogg")
    return "video";

  if (fileExt === "mp3" || fileExt === "wev") return "audio";

  if (
    fileExt === "png" ||
    fileExt === "jpeg" ||
    fileExt === "jpg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};

const transformImage = (url = "", width = 100) => url;

export { fileFormat, transformImage };
