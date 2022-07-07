export default function visualizacaoDePagina(pageType: string) {

  window._paq = window._paq || [];

  window._paq.push(['setSiteId', window.IdScalaAnalytics]);

  window._paq.push(['setPageType', pageType]);

  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);

}
