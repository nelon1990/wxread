import Rx from 'rxjs';

let APPCODE = 'df385f8bdb00439ba592a2d6286e9f90';
let BASE_URL = 'http://ali-weixin-hot.showapi.com';
let PATH_GET_ARTICLE_TYPE_LIST = BASE_URL + '/articleTypeList';
let PATH_GET_ARTICLES = BASE_URL + '/articleDetalList';
let PATH_GET_MP_TYPE_LIST = BASE_URL + '/numTypeList';
let PATH_GET_MPS = BASE_URL + '/numDetailList';

let BASE_HEADER = {
    Authorization: 'APPCODE ' + APPCODE
};

export default class WxReadApi {
    static getArticleTypeList() {
        return Rx.Observable.create(subscriber => {
            fetch(PATH_GET_ARTICLE_TYPE_LIST,
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
                    subscriber.error(err);
                    subscriber.complete();
                })
        });
    }

    static getMpTypeList() {
        return Rx.Observable.create(subscriber => {
            fetch(PATH_GET_MP_TYPE_LIST,
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
                    subscriber.error(err);
                    subscriber.complete();
                })
        });
    }

    static getArticles(key, page, typeId) {
        return Rx.Observable.create(subscriber => {
            fetch(PATH_GET_ARTICLES + '?key=' + key + '&' + 'page=' + page + '&' + 'id=' + typeId,
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
                    subscriber.error(err);
                    subscriber.complete();
                });
        });
    }


    static getMps(keyword, page, type1_id, type2_id) {
        return Rx.Observable.create(subscriber => {
            fetch(PATH_GET_MPS + '?keyword=' + keyword + '&' + 'page=' + page + '&' + 'type1_id=' + type1_id + '&' + 'type2_id=' + type2_id,
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
                    subscriber.error(err);
                    subscriber.complete();
                });
        });
    }
}