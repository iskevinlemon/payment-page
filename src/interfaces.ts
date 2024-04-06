export interface ItemDetails{
  name: string;
  quantity: number;
  pricePerUnit: number;
}

export interface PaymentDetails{
  isTestMode: boolean;
  merchantName: string;
  item: ItemDetails[];
  currencyCode: string;
  amount: number;
}

export interface CheckOutDetails{
  paymentDetails: PaymentDetails
}