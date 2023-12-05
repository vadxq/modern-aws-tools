/**
 * 获取过期时间,精确到秒
 */
export const getExactDate = () => {
  const date = new Date();
  date.setTime(date.getTime() + 1 * 60 * 60 * 1000);

  const nowYear = date.getFullYear();

  // 获取当前月份
  let nowMonth: string = (date.getMonth() + 1).toString();

  // 获取当前是几号
  let nowDate: string = date.getDate().toString();

  let hour: string = date.getHours().toString(); // 得到小时
  let minu: string = date.getMinutes().toString(); // 得到分钟
  let sec: string = date.getSeconds().toString(); // 得到秒
  if (+hour < 10) hour = '0' + hour;
  if (+minu < 10) minu = '0' + minu;
  if (+sec < 10) sec = '0' + sec;

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (+nowMonth >= 1 && +nowMonth <= 9) {
    nowMonth = '0' + nowMonth;
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (+nowDate >= 0 && +nowDate <= 9) {
    nowDate = '0' + nowDate;
  }
  // return '2023-06-18T12:26:18Z'
  return (
    nowYear +
    '-' +
    nowMonth +
    '-' +
    nowDate +
    'T' +
    hour +
    ':' +
    minu +
    ':' +
    sec +
    'Z'
  );
};

export default getExactDate;
