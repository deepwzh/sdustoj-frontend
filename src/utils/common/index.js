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