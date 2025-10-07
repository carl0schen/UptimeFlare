import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: "Mynet's Status Page",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'mailto:reports@mynet.tw', label: 'Email Me', highlight: true },
  ],
  // [OPTIONAL] Group your monitors
  // If not specified, all monitors will be shown in a single list
  // If specified, monitors will be grouped and ordered, not-listed monitors will be invisble (but still monitored)
  group: {
    '🌐 Public': ['foo_monitor_1', 'foo_monitor_2', 'foo_monitor_4', 'foo_monitor_5'],
    '🔐 Private': ['foo_monitor_3'],
  },
  // [OPTIONAL] Set the path to your favicon, default to '/favicon.ico' if not specified
  favicon: '/favicon.ico',
  // [OPTIONAL] Maintenance related settings
  maintenances: {
    // [OPTIONAL] The color of upcoming maintenance alerts, default to 'gray'
    // Active alerts will always use the color specified in the MaintenanceConfig
    upcomingColor: 'gray',
  },
}

const workerConfig: WorkerConfig = {
  // Write KV at most every 3 minutes unless the status changed.
  kvWriteCooldownMinutes: 3,
  // Define all your monitors here
  monitors: [
    {
      id: 'foo_monitor_1',
      name: 'Carlos Life Book',
      method: 'GET',
      target: 'https://carlos.mynet.tw',
      tooltip: 'Blog',
      statusPageLink: 'https://carlos.mynet.tw',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
      },
    },
    {  
      id: 'foo_monitor_2',
      name: 'Race.tw',
      method: 'GET',
      target: 'https://race.tw',
      tooltip: 'Solution for self-hosted serverless',
      statusPageLink: 'https://race.tw',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
      },
    },
    {
      id: 'foo_monitor_3',
      name: 'Miniflux RSS Reader',
      method: 'GET',
      target: 'https://reader.race.tw',
      tooltip: 'Self-hosting with Docker',
      checkProxy: 'worker://apac',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
      },
    },
    {  
      id: 'foo_monitor_4',
      name: 'Ghost.tw',
      method: 'GET',
      target: 'https://ghost.tw',
      tooltip: 'x2.email',
      statusPageLink: 'https://ghost.tw',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
      },
    },
    {  
      id: 'foo_monitor_5',
      name: '台股盤後 - 法人買賣超整理',
      method: 'GET',
      target: 'https://stock.may.tw',
      tooltip: '利用AI彙整台股盤後資訊，快速掌握市場動向。',
      statusPageLink: 'https://stock.may.tw',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
      },
    },
  ],
  notification: {
    // [Optional] apprise API server URL
    // if not specified, no notification will be sent
    appriseApiServer: 'https://apprisevercel-carl0schens-projects.vercel.app/notify',
    // [Optional] recipient URL for apprise, refer to https://github.com/caronc/apprise
    // if not specified, no notification will be sent
    recipientUrl: 'tgram://7201891036:AAF0H6AZTk4SUVlHDIH3hI1PObb2syFglqQ/5296110669',
    // [Optional] timezone used in notification messages, default to "Etc/GMT"
    timeZone: 'Asia/Taipei',
    // [Optional] grace period in minutes before sending a notification
    // notification will be sent only if the monitor is down for N continuous checks after the initial failure
    // if not specified, notification will be sent immediately
    gracePeriod: 5,
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here

      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any Typescript code here
    },
  },
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature
// const maintenances: MaintenanceConfig[] = []
const maintenances: MaintenanceConfig[] = [
  {
    // [Optional] Monitor IDs to be affected by this maintenance
    monitors: ['foo_monitor', 'bar_monitor'],
    // [Optional] default to "Scheduled Maintenance" if not specified
    title: 'Test Maintenance',
    // Description of the maintenance, will be shown at status page
    body: 'This is a test maintenance, server software upgrade',
    // Start time of the maintenance, in UNIX timestamp or ISO 8601 format
    start: '2025-04-27T00:00:00+08:00',
    // [Optional] end time of the maintenance, in UNIX timestamp or ISO 8601 format
    // if not specified, the maintenance will be considered as on-going
    end: '2025-04-30T00:00:00+08:00',
    // [Optional] color of the maintenance alert at status page, default to "yellow"
    color: 'blue',
  },
  // As this config file is a TypeScript file, you can even use IIFE to generate scheduled maintenances
  // The following example shows a scheduled maintenance from 2 AM to 4 AM on the 15th of every month (UTC+8)
  // This COULD BE DANGEROUS, as generating too many maintenance entries can lead to performance problems
  // Undeterministic outputs may also lead to bugs or unexpected behavior
  // If you don't know how to DEBUG, use this approach WITH CAUTION
  ...(function (){
    const schedules = [];
    const today = new Date();

    for (let i = -1; i <= 1; i++) {
      // JavaScript's Date object will automatically handle year rollovers
      const date = new Date(today.getFullYear(), today.getMonth() + i, 15); 
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');

      schedules.push({
        title: `${year}/${parseInt(month)} - Test scheduled maintenance`,
        monitors: ['foo_monitor'],
        body: 'Monthly scheduled maintenance',
        start: `${year}-${month}-15T02:00:00.000+08:00`,
        end: `${year}-${month}-15T04:00:00.000+08:00`,
      });
    }
    return schedules;
  })()
]

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig, maintenances }
