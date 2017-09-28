/*
copyright 2014 Aisoy Robotics S.L.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

 AUTHOR: Norman Pérez Sánchez <nperez@aisoy.com>
*/
//AIROS 4.2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EVENTMITTER 2

!function(d,b){var e=Array.isArray?Array.isArray:function h(k){return Object.prototype.toString.call(k)==="[object Array]"};var f=10;function i(){this._events={};if(this._conf){a.call(this,this._conf)}}function a(k){if(k){this._conf=k;k.delimiter&&(this.delimiter=k.delimiter);k.maxListeners&&(this._events.maxListeners=k.maxListeners);k.wildcard&&(this.wildcard=k.wildcard);k.newListener&&(this.newListener=k.newListener);if(this.wildcard){this.listenerTree={}}}}function j(k){this._events={};this.newListener=false;a.call(this,k)}function c(l,t,y,n){if(!y){return[]}var u=[],q,p,w,x,s,r,m,k=t.length,o=t[n],v=t[n+1];if(n===k&&y._listeners){if(typeof y._listeners==="function"){l&&l.push(y._listeners);return[y]}else{for(q=0,p=y._listeners.length;q<p;q++){l&&l.push(y._listeners[q])}return[y]}}if((o==="*"||o==="**")||y[o]){if(o==="*"){for(w in y){if(w!=="_listeners"&&y.hasOwnProperty(w)){u=u.concat(c(l,t,y[w],n+1))}}return u}else{if(o==="**"){m=(n+1===k||(n+2===k&&v==="*"));if(m&&y._listeners){u=u.concat(c(l,t,y,k))}for(w in y){if(w!=="_listeners"&&y.hasOwnProperty(w)){if(w==="*"||w==="**"){if(y[w]._listeners&&!m){u=u.concat(c(l,t,y[w],k))}u=u.concat(c(l,t,y[w],n))}else{if(w===v){u=u.concat(c(l,t,y[w],n+2))}else{u=u.concat(c(l,t,y[w],n))}}}}return u}}u=u.concat(c(l,t,y[o],n+1))}x=y["*"];if(x){c(l,t,x,n+1)}s=y["**"];if(s){if(n<k){if(s._listeners){c(l,t,s,k)}for(w in s){if(w!=="_listeners"&&s.hasOwnProperty(w)){if(w===v){c(l,t,s[w],n+2)}else{if(w===o){c(l,t,s[w],n+1)}else{r={};r[w]=s[w];c(l,t,{"**":r},n+1)}}}}}else{if(s._listeners){c(l,t,s,k)}else{if(s["*"]&&s["*"]._listeners){c(l,t,s["*"],k)}}}}return u}function g(q,r){q=typeof q==="string"?q.split(this.delimiter):q.slice();for(var p=0,n=q.length;p+1<n;p++){if(q[p]==="**"&&q[p+1]==="**"){return}}var l=this.listenerTree;var o=q.shift();while(o){if(!l[o]){l[o]={}}l=l[o];if(q.length===0){if(!l._listeners){l._listeners=r}else{if(typeof l._listeners==="function"){l._listeners=[l._listeners,r]}else{if(e(l._listeners)){l._listeners.push(r);if(!l._listeners.warned){var k=f;if(typeof this._events.maxListeners!=="undefined"){k=this._events.maxListeners}if(k>0&&l._listeners.length>k){l._listeners.warned=true;console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",l._listeners.length);console.trace()}}}}}return true}o=q.shift()}return true}j.prototype.delimiter=".";j.prototype.setMaxListeners=function(k){this._events||i.call(this);this._events.maxListeners=k;if(!this._conf){this._conf={}}this._conf.maxListeners=k};j.prototype.event="";j.prototype.once=function(l,k){this.many(l,1,k);return this};j.prototype.many=function(n,k,m){var l=this;if(typeof m!=="function"){throw new Error("many only accepts instances of Function")}function o(){if(--k===0){l.off(n,o)}m.apply(this,arguments)}o._origin=m;this.on(n,o);return l};j.prototype.emit=function(){this._events||i.call(this);var r=arguments[0];if(r==="newListener"&&!this.newListener){if(!this._events.newListener){return false}}if(this._all){var k=arguments.length;var m=new Array(k-1);for(var n=1;n<k;n++){m[n-1]=arguments[n]}for(n=0,k=this._all.length;n<k;n++){this.event=r;this._all[n].apply(this,m)}}if(r==="error"){if(!this._all&&!this._events.error&&!(this.wildcard&&this.listenerTree.error)){if(arguments[1] instanceof Error){throw arguments[1]}else{throw new Error("Uncaught, unspecified 'error' event.")}return false}}var q;if(this.wildcard){q=[];var p=typeof r==="string"?r.split(this.delimiter):r.slice();c.call(this,q,p,this.listenerTree,0)}else{q=this._events[r]}if(typeof q==="function"){this.event=r;if(arguments.length===1){q.call(this)}else{if(arguments.length>1){switch(arguments.length){case 2:q.call(this,arguments[1]);break;case 3:q.call(this,arguments[1],arguments[2]);break;default:var k=arguments.length;var m=new Array(k-1);for(var n=1;n<k;n++){m[n-1]=arguments[n]}q.apply(this,m)}}}return true}else{if(q){var k=arguments.length;var m=new Array(k-1);for(var n=1;n<k;n++){m[n-1]=arguments[n]}var o=q.slice();for(var n=0,k=o.length;n<k;n++){this.event=r;o[n].apply(this,m)}return(o.length>0)||this._all}else{return this._all}}};j.prototype.on=function(l,n){if(typeof l==="function"){this.onAny(l);return this}if(typeof n!=="function"){throw new Error("on only accepts instances of Function")}this._events||i.call(this);this.emit("newListener",l,n);if(this.wildcard){g.call(this,l,n);return this}if(!this._events[l]){this._events[l]=n}else{if(typeof this._events[l]==="function"){this._events[l]=[this._events[l],n]}else{if(e(this._events[l])){this._events[l].push(n);if(!this._events[l].warned){var k=f;if(typeof this._events.maxListeners!=="undefined"){k=this._events.maxListeners}if(k>0&&this._events[l].length>k){this._events[l].warned=true;console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[l].length);console.trace()}}}}}return this};j.prototype.onAny=function(k){if(!this._all){this._all=[]}if(typeof k!=="function"){throw new Error("onAny only accepts instances of Function")}this._all.push(k);return this};j.prototype.addListener=j.prototype.on;j.prototype.off=function(q,l){if(typeof l!=="function"){throw new Error("removeListener only takes instances of Function")}var m,t=[];if(this.wildcard){var r=typeof q==="string"?q.split(this.delimiter):q.slice();t=c.call(this,null,r,this.listenerTree,0)}else{if(!this._events[q]){return this}m=this._events[q];t.push({_listeners:m})}for(var s=0;s<t.length;s++){var p=t[s];m=p._listeners;if(e(m)){var o=-1;for(var n=0,k=m.length;n<k;n++){if(m[n]===l||(m[n].listener&&m[n].listener===l)||(m[n]._origin&&m[n]._origin===l)){o=n;break}}if(o<0){return this}if(this.wildcard){p._listeners.splice(o,1)}else{this._events[q].splice(o,1)}if(m.length===0){if(this.wildcard){delete p._listeners}else{delete this._events[q]}}}else{if(m===l||(m.listener&&m.listener===l)||(m._origin&&m._origin===l)){if(this.wildcard){delete p._listeners}else{delete this._events[q]}}}}return this};j.prototype.offAny=function(o){var n=0,k=0,m;if(o&&this._all&&this._all.length>0){m=this._all;for(n=0,k=m.length;n<k;n++){if(o===m[n]){m.splice(n,1);return this}}}else{this._all=[]}return this};j.prototype.removeListener=j.prototype.off;j.prototype.removeAllListeners=function(o){if(arguments.length===0){!this._events||i.call(this);return this}if(this.wildcard){var n=typeof o==="string"?o.split(this.delimiter):o.slice();var m=c.call(this,null,n,this.listenerTree,0);for(var l=0;l<m.length;l++){var k=m[l];k._listeners=null}}else{if(!this._events[o]){return this}this._events[o]=null}return this};j.prototype.listeners=function(m){if(this.wildcard){var k=[];var l=typeof m==="string"?m.split(this.delimiter):m.slice();c.call(this,k,l,this.listenerTree,0);return k}this._events||i.call(this);if(!this._events[m]){this._events[m]=[]}if(!e(this._events[m])){this._events[m]=[this._events[m]]}return this._events[m]};j.prototype.listenersAny=function(){if(this._all){return this._all}else{return[]}};if(typeof define==="function"&&define.amd){define(function(){return j})}else{d.EventEmitter2=j}}(typeof process!=="undefined"&&typeof process.title!=="undefined"&&typeof exports!=="undefined"?exports:window);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ROSLIB LIBRARY
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ROSLIB=ROSLIB||{REVISION:"6"};ROSLIB.URDF_SPHERE=0,ROSLIB.URDF_BOX=1,ROSLIB.URDF_CYLINDER=2,ROSLIB.URDF_MESH=3,ROSLIB.ActionClient=function(t){var e=this;t=t||{},this.ros=t.ros,this.serverName=t.serverName,this.actionName=t.actionName,this.timeout=t.timeout,this.goals={};var i=!1,s=new ROSLIB.Topic({ros:this.ros,name:this.serverName+"/feedback",messageType:this.actionName+"Feedback"}),n=new ROSLIB.Topic({ros:this.ros,name:this.serverName+"/status",messageType:"actionlib_msgs/GoalStatusArray"}),o=new ROSLIB.Topic({ros:this.ros,name:this.serverName+"/result",messageType:this.actionName+"Result"});this.goalTopic=new ROSLIB.Topic({ros:this.ros,name:this.serverName+"/goal",messageType:this.actionName+"Goal"}),this.cancelTopic=new ROSLIB.Topic({ros:this.ros,name:this.serverName+"/cancel",messageType:"actionlib_msgs/GoalID"}),this.goalTopic.advertise(),this.cancelTopic.advertise(),n.subscribe(function(t){i=!0,t.status_list.forEach(function(t){var i=e.goals[t.goal_id.id];i&&i.emit("status",t)})}),s.subscribe(function(t){var i=e.goals[t.status.goal_id.id];i&&(i.emit("status",t.status),i.emit("feedback",t.feedback))}),o.subscribe(function(t){var i=e.goals[t.status.goal_id.id];i&&(i.emit("status",t.status),i.emit("result",t.result))}),this.timeout&&setTimeout(function(){i||e.emit("timeout")},this.timeout)},ROSLIB.ActionClient.prototype.__proto__=EventEmitter2.prototype,ROSLIB.ActionClient.prototype.cancel=function(){var t=new ROSLIB.Message;this.cancelTopic.publish(t)},ROSLIB.Goal=function(t){var e=this;this.actionClient=t.actionClient,this.goalMessage=t.goalMessage,this.isFinished=!1;var i=new Date;this.goalID="goal_"+Math.random()+"_"+i.getTime(),this.goalMessage=new ROSLIB.Message({goal_id:{stamp:{secs:0,nsecs:0},id:this.goalID},goal:this.goalMessage}),this.on("status",function(t){e.status=t}),this.on("result",function(t){e.isFinished=!0,e.result=t}),this.on("feedback",function(t){e.feedback=t}),this.actionClient.goals[this.goalID]=this},ROSLIB.Goal.prototype.__proto__=EventEmitter2.prototype,ROSLIB.Goal.prototype.send=function(t){var e=this;e.actionClient.goalTopic.publish(e.goalMessage),t&&setTimeout(function(){e.isFinished||e.emit("timeout")},t)},ROSLIB.Goal.prototype.cancel=function(){var t=new ROSLIB.Message({id:this.goalID});this.actionClient.cancelTopic.publish(t)},ROSLIB.Message=function(t){var e=this;t=t||{},Object.keys(t).forEach(function(i){e[i]=t[i]})},ROSLIB.Param=function(t){t=t||{},this.ros=t.ros,this.name=t.name},ROSLIB.Param.prototype.get=function(t){var e=new ROSLIB.Service({ros:this.ros,name:"/rosapi/get_param",serviceType:"rosapi/GetParam"}),i=new ROSLIB.ServiceRequest({name:this.name,value:JSON.stringify("")});e.callService(i,function(e){var i=JSON.parse(e.value);t(i)})},ROSLIB.Param.prototype.set=function(t){var e=new ROSLIB.Service({ros:this.ros,name:"/rosapi/set_param",serviceType:"rosapi/SetParam"}),i=new ROSLIB.ServiceRequest({name:this.name,value:JSON.stringify(t)});e.callService(i,function(){})},ROSLIB.Ros=function(t){t=t||{};var e=t.url;this.socket=null,this.idCounter=0,this.setMaxListeners(0),e&&this.connect(e)},ROSLIB.Ros.prototype.__proto__=EventEmitter2.prototype,ROSLIB.Ros.prototype.connect=function(t){function e(t){a.emit("connection",t)}function i(t){a.emit("close",t)}function s(t){a.emit("error",t)}function n(t,e){var i=new Image;i.onload=function(){var t=document.createElement("canvas"),s=t.getContext("2d");t.width=i.width,t.height=i.height,s.drawImage(i,0,0);for(var n=s.getImageData(0,0,i.width,i.height).data,o="",a=0;n.length>a;a+=4)o+=String.fromCharCode(n[a],n[a+1],n[a+2]);var r=JSON.parse(o);e(r)},i.src="data:image/png;base64,"+t.data}function o(t){function e(t){"publish"===t.op?a.emit(t.topic,t.msg):"service_response"===t.op&&a.emit(t.id,t.values)}var i=JSON.parse(t.data);"png"===i.op?n(i,function(t){e(t)}):e(i)}var a=this;this.socket=new WebSocket(t),this.socket.onopen=e,this.socket.onclose=i,this.socket.onerror=s,this.socket.onmessage=o},ROSLIB.Ros.prototype.close=function(){this.socket&&this.socket.close()},ROSLIB.Ros.prototype.authenticate=function(t,e,i,s,n,o,a){var r={op:"auth",mac:t,client:e,dest:i,rand:s,t:n,level:o,end:a};this.callOnConnection(r)},ROSLIB.Ros.prototype.callOnConnection=function(t){var e=this,i=JSON.stringify(t);this.socket&&this.socket.readyState===WebSocket.OPEN?e.socket.send(i):e.once("connection",function(){e.socket.send(i)})},ROSLIB.Ros.prototype.getTopics=function(t){var e=new ROSLIB.Service({ros:this,name:"/rosapi/topics",serviceType:"rosapi/Topics"}),i=new ROSLIB.ServiceRequest;e.callService(i,function(e){t(e.topics)})},ROSLIB.Ros.prototype.getServices=function(t){var e=new ROSLIB.Service({ros:this,name:"/rosapi/services",serviceType:"rosapi/Services"}),i=new ROSLIB.ServiceRequest;e.callService(i,function(e){t(e.services)})},ROSLIB.Ros.prototype.getParams=function(t){var e=new ROSLIB.Service({ros:this,name:"/rosapi/get_param_names",serviceType:"rosapi/GetParamNames"}),i=new ROSLIB.ServiceRequest;e.callService(i,function(e){t(e.names)})},ROSLIB.Service=function(t){t=t||{},this.ros=t.ros,this.name=t.name,this.serviceType=t.serviceType},ROSLIB.Service.prototype.callService=function(t,e){this.ros.idCounter++;var i="call_service:"+this.name+":"+this.ros.idCounter;this.ros.once(i,function(t){var i=new ROSLIB.ServiceResponse(t);e(i)});var s=[];Object.keys(t).forEach(function(e){s.push(t[e])});var n={op:"call_service",id:i,service:this.name,args:s};this.ros.callOnConnection(n)},ROSLIB.ServiceRequest=function(t){var e=this;t=t||{},Object.keys(t).forEach(function(i){e[i]=t[i]})},ROSLIB.ServiceResponse=function(t){var e=this;t=t||{},Object.keys(t).forEach(function(i){e[i]=t[i]})},ROSLIB.Topic=function(t){t=t||{},this.ros=t.ros,this.name=t.name,this.messageType=t.messageType,this.isAdvertised=!1,this.compression=t.compression||"none",this.throttle_rate=t.throttle_rate||0,this.compression&&"png"!==this.compression&&"none"!==this.compression&&this.emit("warning",this.compression+" compression is not supported. No compression will be used."),0>this.throttle_rate&&(this.emit("warning",this.throttle_rate+" is not allowed. Set to 0"),this.throttle_rate=0)},ROSLIB.Topic.prototype.__proto__=EventEmitter2.prototype,ROSLIB.Topic.prototype.subscribe=function(t){var e=this;this.on("message",function(e){t(e)}),this.ros.on(this.name,function(t){var i=new ROSLIB.Message(t);e.emit("message",i)}),this.ros.idCounter++;var i="subscribe:"+this.name+":"+this.ros.idCounter,s={op:"subscribe",id:i,type:this.messageType,topic:this.name,compression:this.compression,throttle_rate:this.throttle_rate};this.ros.callOnConnection(s)},ROSLIB.Topic.prototype.unsubscribe=function(){this.ros.removeAllListeners([this.name]),this.ros.idCounter++;var t="unsubscribe:"+this.name+":"+this.ros.idCounter,e={op:"unsubscribe",id:t,topic:this.name};this.ros.callOnConnection(e)},ROSLIB.Topic.prototype.advertise=function(){this.ros.idCounter++;var t="advertise:"+this.name+":"+this.ros.idCounter,e={op:"advertise",id:t,type:this.messageType,topic:this.name};this.ros.callOnConnection(e),this.isAdvertised=!0},ROSLIB.Topic.prototype.unadvertise=function(){this.ros.idCounter++;var t="unadvertise:"+this.name+":"+this.ros.idCounter,e={op:"unadvertise",id:t,topic:this.name};this.ros.callOnConnection(e),this.isAdvertised=!1},ROSLIB.Topic.prototype.publish=function(t){this.isAdvertised||this.advertise(),this.ros.idCounter++;var e="publish:"+this.name+":"+this.ros.idCounter,i={op:"publish",id:e,topic:this.name,msg:t};this.ros.callOnConnection(i)},ROSLIB.Pose=function(t){t=t||{},this.position=new ROSLIB.Vector3(t.position),this.orientation=new ROSLIB.Quaternion(t.orientation)},ROSLIB.Pose.prototype.applyTransform=function(t){this.position.multiplyQuaternion(t.rotation),this.position.add(t.translation);var e=t.rotation.clone();e.multiply(this.orientation),this.orientation=e},ROSLIB.Pose.prototype.clone=function(){return new ROSLIB.Pose(this)},ROSLIB.Quaternion=function(t){t=t||{},this.x=t.x||0,this.y=t.y||0,this.z=t.z||0,this.w=t.w||1},ROSLIB.Quaternion.prototype.conjugate=function(){this.x*=-1,this.y*=-1,this.z*=-1},ROSLIB.Quaternion.prototype.normalize=function(){var t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);0===t?(this.x=0,this.y=0,this.z=0,this.w=1):(t=1/t,this.x=this.x*t,this.y=this.y*t,this.z=this.z*t,this.w=this.w*t)},ROSLIB.Quaternion.prototype.invert=function(){this.conjugate(),this.normalize()},ROSLIB.Quaternion.prototype.multiply=function(t){var e=this.x*t.w+this.y*t.z-this.z*t.y+this.w*t.x,i=-this.x*t.z+this.y*t.w+this.z*t.x+this.w*t.y,s=this.x*t.y-this.y*t.x+this.z*t.w+this.w*t.z,n=-this.x*t.x-this.y*t.y-this.z*t.z+this.w*t.w;this.x=e,this.y=i,this.z=s,this.w=n},ROSLIB.Quaternion.prototype.clone=function(){return new ROSLIB.Quaternion(this)},ROSLIB.Transform=function(t){t=t||{},this.translation=new ROSLIB.Vector3(t.translation),this.rotation=new ROSLIB.Quaternion(t.rotation)},ROSLIB.Transform.prototype.clone=function(){return new ROSLIB.Transform(this)},ROSLIB.Vector3=function(t){t=t||{},this.x=t.x||0,this.y=t.y||0,this.z=t.z||0},ROSLIB.Vector3.prototype.add=function(t){this.x+=t.x,this.y+=t.y,this.z+=t.z},ROSLIB.Vector3.prototype.subtract=function(t){this.x-=t.x,this.y-=t.y,this.z-=t.z},ROSLIB.Vector3.prototype.multiplyQuaternion=function(t){var e=t.w*this.x+t.y*this.z-t.z*this.y,i=t.w*this.y+t.z*this.x-t.x*this.z,s=t.w*this.z+t.x*this.y-t.y*this.x,n=-t.x*this.x-t.y*this.y-t.z*this.z;this.x=e*t.w+n*-t.x+i*-t.z-s*-t.y,this.y=i*t.w+n*-t.y+s*-t.x-e*-t.z,this.z=s*t.w+n*-t.z+e*-t.y-i*-t.x},ROSLIB.Vector3.prototype.clone=function(){return new ROSLIB.Vector3(this)},ROSLIB.TFClient=function(t){t=t||{},this.ros=t.ros,this.fixedFrame=t.fixedFrame||"/base_link",this.angularThres=t.angularThres||2,this.transThres=t.transThres||.01,this.rate=t.rate||10,this.goalUpdateDelay=t.goalUpdateDelay||50,this.currentGoal=!1,this.frameInfos={},this.goalUpdateRequested=!1,this.actionClient=new ROSLIB.ActionClient({ros:this.ros,serverName:"/tf2_web_republisher",actionName:"tf2_web_republisher/TFSubscriptionAction"})},ROSLIB.TFClient.prototype.processFeedback=function(t){var e=this;t.transforms.forEach(function(t){var i=t.child_frame_id,s=e.frameInfos[i];void 0!==s&&(s.transform=new ROSLIB.Transform({translation:t.transform.translation,rotation:t.transform.rotation}),s.cbs.forEach(function(t){t(s.transform)}))})},ROSLIB.TFClient.prototype.updateGoal=function(){this.currentGoal&&this.currentGoal.cancel();var t={source_frames:[],target_frame:this.fixedFrame,angular_thres:this.angularThres,trans_thres:this.transThres,rate:this.rate};for(var e in this.frameInfos)t.source_frames.push(e);this.currentGoal=new ROSLIB.Goal({actionClient:this.actionClient,goalMessage:t}),this.currentGoal.on("feedback",this.processFeedback.bind(this)),this.currentGoal.send(),this.goalUpdateRequested=!1},ROSLIB.TFClient.prototype.subscribe=function(t,e){"/"===t[0]&&(t=t.substring(1)),void 0===this.frameInfos[t]?(this.frameInfos[t]={cbs:[]},this.goalUpdateRequested||(setTimeout(this.updateGoal.bind(this),this.goalUpdateDelay),this.goalUpdateRequested=!0)):void 0!==this.frameInfos[t].transform&&e(this.frameInfos[t].transform),this.frameInfos[t].cbs.push(e)},ROSLIB.TFClient.prototype.unsubscribe=function(t,e){var i=this.frameInfos[t];if(void 0!==i){var s=i.cbs.indexOf(e);s>=0&&(i.cbs.splice(s,1),0===i.cbs.length&&delete this.frameInfos[t],this.needUpdate=!0)}},ROSLIB.UrdfBox=function(t){t=t||{};var e=this,i=t.xml;this.dimension=null,this.type=null;var s=function(t){this.type=ROSLIB.URDF_BOX;var i=t.getAttribute("size").split(" ");e.dimension=new ROSLIB.Vector3({x:parseFloat(i[0]),y:parseFloat(i[1]),z:parseFloat(i[2])})};s(i)},ROSLIB.UrdfColor=function(t){t=t||{};var e=this,i=t.xml;this.r=null,this.g=null,this.b=null,this.a=null;var s=function(t){var i=t.getAttribute("rgba").split(" ");return e.r=parseFloat(i[0]),e.g=parseFloat(i[1]),e.b=parseFloat(i[2]),e.a=parseFloat(i[3]),!0};s(i)},ROSLIB.UrdfCylinder=function(t){t=t||{};var e=this,i=t.xml;this.type=null,this.length=null,this.radius=null;var s=function(t){e.type=ROSLIB.URDF_CYLINDER,e.length=parseFloat(t.getAttribute("length")),e.radius=parseFloat(t.getAttribute("radius"))};s(i)},ROSLIB.UrdfLink=function(t){t=t||{};var e=this,i=t.xml;this.name=null,this.visual=null;var s=function(t){e.name=t.getAttribute("name");var i=t.getElementsByTagName("visual");i.length>0&&(e.visual=new ROSLIB.UrdfVisual({xml:i[0]}))};s(i)},ROSLIB.UrdfMaterial=function(t){t=t||{};var e=this,i=t.xml;this.name=null,this.textureFilename=null,this.color=null;var s=function(t){e.name=t.getAttribute("name");var i=t.getElementsByTagName("texture");i.length>0&&(e.textureFilename=i[0].getAttribute("filename"));var s=t.getElementsByTagName("color");s.length>0&&(e.color=new ROSLIB.UrdfColor({xml:s[0]}))};s(i)},ROSLIB.UrdfMesh=function(t){t=t||{};var e=this,i=t.xml;this.filename=null,this.scale=null,this.type=null;var s=function(t){e.type=ROSLIB.URDF_MESH,e.filename=t.getAttribute("filename");var i=t.getAttribute("scale");if(i){var s=i.split(" ");e.scale=new ROSLIB.Vector3({x:parseFloat(s[0]),y:parseFloat(s[1]),z:parseFloat(s[2])})}};s(i)},ROSLIB.UrdfModel=function(t){t=t||{};var e=this,i=t.xml,s=t.string;this.materials=[],this.links=[];var n=function(t){var i=t.evaluate("//robot",t,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;e.name=i.getAttribute("name");for(var s in i.childNodes){var n=i.childNodes[s];if("material"===n.tagName){var o=new ROSLIB.UrdfMaterial({xml:n});e.materials[o.name]?console.warn("Material "+o.name+"is not unique."):e.materials[o.name]=o}else if("link"===n.tagName){var a=new ROSLIB.UrdfLink({xml:n});e.links[a.name]?console.warn("Link "+a.name+" is not unique."):(a.visual&&a.visual.material&&(e.materials[a.visual.material.name]?a.visual.material=e.materials[a.visual.material.name]:a.visual.material&&(e.materials[a.visual.material.name]=a.visual.material)),e.links[a.name]=a)}}};if(s){var o=new DOMParser;i=o.parseFromString(s,"text/xml")}n(i)},ROSLIB.UrdfSphere=function(t){t=t||{};var e=this,i=t.xml;this.radius=null,this.type=null;var s=function(t){e.type=ROSLIB.URDF_SPHERE,e.radius=parseFloat(t.getAttribute("radius"))};s(i)},ROSLIB.UrdfVisual=function(t){t=t||{};var e=this,i=t.xml;this.origin=null,this.geometry=null,this.material=null;var s=function(t){var i=t.getElementsByTagName("origin");if(0===i.length)e.origin=new ROSLIB.Pose;else{var s=i[0].getAttribute("xyz"),n=new ROSLIB.Vector3;s&&(s=s.split(" "),n=new ROSLIB.Vector3({x:parseFloat(s[0]),y:parseFloat(s[1]),z:parseFloat(s[2])}));var o=i[0].getAttribute("rpy"),a=new ROSLIB.Quaternion;if(o){o=o.split(" ");var r=parseFloat(o[0]),h=parseFloat(o[1]),c=parseFloat(o[2]),l=r/2,u=h/2,p=c/2,m=Math.sin(l)*Math.cos(u)*Math.cos(p)-Math.cos(l)*Math.sin(u)*Math.sin(p),f=Math.cos(l)*Math.sin(u)*Math.cos(p)+Math.sin(l)*Math.cos(u)*Math.sin(p),v=Math.cos(l)*Math.cos(u)*Math.sin(p)-Math.sin(l)*Math.sin(u)*Math.cos(p),S=Math.cos(l)*Math.cos(u)*Math.cos(p)+Math.sin(l)*Math.sin(u)*Math.sin(p);a=new ROSLIB.Quaternion({x:m,y:f,z:v,w:S}),a.normalize()}e.origin=new ROSLIB.Pose({position:n,orientation:a})}var R=t.getElementsByTagName("geometry");if(R.length>0){var d=null;for(var g in R[0].childNodes){var O=R[0].childNodes[g];if(1===O.nodeType){d=O;break}}var y=d.nodeName;"sphere"===y?e.geometry=new ROSLIB.UrdfSphere({xml:d}):"box"===y?e.geometry=new ROSLIB.UrdfBox({xml:d}):"cylinder"===y?e.geometry=new ROSLIB.UrdfCylinder({xml:d}):"mesh"===y?e.geometry=new ROSLIB.UrdfMesh({xml:d}):console.warn("Unknown geometry type "+y)}var I=t.getElementsByTagName("material");I.length>0&&(e.material=new ROSLIB.UrdfMaterial({xml:I[0]}))};s(i)};
//!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){"use strict";function c(a){if(null==a)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}b.exports=Object.assign||function(a){for(var b,d,e=c(a),f=1;f<arguments.length;f++){b=arguments[f],d=Object.keys(Object(b));for(var g=0;g<d.length;g++)e[d[g]]=b[d[g]]}return e}},{}],2:[function(a,b,c){c.XMLSerializer=XMLSerializer,c.DOMParser=DOMParser,c.implementation=document.implementation},{}],3:[function(a,b){var c=this.ROSLIB||{REVISION:"0.14.0"},d=a("object-assign");d(c,a("./core")),d(c,a("./actionlib")),d(c,a("./math")),d(c,a("./tf")),d(c,a("./urdf")),b.exports=c},{"./actionlib":8,"./core":17,"./math":22,"./tf":25,"./urdf":37,"object-assign":1}],4:[function(a){(function(b){b.ROSLIB=a("./RosLib")}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./RosLib":3}],5:[function(a,b){function c(a){var b=this;a=a||{},this.ros=a.ros,this.serverName=a.serverName,this.actionName=a.actionName,this.timeout=a.timeout,this.goals={};var c=!1,e=new d({ros:this.ros,name:this.serverName+"/feedback",messageType:this.actionName+"Feedback"}),f=new d({ros:this.ros,name:this.serverName+"/status",messageType:"actionlib_msgs/GoalStatusArray"}),g=new d({ros:this.ros,name:this.serverName+"/result",messageType:this.actionName+"Result"});this.goalTopic=new d({ros:this.ros,name:this.serverName+"/goal",messageType:this.actionName+"Goal"}),this.cancelTopic=new d({ros:this.ros,name:this.serverName+"/cancel",messageType:"actionlib_msgs/GoalID"}),this.goalTopic.advertise(),this.cancelTopic.advertise(),f.subscribe(function(a){c=!0,a.status_list.forEach(function(a){var c=b.goals[a.goal_id.id];c&&c.emit("status",a)})}),e.subscribe(function(a){var c=b.goals[a.status.goal_id.id];c&&(c.emit("status",a.status),c.emit("feedback",a.feedback))}),g.subscribe(function(a){var c=b.goals[a.status.goal_id.id];c&&(c.emit("status",a.status),c.emit("result",a.result))}),this.timeout&&setTimeout(function(){c||b.emit("timeout")},this.timeout)}var d=a("../core/Topic"),e=a("../core/Message"),f=a("./../util/shim/EventEmitter2.js").EventEmitter2;c.prototype.__proto__=f.prototype,c.prototype.cancel=function(){var a=new e;this.cancelTopic.publish(a)},b.exports=c},{"../core/Message":9,"../core/Topic":16,"./../util/shim/EventEmitter2.js":39}],6:[function(a,b){function c(a){var b=this;this.actionClient=a.actionClient,this.goalMessage=a.goalMessage,this.isFinished=!1;var c=new Date;this.goalID="goal_"+Math.random()+"_"+c.getTime(),this.goalMessage=new d({goal_id:{stamp:{secs:0,nsecs:0},id:this.goalID},goal:this.goalMessage}),this.on("status",function(a){b.status=a}),this.on("result",function(a){b.isFinished=!0,b.result=a}),this.on("feedback",function(a){b.feedback=a}),this.actionClient.goals[this.goalID]=this}var d=a("../core/Message"),e=a("./../util/shim/EventEmitter2.js").EventEmitter2;c.prototype.__proto__=e.prototype,c.prototype.send=function(a){var b=this;b.actionClient.goalTopic.publish(b.goalMessage),a&&setTimeout(function(){b.isFinished||b.emit("timeout")},a)},c.prototype.cancel=function(){var a=new d({id:this.goalID});this.actionClient.cancelTopic.publish(a)},b.exports=c},{"../core/Message":9,"./../util/shim/EventEmitter2.js":39}],7:[function(a,b){function c(a){var b=this;a=a||{},this.ros=a.ros,this.serverName=a.serverName,this.actionName=a.actionName,this.feedbackPublisher=new d({ros:this.ros,name:this.serverName+"/feedback",messageType:this.actionName+"Feedback"}),this.feedbackPublisher.advertise();var c=new d({ros:this.ros,name:this.serverName+"/status",messageType:"actionlib_msgs/GoalStatusArray"});c.advertise(),this.resultPublisher=new d({ros:this.ros,name:this.serverName+"/result",messageType:this.actionName+"Result"}),this.resultPublisher.advertise();var f=new d({ros:this.ros,name:this.serverName+"/goal",messageType:this.actionName+"Goal"}),g=new d({ros:this.ros,name:this.serverName+"/cancel",messageType:"actionlib_msgs/GoalID"});this.statusMessage=new e({header:{stamp:{secs:0,nsecs:100},frame_id:""},status_list:[]}),this.currentGoal=null,this.nextGoal=null,f.subscribe(function(a){b.currentGoal?(b.nextGoal=a,b.emit("cancel")):(b.statusMessage.status_list=[{goal_id:a.goal_id,status:1}],b.currentGoal=a,b.emit("goal",a.goal))});var h=function(a,b){return a.secs>b.secs?!1:a.secs<b.secs?!0:a.nsecs<b.nsecs?!0:!1};g.subscribe(function(a){0===a.stamp.secs&&0===a.stamp.secs&&""===a.id?(b.nextGoal=null,b.currentGoal&&b.emit("cancel")):(b.currentGoal&&a.id===b.currentGoal.goal_id.id?b.emit("cancel"):b.nextGoal&&a.id===b.nextGoal.goal_id.id&&(b.nextGoal=null),b.nextGoal&&h(b.nextGoal.goal_id.stamp,a.stamp)&&(b.nextGoal=null),b.currentGoal&&h(b.currentGoal.goal_id.stamp,a.stamp)&&b.emit("cancel"))});setInterval(function(){var a=new Date,d=Math.floor(a.getTime()/1e3),e=Math.round(1e9*(a.getTime()/1e3-d));b.statusMessage.header.stamp.secs=d,b.statusMessage.header.stamp.nsecs=e,c.publish(b.statusMessage)},500)}var d=a("../core/Topic"),e=a("../core/Message"),f=a("./../util/shim/EventEmitter2.js").EventEmitter2;c.prototype.__proto__=f.prototype,c.prototype.setSucceeded=function(a){var b=new e({status:{goal_id:this.currentGoal.goal_id,status:3},result:a});this.resultPublisher.publish(b),this.statusMessage.status_list=[],this.nextGoal?(this.currentGoal=this.nextGoal,this.nextGoal=null,this.emit("goal",this.currentGoal.goal)):this.currentGoal=null},c.prototype.sendFeedback=function(a){var b=new e({status:{goal_id:this.currentGoal.goal_id,status:1},feedback:a});this.feedbackPublisher.publish(b)},c.prototype.setPreempted=function(){this.statusMessage.status_list=[];var a=new e({status:{goal_id:this.currentGoal.goal_id,status:2}});this.resultPublisher.publish(a),this.nextGoal?(this.currentGoal=this.nextGoal,this.nextGoal=null,this.emit("goal",this.currentGoal.goal)):this.currentGoal=null},b.exports=c},{"../core/Message":9,"../core/Topic":16,"./../util/shim/EventEmitter2.js":39}],8:[function(a,b){var c=a("../core/Ros"),d=a("../mixin"),e=b.exports={ActionClient:a("./ActionClient"),Goal:a("./Goal"),SimpleActionServer:a("./SimpleActionServer")};d(c,["ActionClient","SimpleActionServer"],e)},{"../core/Ros":11,"../mixin":23,"./ActionClient":5,"./Goal":6,"./SimpleActionServer":7}],9:[function(a,b){function c(a){d(this,a)}var d=a("object-assign");b.exports=c},{"object-assign":1}],10:[function(a,b){function c(a){a=a||{},this.ros=a.ros,this.name=a.name}var d=a("./Service"),e=a("./ServiceRequest");c.prototype.get=function(a){var b=new d({ros:this.ros,name:"/rosapi/get_param",serviceType:"rosapi/GetParam"}),c=new e({name:this.name});b.callService(c,function(b){var c=JSON.parse(b.value);a(c)})},c.prototype.set=function(a,b){var c=new d({ros:this.ros,name:"/rosapi/set_param",serviceType:"rosapi/SetParam"}),f=new e({name:this.name,value:JSON.stringify(a)});c.callService(f,b)},c.prototype.delete=function(a){var b=new d({ros:this.ros,name:"/rosapi/delete_param",serviceType:"rosapi/DeleteParam"}),c=new e({name:this.name});b.callService(c,a)},b.exports=c},{"./Service":12,"./ServiceRequest":13}],11:[function(a,b){function c(a){a=a||{},this.socket=null,this.idCounter=0,this.isConnected=!1,this.groovyCompatibility="undefined"==typeof a.groovyCompatibility?!0:a.groovyCompatibility,this.setMaxListeners(0),a.url&&this.connect(a.url)}var d=a("./../util/shim/WebSocket.js"),e=a("./SocketAdapter.js"),f=a("./Service"),g=a("./ServiceRequest"),h=a("object-assign"),i=a("./../util/shim/EventEmitter2.js").EventEmitter2;c.prototype.__proto__=i.prototype,c.prototype.connect=function(a){this.socket=h(new d(a),e(this))},c.prototype.close=function(){this.socket&&this.socket.close()},c.prototype.authenticate=function(a,b,c,d,e,f,g){var h={op:"auth",mac:a,client:b,dest:c,rand:d,t:e,level:f,end:g};this.callOnConnection(h)},c.prototype.callOnConnection=function(a){var b=this,c=JSON.stringify(a);this.isConnected?b.socket.send(c):b.once("connection",function(){b.socket.send(c)})},c.prototype.getTopics=function(a){var b=new f({ros:this,name:"/rosapi/topics",serviceType:"rosapi/Topics"}),c=new g;b.callService(c,function(b){a(b.topics)})},c.prototype.getTopicsForType=function(a,b){var c=new f({ros:this,name:"/rosapi/topics_for_type",serviceType:"rosapi/TopicsForType"}),d=new g({type:a});c.callService(d,function(a){b(a.topics)})},c.prototype.getServices=function(a){var b=new f({ros:this,name:"/rosapi/services",serviceType:"rosapi/Services"}),c=new g;b.callService(c,function(b){a(b.services)})},c.prototype.getServicesForType=function(a,b){var c=new f({ros:this,name:"/rosapi/services_for_type",serviceType:"rosapi/ServicesForType"}),d=new g({type:a});c.callService(d,function(a){b(a.services)})},c.prototype.getNodes=function(a){var b=new f({ros:this,name:"/rosapi/nodes",serviceType:"rosapi/Nodes"}),c=new g;b.callService(c,function(b){a(b.nodes)})},c.prototype.getParams=function(a){var b=new f({ros:this,name:"/rosapi/get_param_names",serviceType:"rosapi/GetParamNames"}),c=new g;b.callService(c,function(b){a(b.names)})},c.prototype.getTopicType=function(a,b){var c=new f({ros:this,name:"/rosapi/topic_type",serviceType:"rosapi/TopicType"}),d=new g({topic:a});c.callService(d,function(a){b(a.type)})},c.prototype.getMessageDetails=function(a,b){var c=new f({ros:this,name:"/rosapi/message_details",serviceType:"rosapi/MessageDetails"}),d=new g({type:a});c.callService(d,function(a){b(a.typedefs)})},c.prototype.decodeTypeDefs=function(a){var b=this,c=function(a,d){for(var e={},f=0;f<a.fieldnames.length;f++){var g=a.fieldarraylen[f],h=a.fieldnames[f],i=a.fieldtypes[f];if(-1===i.indexOf("/"))e[h]=-1===g?i:[i];else{for(var j=!1,k=0;k<d.length;k++)if(d[k].type.toString()===i.toString()){j=d[k];break}if(j){var l=c(j,d);e[h]=-1===g?l:[l]}else b.emit("error","Cannot find "+i+" in decodeTypeDefs")}}return e};return c(a[0],a)},b.exports=c},{"./../util/shim/EventEmitter2.js":39,"./../util/shim/WebSocket.js":40,"./Service":12,"./ServiceRequest":13,"./SocketAdapter.js":15,"object-assign":1}],12:[function(a,b){function c(a){a=a||{},this.ros=a.ros,this.name=a.name,this.serviceType=a.serviceType}var d=a("./ServiceResponse");c.prototype.callService=function(a,b,c){var e="call_service:"+this.name+":"+ ++this.ros.idCounter;(b||c)&&this.ros.once(e,function(a){void 0!==a.result&&a.result===!1?"function"==typeof c&&c(a.values):"function"==typeof b&&b(new d(a.values))});var f={op:"call_service",id:e,service:this.name,args:a};this.ros.callOnConnection(f)},b.exports=c},{"./ServiceResponse":14}],13:[function(a,b){function c(a){d(this,a)}var d=a("object-assign");b.exports=c},{"object-assign":1}],14:[function(a,b){function c(a){d(this,a)}var d=a("object-assign");b.exports=c},{"object-assign":1}],15:[function(a,b){(function(c){"use strict";function d(a,b){var c=new g;c.onload=function(){var a=new f,d=a.getContext("2d");a.width=c.width,a.height=c.height,d.imageSmoothingEnabled=!1,d.webkitImageSmoothingEnabled=!1,d.mozImageSmoothingEnabled=!1,d.drawImage(c,0,0);for(var e=d.getImageData(0,0,c.width,c.height).data,g="",h=0;h<e.length;h+=4)g+=String.fromCharCode(e[h],e[h+1],e[h+2]);b(JSON.parse(g))},c.src="data:image/png;base64,"+a.data}function e(a){function b(b){"publish"===b.op?a.emit(b.topic,b.msg):"service_response"===b.op&&a.emit(b.id,b)}return{onopen:function(b){a.isConnected=!0,a.emit("connection",b)},onclose:function(b){a.isConnected=!1,a.emit("close",b)},onerror:function(b){a.emit("error",b)},onmessage:function(a){var c=JSON.parse("string"==typeof a?a:a.data);"png"===c.op?d(c,b):b(c)}}}{var f=a("./../util/shim/canvas.js"),g=f.Image||c.Image;a("./../util/shim/WebSocket.js")}b.exports=e}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./../util/shim/WebSocket.js":40,"./../util/shim/canvas.js":41}],16:[function(a,b){function c(a){a=a||{},this.ros=a.ros,this.name=a.name,this.messageType=a.messageType,this.isAdvertised=!1,this.compression=a.compression||"none",this.throttle_rate=a.throttle_rate||0,this.latch=a.latch||!1,this.queue_size=a.queue_size||100,this.queue_length=a.queue_length||0,this.compression&&"png"!==this.compression&&"none"!==this.compression&&this.emit("warning",this.compression+" compression is not supported. No compression will be used."),this.throttle_rate<0&&(this.emit("warning",this.throttle_rate+" is not allowed. Set to 0"),this.throttle_rate=0);var b=this;this._messageCallback=function(a){b.emit("message",new e(a))}}var d=a("./../util/shim/EventEmitter2.js").EventEmitter2,e=a("./Message");c.prototype.__proto__=d.prototype,c.prototype.subscribe=function(a){"function"==typeof a&&this.on("message",a),this.subscribeId||(this.ros.on(this.name,this._messageCallback),this.subscribeId="subscribe:"+this.name+":"+ ++this.ros.idCounter,this.ros.callOnConnection({op:"subscribe",id:this.subscribeId,type:this.messageType,topic:this.name,compression:this.compression,throttle_rate:this.throttle_rate,queue_length:this.queue_length}))},c.prototype.unsubscribe=function(a){a&&(this.off("message",a),this.listeners("message").length)||this.subscribeId&&(this.ros.off(this.name,this._messageCallback),this.emit("unsubscribe"),this.ros.callOnConnection({op:"unsubscribe",id:this.subscribeId,topic:this.name}),this.subscribeId=null)},c.prototype.advertise=function(){this.isAdvertised||(this.advertiseId="advertise:"+this.name+":"+ ++this.ros.idCounter,this.ros.callOnConnection({op:"advertise",id:this.advertiseId,type:this.messageType,topic:this.name,latch:this.latch,queue_size:this.queue_size}),this.isAdvertised=!0)},c.prototype.unadvertise=function(){this.isAdvertised&&(this.emit("unadvertise"),this.ros.callOnConnection({op:"unadvertise",id:this.advertiseId,topic:this.name}),this.isAdvertised=!1)},c.prototype.publish=function(a){this.isAdvertised||this.advertise(),this.ros.idCounter++;var b={op:"publish",id:"publish:"+this.name+":"+this.ros.idCounter,topic:this.name,msg:a,latch:this.latch};this.ros.callOnConnection(b)},b.exports=c},{"./../util/shim/EventEmitter2.js":39,"./Message":9}],17:[function(a,b){var c=a("../mixin"),d=b.exports={Ros:a("./Ros"),Topic:a("./Topic"),Message:a("./Message"),Param:a("./Param"),Service:a("./Service"),ServiceRequest:a("./ServiceRequest"),ServiceResponse:a("./ServiceResponse")};c(d.Ros,["Param","Service","Topic"],d)},{"../mixin":23,"./Message":9,"./Param":10,"./Ros":11,"./Service":12,"./ServiceRequest":13,"./ServiceResponse":14,"./Topic":16}],18:[function(a,b){function c(a){a=a||{},this.position=new d(a.position),this.orientation=new e(a.orientation)}var d=a("./Vector3"),e=a("./Quaternion");c.prototype.applyTransform=function(a){this.position.multiplyQuaternion(a.rotation),this.position.add(a.translation);var b=a.rotation.clone();b.multiply(this.orientation),this.orientation=b},c.prototype.clone=function(){return new c(this)},b.exports=c},{"./Quaternion":19,"./Vector3":21}],19:[function(a,b){function c(a){a=a||{},this.x=a.x||0,this.y=a.y||0,this.z=a.z||0,this.w="number"==typeof a.w?a.w:1}c.prototype.conjugate=function(){this.x*=-1,this.y*=-1,this.z*=-1},c.prototype.norm=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},c.prototype.normalize=function(){var a=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);0===a?(this.x=0,this.y=0,this.z=0,this.w=1):(a=1/a,this.x=this.x*a,this.y=this.y*a,this.z=this.z*a,this.w=this.w*a)},c.prototype.invert=function(){this.conjugate(),this.normalize()},c.prototype.multiply=function(a){var b=this.x*a.w+this.y*a.z-this.z*a.y+this.w*a.x,c=-this.x*a.z+this.y*a.w+this.z*a.x+this.w*a.y,d=this.x*a.y-this.y*a.x+this.z*a.w+this.w*a.z,e=-this.x*a.x-this.y*a.y-this.z*a.z+this.w*a.w;this.x=b,this.y=c,this.z=d,this.w=e},c.prototype.clone=function(){return new c(this)},b.exports=c},{}],20:[function(a,b){function c(a){a=a||{},this.translation=new d(a.translation),this.rotation=new e(a.rotation)}var d=a("./Vector3"),e=a("./Quaternion");c.prototype.clone=function(){return new c(this)},b.exports=c},{"./Quaternion":19,"./Vector3":21}],21:[function(a,b){function c(a){a=a||{},this.x=a.x||0,this.y=a.y||0,this.z=a.z||0}c.prototype.add=function(a){this.x+=a.x,this.y+=a.y,this.z+=a.z},c.prototype.subtract=function(a){this.x-=a.x,this.y-=a.y,this.z-=a.z},c.prototype.multiplyQuaternion=function(a){var b=a.w*this.x+a.y*this.z-a.z*this.y,c=a.w*this.y+a.z*this.x-a.x*this.z,d=a.w*this.z+a.x*this.y-a.y*this.x,e=-a.x*this.x-a.y*this.y-a.z*this.z;this.x=b*a.w+e*-a.x+c*-a.z-d*-a.y,this.y=c*a.w+e*-a.y+d*-a.x-b*-a.z,this.z=d*a.w+e*-a.z+b*-a.y-c*-a.x},c.prototype.clone=function(){return new c(this)},b.exports=c},{}],22:[function(a,b){b.exports={Pose:a("./Pose"),Quaternion:a("./Quaternion"),Transform:a("./Transform"),Vector3:a("./Vector3")}},{"./Pose":18,"./Quaternion":19,"./Transform":20,"./Vector3":21}],23:[function(a,b){b.exports=function(a,b,c){b.forEach(function(b){var d=c[b];a.prototype[b]=function(a){return a.ros=this,new d(a)}})}},{}],24:[function(a,b){function c(a){a=a||{},this.ros=a.ros,this.fixedFrame=a.fixedFrame||"/base_link",this.angularThres=a.angularThres||2,this.transThres=a.transThres||.01,this.rate=a.rate||10,this.updateDelay=a.updateDelay||50;var b=a.topicTimeout||2,c=Math.floor(b),d=Math.floor(1e9*(b-c));this.topicTimeout={secs:c,nsecs:d},this.currentGoal=!1,this.currentTopic=!1,this.frameInfos={},this.republisherUpdateRequested=!1,this.actionClient=this.ros.ActionClient({serverName:"/tf2_web_republisher",actionName:"tf2_web_republisher/TFSubscriptionAction"}),this.serviceClient=this.ros.Service({name:"/republish_tfs",serviceType:"tf2_web_republisher/RepublishTFs"})}var d=(a("../actionlib/ActionClient"),a("../actionlib/Goal")),e=(a("../core/Service.js"),a("../core/ServiceRequest.js")),f=a("../math/Transform");c.prototype.processTFArray=function(a){a.transforms.forEach(function(a){var b=a.child_frame_id;"/"===b[0]&&(b=b.substring(1));var c=this.frameInfos[b];c&&(c.transform=new f({translation:a.transform.translation,rotation:a.transform.rotation}),c.cbs.forEach(function(a){a(c.transform)}))},this)},c.prototype.updateGoal=function(){var a={source_frames:Object.keys(this.frameInfos),target_frame:this.fixedFrame,angular_thres:this.angularThres,trans_thres:this.transThres,rate:this.rate};if(this.ros.groovyCompatibility)this.currentGoal&&this.currentGoal.cancel(),this.currentGoal=new d({actionClient:this.actionClient,goalMessage:a}),this.currentGoal.on("feedback",this.processTFArray.bind(this)),this.currentGoal.send();else{a.timeout=this.topicTimeout;var b=new e(a);this.serviceClient.callService(b,this.processResponse.bind(this))}this.republisherUpdateRequested=!1},c.prototype.processResponse=function(a){this.currentTopic&&this.currentTopic.unsubscribe(),this.currentTopic=this.ros.Topic({name:a.topic_name,messageType:"tf2_web_republisher/TFArray"}),this.currentTopic.subscribe(this.processTFArray.bind(this))},c.prototype.subscribe=function(a,b){"/"===a[0]&&(a=a.substring(1)),this.frameInfos[a]?this.frameInfos[a].transform&&b(this.frameInfos[a].transform):(this.frameInfos[a]={cbs:[]},this.republisherUpdateRequested||(setTimeout(this.updateGoal.bind(this),this.updateDelay),this.republisherUpdateRequested=!0)),this.frameInfos[a].cbs.push(b)},c.prototype.unsubscribe=function(a,b){"/"===a[0]&&(a=a.substring(1));for(var c=this.frameInfos[a],d=c&&c.cbs||[],e=d.length;e--;)d[e]===b&&d.splice(e,1);b&&0!==d.length||delete this.frameInfos[a]},b.exports=c},{"../actionlib/ActionClient":5,"../actionlib/Goal":6,"../core/Service.js":12,"../core/ServiceRequest.js":13,"../math/Transform":20}],25:[function(a,b){var c=a("../core/Ros"),d=a("../mixin"),e=b.exports={TFClient:a("./TFClient")};d(c,["TFClient"],e)},{"../core/Ros":11,"../mixin":23,"./TFClient":24}],26:[function(a,b){function c(a){this.dimension=null,this.type=e.URDF_BOX;var b=a.xml.getAttribute("size").split(" ");this.dimension=new d({x:parseFloat(b[0]),y:parseFloat(b[1]),z:parseFloat(b[2])})}var d=a("../math/Vector3"),e=a("./UrdfTypes");b.exports=c},{"../math/Vector3":21,"./UrdfTypes":35}],27:[function(a,b){function c(a){var b=a.xml.getAttribute("rgba").split(" ");this.r=parseFloat(b[0]),this.g=parseFloat(b[1]),this.b=parseFloat(b[2]),this.a=parseFloat(b[3])}b.exports=c},{}],28:[function(a,b){function c(a){this.type=d.URDF_CYLINDER,this.length=parseFloat(a.xml.getAttribute("length")),this.radius=parseFloat(a.xml.getAttribute("radius"))}var d=a("./UrdfTypes");b.exports=c},{"./UrdfTypes":35}],29:[function(a,b){function c(a){this.name=a.xml.getAttribute("name"),this.type=a.xml.getAttribute("type");var b=a.xml.getElementsByTagName("limit");b.length>0&&(this.minval=parseFloat(b[0].getAttribute("lower")),this.maxval=parseFloat(b[0].getAttribute("upper")))}b.exports=c},{}],30:[function(a,b){function c(a){this.name=a.xml.getAttribute("name"),this.visuals=[];for(var b=a.xml.getElementsByTagName("visual"),c=0;c<b.length;c++)this.visuals.push(new d({xml:b[c]}))}var d=a("./UrdfVisual");b.exports=c},{"./UrdfVisual":36}],31:[function(a,b){function c(a){this.textureFilename=null,this.color=null,this.name=a.xml.getAttribute("name");var b=a.xml.getElementsByTagName("texture");b.length>0&&(this.textureFilename=b[0].getAttribute("filename"));var c=a.xml.getElementsByTagName("color");c.length>0&&(this.color=new d({xml:c[0]}))}var d=a("./UrdfColor");c.prototype.isLink=function(){return null===this.color&&null===this.textureFilename};var e=a("object-assign");c.prototype.assign=function(a){return e(this,a)},b.exports=c},{"./UrdfColor":27,"object-assign":1}],32:[function(a,b){function c(a){this.scale=null,this.type=e.URDF_MESH,this.filename=a.xml.getAttribute("filename");var b=a.xml.getAttribute("scale");if(b){var c=b.split(" ");this.scale=new d({x:parseFloat(c[0]),y:parseFloat(c[1]),z:parseFloat(c[2])})}}var d=a("../math/Vector3"),e=a("./UrdfTypes");b.exports=c},{"../math/Vector3":21,"./UrdfTypes":35}],33:[function(a,b){function c(a){a=a||{};var b=a.xml,c=a.string;if(this.materials={},this.links={},this.joints={},c){var i=new g;b=i.parseFromString(c,"text/xml")}var j=b.evaluate("//robot",b,null,h,null).singleNodeValue;this.name=j.getAttribute("name");for(var k=j.childNodes,l=0;l<k.length;l++){var m=k[l];if("material"===m.tagName){var n=new d({xml:m});void 0!==this.materials[n.name]?this.materials[n.name].isLink()?this.materials[n.name].assign(n):console.warn("Material "+n.name+"is not unique."):this.materials[n.name]=n}else if("link"===m.tagName){var o=new e({xml:m});if(void 0!==this.links[o.name])console.warn("Link "+o.name+" is not unique.");else{for(var p=0;p<o.visuals.length;p++){var q=o.visuals[p].material;null!==q&&(void 0!==this.materials[q.name]?o.visuals[p].material=this.materials[q.name]:this.materials[q.name]=q)}this.links[o.name]=o}}else if("joint"===m.tagName){var r=new f({xml:m});this.joints[r.name]=r}}}var d=a("./UrdfMaterial"),e=a("./UrdfLink"),f=a("./UrdfJoint"),g=a("../util/DOMParser"),h=9;b.exports=c},{"../util/DOMParser":38,"./UrdfJoint":29,"./UrdfLink":30,"./UrdfMaterial":31}],34:[function(a,b){function c(a){this.type=d.URDF_SPHERE,this.radius=parseFloat(a.xml.getAttribute("radius"))}var d=a("./UrdfTypes");b.exports=c},{"./UrdfTypes":35}],35:[function(a,b){b.exports={URDF_SPHERE:0,URDF_BOX:1,URDF_CYLINDER:2,URDF_MESH:3}},{}],36:[function(a,b){function c(a){var b=a.xml;this.origin=null,this.geometry=null,this.material=null;var c=b.getElementsByTagName("origin");if(0===c.length)this.origin=new d;else{var l=c[0].getAttribute("xyz"),m=new e;l&&(l=l.split(" "),m=new e({x:parseFloat(l[0]),y:parseFloat(l[1]),z:parseFloat(l[2])}));var n=c[0].getAttribute("rpy"),o=new f;if(n){n=n.split(" ");var p=parseFloat(n[0]),q=parseFloat(n[1]),r=parseFloat(n[2]),s=p/2,t=q/2,u=r/2,v=Math.sin(s)*Math.cos(t)*Math.cos(u)-Math.cos(s)*Math.sin(t)*Math.sin(u),w=Math.cos(s)*Math.sin(t)*Math.cos(u)+Math.sin(s)*Math.cos(t)*Math.sin(u),x=Math.cos(s)*Math.cos(t)*Math.sin(u)-Math.sin(s)*Math.sin(t)*Math.cos(u),y=Math.cos(s)*Math.cos(t)*Math.cos(u)+Math.sin(s)*Math.sin(t)*Math.sin(u);o=new f({x:v,y:w,z:x,w:y}),o.normalize()}this.origin=new d({position:m,orientation:o})}var z=b.getElementsByTagName("geometry");if(z.length>0){for(var A=z[0],B=null,C=0;C<A.childNodes.length;C++){var D=A.childNodes[C];if(1===D.nodeType){B=D;break}}var E=B.nodeName;"sphere"===E?this.geometry=new k({xml:B}):"box"===E?this.geometry=new h({xml:B}):"cylinder"===E?this.geometry=new g({xml:B}):"mesh"===E?this.geometry=new j({xml:B}):console.warn("Unknown geometry type "+E)}var F=b.getElementsByTagName("material");F.length>0&&(this.material=new i({xml:F[0]}))}var d=a("../math/Pose"),e=a("../math/Vector3"),f=a("../math/Quaternion"),g=a("./UrdfCylinder"),h=a("./UrdfBox"),i=a("./UrdfMaterial"),j=a("./UrdfMesh"),k=a("./UrdfSphere");b.exports=c},{"../math/Pose":18,"../math/Quaternion":19,"../math/Vector3":21,"./UrdfBox":26,"./UrdfCylinder":28,"./UrdfMaterial":31,"./UrdfMesh":32,"./UrdfSphere":34}],37:[function(a,b){b.exports=a("object-assign")({UrdfBox:a("./UrdfBox"),UrdfColor:a("./UrdfColor"),UrdfCylinder:a("./UrdfCylinder"),UrdfLink:a("./UrdfLink"),UrdfMaterial:a("./UrdfMaterial"),UrdfMesh:a("./UrdfMesh"),UrdfModel:a("./UrdfModel"),UrdfSphere:a("./UrdfSphere"),UrdfVisual:a("./UrdfVisual")},a("./UrdfTypes"))},{"./UrdfBox":26,"./UrdfColor":27,"./UrdfCylinder":28,"./UrdfLink":30,"./UrdfMaterial":31,"./UrdfMesh":32,"./UrdfModel":33,"./UrdfSphere":34,"./UrdfTypes":35,"./UrdfVisual":36,"object-assign":1}],38:[function(a,b){b.exports=a("xmlshim").DOMParser},{xmlshim:2}],39:[function(a,b){(function(a){b.exports={EventEmitter2:a.EventEmitter2}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],40:[function(a,b){(function(a){b.exports=a.WebSocket}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],41:[function(a,b){b.exports=function(){return document.createElement("canvas")}},{}]},{},[4]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var scratchAudioList = []
var descriptor2;

var EnDiphoneFestivalVoice = "kal_diphone";
var EnArticFestivalVoice = "cmu_us_slt_arctic_hts";
var EsDiphoneMaleFestivalVoice = "JuntaDeAndalucia_es_pa_diphone";
var EsDiphoneFemaleFestivalVoice = "JuntaDeAndalucia_es_sf_diphone";
var CatHtsManFestivalVoice = "upc_ca_pau_hts";
//['upc_ca_bet_hts', 'default', 'upc_ca_teo_hts']


new (function() {

	var ext = this;
	var connected=0;
	var bots = [];
	var moving =false;
	var adds = 0;
	//var actualBot;
	
	function ROSBot(name, ip) {
		this.ip = ip;
		this.name = name;
		this.accelerometer = true;
		this.touch = true;
		this.touchedHead = false;
		this.touchedLeft = false;
		this.touchedRight = false;
		this.accelerometerChanged = false;
		this.currentPosition = 'standup';
		this.listened=false;
		this.listenedSentence=null;
		this.moving=false;
		this.listening=true;
		this.touchListenerOn = false;
		this.accelListenerOn = false;
		this.asrListenerOn =false;
        this.faceListenerOn = false;
        this.faceListened = false;
        this.faceListenedNumber = 0;
        this.qrListenerOn = false;
        this.qrListened = false;
        this.qrListenedSentence = null;
        this.rfidListenerOn = false;
        this.rfidListened = false;
        this.rfidListenedSentence = null;
        this.eyesCoverListenerOn = false;
        this.eyesCoverListened = false;
        this.eyesCoverListenedValue = null;



		// Connecting to ROS
		this.ros = new ROSLIB.Ros({
			url : 'ws://' + ip + ':9090'
		});

		// Event callbacks
		this.ros.on('connection', function() {
			connected = 1;
			alert('connected!');
			//scratchAudioList = getSounds(this);
			/*ls = getSounds(this.name);
			alert(scratchAudioList);
			setBlocks(name,scratchAudioList);
			ScratchExtensions.register(name, descriptor2, ext);*/
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
			name : '/airos4/servo/move_servo',
			serviceType : 'airos4_servo/move_servo'
		});
			
		this.sayService = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/tts/say',
			serviceType : 'airos4_tts/say'
		});
					
		this.setColor = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/heart/set_color',
			serviceType : 'airos4_heart/set_color'
		});
					
		this.mouthPrint = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/mouth/mouth_print',
			serviceType : 'airos4_mouth/mouth_print'
		});
					
		this.mouthDraw = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/mouth/mouth_draw',
			serviceType : 'airos4_mouth/mouth_draw'
		});

		this.mouthDrawImage = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/mouth/mouth_draw_image_file',
			serviceType : 'airos4_mouth/mouth_draw_image_file'
		});
		
		this.getLanguage = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/tts/get_language',
			serviceType : 'airos4_tts/get_language'
		})

		this.getVoice = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/tts/get_voice',
			serviceType : 'airos4_tts/get_voice'
		})

		this.setLanguageTTS = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/tts/set_language',
			serviceType : 'airos4_tts/set_language'
		})

		this.setTTS = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/tts/set_tts',
			serviceType : 'airos4_tts/set_tts'
		})

		this.setLanguageASR = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/asr/set_language',
			serviceType : 'airos4_asr/set_language'
		})

		this.checkGrammar = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/asr/check_grammar',
			serviceType : 'airos4_asr/check_grammar'
		})

		this.onoffASR = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/asr/set_mode',
			serviceType : 'airos4_asr/set_mode'
		})

		this.setVoice = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/tts/set_voice',
			serviceType : 'airos4_tts/set_voice'
		})

		this.setGrammar = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/asr/set_grammar',
			serviceType : 'airos_asr/set_grammar'
		})

		this.move = new ROSLIB.Service({
			ros : this.ros,
			//name : '/botmobile/move',
			//serviceType : 'botmobile/MoveBotmobile'
			name : '/botmovil/Move',
			serviceType : 'botmovil/MoveService'
		})
		
		this.setEmotion = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/performance/set_performance',
			serviceType : 'airos4_performance/set_performance'
		})

		this.getAudioListService = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/audio/get_list_audio',
			serviceType : 'audio/get_list_audio'
		})

		this.playService = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/audio/play',
			serviceType : 'audio/play'
		})

		this.playSoundScratch = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/audio/play_file',
			serviceType : 'audio/play_file'
		})
		
		this.stopAllService = new ROSLIB.Service({
			ros : this.ros,
			name : '/airos4/audio/stop_all',
			serviceType : 'audio/stop_all'
		})

		
		
		// Listeners and services
		this.listeners = new Listeners(this)
		//this.services = new Services(this)
	};

	ROSBot.prototype.initialState=function(){
		this.accelerometer = true;
		this.touch = true;
		this.touchedHead = false;
		this.touchedLeft = false;
		this.touchedRight = false;
		this.accelerometerChanged = false;
		this.currentPosition = 'standup';
		this.listened=false;
		this.listenedSentence=null;
		this.moving=false;
		this.listening=true;
		this.touchListenerOn = false;
		this.accelListenerOn = false;
		this.asrListenerOn =false;
	}
	
	ROSBot.prototype.TOUCH_MASK={
		LEFT:1,
		HEAD:2,
		RIGHT:4
	}
	
	/*ROSBot.prototype.touched = function(where){
		if(where & this.TOUCH_MASK.LEFT) {
			this.touchedLeft=true;
		} 
		if(where & this.TOUCH_MASK.RIGHT) {
			this.touchedRight=true;
		} 
		if(where & this.TOUCH_MASK.HEAD) {
			this.touchedHead=true;
		} 
	}*/

	ROSBot.prototype.touched = function(message){
		if(message.right) this.touchedRight=true;
		if(message.left) this.touchedLeft=true;
		if(message.head) this.touchedHead=true;
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
			name : '/airos4/accel/accelerometer',
			messageType : 'airos4_msgs/Accelerometer'
		});
		
		this.touch = new ROSLIB.Topic({
			ros : bot.ros,
			name : '/airos4/touch/touch',
			messageType : 'airos4_msgs/Touch'
		});
		
		this.asr = new ROSLIB.Topic({
			ros : bot.ros,
			name : '/airos4/asr/recognition',
			messageType : 'std_msgs/String'
		});

        this.faceDetected = new ROSLIB.Topic({
            ros : bot.ros,
            name : '/airos4/face/detected',
            messageType : 'std_msgs/Int8'
        });

        this.qrDetected = new ROSLIB.Topic({
            ros : bot.ros,
            name : '/airos4/qr/code',
            messageType : 'std_msgs/String'
        });

        this.eyesCovered = new ROSLIB.Topic({
            ros : bot.ros,
            name : '/airos4/vision/dark',
            messageType : 'std_msgs/Bool'
        });

        this.rfidDetected = new ROSLIB.Topic({
            ros : bot.ros,
            name : '/airos4/rfid/id',
            messageType : 'std_msgs/String'
        });
		
		this.ttsSdk = new ROSLIB.Topic({
			ros : bot.ros,
			name : '/airos4/tts/userSdk',
			messageType : 'std_msgs/Int16'
		});
		
		this.asrSdk = new ROSLIB.Topic({
			ros : bot.ros,
			name : '/airos4/asr/userSdk',
			messageType : 'std_msgs/Int16'
		});

		/*this.touch.subscribe((function(message) {
			if( bot.touch ) {
				
				this.update("touch", message.left + "#" + message.head + "#" + message.right);
				var where = 0

				if(message.left) bot.touchedLeft=true;
				if(message.right) bot.touchedRight=true;
				if(message.head) bot.touchedHead=true;
			}
		}).bind(this));*/
		
		
		//this.accelerometer.subscribe((function(message) {
		//	if( bot.accelerometer ) {
				
		//			this.update("accelerometer", message.x + "#" + message.y + "#" + message.z);

					/*var x_deg = Math.atan( message.x / (Math.sqrt(Math.pow(message.y,2) + Math.pow(message.z,2))));
					x_deg = x_deg * 180.00;
					x_deg = x_deg / Math.PI;*/


		//			var x_deg=getDegrees(message.x);
		//			var y_deg=getDegrees(message.y);

					/*if( x_deg > 67.5 ) {
						position = 0;
					} else if ( x_deg > 45 ) {
						position = 1;
					} else if ( x_deg > 22.5 ) {
						position = 2;
					} else if ( x_deg > -22.5 ) {
						position = 3;
					} else {
						position = 4;
					}*/

					/*if( x_deg > 60) {
						position = 0;
					} else if ( x_deg > 30 ) {
						position = 1;
					} else if ( x_deg > 0 ) {
						position = 2;
					}*/

		/*			if( x_deg > 45 ) {
						position = 3;
					} else if ( x_deg > 0 ) {
						position = 2;
					} else if ( x_deg > -45 ) {
						position = 1;
					} else {
						position = 0;
					}
					
					if(this.update("position", position)){
						bot.accMoved(position);
					}
			}
		}).bind(this));*/
		
		
		this.asr.subscribe((function(message) {
			bot.listenedSentence=(message.data).toString();
			bot.listened=true;
		}).bind(this));

	}
	

	function getDegrees(num){
		var max = 0.984;
		var min = -0.984;
		var maxD = 79.86;
		var res=-1;

		if(num >= 0){
			if(num <= max)
				res = ((num*maxD)/max);
			else
				res = 90;
		}
		else{
			if(num >= min)
				res = ((num*maxD)/min)*-1;
			else
				res = -90;
		}
		return res;
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
				ScratchExtensions.unregister(bot);
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
			/*ls = []
			ls = getSounds(botAux);
			setBlocks(botAux,ls);
			ScratchExtensions.register(botAux, descriptor2, ext);*/
			getSounds(botAux);
            setTimeout(function(){ 
                var robot=findBot(bot);
                if(robot==null)
                    alert("Error Connecting. Websockets Error"); }, 5000);
		}
	}
	

	ext.disconnectBot = function(bot){
		deleteBot(bot);
	}
	
	/*ext.setLanguage = function(bot,select,language,voice,callback){
		var index;
		var indexv4;
		var lang;
		var langv4;
		var request;
		var robot=findBot(bot);
		
		if(robot!=null){
			switch (language){
				case 'English':
					lang=0;
					langv4="en";
					if(voice=='Male'){index=0; indexv4=EnDiphoneFestivalVoice;}
					else{index=1; indexv4=EnArticFestivalVoice;} 
					break;
				case 'Spanish':
					lang=1;
					langv4="es";
					if(voice=='Male'){index=2; indexv4=EsDiphoneMaleFestivalVoice;} 
					else{index=3; indexv4=EsDiphoneFemaleFestivalVoice;} 
					break;
				case 'Catalan': lang=2; langv4="cat"; index=4;
					break;
				case 'French': lang=3; langv4="fr"; index=5;
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
					//language : lang
					language : langv4
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
							voice :  indexv4
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
						//voice :  index
						voice : indexv4
					})

					robot.setVoice.callService(request, (function(response) {
					}));
						
					callback();
				},2000);
			}
			else{
				//robot.listeners.asrSdk.publish(req);
				setTimeout(function(){
					robot.setLanguageASR.callService(request, (function(result) {
					}).bind($(this)));
					callback();
				},12000);
			}
		}
	}*/

	ext.setLanguage = function(bot,select,language,voice,callback){
		var index;
		var indexv4;
		var lang;
		var langv4;
		var request;
		var robot=findBot(bot);
		var typeTTS="pico";
		
		if(robot!=null){
			switch (language){
				case 'English':
					lang=0;
					langv4="en";
					//if(voice=='Male'){index=0; indexv4="default";}//indexv4=EnDiphoneFestivalVoice;}
					//if(voice=='Male'){index=0; indexv4=EnDiphoneFestivalVoice; typeTTS="festival";}
					if(voice=='Male'){index=0; indexv4="default"; typeTTS="espeak";}
					else{index=1; indexv4="default";}//indexv4=EnArticFestivalVoice;} 
					break;
				case 'Spanish':
					lang=1;
					langv4="es";
					//if(voice=='Male'){index=2; indexv4="default";}//indexv4=EsDiphoneMaleFestivalVoice;}
					//if(voice=='Male'){index=2; indexv4=EsDiphoneMaleFestivalVoice; typeTTS="festival";}
					if(voice=='Male'){index=2; indexv4="default"; typeTTS="espeak";}
					else{index=3; indexv4="default";}//indexv4=EsDiphoneFemaleFestivalVoice;} 
					break;
				case 'Catalan': 
					if(voice=='Male'){lang=2; langv4="ca"; index=4; indexv4="default"; typeTTS="espeak";}
					else {lang=2; langv4="ca"; index=4; indexv4="upc_ca_bet_hts"; typeTTS="festival";}
					break;
				case 'French': 
					if(voice=='Male'){lang=3; langv4="fr"; index=5; indexv4="default"; typeTTS="espeak";}
					else {lang=3; langv4="fr"; index=5; indexv4="default";}//typeTTS="espeak";
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
					//language : lang
					language : langv4
			});

			requestSetTTS = new ROSLIB.ServiceRequest({
				//language : lang
				ttsType : typeTTS
			});
			
			if(select == 'all'){
				robot.listeners.ttsSdk.publish(req);

				robot.setTTS.callService(requestSetTTS, (function(result){
					robot.setLanguageTTS.callService(request, (function(result1) {
						robot.listeners.asrSdk.publish(req);

						robot.setLanguageASR.callService(request, (function(result) {
							request = new ROSLIB.ServiceRequest({
								voice :  indexv4
							})


                            if((typeTTS != 'pico') && (typeTTS != 'espeak')){
                                robot.setVoice.callService(request, (function(response) {
                                }));
                            }
							callback();
						}).bind($(this)));
					}).bind($(this)));
				}).bind($(this)));
			}
			else if(select == 'TTS'){
				robot.listeners.ttsSdk.publish(req);

				robot.setTTS.callService(requestSetTTS, (function(result){
					robot.setLanguageTTS.callService(request, (function(result1) {
						request = new ROSLIB.ServiceRequest({
							//voice :  index
							voice : indexv4
						});

                        if((typeTTS != 'pico') && (typeTTS != 'espeak')){
    						robot.setVoice.callService(request, (function(response) {
    						}));
                        }
								
						callback();
					}).bind($(this)));
				}).bind($(this)));

			}
			else{
				//robot.listeners.asrSdk.publish(req);
				robot.setLanguageASR.callService(request, (function(result) {
					callback();
				}).bind($(this)));
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
					if(list[i] == ' '){
						word+='_';
					}
					else
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
			if(robot.asrListenerOn == false){
				robot.asrListenerOn = true;
				robot.listeners.asr.subscribe((function(message) {
					robot.listenedSentence=(message.data).toString();
					robot.listened=true;
				}).bind(this));
			}

			var request = new ROSLIB.ServiceRequest({
				grammar : gram
			});

			/*setTimeout(function(){
				invalids = ""
				robot.checkGrammar.callService(request, function(result){
					is_correct=result.correct;
					if(!result.correct){
						for(i=0;i<(result.invalid_words).length;i++){
							if (i<(result.invalid_words).length-1){
								invalids+=(result.invalid_words)[i]+", ";
							}
							else{
								invalids+=(result.invalid_words)[i];
							}
						}
						alert("The next words are not at our ASR dictionary: "+invalids);
						if(callback!=null)
							callback();
					}
				});
			},2000);*/
		
			robot.setGrammar.callService(request, function(result1){
				if(callback!=null)
					callback();
			});
		}
	}


	ext.setEmotion = function(bot,emotion){
		var robot=findBot(bot);
		var state;

		if(robot!=null){

			state = emotion;
			
			var request = new ROSLIB.ServiceRequest({
				emotion : state
			});
			
			robot.setEmotion.callService(request, function(result1){
			});
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
	

	ext.sayTTS = function(bot,text,moving,block,callback){
		if(block == 'block'){
			if(moving == 'moving')
				botSay(bot,text.toString(),true,callback);
			else
				botSay(bot,text.toString(),false,callback);
		}
		else{
			if(moving == 'moving')
				botSay(bot,text.toString(),true,null);
			else
				botSay(bot,text.toString(),false,null);
			callback();
		}
	}
	
	ext.sayList = function(bot,list,moving,block,callback){
		var m=false;
		if(list!=null){
			//var auxList = list.split(". ");
			var auxList = makeList(list);
			var len = auxList.length;
			for(var i=0; i<len; i++){
				auxList[i] = auxList[i].replace(/_/g,' ');
			}
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

	function rangeLimiter(min,max,num){
		var result=num;

		if(num<min){
			result=min;
		}
		else if(num>max){
			result=max;
		}

		return result;
	}

	function moveServo(bot,position,time,servo,callback){
		var robot=findBot(bot);

		
		if(robot!=null && !isNaN(position) && position!=null){
			var timeAux;

			if(time=='slow'){
				timeAux = 1.8;
			}
			else if(time=='medium'){
				timeAux = 0.8;
			}
			else{
				//if(servo == 0)
				timeAux = 0.1;
				//else
					//timeAux = 0;
			}

			position = rangeLimiter(0,1,position);

			var waitAux = true;
			if(callback==null)
				waitAux = false;

			// The request is an object used to send the parameters to the service
			var request = new ROSLIB.ServiceRequest({
				position : parseFloat(position),
				servo: servo,
				time : timeAux,
				type : 0,
				async : waitAux
			});
			
			// And now we use the method callService, this is where themagic happens.
			robot.moveHeadService.callService(request, function( result ){
				//if(callback!=null)
					callback();
			});
		}
		/*else{
			callback();
		}*/
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
			moveServo(bot,position,time,2,callback);
		else{
			moveServo(bot,position,time,2,null);
			callback();
		}
	}
	
	ext.moveEyes = function(bot,position,time,block,callback){
		if(block == 'block')
			moveServo(bot,position,time,1,callback);
		else{
			moveServo(bot,position,time,1,null);
			callback();
		}
	}
	
	function moveBot(bot,time,direction,veloc,block,callback){
		var robot = findBot(bot);
		var auxVel = 0;

		if(veloc == 'slow'){
			auxVel = 10;
		}
		else if(veloc == 'medium'){
			auxVel = 60;
		}
		else
			auxVel = 100;
		
		/*if(robot!=null){
			if(!moving || (direction==5 && moving)){
				var request = new ROSLIB.ServiceRequest({
					cmd : direction,
					time : time,
					vel : auxVel
				});
					
				robot.move.callService(request, function( result ){
					if(time == -2)	robot.moving = true;
					if(direction == 5) robot.moving = false;
					if(callback != null)
						callback();
				});
			}
		}*/

		var waitAux = true;
		if(block != 'block')
			waitAux = false;

		if(robot!=null){
			if(!moving || (direction==5 && moving)){
				var request = new ROSLIB.ServiceRequest({
					cmd : direction,
					time : time,
					vel : auxVel,
					wait : waitAux
				});
					
				robot.move.callService(request, function( result ){
					if(time == -2)	robot.moving = true;
					if(direction == 5) robot.moving = false;
                    //if(direction == 'stop') robot.moving = false;
					//if(callback != null)
					callback();
				});
			}
		}

		if(block != 'block')
			callback();
	}
	
	ext.moveForward = function(bot,time,veloc,block,callback){
		moveBot(bot,time,1,veloc,block,callback);
		//moveBot(bot,time,'forward',veloc,block,callback);
	}
	
	ext.moveForwardI = function(bot,veloc,block,activate,callback){
		if(activate == 'on') moveBot(bot,-2,1,veloc,block,callback);
		//if(activate == 'on') moveBot(bot,-2,'forward',veloc,block,callback);
		else callback();
	}
	
	ext.moveBackwards = function(bot,time,veloc,block,callback){
		moveBot(bot,time,2,veloc,block,callback);
		//moveBot(bot,time,'backward',veloc,block,callback);
	}
	
	ext.moveBackwardsI = function(bot,veloc,block,activate,callback){
		if(activate == 'on') moveBot(bot,-2,2,veloc,block,callback);
		//if(activate == 'on') moveBot(bot,-2,'backward',veloc,block,callback);
		else callback();
	}
	
	ext.rotateLeft = function(bot,time,veloc,block,callback){
		moveBot(bot,time,3,veloc,block,callback);
		//moveBot(bot,time,'left',veloc,block,callback);
        //moveBot(bot,time,'right',veloc,block,callback);
	}
	
	ext.rotateLeftI = function(bot,veloc,block,activate,callback){
		if(activate == 'on') moveBot(bot,-2,3,veloc,block,callback);
        //if(activate == 'on') moveBot(bot,-2,'left',veloc,block,callback);
		//if(activate == 'on') moveBot(bot,-2,'right',veloc,block,callback);
		else callback();
	}
	
	ext.rotateRight  = function(bot,time,veloc,block,callback){
		moveBot(bot,time,4,veloc,block,callback);
        //moveBot(bot,time,'left',veloc,block,callback);
		//moveBot(bot,time,'left',veloc,block,callback);
	}
	
	ext.rotateRightI  = function(bot,veloc,block,activate,callback){
		if(activate == 'on') moveBot(bot,-2,4,veloc,block,callback);
		//if(activate == 'on') moveBot(bot,-2,'right',veloc,block,callback);
        //if(activate == 'on') moveBot(bot,-2,'left',veloc,block,callback);
		else callback();
	}
	
	ext.stopBot = function(bot,block,callback){
		moveBot(bot,1,5,30,block,callback);
		//moveBot(bot,1,'stop',30,block,callback);
	}
	
	ext.hearth = function(bot,r,g,b,time,block,callback){
		var robot=findBot(bot);

        r=parseInt(r);
        g=parseInt(g);
        b=parseInt(b);
		
		if(robot!=null && !isNaN(r) && !isNaN(g) && !isNaN(b) && r!=null && g!=null && b!=null){
			// LED

			r = rangeLimiter(0,255,r);
			g = rangeLimiter(0,255,g);
			b = rangeLimiter(0,255,b);

			var colorRequest = new ROSLIB.ServiceRequest({
				red : r,
				green : g,
				blue : b,
				time : time
			});
			
			robot.setColor.callService(colorRequest, function( result1 ){
				if(block == 'block')
					callback();
			});
		}
		else{
			callback();
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
				sentence : text.toString(),
				speed : 1
			});
			
			robot.mouthPrint.callService(printRequest, function( result1 ){
				if(block == 'block')
					callback();
			});
		}

		if(block != 'block')
				callback();
	}
	
	ext.botTouched = function(bot,side){
		var robot=findBot(bot);
	
		if(robot.touchListenerOn == false){
			robot.touchListenerOn = true;
			robot.listeners.touch.subscribe((function(message) {
				if( robot.touch ) {
					
					robot.listeners.update("touch", message.left + "#" + message.head + "#" + message.right);
					var where = 0

					if(message.left) robot.touchedLeft=true;
					if(message.right) robot.touchedRight=true;
					if(message.head) robot.touchedHead=true;
				}
			}).bind(this));
		}

		switch (side){
			case 'head':
				if(robot.touchedHead){
					robot.touchedHead = false;
					return true;
				}
				break;
			case 'left':
				if(robot.touchedLeft){
					robot.touchedLeft = false;
					return true;
				}
				break;
			case 'right':
				if(robot.touchedRight){
					robot.touchedRight = false;
					return true;
				}
				break;
			default:
				return false;
				break;
		}
		
	}
	
	ext.botMoved = function(bot,position){
		var robot=findBot(bot);

		if(robot.accelListenerOn == false){
			robot.accelListenerOn = true;
			robot.listeners.accelerometer.subscribe((function(message) {
				if( robot.accelerometer ) {
					
						robot.listeners.update("accelerometer", message.x + "#" + message.y + "#" + message.z + "#" + message.position);


						/*var x_deg=getDegrees(message.x);
						var y_deg=getDegrees(message.y);

						if( x_deg > 45 ) {
							position = 3;
						} else if ( x_deg > 0 ) {
							position = 2;
						} else if ( x_deg > -45 ) {
							position = 1;
						} else {
							position = 0;
						}*/

						var position = message.position;
						
						if(robot.listeners.update("position", position)){
							robot.accMoved(position);
						}
				}
			}).bind(this));
		}
	
		/*switch(position){
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
			default: return false;*/

			switch(position){
			case 'left':
				if (robot.currentPosition=='left' && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			case 'right':
				if (robot.currentPosition=='right' && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			case 'forward':
				if (robot.currentPosition=='forward' && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			case 'backward':
				if (robot.currentPosition=='backward' && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			case 'standup':
				if (robot.currentPosition=='standup' && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			case 'facedown':
				if (robot.currentPosition=='facedown' && robot.accelerometerChanged){
					robot.accelerometerChanged=false;
					return true;
				}
				break;
			default: return false;
		}
	}
	

	ext.startStopAsr = function(bot,option,block,callback){
		var robot=findBot(bot);

		if(robot!=null){
			var mode;
			if(option=="start"){
				mode = "enable";
				robot.listening = true;
			}
			else{
				mode = "disable";
				robot.listening = false;
			}

			var request = new ROSLIB.ServiceRequest({
				data : mode,
			});

			robot.onoffASR.callService(request, function( result1 ){
				if(block == 'block')
					callback();
			});
		}

		if(block != 'block')
			callback();
	}

	ext.botHeard = function(bot,sentence){
		var robot=findBot(bot);

		/*if(robot.asrListenerOn == false){
			robot.asrListenerOn = true;
			robot.listeners.asr.subscribe((function(message) {
				robot.listenedSentence=(message.data).toString();
				robot.listened=true;
			}).bind(this));
		}*/
		
        if(robot != null){
    		if(robot.listening && robot.listened){
    			if((robot.listenedSentence).toLowerCase()==(sentence.toString()).toLowerCase()){
    				robot.listened=false;
    				return true;
    			}
    		}
    		else
    			return false;
        }
        else return false;
	}

    ext.botFace = function(bot,faces){
        var robot=findBot(bot);

        if(robot.faceListenerOn == false){
            robot.faceListenerOn = true;
            robot.listeners.faceDetected.subscribe((function(message) {
                robot.faceListenedNumber=message.data;
                robot.faceListened=true;
            }).bind(this));
        }
        
        if(robot != null){
            if(robot.faceListened){
                if(robot.faceListenedNumber == faces){
                    robot.faceListened=false;
                    return true;
                }
            }
            else
                return false;
        }
        else return false;
    }

    ext.botQr = function(bot,menu,sentence){
        var robot=findBot(bot);

        sentence = String(sentence);

        if(robot!=null){
        if(robot.qrListenerOn == false){
            robot.qrListenerOn = true;
            robot.listeners.qrDetected.subscribe((function(message) {
                robot.qrListenedSentence=message.data;
                robot.qrListened=true;
            }).bind(this));
        }
        
        if(robot.qrListened){
            var list = false;
            var splittedSentence = sentence.split(' ');
            if(splittedSentence.length > 1){
                list = true;
            }
            /*if((robot.qrListenedSentence).toLowerCase() == sentence.toLowerCase()){
                robot.qrListened=false;
                return true;
            }*/
            if(menu=='gets'){
                if((robot.qrListenedSentence).toLowerCase() == sentence.toLowerCase()){
                    robot.qrListened=false;
                    return true;
                }
            }
            else{
                if(!list){
                    if((robot.qrListenedSentence).toLowerCase() != sentence.toLowerCase()){
                        robot.qrListened=false;
                        return true;
                    }
                }
                else{
                    var found = false;
                    for(var i=0; i<splittedSentence.length; i++){
                        if((robot.qrListenedSentence).toLowerCase() == splittedSentence[i].toLowerCase()){
                            found = true;
                        }
                    }
                    if(!found){
                        robot.qrListened=false;
                        return true;
                    }
                }
            }
        }
        else
            return false;
        }
        else return false;
    }

    ext.botEyesCover = function(bot,cover){
        var robot=findBot(bot);

        if(robot.eyesCoverListenerOn == false){
            robot.eyesCoverListenerOn = true;
            robot.listeners.eyesCovered.subscribe((function(message) {
                if(robot.listeners.update("eyesCover",message.data)){
                    robot.eyesCoverListenedValue = message.data;
                    robot.eyesCoverListened =true;
                }
            }).bind(this));
        }
        
        if(robot != null){
            if(robot.eyesCoverListened){
                if(cover == 'covered'){
                    if(robot.eyesCoverListenedValue){
                        robot.eyesCoverListened = false;
                        return true;
                    }
                }
                else{
                    if(!robot.eyesCoverListenedValue){
                        robot.eyesCoverListened = false;
                        return true;
                    }
                }
            }
        }
    }

    ext.botRfid = function(bot,sentence){
        var robot=findBot(bot);

        if(robot.rfidListenerOn == false){
            robot.rfidListenerOn = true;
            robot.listeners.rfidDetected.subscribe((function(message) {
                robot.rfidListenedSentence=message.data;
                robot.rfidListened=true;
            }).bind(this));
        }
        
        if(robot.rfidListened){
            //if((robot.rfidListenedSentence).toLowerCase() == sentence.toLowerCase()){
            if(robot.rfidListenedSentence == sentence){
                robot.rfidListened=false;
                return true;
            }
        }
        else
            return false;
    }
	
	var scratchList = ['Not','Done'];


	ext.playSound = function(bot,sound){
		var robot=findBot(bot);
		
		if(robot!=null){
			var playRequest =  new ROSLIB.ServiceRequest({
				filename : sound+"*"
			});
					
			robot.playService.callService(playRequest, function( result1 ){
			});
		}
		
	}

	
	function getSounds(bot){
		var robot=findBot(bot);
		var reqList = [];
		var sList = null;

		if(robot!=null){
			var req = new ROSLIB.ServiceRequest({
				filter : "*"
			});

			robot.getAudioListService.callService(req, function( result1 ){
					ls = result1.list;
					ls=ls.sort();
					setBlocks(bot,ls);
					ScratchExtensions.register(bot, descriptor2, ext);
			});
		}
	}


	ext.stopAllSound = function(bot){
		var robot=findBot(bot);
		
		if(robot!=null){
			var stopAllRequest =  new ROSLIB.ServiceRequest({
			});
					
			robot.stopAllService.callService(stopAllRequest, function( result1 ){
			});
		}
	}

	ext.mouthDrawImage = function(bot,costume,sprite,block,callback){
		var robot=findBot(bot);

		if (window.XMLHttpRequest && robot!=null)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			req=new XMLHttpRequest();

			//OBTAIN THE PROJECT ID
			thisURL = document.URL;
			splittedURL = thisURL.split('/');
			projectID = splittedURL[splittedURL.length-2];
			//alert(projectID);

			//req.open("GET","http://projects.scratch.mit.edu/internalapi/project/37321876/get/",false);
			req.open("GET","http://projects.scratch.mit.edu/internalapi/project/"+ projectID +"/get/",false);
			req.send(null);

			if(req.status == 200){
				//alert(req.responseText);

				//OBTAIN THE MD5 OF COSTUME TO SHOW
				var msn = eval("(" + req.responseText + ")");
				//para buscar en children y costumes hay que hacer una búsqueda para quedarte con el que corresponda
				var childs = msn.children;
				var i=0;
				var index1 = 0;
				var index2 = 0;
				for(i=0; i<childs.length; i++){
					if(childs[i].objName == sprite)
						index1 = i;
				}

				var costumes = childs[index1].costumes;
				for(i=0; i<costumes.length; i++){
					if(costumes[i].costumeName == costume)
						index2 = i;
				}

				md5Code = msn.children[index1].costumes[index2].baseLayerMD5;
				//alert(md5Code);

				extMd5 = md5Code.split('.');
				//if(!md5Code.endsWith('svg')){
				if(extMd5[(extMd5.length)-1] != 'svg'){
					ImageUrl = "http://cdn.assets.scratch.mit.edu/internalapi/asset/"+ md5Code +"/get/";

					//alert(ImageUrl);

					var drawImageRequest =  new ROSLIB.ServiceRequest({
						file: ImageUrl
					});
							
					robot.mouthDrawImage.callService(drawImageRequest, function( result1 ){

					});
				}
			}
		}

		callback();
	}

	function getScratchJson(){
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			req=new XMLHttpRequest();

			//OBTAIN THE PROJECT ID
			thisURL = document.URL;
			splittedURL = thisURL.split('/');
			projectID = splittedURL[splittedURL.length-2];
			//alert(projectID);

			//req.open("GET","http://projects.scratch.mit.edu/internalapi/project/37321876/get/",false);
			req.open("GET","http://projects.scratch.mit.edu/internalapi/project/"+ projectID +"/get/",false);
			req.send(null);

			var msn = "";

			if(req.status == 200){
				msn = eval("(" + req.responseText + ")");
			}

			return msn;
		}
	}

	ext.playScratchSound = function(bot,sound,sprite){
		var robot = findBot(bot);

		if(robot!=null){
			//var msn = eval("(" + req.responseText + ")");
			//para buscar en children y costumes hay que hacer una búsqueda para quedarte con el que corresponda
			var msn = getScratchJson();
			var childs = msn.children;
			var i=0;
			var index1 = 0;
			var index2 = 0;
			for(i=0; i<childs.length; i++){
				if(childs[i].objName == sprite)
					index1 = i;
			}

			var costumes = childs[index1].sounds;
			for(i=0; i<costumes.length; i++){
				if(costumes[i].soundName == sound)
					index2 = i;
			}

			md5Code = msn.children[index1].sounds[index2].md5;

			SoundUrl = "http://cdn.assets.scratch.mit.edu/internalapi/asset/"+ md5Code +"/get/";

			var playSoundRequest =  new ROSLIB.ServiceRequest({
				data: SoundUrl
			});
						
			robot.playSoundScratch.callService(playSoundRequest, function( result1 ){
			});
		}
	}



    var descriptor = {
        blocks: [
			[' ', '[D] connect %s to ip %s', 'connectBot', 'bot1', 'aisoy1.local'],
			[' ', '[D] disconnect %s', 'disconnectBot', 'bot1'],
			['w', '[D] %s set %m.selectLan language to %m.textLanguage with %m.voiceLanguage voice', 'setLanguage', 'bot1', 'all','English', 'Male'],
			['w', '[D] %s grammar = %s', 'setGrammar', 'bot1', 'list'],
			['w', '[A] %s %m.asrMenu ASR recognition %m.blocking', 'startStopAsr', 'bot1', 'start', 'block'],
			//['w', 'set %s to %m.states state %m.blocking', 'setEmotion', 'bot1', 'Normal', 'block'],
			[' ', '[A] %s state is %m.states', 'setEmotion', 'bot1', 'Normal'],
			['w', '[A] %s says %s %m.mouthMenu mouth %m.blocking', 'sayTTS', 'bot1', 'text to say', 'moving','block'],
			//['w', '%s say %s without moving mouth %m.blocking', 'sayWithout', 'bot1','text to say', 'block'],
			//['w', '%s say %s moving mouth %m.blocking', 'sayWith', 'bot1', 'text to say', 'block'],
			['w', '[A] %s says one of the %s %m.saying moving mouth %m.blocking', 'sayList', 'bot1', 'list','with','block'],
			//['w', 'move head horizontal of %s to %n in %n seconds %m.blocking', 'moveHeadH', 'bot1',0.5, 1, 'no block'],
			['w', '[A] %s moves head horizontal to %n %m.velocity %m.blocking', 'moveHeadH', 'bot1',0.5, 'medium', 'no block'],
			//['w', 'move head vertical of %s to %n in %n seconds %m.blocking', 'moveHeadV', 'bot1',0.5, 1, 'no block'],
			//['w', 'move eyebrows of %s to %n in %n seconds %m.blocking', 'moveEyebrows', 'bot1',0.5, 1, 'no block'],
			['w', '[A] %s moves eyebrows to %n %m.velocity %m.blocking', 'moveEyebrows', 'bot1',0.5, 'medium', 'no block'],
			//['w', 'move eyes of %s to %n in %n seconds %m.blocking', 'moveEyes', 'bot1',0.5, 1, 'no block'],
			['w', '[A] %s moves eyes to %n %m.velocity %m.blocking', 'moveEyes', 'bot1',0.5, 'medium', 'no block'],
			/*['w', 'move %s forward %n seconds %m.blocking', 'moveForward', 'bot1', 1, 'no block'],
			['w', 'move %s forward indefinitely %m.blocking', 'moveForwardI', 'bot1', 'no block'],
			['w', 'move %s backwards %n seconds %m.blocking', 'moveBackwards', 'bot1', 1, 'no block'],
			['w', 'move %s backwards indefinitely %m.blocking', 'moveBackwardsI', 'bot1', 'no block'],
			['w', 'rotate %s left %n seconds %m.blocking', 'rotateLeft', 'bot1', 1, 'no block'],
			['w', 'rotate %s left indefinitely %m.blocking', 'rotateLeftI', 'bot1', 'no block'],
			['w', 'rotate %s right %n seconds %m.blocking', 'rotateRight', 'bot1', 1, 'no block'],
			['w', 'rotate %s right indefinitely %m.blocking', 'rotateRightI', 'bot1', 'no block'],
			['w', 'stop %s %m.blocking', 'stopBot', 'bot1', 'no block'],*/
			['w', '[A] %s heart light to: red %n green %n blue %n in %n secs %m.blocking', 'hearth', 'bot1', 255, 255, 255, 1, 'no block'],
			//['w', '[A] %s draw in mouth picture %s %m.blocking', 'mouthDraw','bot1','                                          x            xx            x x          x   x        x     xxxxxxxx                               ','no block'],
			['w', '[A] %s draws %s of %s in mouth %m.blocking', 'mouthDrawImage', 'bot1','costume1','Sprite1','no block'],
			['w', '[A] %s writes %s in mouth %m.blocking', 'mouthWrite','bot1','text to write','no block'],
			['h', '[E] when %s is touched at %m.sides', 'botTouched', 'bot1', 'head'],
			['h', '[E] when %s is in position %m.positions', 'botMoved', 'bot1', 'standup'],
			['h', '[E] when %s hears %s', 'botHeard', 'bot1', 'sentence'],
            ['h', '[E] when %s detects %n faces', 'botFace', 'bot1', 1],
            //['h', '[E] when %s gets %s from qr', 'botQr', 'bot1', 'code'],
            ['h', '[E] when %s %m.qrMenu %s from qr', 'botQr', 'bot1','gets','code'],
            ['h', '[E] when %s gets %m.eyesCoverMenu its eyes', 'botEyesCover', 'bot1','covered'],
            //['h', '[E] when %s gets %s from rfid', 'botRfid', 'bot1', 'code'],
        ],
		menus: {
			selectLan: ['all', 'ASR', 'TTS'],
			textLanguage: ['English', 'Spanish', 'Catalan', 'French'],
			voiceLanguage: ['Male','Female'],
			states: ['Normal', 'Sad', 'Happy', 'Angry', 'Indifferent', 'Surprise', 'Disgust', 'Relief', 'Reproach', 'Pride', 'Admiration', 'Scared', 'Sleep', 'NoEmotion'],
			saying: ['with','without'],
			sides: ['head', 'left', 'right'],
			//positions: [0, 1, 2, 3],
			positions: ['left', 'right', 'forward', 'backward', 'standup', 'facedown'],
			blocking: ['block', 'no block'],
			asrMenu: ['start','stop'],
			mouthMenu: ['moving', 'without moving'],
			soundList: scratchList,
			velocity: ['slow','medium','fast'],
            qrMenu: ['gets','does not get'],
            eyesCoverMenu: ['covered','discovered']
		},
    };

    function setBlocks(name, list){
    	descriptor2 = {
	        blocks: [
				[' ', '[A] %s plays %m.soundList sound', 'playSound', name , ''],
				[' ', '[A] %s plays %s of %s', 'playScratchSound', name, 'sound1', 'Sprite1'],
				[' ', '[A] %s stops all sounds', 'stopAllSound', name , ''],
				['w', '[A] %s moves forward %n seconds %m.velocity %m.blocking', 'moveForward', name, 1, 'medium','no block'],
				['w', '[A] %s moves forward indefinitely %m.velocity %m.blocking %m.activate', 'moveForwardI', name, 'medium','no block', 'off'],
				['w', '[A] %s moves backwards %n seconds %m.velocity %m.blocking', 'moveBackwards', name, 1, 'medium','no block'],
				['w', '[A] %s moves backwards indefinitely %m.velocity %m.blocking %m.activate', 'moveBackwardsI', name, 'medium','no block', 'off'],
				['w', '[A] %s rotates left %n seconds %m.velocity %m.blocking', 'rotateLeft', name, 1, 'medium','no block'],
				['w', '[A] %s rotates left indefinitely %m.velocity %m.blocking %m.activate', 'rotateLeftI', name, 'medium','no block', 'off'],
				['w', '[A] %s rotates right %n seconds %m.velocity %m.blocking', 'rotateRight', name, 1, 'medium','no block'],
				['w', '[A] %s rotates right indefinitely %m.velocity %m.blocking %m.activate', 'rotateRightI', name, 'medium','no block', 'off'],
				['w', '[A] %s stops %m.blocking', 'stopBot', name, 'no block'],
	        ],
			menus: {
				//soundList: scratchList
				soundList: list,
				blocking: ['block', 'no block'],
				velocity: ['slow','medium','fast'],
				activate: ['on', 'off']
			},
    	};
    }
    //var idIP = prompt("What's your Aisoy1 IP?");
    ScratchExtensions.register('Aisoy1v4 Extension', descriptor, ext);
})({});
