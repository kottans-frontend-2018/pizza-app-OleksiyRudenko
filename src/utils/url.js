/* Templated url methods */

export const URL_PARAM_REGEXP = /(:[^\/]+)/g;
export const URL_PARAM_EXTRACT = /(:[^\/]+)/;
const urlToRegexp = url => RegExp(`^${url.replace(URL_PARAM_REGEXP, '([^/]+)')}$`);

export const isMatchingPath = (template, url) => {
  template = urlToRegexp(template);
  console.log('Match ' + template + ' vs ' + url + ' = ' + template.test(url));
  return template.test(url);
};

export const containsUrlParams = path => URL_PARAM_REGEXP.test(path);
