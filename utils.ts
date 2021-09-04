import { baseUrl } from "./config";
import data from "./pages/api/data.json";
import {
  IAllProducts,
  ICartProduct,
  ICategory,
  INotFound,
  IProduct,
  IProducutWithCategory,
  ITopCategories,
} from "./types";

export async function getData() {
  // const { top_categories, top_products } = data;

  const responseCat = await fetch(
    `${baseUrl}/categories/60f6871778734240284d23db`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2ODcxNzc4NzM0MjQwMjg0ZDIzZGIiLCJpYXQiOjE2Mjg1MTM0MzB9.jY5XT-rU6rmp2rtqWQZDe4ssb9SximJgm_u1UgDObJc",
      },
    }
  );

  const responseCatJson = await responseCat.json();
  const categories = responseCatJson.categories;

  const response = await fetch(
    `${baseUrl}/products/categories/60f6871778734240284d23db`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2ODcxNzc4NzM0MjQwMjg0ZDIzZGIiLCJpYXQiOjE2Mjg1MTM0MzB9.jY5XT-rU6rmp2rtqWQZDe4ssb9SximJgm_u1UgDObJc",
      },
    }
  );
  const prod = await response.json();
  const products = prod.result;
  return { categories, products };
}

const notFound = { message: "Not Found" };

export async function getProduct(categoryId: string, productId: string) {
  console.log("prodId - ", productId);

  if (!categoryId && !productId) {
    console.log("gone");

    return notFound;
  }

  const response = await fetch(
    `${baseUrl}/products/categories/60f6871778734240284d23db`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2ODcxNzc4NzM0MjQwMjg0ZDIzZGIiLCJpYXQiOjE2Mjg1MTM0MzB9.jY5XT-rU6rmp2rtqWQZDe4ssb9SximJgm_u1UgDObJc",
      },
    }
  );

  const products = await response.json();
  console.log("products jan - ", products);

  const foundCategory = products.result.find((prod) => prod._id === categoryId);

  console.log("foundCategory jkdg- ", foundCategory);

  if (!foundCategory) {
    return notFound;
  }
  if (Array.isArray(foundCategory.products)) {
    const foundProduct = (foundCategory.products as Array<IProduct>).find(
      (el) => el._id === productId
    );
    console.log("foundProduct - ", foundProduct);

    if (!foundProduct) {
      return notFound;
    }
    return {
      category_id: foundCategory._id,
      category_name: foundCategory.cat_name,
      product: foundProduct,
    };
  }
  return notFound;
}
interface StaticPropsReturn {
  params: {
    categoryId: string;
    productId: string;
  };
}
export async function getTopProductsIds() {
  const response = await fetch(
    `${baseUrl}/products/categories/60f6871778734240284d23db`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2ODcxNzc4NzM0MjQwMjg0ZDIzZGIiLCJpYXQiOjE2Mjg1MTM0MzB9.jY5XT-rU6rmp2rtqWQZDe4ssb9SximJgm_u1UgDObJc",
      },
    }
  );

  const products = await response.json();
  // console.log("products jan - ", products);

  // Get the top products and make static files for them
  const result: StaticPropsReturn[] = [];
  products.result.forEach((topProduct) => {
    topProduct.products.forEach((product) => {
      if (product) {
        console.log("cat id - ", topProduct._id);
        console.log("prod id - ", product._id);

        result.push({
          params: {
            categoryId: topProduct._id.toString(),
            productId: product._id.toString(),
          },
        });
      }
      // else {
      //   console.log(
      //     "🚀 ~ file: utils.ts ~ line 54 ~ topProduct.products.forEach ~ product",
      //     product,
      //   );
      // }
    });
  });
  console.log("result - ", result);

  return result;
}

export async function getCategory(category_id: string) {
  console.log("category_id - ", category_id);

  const response = await fetch(
    `${baseUrl}/products/categories/60f6871778734240284d23db`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2ODcxNzc4NzM0MjQwMjg0ZDIzZGIiLCJpYXQiOjE2Mjg1MTM0MzB9.jY5XT-rU6rmp2rtqWQZDe4ssb9SximJgm_u1UgDObJc",
      },
    }
  );

  const products = await response.json();

  // console.log("new products - ", products.result);

  const foundCategory = await products.result.find((product) => {
    console.log("product - ", product._id);
    return product._id === category_id;
  });

  // console.log("type - ", typeof foundCategory);

  // const data = Promise.all(foundCategory);
  // console.log("data - ", data);

  // console.log("foundCategory - ", foundCategory);

  if (!foundCategory) {
    return undefined;
  }
  return foundCategory;
}

export async function getCategoryList() {
  const response = await fetch(
    `${baseUrl}/categories/60f6871778734240284d23db`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2ODcxNzc4NzM0MjQwMjg0ZDIzZGIiLCJpYXQiOjE2Mjg1MTM0MzB9.jY5XT-rU6rmp2rtqWQZDe4ssb9SximJgm_u1UgDObJc",
      },
    }
  );
  const responseJson = await response.json();
  const categories = responseJson.categories;
  return categories;
}

export function getPercentageDecreased(
  originalPrice: number,
  basePrice: number
) {
  return Math.round(((originalPrice - basePrice) / originalPrice) * 100);
}
/**
 * Find the products for a give query
 */
export async function findProducts(query: string) {
  if (!query.trim().length) {
    return [];
  }

  const response = await fetch(
    `${baseUrl}/products/categories/60f6871778734240284d23db`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2ODcxNzc4NzM0MjQwMjg0ZDIzZGIiLCJpYXQiOjE2Mjg1MTM0MzB9.jY5XT-rU6rmp2rtqWQZDe4ssb9SximJgm_u1UgDObJc",
      },
    }
  );

  const categories = await response.json();

  const foundProducts = [];
  categories.result.forEach((category) => {
    category.products.forEach((product: IProduct) => {
      if (product.prod_name.toLowerCase().includes(query.toLowerCase())) {
        foundProducts.push(product);
      }
    });
  });
  return foundProducts;
}

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
export const mediaQueries = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | String) =>
    `@media (min-width: ${breakpoints[key]}) { ${style} }`;
};
export const getTotalItems = (cart: ICartProduct[]) => {
  console.log("cart - ", cart);

  return cart.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);
};
