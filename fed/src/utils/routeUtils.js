import { ALLOWED_TYPES } from '../constants/appConstants';

export const getChannels = () => {
  return 'channel(mobile|tablet|desktop)';
};

export const getServiceTypes = () => {
  return `serviceType(${ALLOWED_TYPES.join('|')})`;
};

export const getAppType = () => {
  return 'appType(internal|external)';
};