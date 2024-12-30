export interface FileDetail {
  id: string;
  name: string;
  url: string;
}

export const isPreviewSupported = (file: FileDetail) => {
  const fileExt = file.name.split(".").pop() || "unknown";

  const previewSupportFile = ["png", "jpeg", "jpg", "webp", "svg"];
  return previewSupportFile.includes(fileExt.toLowerCase());
};
