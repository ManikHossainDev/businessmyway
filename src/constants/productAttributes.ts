export const EXCLUDED_PRODUCT_CATEGORY = "Brands";

export type ProductAttributeField = {
  key: string;
  label: string;
  options: string[];
};

export const PRODUCT_ATTRIBUTE_SCHEMA: Record<string, ProductAttributeField[]> = {
  cigarettes: [
    {
      key: "strength",
      label: "Strength",
      options: ["Ultra Light", "Light", "Medium", "Full Strength"],
    },
    {
      key: "flavour",
      label: "Flavour",
      options: ["Classic", "Menthol", "Vanilla"],
    },
    {
      key: "packSize",
      label: "Pack Size",
      options: ["10 Pack", "20 Pack", "Carton x 10"],
    },
  ],
  cigars: [
    {
      key: "vitola",
      label: "Size / Vitola",
      options: ["Robusto", "Churchill", "Toro", "Corona", "Panetela"],
    },
    {
      key: "origin",
      label: "Origin",
      options: ["Cuba", "Nicaragua", "Dominican Republic", "Honduras"],
    },
    {
      key: "wrapperColor",
      label: "Wrapper Colour",
      options: ["Natural", "Claro", "Colorado", "Maduro"],
    },
    {
      key: "packSize",
      label: "Pack Size",
      options: ["10 Pack", "20 Pack", "Carton x 10"],
    },
  ],
  tobacco: [
    {
      key: "type",
      label: "Type",
      options: ["Pipe Tobacco", "Rolling Tobacco", "Loose Leaf", "Shisha"],
    },
    {
      key: "leafOrigin",
      label: "Leaf Origin",
      options: ["Virginia", "Burley", "Oriental", "Latakia"],
    },
    {
      key: "weight",
      label: "Weight",
      options: ["25g", "50g", "100g", "250g"],
    },
  ],
  accessories: [
    {
      key: "accessoryType",
      label: "Category",
      options: [
        "Lighters",
        "Cutters & Guillotines",
        "Cigar Cases",
        "Humidors",
        "Ashtrays",
        "Pipes",
        "Gift Sets",
      ],
    },
    {
      key: "material",
      label: "Material",
      options: ["Gold Plated", "Sterling Silver", "Leather", "Walnut Wood", "Stainless Steel"],
    },
  ],
};

export const toCategorySlug = (name: string) => name.trim().toLowerCase();

export const getAttributeFields = (categoryName: string): ProductAttributeField[] => {
  return PRODUCT_ATTRIBUTE_SCHEMA[toCategorySlug(categoryName)] ?? [];
};

/** Strength/flavour/vitola sidebar filters exist only for these 4 shop categories. */
export const hasFilterSidebar = (categoryName: string) =>
  getAttributeFields(categoryName).length > 0;

/** Products can be assigned to any category except Brands. */
export const isProductCategory = (categoryName: string) =>
  toCategorySlug(categoryName) !== toCategorySlug(EXCLUDED_PRODUCT_CATEGORY);
