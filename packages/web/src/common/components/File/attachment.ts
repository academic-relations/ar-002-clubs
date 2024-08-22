interface Attachment {
  src: string;
  name: string;
}

export const isPreviewSupported = (file: Attachment) => {
  const fileExt = file.name.split(".").pop() || "unknown";

  const previewSupportFile = ["png", "jpeg", "jpg", "webp", "svg"];
  return previewSupportFile.includes(fileExt.toLowerCase());
};

export const fromUUID = (_uuid: string) => ({
  // TODO: get src and name from uuid
  src: "https://s3-alpha-sig.figma.com/img/2366/aaf2/b01ae268e4d7bcc364f8c2bd2ff5aa70?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c~Cp3X8hCrrzSiZHtgnJtMGYNHx6EWp7UbFAeMBwct0v4W6ob59~oZSCNF-fgATlDXF2x7eDHjuansFUzqptCGHHBbaTViXLyjZvBj7DB5S1Bc7u-iW0jwS7iE9nS~wJCf0zh6Am~1GhHp1K7C6KNXLrsbs5qf1fheixjyZ0Mlei~Pyt7Y3XjDm3LUmjDK2gpoXCjuDBNW1veL9gxSuXTMtzZIlgXwkze0wkqSK9dKG~akmA6zXqS~Ls9v4gjyAGZtNLY3nSA7muTkZsdYNnJAGAkHHbcTuLRtKIAniRhIrsmS8WOPsXL71UbFDDM8CUzPsM5tBj8fxlUfxaGSbQRA__",
  name: "dora-is-very-cute.png",
});

export default Attachment;
