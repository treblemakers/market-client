import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Router from "next/router";
import Cookies from "js-cookie";
import { AuthContext } from "../appState/AuthProvider";

const LOG_IN = gql`
  mutation LOG_IN($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        name
        username
        email
      }
      jwt
    }
  }
`;

const login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { setAuthUser } = useContext(AuthContext);

  const [login, { loading, error }] = useMutation(LOG_IN, {
    variables: { ...user },
    onCompleted: (data) => {
      if (data) {
        setAuthUser(data.login.user);
        Cookies.set("jwt", data.login.jwt);
        // setUser({
        //   email: "",
        //   password: "",
        // });
        Router.push("/");
        // Router.reload("/");
      }
    },
  });

  // onCompleted: (data) => {
  //   if (data) {
  //     setAuthUser(data.login.user);
  //     Cookies.set("jwt", data.login.jwt);
  //     setUserInfo({
  //       email: "",
  //       password: "",
  //     });
  //     //Router.push("/");
  //     Router.reload("/");
  //   }
  // }

  console.log(user);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await login();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ width: "300px", margin: "auto" }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>username</Form.Label>
            <Form.Control
              value={user.username}
              name="username"
              onChange={handleChange}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={user.password}
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            เข้าสู่ระบบ
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default login;
