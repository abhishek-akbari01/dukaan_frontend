import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { OuterContainer } from "../../components/helpers";
import Layout from "../../components/Layout";
import Menu from "../../components/Menu";
import SearchBarFixed from "../../components/SearchBar/SearchBarFixed";
import { baseUrl, imageBaseurl } from "../../config";
import {
  SBottomSpacer,
  SCategoryLabel,
  SCategoryOverlay,
  SProductGrid,
} from "../../styles/StyledElements";
import { ITopCategories } from "../../types";
import { getCategoryList, mediaQueries } from "../../utils";

interface CategoryProps {
  categories: ITopCategories[];
}

export default function Categories({
  categories,
}: CategoryProps): ReactElement {
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   fetch(`${baseUrl}/categories/60f6871778734240284d23db`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2ODcxNzc4NzM0MjQwMjg0ZDIzZGIiLCJpYXQiOjE2Mjg1MTM0MzB9.jY5XT-rU6rmp2rtqWQZDe4ssb9SximJgm_u1UgDObJc",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response.categories);
  //       if (response.err) {
  //         console.log("error");
  //         return;
  //       }
  //       setCategories(response.categories);
  //     })
  //     .catch((err) => console.log("Error - ", err));
  // }, []);
  console.log("categories dfgf - ", categories);

  return (
    <Layout title="Categories | Dukaan">
      <OuterContainer>
        <SearchBarFixed hasBackLink={false} />
        <SCategoryHeading>Listed Categories</SCategoryHeading>
        <SCategoryGrid>
          {categories.map((category) => (
            <Link href={`/details/${category._id}`} passHref key={category._id}>
              <SCategoryItem>
                <img
                  src={`${imageBaseurl}/${category.photo}`}
                  alt={`${imageBaseurl}/${category.photo}`}
                  srcSet={`${imageBaseurl}/${category.photo}`}
                />
                <SCategoryOverlay>
                  <SCategoryName>
                    {category.cat_name.toLowerCase()}
                  </SCategoryName>
                </SCategoryOverlay>
              </SCategoryItem>
            </Link>
          ))}
        </SCategoryGrid>
        <SBottomSpacer />
        <Menu />
      </OuterContainer>
    </Layout>
  );
}
const SCategoryGrid = styled.div`
  display: grid;
  margin-top: ${({ theme }) => theme.spacing["4"]};
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing["4"]};
  ${() =>
    mediaQueries("sm")(`
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  `)}
  ${() =>
    mediaQueries("lg")(`
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  `)}
`;
const SCategoryItem = styled.a`
  width: 100%;
  position: relative;
  /* cursor: pointer; */
  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing["4"]};
  }
  & img {
    vertical-align: bottom;
    width: 100%;
    border-radius: 0.5rem;
    height: 260px;
  }
`;
const SCategoryName = styled.h4`
  padding-left: 1rem;
  padding-right: 0.5rem;
  font-weight: 500;
  color: #fff;
  text-transform: capitalize;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.white};
  text-transform: capitalize;
  white-space: pre-wrap;
  font-size: 15px;
  padding-bottom: 1rem;
  ${({ theme }) =>
    mediaQueries("sm")(`
  padding-bottom: 1.5rem; 
  font-size: ${theme.fontSize.sm}; 
  `)}
  ${({ theme }) =>
    mediaQueries("md")(`
  font-size: ${theme.fontSize.lg}; 
  `)}
`;
const SCategoryHeading = styled.h2`
  margin-top: 6rem;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize["base"]};
  ${({ theme }) =>
    mediaQueries("sm")(`
    font-size: ${theme.fontSize["xl"]};
  `)}
`;
export async function getServerSideProps(): Promise<{
  props: CategoryProps;
}> {
  const categories = await getCategoryList();
  return {
    props: {
      categories,
    },
  };
}
