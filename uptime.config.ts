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
      checkProxyFallback: true,
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
   webhook: {
            url: 'https://apprisevercel-carl0schens-projects.vercel.app/notify',
            payloadType: 'json',
            payload: {
                urls: 'tgram://7201891036:AAF0H6AZTk4SUVlHDIH3hI1PObb2syFglqQ/5296110669/', 
                body: '$MSG'
            },
        },
        timeZone: 'Asia/Taipei', // 時區
        gracePeriod: 5, // 寬限期 (分鐘)
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
const maintenances: MaintenanceConfig[] = []

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig, maintenances }
