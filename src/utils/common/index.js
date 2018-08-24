import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
/**
 * 将数组改写为有索引的数组
 * @param {*} 数组
 * @param {*} 被指定的索引字段
 * @return 带索引的数组
 */
export function addIndexToArray(data, index_field) {
    let res = [];
    for (let item of data) {
        res.push({
            [item[index_field]]: item
        })
    }
}

export function getFormattedTime(str) {
    return moment(str).format('LLL');
}
export function getFormattedDate(str) {
    return moment(str).format('YYYY-MM-DD');
}