//file: index.js
const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const { normalize } = require("path");
 
const URL = `https://www.netflix.com/vn-en/title/80204465`;
 
const options = {
  uri: URL,
  transform: function (body) {
    //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
    return cheerio.load(body);
  },
};
 
(async function crawler() {
  try {
    // Lấy dữ liệu từ trang crawl đã được parseDOM
    var $ = await rp(options);
  } catch (error) {
    return error;
  }
 
  /* Phân tích các table và sau đó lấy các posts.
     Mỗi table là một chương 
  */
  //const tableContent = $(".nmtitle-section section-hero");
  let data = [];
  const nameMovie = $('.title-title').text().trim();
  const year = $('.title-info-metadata-wrapper > .item-year').text().trim();
  const age = $('.maturity-number').text().trim();
  const time = $('.duration').text().trim();
  const description = $('.title-info-metadata-item item-genre').text().trim();
  const info = $('.title-info-synopsis').text().trim();
  const starring = $('.title-data-info-item-list').text().trim();
  const img = $('picture > source').attr('srcset');

data.push({
    nameMovie,
    year,
    age,
    time,
    description,
    info,
    starring,
    img
})

   
  // Lưu dữ liệu về máy
  fs.writeFileSync('datas.json', JSON.stringify(data))
})();
