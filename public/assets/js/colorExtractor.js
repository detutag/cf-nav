/**
 * colorExtractor.js - 從圖示中提取主色調
 * 用於懸停光暈效果的顏色自適應
 */

(function () {
  'use strict';

  // 顏色快取，避免重複提取
  const colorCache = new Map();

  // 預設顏色
  const DEFAULT_COLOR = { hex: '#3b82f6', rgb: '59, 130, 246' };

  /**
   * RGB 轉 HEX
   */
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(function (x) {
      var hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  /**
   * 從圖片 URL 提取主色調
   * @param {string} imgUrl - 圖示圖片 URL
   * @returns {Promise<{hex: string, rgb: string}|null>}
   */
  function extractColorFromImage(imgUrl) {
    if (colorCache.has(imgUrl)) {
      return Promise.resolve(colorCache.get(imgUrl));
    }

    return new Promise(function (resolve) {
      var img = new Image();
      // 不使用 crossOrigin 避免 CORS 錯誤（favicon 服務通常不支援 CORS）
      // 如果 canvas 被跨域污染，會在 getImageData 時靜默降級
      var timeoutId = setTimeout(function () {
        img.src = '';
        resolve(null);
      }, 8000);

      img.onload = function () {
        clearTimeout(timeoutId);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(null);
          return;
        }

        // 縮小圖片以提高性能（最大 50px）
        var scale = 50 / Math.max(img.width, img.height, 1);
        canvas.width = Math.max(1, Math.floor(img.width * scale));
        canvas.height = Math.max(1, Math.floor(img.height * scale));

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        var imageData;
        try {
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } catch (e) {
          // CORS 限制導致 canvas 被污染，靜默降級
          resolve(null);
          return;
        }
        var data = imageData.data;

        // 分析顏色分佈（16px 量化粒度 + 鮮豔色加權）
        var colorBuckets = {};
        var maxCount = 0;
        var dominantKey = '';

        for (var i = 0; i < data.length; i += 4) {
          var r = data[i];
          var g = data[i + 1];
          var b = data[i + 2];
          var a = data[i + 3];

          // 跳過透明像素
          if (a < 128) continue;

          // 跳過近白/近灰像素（通常是背景）
          var brightness = (r + g + b) / 3;
          var maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
          if (brightness > 235 || (brightness > 200 && maxDiff < 20)) continue;

          // 顏色量化（16px 粒度）
          var qR = Math.round(r / 16) * 16;
          var qG = Math.round(g / 16) * 16;
          var qB = Math.round(b / 16) * 16;
          var key = qR + ',' + qG + ',' + qB;

          // 鮮豔色加權
          var weight = maxDiff > 60 ? 1.5 : 1;
          colorBuckets[key] = (colorBuckets[key] || 0) + weight;
          if (colorBuckets[key] > maxCount) {
            maxCount = colorBuckets[key];
            dominantKey = key;
          }
        }

        var result;
        if (dominantKey) {
          var parts = dominantKey.split(',').map(Number);
          result = {
            hex: rgbToHex(parts[0], parts[1], parts[2]),
            rgb: parts[0] + ', ' + parts[1] + ', ' + parts[2]
          };
        } else {
          // 無有效色：取圖片中央像素的顏色
          var cx = Math.floor(canvas.width / 2);
          var cy = Math.floor(canvas.height / 2);
          var centerIdx = (cy * canvas.width + cx) * 4;
          if (centerIdx >= 0 && centerIdx + 2 < data.length) {
            result = {
              hex: rgbToHex(data[centerIdx], data[centerIdx + 1], data[centerIdx + 2]),
              rgb: data[centerIdx] + ', ' + data[centerIdx + 1] + ', ' + data[centerIdx + 2]
            };
          } else {
            resolve(null);
            return;
          }
        }

        colorCache.set(imgUrl, result);
        resolve(result);
      };

      img.onerror = function () {
        clearTimeout(timeoutId);
        resolve(null);
      };

      img.src = imgUrl;
    });
  }

  /**
   * 從文本生成顏色（用於 Emoji 或無圖示時）
   * DJB2 哈希變體 → HSL → RGB
   * @param {string} text - 標題或 emoji 字符
   * @returns {{hex: string, rgb: string}}
   */
  function generateColorFromText(text) {
    var hash = 0;
    for (var i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }

    var hue = ((hash % 360) + 360) % 360; // 保證正數
    var saturation = 65 + (Math.abs(hash) % 15); // 65-80%
    var lightness = 45 + (Math.abs(hash >> 8) % 10); // 45-55%

    // HSL → RGB
    var s = saturation / 100;
    var l = lightness / 100;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    var m = l - c / 2;

    var r1, g1, b1;
    if (hue < 60) { r1 = c; g1 = x; b1 = 0; }
    else if (hue < 120) { r1 = x; g1 = c; b1 = 0; }
    else if (hue < 180) { r1 = 0; g1 = c; b1 = x; }
    else if (hue < 240) { r1 = 0; g1 = x; b1 = c; }
    else if (hue < 300) { r1 = x; g1 = 0; b1 = c; }
    else { r1 = c; g1 = 0; b1 = x; }

    var r = Math.round((r1 + m) * 255);
    var g = Math.round((g1 + m) * 255);
    var b = Math.round((b1 + m) * 255);

    return {
      hex: rgbToHex(r, g, b),
      rgb: r + ', ' + g + ', ' + b
    };
  }

  // 掛載到全域
  window.colorExtractor = {
    extractColorFromImage: extractColorFromImage,
    generateColorFromText: generateColorFromText
  };
})();
