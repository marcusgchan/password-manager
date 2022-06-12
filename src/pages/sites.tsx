import React from "react";
import Layout from "../components/shared/layout/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const sites = withPageAuthRequired(() => {
  return (
    <Layout>
      <div>hi</div>
    </Layout>
  );
});

export default sites;
