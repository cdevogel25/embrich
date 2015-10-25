//Lets require/import the HTTP module
var http = require('http');
var fs = require('fs');
var url = require('url');

//Lets define a port we want to listen to
const PORT=8080; 

var tickerList = 'voo+voog+vwo+vb+vtip'
//We need a function which handles requests and send response
function handleRequest(request, response){
    var ticker = url.parse(request.url,true).query.ticker;//getTicker(request);
    console.log(ticker);
    //saveQuote(tickerList);
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);

    setInterval(function(){
        saveQuote(tickerList);
    }, 60000);  

});

function getTicker(request){
    var parts = url.parse(request.url, true);
    var query = parts.query;
    console.log(parts);
    console.log(query);
}

// function saveQuote(ticker){
//     var file = fs.createWriteStream("data.csv");
//     var request = http.get("http://finance.yahoo.com/d/quotes.csv?s=" + ticker +"&f=ab", function(response) {
//         response.pipe(file);
//     });
// }

function saveQuote(ticker){
    var file = fs.createWriteStream("quotes/data.csv" + Date.now().toString());
    
    var options = {
      hostname  : 'download.finance.yahoo.com',
      port      : 80,
      path      : '/d/quotes.csv?s=' + ticker + '&f=sab',
      method    : 'GET'
    };
    
    var req = http.request(options, function(res) {
      res.on('data', function(d) {
    	  file.write(d);
      });
    });
    req.end();

}