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

export type ResponseContactUs = ResponsePayload<ContactUsTypes>;
