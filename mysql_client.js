var mysql = require('mysql'); 
var autobahn = require('autobahn');

var con = mysql.createConnection({
  host: "172.17.0.1",
  user: "root",
  password: "mysqlsdz158",
  database: "testdb"
});

const url = process.env.CBURL;
const realm = process.env.CBREALM;

var connection = new autobahn.Connection({url: url, realm: realm});

connection.onopen = function (session) {
    console.log("ok");
    function onevent(args) {
          console.log("Got event:", args[0]);
          var name = args[0];
          var sql = "INSERT INTO events (message,time) VALUES('"+name+"',CURTIME());"
          con.query(sql, function (err, result) {
          if (err) throw err; 
            console.log("Event has been added!");
          });
      }
      session.subscribe('com.myapp.hello', onevent);
  };

connection.open();
