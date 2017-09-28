//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EVENTMITTER 2

!function(d,b){var e=Array.isArray?Array.isArray:function h(k){return Object.prototype.toString.call(k)==="[object Array]"};var f=10;function i(){this._events={};if(this._conf){a.call(this,this._conf)}}function a(k){if(k){this._conf=k;k.delimiter&&(this.delimiter=k.delimiter);k.maxListeners&&(this._events.maxListeners=k.maxListeners);k.wildcard&&(this.wildcard=k.wildcard);k.newListener&&(this.newListener=k.newListener);if(this.wildcard){this.listenerTree={}}}}function j(k){this._events={};this.newListener=false;a.call(this,k)}function c(l,t,y,n){if(!y){return[]}var u=[],q,p,w,x,s,r,m,k=t.length,o=t[n],v=t[n+1];if(n===k&&y._listeners){if(typeof y._listeners==="function"){l&&l.push(y._listeners);return[y]}else{for(q=0,p=y._listeners.length;q<p;q++){l&&l.push(y._listeners[q])}return[y]}}if((o==="*"||o==="**")||y[o]){if(o==="*"){for(w in y){if(w!=="_listeners"&&y.hasOwnProperty(w)){u=u.concat(c(l,t,y[w],n+1))}}return u}else{if(o==="**"){m=(n+1===k||(n+2===k&&v==="*"));if(m&&y._listeners){u=u.concat(c(l,t,y,k))}for(w in y){if(w!=="_listeners"&&y.hasOwnProperty(w)){if(w==="*"||w==="**"){if(y[w]._listeners&&!m){u=u.concat(c(l,t,y[w],k))}u=u.concat(c(l,t,y[w],n))}else{if(w===v){u=u.concat(c(l,t,y[w],n+2))}else{u=u.concat(c(l,t,y[w],n))}}}}return u}}u=u.concat(c(l,t,y[o],n+1))}x=y["*"];if(x){c(l,t,x,n+1)}s=y["**"];if(s){if(n<k){if(s._listeners){c(l,t,s,k)}for(w in s){if(w!=="_listeners"&&s.hasOwnProperty(w)){if(w===v){c(l,t,s[w],n+2)}else{if(w===o){c(l,t,s[w],n+1)}else{r={};r[w]=s[w];c(l,t,{"**":r},n+1)}}}}}else{if(s._listeners){c(l,t,s,k)}else{if(s["*"]&&s["*"]._listeners){c(l,t,s["*"],k)}}}}return u}function g(q,r){q=typeof q==="string"?q.split(this.delimiter):q.slice();for(var p=0,n=q.length;p+1<n;p++){if(q[p]==="**"&&q[p+1]==="**"){return}}var l=this.listenerTree;var o=q.shift();while(o){if(!l[o]){l[o]={}}l=l[o];if(q.length===0){if(!l._listeners){l._listeners=r}else{if(typeof l._listeners==="function"){l._listeners=[l._listeners,r]}else{if(e(l._listeners)){l._listeners.push(r);if(!l._listeners.warned){var k=f;if(typeof this._events.maxListeners!=="undefined"){k=this._events.maxListeners}if(k>0&&l._listeners.length>k){l._listeners.warned=true;console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",l._listeners.length);console.trace()}}}}}return true}o=q.shift()}return true}j.prototype.delimiter=".";j.prototype.setMaxListeners=function(k){this._events||i.call(this);this._events.maxListeners=k;if(!this._conf){this._conf={}}this._conf.maxListeners=k};j.prototype.event="";j.prototype.once=function(l,k){this.many(l,1,k);return this};j.prototype.many=function(n,k,m){var l=this;if(typeof m!=="function"){throw new Error("many only accepts instances of Function")}function o(){if(--k===0){l.off(n,o)}m.apply(this,arguments)}o._origin=m;this.on(n,o);return l};j.prototype.emit=function(){this._events||i.call(this);var r=arguments[0];if(r==="newListener"&&!this.newListener){if(!this._events.newListener){return false}}if(this._all){var k=arguments.length;var m=new Array(k-1);for(var n=1;n<k;n++){m[n-1]=arguments[n]}for(n=0,k=this._all.length;n<k;n++){this.event=r;this._all[n].apply(this,m)}}if(r==="error"){if(!this._all&&!this._events.error&&!(this.wildcard&&this.listenerTree.error)){if(arguments[1] instanceof Error){throw arguments[1]}else{throw new Error("Uncaught, unspecified 'error' event.")}return false}}var q;if(this.wildcard){q=[];var p=typeof r==="string"?r.split(this.delimiter):r.slice();c.call(this,q,p,this.listenerTree,0)}else{q=this._events[r]}if(typeof q==="function"){this.event=r;if(arguments.length===1){q.call(this)}else{if(arguments.length>1){switch(arguments.length){case 2:q.call(this,arguments[1]);break;case 3:q.call(this,arguments[1],arguments[2]);break;default:var k=arguments.length;var m=new Array(k-1);for(var n=1;n<k;n++){m[n-1]=arguments[n]}q.apply(this,m)}}}return true}else{if(q){var k=arguments.length;var m=new Array(k-1);for(var n=1;n<k;n++){m[n-1]=arguments[n]}var o=q.slice();for(var n=0,k=o.length;n<k;n++){this.event=r;o[n].apply(this,m)}return(o.length>0)||this._all}else{return this._all}}};j.prototype.on=function(l,n){if(typeof l==="function"){this.onAny(l);return this}if(typeof n!=="function"){throw new Error("on only accepts instances of Function")}this._events||i.call(this);this.emit("newListener",l,n);if(this.wildcard){g.call(this,l,n);return this}if(!this._events[l]){this._events[l]=n}else{if(typeof this._events[l]==="function"){this._events[l]=[this._events[l],n]}else{if(e(this._events[l])){this._events[l].push(n);if(!this._events[l].warned){var k=f;if(typeof this._events.maxListeners!=="undefined"){k=this._events.maxListeners}if(k>0&&this._events[l].length>k){this._events[l].warned=true;console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[l].length);console.trace()}}}}}return this};j.prototype.onAny=function(k){if(!this._all){this._all=[]}if(typeof k!=="function"){throw new Error("onAny only accepts instances of Function")}this._all.push(k);return this};j.prototype.addListener=j.prototype.on;j.prototype.off=function(q,l){if(typeof l!=="function"){throw new Error("removeListener only takes instances of Function")}var m,t=[];if(this.wildcard){var r=typeof q==="string"?q.split(this.delimiter):q.slice();t=c.call(this,null,r,this.listenerTree,0)}else{if(!this._events[q]){return this}m=this._events[q];t.push({_listeners:m})}for(var s=0;s<t.length;s++){var p=t[s];m=p._listeners;if(e(m)){var o=-1;for(var n=0,k=m.length;n<k;n++){if(m[n]===l||(m[n].listener&&m[n].listener===l)||(m[n]._origin&&m[n]._origin===l)){o=n;break}}if(o<0){return this}if(this.wildcard){p._listeners.splice(o,1)}else{this._events[q].splice(o,1)}if(m.length===0){if(this.wildcard){delete p._listeners}else{delete this._events[q]}}}else{if(m===l||(m.listener&&m.listener===l)||(m._origin&&m._origin===l)){if(this.wildcard){delete p._listeners}else{delete this._events[q]}}}}return this};j.prototype.offAny=function(o){var n=0,k=0,m;if(o&&this._all&&this._all.length>0){m=this._all;for(n=0,k=m.length;n<k;n++){if(o===m[n]){m.splice(n,1);return this}}}else{this._all=[]}return this};j.prototype.removeListener=j.prototype.off;j.prototype.removeAllListeners=function(o){if(arguments.length===0){!this._events||i.call(this);return this}if(this.wildcard){var n=typeof o==="string"?o.split(this.delimiter):o.slice();var m=c.call(this,null,n,this.listenerTree,0);for(var l=0;l<m.length;l++){var k=m[l];k._listeners=null}}else{if(!this._events[o]){return this}this._events[o]=null}return this};j.prototype.listeners=function(m){if(this.wildcard){var k=[];var l=typeof m==="string"?m.split(this.delimiter):m.slice();c.call(this,k,l,this.listenerTree,0);return k}this._events||i.call(this);if(!this._events[m]){this._events[m]=[]}if(!e(this._events[m])){this._events[m]=[this._events[m]]}return this._events[m]};j.prototype.listenersAny=function(){if(this._all){return this._all}else{return[]}};if(typeof define==="function"&&define.amd){define(function(){return j})}else{d.EventEmitter2=j}}(typeof process!=="undefined"&&typeof process.title!=="undefined"&&typeof exports!=="undefined"?exports:window);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ROSLIB LIBRARY
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ROSLIB=ROSLIB||{REVISION:"6"};ROSLIB.URDF_SPHERE=0,ROSLIB.URDF_BOX=1,ROSLIB.URDF_CYLINDER=2,ROSLIB.URDF_MESH=3,ROSLIB.ActionClient=function(t){var e=this;t=t||{},this.ros=t.ros,this.serverName=t.serverName,this.actionName=t.actionName,this.timeout=t.timeout,this.goals={};var i=!1,s=new ROSLIB.Topic({ros:this.ros,name:this.serverName+"/feedback",messageType:this.actionName+"Feedback"}),n=new ROSLIB.Topic({ros:this.ros,name:this.serverName+"/status",messageType:"actionlib_msgs/GoalStatusArray"}),o=new ROSLIB.Topic({ros:this.ros,name:this.serverName+"/result",messageType:this.actionName+"Result"});this.goalTopic=new ROSLIB.Topic({ros:this.ros,name:this.serverName+"/goal",messageType:this.actionName+"Goal"}),this.cancelTopic=new ROSLIB.Topic({ros:this.ros,name:this.serverName+"/cancel",messageType:"actionlib_msgs/GoalID"}),this.goalTopic.advertise(),this.cancelTopic.advertise(),n.subscribe(function(t){i=!0,t.status_list.forEach(function(t){var i=e.goals[t.goal_id.id];i&&i.emit("status",t)})}),s.subscribe(function(t){var i=e.goals[t.status.goal_id.id];i&&(i.emit("status",t.status),i.emit("feedback",t.feedback))}),o.subscribe(function(t){var i=e.goals[t.status.goal_id.id];i&&(i.emit("status",t.status),i.emit("result",t.result))}),this.timeout&&setTimeout(function(){i||e.emit("timeout")},this.timeout)},ROSLIB.ActionClient.prototype.__proto__=EventEmitter2.prototype,ROSLIB.ActionClient.prototype.cancel=function(){var t=new ROSLIB.Message;this.cancelTopic.publish(t)},ROSLIB.Goal=function(t){var e=this;this.actionClient=t.actionClient,this.goalMessage=t.goalMessage,this.isFinished=!1;var i=new Date;this.goalID="goal_"+Math.random()+"_"+i.getTime(),this.goalMessage=new ROSLIB.Message({goal_id:{stamp:{secs:0,nsecs:0},id:this.goalID},goal:this.goalMessage}),this.on("status",function(t){e.status=t}),this.on("result",function(t){e.isFinished=!0,e.result=t}),this.on("feedback",function(t){e.feedback=t}),this.actionClient.goals[this.goalID]=this},ROSLIB.Goal.prototype.__proto__=EventEmitter2.prototype,ROSLIB.Goal.prototype.send=function(t){var e=this;e.actionClient.goalTopic.publish(e.goalMessage),t&&setTimeout(function(){e.isFinished||e.emit("timeout")},t)},ROSLIB.Goal.prototype.cancel=function(){var t=new ROSLIB.Message({id:this.goalID});this.actionClient.cancelTopic.publish(t)},ROSLIB.Message=function(t){var e=this;t=t||{},Object.keys(t).forEach(function(i){e[i]=t[i]})},ROSLIB.Param=function(t){t=t||{},this.ros=t.ros,this.name=t.name},ROSLIB.Param.prototype.get=function(t){var e=new ROSLIB.Service({ros:this.ros,name:"/rosapi/get_param",serviceType:"rosapi/GetParam"}),i=new ROSLIB.ServiceRequest({name:this.name,value:JSON.stringify("")});e.callService(i,function(e){var i=JSON.parse(e.value);t(i)})},ROSLIB.Param.prototype.set=function(t){var e=new ROSLIB.Service({ros:this.ros,name:"/rosapi/set_param",serviceType:"rosapi/SetParam"}),i=new ROSLIB.ServiceRequest({name:this.name,value:JSON.stringify(t)});e.callService(i,function(){})},ROSLIB.Ros=function(t){t=t||{};var e=t.url;this.socket=null,this.idCounter=0,this.setMaxListeners(0),e&&this.connect(e)},ROSLIB.Ros.prototype.__proto__=EventEmitter2.prototype,ROSLIB.Ros.prototype.connect=function(t){function e(t){a.emit("connection",t)}function i(t){a.emit("close",t)}function s(t){a.emit("error",t)}function n(t,e){var i=new Image;i.onload=function(){var t=document.createElement("canvas"),s=t.getContext("2d");t.width=i.width,t.height=i.height,s.drawImage(i,0,0);for(var n=s.getImageData(0,0,i.width,i.height).data,o="",a=0;n.length>a;a+=4)o+=String.fromCharCode(n[a],n[a+1],n[a+2]);var r=JSON.parse(o);e(r)},i.src="data:image/png;base64,"+t.data}function o(t){function e(t){"publish"===t.op?a.emit(t.topic,t.msg):"service_response"===t.op&&a.emit(t.id,t.values)}var i=JSON.parse(t.data);"png"===i.op?n(i,function(t){e(t)}):e(i)}var a=this;this.socket=new WebSocket(t),this.socket.onopen=e,this.socket.onclose=i,this.socket.onerror=s,this.socket.onmessage=o},ROSLIB.Ros.prototype.close=function(){this.socket&&this.socket.close()},ROSLIB.Ros.prototype.authenticate=function(t,e,i,s,n,o,a){var r={op:"auth",mac:t,client:e,dest:i,rand:s,t:n,level:o,end:a};this.callOnConnection(r)},ROSLIB.Ros.prototype.callOnConnection=function(t){var e=this,i=JSON.stringify(t);this.socket&&this.socket.readyState===WebSocket.OPEN?e.socket.send(i):e.once("connection",function(){e.socket.send(i)})},ROSLIB.Ros.prototype.getTopics=function(t){var e=new ROSLIB.Service({ros:this,name:"/rosapi/topics",serviceType:"rosapi/Topics"}),i=new ROSLIB.ServiceRequest;e.callService(i,function(e){t(e.topics)})},ROSLIB.Ros.prototype.getServices=function(t){var e=new ROSLIB.Service({ros:this,name:"/rosapi/services",serviceType:"rosapi/Services"}),i=new ROSLIB.ServiceRequest;e.callService(i,function(e){t(e.services)})},ROSLIB.Ros.prototype.getParams=function(t){var e=new ROSLIB.Service({ros:this,name:"/rosapi/get_param_names",serviceType:"rosapi/GetParamNames"}),i=new ROSLIB.ServiceRequest;e.callService(i,function(e){t(e.names)})},ROSLIB.Service=function(t){t=t||{},this.ros=t.ros,this.name=t.name,this.serviceType=t.serviceType},ROSLIB.Service.prototype.callService=function(t,e){this.ros.idCounter++;var i="call_service:"+this.name+":"+this.ros.idCounter;this.ros.once(i,function(t){var i=new ROSLIB.ServiceResponse(t);e(i)});var s=[];Object.keys(t).forEach(function(e){s.push(t[e])});var n={op:"call_service",id:i,service:this.name,args:s};this.ros.callOnConnection(n)},ROSLIB.ServiceRequest=function(t){var e=this;t=t||{},Object.keys(t).forEach(function(i){e[i]=t[i]})},ROSLIB.ServiceResponse=function(t){var e=this;t=t||{},Object.keys(t).forEach(function(i){e[i]=t[i]})},ROSLIB.Topic=function(t){t=t||{},this.ros=t.ros,this.name=t.name,this.messageType=t.messageType,this.isAdvertised=!1,this.compression=t.compression||"none",this.throttle_rate=t.throttle_rate||0,this.compression&&"png"!==this.compression&&"none"!==this.compression&&this.emit("warning",this.compression+" compression is not supported. No compression will be used."),0>this.throttle_rate&&(this.emit("warning",this.throttle_rate+" is not allowed. Set to 0"),this.throttle_rate=0)},ROSLIB.Topic.prototype.__proto__=EventEmitter2.prototype,ROSLIB.Topic.prototype.subscribe=function(t){var e=this;this.on("message",function(e){t(e)}),this.ros.on(this.name,function(t){var i=new ROSLIB.Message(t);e.emit("message",i)}),this.ros.idCounter++;var i="subscribe:"+this.name+":"+this.ros.idCounter,s={op:"subscribe",id:i,type:this.messageType,topic:this.name,compression:this.compression,throttle_rate:this.throttle_rate};this.ros.callOnConnection(s)},ROSLIB.Topic.prototype.unsubscribe=function(){this.ros.removeAllListeners([this.name]),this.ros.idCounter++;var t="unsubscribe:"+this.name+":"+this.ros.idCounter,e={op:"unsubscribe",id:t,topic:this.name};this.ros.callOnConnection(e)},ROSLIB.Topic.prototype.advertise=function(){this.ros.idCounter++;var t="advertise:"+this.name+":"+this.ros.idCounter,e={op:"advertise",id:t,type:this.messageType,topic:this.name};this.ros.callOnConnection(e),this.isAdvertised=!0},ROSLIB.Topic.prototype.unadvertise=function(){this.ros.idCounter++;var t="unadvertise:"+this.name+":"+this.ros.idCounter,e={op:"unadvertise",id:t,topic:this.name};this.ros.callOnConnection(e),this.isAdvertised=!1},ROSLIB.Topic.prototype.publish=function(t){this.isAdvertised||this.advertise(),this.ros.idCounter++;var e="publish:"+this.name+":"+this.ros.idCounter,i={op:"publish",id:e,topic:this.name,msg:t};this.ros.callOnConnection(i)},ROSLIB.Pose=function(t){t=t||{},this.position=new ROSLIB.Vector3(t.position),this.orientation=new ROSLIB.Quaternion(t.orientation)},ROSLIB.Pose.prototype.applyTransform=function(t){this.position.multiplyQuaternion(t.rotation),this.position.add(t.translation);var e=t.rotation.clone();e.multiply(this.orientation),this.orientation=e},ROSLIB.Pose.prototype.clone=function(){return new ROSLIB.Pose(this)},ROSLIB.Quaternion=function(t){t=t||{},this.x=t.x||0,this.y=t.y||0,this.z=t.z||0,this.w=t.w||1},ROSLIB.Quaternion.prototype.conjugate=function(){this.x*=-1,this.y*=-1,this.z*=-1},ROSLIB.Quaternion.prototype.normalize=function(){var t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);0===t?(this.x=0,this.y=0,this.z=0,this.w=1):(t=1/t,this.x=this.x*t,this.y=this.y*t,this.z=this.z*t,this.w=this.w*t)},ROSLIB.Quaternion.prototype.invert=function(){this.conjugate(),this.normalize()},ROSLIB.Quaternion.prototype.multiply=function(t){var e=this.x*t.w+this.y*t.z-this.z*t.y+this.w*t.x,i=-this.x*t.z+this.y*t.w+this.z*t.x+this.w*t.y,s=this.x*t.y-this.y*t.x+this.z*t.w+this.w*t.z,n=-this.x*t.x-this.y*t.y-this.z*t.z+this.w*t.w;this.x=e,this.y=i,this.z=s,this.w=n},ROSLIB.Quaternion.prototype.clone=function(){return new ROSLIB.Quaternion(this)},ROSLIB.Transform=function(t){t=t||{},this.translation=new ROSLIB.Vector3(t.translation),this.rotation=new ROSLIB.Quaternion(t.rotation)},ROSLIB.Transform.prototype.clone=function(){return new ROSLIB.Transform(this)},ROSLIB.Vector3=function(t){t=t||{},this.x=t.x||0,this.y=t.y||0,this.z=t.z||0},ROSLIB.Vector3.prototype.add=function(t){this.x+=t.x,this.y+=t.y,this.z+=t.z},ROSLIB.Vector3.prototype.subtract=function(t){this.x-=t.x,this.y-=t.y,this.z-=t.z},ROSLIB.Vector3.prototype.multiplyQuaternion=function(t){var e=t.w*this.x+t.y*this.z-t.z*this.y,i=t.w*this.y+t.z*this.x-t.x*this.z,s=t.w*this.z+t.x*this.y-t.y*this.x,n=-t.x*this.x-t.y*this.y-t.z*this.z;this.x=e*t.w+n*-t.x+i*-t.z-s*-t.y,this.y=i*t.w+n*-t.y+s*-t.x-e*-t.z,this.z=s*t.w+n*-t.z+e*-t.y-i*-t.x},ROSLIB.Vector3.prototype.clone=function(){return new ROSLIB.Vector3(this)},ROSLIB.TFClient=function(t){t=t||{},this.ros=t.ros,this.fixedFrame=t.fixedFrame||"/base_link",this.angularThres=t.angularThres||2,this.transThres=t.transThres||.01,this.rate=t.rate||10,this.goalUpdateDelay=t.goalUpdateDelay||50,this.currentGoal=!1,this.frameInfos={},this.goalUpdateRequested=!1,this.actionClient=new ROSLIB.ActionClient({ros:this.ros,serverName:"/tf2_web_republisher",actionName:"tf2_web_republisher/TFSubscriptionAction"})},ROSLIB.TFClient.prototype.processFeedback=function(t){var e=this;t.transforms.forEach(function(t){var i=t.child_frame_id,s=e.frameInfos[i];void 0!==s&&(s.transform=new ROSLIB.Transform({translation:t.transform.translation,rotation:t.transform.rotation}),s.cbs.forEach(function(t){t(s.transform)}))})},ROSLIB.TFClient.prototype.updateGoal=function(){this.currentGoal&&this.currentGoal.cancel();var t={source_frames:[],target_frame:this.fixedFrame,angular_thres:this.angularThres,trans_thres:this.transThres,rate:this.rate};for(var e in this.frameInfos)t.source_frames.push(e);this.currentGoal=new ROSLIB.Goal({actionClient:this.actionClient,goalMessage:t}),this.currentGoal.on("feedback",this.processFeedback.bind(this)),this.currentGoal.send(),this.goalUpdateRequested=!1},ROSLIB.TFClient.prototype.subscribe=function(t,e){"/"===t[0]&&(t=t.substring(1)),void 0===this.frameInfos[t]?(this.frameInfos[t]={cbs:[]},this.goalUpdateRequested||(setTimeout(this.updateGoal.bind(this),this.goalUpdateDelay),this.goalUpdateRequested=!0)):void 0!==this.frameInfos[t].transform&&e(this.frameInfos[t].transform),this.frameInfos[t].cbs.push(e)},ROSLIB.TFClient.prototype.unsubscribe=function(t,e){var i=this.frameInfos[t];if(void 0!==i){var s=i.cbs.indexOf(e);s>=0&&(i.cbs.splice(s,1),0===i.cbs.length&&delete this.frameInfos[t],this.needUpdate=!0)}},ROSLIB.UrdfBox=function(t){t=t||{};var e=this,i=t.xml;this.dimension=null,this.type=null;var s=function(t){this.type=ROSLIB.URDF_BOX;var i=t.getAttribute("size").split(" ");e.dimension=new ROSLIB.Vector3({x:parseFloat(i[0]),y:parseFloat(i[1]),z:parseFloat(i[2])})};s(i)},ROSLIB.UrdfColor=function(t){t=t||{};var e=this,i=t.xml;this.r=null,this.g=null,this.b=null,this.a=null;var s=function(t){var i=t.getAttribute("rgba").split(" ");return e.r=parseFloat(i[0]),e.g=parseFloat(i[1]),e.b=parseFloat(i[2]),e.a=parseFloat(i[3]),!0};s(i)},ROSLIB.UrdfCylinder=function(t){t=t||{};var e=this,i=t.xml;this.type=null,this.length=null,this.radius=null;var s=function(t){e.type=ROSLIB.URDF_CYLINDER,e.length=parseFloat(t.getAttribute("length")),e.radius=parseFloat(t.getAttribute("radius"))};s(i)},ROSLIB.UrdfLink=function(t){t=t||{};var e=this,i=t.xml;this.name=null,this.visual=null;var s=function(t){e.name=t.getAttribute("name");var i=t.getElementsByTagName("visual");i.length>0&&(e.visual=new ROSLIB.UrdfVisual({xml:i[0]}))};s(i)},ROSLIB.UrdfMaterial=function(t){t=t||{};var e=this,i=t.xml;this.name=null,this.textureFilename=null,this.color=null;var s=function(t){e.name=t.getAttribute("name");var i=t.getElementsByTagName("texture");i.length>0&&(e.textureFilename=i[0].getAttribute("filename"));var s=t.getElementsByTagName("color");s.length>0&&(e.color=new ROSLIB.UrdfColor({xml:s[0]}))};s(i)},ROSLIB.UrdfMesh=function(t){t=t||{};var e=this,i=t.xml;this.filename=null,this.scale=null,this.type=null;var s=function(t){e.type=ROSLIB.URDF_MESH,e.filename=t.getAttribute("filename");var i=t.getAttribute("scale");if(i){var s=i.split(" ");e.scale=new ROSLIB.Vector3({x:parseFloat(s[0]),y:parseFloat(s[1]),z:parseFloat(s[2])})}};s(i)},ROSLIB.UrdfModel=function(t){t=t||{};var e=this,i=t.xml,s=t.string;this.materials=[],this.links=[];var n=function(t){var i=t.evaluate("//robot",t,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;e.name=i.getAttribute("name");for(var s in i.childNodes){var n=i.childNodes[s];if("material"===n.tagName){var o=new ROSLIB.UrdfMaterial({xml:n});e.materials[o.name]?console.warn("Material "+o.name+"is not unique."):e.materials[o.name]=o}else if("link"===n.tagName){var a=new ROSLIB.UrdfLink({xml:n});e.links[a.name]?console.warn("Link "+a.name+" is not unique."):(a.visual&&a.visual.material&&(e.materials[a.visual.material.name]?a.visual.material=e.materials[a.visual.material.name]:a.visual.material&&(e.materials[a.visual.material.name]=a.visual.material)),e.links[a.name]=a)}}};if(s){var o=new DOMParser;i=o.parseFromString(s,"text/xml")}n(i)},ROSLIB.UrdfSphere=function(t){t=t||{};var e=this,i=t.xml;this.radius=null,this.type=null;var s=function(t){e.type=ROSLIB.URDF_SPHERE,e.radius=parseFloat(t.getAttribute("radius"))};s(i)},ROSLIB.UrdfVisual=function(t){t=t||{};var e=this,i=t.xml;this.origin=null,this.geometry=null,this.material=null;var s=function(t){var i=t.getElementsByTagName("origin");if(0===i.length)e.origin=new ROSLIB.Pose;else{var s=i[0].getAttribute("xyz"),n=new ROSLIB.Vector3;s&&(s=s.split(" "),n=new ROSLIB.Vector3({x:parseFloat(s[0]),y:parseFloat(s[1]),z:parseFloat(s[2])}));var o=i[0].getAttribute("rpy"),a=new ROSLIB.Quaternion;if(o){o=o.split(" ");var r=parseFloat(o[0]),h=parseFloat(o[1]),c=parseFloat(o[2]),l=r/2,u=h/2,p=c/2,m=Math.sin(l)*Math.cos(u)*Math.cos(p)-Math.cos(l)*Math.sin(u)*Math.sin(p),f=Math.cos(l)*Math.sin(u)*Math.cos(p)+Math.sin(l)*Math.cos(u)*Math.sin(p),v=Math.cos(l)*Math.cos(u)*Math.sin(p)-Math.sin(l)*Math.sin(u)*Math.cos(p),S=Math.cos(l)*Math.cos(u)*Math.cos(p)+Math.sin(l)*Math.sin(u)*Math.sin(p);a=new ROSLIB.Quaternion({x:m,y:f,z:v,w:S}),a.normalize()}e.origin=new ROSLIB.Pose({position:n,orientation:a})}var R=t.getElementsByTagName("geometry");if(R.length>0){var d=null;for(var g in R[0].childNodes){var O=R[0].childNodes[g];if(1===O.nodeType){d=O;break}}var y=d.nodeName;"sphere"===y?e.geometry=new ROSLIB.UrdfSphere({xml:d}):"box"===y?e.geometry=new ROSLIB.UrdfBox({xml:d}):"cylinder"===y?e.geometry=new ROSLIB.UrdfCylinder({xml:d}):"mesh"===y?e.geometry=new ROSLIB.UrdfMesh({xml:d}):console.warn("Unknown geometry type "+y)}var I=t.getElementsByTagName("material");I.length>0&&(e.material=new ROSLIB.UrdfMaterial({xml:I[0]}))};s(i)};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




new (function() {

	var ext = this;
	var connected=0;
	var bots = [];
	var moving =false;
	
	function ROSBot(name, ip) {
		this.ip = ip;
		this.name = name;
		this.accelerometer = true;
		this.touch = true;
		this.touchedHead = false;
		this.touchedLeft = false;
		this.touchedRight = false;
		this.accelerometerChanged = false;
		this.currentPosition = 0;
		this.listened=false;
		this.listenedSentence=null;
		this.moving=false;

		// Connecting to ROS
		this.ros = new ROSLIB.Ros({
			url : 'ws://' + ip + ':9090'
		});

		// Event callbacks
		this.ros.on('connection', function() {
			connected = 1;
			alert('connected!');
		});
		this.ros.on('close', function(){
			alert('closed!');
			deleteBot(this.name);
		});
		this.ros.on('error', function(){
			alert('error!');
		});
		
		//SERVICES
		this.moveHeadService = new ROSLIB.Service({
			ros: this.ros,
			name : '/aisoy/moveServo',
			serviceType : 'aisoy_sensorimotor/MoveServo'
		});
			
		this.sayService = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/tts/Say',
			serviceType : 'aisoy_tts/Say'
		});
					
		this.setColor = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/setColor',
			serviceType : 'aisoy_sensorimotor/SetColor'
		});
					
		this.mouthPrint = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/mouthPrint',
			serviceType : 'aisoy_sensorimotor/MouthPrint'
		});
					
		this.mouthDraw = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/mouthDraw',
			serviceType : 'aisoy_sensorimotor/MouthDraw'
		});
		
		this.getLanguage = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/tts/GetLanguage',
			serviceType : 'aisoy_tts/GetLanguage'
		})

		this.getVoice = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/tts/GetVoice',
			serviceType : 'aisoy_tts/GetVoice'
		})

		this.setLanguageTTS = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/tts/SetLanguage',
			serviceType : 'aisoy_tts/SetLanguage'
		})

		this.setLanguageASR = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/asr/SetLanguage',
			serviceType : 'aisoy_asr/SetLanguage'
		})

		this.setVoice = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/tts/SetVoice',
			serviceType : 'aisoy_tts/SetVoice'
		})

		this.setGrammar = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/asr/SetGrammar',
			serviceType : 'aisoy_asr/SetGrammar'
		})

		this.move = new ROSLIB.Service({
			ros : this.ros,
			name : '/cutremovil/Move',
			serviceType : 'cutremovil/MoveService'
		})
		
		this.setEmotion = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/performance/setEmotion',
			serviceType : 'aisoy_performance/setEmotion'
		})

		/*this.getAudioList = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/aisoy_audio/getList',
			serviceType : 'aisoy_audio/getList'
		})

		this.playS = new ROSLIB.Service({
			ros : this.ros,
			name : '/aisoy/aisoy_audio/play',
			serviceType : 'aisoy_audio/play'
		})*/
		
		// Listeners and services
		this.listeners = new Listeners(this)
		//this.services = new Services(this)
	};
	
	ROSBot.prototype.TOUCH_MASK={
		LEFT:1,
		HEAD:2,
		RIGHT:4
	}
	
	ROSBot.prototype.touched = function(where){
		//Value to be catched by the 'h' block
		if(where & this.TOUCH_MASK.LEFT) {
			this.touchedLeft=true;
		} 
		if(where & this.TOUCH_MASK.RIGHT) {
			this.touchedRight=true;
		} 
		if(where & this.TOUCH_MASK.HEAD) {
			this.touchedHead=true;
		} 
	}
	
	ROSBot.prototype.accMoved = function(position){
		this.accelerometerChanged=true;
		this.currentPosition=position;
	}
	
	Listeners.prototype.update = function(listener, value) {
		changed = false
		if(! listener in this.state || this.state[listener] != value) {
			changed = true

			this.state[listener] = value;
		}

		return changed
	}
	
	function Listeners(bot) {
		this.state = []

		this.accelerometer = new ROSLIB.Topic({
			ros : bot.ros,
			name : '/aisoy/accelerometer',
			messageType : 'aisoy_sensorimotor/Accelerometer'
		});
		
		this.touch = new ROSLIB.Topic({
			ros : bot.ros,
			name : '/aisoy/touch',
			messageType : 'aisoy_sensorimotor/Touch'
		});
		
		this.asr = new ROSLIB.Topic({
			ros : bot.ros,
			name : '/aisoy/asr/sentence',
			messageType : 'aisoy_asr/Sentence'
		});
		
		this.ttsSdk = new ROSLIB.Topic({
			ros : bot.ros,
			name : '/aisoy/tts/userSdk',
			messageType : 'std_msgs/Int16'
		});
		
		this.asrSdk = new ROSLIB.Topic({
			ros : bot.ros,
			name : '/aisoy/asr/userSdk',
			messageType : 'std_msgs/Int16'
		});

		this.touch.subscribe((function(message) {
			if( bot.touch ) {
				
				this.update("touch", message.left + "#" + message.head + "#" + message.right);
				var where = 0

				where += (message.left) ? bot.TOUCH_MASK.LEFT : 0;
				where += (message.head) ? bot.TOUCH_MASK.HEAD : 0;
				where += (message.right) ? bot.TOUCH_MASK.RIGHT : 0;

				if(where) {
					bot.touched(where);
				}
			}
		}).bind(this));
		
		
		this.accelerometer.subscribe((function(message) {
			if( bot.accelerometer ) {
				
					this.update("accelerometer", message.x + "#" + message.y + "#" + message.z);

					var x_deg = Math.atan( message.x / (Math.sqrt(Math.pow(message.y,2) + Math.pow(message.z,2))));
					x_deg = x_deg * 180.00;
					x_deg = x_deg / Math.PI;

					var position;

					if( x_deg > 67.5 ) {
						position = 0;
					} else if ( x_deg > 45 ) {
						position = 1;
					} else if ( x_deg > 22.5 ) {
						position = 2;
					} else if ( x_deg > -22.5 ) {
						position = 3;
					} else {
						position = 4;
					}
					
					if(this.update("position", position)){
						bot.accMoved(position);
					}
			}
		}).bind(this));
		
		
		this.asr.subscribe((function(message) {
			bot.listenedSentence=(message.sentence).toString();
			bot.listened=true;
		}).bind(this));

	}
	
	function findBot(bot){
		var robot=null;
		var exit=false;
		for(var i=0; i<bots.length && !exit; i++){
			if(bots[i].name==bot){
				robot=bots[i];
				exit=true;
			}
		}
		return robot;
	}
	
	function deleteBot(bot){
		var i;
		var aux;

		for(i=0; i<bots.length; i++){
			if(bots[i].name==bot){
				aux=i;
			}
		}
		
		bots.splice(aux,1);
		if(i==1) connected=0;
		return i;
	}

    ext._getStatus = function() {
		if(connected==0) 
			return {status: 1, msg: 'Desconectado'};
		else
			return {status: 2, msg: 'Conectado'};
    }
	
	ext.connectBot = function(bot,ip){
		var aux;
		var found=false;
		var botAux=bot.toString();
		var ipAux=ip.toString();
		for(var i=0; i<bots.length && !found; i++){
			if((bots[i].name==botAux) || (bots[i].ip==ipAux)){
				found=true;
			}
		}
			
		if(!found){
			aux = new ROSBot(botAux,ipAux);
			bots.push(aux);
			//if (aux.connected == 1 ) ext._getStatus();
		}
	}
	
	ext.disconnectBot = function(bot){
		deleteBot(bot);
	}
	
	ext.setLanguage = function(bot,select,language,voice,callback){
		var index;
		var lang;
		var request;
		var robot=findBot(bot);
		
		if(robot!=null){
			switch (language){
				case 'English':
					lang=0;
					if(voice=='Male') index=0;
					else index=1;
					break;
				case 'Spanish':
					lang=1;
					if(voice=='Male') index=2;
					else index=3;
					break;
				case 'Catalan': lang=2; index=4;
					break;
				case 'French': lang=3; index=5;
					break;
				default: index=0;break;		
			}
			
			var req;
				if(lang == 2 || lang == 3) {
					//Espeak
					req = new ROSLIB.Message({
						data : 3
					})
				} else {
					//Festival
					req = new ROSLIB.Message({
						data : 0
					})
			}
			
			request = new ROSLIB.ServiceRequest({
					language : lang
			});
			
			if(select == 'all'){
				robot.listeners.ttsSdk.publish(req);
				setTimeout(function(){	
					robot.setLanguageTTS.callService(request, (function(result1) {
					}).bind($(this)));
						

					robot.listeners.asrSdk.publish(req);
					setTimeout(function(){
						robot.setLanguageASR.callService(request, (function(result) {
						}).bind($(this)));

						
						request = new ROSLIB.ServiceRequest({
							voice :  index
						})

						robot.setVoice.callService(request, (function(response) {
						}));
						
						callback();
					},12000);
				},2000);
			}
			else if(select == 'TTS'){
				robot.listeners.ttsSdk.publish(req);
				setTimeout(function(){
					robot.setLanguageTTS.callService(request, (function(result1) {
					}).bind($(this)));
					
					request = new ROSLIB.ServiceRequest({
						voice :  index
					})

					robot.setVoice.callService(request, (function(response) {
					}));
						
					callback();
				},2000);
			}
			else{
				robot.listeners.asrSdk.publish(req);
				setTimeout(function(){
					robot.setLanguageASR.callService(request, (function(result) {
					}).bind($(this)));
					callback();
				},12000);
			}
		}
	}
	
	function makeList(list){
		var newWord=false;
		var comp=false;
		var word='';
		var newList=[];

		for(var i=0; i<list.length; i++){
			if(!newWord){
				if(list[i] == '"'){
					newWord=true;
					comp=true;
				}
				else{
					if(list[i] != ' '){
						newWord=true;
						word+=list[i];
					}
				}
			}
			else{
				if((list[i]=='"' && comp && newWord) || (list[i]==' ' && !comp && newWord) || (i==(list.length-1) && newWord)){
					if(i==list.length-1 && !comp)
						word+=list[i];
					newWord=false;
					comp=false;
					newList.push(word);
					word="";
				}
				else{
					word+=list[i];
				}
			}
		}

		return newList;
	}
	
	ext.setGrammar = function(bot,list,callback){
		var robot=findBot(bot);

		var lAux=makeList(list);
		
		var gram = lAux.join('|').toString();
		
		if(robot!=null){
			var request = new ROSLIB.ServiceRequest({
				grammar : gram
			});
		
			robot.setGrammar.callService(request, function(result1){
				if(callback!=null)
					callback();
			});
		}
	}
	
	ext.setEmotion = function(bot,emotion,block,callback){
		var robot=findBot(bot);
		var state;
		
		if(robot!=null){
			switch(emotion){
				case 'Normal':
					state = 1;
					break;
				case 'Sad':
					state = 2;
					break;
				case 'Happy':
					state = 3;
					break;
				case 'Angry':
					state = 4;
					break;
				case 'Indifferent':
					state = 5;
					break;
				case 'Surprise':
					state = 6;
					break;
				case 'Disgust':
					state = 7;
					break;
				case 'Relief':
					state = 8;
					break;
				case 'Reproach':
					state = 9;
					break;
				case 'Pride':
					state = 10;
					break;
				case 'Admiration':
					state = 11;
					break;
				case 'Scared':
					state = 12;
					break;
				case 'Sleep':
					state = 13;
					break;
				case 'NoEmotion':
					state = 14;
					break;
				default:
					state = 1;
					break;
			}
			
			var request = new ROSLIB.ServiceRequest({
				emotion : state
			});
			
			robot.setEmotion.callService(request, function(result1){
				if(block == 'block')
					callback();
			});
			
			if(block != 'block')
				callback();
		}
	}
	
	function botSay(bot,text,moving,callback){
		var robot=findBot(bot);
		
		if(robot!=null){
			var sayRequest =  new ROSLIB.ServiceRequest({
				sentence : text,
				moveMouth : moving
			});
					
			robot.sayService.callService(sayRequest, function( result1 ){
				if(callback!=null)
					callback();
			});
		}
	}
	
	ext.sayWithout = function(bot,text,block,callback){
		if(block == 'block')
			botSay(bot,text.toString(),false,callback);
		else{
			botSay(bot,text.toString(),false,null);
			callback();
		}
	}
	
	ext.sayWith = function(bot,text,block,callback){
		if(block == 'block')
			botSay(bot,text.toString(),true,callback);
		else{
			botSay(bot,text.toString(),true,null);
			callback();
		}
	}
	
	ext.sayList = function(bot,list,moving,block,callback){
		var m=false;
		if(list!=null){
			var auxList = list.split(". ");
			var len = auxList.length;
			var num = Math.floor(0 + (1+(len-1)-0)*Math.random());
			var text=auxList[num];
			
			if(moving=='with') m=true;
			
			if(block=='block') botSay(bot,text,m,callback);
			else{
				botSay(bot,text.toString(),m,null);
				callback();
			}
		}
	}

	ext.playSound = function(bot,sound,block,callback){
		/*var robot=findBot(bot);
		
		if(robot!=null){
			var playRequest =  new ROSLIB.ServiceRequest({
				filename : sound
			});
					
			robot.playService.callService(playRequest, function( result1 ){
				//if(callback!=null)
				if(block=='block')
					callback();
			});
		}

		if(block!='block')
			callback();*/
		callback();
	}
	
	function moveServo(bot,position,time,servo,callback){
		var robot=findBot(bot);
		
		if(robot!=null){
			// The request is an object used to send the parameters to the service
			var request = new ROSLIB.ServiceRequest({
				servo : servo, 
				position : position,
				time : time 
			});
			
			// And now we use the method callService, this is where themagic happens.
			robot.moveHeadService.callService(request, function( result ){
				if(callback!=null)
					callback();
			});
		}
	}
	
	ext.moveHeadH = function(bot,position,time,block,callback){
		if(block == 'block')
			moveServo(bot,position,time,0,callback);
		else{
			moveServo(bot,position,time,0,null);
			callback();
		}
	}
	
	ext.moveHeadV = function(bot,position,time,block,callback){
		if(block == 'block')
			moveServo(bot,position,time,1,callback);
		else{
			moveServo(bot,position,time,1,null);
			callback();
		}
	}
	
	ext.moveEyebrows = function(bot,position,time,block,callback){
		if(block == 'block')
			moveServo(bot,position,time,3,callback);
		else{
			moveServo(bot,position,time,3,null);
			callback();
		}
	}
	
	ext.moveEyes = function(bot,position,time,block,callback){
		if(block == 'block')
			moveServo(bot,position,time,2,callback);
		else{
			moveServo(bot,position,time,2,null);
			callback();
		}
	}
	
	function moveBot(bot,time,direction,callback){
		var robot = findBot(bot);
		
		if(robot!=null){
			if(!moving || (direction==5 && moving)){
				var request = new ROSLIB.ServiceRequest({
					cmd : direction,
					time : time,
					vel : 5
				});
					
				robot.move.callService(request, function( result ){
					if(time == -2)	robot.moving = true;
					if(direction == 5) robot.moving = false;
					if(callback != null)
						callback();
				});
			}
		}
	}
	
	ext.moveForward = function(bot,time,callback){
		moveBot(bot,time,1,callback);
	}
	
	ext.moveForwardI = function(bot,callback){
		moveBot(bot,-2,1,callback);
	}
	
	ext.moveBackwards = function(bot,time,callback){
		moveBot(bot,time,2,callback);
	}
	
	ext.moveBackwardsI = function(bot,callback){
		moveBot(bot,-2,2,callback);
	}
	
	ext.rotateLeft = function(bot,time,callback){
		moveBot(bot,time,3,callback);
	}
	
	ext.rotateLeftI = function(bot,callback){
		moveBot(bot,-2,3,callback);
	}
	
	ext.rotateRight  = function(bot,time,callback){
		moveBot(bot,time,4,callback);
	}
	
	ext.rotateRightI  = function(bot,callback){
		moveBot(bot,-2,4,callback);
	}
	
	ext.stopBot = function(bot,callback){
		moveBot(bot,1,5,callback);
	}
	
	ext.hearth = function(bot,r,g,b,time,block,callback){
		var robot=findBot(bot);
		
		if(robot!=null){
			// LED 
			var colorRequest = new ROSLIB.ServiceRequest({
				red : r/255,
				green : g/255,
				blue : b/255,
				time : time
			});
			
			robot.setColor.callService(colorRequest, function( result1 ){
				if(block == 'block')
					callback();
			});
		}
		if(block != 'block')
			callback();
	}
	
	ext.mouthDraw = function(bot,picture,block,callback){
		var robot=findBot(bot);
		
		if(robot!=null){
			//Mouth draw - Draw a image in the LedMatrix by a 70 char string 
			var drawRequest = new ROSLIB.ServiceRequest({
				picture : picture
			}); 				
			
			robot.mouthDraw.callService(drawRequest, function( result1 ) {
				if(block == 'block')
					callback();
			});
		}
		
		if(block != 'block')
			callback();
	}
	
	ext.mouthWrite = function(bot,text,block,callback){
		var robot=findBot(bot);
		
		if(robot!=null){
			// Mouth print - print a given text in the LedMatrix
			var printRequest = new ROSLIB.ServiceRequest({
				sentence : (text.toString()).toUpperCase(),
				speed : 1
			});
			
			robot.mouthPrint.callService(printRequest, function( result1 ){
				if(block == 'block')
					callback();
			});
					
			if(block != 'block')
				callback();
		}
	}
	
	ext.botTouched = function(bot,side){
		var robot=findBot(bot);
	
		switch (side){
			case 'head':
				if(robot.touchedHead){
					robot.touchedHead = false;
					return true;
					break;
				}
			case 'left':
				if(robot.touchedLeft){
					robot.touchedLeft = false;
					return true;
					break;
				}
			case 'right':
				if(robot.touchedRight){
					robot.touchedRight = false;
					return true;
					break;
				}
			default:
				return false;
				break;
		}
		
	}
	
	ext.botMoved = function(bot,position){
		var robot=findBot(bot);
	
		switch(position){
			case '0':
				if (robot.currentPosition==0 && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			case '1':
				if (robot.currentPosition==1 && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			case '2':
				if (robot.currentPosition==2 && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			case '3':
				if (robot.currentPosition==3 && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			case '4':
				if (robot.currentPosition==4 && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			default: return false;
		}
	}
	
	ext.botHeard = function(bot,sentence){
		var robot=findBot(bot);
		
		if(robot.listened){
			if(robot.listenedSentence==sentence.toString()){
				robot.listened=false;
				return true;
			}
		}
		else
			return false;
	}
	
	var scratchList = ['Norman', 'Jesus', 'Raul', 'Diego', 'Chris'];


	/*var scratchAudioList = getSounds();

	function getSounds(){
			var getSoundsRequest = new ROSLIB.ServiceRequest({
				filter : "scratch-*"
			});
			
			robot.getAudioList.callService(getSoundsRequest, function( result1 ){
				return result1;
			});
	}*/

    var descriptor = {
        blocks: [
			[' ', 'connect %s to ip %s', 'connectBot', 'bot1', '192.168.1.110'],
			[' ', 'disconnect %s', 'disconnectBot', 'bot1'],
			['w', 'set %s %m.selectLan language to %m.textLanguage with %m.voiceLanguage voice', 'setLanguage', 'bot1', 'all','English', 'Male'],
			['w', 'set %s grammar to %s', 'setGrammar', 'bot1', 'list'],
			['w', 'set %s to %m.states state %m.blocking', 'setEmotion', 'bot1', 'Normal', 'block'],
			['w', '%s say %s without moving mouth %m.blocking', 'sayWithout', 'bot1','text to say', 'block'],
			['w', '%s say %s moving mouth %m.blocking', 'sayWith', 'bot1', 'text to say', 'block'],
			['w', '%s say one of the %s %m.saying moving mouth %m.blocking', 'sayList', 'bot1', 'list','with','block'],
			['w', '%s play %m.soundList sound %m.blocking', 'playSound', 'bot1', '', 'block'],
			['w', 'move head horizontal of %s to %n in %n seconds %m.blocking', 'moveHeadH', 'bot1',0.5, 1, 'no block'],
			['w', 'move head vertical of %s to %n in %n seconds %m.blocking', 'moveHeadV', 'bot1',0.5, 1, 'no block'],
			['w', 'move eyebrows of %s to %n in %n seconds %m.blocking', 'moveEyebrows', 'bot1',0.5, 1, 'no block'],
			['w', 'move eyes of %s to %n in %n seconds %m.blocking', 'moveEyes', 'bot1',0.5, 1, 'no block'],
			['w', 'move %s forward %n seconds', 'moveForward', 'bot1', 1],
			['w', 'move %s forward indefinitely', 'moveForwardI', 'bot1'],
			['w', 'move %s backwards %n seconds', 'moveBackwards', 'bot1', 1],
			['w', 'move %s backwards indefinitely', 'moveBackwardsI', 'bot1'],
			['w', 'rotate %s left %n seconds', 'rotateLeft', 'bot1', 1],
			['w', 'rotate %s left indefinitely', 'rotateLeftI', 'bot1'],
			['w', 'rotate %s right %n seconds', 'rotateRight', 'bot1', 1],
			['w', 'rotate %s right indefinitely', 'rotateRightI', 'bot1'],
			['w', 'stop %s', 'stopBot', 'bot1'],
			['w', 'change hearth color of %s to: red %n green %n blue %n in %n secs %m.blocking', 'hearth', 'bot1', 255, 255, 255, 1, 'no block'],
			['w', 'draw in mouth of %s picture %s %m.blocking', 'mouthDraw','bot1','000000000000000000000x000000x000x0000x00000x00x0000000xx00000000000000','no block'],
			['w', 'write in mouth of %s text %s %m.blocking', 'mouthWrite','bot1','text to write','no block'],
			['h', 'when bot %s is touched at %m.sides', 'botTouched', 'bot1', 'head'],
			['h', 'when bot %s is in position %m.positions', 'botMoved', 'bot1', '0'],
			['h', 'when bot %s hears %s', 'botHeard', 'bot1', 'sentence'],
        ],
		menus: {
			selectLan: ['all', 'ASR', 'TTS'],
			textLanguage: ['English', 'Spanish', 'Catalan', 'French'],
			voiceLanguage: ['Male','Female'],
			states: ['Normal', 'Sad', 'Happy', 'Angry', 'Indifferent', 'Surprise', 'Disgust', 'Relief', 'Reproach', 'Pride', 'Admiration', 'Scared', 'Sleep', 'NoEmotion'],
			saying: ['with','without'],
			sides: ['head', 'left', 'right'],
			positions: [0, 1, 2, 3, 4],
			blocking: ['block', 'no block'],
			soundList: scratchList
		},
    };
    ScratchExtensions.register('Aisoy Extension', descriptor, ext);
})({});
