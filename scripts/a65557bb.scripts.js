"use strict";function initializeModel(e){var t=e.createList(),r=e.createList(),n=e.createList(),o=e.createList(),i=e.createList(),a=e.createList(),s=e.create(edoras.Analytics),l=e.createList();e.getRoot().set("features",t),e.getRoot().set("stories",r),e.getRoot().set("iterations",n),e.getRoot().set("comments",o),e.getRoot().set("tasks",i),e.getRoot().set("acceptanceTests",a),e.getRoot().set("analytics",s),e.getRoot().set("users",l)}function onFileLoaded(e){gdoc=e,Object.defineProperty(gapi.drive.realtime.CollaborativeString.prototype,"text",{set:function(e){return this.setText(e)},get:function(){return this.getText()}}),registerAllListeners(e),model=e.getModel(),features=e.getModel().getRoot().get("features"),stories=e.getModel().getRoot().get("stories"),iterations=e.getModel().getRoot().get("iterations"),comments=e.getModel().getRoot().get("comments"),tasks=e.getModel().getRoot().get("tasks"),acceptanceTests=e.getModel().getRoot().get("acceptanceTests"),analytics=e.getModel().getRoot().get("analytics"),users=e.getModel().getRoot().get("users"),refreshCollaborators(),postLoadCallback&&postLoadCallback(),console.log("received file");for(var t=[],r=0;tasks.length>r;r++){for(var n=tasks.get(r),o=!1,i=0;stories.length>i;i++){var a=stories.get(i);n.storyId==a.timestamp&&(o=!0)}o||t.push(n)}for(var r=0;t.length>r;r++)tasks.removeValue(t[r]);rootScope.$digest()}function registerTypes(){edoras.Feature=function(){},edoras.Story=function(){},edoras.Iteration=function(){},edoras.Comment=function(){},edoras.Task=function(){},edoras.AcceptanceTest=function(){},edoras.Analytics=function(){},gapi.drive.realtime.custom.registerType(edoras.Feature,"Feature"),gapi.drive.realtime.custom.registerType(edoras.Story,"Story"),gapi.drive.realtime.custom.registerType(edoras.Iteration,"Iteration"),gapi.drive.realtime.custom.registerType(edoras.Comment,"Comment"),gapi.drive.realtime.custom.registerType(edoras.Task,"Task"),gapi.drive.realtime.custom.registerType(edoras.AcceptanceTest,"AccptanceTest"),gapi.drive.realtime.custom.registerType(edoras.Analytics,"Analytics"),edoras.Feature.prototype.title=gapi.drive.realtime.custom.collaborativeField("title"),edoras.Feature.prototype.narrative=gapi.drive.realtime.custom.collaborativeField("narrative"),edoras.Feature.prototype.timestamp=gapi.drive.realtime.custom.collaborativeField("timestamp"),edoras.Iteration.prototype.title=gapi.drive.realtime.custom.collaborativeField("title"),edoras.Iteration.prototype.status=gapi.drive.realtime.custom.collaborativeField("status"),edoras.Iteration.prototype.timestamp=gapi.drive.realtime.custom.collaborativeField("timestamp"),edoras.Story.prototype.title=gapi.drive.realtime.custom.collaborativeField("title"),edoras.Story.prototype.narrative=gapi.drive.realtime.custom.collaborativeField("narrative"),edoras.Story.prototype.effort=gapi.drive.realtime.custom.collaborativeField("effort"),edoras.Story.prototype.status=gapi.drive.realtime.custom.collaborativeField("status"),edoras.Story.prototype.timestamp=gapi.drive.realtime.custom.collaborativeField("timestamp"),edoras.Story.prototype.featureId=gapi.drive.realtime.custom.collaborativeField("featureId"),edoras.Story.prototype.iterationId=gapi.drive.realtime.custom.collaborativeField("iterationId"),edoras.Comment.prototype.narrative=gapi.drive.realtime.custom.collaborativeField("narrative"),edoras.Comment.prototype.ownerId=gapi.drive.realtime.custom.collaborativeField("ownerId"),edoras.Comment.prototype.commenterId=gapi.drive.realtime.custom.collaborativeField("commenterId"),edoras.Comment.prototype.timestamp=gapi.drive.realtime.custom.collaborativeField("timestamp"),edoras.Task.prototype.narrative=gapi.drive.realtime.custom.collaborativeField("narrative"),edoras.Task.prototype.storyId=gapi.drive.realtime.custom.collaborativeField("storyId"),edoras.Task.prototype.status=gapi.drive.realtime.custom.collaborativeField("status"),edoras.Task.prototype.ownerId=gapi.drive.realtime.custom.collaborativeField("ownerId"),edoras.Task.prototype.timestamp=gapi.drive.realtime.custom.collaborativeField("timestamp"),edoras.AcceptanceTest.prototype.narrative=gapi.drive.realtime.custom.collaborativeField("narrative"),edoras.AcceptanceTest.prototype.storyId=gapi.drive.realtime.custom.collaborativeField("storyId"),edoras.AcceptanceTest.prototype.status=gapi.drive.realtime.custom.collaborativeField("status"),edoras.AcceptanceTest.prototype.ownerId=gapi.drive.realtime.custom.collaborativeField("ownerId"),edoras.AcceptanceTest.prototype.timestamp=gapi.drive.realtime.custom.collaborativeField("timestamp"),edoras.Analytics.prototype.totalPoints=gapi.drive.realtime.custom.collaborativeField("totalPoints"),edoras.Analytics.prototype.completePoints=gapi.drive.realtime.custom.collaborativeField("completePoints"),edoras.Analytics.prototype.velocity=gapi.drive.realtime.custom.collaborativeField("velocity")}function startRealtime(){var e=new rtclient.RealtimeLoader(realtimeOptions);e.start()}function registerAllListeners(e){registerModelListener(e,gapi.drive.realtime.EventType.OBJECT_CHANGED),registerModelListener(e,gapi.drive.realtime.EventType.VALUES_ADDED),registerModelListener(e,gapi.drive.realtime.EventType.VALUES_REMOVED),registerModelListener(e,gapi.drive.realtime.EventType.VALUES_SET),registerDocListener(e,gapi.drive.realtime.EventType.COLLABORATOR_LEFT),registerDocListener(e,gapi.drive.realtime.EventType.COLLABORATOR_JOINED)}function registerDocListener(e,t){e.addEventListener(t,function(){console.log(t),("collaborator_joined"==t||"collaborator_left"==t)&&(refreshCollaborators(),rootScope.$digest())})}function registerModelListener(e,t){e.getModel().getRoot().addEventListener(t,function(e){e.isLocal||rootScope.$digest()})}function refreshCollaborators(){currentCollaborators.length=0;for(var e=gdoc.getCollaborators(),t=0;e.length>t;t++){currentCollaborators.push(e[t]);for(var r=!1,n=users.asArray(),o=0;n.length>o;o++)e[t].userId==n[o].userId&&(r=!0);r||users.push(e[t])}}var rtclient=rtclient||{};rtclient.INSTALL_SCOPE="https://www.googleapis.com/auth/drive.install",rtclient.FILE_SCOPE="https://www.googleapis.com/auth/drive.file",rtclient.OPENID_SCOPE="openid",rtclient.REALTIME_MIMETYPE="application/json",rtclient.getParams=function(){var e={},t=window.location.search;if(t)for(var r=t.slice(1).split("&"),n=0;r.length>n;n++){var o=r[n].split("=");e[o[0]]=unescape(o[1])}return e},rtclient.params=rtclient.getParams(),rtclient.getOption=function(e,t,r){var n=void 0==e[t]?r:e[t];return void 0==n&&console.error(t+" should be present in the options."),n},rtclient.Authorizer=function(e){this.clientId=rtclient.getOption(e,"clientId"),this.userId=rtclient.params.userId,this.authButton=document.getElementById(rtclient.getOption(e,"authButtonElementId"))},rtclient.Authorizer.prototype.start=function(e){var t=this;gapi.load("auth:client,drive-realtime,drive-share",function(){t.authorize(e)})},rtclient.Authorizer.prototype.authorize=function(e){var t=this.clientId,r=this.userId,n=this,o=function(t){t&&!t.error?(n.authButton.disabled=!0,n.authButton.style.display="none",n.fetchUserId(e)):(n.authButton.disabled=!1,n.authButton.style.display="",n.authButton.onclick=i)},i=function(){gapi.auth.authorize({client_id:t,scope:[rtclient.INSTALL_SCOPE,rtclient.FILE_SCOPE,rtclient.OPENID_SCOPE],user_id:r,immediate:!1},o),console.log(t)};gapi.auth.authorize({client_id:t,scope:[rtclient.INSTALL_SCOPE,rtclient.FILE_SCOPE,rtclient.OPENID_SCOPE],user_id:r,immediate:!0},o)},rtclient.Authorizer.prototype.fetchUserId=function(e){var t=this;gapi.client.load("oauth2","v2",function(){gapi.client.oauth2.userinfo.get().execute(function(r){r.id&&(t.userId=r.id),e&&e()})})},rtclient.createRealtimeFile=function(e,t){gapi.client.load("drive","v2",function(){gapi.client.drive.files.insert({resource:{mimeType:rtclient.REALTIME_MIMETYPE,title:e}}).execute(t)})},rtclient.getFileMetadata=function(e,t){gapi.client.load("drive","v2",function(){gapi.client.drive.files.get({fileId:id}).execute(t)})},rtclient.parseState=function(e){try{var t=JSON.parse(e);return t}catch(r){return null}},rtclient.redirectTo=function(e,t){var r=[];e&&r.push("fileId="+e),t&&r.push("userId="+t),window.location.href=0==r.length?"/":"?"+r.join("&")},rtclient.RealtimeLoader=function(e){this.onFileLoaded=rtclient.getOption(e,"onFileLoaded"),this.initializeModel=rtclient.getOption(e,"initializeModel"),this.registerTypes=rtclient.getOption(e,"registerTypes",function(){}),this.autoCreate=rtclient.getOption(e,"autoCreate",!1),this.defaultTitle=rtclient.getOption(e,"defaultTitle","New Realtime File"),this.authorizer=new rtclient.Authorizer(e)},rtclient.RealtimeLoader.prototype.start=function(e){var t=this;this.authorizer.start(function(){t.registerTypes&&t.registerTypes(),e&&e(),t.load()})},rtclient.RealtimeLoader.prototype.load=function(){var parmObj=rtclient.params.state;if(console.log(parmObj),parmObj){var state=eval("["+parmObj+"]")[0];rtclient.params.fileId=state[0]}var fileId=rtclient.params.fileId,userId=this.authorizer.userId,state=rtclient.params.state,authorizer=this.authorizer,handleErrors=function(e){e.type==gapi.drive.realtime.ErrorType.TOKEN_REFRESH_REQUIRED?authorizer.authorize():e.type==gapi.drive.realtime.ErrorType.CLIENT_ERROR?(alert("An Error happened: "+e.message),window.location.href="/"):e.type==gapi.drive.realtime.ErrorType.NOT_FOUND&&(alert("The file was not found. It does not exist or you do not have read access to the file."),window.location.href="/")};if(fileId)return gapi.drive.realtime.load(fileId,this.onFileLoaded,this.initializeModel,handleErrors),void 0;if(state){var stateObj=rtclient.parseState(state);if("open"==stateObj.action)return fileId=stateObj.ids[0],userId=stateObj.userId,rtclient.redirectTo(fileId,userId),void 0}this.autoCreate&&this.createNewFileAndRedirect()},rtclient.RealtimeLoader.prototype.createNewFileAndRedirect=function(){var e=this;rtclient.createRealtimeFile(this.defaultTitle,function(t){t.id?rtclient.redirectTo(t.id,e.authorizer.userId):(console.error("Error creating file."),console.error(t))})};var edoras={},postLoadCallback=null,model=null,gdoc=null,currentCollaborators=[],features=null,stories=null,iterations=null,comments=null,tasks=null,acceptanceTests=null,analytics=null,users=null,rootScope=null;angular.module("tracAppServices",[]).factory("DocTracker",["$rootScope",function(e){function t(){for(var e=0,t=0;stories.length>t;t++){var r=stories.get(t);e+=r.effort}analytics.totalPoints=e;for(var n=analytics.totalPoints,t=0;stories.length>t;t++){var r=stories.get(t);4==r.status&&(n-=r.effort)}analytics.completePoints=n}function r(){for(var e=[],t=0;iterations.length>t;t++){var r=iterations.get(t);3==r.status&&e.push(r.timestamp)}for(var n=0,t=0;stories.length>t;t++){var o=stories.get(t);4==o.status&&-1!=e.indexOf(o.iterationId)&&(n+=o.effort)}var i=e.length,a=0;0!=i&&(a=n/i),analytics.velocity=a}rootScope=e;var n={};return n.waitForDocs=function(e){model?e():postLoadCallback=e},n.getCollaborators=function(){return currentCollaborators},n.getUsers=function(){return users},n.getFeatureById=function(e){for(var t=features.asArray(),r=0;t.length>r;r++){var n=t[r];if(n.timestamp==e)return n}},n.getFeatures=function(){return features},n.addFeature=function(){var e=model.create(edoras.Feature);return e.timestamp=(new Date).getTime(),features.push(e),e},n.deleteFeature=function(e){for(var t=0;features.length>t;t++){var r=features.get(t);r.timestamp==e&&features.removeValue(r)}for(var t=0;stories.length>t;t++){var n=stories.get(t);n.featureId==e&&(n.featureId=void 0)}},n.getStories=function(){return stories},n.addStory=function(){var e=model.create(edoras.Story);return e.timestamp=(new Date).getTime(),e.status=1,e.iterationId="",stories.push(e),e},n.deleteStory=function(e){for(var t=0;stories.length>t;t++){var r=stories.get(t);r.timestamp==e&&stories.removeValue(r)}for(var t=0;tasks.length>t;t++){var n=tasks.get(t);n.storyId==e&&tasks.removeValue(n)}for(var t=0;acceptanceTests.length>t;t++){var o=acceptanceTests.get(t);o.storyId==e&&acceptanceTests.removeValue(o)}for(var t=0;comments.length>t;t++){var i=comments.get(t);i.owner==e&&comments.removeValue(i)}},n.getStoryById=function(e){for(var t=stories.asArray(),r=0;t.length>r;r++){var n=t[r];if(n.timestamp==e)return n}},n.updatedStoryEffort=function(){t(),r()},n.updatedStoryStatus=function(){t(),r()},n.getIterations=function(){return iterations},n.addIteration=function(){var e=model.create(edoras.Iteration);return e.timestamp=(new Date).getTime(),iterations.push(e),e},n.getIterationById=function(e){for(var t=iterations.asArray(),r=0;t.length>r;r++){var n=t[r];if(n.timestamp==e)return n}},n.updatedIterationStatus=function(){r()},n.getComments=function(){return comments},n.addComment=function(e,t){var r=model.create(edoras.Comment);r.timestamp=(new Date).getTime(),r.narrative=t,r.ownerId=e,comments.push(r)},n.getTasks=function(){return tasks},n.addTask=function(e,t){var r=model.create(edoras.Task);r.timestamp=(new Date).getTime(),r.narrative=t,r.storyId=e,r.status=1,tasks.push(r)},n.getAcceptanceTests=function(){return acceptanceTests},n.addAcceptanceTest=function(e,t){var r=model.create(edoras.AcceptanceTest);r.timestamp=(new Date).getTime(),r.narrative=t,r.storyId=e,r.status=1,acceptanceTests.push(r)},n.getAnalytics=function(){return analytics},n}]);var realtimeOptions={clientId:"852711004421.apps.googleusercontent.com",authButtonElementId:"authorizeButton",initializeModel:initializeModel,autoCreate:!0,defaultTitle:"New Edoras Project File",onFileLoaded:onFileLoaded,registerTypes:registerTypes};angular.module("edorasApp",["tracAppServices"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/features",{templateUrl:"views/features.html",controller:"FeaturesCtrl"}).when("/feature/:featureId",{templateUrl:"views/feature.html",controller:"FeatureCtrl"}).when("/stories",{templateUrl:"views/stories.html",controller:"StoriesCtrl"}).when("/stories/:filterType",{templateUrl:"views/stories.html",controller:"StoriesCtrl"}).when("/story/:storyId",{templateUrl:"views/story.html",controller:"StoryCtrl"}).when("/iterations",{templateUrl:"views/iterations.html",controller:"IterationsCtrl"}).when("/iteration/:iterationId",{templateUrl:"views/iteration.html",controller:"IterationCtrl"}).when("/overview",{templateUrl:"views/overview.html",controller:"OverviewCtrl"}).when("/analytics",{templateUrl:"views/analytics.html",controller:"AnalyticsCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("edorasApp").controller("MainCtrl",["$scope","DocTracker",function(e,t){e.collaborators=t.getCollaborators()}]);var module=angular.module("edorasApp");module.controller("FeaturesCtrl",["$scope","$location","DocTracker",function(e,t,r){r.waitForDocs(function(){e.features=r.getFeatures(),e.addFeature=function(){var e=r.addFeature(),n=e.timestamp;t.path("/feature/"+n)}})}]),module.controller("FeatureCtrl",["$scope","$routeParams","$location","DocTracker",function(e,t,r,n){n.waitForDocs(function(){var o=t.featureId;e.feature=n.getFeatureById(o),e.deleteFeature=function(){n.deleteFeature(o),r.path("/features")}})}]);var module=angular.module("edorasApp");module.controller("StoriesCtrl",["$scope","$routeParams","$location","DocTracker",function(e,t,r,n){n.waitForDocs(function(){var o=t.filterType,i={};"complete"==o?i={status:4}:"backlog"==o?i=function(e){return""==e.iterationId||null==e.iterationId}:"testable"==o&&(i={status:3}),e.storyFilter=i,e.stories=n.getStories(),e.addStory=function(){var e=n.addStory(),t=e.timestamp;r.path("/story/"+t)};for(var a=n.getCollaborators(),s=0;a.length>s;s++){var l=a[s];console.log(l.photoUrl)}})}]),module.controller("StoryCtrl",["$scope","$routeParams","$location","DocTracker",function(e,t,r,n){n.waitForDocs(function(){var o=t.storyId;e.story=n.getStoryById(o),e.users=n.getUsers(),e.$watch("story.effort",function(e,t){e!=t&&n.updatedStoryEffort()}),e.$watch("story.status",function(e,t){e!=t&&n.updatedStoryStatus()}),e.effortOptions=[{label:"1",value:1},{label:"2",value:2},{label:"3",value:3},{label:"4",value:4},{label:"5",value:5}],e.statusOptions=[{label:"Not Started",value:1},{label:"In Progress",value:2},{label:"Ready for Testing",value:3},{label:"Passed Testing",value:4},{label:"Failed",value:5}],e.taskOptions=[{label:"Not Started",value:1},{label:"In Progress",value:2},{label:"Complete",value:3}],e.acceptanceOptions=[{label:"Untested",value:1},{label:"In Progress",value:2},{label:"Passed",value:3},{label:"Failed",value:4}],e.features=n.getFeatures(),e.iterations=n.getIterations(),e.comments=n.getComments(),e.tasks=n.getTasks(),e.acceptanceTests=n.getAcceptanceTests(),e.deleteStory=function(){n.deleteStory(o),r.path("/stories")},e.addComment=function(){e.newComment&&e.newComment.length>0&&(n.addComment(o,e.newComment),e.newComment=null)},e.addTask=function(){e.newTask&&e.newTask.length>0&&(n.addTask(o,e.newTask),e.newTask=null)},e.addAcceptanceTest=function(){e.newAcceptanceTest&&e.newAcceptanceTest.length>0&&(n.addAcceptanceTest(o,e.newAcceptanceTest),e.newAcceptanceTest=null)}})}]);var module=angular.module("edorasApp");module.controller("IterationsCtrl",["$scope","$location","DocTracker",function(e,t,r){r.waitForDocs(function(){e.iterations=r.getIterations(),e.addIteration=function(){var e=r.addIteration(),n=e.timestamp;t.path("/iteration/"+n)}})}]),module.controller("IterationCtrl",["$scope","$routeParams","DocTracker",function(e,t,r){r.waitForDocs(function(){var n=t.iterationId;e.iteration=r.getIterationById(n),e.stories=r.getStories(),e.statusOptions=[{label:"In Planning",value:1},{label:"In Progress",value:2},{label:"Closed",value:3}],e.$watch("iteration.status",function(e,t){e!=t&&r.updatedIterationStatus()}),e.removeStory=function(e){var t=r.getStoryById(e);t.iterationId=void 0}})}]);var module=angular.module("edorasApp");module.controller("OverviewCtrl",["$scope","DocTracker",function(e,t){t.waitForDocs(function(){e.tasks=t.getTasks(),e.acceptanceTests=t.getAcceptanceTests(),e.getUserName=function(e){for(var r=t.getUsers().asArray(),n=0;r.length>n;n++){var o=r[n];if(o.userId==e)return o.displayName}return"Unknown"}})}]),module.controller("AnalyticsCtrl",["$scope","DocTracker",function(e,t){t.waitForDocs(function(){e.analytics=t.getAnalytics()})}]);