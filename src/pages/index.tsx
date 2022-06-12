import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (user) router.replace("/sites");

  return (
    <>
      <Head>
        <title>Password Manager</title>
      </Head>
      <main className="flex justify-center h-full">
        <section className="flex flex-col items-center">
          <h1>Password Manager</h1>
          <p>A simple password manager app</p>
          <a
            href="/api/auth/login"
            className=" bg-violet border-2 border-violet rounded p-2 inline-block"
          >
            Login
          </a>
        </section>
      </main>
    </>
  );
};

export default Home;
