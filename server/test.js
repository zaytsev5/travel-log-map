// const cron = require('node-cron');
// const express = require('express');
// const fs = require('fs'); 
// const app = express()
// // const shell = require('shelljs');
// cron.schedule('*/5 * * * * *', function() {
//     console.log('---------------------');
//     console.log('Running cron job every 5s');
//     setTimeout(()=>{
//       console.log("Timout is running")
//     },5000)
   
//   });

  
//   app.listen(3000);
// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
  
//  console.log(`Master ${process.pid} is running`);
  
//  // Fork workers.
//  for (let i = 0; i < numCPUs; i++) {
//   cluster.fork();
//  }
  
//  cluster.on('exit', (worker, code, signal) => {
//   console.log(`worker ${worker.process.pid} died`);
//  });
  
// } else {
  
//  // Workers can share any TCP connection
//  // In this case it is an HTTP server
//  http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('hello world\n');
//  }).listen(8000);
  
//  console.log(`Worker ${process.pid} started`);
 
// }
const nodemailer = require('nodemailer')

let {mailTemplate} = require('./mail')


let transporter = nodemailer.createTransport({
  host : 'smtp.gmail.com',
  port : 587,
  secure : false,
  auth : {
    user : 'shinminah357159@gmail.com',
    pass : '01649254108'
  },
  tls : {
    rejectUnauthorized : false
  }
})
let mailOptions = {
  from: '[BusExpress.com] <shinminah357159@email.com>', // sender addresponses
  to: 'n17dccn041@student.ptithcm.edu.vn', // list of receivers
  subject: 'BusExpress', // Subject line
  text: 'Hello world?', // plain text body
  html: mailTemplate // html body
};
console.log('got this far');
// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error); ;
     // return response.send({status:false})
  }
  console.log('Message sent: %s', info.messageId);   
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  console.log('Sent!')
  // response.send({status:true})
});
