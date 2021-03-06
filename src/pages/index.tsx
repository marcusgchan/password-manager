import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, signOut, getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const Home: NextPage = ({
  name,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  // console.log(name);
  // if (name) router.replace(`/passwords/${name.split(" ").join("")}`);
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
              className=" bg-blue border-2 border-blue rounded p-2 inline-block"
              onClick={() => {
                router.replace(`/passwords/${name.split(" ").join("")}`);
              }}
            >
              Go to App
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className=" bg-blue border-2 border-blue rounded p-2 inline-block"
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
