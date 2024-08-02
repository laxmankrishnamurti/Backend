const os = require("os");

// console.log("OS :: ", os);
const CPU = os.cpus();
console.log("CPUs INFO :: ", CPU);

/*

CPUs INFO ::  [
    {
      model: 'AMD Ryzen 3 3200G with Radeon Vega Graphics',
      speed: 2936,
      times: { user: 1652640, nice: 220, sys: 913680, idle: 9625010, irq: 0 }
    },
    {
      model: 'AMD Ryzen 3 3200G with Radeon Vega Graphics',
      speed: 2032,
      times: { user: 1650330, nice: 1420, sys: 943450, idle: 9571560, irq: 0 }
    },
    {
      model: 'AMD Ryzen 3 3200G with Radeon Vega Graphics',
      speed: 1234,
      times: { user: 1566020, nice: 220, sys: 686800, idle: 10121160, irq: 0 }
    },
    {
      model: 'AMD Ryzen 3 3200G with Radeon Vega Graphics',
      speed: 2114,
      times: { user: 1650440, nice: 130, sys: 950630, idle: 9541220, irq: 0 }
    }
  ]

  */

console.log("Total number of CPUs :: ", CPU.length); //Output : 4
console.log("Operation system architecture detail :: ", os.arch());

//Operation system architecture detail ::  x64

console.log(
  "Available Parallelism (Like Threads) :: ",
  os.availableParallelism()
);

//Available Parallelism (Like Threads) ::  4

console.log("home directory path ::: ", os.homedir()); //Output : /home/laxmankrishnamurti
console.log("hostname :: ", os.hostname()); //Output :: laxmankrishnamurti-desktop
console.log("load average value :: ", os.loadavg()); //load average value ::  [ 0.71, 0.58, 0.68 ]

/**
 * About loadavg : Returns an array containing the 1, 5, and 15 minute load averages.
The load average is a measure of system activity calculated by the operating system and expressed as a fractional number.
The load average is a Unix-specific concept. On Windows, the return value is always [0, 0, 0].
 */

console.log("Machine type info :: ", os.machine()); //Machine type info ::  x86_64

const totalFreeSpaceInBytes = os.freemem();
const inGigaByte = totalFreeSpaceInBytes / (1024 * 1024 * 1024);
console.log("Free memory in gigaByte (RAM) :: ", inGigaByte); //Free memory in gigaByte (RAM) ::  12.683792114257812

console.log(os.getPriority()); //Output : 0 (To get task priority order with PID)

// console.log(os.networkInterfaces()); //To get network interface details
console.log(os.tmpdir()); //Return operation system default temporary file
console.log(os.release());
console.log(os.totalmem()); //To get free system memory
console.log(os.type()); //Output : Linux    (To get operation system type)
console.log(os.uptime()); // To get system uptime
console.log(os.userInfo());

/*
{
    uid: 1000,
    gid: 1000,
    username: 'laxmankrishnamurti',
    homedir: '/home/laxmankrishnamurti',
    shell: '/bin/bash'
  }
*/

console.log(os.version()); //#45~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Mon Jul 15 16:40:02 UTC 2
