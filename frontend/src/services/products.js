import axiosInstance from "./axios";
import { PRODUCTS } from "../data/products";

const FALLBACK_IMAGES = PRODUCTS.flatMap((product) => product.images?.length ? product.images : [product.image]).filter(Boolean);

const audienceToDepartment = (audience) => {
  if (!audience) return "Unisex";
  const normalized = String(audience).toLowerCase();
  if (normalized === "men") return "Men";
  if (normalized === "women") return "Women";
  if (normalized === "kids") return "Kids";
  return "Unisex";
};

const categoryToFilter = (categoryName) => {
  const normalized = String(categoryName || "").toLowerCase();
  if (normalized.includes("pant") || normalized.includes("skirt") || normalized.includes("bottom")) return "Bottoms";
  if (normalized.includes("jacket") || normalized.includes("coat") || normalized.includes("outer")) return "Outerwear";
  return "Tops";
};

export const normalizeProduct = (product, index = 0) => {
  const images = product.imageUrls?.length
    ? product.imageUrls
    : [FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]].filter(Boolean);
  const salePrice = Number(product.salePrice);
  const basePrice = Number(product.basePrice);
  const price = Number.isFinite(salePrice) && salePrice > 0 ? salePrice : basePrice;

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brandNames?.[0] || "LuxZera",
    department: audienceToDepartment(product.audience),
    price: Number.isFinite(price) ? price : 0,
    originalPrice: Number.isFinite(salePrice) && salePrice > 0 && basePrice > salePrice ? basePrice : null,
    image: images[0],
    images,
    badge: product.badge || null,
    sizes: product.sizes?.length ? product.sizes : ["S", "M", "L", "XL"],
    category: categoryToFilter(product.categoryName),
  };
};

export const getProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data.map(normalizeProduct);
};
