import { useState, useEffect } from "react";
import Layout from "../../../shared/components/layout/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";

const Name = () => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery(["site.getSites"]);
  const [sites, setSites] = useState(data ?? []);

  useEffect(() => {
    if (!isLoading && data) {
      setSites(data);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <section className="flex justify-between outline-red outline-2">
        <input type="text" className="border-black border-2" />
        <button
          className="w-12"
          onClick={() => router.push(`${router.asPath}/new`)}
        >
          <Image
            src="/add-icon.svg"
            alt="add new password"
            height="40"
            width="40"
            layout="responsive"
          />
        </button>
      </section>
      <section>
        {sites.map((site) => {
          return <div key={site.id}>{JSON.stringify(site)}</div>;
        })}
      </section>
    </Layout>
  );
};

Name.auth = true;

export default Name;
