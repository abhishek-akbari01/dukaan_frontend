import Link from "next/link";
import React, { ReactElement } from "react";
import styled from "styled-components";
import ButtonCounter from "../components/Button/ButtonCounter";
import LinkMain from "../components/Button/LinkMain";
import EmptyBag from "../components/EmptyBag";
import { OuterContainer } from "../components/helpers";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { imageBaseurl } from "../config";
import { useApp } from "../context/AppContext";
import { SBadge, SBottomSpacer } from "../styles/StyledElements";
import { getTotalItems, mediaQueries } from "../utils";

interface Props {}

export default function Cart({}: Props): ReactElement {
  const { cart, addToCart, removeFromCart } = useApp();
  const total = cart.reduce((acc, curr) => {
    console.log("acc - ", acc);
    console.log("curr - ", curr);

    return acc + curr.discount_price * curr.count;
  }, 0);
  if (!cart.length) {
    return (
      <Layout title="Your bag is empty">
        <OuterContainer>
          <SCartGrid>
            <SCartHeader>
              <SCartHeading>Checkout</SCartHeading>
              <SBadge>{cart.length}</SBadge>
            </SCartHeader>
            <EmptyBag />
          </SCartGrid>
          <Menu />
        </OuterContainer>
      </Layout>
    );
  }
  const totalItems = getTotalItems(cart);

  return (
    <Layout title={`Cart - ${totalItems}`}>
      <OuterContainer>
        <SCartGrid>
          <SCartHeader>
            <SCartHeading>Checkout</SCartHeading>
            {totalItems && <SBadge>{totalItems}</SBadge>}
          </SCartHeader>
          <SCartRow>
            {cart.map((item) => {
              return (
                <SCartItem key={item._id}>
                  <SCartImage
                    src={`${imageBaseurl}/${item.photo}`}
                    srcSet={`${imageBaseurl}/${item.photo}`}
                  />
                  <SCartContent>
                    <h2>{item.prod_name.toLowerCase()}</h2>
                    <small>{item.base_qty}</small>
                    <SItemPriceContainer>
                      <span>₹</span>{" "}
                      <SItemPrice>
                        {" " + item.discount_price.toFixed(2)}
                      </SItemPrice>
                    </SItemPriceContainer>
                    <ButtonCounter
                      count={item.count}
                      addToCart={() => addToCart(item)}
                      removeFromCart={() => removeFromCart(item)}
                    />
                  </SCartContent>
                </SCartItem>
              );
            })}
          </SCartRow>
          <SCartCheckout>
            <SCheckoutContainer>
              <SCheckoutHeader>
                <STextContainer>
                  <SCheckoutText>Item Total </SCheckoutText>
                  <SCheckoutText>{total.toFixed(2)} </SCheckoutText>
                </STextContainer>
                <STextContainer>
                  <SCheckoutText>Delivery </SCheckoutText>
                  <SCheckoutText>30 </SCheckoutText>
                </STextContainer>
                <STextContainer>
                  <SCheckoutTotalText>Grand Total </SCheckoutTotalText>
                  <SCheckoutTotalText>
                    {(total + 30).toFixed(2)}
                  </SCheckoutTotalText>
                </STextContainer>
              </SCheckoutHeader>
              <SCheckoutButtonContainer>
                <LinkMain href="/checkout">Place Order</LinkMain>
              </SCheckoutButtonContainer>
            </SCheckoutContainer>
          </SCartCheckout>
        </SCartGrid>
        <SBottomSpacer />
        <Menu />
      </OuterContainer>
    </Layout>
  );
}
const SCartHeader = styled.div`
  display: flex;
  grid-column: 1/13;
`;
const SCartGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing["10"]};
  ${({ theme }) =>
    mediaQueries("md")(`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
    `)}
`;
const SCartRow = styled.div`
  grid-column: 1/8;
`;
const SCartCheckout = styled.div`
  width: 100%;
  padding-top: 1rem;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  ${({ theme }) =>
    mediaQueries("md")(`
    padding-top: 0;
    border: none;
  grid-column: 9/13;
  max-width: 320px;
  width: 320px;
  justify-self: flex-end;

  `)}
`;
const SCartHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
`;
const SCartItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing["8"]};
  grid-template-columns: 100px 1fr;
  display: grid;

  margin-top: ${({ theme }) => theme.spacing["4"]};
  ${({ theme }) =>
    mediaQueries("sm")(`
      display: flex;
margin-top: 0;
  `)}
`;
const SCartContent = styled.div`
  margin-left: ${({ theme }) => theme.spacing["6"]};
  & h2 {
    font-weight: 500;
    text-transform: capitalize;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.primary};
    ${({ theme }) =>
      mediaQueries("sm")(`
    
    font-size: ${theme.fontSize.lg};
  `)}
  }
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const SCartImage = styled.img`
  overflow: hidden;
  width: 100%;
  object-position: center;
  ${({ theme }) =>
    mediaQueries("sm")(`
      height: 159px;
      width: 159px;
  `)}
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  object-fit: contain;
`;
const SItemPriceContainer = styled.div`
  display: flex;
  margin: ${({ theme }) => theme.spacing["4"]} 0;
`;
const SItemPrice = styled.p`
  /* font-size: ${({ theme }) => theme.fontSize["base"]}; */
  font-size: 15px;
  font-weight: bold;
`;
const SCheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  ${({ theme }) =>
    mediaQueries("md")(`
    margin-top: 0;
  `)}
`;
const SCheckoutHeader = styled.div`
  margin-bottom: 6rem;
  ${({ theme }) =>
    mediaQueries("md")(`
      padding: ${theme.spacing["5"]};
      background-color: #f2f2f3;
      margin-bottom: 0;
  `)}
`;
const STextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SCheckoutText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  ${({ theme }) =>
    mediaQueries("md")(`
    font-size: ${theme.fontSize.base};
  `)}
  margin-bottom: ${({ theme }) => theme.spacing["4"]};
`;
const SCheckoutTotalText = styled.p`
  font-size: ${({ theme }) => theme.fontSize["base"]};
  ${({ theme }) =>
    mediaQueries("md")(`
      font-size: ${theme.fontSize["lg"]};
    
  `)}
  font-weight: bold;
`;
const SCheckoutButtonContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 100px;
  left: 0;
  width: 100%;
  margin: 0 auto;
  left: 50%;
  padding: 0 ${({ theme }) => theme.spacing["4"]};
  transform: translateX(-50%);
  ${({ theme }) =>
    mediaQueries("md")(`
  padding: 0;
  margin-top: ${theme.spacing["6"]};
  width: 100%;
  position: static;
  transform: none;
`)}
`;
