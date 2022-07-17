import React from "react";
import NextHead from "next/head";

const Head = ({ title }: { title: string }) => {
  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  );
};

export default Head;
