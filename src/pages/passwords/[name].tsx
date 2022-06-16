import React from "react";
import Layout from "../../components/shared/layout/Layout";
import Image from "next/image";

const Name = () => {
  return (
    <Layout>
      <section className="text-right">
        <Image src="/add-icon.svg" height="50" width="50" />
      </section>
    </Layout>
  );
};

export default Name;
