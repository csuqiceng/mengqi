/**
 * AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统，
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

 class Localstorage {
   /**
    * 根据key获取json数值
    * @param key
    * @returns {Promise<TResult>}
    */
   static get(key) {
     return AsyncStorage.getItem(key)
       .then(value => {
         if (value && value !== '') {
           const jsonValue = JSON.parse(value);
           return jsonValue;
         }
         return null;
       })
       .catch(() => null);
   }

   /**
    * 保存key对应的json数值
    * @param key
    * @param value
    * @returns {Promise<string>}
    */
   static save(key, value) {
     return AsyncStorage.setItem(key, JSON.stringify(value));
   }

   /**
    * 更新key对应的json数值
    * @param key
    * @param value
    * @returns {Promise<TResult>|Promise.<TResult>|Promise<T>}
    */
   static update(key, value) {
     return AsyncStorage.get(key).then(item => {
       value =
         typeof value === 'string' ? value : Object.assign({}, item, value);
       return AsyncStorage.setItem(key, JSON.stringify(value));
     });
   }

   /**
    * 删除key对应json数值
    * @param key
    * @returns {Promise<string>}
    */
   static deleteItem(key) {
     return AsyncStorage.removeItem(key);
   }

   // 删除选择的json
   static deleteOptional(array) {
     array.map((item, index) => AsyncStorage.removeItem(item));
   }

   /**
    * 删除所有配置数据
    * @returns {Promise<string>}
    */
   static clear() {
     return AsyncStorage.clear();
   }
 }

 export default Localstorage;
