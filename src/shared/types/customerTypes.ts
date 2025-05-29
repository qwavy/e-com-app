export type IPassword = {
  password: string;
};

export type ChangePassword = {
  password: string;
  newPassword: string;
};

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
};

export type ShippingAddress = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  billingAddress: boolean;
  defaultAddress: boolean;
};

export type BillingAddress = {
  billingStreet?: string;
  billingCity?: string;
  billingPostalCode?: string;
  billingCountry?: string;
};

export type RegistrationFields = PersonalInfo & ShippingAddress & BillingAddress & IPassword;

export interface UpdatePersonalInfoCustomerProps {
  data: PersonalInfo;
  id: string;
  version: number;
}
