export interface Product {
   
  name: string;
  shortDescription: string;
  price: number;
  discount: number;
  category: string;
  image: string;
  categoryId: string;
  createdAt?: string; 
  updatedAt?: string;
  
}