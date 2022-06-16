import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    const id = session?.id;
    router.replace(`/passwords/${id}`);
    return <div>Loading</div>;
  }
  return (
    <>
      <Head>
        <title>Password Manager</title>
      </Head>
      <main className="flex justify-center h-full">
        <section className="flex flex-col items-center">
          <h1>Password Manager</h1>
          <p>A simple password manager app</p>
          <button
            onClick={() => signIn()}
            className=" bg-violet border-2 border-violet rounded p-2 inline-block"
          >
            Login
          </button>
        </section>
      </main>
    </>
  );
};

export default Home;
