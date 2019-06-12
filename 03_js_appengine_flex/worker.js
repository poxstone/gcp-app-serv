class Stressme {
  constructor(runner) {
    this.runner = runner;
  }

  async start(timesteep) {
    var self = this;
    return new Promise((resolve,reject) => {
      let count=0;
      while (count < timesteep*9750*100000) {
        count++;
      }
      resolve();
    });  
  };

  printCmd(command) {
    var exec = require('child_process').exec;
    exec(command, function(error, stdout, stderr) {
      console.log('CMD: ', stdout)
    });
  }
} 

module.exports = {Stressme};