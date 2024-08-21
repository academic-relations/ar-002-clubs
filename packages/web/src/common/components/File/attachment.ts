interface Attachment {
  src: string;
  name: string;
}

export const isPreviewSupported = (file: Attachment) => {
  const fileExt = file.name.split(".").pop() || "unknown";

  const previewSupportFile = ["png", "jpeg", "jpg", "webp"];
  return previewSupportFile.includes(fileExt.toLowerCase());
};

export default Attachment;
