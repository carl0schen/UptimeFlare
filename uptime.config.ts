const pageConfig = {
  // Title for your status page
  title: "MYNET's Status Page",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'mailto:reports@mynet.tw', label: 'Email Me', highlight: true },
  ],
  // [OPTIONAL] Group your monitors
  // If not specified, all monitors will be shown in a single list
  // If specified, monitors will be grouped and ordered, not-listed monitors will be invisble (but still monitored)
  group: {
    "🌐 Public": ['foo_monitor_1', 'foo_monitor_2', 'foo_monitor_4','foo_monitor_5'],
    "🔐 Private": ['foo_monitor_3', 'foo_monitor_6'],
  },
}

const workerConfig = {
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
      name: 'RACE.TW',
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
      name: 'GHOST.TW',
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
      name: '美好臺灣',
      method: 'GET',
      target: 'https://discover.tw',
      tooltip: 'Demo website made by Solo',
      statusPageLink: 'https://discover.tw',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
      },
    },
    {
      id: 'foo_monitor_6',
      name: 'Router Service',
      method: 'TCP_PING',
      target: 'r0uter.synology.me:80',
      checkProxy: 'worker://apac',
      timeout: 5000,
    },
  ],
  notification: {
    // [Optional] apprise API server URL
    // if not specified, no notification will be sent
    appriseApiServer: "https://apprisevercel-carl0schens-projects.vercel.app/notify",
    // [Optional] recipient URL for apprise, refer to https://github.com/caronc/apprise
    // if not specified, no notification will be sent
    recipientUrl: "tgram://7201891036:AAF0H6AZTk4SUVlHDIH3hI1PObb2syFglqQ/5296110669",
    // [Optional] timezone used in notification messages, default to "Etc/GMT"
    timeZone: "Asia/Taipei",
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

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig }
