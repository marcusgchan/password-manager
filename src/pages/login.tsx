import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className="h-screen flex justify-center items-center">
        <section className=" h-96 w-72 bg-zinc-800">
          <h1>Login</h1>
          <form className="flex flex-col">
            <div>
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="bg-slate-400 border-1px border-cyan-400"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input type="text" />
            </div>
            <button>Log in</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
