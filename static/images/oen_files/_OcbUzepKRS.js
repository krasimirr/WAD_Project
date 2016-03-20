/*!CK:1731957173!*//*1458327755,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["dtL\/z"]); }

__d('ReactComposerFeedStore',['ReactComposerActionStore','ReactComposerMediaConfig','ReactComposerPostUtils'],function a(b,c,d,e,f,g){var h,i;if(c.__markCompiled)c.__markCompiled();h=babelHelpers.inherits(j,c('ReactComposerActionStore'));i=h&&h.prototype;function j(){'use strict';i.constructor.call(this);}j.prototype.__onPostStarted=function(k){'use strict';c('ReactComposerPostUtils').post({actorID:k.actorID,composerID:k.composerID,contextInfo:k.config.contextInfo,targetID:k.targetID});};j.prototype.__canPost=function(k){'use strict';return !c('ReactComposerPostUtils').isPostButtonDisabled(k.composerID,c('ReactComposerMediaConfig').photo.limit);};f.exports=new j();},null);
__d("XEventEmailToIDController",["XController"],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports=c("XController").create("\/events\/email_to_id\/",{email:{type:"String",required:true}});},null);