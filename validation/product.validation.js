const defaultValString = { isString: true, trim: true };
const product = {
  sku: { ...defaultValString, optional: true },
  title: { ...defaultValString, optional: true },
  metaTitle: { ...defaultValString, required: true },
  slug: { ...defaultValString, optional: true },
  imageUrls: [{ isString: true }],
  status: {
    ...defaultValString,
    optional: true,
    inIn: {
      options: ["sale", "new"],
    },
  },
  inventoryStatus: { ty },
  price: { isInt: true, toInt: true, require: true },
  priceSale: { isInt: true, toInt: true },
  quantity: { isString: true, require: true },
  isHidden: { isBoolean: true, optional: true },
  descriptionId: {},
};

const getAllProducts = {};
const getProductById = {};
const createProduct = {};
const updateProduct = {};
