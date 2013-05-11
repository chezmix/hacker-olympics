var async = require('async');
var http = require('http');
var querystring = require('querystring'); 

var ips = get_ip_addresses();
var connection_limit = 2000;
var id = 0; //keep track of number ips pinged


/* Makes a POST request to all IP permutations asynchronously */
async.eachLimit(ips, connection_limit, post, function(err) {
    if (err) {
        console.log(err);
    }
});

/* Get every permutation of ip addresses */
function get_ip_addresses() {
    var subips = ["0", "1", "8", "16", "46", "74", "96", "106", "109", "126", "127", "186", "192", "255"];
    var ips = [];
    for (var first in subips) {
        for (var second in subips) {   
            for (var third in subips) {       
                for (var fourth in subips) {   
                    ips.push([subips[first],subips[second],subips[third],subips[fourth]].join("."));
                }
            }
        }
    }
    return ips;
}


/* Make a post request to an ip */
function post(ip, callback) {

    id++;
    var post_data = querystring.stringify({  
        'name' : 'Brandon'
    });
    
    var options = {
        host: ip,
        path: "/hackerolympics.json",
        method: 'POST',
        headers: {  
            'Content-Type': 'application/x-www-form-urlencoded',  
            'Content-Length': post_data.length  
        }          
    };
    
    var req = http.request(options, function(response){
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        
        response.on('end', function () {
            if (response.statusCode == 200) {
                //Found something!
                console.log("---------------------------------------------" + ip + "--------------------------------------------------------------");
                console.log(body);
            }
        });        
    });

    
    req.on('error', function(e) {
        if (e.code == "ECONNREFUSED" || e.code == "EHOSTUNREACH") {
            callback(null);
        } else {
            if (e.code == "EINVAL" || e.code == "ECONNRESET") {
            } else {
                console.log('Problem with request (' + id + "): " + e);
            }
        }
    });    
    
    req.on('end', function() {
        callback(null);
    });
    
    req.on('socket', function (socket) {
        socket.setTimeout(5000); //5 second timeout
        socket.on('timeout', function() {
            req.abort();
            //console.log(options.host + " (" + id + "): timed out.");
            callback(null);
        });
    })    
    
    req.write(post_data); 
    req.end(); 
}


