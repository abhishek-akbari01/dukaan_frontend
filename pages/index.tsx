import { GetStaticProps } from "next";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryList } from "../components/Category";
import Menu from "../components/Menu";
import SearchBar from "../components/SearchBar/SearchBar";
import { ITopCategories, ITopProducts } from "../types";
import { getData } from "../utils";
import { ProductSection } from "../components/Products";
import { useApp } from "../context/AppContext";
import { OuterContainer } from "../components/helpers";
import Layout from "../components/Layout";
import { baseUrl } from "../config";
import { getUserData } from "../hooks";
import { worker } from "./worker";
// import socketIOClient from "socket.io-client";

// import { w3cwebsocket as W3CWebSocket } from "websocket";

// const client = new W3CWebSocket("ws://localhost:3000/", "echo-protocol");

// const socket = socketIOClient("http://localhost:3000");
// console.log("socket - ", socket);

type HomeProps = IStaticProps;
interface IStaticProps {
  top_categories: ITopCategories[];
  top_products: ITopProducts[];
}
export default function Home({ categories, products }): ReactElement {
  console.log("categories data- ", categories);
  console.log("products data- ", products);
  // console.log("socket - ", client);

  const publicVapidKey =
    "BB1dpuBfF593gaqR_Pkv4qyGGfqD-WPt64DpKFTEWy6z4urSeyjRRjGOEb3YE0IAjjyCcSDQ0lUjRH_RTd34mXU";

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  useEffect(() => {
    console.log("subisdbfiudb");

    if ("serviceWorker" in navigator) {
      // send().catch((err) => console.error(err));
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/pages/worker.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  //register the service worker, register our push api, send the notification
  async function send() {
    console.log("fdivboijcpkl");

    //register service worker
    const register = await navigator.serviceWorker.register("../worker.js", {
      scope: "/",
    });
    console.log("register - ", register);

    //register push
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,

      //public vapid key
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    console.log("subscription  - ", subscription);

    //Send push notification
    await fetch("http://192.168.1.3:3000/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("service - ", response);
      })
      .catch((err) => {
        console.log("service err - ", err);
      });
  }

  return (
    <Layout title="Dukaan - Online Shopping Site">
      <OuterContainer>
        <SearchBar />
        <SSpacer />
        <SSectionHeading>Top Categories</SSectionHeading>
        {Object.keys(categories).length > 0 && (
          <CategoryList categories={categories} />
        )}

        {products.map((product) => {
          console.log("product - ", product);

          return <ProductSection key={product.cat_name} {...product} />;
        })}
        <div style={{ marginBottom: "6rem" }}></div>
        <Menu />
      </OuterContainer>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getData();
  return { props: data };
};

export const SSectionHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing["5"]};
`;
const SSpacer = styled.div`
  margin-top: ${({ theme }) => theme.spacing["6"]};
`;
