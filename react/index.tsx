import { canUseDOM } from 'vtex.render-runtime';

import carregamentoDeProduto from './utils/carregamentoDeProduto';
import visualizacaoDePagina from './utils/visualizacaoDePagina';
import vitrine from './utils/vitrine';
import busca from './utils/busca';

import type { PixelMessage } from './typings/events';

declare global {
  interface Window {
    _paq: any;
    IdScalaAnalytics: any;
  }
}

export function handleEvents(e: PixelMessage) {

  if (e.data) {
    console.log(`Evento disparado:`);
    console.log(e.data);
  }

  switch (e.data.eventName) {
    case 'vtex:pageView':
      visualizacaoDePagina('Begin PageView'); // inicio de sessao
      break;

    case 'vtex:productView':
      carregamentoDeProduto(e.data.product);
      break;

    case 'vtex:departmentView':
    case 'vtex:categoryView':
      vitrine(e.data);
      break;

    case 'vtex:pageInfo':
      switch (e.data.eventType) {
        case 'homeView':
          visualizacaoDePagina('Home');
          break;

        case 'departmentView':
          visualizacaoDePagina('Departamento');
          break;

        case 'categoryView':
          visualizacaoDePagina('Categoria');
          break;

        case 'emptySearchView':
        case 'internalSiteSearchView':
          visualizacaoDePagina('Busca');
          if (e.data.search) {
            busca(e.data.search);
          }
          break;

        case 'productPageInfo':
          visualizacaoDePagina('Produto');
          break;
      }
      break;
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents);
}

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  console.log('event: ' + event);
});
window.addEventListener('pagehide', () => {
  console.log('pagehide event triggered');
});
