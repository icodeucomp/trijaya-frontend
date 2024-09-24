export interface NavbarTypes {
  title: string;
  pathUrl: string;
  content?: {
    title: string;
    pathUrl: string;
    description: string;
  }[];
}
