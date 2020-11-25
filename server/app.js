// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json())
// app.use(require('cors')())


// let logEntries = [
//   {
//       "id": 1,
//       "latitude": 10.7781128,
//       "longitude": 106.6532558,
//       "title": "Bach Khoa University",
//       "comments": "This is the best university of Vietnam",
//       "visitDate": "2020-06-19",
//       "author": "nguyenvanhai",
//       "image": "https://wikitintuc.com/wp-content/uploads/2018/10/bachkhoa500-1540897389-2535-1540897584_500x300.jpg"
//   },
//   {
//       "id": 2,
//       "latitude": 10.8478,
//       "longitude": 106.7839,
//       "title": "Post and Telecommunications Institute of Technology",
//       "comments": "This is the best university of Vietnam",
//       "visitDate": "2020-06-19",
//       "author": "trandinhtam",
//       "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTf4jwGXCj45_mlRIyhJxtmGrBko2mMd8IDhQ&usqp=CAU"
//   },
//   {
//       "id": 3,
//       "latitude": 10.7733,
//       "longitude": 106.6584,
//       "title": "Bach Khoa University",
//       "comments": "This is the best university of Vietnam",
//       "visitDate": "2020-06-20",
//       "author": "nguyenvanhai",
//       "image": "https://wikitintuc.com/wp-content/uploads/2018/10/bachkhoa500-1540897389-2535-1540897584_500x300.jpg"
//   },
//   {
//       "id": 4,
//       "latitude": 10.78,
//       "longitude": 106.69,
//       "title": "Bach Khoa University",
//       "comments": "This is the best university of Vietnam",
//       "visitDate": "2020-06-20",
//       "author": "nguyenvanhai",
//       "image": "https://wikitintuc.com/wp-content/uploads/2018/10/bachkhoa500-1540897389-2535-1540897584_500x300.jpg"
//   },
//   {
//       "id": 5,
//       "latitude": 10.82,
//       "longitude": 106.65,
//       "title": "Bach Khoa University",
//       "comments": "This is the best university of Vietnam",
//       "visitDate": "2020-06-20",
//       "author": "nguyenvanhai",
//       "image": "https://wikitintuc.com/wp-content/uploads/2018/10/bachkhoa500-1540897389-2535-1540897584_500x300.jpg"
//   }
// ]
// app.get('/api/logs', (req, res) => {
     
//     res.json(logEntries)
// })

// app.post('/api/logs',(req, res) =>{
//     const log = req.body
//     logEntries.push(log);
//     res.json(logEntries)


// })

// app.listen(1337,()=>{
//     console.log('Server started on port 1337');
// })
const { Builder, By, Key, util} = require('selenium-webdriver')
async function test(){
    let driver = await new Builder().forBrowser('chrome').build()
    await driver.get('http://google.com')
    await driver.findElement(By.name('q')).sendKeys('google', Key.RETURN)

}
test();