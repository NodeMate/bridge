var bridge = require('./index.js')
 require('./test2.js')

bridge.on('message', function(message) {
    console.log(message)
})

bridge.send({
    message: 'Test'
})