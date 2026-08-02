// types.ts
export interface LocateBusinessData {
  name: string;
  contactName: string;
  location: string;
  rating: number;
  image: string;
  photos: string[];
  buttons: string[];
}

export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
}

export interface Product {
  id: number;
  name: string;
  brand: "Davidoff" | "Marlboro" | "Dunhill";
  strength: "Ultra Light" | "Light" | "Medium" | "Full Strength";
  flavour: "Classic" | "Menthol" | "Vanilla";
  packSize: "10 Pack" | "20 Pack" | "Carton x 10";
  price: number;
  image: string;
}