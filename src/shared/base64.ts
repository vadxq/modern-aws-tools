/**
 * base64编码方法,兼容中文
 * @param str
 * @returns
 */
export const utoa = (str: string) => {
  return btoa(decodeURIComponent(encodeURIComponent(str)));
};
