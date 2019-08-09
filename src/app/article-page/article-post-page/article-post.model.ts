import {AppUser, Tag} from '../../qa-page/qa.model';

export class AddArticle {
  title: string;
  content: string;
  category: string;
  tags: Tag[];
  appUser: AppUser;
  uploadedFiles: UploadedFiles[];

}
export class UploadedFiles {
  id: number;
  uploadedFileUrlShownOnUI: string;
  uploadedFileName: string;
  bucketName: string;
  constructor() {}
}
