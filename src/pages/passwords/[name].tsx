import React from "react";
import Layout from "../../components/shared/layout/Layout";
import Image from "next/image";
import { useRouter } from "next/router";

const Name = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <Layout>
      <section className="text-right">
        <button>
          <Image
            src="/add-icon.svg"
            alt="add new password"
            height="50"
            width="50"
          />
        </button>
      </section>
    </Layout>
  );
};

Name.auth = true;

export default Name;
