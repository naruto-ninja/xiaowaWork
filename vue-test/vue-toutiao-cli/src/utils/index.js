/**
 * @param {[type]}
 * @return {[type]}
 *  */

export const convert = tabs => {
  return tabs.map((tab, index) => {
    return {
      ...tab,
      unit: index
    }
  })
}