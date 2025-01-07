import { IFile } from "@sparcs-clubs/interface/api/file/entity";

export class MFile implements IFile {
  id: string;

  name: string;

  extension: string;

  size: number;

  url: string;

  userId: number;

  constructor(File: IFile) {
    Object.assign(this, File);
  }
}
