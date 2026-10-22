/**
 * server.js - 本地测试服务器
 * 模拟 Cloudflare Pages Functions API
 * 提供 /api/config 端点并托管静态文件
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// ====== 默认数据（来自 defaultData.js） ======
const defaultData = {
  settings: { cardWidth: 90 },
  categories: [
    { id: "A01", name: "社交网站", icon: "💬", hidden: false },
    { id: "B01", name: "直播网站", icon: "💻", hidden: false },
    { id: "F01", name: "视频网站", icon: "🎬", hidden: false, _isVideo: true },
    { id: "C01", name: "新闻门户", icon: "📰", hidden: false },
    { id: "D01", name: "人工智能", icon: "🤖", hidden: false }
  ],
  items: [
    { id: "A001", catId: "A01", title: "知乎", url: "https://www.zhihu.com/", desc: "问答社区", icon: "https://favicon.im/www.zhihu.com", hidden: false },
    { id: "A002", catId: "A01", title: "豆瓣", url: "https://www.douban.com/", desc: "书影音社区", icon: "https://favicon.im/www.douban.com", hidden: false },
    { id: "A003", catId: "A01", title: "百度贴吧", url: "https://tieba.baidu.com/", desc: "兴趣社区", icon: "https://favicon.im/tieba.baidu.com", hidden: false },
    { id: "A004", catId: "A01", title: "新浪微博", url: "https://weibo.com/", desc: "微博客平台", icon: "https://favicon.im/weibo.com", hidden: false },
    { id: "A005", catId: "A01", title: "虎扑社区", url: "https://www.hupu.com/", desc: "体育社区", icon: "https://favicon.im/www.hupu.com", hidden: false },
    { id: "A006", catId: "A01", title: "微信网页版", url: "https://wx.qq.com/", desc: "微信网页版", icon: "https://favicon.im/wx.qq.com", hidden: false },
    { id: "A007", catId: "A01", title: "QQ空间", url: "https://qzone.qq.com/", desc: "QQ社交空间", icon: "https://favicon.im/qzone.qq.com", hidden: false },
    { id: "A008", catId: "A01", title: "煎蛋网", url: "https://jandan.net/", desc: "趣图段子", icon: "https://favicon.im/jandan.net", hidden: false },
    { id: "B001", catId: "B01", title: "腾讯视频", url: "https://v.qq.com/", desc: "视频平台", icon: "https://favicon.im/v.qq.com", hidden: false },
    { id: "B002", catId: "B01", title: "优酷网", url: "https://www.youku.com/", desc: "视频平台", icon: "https://favicon.im/www.youku.com", hidden: false },
    { id: "B003", catId: "B01", title: "芒果TV", url: "https://www.mgtv.com/", desc: "湖南卫视", icon: "https://favicon.im/www.mgtv.com", hidden: false },
    { id: "B004", catId: "B01", title: "搜狐视频", url: "https://tv.sohu.com/", desc: "视频平台", icon: "https://favicon.im/tv.sohu.com", hidden: false },
    { id: "B005", catId: "B01", title: "斗鱼TV", url: "https://www.douyu.com/", desc: "游戏直播", icon: "https://favicon.im/www.douyu.com", hidden: false },
    { id: "B006", catId: "B01", title: "哔哩哔哩", url: "https://www.bilibili.com/", desc: "弹幕视频", icon: "https://favicon.im/www.bilibili.com", hidden: false },
    { id: "B007", catId: "B01", title: "虎牙直播", url: "https://www.huya.com/", desc: "游戏直播", icon: "https://favicon.im/www.huya.com", hidden: false },
    { id: "B008", catId: "B01", title: "爱奇艺", url: "https://www.iqiyi.com/", desc: "视频平台", icon: "https://favicon.im/www.iqiyi.com", hidden: false },
    { id: "B009", catId: "B01", title: "ACfun", url: "https://www.acfun.cn/", desc: "弹幕视频", icon: "https://favicon.im/www.acfun.cn", hidden: false },
    { id: "F001", url: "https://www.youtube.com/watch?v=NZ-0-A_PJHI", title: "三立新闻", desc: "Youtube三立新闻", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F002", url: "https://www.youtube.com/watch?v=0HfK88DB41E", title: "三立新闻", desc: "Youtube三立新闻", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F004", url: "https://www.youtube.com/watch?v=m_dhMSvUCIc", title: "TVBS新闻", desc: "Youtube TVBS新闻", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F005", url: "https://www.youtube.com/watch?v=6IquAgfvYmc", title: "寰宇新闻", desc: "Youtube寰宇新闻", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F003", url: "https://www.youtube.com/watch?v=rqJz_D-6B_o", title: "哏传媒", desc: "Youtube哏传媒", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F006", url: "https://www.bilibili.com/video/BV1Cj9qByEaf", title: "楼下粉猪君", desc: "", icon: "https://favicon.im/live.bilibili.com", bgColor: "", catId: "F01", hidden: false },
    { id: "C001", catId: "C01", title: "新浪新闻", url: "https://news.sina.com.cn/", desc: "综合新闻", icon: "https://favicon.im/news.sina.com.cn", hidden: false },
    { id: "C002", catId: "C01", title: "腾讯新闻", url: "https://news.qq.com/", desc: "综合新闻", icon: "https://favicon.im/news.qq.com", hidden: false },
    { id: "C003", catId: "C01", title: "凤凰军事", url: "https://news.ifeng.com/mil/", desc: "军事新闻", icon: "https://favicon.im/news.ifeng.com", hidden: false },
    { id: "C004", catId: "C01", title: "网易新闻", url: "https://news.163.com/", desc: "综合新闻", icon: "https://favicon.im/news.163.com", hidden: false },
    { id: "C005", catId: "C01", title: "环球网", url: "https://www.huanqiu.com/", desc: "国际新闻", icon: "https://favicon.im/www.huanqiu.com", hidden: false },
    { id: "C006", catId: "C01", title: "参考消息", url: "http://www.cankaoxiaoxi.com/", desc: "参考消息", icon: "https://favicon.im/www.cankaoxiaoxi.com", hidden: false },
    { id: "C007", catId: "C01", title: "博海拾贝", url: "https://www.bohaishibei.com/", desc: "资讯聚合", icon: "https://favicon.im/bohaishibei.com", hidden: false },
    { id: "D001", catId: "D01", title: "ChatGPT", url: "https://chat.openai.com/", desc: "OpenAI助手", icon: "https://img.icons8.com/ios/100/FFFFFF/chatgpt.png", hidden: false },
    { id: "D002", catId: "D01", title: "Grok", url: "https://grok.com/", desc: "X平台AI", icon: "https://favicon.im/grok.com", hidden: false },
    { id: "D003", catId: "D01", title: "阿里千问", url: "https://chat.qwen.ai/", desc: "阿里AI助手", icon: "https://favicon.im/chat.qwen.ai", hidden: false },
    { id: "D004", catId: "D01", title: "DeepSeek", url: "https://chat.deepseek.com/", desc: "深度求索AI", icon: "https://favicon.im/chat.deepseek.com", hidden: false },
    { id: "D005", catId: "D01", title: "豆包", url: "https://www.doubao.com/chat/", desc: "字节AI助手", icon: "https://favicon.im/www.doubao.com", hidden: false },
    { id: "D006", catId: "D01", title: "Kimi", url: "https://www.kimi.com/", desc: "月之暗面AI", icon: "https://favicon.im/www.kimi.com", hidden: false },
    { id: "D007", catId: "D01", title: "元宝", url: "https://yuanbao.tencent.com/", desc: "腾讯AI助手", icon: "https://favicon.im/yuanbao.tencent.com", hidden: false },
    { id: "D008", catId: "D01", title: "即梦AI", url: "https://jimeng.jianying.com/", desc: "字节AI绘画", icon: "https://favicon.im/jimeng.jianying.com", hidden: false },
    { id: "D009", catId: "D01", title: "Gemini", url: "https://gemini.google.com/", desc: "谷歌AI助手", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg", hidden: false }
  ]
};

// ====== 存储状态（模拟 KV） ======
let storedData = JSON.parse(JSON.stringify(defaultData));
storedData.lastUpdated = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

// ====== MIME 类型映射 ======
const MIME_TYPES = {
  '.html': 'text/html;charset=UTF-8',
  '.css': 'text/css;charset=UTF-8',
  '.js': 'application/javascript;charset=UTF-8',
  '.json': 'application/json;charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
};

// ====== HTTP 服务器 ======
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);

  // ====== API 路由 ======
  if (pathname === '/api/config') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'GET') {
      // 返回数据 + bgUrl + isAdmin
      const bgUrl = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920';
      const auth = req.headers['authorization'] || url.searchParams.get('token') || '';
      // Token: admin 的 SHA-256 哈希 = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
      const isAdmin = auth === '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

      let responseData = JSON.parse(JSON.stringify(storedData));
      if (!isAdmin) {
        responseData.categories = responseData.categories.filter(c => !c.hidden);
        responseData.items = responseData.items.filter(i => !i.hidden);
      }
      responseData.bgUrl = bgUrl;
      responseData.isAdmin = isAdmin;

      res.writeHead(200);
      res.end(JSON.stringify(responseData));
      return;
    }

    if (req.method === 'POST') {
      const auth = req.headers['authorization'] || '';
      if (auth !== '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918') {
        res.writeHead(401);
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }

      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const newData = JSON.parse(body);
          newData.lastUpdated = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
          storedData = newData;
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    if (req.method === 'DELETE') {
      const auth = req.headers['authorization'] || '';
      if (auth !== '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918') {
        res.writeHead(401);
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }
      storedData = JSON.parse(JSON.stringify(defaultData));
      storedData.lastUpdated = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, message: "已重置为默认配置" }));
      return;
    }

    res.writeHead(405);
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  // ====== Bilibili 封面代理（解决 CORS） ======
  if (pathname === '/api/bilibili-cover') {
    const bvid = url.searchParams.get('bvid');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method !== 'GET') {
      res.writeHead(405);
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return;
    }

    if (!bvid || !/^BV[a-zA-Z0-9]+$/.test(bvid)) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid bvid parameter' }));
      return;
    }

    // 本地测试：无需缓存
    fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com/',
      }
    })
    .then(biliRes => biliRes.json())
    .then(biliData => {
      const coverUrl = biliData?.data?.pic || null;
      res.writeHead(200);
      res.end(JSON.stringify({ code: biliData.code, bvid, coverUrl }));
    })
    .catch(err => {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    });
    return;
  }

  // ====== 静态文件服务 ======
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 找不到文件时返回 index.html（SPA fallback）
      fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
        res.end(data2);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`  🚀 本地测试服务器已启动`);
  console.log(`  📍 http://localhost:${PORT}`);
  console.log(`  📁 静态文件目录: ${PUBLIC_DIR}`);
  console.log(`  🔑 管理员入口: 密码输入 "admin"`);
  console.log(`========================================\n`);
});
