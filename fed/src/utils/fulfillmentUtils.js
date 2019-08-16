import * as fulfillmentConstants from '../apps/cart/constants/Fulfillment';

export const getGridClassDesktop = ({
  // item = {},
  type = 'fulfillment',
  channel = 'desktop',
  fulfillmentComponent
}) => {
  try {
    if (channel === 'desktop') {
      if (type === 'productDetails') {
        // TODO add some T&T cookie based logic
        if (fulfillmentComponent === fulfillmentConstants.CART_FULFILLMENT) {
          return 'col__12-12 col__2-12--xs';
        }
        if (fulfillmentComponent === fulfillmentConstants.FULFILLMENT_PILLS) {
          return 'col__3-12';
        }
        if (fulfillmentComponent === fulfillmentConstants.VERTICAL_PILLS) {
          return 'col__3-12';
        }
        return 'col__8-12 col__4-12--xs';
      }
      if (type === 'fulfillment') {
          // TODO add some T&T cookie based logic
        if (fulfillmentComponent === fulfillmentConstants.CART_FULFILLMENT) {
          return 'col__12-12 col__5-12--xs';
        }
        if (fulfillmentComponent === fulfillmentConstants.FULFILLMENT_PILLS) {
          return 'col__4-12';
        }
        if (fulfillmentComponent === fulfillmentConstants.VERTICAL_PILLS) {
          return 'col__4-12 body__p-sides-none';
        }
        return 'col__4-12 col__3-12--xs';
      }
    }
      // TODO add the mobile component handler here as well if necessary
      // if (channel === 'mobile') {
      // }
  } catch (e) {/**/}
  return null;
};

export const getFulfillmentLabel = ({ fulfillmentMethod }) => {
  switch (fulfillmentMethod) {
    case fulfillmentConstants.BOPIS:
      return 'In-Store Pick Up';
    case fulfillmentConstants.BOSS:
      return 'Ship To Store';
    case fulfillmentConstants.BODFS:
      return 'Express Delivery';
    case fulfillmentConstants.APPLIANCE:
      return 'Home Delivery';
    default:
      return 'Ship to Home';
  }
};

export const getFulfillments = ({ fulfillmentModel }) => {
  try {
    const pickUp = fulfillmentModel.find(f => f.fulfillmentMethod === fulfillmentConstants.BOPIS)
      || fulfillmentModel.find(f => f.fulfillmentMethod === fulfillmentConstants.BOSS);
    const shipping = fulfillmentModel.find(f => f.fulfillmentMethod === fulfillmentConstants.STH);
    const delivery = fulfillmentModel.find(f => f.fulfillmentMethod === fulfillmentConstants.BODFS);
    return [{
      fulfillmentMethod: !!pickUp ? pickUp.fulfillmentMethod : fulfillmentConstants.BOPIS,
      ...pickUp,
      enabled: !!pickUp,
      icon: 'pick-up-' + String(!!pickUp)
    }, {
      fulfillmentMethod: fulfillmentConstants.STH,
      ...shipping,
      enabled: !!shipping,
      icon: 'delivery-' + String(!!shipping)
    }, {
      fulfillmentMethod: fulfillmentConstants.BODFS,
      ...delivery,
      enabled: !!delivery,
      icon: 'express-' + String(!!delivery)
    }];
  } catch (e) {/**/}
  return [];
};

export const getSelectedFulfillmentItems = ({ itemModels, fulfillmentMethod }) => {
  return itemModels.filter(item => {
    return item.fulfillmentModel.find(
      m => m.selected && m.fulfillmentMethod === fulfillmentMethod
    );
  }
  );
};