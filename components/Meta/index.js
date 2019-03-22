import Head from "next/head";

export default () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <style jsx global>{`
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
          Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        color: #3e1920;
      }

      a {
        color: #b95065;
      }
    `}</style>
  </>
);
