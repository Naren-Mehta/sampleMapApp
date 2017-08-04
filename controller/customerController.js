var request = require('request');

exports.getCustomerInformation = function (req,res){
    /* var fetchCustIdoptions = {
            url: 'http://alvqapp021.wm.com:8888/rest/LocateMyTruck/route?query='+req.params.address,
            method: 'GET'
          };

        request(fetchCustIdoptions, function(err, response, body) {


            if(err || response.statusCode > 399) {

                res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);
            }else{


                  var json = JSON.parse(body);
                if(Object.keys(json["services"]).length > 0){
                    var fetchCustLatLongOptions = {
                        url: 'http://alvqapp021.wm.com:8888/rest/LocateMyTruck/custLoc?eZPayID='+json["services"].MASUNIQUE+'&SvcID='+json["services"].SVC_LINE_ID,
                        method : 'GET',
                        auth: {
                            user: 'ocsuser',
                            pass: 'ocsuser'
                        }
                    };
                    request(fetchCustLatLongOptions, function(err,response,custLatLongBody){

                        if(err){
                             res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);
                        }else{
                            var fetchFutureScheOptions = {
                                url: 'http://alvqapp021.wm.com:8888/rest/LocateMyTruck/services?eZPayID='+json["services"].MASUNIQUE,
                                method : 'GET',
                                auth: {
                                    user: 'ocsuser',
                                    pass: 'ocsuser'
                                }
                            };


                            request(fetchFutureScheOptions , function(err,response,futureSchedule){

                                if(err){
                                    res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);
                                }else{

                                    var fetchTruckLatLongOptions = {
                                        url: 'http://alvqapp021.wm.com:8888/rest/LocateMyTruck/vehicleLoc?vehicleID='+json["services"].VEHICLE_ID,
                                        method : 'GET'
                                    };


                                    request(fetchTruckLatLongOptions , function(err,response,truckLatLongbody){

                                        if(err){
                                            res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);
                                        }else{

                                            var mergedObj = mergeObjs(custLatLongBody,truckLatLongbody,futureSchedule);

                                           res.send(mergedObj);
                                        }

                                    });
                                }

                                });
                        }

                    });
                }else{
                    res.send([{"err" : "There is some issue with the system. Please contact ITSC"}]);
                }

            }

        }); 
         */
  
    
    
    if(req.params.address.toUpperCase() == '1219 12TH ST OAKLAND CA'){
        var json = {
            
            "customer_location": {
                        "latitude": "37.80826150000001",
                        "longitude": "-122.2883066"
            },
            ETA: {
                        "stop_status_cd": "0",
                        "etaDateTime": "2017-08-01 02:36:00",
                        "from": "11:06:00.0",
                        "to": "14:06:00.0",
                        "reason_code": "ComputedETA",
                        "reason_text": "Service - ETA Computed",
                        "serviced_date_time": "null",
                        "route_id": "H1BK"
            },
            "truck_location": {
                "metadata": [
                    {
                        "totalCount": "2639"
                    }
                ],
                "coordinates": [{
                    "latitude": "37.86947030859841",
                    "longitude": "-122.27114046230469",
                    "gps_time": "2017-07-10 07:49:37.0"
                }]
            },
            "upcoming_schedule": "07/31/2017"
        };
        res.send(json);
    }else if(req.params.address.toUpperCase() == '866 WOOD ST OAKLAND'){
        var json = {
            "customer_location": {
                "latitude": "37.8090477",
                "longitude": "-122.30087789999999"
            },
            "ETA": {
                "stop_status_cd": "95",
                "reason_code": "No Service Today",
                "reason_text": "ETA - Truck not left Yard/Route not started"
            },
            "truck_location": {
                "metadata": [
                    {
                        "totalCount": "0"
                    }
                ]
            },
            "upcoming_schedule": "08/02/2017"
        }
        res.send(json);
        
    }else if(req.params.address.toUpperCase() ==  '1519 CAMPBELL ST OAKLAND'){
        
            var jsonq = {
                "customer_location": {
                    "latitude": "37.813134",
                    "longitude": "-122.29466630000002"
                },
                "ETA": {
                    "stop_status_cd": "0",
                    "reason_code": "AlreadyServiced",
                    "reason_text": "Service - Service Provided",
                    "serviced_date_time": "2017-07-31T15:57:57.0",
                    "route_id": "H2PY"
                },
                "truck_location": {
                    "metadata": [
                        {
                            "totalCount": "0"
                        }
                    ]
                },
                "upcoming_schedule": "08/04/2017"
            }
            res.send(jsonq);
    } if(req.params.address.toUpperCase() == '318 SKYWOOD DR HOUSTON TX'){
        var json = {
            
            "customer_location": {
                        "latitude": "30.0064089",
                        "longitude": "-95.42971519999998"
            },
            ETA: {
                        "stop_status_cd": "0",
                        "etaDateTime": "2017-08-31 4:36:00",
                        "from": "11:06:00.0",
                        "to": "14:06:00.0",
                        "reason_code": "ComputedETA",
                        "reason_text": "Service - ETA Computed",
                        "serviced_date_time": "null",
                        "route_id": "H1BK"
            },
            "truck_location": {
                "metadata": [
                    {
                        "totalCount": "2639"
                    }
                ],
                "coordinates": [{
                    "latitude": "30.377937298272958",
                    "longitude": "-95.76342491679685",
                    "gps_time": "2017-07-10 07:49:37.0"
                }]
            },
            "upcoming_schedule": "08/02/2017"
        };
        res.send(json);
    }else if(req.params.address.toUpperCase() == '16000 MASON RD CYPRESS'){
        
            var jsonq = {
                "customer_location": {
                    "latitude": "29.9971469",
                    "longitude": "-95.73759280000002"
                },
                "ETA": {
                    "stop_status_cd": "0",
                    "reason_code": "AlreadyServiced",
                    "reason_text": "Service - Service Provided",
                    "serviced_date_time": "2017-08-01T12:57:57.0",
                    "route_id": "H2PY"
                },
                "truck_location": {
                    "metadata": [
                        {
                            "totalCount": "0"
                        }
                    ]
                },
                "upcoming_schedule": "08/03/2017"
            }
            res.send(jsonq);
    }else if(req.params.address.toUpperCase() ==  '302 N AVENUE D HUMBLE TX'){
        
            var jsonq = {
                "customer_location": {
                    "latitude": "29.9986974",
                    "longitude": "-95.26120789999999"
                },
                "ETA": {
                    "stop_status_cd": "0",
                    "reason_code": "AlreadyServiced",
                    "reason_text": "Service - Service Provided",
                    "serviced_date_time": "2017-08-01T13:57:57.0",
                    "route_id": "H2PY"
                },
                "truck_location": {
                    "metadata": [
                        {
                            "totalCount": "0"
                        }
                    ]
                },
                "upcoming_schedule": "08/03/2017"
            }
            res.send(jsonq);
    }

}

function mergeObjs(obj1 , obj2 , obj3) {
    var obj1 = JSON.parse(obj1);
    var obj2 = {
        "truck_location": JSON.parse(obj2)
    }
    var obj3 = JSON.parse(obj3);    
    var obj3 = {
        "upcoming_schedule" :  obj3.services[0].PLANDTE
    }
    
    var tempObj = Object.assign(obj1, obj2);
    
    var obj = Object.assign(tempObj, obj3);
    
    return obj;
}


