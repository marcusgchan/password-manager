import React, { ReactNode } from "react";
import s from "./Layout.module.css";
import { signOut } from "next-auth/react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={s.container}>
      <header className={`${s.header} flex justify-between items-center px-4`}>
        <h1 className="text-xl">Password Manager</h1>
        <div>
          <button onClick={() => signOut()}>Log Out</button>
        </div>
      </header>
      <nav className={s.nav}>
        <ul className="grid grid-rows-3 h-full">
          <li className="flex justify-center items-center bg-dark-green">
            <button className="w-full h-full">Passwords</button>
          </li>
          <li className="flex justify-center items-center bg-green">
            <button className="w-full h-full">Security Checker</button>
          </li>
          <li className="flex justify-center items-center bg-light-green">
            <button className="w-full h-full">Events</button>
          </li>
        </ul>
      </nav>
      <section className={s.content}>{children}</section>
    </main>
  );
};

export default Layout;
