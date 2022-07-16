export interface IOutputFindAllProductsDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}
