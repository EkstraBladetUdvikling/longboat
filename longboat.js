(function(){'use strict';function __rest(s,e){var t={};for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0)t[p]=s[p];if(s!=null&&typeof Object.getOwnPropertySymbols==='function')for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++){if(e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i]))t[p[i]]=s[p[i]]}return t}(longboat=>{let ENVIRONMENT;(function(ENVIRONMENT){ENVIRONMENT['development']='development';ENVIRONMENT['production']='production';ENVIRONMENT['staging']='staging';ENVIRONMENT['test']='test'})(ENVIRONMENT||(ENVIRONMENT={}));function validateProperties(checkProps){const status=['aid','ht'].find((prop=>!checkProps.hasOwnProperty(prop)));return!status}class Longboat{constructor(){this.queue=[];this.baseUrl='https://longboat.ekstrabladet.dk';this.properties={url:window.location.href};this.existingQueue=[];this.uniqueQueue=[];this.readyStatus=false;if(longboat){if(longboat.properties){this.properties=Object.assign(Object.assign({},this.properties),longboat.properties)}if(longboat.queue)this.existingQueue=longboat.queue}Object.defineProperty(this.queue,'push',{configurable:false,enumerable:false,value:(...args)=>{this.resolveQueue(args);return args.length},writable:false})}ready(){this.readyStatus=true;this.resolveQueue(this.existingQueue)}setEnvironment(environment){this.baseUrl=environment.toLowerCase()===ENVIRONMENT.development||environment.toLowerCase()===ENVIRONMENT.test?'https://longboat-test.ekstrabladet.dk':this.baseUrl}setProperties(propertiesObject){this.properties=Object.assign(Object.assign({},this.properties),propertiesObject)}buildQuery(trackingObject,once=true){try{if(once&&!this.isUnique(trackingObject)){throw new Error(`This has been tracked already ${trackingObject.ht} - ${trackingObject}`)}const queryObject=Object.assign(Object.assign(Object.assign({},this.properties),trackingObject),{ets:Date.now()});if(!validateProperties(queryObject)){throw new Error('Missing mandatory properties')}const queryArray=Object.entries(queryObject).map((([key,value])=>`${key}=${value}`));this.send(`?${queryArray.join('&')}`)}catch(err){console.error('longboat.buildQuery',err)}}isUnique(trackingObject){const trackingObjectString=JSON.stringify(trackingObject);const exists=this.uniqueQueue.find((el=>el===trackingObjectString));if(exists)return false;this.uniqueQueue.push(trackingObjectString);return true}resolveQueue(queue){try{while(queue.length){const addedObject=queue.shift();if(this.readyStatus){if(typeof addedObject==='function'){addedObject()}else if(addedObject.eventType){this.track(addedObject)}}else{this.existingQueue.push(addedObject)}}}catch(err){console.log('longboat.resolveQueue',err)}}send(query){try{window.navigator.sendBeacon(this.baseUrl+query)}catch(err){console.error('longboat.send',err,'query',query)}}track(trackObj){const{eventType:eventType,once:once}=trackObj,additionalProperties=__rest(trackObj,['eventType','once']);this.buildQuery(Object.assign({ht:eventType},additionalProperties),once)}}window.longboat=new Longboat;window.longboat.ready()})(window.longboat)})();
