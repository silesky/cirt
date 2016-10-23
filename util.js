
import { uniq } from 'lodash';

export const searchArr = (term, arr) => {
  // term should modify the regex
  const re = new RegExp(`($|^|\b)${term}`,  'i');
  const indexMatches = arr.map((el, index) => {
    const str = el.toString();
    console.log("str is: ", typeof str);
      if (str.match(re)) return index
      return false;
  })
  return indexMatches;
};

export const searchObj = (term, obj) => {
  let resultsArr = [];
  for (let key in obj) {
    resultsArr.push(searchArr(term, obj[key]))
  }
  const objResultsArr = [].concat(...resultsArr);
  const filteredObjResults = objResultsArr
  .filter((el) => { 
    return Number.isInteger(el);
  })
  const uniqueItems = uniq(filteredObjResults);
  return uniqueItems;
}



