const si = require("systeminformation");

async function getSystemInfo() {
  try {
    const mem = await si.mem();
    const usedMemMB = (mem.used / 1024 / 1024 / 1024).toFixed(2);
    const totalMemMB = (mem.total / 1024 / 1024 / 1024).toFixed(2);
    
    const disk = await si.fsSize();
    const usedDiskMB = (disk[0].used / 1024 / 1024 / 1024).toFixed(2);
    const totalDiskMB = (disk[0].size / 1024 / 1024 / 1024).toFixed(2);

    const info = `*System Information:*
  - *CPU:* ${await si.cpu().then((cpu) => cpu.manufacturer + ' ' + cpu.brand)}
  - *Cores:* ${await si.cpu().then((cpu) => cpu.cores)}
  - *Speed:* ${await si.cpu().then((cpu) => cpu.speed)} GHz
  - *Memory Usage:* ${usedMemMB} GB / ${totalMemMB} GB
  - *OS:* ${await si.osInfo().then((os) => os.distro)}
  - *Uptime:* ${(si.time().uptime / 3600).toFixed(2)} hours
  - *Load Average:* ${await si.currentLoad().then((load) => load.currentLoad.toFixed(2))}%
  - *Disk Usage:* ${usedDiskMB} GB / ${totalDiskMB} GB
    `;

    return info;
  } catch (error) {
    return `Error retrieving system information: ${error.message}`;
  }
}

module.exports = { getSystemInfo };