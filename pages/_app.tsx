import { Button, styled, Typography } from "@mui/material";
import { TodosProvider } from "context/TodoContext";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <title>KSTD | 전체 할 일 목록</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <HeaderStyled>
          <TitleWrapStyled variant="h1">
            <TitleStyled href="/">TODO LIST</TitleStyled>
          </TitleWrapStyled>
        </HeaderStyled>
        <TodosProvider>
          <Component {...pageProps} />
        </TodosProvider>
        <div id="modal-root"></div>
      </QueryClientProvider>
    </>
  );
};

const HeaderStyled = styled("header")`
  display: flex;
  background: #333;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
`;
const TitleWrapStyled = styled(Typography)`
  display: flex;
  align-items: center;
`;
const TitleStyled = styled(Link)`
  font-size: 36px;
  color: #fff;
`;

export default MyApp;
