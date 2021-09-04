// Show categories
import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { OuterContainer } from "../../../components/helpers";
import Layout from "../../../components/Layout";
import Menu from "../../../components/Menu";
import NotFound from "../../../components/NotFound";
import ProductList from "../../../components/Products/ProductList";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { baseUrl } from "../../../config";
import {
  SBottomSpacer,
  SProductSectionHeader,
} from "../../../styles/StyledElements";
import { IAllProducts } from "../../../types";
import { getCategory, getCategoryList } from "../../../utils";

interface Props {
  category: IAllProducts;
}

export default function Category({ category }: Props): ReactElement {
  if (!category) {
    return <NotFound>Not Found vi</NotFound>;
  }

  console.log("dfgth - ", category);

  return (
    <Layout title={`${category.cat_name || "Category"}`}>
      <OuterContainer>
        <SearchBar />
        <SProductSectionHeader hasBackground={false}>
          <div>
            <h2>{category.cat_name}</h2>
          </div>
        </SProductSectionHeader>
        <ProductList products={category.products} category_id={category._id} />
        <SBottomSpacer />
        <Menu />
      </OuterContainer>
    </Layout>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   console.log(
//     "🚀 ~ file: index.tsx ~ line 20 ~ getServerSideProps ~ context",
//     context.params
//   );
//   if (context) {
//     if (context && "params" in context && "categoryId" in context.params!) {
//       const categoryId = context.params!.categoryId! as string;
//       // console.log("categoryId - ", categoryId);

//       const category = getCategory(categoryId);
//       if (!category) {
//         return {
//           props: {},
//         };
//       }
//       console.log(category);
//       return {
//         props: { category },
//       };
//     }
//   }
//   // const category
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  console.log(ctx);

  if (ctx && "params" in ctx && "categoryId" in ctx.params!) {
    const categoryId = ctx.params!.categoryId! as string;
    console.log("categoryId kjh- ", categoryId);
    const category = await getCategory(categoryId);
    console.log("category - ", category);

    if (!category) {
      return {
        props: {},
      };
    }
    return {
      props: { category },
    };
  }
  return { props: {} };
};

export const getStaticPaths = async () => {
  // Generating static files for all the top products
  const categoryList = await getCategoryList();
  console.log("categoryList - ", categoryList);

  const staticList = categoryList.map((item) => ({
    params: {
      categoryId: `${item._id}`,
    },
  }));

  console.log("staticList dff - ", staticList);

  return {
    fallback: true,
    paths: staticList,
  };
};
