/* eslint-disable max-len */
import React from 'react';
import Document, {
  NextScript, Html, Main, Head,
} from 'next/document';

class MyDocument extends Document {

  getPreloadFontsLinks() {
    const fontSizes = [300, 400, 500, 600, 700];
    return fontSizes.map((size) => (<link rel="preload" key={size} as="font" href={`/fonts/inter-${size}.ttf`} type="font/ttf" crossOrigin="" />));
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon.ico" />
          {this.getPreloadFontsLinks()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

}

export default MyDocument;
