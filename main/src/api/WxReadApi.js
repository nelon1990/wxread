import Rx from 'rxjs';

let APPCODE = 'df385f8bdb00439ba592a2d6286e9f90';
let BASE_URL = 'http://jisuwxwzjx.market.alicloudapi.com';
let PATH_GET_CHANNEL = BASE_URL + '/weixinarticle/channel';
let PATH_GET_ARTICLES = BASE_URL + '/weixinarticle/get';
let PATH_GET_SEARCH = BASE_URL + '/weixinarticle/search';
let BASE_HEADER = {
    Authorization: 'APPCODE ' + APPCODE
};

export default class WxReadApi {
    static getWxReadChannelId() {
        return Rx.Observable.create(subscriber => {
            fetch(PATH_GET_CHANNEL,
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

    static getWxReadArticles(channelId, num, start) {
        return Rx.Observable.create(subscriber => {
            fetch(PATH_GET_ARTICLES + '?channelid=' + channelId + '&' + 'num=' + num + '&' + 'start=' + start,
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


    static getWxReadSearch(keyword) {
        return Rx.Observable.create(subscriber => {
            fetch(PATH_GET_SEARCH + '?keyword=' + keyword,
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