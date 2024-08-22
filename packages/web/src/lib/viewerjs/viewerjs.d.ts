import OriginalViewer from "viewerjs";

declare module "viewerjs" {
  export default interface Viewer extends OriginalViewer {
    index: number;
  }
}
