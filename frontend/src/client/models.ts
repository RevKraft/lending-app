export type Body_login_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}

export type ItemCreate = {
  title: string
  walletHashId: string
  status: string
  regulatoryRegion: string
  description?: string | null
}

export type ItemPublic = {
  title: string
  walletHashId: string
  status: string
  regulatoryRegion: string
  description?: string | null
  id: number
  owner_id: number
}

export type ItemUpdate = {
  title?: string | null
  description?: string | null
}

export type ItemsPublic = {
	data: Array<ItemPublic>;
	count: number;
}

export type TransactionCreate = {
	title: string;
  beneficiaryId: string;
  payout_source_amount: string;
  payout_source_currency: string;
  message?: string | null;
  payment_id?: string | null;
  system_reference_number?: string | null;
	description?: string | null;
}

export type TransactionPublic = {
	title: string;
  beneficiaryId: string;
  payout_source_amount: string;
  payout_source_currency: string;
  message?: string | null;
  payment_id?: string | null;
  system_reference_number?: string | null;
	description?: string | null;
	id: number;
	owner_id: number;
}

export type TransactionUpdate = {
	title?: string | null;
  beneficiaryId: string;
  payout_source_amount: string;
  payout_source_currency: string;
  message?: string | null;
  payment_id?: string | null;
  system_reference_number?: string | null;
	description?: string | null;
}

export type TransactionsPublic = {
	data: Array<TransactionPublic>;
	count: number;
}

export type BeneficiaryCreate = {
	title: string;
  beneficiaryName: string;
  beneficiaryAccountType: string;
  beneficiaryCountryCode: string;
  destinationCountry: string;
  destinationCurrency: string;
  payoutMethod: string;
  beneficiaryAccountNumber: string;
  routingCodeType1: string;
  routingCodeValue1: string;
  beneficiaryHashId: string | null;
	description?: string | null;
}

export type BeneficiaryPublic = {
	title: string;
  beneficiaryName: string;
  beneficiaryAccountType: string;
  beneficiaryCountryCode: string;
  destinationCountry: string;
  destinationCurrency: string;
  payoutMethod: string;
  beneficiaryAccountNumber: string;
  routingCodeType1: string;
  routingCodeValue1: string;
  beneficiaryHashId: string | null;
	description?: string | null;
	id: number;
	owner_id: number;
}

export type BeneficiaryUpdate = {
	title?: string | null;
  beneficiaryName: string;
  beneficiaryAccountType: string;
  beneficiaryCountryCode: string;
  destinationCountry: string;
  destinationCurrency: string;
  payoutMethod: string;
  beneficiaryAccountNumber: string;
  routingCodeType1: string;
  routingCodeValue1: string;
  beneficiaryHashId: string | null;
	description?: string | null;
}

export type BeneficiariesPublic = {
	data: Array<BeneficiaryPublic>;
	count: number;
}

export type Message = {
  message: string
}

export type NewPassword = {
  token: string
  new_password: string
}

export type Token = {
  access_token: string
  token_type?: string
}

export type UpdatePassword = {
  current_password: string
  new_password: string
}

export type UserCreate = {
  email: string
  is_active?: boolean
  is_onboarded?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password: string
}

export type UserPublic = {
  email: string
  is_active?: boolean
  is_onboarded?: boolean
  is_superuser?: boolean
  full_name?: string | null
  id: number
}

export type UserRegister = {
  email: string
  password: string
  full_name?: string | null
}

export type UserUpdate = {
  email?: string | null
  is_active?: boolean
  is_onboarded?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password?: string | null
}

export type UserUpdateMe = {
  full_name?: string | null
  email?: string | null
}

export type UsersPublic = {
  data: Array<UserPublic>
  count: number
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}
