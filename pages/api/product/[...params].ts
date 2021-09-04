import type { NextApiRequest, NextApiResponse } from "next";
import data from "../data.json";
import { INotFound, ProductResponse, IProduct } from "../../../types";

// const newData = fetch(
//   `http://192.168.1.5:3000/api/products/60f6871778734240284d23db`,
//   {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2ODcxNzc4NzM0MjQwMjg0ZDIzZGIiLCJpYXQiOjE2Mjg1MTM0MzB9.jY5XT-rU6rmp2rtqWQZDe4ssb9SximJgm_u1UgDObJc",
//     },
//   }
// );

export default (
  req: NextApiRequest,
  res: NextApiResponse<INotFound | ProductResponse>
) => {
  console.log("************************************");
  if ("params" in req.query && Array.isArray(req.query.params)) {
    const [categoryId, productId] = req.query.params;

    console.log(categoryId, productId);

    const foundCategory = data.all_products.find(
      (prod) => prod.category_id === Number(categoryId)
    );
    if (!foundCategory) {
      res.statusCode = 404;
      return res.send({ message: "Product not found" });
    }
    // const products =
    if (Array.isArray(foundCategory.products)) {
      const foundProduct = (foundCategory.products as Array<IProduct>).find(
        (el) => el.id === Number(productId)
      );
      if (!foundProduct) {
        res.statusCode = 404;
        return res.send({ message: "Product not found" });
      }
      res.statusCode = 404;
      return res.send({ product: foundProduct });
    }
  }
  res.statusCode = 404;
  return res.send({ message: "Not found" });
};
