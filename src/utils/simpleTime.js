/**
 * @description 一个简单的时间日期‘精简’函数
 * eg. xxxx-xx-xxTxx:xx:xx.ddddddZ > xxxx-xx-xx xx:xx:xx
 * @param time 时间字符串
 * @returns 精简后的时间字符串
 */
let simpleTime = (time)=>{
    let d1 = time.split('T');
    let d2 = d1[1].split('Z');
    let d3 = d2[0].split('.');
    return d1[0] + '  ' +d3[0];
}

export {simpleTime};