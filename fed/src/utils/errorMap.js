
const GENERIC_ERROR = 'There was a problem adding your item. Please try again.';
export const errorMap = {
  CART_GEN_ERR: GENERIC_ERROR,
  CART_ERR_500: GENERIC_ERROR,
  INVENTORY_ERROR: 'We are sorry, the quantity of items is not available',
  CART_GEN_ERR1: 'The service is currently unavailable. Please try again later.',
  CART_ERR_101: GENERIC_ERROR,
  CART_ERR_114: 'Please select your local Home Depot store to help us determine product availability', // eslint-disable-line max-len
  CART_ERR_115: 'Please reduce the number of stores you are shopping from',
  CART_ERR_168: 'There are not enough items available to meet your order. Please reduce the number of items you are requesting or select another item.', // eslint-disable-line max-len
  CART_ERR_167: `Quantity requested exceeds available amount at your local store.
    Please select remaining quantity from other store(s).`,
  ERR_PAYPAL_PAYMENT: 'Unable to checkout with PayPal. Please try again with other payment Options.', // eslint-disable-line max-len
  ERR_PAYPAL_UNAVAILABLE: 'Sorry, this item cannot be sold in or shipped to this state.',
  ERR_BODFS_FLOC_UNAVAILABLE_IN_CART: 'Sorry, item is not available for delivery in this ZIP code. Enter a valid ZIP code or select another fulfillment method.', // eslint-disable-line max-len
  ERR_BODFS_COM_LOW_INVENTORY_IN_CART: 'There are not enough items in stock to meet your order. Please reduce the number of items you are requesting.', // eslint-disable-line max-len
  ERR_BODFS_COM_DOWN_IN_CART: 'Delivery scheduling is unavailable but you may complete your order. Please select another fulfillment method.', // eslint-disable-line max-len
  ERR_BODFS_INVALID_DELIVERY_IN_CART: 'Sorry, one or more items are not available for delivery in this ZIP Code.' // eslint-disable-line max-len
};

export function getMccErrorDescription(errorModel) {
  switch (errorModel.mccerrorCode) {
    case 'MCC_CART_169':
      if (errorModel.inventory) {
        return `Only ${errorModel.inventory} in stock. Please reduce the quantity of this item.`;
      }
      return errorMap.CART_ERR_168;
    default:
      return errorModel.description;
  }
}

export function getErrorDescription(errorModel) {
  if (errorModel.mccerrorCode) {
    return getMccErrorDescription(errorModel);
  }

  if (errorMap[errorModel.errorCode]) {
    return errorMap[errorModel.errorCode];
  }

  return errorModel.description;

}


export default function updateErrorMessage(errorModel) {
  const description = getErrorDescription(errorModel) || GENERIC_ERROR;
  return {
    ...errorModel,
    description
  };
}
