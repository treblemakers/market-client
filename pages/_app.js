import "../assets/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";

//ต่อ front back
import { ApolloProvider } from "@apollo/react-hooks";

import AuthProvider from "../appState/AuthProvider";
import apolloClient from "../apollo/apolloClient";

import fetch from "isomorphic-unfetch";
import cookie from "cookie";

const QUERY_USER = {
  query: `
    query {
      user {
        id
        name
        username
        email
      }
    }
  `,
};

function MyApp({ Component, pageProps, apollo, user }) {
  return (
    <ApolloProvider client={apollo}>
      <AuthProvider userData={user}>
        <Navbar />
        <Component {...pageProps} />{" "}
      </AuthProvider>
    </ApolloProvider>
  );
}

export function getStaticPaths() {
  return {
    // enables blocking mode for the fallback behavior
    fallback: "blocking",
  };
}

MyApp.getInitialProps = async ({ ctx, router }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }

  // console.log(ctx.req.headers)
  // console.log("Router : ",router)
  const { headers } = ctx.req;

  const cookies = headers && cookie.parse(headers.cookie || "");

  const token = cookies && cookies.jwt;
  // console.log(token)

  // Route Protection
  if (!token) {
    if (router.pathname === "/test") {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    }
    return null;
  }
  // Route Protection /login
  if (token) {
    if (router.pathname === "/login") {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    }
    if (router.pathname === "/signup") {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    }
  }

  const response = await fetch("http://localhost:9090/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}` || "",
    },
    body: JSON.stringify(QUERY_USER),
  });

  if (response.ok) {
    const result = await response.json();
    // console.log(result)
    return { user: result.data.user };
  } else {
    // Route Protection
    if (router.pathname === "/test") {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    }
    return null;
  }
  // calls page's `getInitialProps` and fills `appProps.pageProps`
};

export default apolloClient(MyApp);
