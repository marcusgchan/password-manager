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
      <nav className={s.nav}>asdf</nav>
      <section className={s.content}>{children}</section>
    </main>
  );
};

export default Layout;
