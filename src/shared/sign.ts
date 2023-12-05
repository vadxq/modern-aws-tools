import CryptoJS from 'crypto-js';

/**
 * 签名函数
 * @param key
 * @param region
 * @param service
 * @param msg
 * @returns
 */
export const sign = (
  key: string,
  region: string,
  service: string,
  msg: string
) => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  // CryptoJS 提供的HmacSHA256 方法
  // 参考 https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-authentication-HTTPPOST.html
  const kDate = CryptoJS.HmacSHA256(date, 'AWS4' + key);
  const kRegion = CryptoJS.HmacSHA256(region, kDate);
  const kService = CryptoJS.HmacSHA256(service, kRegion);
  const kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
  return CryptoJS.HmacSHA256(msg, kSigning);
};

export default sign;
