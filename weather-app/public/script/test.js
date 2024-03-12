const dayjs = require('dayjs');

let dts = [
  1709629200,
  1709632800,
  1709636400,
  1709640000,
  1709643600,
  1709647200,
  1709650800,
  1709654400,
  1709658000,
  1709661600
]

dts.forEach(item => {
  convertAika(item)
})

function convertAika(dt) {
  const dtMilliseconds = dt * 1000;
  const date = dayjs(dtMilliseconds);
  const formattedDate = date.format('DD.MM.YYYY HH:mm:ss');
}


