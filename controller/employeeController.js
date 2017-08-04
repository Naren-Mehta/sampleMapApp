var request = require('request');
var customerLocArray=[];

exports.getEmployeeInformation = function(req,res){
  
    /*var fetchCustIdoptions = {  
            url: 'http://alvqapp021.wm.com:8888/rest/LocateMyTruck/routes?query='+req.params.address,
            method: 'GET'
    };
    
    request(fetchCustIdoptions, function(err, response, body) { 
                
         var dataArray = [];
     
        if(response.statusCode > 399  || err){
           res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);
        }else{
            var json = JSON.parse(body);
            if(json._metadata[0].totalCount > 0 ){
                for(var i =0 ; i < json.route.length ; i++){ 
                   (function(x) {
                        var fetchRoutesOptions = {
                            url: 'http://alvqapp021.wm.com:8888/rest/LocateMyTruck/custLoc?eZPayID='+json.route[x].MASUNIQUE+'&SvcID='+json.route[x].SVC_LINE_ID,
                            method : 'GET',
                            auth: {
                                user: 'ocsuser',
                               pass: 'ocsuser'
                            }
                        }                       
                       
                        request(fetchRoutesOptions , function(err,response,body){
                            if(err){
                                res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);
                            }else{                                
                                 cusLocJson = JSON.parse(body);
                               
                               
                                dataArray.push({
                                     "customer" : cusLocJson,
                                     "sequence" : json.route[x].SEQ,
                                     "masUnique" : json.route[x].MASUNIQUE,
                                     "svc_line_id" : json.route[x].SVC_LINE_ID,
                                     "svccd" : json.route[x].SVCCD,
                                     "tktnum" : json.route[x].TKTNUM,
                                     "tkttype" : json.route[x].TKTTYPE,
                                     "ticket_load_type" : json.route[x].TICKET_LOAD_TYPE,
                                     "excp_cd" : json.route[x].EXCP_CD,
                                     "customer_name": json.route[x].CUSTOMER
                                     
                                 }); 
                                
                                if(dataArray.length == i){
                                    getTruckLatLong(req,res,dataArray,json.route[x].VEHICLE_ID ); 
                                }
                                
                            }
                             
                        });
                       
                   })(i);
                        
                }
               
            }else{
             res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);
            }
           
        }
    });  */
    console.log(req.params.address.toUpperCase());
    
    if(req.params.address.toUpperCase() == '318 SKYWOOD DR HOUSTON TX'){
        var json = {
            customers: [
                {
                    customer_location: {
                        latitude: "30.01740864998138",
                        longitude: "-95.44490723186033"
                    },
                    ETA: {
                        stop_status_cd: "0",
                        etaDateTime: "2017-07-31 2:46:00",
                        from: "11:06:00.0",
                        to: "14:06:00.0",                       
                        reason_code: "ComputedETA",
                        reason_text: "Service - ETA Computed",
                        serviced_date_time: "2017-08-01T11:57:57.0",
                        route_id: "H1BK"
                    },
                    sequence: "4",
                    masUnique: "000053004106662",
                    svc_line_id: "0000003",
                    svccd: "41D",
                    tktnum: "233383",
                    tkttype: "--",
                    ticket_load_type: "E/R",
                    excp_cd: "--",
                    customer_name: "INWOOD PARK POOL & PLAYGROUND"

                },{
                    customer_location: {
                        latitude: "30.021273137402236",
                        longitude: "-95.43357758098142"
                    },
                    ETA: {
                        stop_status_cd: "0",
                        etaDateTime: "2017-07-31 2:36:00",
                        from: "11:06:00.0",
                        to: "14:06:00.0",
                        reason_code: "ComputedETA",
                        reason_text: "Service - ETA Computed",
                       serviced_date_time: "2017-08-01T8:57:57.0",
                        route_id: "H1BK"
                    },
                   sequence: "3",
                    masUnique: "000053054186665",
                    svc_line_id: "0000003",
                    svccd: "46E",
                    tktnum: "233385",
                    tkttype: "--",
                    ticket_load_type: "E/R",
                    excp_cd: "--",
                    customer_name: "NORTH FOREST MUD"
                },{
                    customer_location: {
                        latitude: "30.024542970660494",
                        longitude: "-95.4204454856445"
                    },
                    ETA: {
                        stop_status_cd: "0",
                        etaDateTime: "2017-07-31 2:26:00",
                        from: "11:06:00.0",
                        to: "14:06:00.0",
                        reason_code: "AlreadyServiced",
                        reason_text: "Completed",
                        serviced_date_time: "null",
                        route_id: "H1BK"
                    },
                    sequence: "2",
                    masUnique: "000053004106667",
                    svc_line_id: "0000004",
                    svccd: "50C",
                    tktnum: "233386",
                    tkttype: "--",
                    ticket_load_type: "E/R",
                    excp_cd: "--",
                    customer_name: "INWOOD PARK POOL & PLAYGROUND"
                },

                {
                    customer_location: {
                        latitude: "30.02484022288207",
                        longitude: "-95.41379360728757"
                   },
                    ETA: {
                        stop_status_cd: "0",
                        etaDateTime: "2017-07-31 2:16:00",
                        from: "11:06:00.0",
                        to: "14:06:00.0",
                        reason_code: "AlreadyServiced",
                        reason_text: "Completed",
                       serviced_date_time: "2017-08-01T08:57:57.0",
                        route_id: "H1BK"
                    },
                    sequence: "1",
                    masUnique: "000053004106661",
                    svc_line_id: "0000002",
                    svccd: "40C",
                    tktnum: "233382",
                    tkttype: "--",
                    ticket_load_type: "E/R",
                    excp_cd: "--",
                    customer_name: "HARRIS COUNTY MUD 354"

                }

                

            ],

            truck_location: {
                coordinates: [{
                    latitude: "30.022759438615168",
                    longitude: "-95.4244795280029",
                    gps_time: "2017-07-10 07:49:37.0"
                }]
            },
            searched_customer: "000053054186665",
            "routeStatus" : true
        }

        res.send(json);
    
    }else if(req.params.address.toUpperCase() =='16000 MASON RD CYPRESS TX'){
    
        var json =  {
            customers: [
                {
                "customer_location": {
                   "latitude": "30.216930385093725",
                    "longitude": "-95.53571902070314"
                },
                "ETA": {
                        "stop_status_cd": "0",
                        "etaDateTime": "2017-07-31 11:36:00",
                        "from": "11:06:00.0",
                        "to": "14:06:00.0",                       
                        "reason_code": "ComputedETA",
                        "reason_text": "Service - ETA Computed",
                        serviced_date_time: "2017-07-31T08:57:57.0",
                        "route_id": "H1BK"
                    },
                "sequence": "4",
                "masUnique": "000111790693007",
                "svc_line_id": "000000002",
                "svccd": "-CN",
                "tktnum": "--",
                "tkttype": "--",
                "ticket_load_type": "--",
                "excp_cd": "--",
                "customer_name": "CENTRAL PARK POOL AND CLUBHOUS"
            },{
                    customer_location: {
                        latitude: "30.20862315788032",
                        longitude: "-95.75956545625002"
                    },
                    ETA: {
                        stop_status_cd: "0",
                        etaDateTime: "2017-07-31 11:26:00",
                        from: "11:06:00.0",
                        to: "14:06:00.0",                       
                        reason_code: "ComputedETA",
                        reason_text: "Service - ETA Computed",
                        serviced_date_time: "2017-07-31T08:57:57.0",
                        route_id: "H1BK"
                    },
                    sequence: "3",
                    masUnique: "000053004106662",
                    svc_line_id: "0000003",
                    svccd: "41D",
                    tktnum: "233383",
                    tkttype: "--",
                    ticket_load_type: "E/R",
                    excp_cd: "--",
                    customer_name: "HARRIS COUNTY MUD 322"

                }/*,{
                    customer_location: {
                        latitude: "30.152827904084845",
                        longitude: "-96.04109011445314"
                    },
                     ETA: {
                        stop_status_cd: "0",
                        etaDateTime: "2017-07-31 11:10:00",
                        from: "11:06:00.0",
                        to: "14:06:00.0",                       
                        reason_code: "ComputedETA",
                        reason_text: "Service - ETA Computed",
                        serviced_date_time: "2017-07-31T08:57:57.0",
                        route_id: "H1BK"
                    },
                   sequence: "3",
                    masUnique: "000053054186665",
                    svc_line_id: "0000003",
                    svccd: "46E",
                    tktnum: "233385",
                    tkttype: "--",
                    ticket_load_type: "E/R",
                    excp_cd: "--",
                    customer_name: "CENTRAL PARK POOL AND CLUBHOUS"
                }*/,{
                    customer_location: {
                        latitude:"30.022742999999999",
                        longitude: "-95.761323000000004"
                    },
                    ETA: {
                        stop_status_cd: "0",
                        etaDateTime: "2017-07-31 10:57:00",
                        from: "11:06:00.0",
                        to: "14:06:00.0",
                        reason_code: "AlreadyServiced",
                        reason_text: "Completed",
                        serviced_date_time: "2017-07-31T16:57:57.0",
                        route_id: "H1BK"
                    },
                    sequence: "2",
                    masUnique: "000053004106667",
                    svc_line_id: "0000004",
                    svccd: "50C",
                    tktnum: "233386",
                    tkttype: "--",
                    ticket_load_type: "E/R",
                    excp_cd: "--",
                    customer_name: "HARRIS COUNTY MUD 396"
                },

                {
                    customer_location: {
                        latitude: "30.01855269457807",
                        longitude: "-96.04109011445314"
                   },
                    ETA: {
                        stop_status_cd: "0",
                        etaDateTime: "2017-07-31 10:30:00",
                        from: "11:06:00.0",
                        to: "14:06:00.0",
                        reason_code: "AlreadyServiced",
                        reason_text: "Completed",
                        serviced_date_time: "2017-07-31T08:57:57.0",
                        route_id: "H1BK"
                    },
                    sequence: "1",
                    masUnique: "000053004106661",
                    svc_line_id: "0000002",
                    svccd: "40C",
                    tktnum: "233382",
                    tkttype: "--",
                    ticket_load_type: "E/R",
                    excp_cd: "--",
                    customer_name: "HARRIS COUNTY MUD 354"

                }

                

            ],

            truck_location: {
                coordinates: [{
                    latitude: "30.13857724498294",
                    longitude: "-95.7533856466797",
                    gps_time: "2017-07-10 07:49:37.0"
                }]
            },
            searched_customer: "000053004106667",
            "routeStatus" : true
        }
    res.send(json);
    } else if(req.params.address.toUpperCase() =='5519 ATASCOCITA TIMBERS N HUMBLE TX'){
    
        var json = {
            "routeStatus" : false
        }
        res.send(json);
    }
}

function getTruckLatLong(req,res,customerDetails,truck_id){
    
    
        var fetchTruckLatLongOptions = {
            url: 'http://alvqapp021.wm.com:8888/rest/LocateMyTruck/vehicleLoc?vehicleID='+truck_id,
            method : 'GET'                        
        };

        request(fetchTruckLatLongOptions , function(err,response,body){
                                
            if(err){
                res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);                    
            }else{
                var truckLatLongbody = JSON.parse(body); 
                if(truckLatLongbody == {} ){
                    res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);                    
                }else{
                  getSearchedCustomerAddress (req, res ,customerDetails,truckLatLongbody);
                }
          
            }
            
        });
       
}

function getSearchedCustomerAddress (req, res ,customerDetails,truckLatLongbody  ){
    
    var fetchCustIdoptions = {  
            url: 'http://alvqapp021.wm.com:8888/rest/LocateMyTruck/route?query='+req.params.address,
            method: 'GET'
    };

        request(fetchCustIdoptions , function(err,response,body){
                                
            if(err){
                res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);                    
            }else{
                var searchedCust = JSON.parse(body);
                if(Object.keys(searchedCust).length > 0 ){
                    var employeeResp= formatJson(customerDetails, truckLatLongbody , searchedCust.services.MASUNIQUE);
                    res.send(employeeResp);
                }else{
                    res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);                    
                }
               
               
                
            }
            
        });
}

function formatJson (customerDetails, truckLatLongbody , searchedCust){
     var employeeResp = {
       customers : [],
       truck_location : truckLatLongbody,
        searched_customer :  searchedCust
     }
    var tempArray = [];
 
    for( var i =0 ;i < customerDetails.length ; i++){
        employeeResp.customers[i] = customerDetails[i].customer, 
        employeeResp.customers[i].sequence = customerDetails[i].sequence,
        employeeResp.customers[i].masUnique = customerDetails[i].masUnique,
        employeeResp.customers[i].svc_line_id = customerDetails[i].svc_line_id,
        employeeResp.customers[i].svccd = customerDetails[i].svccd,
        employeeResp.customers[i].tktnum = customerDetails[i].tktnum,
        employeeResp.customers[i].tkttype = customerDetails[i].tkttype,
        employeeResp.customers[i].ticket_load_type = customerDetails[i].ticket_load_type,
        employeeResp.customers[i].excp_cd = customerDetails[i].excp_cd,
        employeeResp.customers[i].customer_name = customerDetails[i].customer_name
    }
    
    
    return employeeResp;
    
}

