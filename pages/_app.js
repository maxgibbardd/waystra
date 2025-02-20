import Head from 'next/head'
import { StateContext } from "@/context/StateContext"
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * 
  {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    /* Light Mode */
    --txt-light: #2D2D2D;
    --bg-light: #F5F9FC;
    --prm-light: #0077B6;
    --scnd-light: #48CAE4;
    --ac-light: #FF6B6B;

    /* Dark Mode */
    --txt-dark: #E0E0E0;
    --bg-dark: #1A1A2E;
    --prm-dark: #005B96;
    --scnd-dark: #0096C7;
    --ac-dark: #FF3B3B;

    /* Fonts */
    --font-prm: 'Rajdhani', sans-serif;
    --font-scnd: 'Poppins', sans-serif;
  }

  html, body {
    background-color: var(--bg-light);
    color: var(--txt-light);
    transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
    // overflow: hidden;
  }

  #__next {
    min-height: 100vh;
    min-width: 100vh;
  }

  .dark-mode {
    background-color: var(--bg-dark);
    color: var(--txt-dark);
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
        <Head>
          <title>Waystra</title>
          <meta name='description' content='Put a description here about your app'/>
          <meta name='robots' content='index, follow'/>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png"/>
          <link rel="manifest" href="/favicon_package/site.webmanifest"/><link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Rajdhani:wght@400;500;700&display=swap" rel="stylesheet" />
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
        </Head>

      <GlobalStyle />

      <StateContext>
        <Component {...pageProps} />
      </StateContext>
    </>
  )
}
