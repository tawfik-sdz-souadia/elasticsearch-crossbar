var autobahn = require('autobahn');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://172.17.0.1:9200' })

const url = process.env.CBURL;
const realm = process.env.CBREALM;

var connection = new autobahn.Connection({url: url, realm: realm});

async function run (name,id) {
  // Let's start by indexing some data
  await client.index({
    index: 'test_dates2',
    // type: '_doc', // uncomment this line if you are using {es} ≤ 6
    body: {
      id: id,
      event: name,
      date: new Date()
    }
  })
}
//show information about connection state
client.ping().then(data => { console.log(data) })
var id = 0;
//
connection.onopen = function (session) {
    console.log("ok");
    function onevent(args) {
          console.log("Got event:", args[0]);
          var name = args[0];
          run(name,id).catch(console.log)
          id++;
      }
      session.subscribe('com.myapp.hello', onevent);
  };

connection.open();
