const axios = require('axios');
const schedule = require('node-schedule');
const { makeVoiceCall } = require('./voiceCallAlert')

const servers = [
    {
        name: 'Server 1',
        host: `http://localhost:3001`
    },
    {
        name: 'Server 2',
        host: `http://localhost:3002`
    }
]

const STATUS_CODE_SERVER_DOWN = 500

async function checkServerStatus(server) {
    try {
        const response = await axios.get(server.host)
        
        return response.status
        
    } catch (err) {
        return STATUS_CODE_SERVER_DOWN
    }
}

async function main() {

    for (server of servers) {
        const serverStatus = await checkServerStatus(server)
        
        if (serverStatus >= STATUS_CODE_SERVER_DOWN) {
            makeVoiceCall()
            break;
        };

    }
}

/**
 * The create task schedule to run each every 30 minutes
 */
const job = schedule.scheduleJob('*/30****', function(){
    main()
});