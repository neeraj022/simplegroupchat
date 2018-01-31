var server = require('ws').Server;
var s = new server({port : 5001});

s.on('connection', function(ws) {
    ws.on('message', (message) => {
        var json = JSON.parse(message)
        if(json.type=='name') {
            ws.personName = json.data
            return ;
        }
        s.clients.forEach(client => {
            if (client!=ws) {
                client.send(JSON.stringify({
                    name: ws.personName,
                    data: json.data
                }))
            }
        })
    })

    console.log('client connected')
    ws.on('close', () => {
        console.log('lost a client')
    })
})