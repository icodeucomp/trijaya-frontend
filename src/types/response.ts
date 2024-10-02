export interface ResponsePayload<T> {
  status: string;
  message: string;
  data: T;
}

export interface ContactUsTypes {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phoneNumber: string;
}

export interface UserTypes {
  username: string;
  email: string;
}

export interface ArticlesTypes {
  title: string;
  slug: string;
  content: string;
  imageHeader: string;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessSectorTypes {
  title: string;
  slug: string;
  description: string;
  mediaUrls: string[];
  business: {
    title: string;
  };
}

export interface BusinessesTypes {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageHeaderUrl: string;
  productHeaderUrl: string;
  Product: BusinessSectorTypes[];
  Project: BusinessSectorTypes[];
  Service: BusinessSectorTypes[];
}

export interface MediaTypes {
  name: string;
  slug: string;
  url: string;
}

export interface DocumentsTypes {
  name: string;
  slug: string;
  category: string;
  url: string;
  size: string;
  uploadedAt: string;
}

export interface CategoriesDocumentTypes {
  slug: string;
  category: string;
}

export type ResponseContactUs = ResponsePayload<ContactUsTypes>;

export type ResponseArticlesTypes = ResponsePayload<ArticlesTypes[]>;
export type ResponseArticleTypes = ResponsePayload<ArticlesTypes>;

export type ResponseBusinessesTypes = ResponsePayload<BusinessesTypes[]>;
export type ResponseBusinessTypes = ResponsePayload<BusinessesTypes>;

export type ResponseBusinessesSectorTypes = ResponsePayload<BusinessSectorTypes[]>;
export type ResponseBusinessSectorTypes = ResponsePayload<BusinessSectorTypes>;

export type ResponseMediaTypes = ResponsePayload<MediaTypes[]>;

export type ResponseDocumentsTypes = ResponsePayload<DocumentsTypes[]>;
export type ResponseCategoriesDocumentTypes = ResponsePayload<CategoriesDocumentTypes[]>;
export type ResponseDocumentTypes = ResponsePayload<DocumentsTypes>;

export type ResponseUserTypes = ResponsePayload<UserTypes>;
