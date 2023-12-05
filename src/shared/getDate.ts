/**
 * 当前UTC日期 返回20230618
 * @returns string
 */
export const getDate = () => {
  // 获取当前日期
  const date = new Date();
  const nowYear: string = date.getUTCFullYear().toString();
  // 获取当前月份
  let nowMonth: string = (date.getUTCMonth() + 1).toString();
  // 获取当前是几号
  let nowDate: string = date.getUTCDate().toString();
  // 对月份进行处理，1-9月在前面添加一个“0”
  if (+nowMonth >= 1 && +nowMonth <= 9) {
    nowMonth = '0' + nowMonth;
  }
  // 对月份进行处理，1-9号在前面添加一个“0”
  if (+nowDate >= 0 && +nowDate <= 9) {
    nowDate = '0' + nowDate;
  }
  // return '20230618'
  return nowYear + nowMonth + nowDate;
};

export default getDate;
