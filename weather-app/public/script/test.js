const dayjs = require('dayjs');

let dts = [
  1709632800,
  1709719200,
  1709805600,
  1709892000,
  1709978400,
  1710064800,
  1710151200,
]

dts.forEach(item => {
  convertAika(item)
})

function convertAika(dt) {
  const dtMilliseconds = dt * 1000;
  const date = dayjs(dtMilliseconds);
  const formattedDate = date.format('DD.MM.YYYY HH:mm:ss');
  console.log(formattedDate);
}


