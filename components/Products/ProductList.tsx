import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { useApp } from "../../context/AppContext";
import {
  SIconBadge,
  SProductBody,
  SProductGrid,
  SProductGridItem,
  SProductImage,
  SProductImagePlaceholder,
  SProductLink,
  SProductPrice,
} from "../../styles/StyledElements";
import { IProduct } from "../../types";
import { getPercentageDecreased, mediaQueries } from "../../utils";
import ButtonAdd from "../Button/ButtonAdd";
import ButtonCounter from "../Button/ButtonCounter";
import { imageBaseurl } from "../../config";

interface ProductListProps {
  products: IProduct[];
  category_id: number;
}

function Placeholder({}): ReactElement {
  return <SProductImagePlaceholder />;
}

export default function ProductList({
  products,
  category_id,
}: ProductListProps) {
  const { addToCart, cart, removeFromCart } = useApp();

  return (
    <SProductGrid>
      {products?.map((product) => {
        console.log("from product - ", product);
        console.log("cart sf- ", cart);

        const onlyAboveProduct = cart.filter((item) => {
          console.log("item - ", item);
          return item._id === product._id;
        })[0];
        console.log("onlyAboveProduct - ", onlyAboveProduct);

        const isInCart = !!onlyAboveProduct;
        console.log("isInCart - ", isInCart);

        const percentage = getPercentageDecreased(
          product.price,
          product.discount_price
        );

        const handleAddToCart = () => () => {
          addToCart(product);
        };
        const arePricesSame = product.price === product.discount_price;
        return (
          <SProductGridItem key={product._id}>
            <Link
              key={product._id}
              passHref
              href={`/details/${category_id}/${product._id}`}
            >
              <SProductLink>
                {/* <div style={{ width: "100%", height: 250 }}> */}
                <LazyLoadImage
                  effect="blur"
                  delayTime={500}
                  height={300}
                  width={400}
                  className="product-image"
                  src={`${imageBaseurl}/${product.photo}`}
                  alt={product.prod_name}
                  placeholder={<Placeholder />}
                  srcSet={`${imageBaseurl}/${product.photo}`}
                />
                {/* </div> */}
                {/* <SProductImage
                  src={product.image}
                  alt={product.name}
                  srcSet={product.image}
                /> */}
                {!arePricesSame && (
                  <SProductBadge>{percentage}% Off</SProductBadge>
                )}
              </SProductLink>
            </Link>
            <SProductBody>
              <Link
                key={product._id}
                href={`/details/${category_id}/${product._id}`}
              >
                <a>
                  <h2>{product.prod_name.toLowerCase()}</h2>
                </a>
              </Link>
              {/* <small>{product.base_qty}</small> */}
              <SProductPrice>
                <SPriceContainer>
                  <div>₹{product.discount_price}</div>
                  {!arePricesSame && <div id="base-cost">₹{product.price}</div>}
                </SPriceContainer>
                {isInCart ? (
                  <ButtonCounter
                    count={onlyAboveProduct.count}
                    addToCart={handleAddToCart()}
                    removeFromCart={() => removeFromCart(product)}
                  />
                ) : (
                  <ButtonAdd
                    isInCart={!!onlyAboveProduct}
                    addToCart={handleAddToCart()}
                  />
                )}
              </SProductPrice>
            </SProductBody>
          </SProductGridItem>
        );
      })}
    </SProductGrid>
  );
}
const SPriceContainer = styled.div`
  display: flex;
  align-items: center;
  & div:nth-of-type(1) {
    font-weight: 500;
    font-size: 15px;
    ${({ theme }) =>
      mediaQueries("sm")(`
    font-size: ${theme.fontSize.base};
    `)};
    padding-right: ${({ theme }) => theme.spacing["1"]};
  }
  & div:nth-of-type(2) {
    text-decoration: line-through;
    color: gray;
    font-size: ${({ theme }) => theme.fontSize["sm"]};
  }
`;
const SProductBadge = styled.div`
  position: absolute;

  font-weight: bold;

  margin-right: 6px;
  margin-top: 6px;
  white-space: nowrap;
  text-transform: uppercase;
  vertical-align: baseline;
  padding-top: 3px;
  font-size: 12px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  background-color: #ee741f;
  display: inline-block;
  width: 68px;
  height: 22px;
  border-radius: 4px;
  left: 50%;
  transform: translate(-50%);
  bottom: 8px;
  font-size: 10px;
  ${() =>
    mediaQueries("md")(`
  top: 6px;
  right: 9px;
  transform: none;
  left: unset;
  bottom: unset;
  font-size: 12px;

  `)};
`;
