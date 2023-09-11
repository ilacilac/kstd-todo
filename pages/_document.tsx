import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

const TodoDocument = () => {
  return (
    <Html lang="ko">
      <Head>
        <title>KSTD | Todo</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default TodoDocument;
