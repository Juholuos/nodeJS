const getFileSystemInfo = require('./data')

getFileSystemInfo().then((fileSystemInfo) => {
  fileSystemInfo.forEach(item => {
    Object.entries(item).forEach(([key, value], index) => {
      console.log(`${index}: ${key}: ${value}`);
    });
  })
});
