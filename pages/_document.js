import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // Collect styles from styled-components
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      // Retrieve initial document props
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal(); // Seal the stylesheet to prevent memory leaks
    }
  }

  render() {
    return (
      <Html lang="en"> {/* Set document language */}
        <Head />
        <body>
          <Main /> {/* Main application content */}
          <NextScript /> {/* Next.js scripts */}
        </body>
      </Html>
    );
  }
}
