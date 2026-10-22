/**
 * ==========================================
 * defaultData.js - 預設初始化資料
 * 包含分類和網站條目的預設配置
 * ==========================================
 */

export const defaultData = {
  settings: { },
  categories: [
    { id: "A01", name: "社交網站", icon: "💬", hidden: false },
    { id: "B01", name: "直播網站", icon: "💻", hidden: false },
    { id: "F01", name: "視頻網站", icon: "🎬", hidden: false, _isVideo: true },
    { id: "C01", name: "新聞門戶", icon: "📰", hidden: false },
    { id: "D01", name: "人工智慧", icon: "🤖", hidden: false }
  ],
  items: [
    { id: "A001", catId: "A01", title: "知乎", url: "https://www.zhihu.com/", desc: "問答社區", icon: "https://favicon.im/www.zhihu.com", hidden: false },
    { id: "A002", catId: "A01", title: "豆瓣", url: "https://www.douban.com/", desc: "書影音社區", icon: "https://favicon.im/www.douban.com", hidden: false },
    { id: "A003", catId: "A01", title: "百度貼吧", url: "https://tieba.baidu.com/", desc: "興趣社區", icon: "https://favicon.im/tieba.baidu.com", hidden: false },
    { id: "A004", catId: "A01", title: "新浪微博", url: "https://weibo.com/", desc: "微博客平台", icon: "https://favicon.im/weibo.com", hidden: false },
    { id: "A005", catId: "A01", title: "虎撲社區", url: "https://www.hupu.com/", desc: "體育社區", icon: "https://favicon.im/www.hupu.com", hidden: false },
    { id: "A006", catId: "A01", title: "微信網頁版", url: "https://wx.qq.com/", desc: "微信網頁版", icon: "https://favicon.im/wx.qq.com", hidden: false },
    { id: "A007", catId: "A01", title: "QQ空間", url: "https://qzone.qq.com/", desc: "QQ社交空間", icon: "https://favicon.im/qzone.qq.com", hidden: false },
    { id: "A008", catId: "A01", title: "煎蛋網", url: "https://jandan.net/", desc: "趣圖段子", icon: "https://favicon.im/jandan.net", hidden: false },
    { id: "B001", catId: "B01", title: "騰訊視頻", url: "https://v.qq.com/", desc: "視頻平台", icon: "https://favicon.im/v.qq.com", hidden: false },
    { id: "B002", catId: "B01", title: "優酷網", url: "https://www.youku.com/", desc: "視頻平台", icon: "https://favicon.im/www.youku.com", hidden: false },
    { id: "B003", catId: "B01", title: "芒果TV", url: "https://www.mgtv.com/", desc: "湖南衛視", icon: "https://favicon.im/www.mgtv.com", hidden: false },
    { id: "B004", catId: "B01", title: "搜狐視頻", url: "https://tv.sohu.com/", desc: "視頻平台", icon: "https://favicon.im/tv.sohu.com", hidden: false },
    { id: "B005", catId: "B01", title: "鬥魚TV", url: "https://www.douyu.com/", desc: "遊戲直播", icon: "https://favicon.im/www.douyu.com", hidden: false },
    { id: "B006", catId: "B01", title: "哔哩哔哩", url: "https://www.bilibili.com/", desc: "彈幕視頻", icon: "https://favicon.im/www.bilibili.com", hidden: false },
    { id: "B007", catId: "B01", title: "虎牙直播", url: "https://www.huya.com/", desc: "遊戲直播", icon: "https://favicon.im/www.huya.com", hidden: false },
    { id: "B008", catId: "B01", title: "愛奇藝", url: "https://www.iqiyi.com/", desc: "視頻平台", icon: "https://favicon.im/www.iqiyi.com", hidden: false },
    { id: "B009", catId: "B01", title: "ACfun", url: "https://www.acfun.cn/", desc: "彈幕視頻", icon: "https://favicon.im/www.acfun.cn", hidden: false },
    { id: "F001", url: "https://www.youtube.com/watch?v=NZ-0-A_PJHI", title: "三立新聞", desc: "Youtube三立新聞", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F002", url: "https://www.youtube.com/watch?v=0HfK88DB41E", title: "三立新聞", desc: "Youtube三立新聞", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F004", url: "https://www.youtube.com/watch?v=m_dhMSvUCIc", title: "TVBS新聞", desc: "Youtube TVBS新聞", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F005", url: "https://www.youtube.com/watch?v=6IquAgfvYmc", title: "寰宇新聞", desc: "Youtube寰宇新聞", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F003", url: "https://www.youtube.com/watch?v=rqJz_D-6B_o", title: "哏傳媒", desc: "Youtube哏傳媒", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F006", url: "https://www.bilibili.com/video/BV1Cj9qByEaf", title: "樓下粉豬君", desc: "", icon: "https://favicon.im/live.bilibili.com", bgColor: "", catId: "F01", hidden: false },
    { id: "C001", catId: "C01", title: "新浪新聞", url: "https://news.sina.com.cn/", desc: "綜合新聞", icon: "https://favicon.im/news.sina.com.cn", hidden: false },
    { id: "C002", catId: "C01", title: "騰訊新聞", url: "https://news.qq.com/", desc: "綜合新聞", icon: "https://favicon.im/news.qq.com", hidden: false },
    { id: "C003", catId: "C01", title: "鳳凰軍事", url: "https://news.ifeng.com/mil/", desc: "軍事新聞", icon: "https://favicon.im/news.ifeng.com", hidden: false },
    { id: "C004", catId: "C01", title: "網易新聞", url: "https://news.163.com/", desc: "綜合新聞", icon: "https://favicon.im/news.163.com", hidden: false },
    { id: "C005", catId: "C01", title: "環球網", url: "https://www.huanqiu.com/", desc: "國際新聞", icon: "https://favicon.im/www.huanqiu.com", hidden: false },
    { id: "C006", catId: "C01", title: "參考消息", url: "http://www.cankaoxiaoxi.com/", desc: "參考消息", icon: "https://favicon.im/www.cankaoxiaoxi.com", hidden: false },
    { id: "C007", catId: "C01", title: "博海拾貝", url: "https://www.bohaishibei.com/", desc: "資訊聚合", icon: "https://favicon.im/bohaishibei.com", hidden: false },
    { id: "D001", catId: "D01", title: "ChatGPT", url: "https://chat.openai.com/", desc: "OpenAI助手", icon: "https://img.icons8.com/ios/100/FFFFFF/chatgpt.png", hidden: false },
    { id: "D002", catId: "D01", title: "Grok", url: "https://grok.com/", desc: "X平台AI", icon: "https://favicon.im/grok.com", hidden: false },
    { id: "D003", catId: "D01", title: "阿里千問", url: "https://chat.qwen.ai/", desc: "阿里AI助手", icon: "https://favicon.im/chat.qwen.ai", hidden: false },
    { id: "D004", catId: "D01", title: "DeepSeek", url: "https://chat.deepseek.com/", desc: "深度求索AI", icon: "https://favicon.im/chat.deepseek.com", hidden: false },
    { id: "D005", catId: "D01", title: "豆包", url: "https://www.doubao.com/chat/", desc: "字節AI助手", icon: "https://favicon.im/www.doubao.com", hidden: false },
    { id: "D006", catId: "D01", title: "Kimi", url: "https://www.kimi.com/", desc: "月之暗面AI", icon: "https://favicon.im/www.kimi.com", hidden: false },
    { id: "D007", catId: "D01", title: "元寶", url: "https://yuanbao.tencent.com/", desc: "騰訊AI助手", icon: "https://favicon.im/yuanbao.tencent.com", hidden: false },
    { id: "D008", catId: "D01", title: "即夢AI", url: "https://jimeng.jianying.com/", desc: "字節AI繪畫", icon: "https://favicon.im/jimeng.jianying.com", hidden: false },
    { id: "D009", catId: "D01", title: "Gemini", url: "https://gemini.google.com/", desc: "谷歌AI助手", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg", hidden: false }
  ]
};
