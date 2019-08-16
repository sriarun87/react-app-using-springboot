export function digitalEmitterNotification(url, req, resp) {
  try {
    if (typeof window.top.DIGITAL_EMITTER !== 'undefined') {
      window.top.DIGITAL_EMITTER.trigger('CART_REQUEST', url, req, resp);
    }
    if (typeof window.EVENT_EMITTER !== 'undefined') {
      window.EVENT_EMITTER.trigger('INITIALIZE_COOKIE_MANAGER');
    }
  } catch (e) {
    console.log(e);
  }
  window.EVENT_EMITTER.trigger('INITIALIZE_COOKIE_MANAGER');
}

export function compareQuantityValues({ quantity, previousQuantity }) {
  try {
    if ((isNaN(quantity) && isNaN(previousQuantity)) ||
        (quantity.trim() === '' && previousQuantity.trim() === '') ||
        isNaN(quantity) ||
        quantity.trim() === '') {
      return false;
    }
    if (isNaN(previousQuantity) || previousQuantity.trim() === '') {
      return true;
    }
    return parseFloat(quantity, 10) > parseFloat(previousQuantity, 10);
  } catch (e) {/**/}
  return false;
}

export function triggerFulfillmentEvent({ fulfillmentComponent }) {
  try {
    if (typeof window.EVENT_EMITTER !== 'undefined') {
      window.EVENT_EMITTER.trigger('FULFILLMENT_COMPONENT', fulfillmentComponent);
    }
  } catch (e) {/**/}
}
