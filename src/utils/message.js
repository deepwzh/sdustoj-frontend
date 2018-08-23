import { message } from 'antd';
import { assert } from 'chai'; 
import { goForward } from 'connected-react-router';
const message_show_time = 2;
const loading = (loading_text) => {
    if (!loading_text) return () => {};
    const hide = message.loading(loading_text, 0);
    return hide;
};
class Message {
    constructor(msg, time=1000) {
        this.instance = null;
        this.timer = setTimeout(() => {
            this.instance = loading(msg);
        }, time);
        return () => {
            if (this.instance) {
                this.instance();
            }
            if (this.timer) {
                clearTimeout(this.timer);
            }
        }
    }
}
const error = (msg) => {
    if (!msg) return () => {};
    const hide = message.error(msg, message_show_time);
    return hide;
}
const success = (msg) => {
    if (!msg) return () => {};
    message.success(msg, message_show_time);
}
function infoRequest(user_config) {
    return function(target) {
        let config = Object.assign({
            default_value: { results: []}, 
            loading_text: '正在加载',
            // success_text: '获取成功',
            callback: null}, user_config);
       let { 
        default_value, 
        loading_text,
        success_text,
        callback} = config;
       return (...rest) => {
           assert(typeof target == 'function', '被装饰的函数返回值不能为空');
           const closeTip = new Message(loading_text);
           return target(...rest)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                if (response.status === 204) { // No Content
                    return Promise.resolve('');
                } else {
                    return response.json();
                }
            }
            // else if (response.status >=300 && response.status < 400) {

            // } 
            else if (response.status >= 400 && response.status < 500) {
                // if (response.status === 403) {
                return Promise.reject(response.json().then((data) => ({message: data.detail})));
                    // goForward('/login');
                // }
                //return response.json();
            } else if (response.status >= 500 && response.status < 600) {
                return Promise.reject({ message: '服务不可用'})
            } else {
                return response.json();
            }
        })
        .then((res) => {
            if (success_text)
                success(success_text);
            if (callback) {
                callback(res); //操作成功后调用相应的回调函数
            }
            return Promise.resolve(res);
        }).catch(err => {
            if (err instanceof Promise) {
                err.then(v => error(v.message));
            } else {
                error(err.message);
            }
            return Promise.resolve(default_value);
        }).finally(data => {
            closeTip();
            return data;
        })
    };
    }
}
function callbackDecorator(callback) {
    return function(target) {
        return (...rest) => {
            let value = target(...rest);
            if (!callback) return value;
            return value.then((data) => {callback();return data});
        }
    }
}
export {
    loading,
    error,
    success,
    infoRequest,
    callbackDecorator
};