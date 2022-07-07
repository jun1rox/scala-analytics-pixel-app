import { Product, Seller } from "../typings/events";

export default function carregamentoDeProduto({ brand, productName, selectedSku, categories }: Product) {

  window._paq = window._paq || [];

  window._paq.push(['setSiteId', window.IdScalaAnalytics]);
  window._paq.push(['setPageType', 'Produto']);

  const { itemId, sellers } = selectedSku;

  const { ListPrice, AvailableQuantity, Price } = getSellers(sellers);

  let precoPor = '';
  if (ListPrice != Price) precoPor = ';preco_por=' + String(ListPrice);

  window._paq.push([
    'trackEvent',
    'PDP',
    'carregamento-produto',
    'sku=' + itemId +
    ';nome_produto=' + productName +
    ';marca=' + brand +
    ';categoria=' + getCategory(categories) +
    ';preco_de=' + Price +
    precoPor +
    ';estoque=' + AvailableQuantity
  ]);

  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);
}

function getCategory(rawCategories: string[]) {
  if (!rawCategories || !rawCategories.length) {
    return '';
  }

  return removeStartAndEndSlash(rawCategories[0]);
}

function removeStartAndEndSlash(category: string) {
  return category.replace(/^\/|\/$/g, '');
}

function getSellers(seller: Seller[]) {
  if (seller.length > 0) {
    return seller[0].commertialOffer;
  } else {
    return { ListPrice: '', AvailableQuantity: '', Price: '' };
  }

}