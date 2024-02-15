const si = require('systeminformation');
const fs = require('fs').promises;

async function getFileSystemInfo() {
  try {
    const data = await si.fsSize();
    const fileSystemInfo = data.map((fs) => {
      const availableGB = fs.available / 1073741824;
      const totalGB = fs.size / 1073741824;
      const usedGB = totalGB - availableGB;
      const usedPercentage = (usedGB / totalGB) * 100;
      return {
        mount: fs.mount,
        usedGB: usedGB.toFixed(1),
        totalGB: totalGB.toFixed(1),
        usedPercentage: usedPercentage.toFixed(1),
        availableGB: availableGB.toFixed(1)
      };
    });

    // Muuta tiedot JSON-muotoon
    const jsonData = JSON.stringify(fileSystemInfo, null, 2);

    // Tallenna tiedot tiedostoon
    await fs.writeFile('data/pc-memory-info.json', jsonData);

    console.log('jsonData tallennettu tiedostoon "pc-memory-info.json".');
  } catch (err) {
    console.error('Virhe tiedon tallentamisessa:', err);
  }
}

module.exports = getFileSystemInfo;