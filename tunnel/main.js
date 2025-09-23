process.env.TUNNELMOLE_QUIET_MODE = "1";
import { tunnelmole } from 'tunnelmole';
import minimist from 'minimist';

const quiz_port = 5173;
const busser_port = 5500;
const backend_port = 4000;

const argv = minimist(process.argv.slice(2), {
  alias: { h: 'help' },
  boolean: ['all3', 'help'],
  string: ['quiz', 'busser', 'backend'],
  default: {},
});

// Show help
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

if (argv.all3) {
    if (argv.quiz || argv.busser || argv.backend || argv.help) console.log("Invalid args refer --help")
    // If no args provided, just show current argv
    if (process.argv.length <= 2) {
        console.log('No arguments provided. Current argv:', argv);
    } else {
        console.log('Ports configuration:');
        console.log('Quiz:', quiz_port);
        console.log('Busser:', busser_port);
        console.log('Backend:', backend_port);
    }
    argv.quiz = true;
    argv.busser = true;
    argv.backend = true;
}
if (argv.quiz) {
    try {
        if (argv.quiz !== true) {
            if (Number(argv.quiz) !== 0) quiz_port = argv.quiz;
        }
        const url = await tunnelmole({
            port: quiz_port
        });
        postValue("quiz",url)
        console.log("quiz url updated to kv url: ",url)        
    } catch(e) {
        console.error("quiz url update failed error: ",e);
    }
}
if (argv.busser) {
    try {
        if (argv.busser !== true) {
            if (Number(argv.busser) !== 0) busser_port = argv.busser;
        }
        const url = await tunnelmole({
            port: busser_port
        });
        postValue("busser",url)
        console.log("busser url updated to kv url: ",url)
    } catch (e) {
        console.error("busser url update failed error: ",e)
    }
}
if (argv.backend) {
    try {
        if (argv.backend !== true) {
            if (Number(argv.backend) !== 0) backend_port = argv.backend;
        }
        const url = await tunnelmole({
            port: backend_port
        });
        postValue("backend",url)
        console.log("backend url updated to kv url: ",url)        
    } catch (e) {
        console.log("backend update failed error: ",e)
    }
}



// POST request – store/edit a value
async function postValue(key, value) {
  const BASE_URL = "https://techx.connectwithsanthoshmk.workers.dev";
  const url = `${BASE_URL}?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`;
  
  const response = await fetch(url, { method: "POST" });
  const text = await response.text();
  console.log("POST Response:", text);
}
