import React, { ReactElement } from "react";
import { SProductSection } from "../../styles/StyledElements";
import { ITopProducts } from "../../types";
import ProductList from "./ProductList";
import ProductSectionHeader from "./ProductSectionHeader";

interface ProductsSectionProps extends ITopProducts {}

export default function ProductSection({
  _id,
  cat_name,
  products,
}: ProductsSectionProps): ReactElement {
  return (
    <SProductSection>
      <ProductSectionHeader
        hasBackground
        category_id={_id}
        category_name={cat_name}
        products={products}
        // product_count={product_count}
      />
      <ProductList products={products} category_id={_id} />
    </SProductSection>
  );
}
