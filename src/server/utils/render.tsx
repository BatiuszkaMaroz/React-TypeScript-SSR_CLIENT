import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import serialize from 'serialize-javascript';

import App from '../../client/App';

export default (url: string, store: Store, context) => {
  const serializedStore = serialize(store.getState());

  const sheet = new ServerStyleSheet();
  const content = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <App />
        </StaticRouter>
      </Provider>,
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
        <script defer>window.INITIAL_STATE=${serializedStore}</script>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `;

  return html;
};
