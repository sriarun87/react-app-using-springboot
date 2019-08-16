import { readBrowserCookie } from '../utils';
import { CUSTOMER_TYPE_B2B } from '../constants/appConstants';

// to get experience type as b2b or b2c
export function getCustomerType() {
  try {
    let thdUser = readBrowserCookie('THD_USER', document.cookie);
    if (thdUser && atob) {
      // TO DO - post august release we need to remove this THD_USER check
      thdUser = thdUser.replace(/['"]+/g, '');
      const base64Decoded = atob(thdUser);
      if (base64Decoded && base64Decoded.startsWith('{')) {
        const base64DecodedToJson = JSON.parse(base64Decoded);
        if (base64DecodedToJson.customerType) {
          return base64DecodedToJson.customerType;
        }
      }
    } else {
      const thdCustomer = readBrowserCookie('THD_CUSTOMER', document.cookie);
      const splitCookie = thdCustomer.split('.')[0];
      const decodedCookie = atob(splitCookie);
      const decodedCookieJson = JSON.parse(decodedCookie);
      const customerType = decodedCookieJson.c;
      return customerType || 'B2C';
    }
  } catch (e) {/* */}
  return '';
}

export function getFirstStoreDefaultQuantity({ itemQuantity, store }) {
  try {
    if (getCustomerType() === CUSTOMER_TYPE_B2B) {
      const { expectedQuantityAvailable } = store
          .fulfillmentOptions.buyOnlinePickupInStore.inventory;
      if (typeof itemQuantity === 'undefined') {
        return null;
      }
      if (itemQuantity <= expectedQuantityAvailable) {
        return itemQuantity;
      }
      return expectedQuantityAvailable;
    }
    if (typeof itemQuantity !== 'undefined') {
      return itemQuantity;
    }
  } catch (e) {/**/}
  return null;
}

export function isCMSPromo(promotionsModel) {
  try {
    if ((promotionsModel || [])
    .some(promotion => promotion.promoCode.length <= 8)) {
      return true;
    }
    return false;
  } catch (e) {/**/}
  return false;
}
