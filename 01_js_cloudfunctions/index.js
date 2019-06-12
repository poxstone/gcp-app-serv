const { fork } = require('child_process');
var os = require("os");
var hostname = os.hostname();

exports.jsStress = async (req, res) => {

  const {Stressme} = require('./worker.js');
  
  //console.log(process.env);
  let timeSleep = req.query.timeSleep || req.body.timeSleep || '0';
  let date_send = req.query.date || req.body.date || '0';
  let date_init = new Date().toISOString();
  let streesInstance = new Stressme();
  
  streesInstance.printCmd('pwd /');
  streesInstance.printCmd('ls -lha /');
  streesInstance.start(timeSleep);

  let date_finish = new Date().toISOString();
  let textResponse = `
      hostName: ${hostname} </br>
      timeSleep: ${timeSleep} </br>
      date_send: ${date_send} </br>
      date_init: ${date_init} </br>
      date_finish: ${date_finish} </br>
      _______________________
  `;
  res.status(200).send(textResponse);
};

