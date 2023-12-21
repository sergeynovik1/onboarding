export interface SubscriptionPackage {
  _id: string;
  planType: string;
  planName: string;
  amount: number;
  description: string[];
  createdAt: Date;
  updatedAt: Date;
  cycleId: number;
  planId: number;
  productId: number;
  default: boolean;
  internalId: string;
  amount_discount: number;
}
