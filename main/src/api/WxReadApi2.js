import Rx from 'rxjs';

let APPCODE = 'df385f8bdb00439ba592a2d6286e9f90';
let BASE_URL = 'http://ali-weixin-hot.showapi.com';
let PATH_GET_TYPE_LIST = BASE_URL + '/articleTypeList';
let PATH_GET_ARTICLES = BASE_URL + '/articleDetalList';
let BASE_HEADER = {
    Authorization: 'APPCODE ' + APPCODE
};

export default class WxReadApi {
    static getTypeList() {
        return Rx.Observable.create(subscriber => {
            fetch(PATH_GET_TYPE_LIST,
                {
                    method: 'GET',
                    headers: {
                        ...BASE_HEADER
                    },
                })
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(json => {
                    subscriber.next(json);
                    subscriber.complete();
                })
                .catch(err => {
                    subscribe.error(err);
                    subscribe.complete();
                })
        });
    }

    static getArticles(key, page, typeId) {
        return Rx.Observable.create(subscriber => {
            fetch(PATH_GET_ARTICLES + '?key=' + key + '&' + 'page=' + page + '&' + 'typeId=' + typeId,
                {
                    method: 'GET',
                    headers: {
                        ...BASE_HEADER
                    },
                })
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(json => {
                    subscriber.next(json);
                    subscriber.complete();
                })
                .catch(err => {
                    subscribe.error(err);
                    subscribe.complete();
                });
        });
    }

}