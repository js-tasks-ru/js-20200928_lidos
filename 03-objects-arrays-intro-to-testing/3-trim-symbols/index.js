/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let count = 0

  return [...string].reduce((accumulatedString, char) => {
  	if (accumulatedString.slice(-1) === char) {
    	count++ 
     } else {
     	count = 0
     }
    
    if (count >= size) {
    	return accumulatedString
    } else {
    	return accumulatedString += char
    }
  }, '')
}
