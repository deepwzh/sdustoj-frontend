/**
 * Copyright (c) 2018-present, SDUST ACM Association Development Group. 
 * 目录树工具函数
 * @Author: deepwzh 
 * @Date: 2018-08-09 20:07:24 
 * @Last Modified by: deepwzh
 * @Last Modified time: 2018-08-18 08:38:24
 */

/**
 * 查找目录在数组中是否存在
 * @param {Array} data 被查找的数组
 * @param {String} dir 要查找的目录名
 * @param {Number} 目录在数组的位置，查不到就返回-1
 */
function findDirId(data, dir) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].title === dir) {
            return i;
        }
    }
    return -1;
}
/**
 * 递归添加题目到目录树
 * @param {Array} tree_data 目录树 
 * @param {Object} item 题目对象
 */
function append_problem(tree_data, item, dir_length) {
    if (item.directory.length < 1) {
        tree_data.push({
            id:item.problem.id,
            title:item.problem.title,
            is_leaf: true
        });
        return;
    }
    let dir = item.directory.shift();
    let pos = findDirId(tree_data, dir);
    if (pos === -1) {
        tree_data.push({
            id:"#" + dir + item.problem.id + item.directory.length,
            title:dir,
            children: [],
            is_leaf: false
        })
        append_problem(tree_data[tree_data.length - 1].children, item);
    } else {
        append_problem(tree_data[pos].children, item);
    }
}
/**
 * 遍历目录树
 * @param {Array} tree_data 题目树
 * @param {Number} depth 树的深度
 */
function traverse_tree(tree_data, depth, keys, callback) {
    let index = 0;
    for (let item of tree_data) {
        console.log("--".repeat(depth) + item.title);
        let new_keys = [...keys, index];
        if (item.children) {
            traverse_tree(item.children, depth + 1, new_keys, callback);
        } else {
            callback(item.id, new_keys.reduce((prev, next) => prev + '-' + next));
        }
        index++;
    }
}
/**
 * 根据题目的目录树生成题目ID到层级key的映射（Tree的工具函数）
 * @param {Array} 目录树
 * @return {Map} 题目ID到层级key的映射
 */
function get_mapping(data) {
    const map = new Map();
    traverse_tree(data, 0, [0], 
        (problem_id, key) => {
            console.log("callback" + problem_id + " " + key);
            map.set(problem_id, key);
        });
    return map;
}
/**
 * 根据返回的题目数组生成目录树 
 * @param {Array} data 题目的数组
 * @return {Array} 目录树 
 */
function get_problem_tree(data) {
    if (!data) return [];
    let problem_data = data.map((item)=> {
        return Object.assign({}, item, {directory: [...item.directory]})
    })
    let tree_data = [];
    for (let item of problem_data) {
        append_problem(tree_data, item);
    }
    return tree_data;
}

/**
 * 递归打印树(测试用)
 * @param {Array} tree_data 题目树
 * @param {Number} depth 树的深度
 */
function print_tree(tree_data, depth) {
    if (!tree_data) {
        return;
    }
    for (let item of tree_data) {
        console.log("--".repeat(depth) + item.title);
        print_tree(item.children, depth + 1);
    }
}
// print_tree(tree_data, 0);
export {
    get_problem_tree,
    get_mapping
};