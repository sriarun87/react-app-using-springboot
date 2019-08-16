import {
  SECURE_WWW_HOST,
  NON_SECURE_WWW_HOST,
  MCC_CART_URL,
  ORIGIN_API_KEY,
  DELIVERY_AVAILABILITY_URL,
  DELIVERY_AVAILABILITY_API_KEY,
  PARTS_AND_SERVICES_API_URL,
  PAYPAL_URL_DESKTOP,
  PAYPAL_URL_MOBILE,
  FEATURE_SWITCH_URL,
  VALIDATE_SESSION_URL,
  CHECKOUT_URL,
  MOBILE_CHECKOUT_URL,
  MOBILE_CHECKOUT_LOGIN_URL,
  MOBILE_BLINDS_HOST,
  BLINDS_CART_URL,
  SAVED_FOR_LATER_USER_LIST,
  SAVE_FOR_LATER_REMOVE_ITEM,
  SAVE_FOR_LATER_LIST_TO_CART,
  SAVE_FOR_LATER_CART_TO_LIST,
  TAD_API_URL,
  LOCAL_STORAGE_KEY,
  BLINDS_MCC_CLOUD_API_URL,
  MCC_CART_PRODUCT_API,
  MCC_CART_PRODUCT_FULFILLMENT_API,
  MCC_CART_PRODUCT_IRG_API,
  MCC_CART_STORE_SEARCH_BY_ID_API,
  MCC_CART_STORE_SEARCH_API,
  FAQ_URL,
  B2B_FAQ_URL,
  CREDIT_CENTER,
  PIFE_HOST,
  COOKIE_DOMAIN,
  THANK_YOU_URL,
  IC_PROFILE_URL,
  IC_ORDER_REVIEW_URL,
  IC_ORDER_SUBMIT_URL,
  IC_OLD_ORDER_SUBMIT_URL,
  MYACCOUNT_NEW_SIGN_IN_URL
} from '../constants/environment';
import XDate from 'xdate';
import { ERROR_CODES_303, ERROR_CODES_301 } from '../apps/cart/constants/ErrorCodes';
import { CUSTOMER_TYPE_B2B } from '../constants/appConstants';
import { getCustomerType } from './b2bUtils';

// eslint-disable-next-line

export const helpers = {
  getLocation() {
    return window.location;
  }
};

export function readBrowserCookie(name, cookie) {
  try {
    const nameEQ = name + '=';
    const ca = cookie ? cookie.split(';') : document.cookie.split(';');
    let i;
    for (i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
  } catch (e) {
    console.log(e);
  }
  return '';
}

export function formatPrice(val, noDollar = false) {
  let str;
  if (typeof val === 'string') {
    str = Math.abs(parseFloat(val));
  } else {
    str = Math.abs(val);
  }
  // Should this be here, this will round up !!!!!!
  str = parseFloat(str.toFixed('2'));
  str = str.toLocaleString();
  if (str.indexOf('.') === -1) {
    str += '.00';
  } else if (/\.\d$/.test(str)) {
    str += '0';
  }
  if (noDollar) {
    return str;
  }
  return '$' + str;
}
export function getDollar(val) {
  let str;
  if (typeof val === 'string') {
    str = Math.abs(parseFloat(val));
  } else {
    str = Math.abs(val);
  }
  str = parseInt(str, 10);
  str = str.toLocaleString();
  return str;
}
export function getCents(val) {
  let str;
  if (typeof val === 'undefined') {
    return '00';
  }
  if (typeof val === 'string') {
    str = val.split('.')[1];
  } else {
    str = val.toString().split('.')[1];
  }
  if (typeof str === 'undefined') {
    str = '00';
  } else if (str.length < 2) {
    str += '0';
  }
  return str;
}
export function sanitizeFloat(num) {
  let n = parseFloat(num);
  if (isNaN(n)) {
    n = 0;
  }
  return n;
}
export function multiply(...args) {
  const all = args.reduce((total, num) => {
    const n = sanitizeFloat(num);
    const t = sanitizeFloat(total);
    return t * n;
  });
  return all.toFixed(2);
}

export function sum(...args) {
  return args.reduce((total, num) => {
    const n = sanitizeFloat(num);
    const t = sanitizeFloat(total);
    return t + n;
  }, 0);
}

export function sumProductFees(...args) {
  return args.reduce((total, cur) => {
    return (
      total +
      cur
        .map(item => {
          return item.totalItemPrice ? parseFloat(item.totalItemPrice) : 0;
        })
        .reduce((t, c) => t + c, 0)
    );
  }, 0);
}

// TODO move this to parts and services code
export function getOptionalAndRequiredItems(product) {
  const requiredLineItems = product.requiredLineItems ? product.requiredLineItems.lineItem : [];
  const optionalLineItems = product.optionalLineItems ? product.optionalLineItems.lineItem : [];
  return requiredLineItems.concat(optionalLineItems);
}

export function calculateTotalItemPrice(quantity, unitPrice, specialPrice) {
  if (specialPrice) {
    return sanitizeFloat(quantity) * sanitizeFloat(specialPrice);
  }
  return sanitizeFloat(quantity) * sanitizeFloat(unitPrice);
}

export function isLessThanIE10() {
  let version = (!!window.ActiveXObject && +/msie\s(\d+)/i.exec(navigator.userAgent)[1]) || NaN; // eslint-disable-line
  if (!version) return false;
  return version < 10;
}

export function getMccCartUrl(
  path,
  options = {
    cache: true
  }
) {
  const cacheBuster = new Date().getTime();

  const host = isLessThanIE10() ? NON_SECURE_WWW_HOST : SECURE_WWW_HOST;

  let str = MCC_CART_URL.replace('{host}', host).replace('{path}', path);

  if (!options.cache) {
    str += '?_=' + cacheBuster + '&';
  } else if (options.responseCode || options.fulfillmentLocation) {
    str += '?';
  }

  if (options.responseCode) {
    str += 'responseCode=' + options.responseCode + '&';
  }

  if (options.fulfillmentLocation) {
    str += 'fulfillmentLocation=' + options.fulfillmentLocation;
  }

  if (options.key) {
    str += 'key=' + options.key;
  }

  return str;
}

export function getHostName() {
  return isLessThanIE10() ? NON_SECURE_WWW_HOST : SECURE_WWW_HOST;
}

export function getitemIdFromLineItemOrItemId({ id }) {
  const index = id.indexOf('_');
  if (index !== -1) {
    return id.substring(0, index);
  }
  return id;
}

export function isBopisable(list) {
  return list.some(store => {
    return (
      store.fulfillmentOptions.buyOnlinePickupInStore &&
      store.fulfillmentOptions.buyOnlinePickupInStore.inventory &&
      store.fulfillmentOptions.buyOnlinePickupInStore.inventory.onHandQuantity &&
      store.fulfillmentOptions.buyOnlinePickupInStore.inventory.onHandQuantity > 0
    );
  });
}

export function toId(str) {
  return str.toLowerCase().replace(/\s/g, '-');
}

export function getProductAPIURL({
  itemId,
  cache = true,
  show = 'info,media,shipping,promotions,pricing,attributeGroups'
}) {
  const cacheBuster = new Date().getTime();
  let str = MCC_CART_PRODUCT_API.replace('{host}', SECURE_WWW_HOST)
    .replace('{itemId}', itemId)
    .replace('{show}', show);

  if (!cache) {
    str += '?_= ' + cacheBuster;
  }
  return str;
}

export function getProductAPIIrgURL({ itemId, storeId, cache = true }) {
  const cacheBuster = new Date().getTime();
  let str = MCC_CART_PRODUCT_IRG_API.replace('{host}', SECURE_WWW_HOST)
    .replace('{itemId}', itemId)
    .replace('{storeId}', storeId);

  if (!cache) {
    str += '?_= ' + cacheBuster;
  }
  return str;
}

export function getProductAPIFulfillmentURL({
  itemId,
  keyword,
  latitude,
  longitude,
  leadTime,
  cache = true
}) {
  const cacheBuster = new Date().getTime();
  let keywordPair;
  if (keyword) {
    keywordPair = 'keyword=' + keyword;
  } else if (latitude && longitude) {
    keywordPair = `latitude=${latitude}&longitude=${longitude}`;
  } else {
    keywordPair = '';
  }
  let str = MCC_CART_PRODUCT_FULFILLMENT_API.replace('{host}', SECURE_WWW_HOST)
    .replace('{key}', ORIGIN_API_KEY)
    .replace('{itemId}', itemId)
    .replace('{keyword}', keywordPair);

  if (leadTime) {
    str += `&vendorProcessingDays=${leadTime}`;
  }

  if (!cache) {
    str += '?_= ' + cacheBuster;
  }
  return str;
}

export function getStoreSearchServiceByStoreIdAPIURL({
  host = SECURE_WWW_HOST,
  type = 'json',
  storeId,
  key = ORIGIN_API_KEY
}) {
  return MCC_CART_STORE_SEARCH_BY_ID_API.replace('{host}', host)
    .replace('{type}', type)
    .replace('{storeId}', storeId)
    .replace('{key}', key);
}

export function getStoreSearchServicesAPIURL({
  host = SECURE_WWW_HOST,
  radius = 50,
  address = 121,
  type = 'json',
  pagesize = 40,
  key = ORIGIN_API_KEY
}) {
  return MCC_CART_STORE_SEARCH_API.replace('{host}', host)
    .replace('{radius}', radius)
    .replace('{address}', address)
    .replace('{type}', type)
    .replace('{pagesize}', pagesize)
    .replace('{key}', key);
}

export function getPartsAndServicesURL({ itemIds, zipCode, host = SECURE_WWW_HOST }) {
  return PARTS_AND_SERVICES_API_URL.replace('{host}', host)
    .replace('{zipCode}', zipCode)
    .replace('{itemIds}', itemIds);
}

export function getPayPalCheckoutUrl({
  orderId,
  applianceZipcode,
  lineItemType,
  itemCount,
  channel = 'mobile',
  host = SECURE_WWW_HOST
}) {
  // orderId={orderId}&itemType={lineItemType}&itemCount={itemCount}
  let paypalURL = '';
  if (channel === 'mobile') {
    paypalURL = PAYPAL_URL_MOBILE.replace('{host}', host)
      .replace('{orderId}', orderId)
      .replace('{zipcode}', applianceZipcode)
      .replace('{lineItemType}', lineItemType)
      .replace('{itemCount}', itemCount);
  } else {
    paypalURL = PAYPAL_URL_DESKTOP.replace('{host}', host)
      .replace('{orderId}', orderId)
      .replace('{zipcode}', applianceZipcode)
      .replace('{lineItemType}', lineItemType)
      .replace('{itemCount}', itemCount);
  }
  return paypalURL;
}

export function getFeatureSwitchURL({ featureSwitchValues }) {
  const queryParams = featureSwitchValues.map(value => `featureId=${value}`).join('&');
  return FEATURE_SWITCH_URL.replace('{host}', SECURE_WWW_HOST) + '?' + queryParams + '&';
}

export function getValidateSessionURL({ host = SECURE_WWW_HOST } = {}) {
  return VALIDATE_SESSION_URL.replace('{host}', host);
}

export function getMobileCheckoutLoginURL({ host = SECURE_WWW_HOST } = {}) {
  return MOBILE_CHECKOUT_LOGIN_URL.replace('{host}', host);
}

export function getMobileCheckoutURL({ host = SECURE_WWW_HOST } = {}) {
  return MOBILE_CHECKOUT_URL.replace('{host}', host);
}

export function getThankYouURL({ host = SECURE_WWW_HOST } = {}) {
  return THANK_YOU_URL.replace('{host}', host);
}

export function getICprofileURL({ host = SECURE_WWW_HOST } = {}) {
  return IC_PROFILE_URL.replace('{host}', host);
}

export function getICReviewURL({ host = SECURE_WWW_HOST } = {}) {
  return IC_ORDER_REVIEW_URL.replace('{host}', host);
}

export function getICSubmitURL({ host = SECURE_WWW_HOST } = {}) {
  return IC_ORDER_SUBMIT_URL.replace('{host}', host);
}

export function getOldICSubmitURL({ host = SECURE_WWW_HOST } = {}) {
  return IC_OLD_ORDER_SUBMIT_URL.replace('{host}', host);
}

export function getNewSignInUrl({ redirect = null }) {
  return MYACCOUNT_NEW_SIGN_IN_URL + (redirect ? '?redirect=' + redirect : '');
}

export function getCheckoutURL({ host = SECURE_WWW_HOST } = {}) {
  return CHECKOUT_URL.replace('{host}', host);
}

export function getConfigItemAPIURL({ host = SECURE_WWW_HOST, guid }) {
  return BLINDS_MCC_CLOUD_API_URL.replace('{guid}', guid).replace('{host}', host);
}

export function getTADAPIURL({ host = SECURE_WWW_HOST } = {}) {
  return TAD_API_URL.replace('{host}', host);
}

export function getMobileConfigItemCartURL({ host = MOBILE_BLINDS_HOST } = {}) {
  return BLINDS_CART_URL.replace('{host}', host);
}

export function getDeliveryAvailabilityURL({
  itemId,
  zipCode,
  key = DELIVERY_AVAILABILITY_API_KEY,
  host = SECURE_WWW_HOST
}) {
  return DELIVERY_AVAILABILITY_URL.replace('{host}', host)
    .replace('{itemId}', itemId)
    .replace('{zipCode}', zipCode)
    .replace('{key}', key);
}

export function getHostForCurrentProtocol() {
  return window.location.protocol === 'https:' ? SECURE_WWW_HOST : NON_SECURE_WWW_HOST;
}

export function getTimezone(timeStr) {
  if (!timeStr) return '';
  return /(\w+)$/.exec(timeStr)[1];
}

export function formatDate(date, formatString) {
  const d = new XDate(date);
  return d.toString(formatString);
}

export function formatPhone(phoneNumber) {
  // (303)555-1212
  return phoneNumber.replace('(', '').replace(')', '-');
}

export function showSecondaryConfirmationBox(fulfillmentMethod,
                                             localizedStoreId,
                                             fulfillmentLocation,
                                             isSecondaryConfirmationBoxFeatureEnabled) {
  return fulfillmentMethod === 'BOPIS' &&
    localizedStoreId !== fulfillmentLocation && isSecondaryConfirmationBoxFeatureEnabled;
}

function toHoursObject(str) {
  return str.split(';').filter((item, i) => i % 2 !== 0);
}

function group(hours) {
  const obj = [];

  for (let i = 0; i < hours.length; i++) {
    const hour = hours[i];
    const prev = hours[i - 1];
    if (i === 0) {
      obj.push(hour);
      continue;
    }
    if (prev === hour) {
      obj[obj.length - 1] += ',' + hour;
      continue;
    }
    obj[i] = hour;
  }

  return obj;
}

function numberToDow(n) {
  const dow = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  return dow[n];
}

function toAmPm(hours) {
  const parts = hours.split(':');
  let h = parseInt(parts[0], 10);
  const m = parts[1];
  if (h === 0) {
    h = 12;
  }
  return h > 12 ? h - 12 + `:${m}pm` : h + `:${m}am`;
}

function formatHours(hoursStr) {
  const parts = hoursStr.split('-');
  const open = toAmPm(parts[0]);
  const close = toAmPm(parts[1]);

  return `${open} to ${close}`;
}

function toString(groups) {
  return groups.map((hour, i) => {
    const parts = hour.split(',');
    if (parts.length > 1) {
      return `${numberToDow(i)} - ${numberToDow(i + (parts.length - 1))}:
      ${formatHours(parts[0])}`;
    }
    return `${numberToDow(i)}: ${formatHours(hour)}`;
  });
}

function parseIt(str) {
  const parts = toHoursObject(str);
  const groups = group(parts);
  return toString(groups);
}

// TODO refactor this garbage
export function parseStoreHours(storeHrsString, options = {}) {
  // defaults to the store hours for today.
  // pass options.dt (date object) for the hours of that day
  // "1;6:00-22:00;2;6:00-22:00;3;6:00-22:00;4;6:00-22:00;5;6:00-22:00;6;6:00-21:00;7;8:00-19:00"
  const storeHours = {
    aDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    // Adjust Day of week value for our Store Hours
    getDOW: (dt = new Date()) => {
      let dow = dt.getDay();
      dow = dow === 0 ? 7 : dow;
      return dow;
    },
    getDOWString: function getDOWString(dow) {
      return this.aDays[dow - 1];
    },
    getHoursForDate: function getHoursForDate({ hoursString, dt = new Date() }) {
      const str = hoursString;

      const theDate = dt;
      const timeString = str || '';
      if (timeString) {
        const aHrs = timeString.split(';');
        const dow = this.getDOW(theDate);
        const hours = aHrs[dow * 2 - 1].split('-');

        // closed
        if (
          hours.join('') === ['0:00', '0:00'].join('') ||
          hours.join('') === ['00:00', '00:00'].join('')
        ) {
          return [];
        }

        const open = new Date(theDate.getTime());
        const close = new Date(theDate.getTime());
        open.setHours(parseInt(hours[0], 10));
        let minutes = hours[0].split(':')[1];
        open.setMinutes(minutes);
        close.setHours(parseInt(hours[1], 10));
        minutes = hours[1].split(':')[1];
        close.setMinutes(minutes);
        return [open, close];
      }
      return [];
    },
    getStoreHoursText: function getStoreHoursText({ hoursArr, dt = new Date(), hoursString = '' }) {
      let hours = hoursArr;
      const now = new Date(dt.getTime());
      const tomorrow = new Date(dt.getTime());
      tomorrow.setDate(tomorrow.getDate() + 1);

      function padZero(minutes) {
        if (minutes < 10) {
          return '0' + minutes;
        }
        return '' + minutes;
      }

      function formatMessage(prefix, time) {
        let msg = '' + prefix;
        let hour = time.getHours();
        const minute = time.getMinutes();
        let amPm = 'am';
        if (hour > 12) {
          hour = hour - 12;
          amPm = 'pm';
        }

        msg += hour + ':' + padZero(minute) + ' ' + amPm;

        return msg;
      }
      let msg = '';

      if (hours.length) {
        const closing = hours[1];
        const open = hours[0];

        // time is between open and closed
        if (now.getTime() > open.getTime() && now.getTime() < closing.getTime()) {
          msg = formatMessage('Open Until ', closing);
          // time is before open
          return msg;
        } else if (now.getTime() < open.getTime()) {
          msg = formatMessage('Opens at ', open);
          return msg;
          // time is after open
        }
        hours = this.getHoursForDate({
          hoursString,
          dt: tomorrow
        });

        if (hours.length) {
          msg = formatMessage('Opens at ', hours[0]);
        } else {
          msg = '<b>Closed Tomorrow</b>';
        }
        return msg;
      }
      // store is closed
      if (now.getHours() < 21) {
        return '<b>Closed Today</b>';
      }
      hours = this.getHoursForDate({
        hoursString,
        dt: tomorrow
      });

      if (hours.length) {
        msg = formatMessage('Opens at ', hours[0]);
        return msg;
      }
      return '<b>Closed Tomorrow</b>';
    },
    getStoreHoursAsWeek: function getStoreHoursAsWeek({ hoursString }) {
      return parseIt(hoursString);
    }
  };
  if (options.asWeekString) {
    return storeHours.getStoreHoursAsWeek({
      hoursString: storeHrsString,
      options
    });
  }
  return storeHours.getStoreHoursText({
    hoursArr: storeHours.getHoursForDate({
      hoursString: storeHrsString,
      options
    })
  });
}

export function updateSecureDomain({ url }) {
  if (url) {
    const location = helpers.getLocation();
    if (location.protocol !== 'https:' || url.indexOf(PIFE_HOST) !== -1) {
      return url;
    }
    return String(url).replace(NON_SECURE_WWW_HOST, SECURE_WWW_HOST);
  }
  return url;
}

// http://www.homedepot.com/catalog/productImages/65/8b/8b14ad2a-8f54-4e13-80b9-c09bf5bad827_65.jpg
export function updateImageUrlWithSize({ url, currentSize, newSize }) {
  try {
    return url
    .replace('/' + currentSize + '/', '/' + newSize + '/')
    .replace(currentSize + '.jpg', newSize + '.jpg');
  } catch (e) {/* */} return null;
}

export function getAvailabilityStock(AvailableStock) {
  if (AvailableStock !== '') return AvailableStock.split('in stock')[0];
  return false;
}

export function hasMessage(store, messageKey) {
  if (!store) return false;
  if (!store.fulfillmentOptions) return false;
  if (!store.fulfillmentOptions.availabilityMessages) return false;
  return (
    store.fulfillmentOptions.availabilityMessages.availabilityMessage.messageKey === messageKey
  );
}

export function hasMessages(store, messageKeys) {
  return !!messageKeys.filter(key => {
    return hasMessage(store, key);
  }).length;
}

export function hasalphaPromptRestriction(store, alphaPromptRestriction) {
  if (!store) return false;
  if (!store.fulfillmentOptions) return false;
  if (!store.fulfillmentOptions.buyOnlinePickupInStore) return false;
  if (!store.fulfillmentOptions.buyOnlinePickupInStore.alphaPromptRestriction) return false;
  return (
    store.fulfillmentOptions.buyOnlinePickupInStore.alphaPromptRestriction ===
    alphaPromptRestriction
  );
}

// TODO check this in the morning. Not being read correctly all of the sudden
export function getZipFromSessionCookie() {
  const THD_SESSION = readBrowserCookie('THD_SESSION');
  if (!THD_SESSION) return null;
  const re = /C16=(\d+),/;
  const parts = re.exec(THD_SESSION);
  if (parts && parts[1]) {
    if (isNaN(parseInt(parts[1], 10))) {
      return '';
    }
    return parts[1];
  }
  return null;
}

export function escapeCookie(cookieValue) {
  return encodeURIComponent(cookieValue)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
}

export function setBrowserCookie(cookieName, cookieValue, expInSec, path = '/', domain = null) {
  const expDt = new Date();
  expDt.setTime(expDt.getTime() + expInSec * 1000);
  const expDtString = expDt === null ? '' : expDt.toUTCString();
  let cookieString = [
    cookieName + '=' + escapeCookie(cookieValue),
    ' expires=' + expDtString,
    ` path=${path}`
  ].join(';');

  if (domain) {
    cookieString += '; domain=' + domain;
  }

  document.cookie = cookieString;
}

export function getTHDPersistObj(thdPersist) {
  let persistCookie = thdPersist;
  if (!persistCookie) persistCookie = readBrowserCookie('THD_PERSIST', document.cookie);
  const decoded = decodeURIComponent(persistCookie);
  const ret = {};
  decoded.split(':;').forEach(part => {
    const keyVal = part.split('=');
    ret[keyVal[0]] = keyVal[1];
  });
  return ret;
}

export function getLocStoreFromPersist(thdPersist) {
  let persistCookie = thdPersist;
  if (!persistCookie) persistCookie = getTHDPersistObj();
  if (!persistCookie.C4) return {};
  const locString = persistCookie.C4;
  const parts = /^(\d+)\+([^+]*)/.exec(locString);
  if (!parts) return {};
  if (parts.length < 2) return '';
  const storeNum = parts[1];
  return {
    storeNum,
    storeAddress: parts[2]
  };
}

export function addEvent(element, eventType, handler, useCapture) {
  const capture = typeof useCapture !== 'undefined' ? useCapture : true;
  if (element.length && !element.window) {
    element.forEach(el => addEvent(el, eventType, handler));
  } else {
    if (element.addEventListener) {
      // DOM Level 2 browsers
      element.addEventListener(eventType, handler, capture);
    } else if (element.attachEvent) {
      // IE <= 8
      element.attachEvent('on' + eventType, handler);
    } else {
      // ancient browsers
      element['on' + eventType] = handler; // eslint-disable-line
    }
  }
}

export function transformConfigurableProductAttribute(str) {
  const parts = /(\d+)\s(\d\/\d)/.exec(str);
  if (!parts) return str;
  if (parts[2] === '0/0') return parts[1] + ' in';
  return str + ' in';
}

export function getZipCodeFromCookie(cookie) {
  const persist = getTHDPersistObj(readBrowserCookie('THD_PERSIST', cookie));
  return persist.C24 || '';
}

export function getTotalItemCountFromCookie() {
  let persistCookie;
  if (!persistCookie) persistCookie = getTHDPersistObj();
  if (!persistCookie.C6) return 0;
  const cartTotalQty = JSON.parse(persistCookie.C6).I1;
  return parseInt(cartTotalQty, 10);
}

export function getLocalStoreNbrFromCookie(cookie) {
  const persist = getTHDPersistObj(readBrowserCookie('THD_PERSIST', cookie));
  let C4 = persist.C4 || '';
  if (C4) {
    C4 = C4.split('+')[0];
  } else {
    C4 = '';
  }
  return C4;
}

export function getLocalStoreForRequest(itemDetails) {
  try {
    const persist = getTHDPersistObj(readBrowserCookie('THD_PERSIST', document.cookie));
    if (persist && persist.C4) {
      return persist.C4.split('+')[0];
    }
    if (itemDetails && itemDetails.length) {
      const storeFromRequest = itemDetails.find(
        item => item.fulfillmentLocation && item.fulfillmentLocation.length < 5
      );
      return storeFromRequest.fulfillmentLocation;
    }
  } catch (e) {
    return null;
  }
  return null;
}

export function handleCsrStatusCode({ itemDetails, bodyObject }) {
  try {
    const csrStatusCodeItem = itemDetails.find(i => i.csrStatusCode);
    if (csrStatusCodeItem && csrStatusCodeItem.csrStatusCode) {
      bodyObject.CartRequest.csrStatusCode = csrStatusCodeItem.csrStatusCode; // eslint-disable-line
      bodyObject.CartRequest.itemDetails = itemDetails.map(item => { // eslint-disable-line
        return { ...item, csrStatusCode: undefined };
      });
    }
  } catch (e) {/**/}
}

export function getZipCodeForRequest(fulfillmentLocation) {
  const persist = getTHDPersistObj(readBrowserCookie('THD_PERSIST', document.cookie));
  if (persist && persist.C24) {
    return persist.C24;
  }
  if (fulfillmentLocation && fulfillmentLocation.length === 5) {
    return fulfillmentLocation;
  }
  return null;
}

let LOCAL_STORAGE_AVAILABLE;
export function storageAvailable(type) {
  let storage;
  const keyVal = '__storage_test';
  if (typeof LOCAL_STORAGE_AVAILABLE === 'boolean') {
    return LOCAL_STORAGE_AVAILABLE;
  }
  try {
    storage = window[type];
    storage.setItem(keyVal, keyVal);
    storage.removeItem(keyVal);
    LOCAL_STORAGE_AVAILABLE = true;
    return true;
  } catch (e) {
    LOCAL_STORAGE_AVAILABLE = false;
    return false;
  }
}

export function getErrorCodeFromUrl(searchParam) {
  const query = /errorCode=(.*)&?/.exec(searchParam);
  if (!query) return null;
  return decodeURIComponent(query[1]);
}

export function filter303If301(errorModel) {
  const errorCodes = errorModel.map(err => err.errorCode);
  const has303Errors = errorCodes.some(e => ERROR_CODES_303.includes(e));
  const has301Errors = errorCodes.some(e => ERROR_CODES_301.includes(e));
  if (has301Errors && has303Errors) {
    return errorModel.filter(err => !ERROR_CODES_303.includes(err.errorCode));
  }
  return errorModel;
}

export function getRatingPercent(rating) {
  const ratingPercent = parseFloat(rating, 10) * 20;
  return ratingPercent + '%';
}

export function getDiscountPercent(value, maxValue) {
  try {
    const percent = Math.round(parseFloat((Math.abs(value) * 100) / Math.abs(maxValue)));
    if (percent < 1) {
      return null;
    }
    return percent + '% Off';
  } catch (e) {
    // Catch Block
  }
  return null;
}

export function getArray(input) {
  let list = [];
  if (Array.isArray(input)) {
    list = list.concat(input);
  } else {
    list.push(input);
  }
  return list;
}

export function getQueryParam(param) {
  const location = helpers.getLocation();
  const re = new RegExp(param + '=([^&]*)');
  const result = re.exec(location.search || location.hash);
  if (!result) return null;
  return result[1];
}

export function isSFL() {
  if (window.THD_GLOBAL) {
    return typeof window.THD_GLOBAL.featureSFL !== 'undefined'
      ? window.THD_GLOBAL.featureSFL
      : true;
  }
  return true;
}

export function getSVOCid() {
  let thdUser = readBrowserCookie('THD_USER');
  if (typeof thdUser !== 'undefined' && thdUser) {
    if (thdUser !== '') {
      thdUser = thdUser.replace(/['"]+/g, '');
      const base64Decoded = atob(thdUser);
      const base64DecodedToJson = JSON.parse(base64Decoded);
      return base64DecodedToJson.svocCustomerAccountId;
    }
  }
  return false;
}

export function getSFLListDetailsUrl() {
  return SECURE_WWW_HOST + SAVED_FOR_LATER_USER_LIST;
}

export function getSFLCartToListUrl({ listId = '' }) {
  let url = SECURE_WWW_HOST + SAVE_FOR_LATER_CART_TO_LIST;
  if (listId) {
    url += '?listId=' + listId;
  }
  return url;
}

export function getSFLListToCartUrl({ listId = '' }) {
  let url = SECURE_WWW_HOST + SAVE_FOR_LATER_LIST_TO_CART;
  if (listId) {
    url += '?listId=' + listId;
  }
  return url;
}

export function getSFLListRemoveItemUrl({ listItem, listId = '', guid }) {
  let url = SECURE_WWW_HOST + SAVE_FOR_LATER_REMOVE_ITEM + listItem;
  if (listId && guid) {
    url += '?listId=' + listId + '&guid=' + guid;
  } else if (listId) {
    url += '?listId=' + listId;
  }
  return url;
}

export function isAuthUser() {
  const thdUserSession = readBrowserCookie('THD_USER');
  const thdCustomerCookie = readBrowserCookie('THD_CUSTOMER');
  if (typeof thdUserSession !== 'undefined' && thdUserSession) {
    if (thdUserSession !== '') {
      return true;
    }
  } else if (typeof thdCustomerCookie !== 'undefined' && thdCustomerCookie) {
    if (thdCustomerCookie !== '') {
      return true;
    }
  }
  return false;
}

export function getUsersEmail() {
  try {
    let thdUser = readBrowserCookie('THD_USER');
    if (thdUser && atob) {
      thdUser = thdUser.replace(/['"]+/g, '');
      const base64Decoded = atob(thdUser);
      if (base64Decoded && base64Decoded.startsWith('{')) {
        const base64DecodedToJson = JSON.parse(base64Decoded);
        return base64DecodedToJson.logonId;
      }
    }
  } catch (e) {
    /* */
  }
  return false;
}

export function removeUrlParameters() {
  if (window.history !== undefined && window.history.replaceState !== undefined) {
    window.history.replaceState(null, null, window.location.pathname);
  }
}

export function getURLParam(param) {
  const location = parent.document.URL;
  const re = new RegExp('[?&]' + param + '=([^&#]*)', 'i');
  const result = re.exec(location);
  if (!result) return null;
  return result[1];
}

export function setCookieFromParam(param, cname) {
  const paramVal = getURLParam(param);
  if (paramVal === 'true') {
    setBrowserCookie(cname, true, 86400, '/', COOKIE_DOMAIN);
  } else if (paramVal === 'false') {
    setBrowserCookie(cname, false, 0, '/', COOKIE_DOMAIN);
  }
}

export function scrollToTop() {
  if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
    window.scrollBy(0, -50);
    window.requestAnimationFrame(scrollToTop);
  }
}

export function isNative() {
  if (!window.THD_GLOBAL) return false;
  return !!window.THD_GLOBAL.isNative;
}

export function isNativeFrCookie() {
  const thdOnlineChannel = readBrowserCookie('THD_ONLINE_CHANNEL');
  if (typeof thdOnlineChannel !== 'undefined' && thdOnlineChannel) {
    if (thdOnlineChannel !== '') {
      const nativeValue = 'E1=S1';
      if (thdOnlineChannel.indexOf(nativeValue) > -1) {
        return true;
      }
      return false;
    }
  }
  return false;
}

export function flushStorage({ keys = [] }) {
  if (storageAvailable('localStorage')) {
    const storage = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
    keys.forEach(key => {
      delete storage[key];
    });
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
  }
}
export function nullifyParams(param, key) {
  if (param !== key) {
    return param;
  }
  return '';
}

export function trim(str) {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

export function isMyCart(dispatch) {
  const path = dispatch((d, getState) => {
    const state = getState();
    return state.settings.path;
  });
  return /^\/mycart\/home/.test(path);
}

export function windowLocation(url) {
  window.top.location.href = url;
}

export const SVG_LOADER_PATH =
  'M89.4152589,262.443467 C86.5853697,265.308557 85.0541369,269.12281 85.1056808,273.184097 C85.1389958,276.088788 85.9894712,278.902334 87.5691051,281.374558 L76,292.944292 L81.0557083,298 L92.6669286,286.390037 C95.0712658,287.86344 97.8169246,288.657971 100.797674,288.690029 C104.855818,288.690029 108.651214,287.114795 111.479846,284.251591 C114.310992,281.386501 115.841597,277.569105 115.791938,273.505932 C115.690736,265.061523 108.736702,258.106859 100.098059,258 C96.0399151,258 92.2451481,259.578377 89.4152589,262.443467 Z M100.18229,263.394516 L100.18229,263.396401 C105.686808,263.463031 110.329536,267.989471 110.391766,273.48896 C110.426338,276.110788 109.438831,278.576727 107.61342,280.426652 C105.789267,282.272177 103.3403,283.292371 100.593384,283.292371 L100.59087,283.292371 C95.0920091,283.228883 90.5661978,278.698672 90.4995678,273.199183 C90.4656243,270.574212 91.4556455,268.11016 93.2823132,266.260863 C95.1089809,264.412195 97.5598334,263.394516 100.18229,263.394516 L100.18229,263.394516 Z'; // eslint-disable-line max-len

export const SVG_CLOSE_PATH =
  'M27.229 8.391l-3.385-3.386-7.843 7.838-7.84-7.84-3.386 3.385 7.609 7.608-7.613 7.612 3.385 3.386 7.843-7.838 7.84 7.841 3.387-3.386-7.61-7.608z'; // eslint-disable-line max-len

export function getFAQ() {
  return FAQ_URL;
}

export function getB2BFAQ() {
  return B2B_FAQ_URL;
}

export function getCreditCenter() {
  return CREDIT_CENTER;
}

export function promoDates(startPromoDate, endPromoDate) {
  try {
    // format - mm/dd/yyyy
    const startDate = new Date(startPromoDate).getTime();
    const endDate = new Date(endPromoDate).getTime();
    const today = new Date();
    const todayToMillisec = today.getTime();
    if (todayToMillisec >= startDate && todayToMillisec <= endDate) {
      return true;
    }
  } catch (e) {
    /* */
  }
  return false;
}

export function promoEndsWithin24Hours(endDateInput) {
  try {
    // format - mm/dd/yyyy
    const endDate = new Date(endDateInput).getTime();
    const today = new Date();
    const todayToMillisec = today.getTime();
    const promoEndsInFutureOrToday = endDate - todayToMillisec > -86340000;
    const promoEndsIn24Hours = endDate - todayToMillisec < 86400000;
    if (promoEndsInFutureOrToday && promoEndsIn24Hours) {
      return true;
    }
  } catch (e) {
    /* */
  }
  return false;
}

export function replaceHTMLUnicodes(str) {
  try {
    if (str && typeof str === 'string') {
      return str
        .replace(/&amp;/g, '&')
        .replace(/&#x3D;/g, '=')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, '\'');
    }
  } catch (e) {
    console.log(e);
  }
  return str;
}

export function getChannel(props) {
  let channel;
  try {
    channel = props.channel || 'desktop';
    const href = window.parent.location.href || window.location.href;
    if (href.indexOf('#mobile') > -1) {
      channel = 'mobile';
    }
  } catch (e) {
    console.log(e);
  }
  return channel;
}

export const getApplianceTypeName = (attributeGroups = {}) => {
  try {
    return attributeGroups.group
      .find(g => g.groupType === 'functional details').entries.attribute
      .find(a => a.name === 'Appliance Type').value;
  } catch (e) {/**/} return '';
};

export const getGenericName = (applianceTypeName = 'item') => applianceTypeName.split(' ').pop();

export function loadExternalScript(scriptUrl) {
  const scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = scriptUrl;
  });
  return scriptPromise;
}

export function isStrAplncAssoc() {
  const thdStrAplncAssoc = readBrowserCookie('THD_STR_APLNC_ASSOC');
  if (typeof thdStrAplncAssoc !== 'undefined' && thdStrAplncAssoc) {
    if (thdStrAplncAssoc === 'true') {
      return true;
    }
  }
  return false;
}

export function addNewRelicCustomTag(tagName, tagValue) {
  try {
    if (typeof window.newrelic === 'object') {
      window.newrelic.setCustomAttribute(tagName, tagValue);
    }
  } catch (e) {
    console.log('NR custom attribute Error');
  }
}

export function addNewRelicNoticeError(err) {
  try {
    if (typeof window.newrelic === 'object') {
      window.newrelic.noticeError(err);
    }
  } catch (e) {
    console.log('NR Notice Error');
  }
}

export function getWRUID() {
  const WRUID = readBrowserCookie('WRUID15e');
  return WRUID;
}

export function addNewRelicPageAction(actionName, actionObject) {
  try {
    if (window.newrelic && typeof window.newrelic.addPageAction === 'function') {
      window.newrelic.addPageAction(actionName, actionObject);
    }
  } catch (e) {
    console.log('NR Page Action Error');
  }
}

export function handleNewRelicItemIdNotNumber({ message }) {
  try {
    const isNumOnly = /^\d+$/;
    if (!isNumOnly.test(message.data.item.itemId)) {
      window.newrelic.addPageAction('itemId_not_number', message.data.item);
    }
  } catch (e) {/**/}
}

export function addNewRelicAtcStatus(options, responseStatus) {
  try {
    window.newrelic.addPageAction('log_ATC_Response_Status', {
      serviceOptions: options,
      serviceResponse: responseStatus,
    });
  } catch (e) {/**/}
}

export function getCartActivity() {
  const cartActCookie = readBrowserCookie('cart_activity');
  return cartActCookie || 'new_user';
}

// temp fix for SBOTD PS bug
export function isSBOTD() {
  try {
    const pathArray = window.parent.location.pathname.split('/');
    const sbotdName = pathArray[1];
    const nameCHK = 'SpecialBuy';
    if (sbotdName === nameCHK) {
      return true;
    }
    return false;
  } catch (e) {/**/}
  return false;
}

export function fulfillmentChangeForBossSharedSKU(messagesModel) {
  let changedFulfillment;
  if ((messagesModel || []).some(message =>
    message.name === 'BOPIS_UPDATE_MESSAGE')) {
    changedFulfillment = 'BOPIS';
  } else if ((messagesModel || []).some(message =>
    message.name === 'BOSS_UPDATE_MESSAGE')) {
    changedFulfillment = 'ShipToStore';
  }
  return changedFulfillment;
}

export function checkPOJobNameRequired(state) {
  return getCustomerType() === CUSTOMER_TYPE_B2B &&
  typeof state.featureSwitch !== 'undefined'
    && state.featureSwitch.poJobRequiredForPurchases
    && !state.cart.showPOEditRemove;
}

export function disableCheckoutButton(state) {
  return checkPOJobNameRequired(state);
}

export function showBossSharedOption({ quantity, store }) {
  return quantity && store &&
  store.fulfillmentOptions.secondaryBuyOnlineShipToStore &&
  store.fulfillmentOptions.buyOnlinePickupInStore &&
  store.fulfillmentOptions.buyOnlinePickupInStore.inventory
  .expectedQuantityAvailable < quantity;
}

export function isBossSharedSkuFeatureOn(state) {
  if (getCustomerType() === CUSTOMER_TYPE_B2B) {
    return state.featureSwitch && state.featureSwitch.BossSharedSkuEnhancementB2B;
  }
  return state.featureSwitch && state.featureSwitch.BossSharedSkuEnhancement;
}

export function isQuantityBopisEligible({ storeFulfillmentDetails, quantity }) {
  if (storeFulfillmentDetails &&
    storeFulfillmentDetails.alternateStores &&
    storeFulfillmentDetails.alternateStores.store &&
    storeFulfillmentDetails.alternateStores.store.length) {
    const stores = storeFulfillmentDetails.alternateStores.store;
    return stores.some((store) => {
      return store.fulfillmentOptions &&
      store.fulfillmentOptions.buyOnlinePickupInStore &&
      store.fulfillmentOptions.buyOnlinePickupInStore.inventory &&
      store.fulfillmentOptions.buyOnlinePickupInStore.inventory.expectedQuantityAvailable &&
      store.fulfillmentOptions.buyOnlinePickupInStore.inventory
      .expectedQuantityAvailable >= quantity;
    });
  }
  return false;
}

export function isQuantityBopisableInStore({ store, quantity }) {
  if (quantity === '') return true;
  return quantity && store &&
  store.fulfillmentOptions.buyOnlinePickupInStore &&
  store.fulfillmentOptions.buyOnlinePickupInStore.inventory
  .expectedQuantityAvailable >= quantity;
}

export function doesBossSharedStoreExist({ state, storeId }) {
  if (!isBossSharedSkuFeatureOn(state)) {
    return false;
  }
  let selectedStoreIds = Object.keys(state.selectAStore.quantitiesByStore) || [];
  // remove current storeId from the list, if exists
  selectedStoreIds = selectedStoreIds.filter(id => id !== storeId);
  const selectedStores = state.selectAStore.storeFulfillment &&
  state.selectAStore.storeFulfillment.storeFulfillmentDetails &&
  state.selectAStore.storeFulfillment.storeFulfillmentDetails.alternateStores &&
  state.selectAStore.storeFulfillment.storeFulfillmentDetails.
  alternateStores.store &&
  state.selectAStore.storeFulfillment.storeFulfillmentDetails.
  alternateStores.store
  .filter(store => {
    return selectedStoreIds.indexOf(store.storeId) > -1;
  }) || [];

  return selectedStores.some(store => {
    return showBossSharedOption({
      store,
      quantity: state.selectAStore.quantitiesByStore[store.storeId] &&
      state.selectAStore.quantitiesByStore[store.storeId].quantity
    });
  });
}