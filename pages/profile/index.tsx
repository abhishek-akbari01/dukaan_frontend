import { useRouter } from "next/dist/client/router";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { SSectionHeading } from "..";
import { OuterContainer } from "../../components/helpers";
import Layout from "../../components/Layout";
import { baseUrl } from "../../config";

export default function index() {
  const [user, setUser] = useState({
    name: "",
    mobileNo: "",
    pincode: "",
    city: "",
    address: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    console.log("sdfd", e);

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    console.log("user - ", user);

    const { name, mobileNo, pincode, city, address } = user;

    if (
      name == "" ||
      mobileNo == "" ||
      pincode == "" ||
      city == "" ||
      address == ""
    ) {
      return alert("Please enter all the field");
    }

    fetch(`${baseUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        mobileNo: mobileNo,
        pincode: pincode,
        city: city,
        address: address,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.err) {
          return alert(response.err);
        }
        console.log(response.user._id);
        window.localStorage.setItem("userId", JSON.stringify(response.user));

        router.push("/");
      })
      .catch((err) => {
        console.log("Err - ", err);
        return alert("Something went wrong");
      });

    event.preventDefault();
  };

  return (
    <Layout title="Profile">
      <OuterContainer>
        <SOrderHeader>
          <SSectionHeading>Profile</SSectionHeading>
        </SOrderHeader>
        <form onSubmit={(event) => handleSubmit(event)}>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => {
              console.log(e);

              handleChange(e);
            }}
          />
          <br></br> <br></br>
          <label htmlFor="">Mobile : </label>
          <input
            type="text"
            pattern="[0-9]*"
            maxLength={10}
            minLength={6}
            name="mobileNo"
            value={user.mobileNo}
            onChange={(e) => handleChange(e)}
          />
          <br></br> <br></br>
          <label htmlFor="">Pincode : </label>
          <input
            type="text"
            name="pincode"
            pattern="[0-9]*"
            maxLength={6}
            minLength={6}
            value={user.pincode}
            onChange={(e) => handleChange(e)}
          />
          <br></br> <br></br>
          <label htmlFor="">City : </label>
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={(e) => handleChange(e)}
          />
          <br></br> <br></br>
          <label htmlFor="">Address : </label>
          <textarea
            name="address"
            cols="30"
            rows="10"
            value={user.address}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <br></br> <br></br>
          <input type="submit" />
        </form>
      </OuterContainer>
    </Layout>
  );
}

const SOrderHeader = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;
