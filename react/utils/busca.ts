import { SearchMetaData } from '../typings/events';

export default function busca({ results, term }: SearchMetaData) {
  window._paq = window._paq || [];

  window._paq.push(['setSiteId', window.IdScalaAnalytics]);
  window._paq.push(['setPageType', 'Busca']);

  let tipoVitrine = 'Busca';
  let resultados = '';
  if (results == 0) {
    tipoVitrine += ' Vazia';
  } else {
    resultados = ';qtd_encontrada=' + results
  }

  window._paq.push([
    'trackEvent',
    'Vitrine',
    'visualizacao-de-vitrine',
    'tipo_vitrine=' + tipoVitrine +
    resultados +
    ';termo_pesquisado=' + term
  ]);

  window._paq.push(['enableLinkTracking']);
}