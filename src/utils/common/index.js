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

/** 
 * param 将要转为URL参数字符串的对象 
 * key URL参数字符串的前缀 
 * encode true/false 是否进行URL编码,默认为true 
 *  
 * return URL参数字符串 
 */  
export function urlEncode(param, key, encode) {  
    if(param==null) return '';  
    var paramStr = '';  
    var t = typeof (param);  
    if (t == 'string' || t == 'number' || t == 'boolean') {  
      paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);  
    } else {  
      for (var i in param) {  
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);  
        paramStr += urlEncode(param[i], k, encode);  
      }  
    }  
    return paramStr;  
  };  