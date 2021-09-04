import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { IconCheckSuccess, OuterContainer } from "../components/helpers";
import Menu from "../components/Menu";
import Image from "next/image";
import { mediaQueries } from "../utils";
import LinkMain from "../components/Button/LinkMain";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useCart } from "../hooks";
import { useApp } from "../context/AppContext";
import Layout from "../components/Layout";
import { baseUrl } from "../config";
import Invoice from "./Invoice";

const ReactDOM = require("react-dom");
const { useAlert } = require("react-alert");

interface Props {}

export default function Checkout({}: Props): ReactElement {
  const { clearCart, cart, setOrders, orders } = useApp();
  // const alert = useAlert();

  useEffect(async () => {
    if (process.browser && cart.length) {
      console.log("cart cart");
      console.log("cart kahvdf - ", cart);
      setOrders([...orders, ...cart]);

      const user = await JSON.parse(window.localStorage.getItem("userId"));
      console.log("user local k - ", user);

      // if (user == null) {
      //   return alert("Please login to place order");
      // }

      fetch(`${baseUrl}/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purchases: cart,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log("purchase err - ", err);
        });

      clearCart();
    }
  }, []);

  return (
    <Layout title="Your Order Is Successful">
      <OuterContainer>
        <Invoice />
        <SCheckoutContainer>
          <SCheckoutWrapper>
            <IconCheckSuccess />
            <h2>Your Order Is Successful</h2>
            <p>Thank you for shopping with us</p>
            <SButtonContainer>
              <Link href="/orders" passHref>
                <SLinkOrders>See All Orders</SLinkOrders>
              </Link>
              <LinkMain href="/">Continue Shopping</LinkMain>
            </SButtonContainer>
          </SCheckoutWrapper>
        </SCheckoutContainer>
        <Menu />
      </OuterContainer>
    </Layout>
  );
}
const SCheckoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;
const SCheckoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  & h2 {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSize["xl"]};
    margin-top: ${({ theme }) => theme.spacing["6"]};
    margin-bottom: ${({ theme }) => theme.spacing["4"]};
  }
  & p {
    font-size: ${({ theme }) => theme.fontSize["base"]};
    margin-bottom: ${({ theme }) => theme.spacing["4"]};
    color: gray;
  }
  & #icon-success {
    width: 80px;
    height: 80px;
    /* background-color: red; */
    background-image: url("/order-success.gif");
  }
`;
const SButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing["12"]};
  position: fixed;
  bottom: 100px;
  display: grid;
  padding: 0 1rem;
  grid-template-rows: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing["3"]};
  width: 100%;
  ${() =>
    mediaQueries("md")(`
    position: static;
  grid-template-columns: 1fr 1fr;
  
  `)}
`;
const SLinkOrders = styled.a`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  padding: 14px 66px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;
