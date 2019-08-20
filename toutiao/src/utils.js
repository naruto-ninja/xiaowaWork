
 /**
 *
 *
 * @param {*} params
 * @returns
 */
export const require = params => {
  const requestParams = {
    ...params,
    method: (params.method && params.method.toUpperCase()) || 'GET'
  }
  return fetch(requestParams)
          .then(res => res.json())
}