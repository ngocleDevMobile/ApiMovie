const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
 
const URL = `https://www.yidio.com/movies/filter/free`;
const baseUrl = 'https:';
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
  const tableContent = $(".cards a");
  let data = [];
  for (let i = 0; i < tableContent.length; i++) {
    const dataNew = $(tableContent[i]);
     //let title = dataNew.find('h1').text().trim();
    // let chaperData = [] ;
    // const movie = dataNew.find('a');
    // for(let j =0; j < dataNew.length; j++ ){
    //     const dataFilm = $(dataNew[j]);
    //     const srcImage = dataFilm.find('.poster').attr('src');
    //    // const nameMovie = dataFilm.find('.nm-collections-title-name').text().trim();
    //     const nameMovie = dataFilm.find('.content > h3').text().trim();
    //     chaperData.push({
    //         srcImage,
    //         nameMovie
    //     })
    // }
    //console.log(dataNew.length)
    const name = dataNew.find('.content > h3').text().trim();
    const img = baseUrl + dataNew.find('.poster > img').attr('src');
    data.push({
        name,
        img
    });
  }
   
  // Lưu dữ liệu về máy
   fs.writeFileSync('data.json', JSON.stringify(data))

})();


