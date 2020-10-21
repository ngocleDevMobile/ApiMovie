const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

// const request = require('request');
// const cheerio = require("cheerio");
// const fs = require("fs");
const Movies = require('./modal/Movies');

const app = express();

//DB Config
const db = require('./config/key').mongoURI;

//Connect Mongo
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
        console.log('MongoDB Connected...');
    })
    .catch(err => console.log(err));

    //Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true

}));
// app.get('/', (req,res) => {
//   var url = 'https://www.yidio.com/movies/filter/free';
//   request(url,(error, response,html) => {
//     if(!error){
//       var $ = cheerio.load(html);
//       const tableContent = $(".cards a");
//       let data = [];

//       for (let i = 0; i < tableContent.length; i++) {
//         const dataNew = $(tableContent[i]);
//         const name = dataNew.find('.content > h3').text().trim();
//         let img = dataNew.find('.poster > img').attr('src');
//         data.push({
//             name,
//             img
//         });

//       }
//       res.json({
//         data: data
//       })
//     }
//   })
// })

// Add item food
app.post('/postMovies',(request, response) => {
  const movie = new Movies({
      name: request.body.name,
      realeaseYear: request.body.realeaseYear
  });
  movie.save((err) => {
      if (err){
          response.json({
              result: "failed",
              data: {},
              message: `Error is ${err}`
          });
      } else {
          response.json({
              result: "ok",
              data: {
                  name: request.body.name,
                  realeaseYear: request.body.realeaseYear,
                  message: "Insert new food successfully "
              }
          });
      }
  })

});

//update movie by id
app.put('/updateMovie/:_id', function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params._id;
	var data = {
		name : req.body.name,
		realeaseYear : req.body.realeaseYear,
	}
	Movies.findByIdAndUpdate(id, data, function(err, employee) {
	if (err) {
    res.json({
      result: "failed",
      data: {},
      message: `Error is ${err}`
  });
  } else {
    res.json({
      result: "ok",
      data: employee
  });
  };
	//res.send('Successfully! Employee updated - '+employee.name);
	});
});



//Get list food monggo
app.get('/getMovies',(request, response) => {
  Movies.find({}).limit(100).sort({name: 1}).select({
      _id:1,
      name: 1,
      realeaseYear: 1,

  }).exec((err, movie) => {
      if (err){
          response.json(err);
      } else {
          response.json(movie);
      }
  });
});

//Delete movie
app.delete('/deleteMovie/:_id', (request, response) => {
  let id = request.params._id;
  Movies.findOneAndRemove({_id: id}, (err) => {
      if (err){
          response.json({
              result: "failed",
              message: `Cannot delete a category. Error is : ${err}`
          });
      } else {
        response.json({
          result: "ok",
      });
      };
  })
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));