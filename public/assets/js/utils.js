/**
 * ==========================================
 * utils.js - 通用工具函數庫
 * ==========================================
 */

/**
 * 防抖函數
 * @param {Function} func - 需要防抖的函數
 * @param {number} wait - 等待時間（毫秒）
 * @returns {Function} - 防抖後的函數
 * @description 在連續觸發時，只執行最後一次調用
 */
const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

/**
 * HTML 轉義函數
 * @param {string} str - 需要轉義的字符串
 * @returns {string} - 轉義後的安全字符串
 * @description 防止 XSS 攻擊，將特殊字符轉換為 HTML 實體
 */
const escapeHTML = (str) => {
    if (!str && str !== 0) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
};

/**
 * 備用 Emoji 列表
 * @description 當圖示加載失敗時隨機顯示的 Emoji
 */
const FALLBACK_EMOJIS = ['🌍', '🌟', '🚀', '💡', '🔥', '✨', '🎈', '🎉', '🍀', '💎', '🧭', '🛸', '🔮', '🧩', '🎨'];

/**
 * 獲取隨機 Emoji
 * @returns {string} - 隨機 Emoji 字符
 */
const getRandomEmoji = () => FALLBACK_EMOJIS[Math.floor(Math.random() * FALLBACK_EMOJIS.length)];

// 導出工具函數（全域掛載）
window.utils = {
    debounce,
    escapeHTML,
    getRandomEmoji,
    FALLBACK_EMOJIS
};
