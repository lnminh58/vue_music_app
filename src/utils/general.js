export const getIndexFromURL = url => {
  const keyWord = 'index=';
  const indexPosition = url.lastIndexOf(keyWord) + keyWord.length;
  return Number(url.substring(indexPosition, url.length));
};
