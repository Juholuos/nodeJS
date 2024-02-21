window.onload = async function() {
  console.log('Toimii!');
  await fetch('http://localhost:5000/pc-memory-info.json')
    .then(response => response.json())
    .then(data => {
      // const loading = document.querySelector('.loading');
      // loading.style.display = 'none';
      data.forEach(disk => {
        console.log(disk.mount);
        if (disk.mount == 'C:') {
          const cContainer = document.querySelector('.C-container');
          const cInfo = document.querySelector('.C-info')
          cInfo.querySelector('.used').innerHTML = disk.usedGB;
          cInfo.querySelector('.total').innerHTML = disk.totalGB;
          cInfo.querySelector('.available').innerHTML = disk.availableGB;

          const barEl = cContainer.querySelector('.bar');
          barEl.style.width = `${disk.usedPercentage}%`;
          barEl.innerText = `(${disk.usedPercentage}%)`

          manageBars(barEl);
        } else if (disk.mount == 'E:') {
          const eContainer = document.querySelector('.E-container');
          const eInfo = document.querySelector('.E-info')
          eInfo.querySelector('.used').innerHTML = disk.usedGB;
          eInfo.querySelector('.total').innerHTML = disk.totalGB;
          eInfo.querySelector('.available').innerHTML = disk.availableGB;

          const barEl = eContainer.querySelector('.bar');
          barEl.style.width = `${disk.usedPercentage}%`;
          barEl.innerText = `(${disk.usedPercentage}%)`

          manageBars(barEl);
        }
      })
    })
}