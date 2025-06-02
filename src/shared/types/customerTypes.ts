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
  id?: string;
  version?: number;
};

export type ShippingAddress = {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  billingAddress?: boolean;
  defaultAddress?: boolean;
  addressType?: string;
  id?: string;
};

export type BillingAddress = {
  billingStreet?: string;
  billingCity?: string;
  billingPostalCode?: string;
  billingCountry?: string;
  defaultAddress?: boolean;
  id?: string;
};

export type AddressInfo = {
  defaultBillingAddressId: string | undefined;
  defaultShippingAddressId: string | undefined;
  billingAddressIds: string[] | undefined;
  shippingAddressIds: string[] | undefined;
  version: number | undefined;
  id: string | undefined;
};

export type RegistrationFields = PersonalInfo & ShippingAddress & BillingAddress & IPassword;

export interface UpdatePersonalInfoCustomerProps {
  data: PersonalInfo;
  id: string;
  version: number;
}

export interface AddressProps {
  data: Address;
  version: number | undefined;
  id?: string;
  userId?: string;
  addressId?: string;
  isBilling?: boolean;
}

export interface Address {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  defaultAddress?: boolean;
  billingAddress?: boolean;
}

export interface AddressForm {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  billingAddress?: boolean;
  defaultAddress?: boolean;
  billingStreet?: string;
  billingCity?: string;
  billingPostalCode?: string;
  billingCountry?: string;
}
