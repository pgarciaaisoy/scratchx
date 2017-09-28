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
					else if(voice=='Male2'){index=0; indexv4=EnDiphoneFestivalVoice; typeTTS="festival";}
					else{index=1; indexv4="default";}//indexv4=EnArticFestivalVoice;} 
					break;
				case 'Spanish':
					lang=1;
					langv4="es";
					//if(voice=='Male'){index=2; indexv4="default";}//indexv4=EsDiphoneMaleFestivalVoice;}
					//if(voice=='Male'){index=2; indexv4=EsDiphoneMaleFestivalVoice; typeTTS="festival";}
					if(voice=='Male'){index=2; indexv4="default"; typeTTS="espeak";}
					else if(voice=='Male2'){index=2; indexv4=EsDiphoneMaleFestivalVoice; typeTTS="festival";}
					else{index=3; indexv4="default";}//indexv4=EsDiphoneFemaleFestivalVoice;} 
					break;
				case 'Catalan': 
					//if(voice=='Male' || voice=='Male2'){lang=2; langv4="ca"; index=4; indexv4="default"; typeTTS="espeak";}
                    if(voice=='Male'){lang=2; langv4="ca"; index=4; indexv4="default"; typeTTS="espeak";}
                    else if(voice=='Male2'){lang=2; index=4; indexv4="upc_ca_pau_hts"; typeTTS="festival";}
					else {lang=2; langv4="ca"; index=4; indexv4="upc_ca_bet_hts"; typeTTS="festival";}
					break;
				case 'French': 
					if(voice=='Male' || voice=='Male2'){lang=3; langv4="fr"; index=5; indexv4="default"; typeTTS="espeak";}
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

							robot.setVoice.callService(request, (function(response) {
							}));
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

						robot.setVoice.callService(request, (function(response) {
						}));
								
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

		
		if(robot!=null){
			/*var timeAux;

			if(time=='slow'){
				timeAux = 1.8;
			}
			else if(time=='medium'){
				timeAux = 0.8;
			}
			else{
				timeAux = 0;
			}*/

			/*position = rangeLimiter(0,1,position);

			// The request is an object used to send the parameters to the service
			var request = new ROSLIB.ServiceRequest({
				position : parseFloat(position),
				servo: servo,
				time : time,
				type : 0,
				async : true,
			});
			
			// And now we use the method callService, this is where themagic happens.
			robot.moveHeadService.callService(request, function( result ){
				if(callback!=null)
					callback();
			});*/
	
			position = rangeLimiter(0,1,position);

			var waitAux = true;
			if(callback==null)
				waitAux = false;

			// The request is an object used to send the parameters to the service
			var request = new ROSLIB.ServiceRequest({
				position : parseFloat(position),
				servo: servo,
				time : time,
				type : 0,
				async : waitAux
			});
			
			// And now we use the method callService, this is where themagic happens.
			robot.moveHeadService.callService(request, function( result ){
				//if(callback!=null)
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
	
	/*function moveBot(bot,time,direction,veloc,block,callback){
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
		
		if(robot!=null){
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
		}

		if(block != 'block')
			callback();
	}
	
	ext.moveForward = function(bot,time,veloc,block,callback){
		moveBot(bot,time,1,veloc,block,callback);
	}
	
	ext.moveForwardI = function(bot,block,veloc,activate,callback){
		if(activate == 'on') moveBot(bot,-2,1,veloc,block,callback);
		else callback();
	}
	
	ext.moveBackwards = function(bot,time,veloc,block,callback){
		moveBot(bot,time,2,veloc,block,callback);
	}
	
	ext.moveBackwardsI = function(bot,veloc,block,activate,callback){
		if(activate == 'on') moveBot(bot,-2,2,veloc,block,callback);
		else callback();
	}
	
	ext.rotateLeft = function(bot,time,veloc,block,callback){
		//moveBot(bot,time,3,block,callback);
		moveBot(bot,time,4,veloc,block,callback);
	}
	
	ext.rotateLeftI = function(bot,veloc,block,activate,callback){
		//moveBot(bot,-2,3,block,callback);
		if(activate == 'on') moveBot(bot,-2,4,veloc,block,callback);
		else callback();
	}
	
	ext.rotateRight  = function(bot,time,veloc,block,callback){
		//moveBot(bot,time,4,block,callback);
		moveBot(bot,time,3,veloc,block,callback);
	}
	
	ext.rotateRightI  = function(bot,veloc,block,activate,callback){
		//moveBot(bot,-2,4,block,callback);
		if(activate == 'on') moveBot(bot,-2,3,veloc,block,callback);
		else callback();
	}
	
	ext.stopBot = function(bot,block,callback){
		moveBot(bot,1,5,30,block,callback);
	}*/

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
					//if(direction == 'stop') robot.moving = false;
					if(direction == 5) robot.moving = false;
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
	}
	
	ext.rotateLeftI = function(bot,veloc,block,activate,callback){
		if(activate == 'on') moveBot(bot,-2,3,veloc,block,callback);
		//if(activate == 'on') moveBot(bot,-2,'left',veloc,block,callback);
		else callback();
	}
	
	ext.rotateRight  = function(bot,time,veloc,block,callback){
		moveBot(bot,time,4,veloc,block,callback);
		//moveBot(bot,time,'right',veloc,block,callback);
	}
	
	ext.rotateRightI  = function(bot,veloc,block,activate,callback){
		if(activate == 'on') moveBot(bot,-2,4,veloc,block,callback);
		//if(activate == 'on') moveBot(bot,-2,'right',veloc,block,callback);
		else callback();
	}
	
	ext.stopBot = function(bot,block,callback){
		moveBot(bot,1,5,30,block,callback);
		//moveBot(bot,1,'stop',30,block,callback);
	}
	
	ext.hearth = function(bot,r,g,b,time,block,callback){
		var robot=findBot(bot);
		
		if(robot!=null){
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
		
		if(robot.listening && robot.listened){
			if((robot.listenedSentence).toLowerCase()==(sentence.toString()).toLowerCase()){
				robot.listened=false;
				return true;
			}
		}
		else
			return false;
	}
	
    /*ext.botFace = function(bot,faces){
        var robot=findBot(bot);

        if(robot.faceListenerOn == false){
            robot.faceListenerOn = true;
            robot.listeners.faceDetected.subscribe((function(message) {
                robot.faceListenedNumber=message.data;
                robot.faceListened=true;
            }).bind(this));
        }
        
        if(robot.faceListened){
            if(robot.faceListenedNumber == faces){
                robot.faceListened=false;
                return true;
            }
        }
        else
            return false;
    }*/

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

    /*ext.botQr = function(bot,sentence){
        var robot=findBot(bot);

        if(robot.qrListenerOn == false){
            robot.qrListenerOn = true;
            robot.listeners.qrDetected.subscribe((function(message) {
                robot.qrListenedSentence=message.data;
                robot.qrListened=true;
            }).bind(this));
        }
        
        if(robot.qrListened){
            if((robot.qrListenedSentence).toLowerCase() == sentence.toLowerCase()){
                robot.qrListened=false;
                return true;
            }
        }
        else
            return false;
    }*/

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
			[' ', '[D] connect %s to ip %s', 'connectBot', 'bot1', '192.168.1.133'],
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
			['w', '[A] %s moves head horizontal to %n in %n secs %m.blocking', 'moveHeadH', 'bot1',0.5, 1, 'no block'],
			//['w', 'move head vertical of %s to %n in %n seconds %m.blocking', 'moveHeadV', 'bot1',0.5, 1, 'no block'],
			//['w', 'move eyebrows of %s to %n in %n seconds %m.blocking', 'moveEyebrows', 'bot1',0.5, 1, 'no block'],
			['w', '[A] %s moves eyebrows to %n in %n secs %m.blocking', 'moveEyebrows', 'bot1',0.5, 1, 'no block'],
			//['w', 'move eyes of %s to %n in %n seconds %m.blocking', 'moveEyes', 'bot1',0.5, 1, 'no block'],
			['w', '[A] %s moves eyes to %n in %n secs %m.blocking', 'moveEyes', 'bot1',0.5, 1, 'no block'],
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
            ['h', '[E] when %s gets %m.eyesCoverMenu its eyes', 'botEyesCover', 'bot1','covered']
        ],
		menus: {
			selectLan: ['all', 'ASR', 'TTS'],
			textLanguage: ['English', 'Spanish', 'Catalan', 'French'],
			voiceLanguage: ['Male','Male2','Female'],
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
    ScratchExtensions.register('Aisoy1v4 Advance', descriptor, ext);
})({});
