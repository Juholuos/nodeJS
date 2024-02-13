const si = require('systeminformation');

async function getSystemSpecs() {
    try {
        const cpuData = await si.cpu();
        console.log('CPU Information:');
        console.log(cpuData);

        const memoryData = await si.mem();
        console.log('\nMemory Information:');
        console.log(memoryData);

        const diskData = await si.diskLayout();
        console.log('\nDisk Information:');
        console.log(diskData);

        const networkData = await si.networkInterfaces();
        console.log('\nNetwork Information:');
        console.log(networkData);

        // You can fetch more information as needed
    } catch (error) {
        console.error('Error fetching system information:', error);
    }
}

getSystemSpecs();