export const getDevice = ({ browser, os }) => `${os || 'unknown'} - ${browser || 'unknown'}`;
