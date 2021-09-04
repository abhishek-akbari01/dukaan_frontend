import Link from "next/link";
import { SBadge, SProductSectionHeader } from "../../styles/StyledElements";

interface ProductSectionHeaderProps {
  category_name: string;
  product_count: number;
  category_id: number;
  hasBackground?: boolean;
}
function ProductSectionHeader({
  category_name,
  category_id,
  products,
  hasBackground,
}: ProductSectionHeaderProps) {
  return (
    <SProductSectionHeader hasBackground={!!hasBackground}>
      <div>
        <h2>{category_name.toLowerCase()}</h2>
        <SBadge>{products.length}</SBadge>
      </div>
      <Link href={`/details/${category_id}`}>
        {/* <Link
        href={{
          pathname: `/details/${category_id}`,
          query: { cat_id: category_id },
        }}
      > */}
        <a>See All</a>
      </Link>
    </SProductSectionHeader>
  );
}
export default ProductSectionHeader;
