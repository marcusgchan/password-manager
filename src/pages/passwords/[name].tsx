import React from "react";
import Layout from "../../components/shared/layout/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const Name = () => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery(["getSites"]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
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
