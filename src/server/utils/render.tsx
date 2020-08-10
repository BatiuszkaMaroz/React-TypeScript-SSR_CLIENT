import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import App from '../../client/App';

export default (url: string) => {
  const sheet = new ServerStyleSheet();
  const content = renderToString(
    sheet.collectStyles(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
    ),
  );
  const styleTags = sheet.getStyleTags();

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Server Outsider</title>
        ${styleTags}
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap" rel="stylesheet">
        <script defer src="/client/index.js"></script>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `;

  return html;
};
