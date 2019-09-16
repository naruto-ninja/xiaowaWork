//index.js
var app = getApp();

var api = new Proxy(
    wx,
    {
        get(target, key) {
            if (typeof target[key] === 'function' && !/Sync$/.test(key)) {
                return function(params = {}, ...args) {
                    return new Promise((resolve, reject) => {
                        target[key]({
                            ...params,
                            success: function (data) {
                                params.success && params.success(data);
                                resolve(data);
                            }
                        }, ...args);
                    })
                }
            }
        }
    }
)

Page({
    data: {
        name: 'naruto',
        list: []
    },

    login() {
        wx.login({
            success(res) {
                console.log(' wx login res', res);
                wx.request({
                    url: `http://localhost:9000/login?code=${res.code}`,
                    success(res) {
                        console.log(' wx login res', res);
                        wx.setStorage({
                            key: 'loginToken',
                            data: res.data.openid,
                        })
                    }

                })
            }
        })
    },

    onLoad() {
        wx.getStorage({
            key: 'loginToken',
            success: function (res) {
                // 
                console.log('登录过了');
            },
            fail: () => {
                console.log('未登录， 现在login');
                this.login()
            }
        })

        api.request({
            url: 'http://localhost:9000/list',
        }).then(({ data }) => {
            console.log('api.request data::', data);
            this.setData({
                list: data.data
            })
        })

        // wx.request({
        //     url: 'http://localhost:9000/list',
        //     success: ({ data }) => {
        //         console.log('data::', data);
        //         this.setData({
        //             list: data.data
        //         })
        //     }
        // })
    }
})
