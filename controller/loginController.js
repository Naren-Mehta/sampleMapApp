var request = require('request');

exports.getCustomerAddress = function (req,res){
    var fetchCustAddressoptions = {  
            url: 'http://alvqapp021.wm.com:8888/rest/LocateMyTruck/login?query='+req.params.userName,
            method: 'GET', 
            auth: {
                user: 'ocsuser',
                pass: 'ocsuser'
            }
          };
    
        request(fetchCustAddressoptions, function(err, response, body) { 
             if(err || response.statusCode > 399) {
               
                res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);
            }else{             
               var json = JSON.parse(body); 
                var addressResp = {
                    "address": [json.address]
                }
                
                res.send(addressResp);
            }
        });
}