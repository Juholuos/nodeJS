const path = require('path');
const fs = require('fs');
const si = require('systeminformation')

si.fsSize().then(data => {
  data.forEach(fs => {
    const availableGB = fs.available / 1073741824;
    const totalGB = fs.size / 1073741824;
    const usedGB =  totalGB - availableGB;
    const usedPercentage = (usedGB / totalGB) * 100;
    // console.log(`${fs.mount} ${availableGB.toFixed(2)} GB available from ${sizeGB.toFixed(2)} `);
    console.log(`${fs.mount} ${usedGB.toFixed(1)} GB / ${totalGB.toFixed(1)} GB used (${usedPercentage.toFixed(1)}%) || ${availableGB.toFixed(1)} GB available`);
  });
}).catch(err => {
  console.error(err);
});