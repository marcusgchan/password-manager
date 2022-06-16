import React, { ReactNode } from "react";
import s from "./Layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={s.container}>
      <header className={`${s.header} flex justify-between items-center px-4`}>
        <h1 className="text-xl">Password Manager</h1>
        <div>
          <a href="/api/auth/logout">Log Out</a>
        </div>
      </header>
      <nav className={s.nav}>
        <ul className="grid grid-rows-3 h-full">
          <li className="flex justify-center items-center">
            <button className="w-full h-full">Passwords</button>
          </li>
          <li className="flex justify-center items-center">
            <button className="w-full h-full">Security Checker</button>
          </li>
          <li className="flex justify-center items-center">
            <button className="w-full h-full">Events</button>
          </li>
        </ul>
      </nav>
      <section className={s.content}>{children}</section>
    </main>
  );
};

export default Layout;
