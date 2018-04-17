/* Templated url methods */

export const URL_PARAM_REGEXP = /(:[^\/]+)/g;
const urlToRegexp = url => RegExp(`^${url.replace(URL_PARAM_REGEXP, '([^/]+)')}$`);

export const isMatchingPath = (template, url) => {
  template = urlToRegexp(template);
  // console.log('Match ' + template + ' vs ' + url + ' = ' + template.test(url));
  return template.test(url);
};

export const containsUrlParams = path => URL_PARAM_REGEXP.test(path);

export const extractUrlParams = (template, url) => {
  const params = {};
  const values = url.split('/');
  if (!values) {
    return params;
  }
  return template.split('/').reduce((acc, param, idx) => {
    if (!containsUrlParams(param)) {
      return acc;
    }
    acc[param.slice(1)] = values[idx];
    return acc;
  }, params);
};
