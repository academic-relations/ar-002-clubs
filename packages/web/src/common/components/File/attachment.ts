interface Attachment {
  src: string;
  name: string;
}

export const isPreviewSupported = (file: Attachment) => {
  const fileExt = file.name.split(".").pop() || "unknown";

  const previewSupportFile = ["png", "jpeg", "jpg", "webp"];
  return previewSupportFile.includes(fileExt.toLowerCase());
};

export const fromUUID = (_uuid: string) => ({
  // TODO: get src and name from uuid
  src: "https://sparcs.org/img/symbol.svg",
  name: "sample-file-name.svg",
});

export default Attachment;
