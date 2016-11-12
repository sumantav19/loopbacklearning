'use strict';

module.exports = function(Coffeeshop) {
    Coffeeshop.status = function(callback){
        var currentDate = new Date();
        var currentHour = currentDate.getHours();
        var response = "";
        var openTime = 8;
        var closeTime = 22;
        console.log('Current hours is %d',currentHour)
        if( currentHour > openTime && currentHour < closeTime){
            response = "Shop is open";
        }else{
            response = "Sorry the shop is close";
        }
        
        callback(null,response);
    }
    Coffeeshop.remoteMethod('status',{
        http : {
            path : '/status',
            verb : 'get'
        },
        returns : {
            arg : 'status',
            type : 'string'
        }
    })
    
    Coffeeshop.getName = function(shopId,callBack){
        // console.log(shopId);
        // console.log(callBack);
        Coffeeshop.findById(shopId,function(err,instance){
            if(err){
                console.log(err);
                callBack(err,null);
            }
            var response = "Coffeeshop name is "+instance.name;
            callBack(null,response);
            console.log(response);
        })
    }
    Coffeeshop.remoteMethod('getName',
        {
            http : { path : '/getname','verb' : 'get'},
            accepts : { arg : 'id', type : 'string' , http : { source : 'query' } },
            returns : { arg : 'name', type : 'string' }
        }
    )
    
};

