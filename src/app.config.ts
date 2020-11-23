export default {
    pages: [
        'pages/inbox/index',
        'pages/channel/index',
        'pages/outbox/index',
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    },
    tabBar: {
        "color": "#999999",
        "selectedColor": "#79A1EB",
        list: [
            {
                "selectedIconPath": "images/inboxSelected.png",
                "iconPath": "images/inbox.png",
                "pagePath": "pages/inbox/index",
                "text": "收件"
            },
            {
                "selectedIconPath": "images/channelSelected.png",
                "iconPath": "images/channel.png",
                "pagePath": "pages/channel/index",
                "text": "频道"
            },
            {
                "selectedIconPath": "images/outboxSelected.png",
                "iconPath": "images/outbox.png",
                "pagePath": "pages/outbox/index",
                "text": "发布"
            },
        ]
    }
};
