import { VitrineViewData } from '../typings/events';

export default function vitrine({ event, products }: VitrineViewData) {
  window._paq = window._paq || [];

  window._paq.push(['setSiteId', window.IdScalaAnalytics]);

  let tipoVitrine = '';

  if (event == 'categoryView') {
    tipoVitrine += 'Categoria';
  } else {
    tipoVitrine += 'Departamento';
  }

  let quantidadeProdutos;
  if (products) {
    quantidadeProdutos = products.length;
  } else {
    quantidadeProdutos = '';
  }

  window._paq.push(['setPageType', tipoVitrine]);
  window._paq.push([
    'trackEvent',
    'Vitrine',
    'visualizacao-de-vitrine',
    'tipo_vitrine=' + tipoVitrine +
    ';qtd_produtos=' + quantidadeProdutos
  ]);

  window._paq.push(['enableLinkTracking']);
}