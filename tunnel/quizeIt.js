// No longer needed: process.env.TUNNELMOLE_QUIET_MODE = "1";
// Replaced 'tunnelmole' with 'cloudflaredjs'
import { createTunnel } from './cloudflaredjs.js';
import minimist from 'minimist';

// --- Default Port Configuration ---
let quiz_port = 5173;
let busser_port = 5500;
let backend_port = 4000;

const argv = minimist(process.argv.slice(2), {
  alias: { h: 'help' },
  boolean: ['all3', 'help'],
  string: ['quiz', 'busser', 'backend'],
  default: {},
});

// --- Show Help ---
if (argv.help) {
  console.log(`
Usage: cli [options]

Options:
  --quiz [port]      Start quiz service on optional port
  --busser [port]    Start busser service on optional port
  --backend [port]   Start backend service on optional port
  --all3             Start all three services with default ports. You cant combile this argv with others
  --help             Show this help message. You cant combile this argv with others
`);
  process.exit(0);
}

// --- Argument Parsing ---
if (argv.all3) {
    if (argv.quiz || argv.busser || argv.backend || argv.help) {
        console.log("Invalid args. --all3 cannot be combined with other flags. Refer --help");
        process.exit(1);
    }
    
    console.log('--- Starting all three services ---');
    console.log('Quiz:', quiz_port);
    console.log('Busser:', busser_port);
    console.log('Backend:', backend_port);
    
    argv.quiz = true;
    argv.busser = true;
    argv.backend = true;
}

/**
 * A helper function to define and start a persistent tunnel.
 * This uses the cloudflaredjs auto-update feature to keep
 * the KV store in sync with the live tunnel URL.
 * @param {string} serviceName - The key for the KV store (e.g., "quiz")
 * @param {number} port - The local port to expose.
 */
async function startPersistentTunnel(serviceName, port) {
    // Each tunnel needs its own manager instance
    const { startCloudflared } = createTunnel();

    const tunnelOptions = {
        port: port,
        verbose: true, // Set to false to reduce console noise
        
        // --- This is the key feature ---
        autoFaultDetectionAndUpdate: false,
        
        // /**
        //  * This callback is triggered on the initial start AND
        //  * every time the tunnel restarts with a new URL.
        //  */
        // successCallback: (url) => {
        //     console.log(`[${serviceName}] URL is active: ${url}`);
        //     console.log(`[${serviceName}] Updating KV store...`);
        //     postValue(serviceName, url);
        // },

        // /**
        //  * This callback is triggered if the tunnel fails
        //  * and cannot be restarted after 10 retries (by default).
        //  */
        // faultCallback: () => {
        //     console.error(`[${serviceName}] CRITICAL: Tunnel on port ${port} has failed permanently.`);
        //     // You could add an alert here (e.g., post to a Slack webhook)
        // }
    };

    console.log(`[${serviceName}] Initializing tunnel on http://localhost:${port}...`);

    // Start the tunnel. This runs in the background.
    const promise = startCloudflared(tunnelOptions)
    const url = await promise;
    postValue(serviceName, url);
}

// --- Service Start Logic ---

if (argv.quiz) {
    // Check if a port was provided (e.g., --quiz=8080)
    if (argv.quiz !== true && Number(argv.quiz)) {
        quiz_port = Number(argv.quiz);
    }
    startPersistentTunnel("quiz", quiz_port);
}

if (argv.busser) {
    if (argv.busser !== true && Number(argv.busser)) {
        busser_port = Number(argv.busser);
    }
    startPersistentTunnel("busser", busser_port);
}

if (argv.backend) {
    if (argv.backend !== true && Number(argv.backend)) {
        backend_port = Number(argv.backend);
    }
    startPersistentTunnel("backend", backend_port);
}

// --- KV Store "postValue" Function ---
// (This is unchanged)

/**
 * POSTs a key-value pair to the Cloudflare Worker.
 * @param {string} key - The key to store (e.g., "quiz")
 * @param {string} value - The value to store (the tunnel URL)
 */
async function postValue(key, value) {
  const BASE_URL = "https://techx.connectwithsanthoshmk.workers.dev";
  const url = `${BASE_URL}?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`;
  
  try {
    const response = await fetch(url, { method: "POST" });
    const text = await response.text();
    console.log(`[${key}] POST Response:`, text);
  } catch (e) {
    console.error(`[${key}] Failed to post value: ${e.message}`);
  }
}
