/* Defines the product entity */
export interface Product {
  id: number;
  productName: string;
  productCode: string;
  category: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  providers: IProvider[];
}

export interface IProvider {
  providerName: string;
  providerAddress: string;
}

export interface ProductResolved {
  product: Product;
  error?: any;
}
