import _configs from './configs.json';

// Get Current Environment from host
export const ENV = (typeof window !== 'undefined' &&
  /hd-[a-zA-Z0-9]{4}\.homedepotdev\.com/.test(window.location.host)) ?
  window.location.host.match(/hd-([a-zA-Z0-9]{4})\.homedepotdev\.com/)[1] : 'pr';

// Get Environment Specific properties
function getEnvProp(propName) {
  // If configs not exist for an environment, use llc configs
  const envConfigs = typeof _configs[ENV] !== 'undefined' ? _configs[ENV] : _configs.defaults;
  // If environment specific configs not exist, use generic configs
  return typeof envConfigs[propName] !== 'undefined' ?
    envConfigs[propName].replace('{llc}', ENV) : _configs.defaults[propName].replace('{llc}', ENV);
}

// Host Names
export const NON_SECURE_WWW_HOST = getEnvProp('NON_SECURE_WWW_HOST');
export const SECURE_WWW_HOST = getEnvProp('SECURE_WWW_HOST');
export const AGNOSTIC_WWW_HOST = getEnvProp('AGNOSTIC_WWW_HOST');
export const ORIGIN_API_HOST = getEnvProp('ORIGIN_API_HOST');
export const MOBILE_BLINDS_HOST = getEnvProp('MOBILE_BLINDS_HOST');
export const DESKTOP_BLINDS_HOST = getEnvProp('DESKTOP_BLINDS_HOST');

export const HTTPS_NON_SECURE_WWW_HOST = getEnvProp('HTTPS_NON_SECURE_WWW_HOST');
export const HOST_NAME = (typeof window !== 'undefined' &&
window.location.protocol.includes('https'))
? HTTPS_NON_SECURE_WWW_HOST : NON_SECURE_WWW_HOST;

// GCP Cloud Host Name
export const GCP_CLOUD_API_HOST = getEnvProp('GCP_CLOUD_API_HOST');

// Cookie Domain
export const COOKIE_DOMAIN = getEnvProp('COOKIE_DOMAIN');

// API Keys
export const DELIVERY_AVAILABILITY_API_KEY = getEnvProp('DELIVERY_AVAILABILITY_API_KEY');
export const ORIGIN_API_KEY = getEnvProp('ORIGIN_API_KEY');
export const BING_API_KEY = getEnvProp('BING_API_KEY');

// OrderGroove Subscription Script url
export const SUBSCRIPTIONS_SCRIPT = getEnvProp('SUBSCRIPTIONS_SCRIPT');

// PayPal incontext checkout script url
export const PAYPAL_CHECKOUT_SCRIPT = getEnvProp('PAYPAL_CHECKOUT_SCRIPT');

// URI's
export const MCC_CART = 'mcc-cart';
export const MCC_CHECKOUT_CLOUD_URI = 'mcc-checkout';

export const HTML_TEMPLATE_URL = '{template_path}';

export const APP_HOST = 'localhost.homedepot.com';

export const LOCAL_STORAGE_KEY = 'THD_CART';
export const PIFE_HOST = 'images.homedepot-static.com';

export const FAQ_URL = HOST_NAME + '/c/FAQ';

export const B2B_FAQ_URL = HOST_NAME + '/c/pro_FAQ';

export const CREDIT_CENTER = HOST_NAME + '/c/Credit_Center';

// Legacy Mobile URL's
export const PAYPAL_URL_MOBILE = [
  '{host}/OnlineCheckout/servlet/PaypalPayment?fromPage=shoppingCart&',
  'fromCart=myCart&action=express&',
  'orderId={orderId}&zipcode={zipcode}&itemType={lineItemType}&itemCount={itemCount}'
].join('');
export const MOBILE_CHECKOUT_URL = '{host}/OnlineCheckout/servlet/Checkout?fromCart=myCart';
export const MOBILE_CHECKOUT_LOGIN_URL = [
  '{host}/OnlineCheckout/servlet/ViewCart?',
  'login=true&fromCart=myCart'].join('');

// Blinds URL's
export const BLINDS_CART_URL = '{host}/Ordering/Cart';
export const BLINDS_EDIT_CONFIG_URL = [
  '{host}/Catalog/ProductConfiguration/Configuration?',
  'id={configId}&quantity={quantity}&lineItemId={lineItemId}'
].join('');
export const BLINDS_CLONE_CONFIG_URL = [
  '{host}/Catalog/ProductConfiguration/ConfigurationAddAnother?',
  'id={configId}&quantity={quantity}&lineItemId={lineItemId}'
].join('');

// OPC Checkout URL's
export const CHECKOUT_URL = '{host}/MCCCheckout/static/opc/opc.html';
export const ONE_PAGE_CHECKOUT_URL = '{host}/MCCCheckout/static/opc/opc.html';
export const DIRECT_ONE_PAGE_CHECKOUT_URL = '{host}/MCCCheckout/static/opc/opc.html';

// Thank page url
export const THANK_YOU_URL = '{host}/mycheckout/thankyou#/thankyou';

// IC profile page url
export const IC_PROFILE_URL = '{host}/account/view/instantcheckout';

// Aurora Registry Service
export const FEATURE_SWITCH_REGISTRY_URL = '{host}/registry/v1/system/Aurora/subsystem/Order';

// BING MAP URL
export const BING_MAP_API_URL = '//www.bing.com/api/maps/mapcontrol?callback=mapScriptLoaded';

// Legacy Product and Store Search API's
export const PRODUCT_API_FULFILLMENT_URL = [
  '{host}/ProductAPI/v2/products/sku/{itemId}/',
  'storefulfillment?{keyword}',
  '&type=json&key={key}'].join('');
export const PRODUCT_API_URL = [
  '{host}/ProductAPI/v2/products/sku?itemId={itemId}&type=JSON&show={show}&key={key}'
].join('');
export const PRODUCT_API_IRG_URL = [
  '{host}/ProductAPI/v2/products/irg?',
  'itemId={itemId}&storeId={storeId}&key={key}&type=JSON'
].join('');

// GCP Cloud Product and Store Search API's
export const PRODUCT_CLOUD_API_FULFILLMENT_URI = getEnvProp('PRODUCT_CLOUD_API_FULFILLMENT_URI');
export const PRODUCT_CLOUD_API_FULFILLMENT_URL = [
  '{host}/' + PRODUCT_CLOUD_API_FULFILLMENT_URI + '/sku/{itemId}/',
  'storefulfillment?{keyword}',
  '&type=json&key={key}'].join('');

export const PRODUCT_CLOUD_API_URI = getEnvProp('PRODUCT_CLOUD_API_URI');
export const PRODUCT_CLOUD_API_URL = [
  '{host}/' + PRODUCT_CLOUD_API_URI + '/sku?itemId={itemId}&type=JSON&show={show}&key={key}'
].join('');

export const PRODUCT_CLOUD_API_IRG_URL = [
  '{host}/irg/v1?',
  'itemId={itemId}&storeId={storeId}&key={key}&type=JSON'
].join('');

export const STORE_SEARCH_API_URL = [
  '{host}/StoreSearchServices/v2/storesearch?',
  'radius={radius}&address={address}&type={type}&pagesize={pagesize}',
  '&key={key}'
].join('');

export const STORE_SEARCH_API_URL_BY_STORE_ID = [
  '{host}/StoreSearchServices/v2/storesearch?type={type}&storeid={storeId}',
  '&key={key}'
].join('');

// MCC Cart Services End points
export const FEATURE_SWITCH_URL = [
  '{host}/mcc-cart/v2/util/feature'
].join('');
export const MCC_CART_URL = '{host}/mcc-cart/v2/{path}';
export const TAD_API_URL = '{host}/mcc-cart/v2/appliance/zipcodes';
export const VALIDATE_SESSION_URL = '{host}/mcc-cart/v2/user/validateSession';
export const BLINDS_MCC_CLOUD_API_URL = '{host}/mcc-cart/v2/Cart/blindscustom?guid={guid}';
export const BLINDS_API_URL = '{host}/mcc-cart/cart/blindscustom?guid={guid}';
export const PAYPAL_URL_DESKTOP = [
  '{host}/' + MCC_CHECKOUT_CLOUD_URI + '/v2/paypal/init?fromPage=shoppingCart&',
  'orderId={orderId}&zipcode={zipcode}&itemType={lineItemType}&itemCount={itemCount}'
].join('');
export const PARTS_AND_SERVICES_API_URL = [
  '{host}',
  '/mcc-cart/item/v3/partsandservices/',
  '{itemIds}',
  '/zipCode/{zipCode}'
].join('');
export const DELIVERY_AVAILABILITY_URL = [
  '{host}/mcc-cart/v3/appliance/',
  'deliveryAvailability/{itemId}/zipCode/{zipCode}'
].join('');
export const SAVED_FOR_LATER_USER_LIST = '/mcc-cart/SFL/v1/listDetails';
export const SAVE_FOR_LATER_REMOVE_ITEM = '/mcc-cart/SFL/v1/delete/';
export const SAVE_FOR_LATER_LIST_TO_CART = '/mcc-cart/SFL/v1/listToCart';
export const SAVE_FOR_LATER_CART_TO_LIST = '/mcc-cart/SFL/v1/cartToList';
export const LOGGER_URL = '/mcc-cart/v2/util/logger';

// MCC Cart Instant Checkout API's
export const IC_ORDER_REVIEW_URL = '{host}/mcc-cart/v1/instant/cart';
export const IC_ORDER_SUBMIT_URL = '{host}/mcc-cart/v1/order';
export const IC_OLD_ORDER_SUBMIT_URL = '{host}/mcc-cart/v1/order/submit';

// MCC Cart Product & Store Search Wrapper API's
export const MCC_CART_PRODUCT_API = [
  '{host}',
  '/mcc-cart/v2/info/product?itemId={itemId}&show={show}'].join('');
export const MCC_CART_PRODUCT_FULFILLMENT_API = [
  '{host}',
  '/mcc-cart/v2/info/storefulfillment?',
  'itemId={itemId}&{keyword}'].join('');
export const MCC_CART_PRODUCT_IRG_API = [
  '{host}',
  '/mcc-cart/v2/info/irg?itemId={itemId}&storeId={storeId}'].join('');
export const MCC_CART_STORE_SEARCH_BY_ID_API = [
  '{host}',
  '/mcc-cart/v2/info/storesearch?storeId={storeId}'].join('');
export const MCC_CART_STORE_SEARCH_API = [
  '{host}',
  '/mcc-cart/v2/info/storesearch?',
  'radius={radius}&address={address}&type={type}&pagesize={pagesize}'].join('');

// My Account Loggin Page URL from Subscriptions //
export const MYACCOUNT_LOGIN_URL = '/account/view/checkout-signin';

// My Account dual sign in pop up for sfl for guest tooltip
export const MYACCOUNT_SIGN_IN_URL = '/account/view/logon';
export const MYACCOUNT_REGISTER_URL = '/account/view/register';
export const MYACCOUNT_NEW_SIGN_IN_URL = '/auth/view/signin';

// PLCC - payment estimator apply now URLs
export const DESKTOP_PAYMENT_ESTIMATOR_APPLY_NOW_URL = 'https://citiretailservices.citibankonline.com/CRS/acq/launch/index.action?app=UNSOL&siteId=PLCN_HOMEDEPOT&sc=30005&cmp=A~S~M~J~2~9~ZZZ0~AI~HD~ZZ';
export const MOBILE_PAYMENT_ESTIMATOR_APPLY_NOW_URL = 'https://citiretailservices.citibankonline.com/CRS/acq/launch/index.action?app=UNSOL&siteId=PLCN_HOMEDEPOT&sc=30005&cmp=C~S~M~J~2~9~ZZZ0~AI~HD~ZZ';
export const DESKTOP_PAYMENT_ESTIMATOR_PROMO_APPLY_NOW_URL = 'https://citiretailservices.citibankonline.com/CRS/acq/launch/index.action?app=UNSOL&siteId=PLCN_HOMEDEPOT&sc=30005&cmp=A~S~M~K~6~9~ZZZ0~AI~HD~ZZ_TFD';
export const MOBILE_PAYMENT_ESTIMATOR_PROMO_APPLY_NOW_URL = 'https://citiretailservices.citibankonline.com/CRS/acq/launch/index.action?app=UNSOL&siteId=PLCN_HOMEDEPOT&sc=30005&cmp=C~S~M~K~6~9~ZZZ0~AI~HD~ZZ_TFD';
