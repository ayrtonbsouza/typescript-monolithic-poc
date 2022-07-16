export interface IOutputFindAllStoreCatalogFacade {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}
