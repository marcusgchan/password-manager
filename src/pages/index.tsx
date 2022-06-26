import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, signOut, getSession } from "next-auth/react";

const Home: NextPage = ({
  name,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Password Manager</title>
      </Head>
      <main className="flex justify-center h-full">
        <section className="flex flex-col items-center">
          <h1>Password Manager</h1>
          <p>A simple password manager app</p>
          {name ? (
            <button
              className=" bg-violet border-2 border-violet rounded p-2 inline-block"
              onClick={() => {
                router.replace(`/passwords/${name.split(" ").join("")}`);
              }}
            >
              Go to App
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className=" bg-violet border-2 border-violet rounded p-2 inline-block"
            >
              Login
            </button>
          )}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const name = session?.user?.name;
  return {
    props: { name: name ?? null },
  };
};

export default Home;
