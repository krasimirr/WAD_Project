/*!CK:1435473937!*//*1458247825,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["XtG2l"]); }

__d('SpotlightViewer',['cx','React','ReactLayeredComponentMixin','Spotlight.react'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('React').createClass({displayName:'SpotlightViewer',mixins:[c('ReactLayeredComponentMixin')],renderLayers:function(){if(!this.props.open)return null;var j="_n3";if(this.props.className)j+=' '+this.props.className;return {photoLayer:c('React').createElement(c('Spotlight.react'),{onBeforeHide:this.props.onBeforeHide,onHide:this.props.onHide,rootClassName:this.props.rootClassName,shown:this.props.open},c('React').createElement('div',{className:j,onClick:this.props.onClick},this.props.children))};},render:function(){return c('React').createElement('div',null);}});f.exports=i;},null);
__d('SpotlightViewerAutoResize',['invariant','Event','SubscriptionsHandler'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(j){'use strict';this.$SpotlightViewerAutoResize1=j;!(typeof this.$SpotlightViewerAutoResize1.onResize==='function')?h(0):undefined;}i.prototype.enable=function(){'use strict';this.$SpotlightViewerAutoResize2=new (c('SubscriptionsHandler'))();this.$SpotlightViewerAutoResize2.addSubscriptions(c('Event').listen(window,'resize',this.$SpotlightViewerAutoResize1.onResize));};i.prototype.disable=function(){'use strict';this.$SpotlightViewerAutoResize2.release();delete this.$SpotlightViewerAutoResize2;};f.exports=i;},null);
__d('SpotlightViewerBehaviorsMixin',['BehaviorsMixin'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={componentWillMount:function(){this.behaviors&&this.enableBehaviors(this.behaviors);},componentWillUnmount:function(){this.destroyBehaviors();}};Object.assign(h,c('BehaviorsMixin'));f.exports=h;},null);
__d('SpotlightViewerClose',['cx','fbt','React','TooltipLink.react','joinClasses'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=c('React').PropTypes,k=c('React').createClass({displayName:'SpotlightViewerClose',propTypes:{position:j.oneOf(['left','right'])},getDefaultProps:function(){return {position:'right'};},render:function(){var l=this.props.position=='left'?"_5wx3":"_5wx4",m=c('React').createElement('span',null,i._("Press Esc to close"));return (c('React').createElement(c('TooltipLink.react'),{className:c('joinClasses')("_4-o9 _50-m _51an",l),onClick:this.props.onClick,tooltip:m}));}});f.exports=k;},null);
__d('PhotoUtils',['Event','URI'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={getImagesFromData:function(i){var j=[];for(var k in i)if(k.indexOf('image')===0)j.push(i[k]);return j;},getFBIDFromData:function(i){return i&&i.id;},getOriginalImageFromData:function(i){return i.original||i.download_image;},getDownloadURLFromData:function(i){var j=this.getOriginalImageFromData(i);if(!j)return null;var k=new (c('URI'))(j.uri);k.addQueryData({dl:1});return k;},getPermalinkFromData:function(i){return i.permalink;},canViewerMakeCoverPhoto:function(i){return !!i.can_viewer_make_cover_photo;},getCoverPhotoURLFromData:function(i){return new (c('URI'))('/profile.php').addQueryData({preview_cover:h.getFBIDFromData(i)});},preload:function(i,j,k){var l=i.getDimensions();for(var m=0;m<j.length;++m){var n=l.getBestFitImageFromPhoto(j[m],l.getMaxStageDimensions()),o=new Image();k&&c('Event').listen(o,'load',k.bind(null,j[m]));i.getLogger().log(n.uri);o.src=n.uri;}}};f.exports=h;},null);
__d('PhotoViewState',['ArbiterMixin','PhotoStore','PhotoUtils','SpotlightViewerLoggingEvents','mixin'],function a(b,c,d,e,f,g){var h,i;if(c.__markCompiled)c.__markCompiled();h=babelHelpers.inherits(j,c('mixin')(c('ArbiterMixin')));i=h&&h.prototype;function j(k,l,m,n,o,p){'use strict';i.constructor.call(this);this._viewer=k;this._setID=l;this._updateCallback=n;this._position=m||0;this._preloaded={};this._reverse=o;this._preventPreload=p;}j.prototype._fetchCallback=function(k){'use strict';if(!this._viewer.isOpen())return;this._preload(k);this._log(c('SpotlightViewerLoggingEvents').DATA_FETCH_COMPLETE);};j.prototype._preload=function(k){'use strict';c('PhotoUtils').preload(this._viewer,k,function(l){this._preloaded[c('PhotoUtils').getFBIDFromData(l)]=true;}.bind(this));};j.prototype._preloadPhotosInRange=function(k,l){'use strict';var m=[];for(var n=k;n<=l;++n){var o=c('PhotoStore').getByIndexImmediate(this._setID,n);if(o&&!this._isPreloaded(o))m.push(o);}this._preload(m);};j.prototype._isPreloaded=function(k){'use strict';return this._preloaded[c('PhotoUtils').getFBIDFromData(k)];};j.prototype.getPosition=function(){'use strict';return this._position;};j.prototype.isValidMovement=function(k){'use strict';if(!c('PhotoStore').hasBeenCreated(this._setID))return false;if(c('PhotoStore').hasLooped(this._setID))return true;var l=this._position+k,m=c('PhotoStore').getAvailableRange(this._setID),n=m.offset+m.length-1;return l>=m.offset-1&&l<=n+1;};j.prototype.getRelativeMovement=function(k){'use strict';return c('PhotoStore').getIndexForID(this._setID,k)-this._position;};j.prototype.moveCursor=function(k){'use strict';if(!this.isValidMovement(k))return false;this._position+=k;return true;};j.prototype._page=function(k){'use strict';if(!this.moveCursor(k))return;this._log(c('SpotlightViewerLoggingEvents').PAGE_BEGIN);var l=c('PhotoStore').getByIndexImmediate(this._setID,this._position);if(!l){this.inform('photo_fetch');this._log(c('SpotlightViewerLoggingEvents').PHOTO_FETCH);}else if(!this._isPreloaded(l))this._preload([l]);c('PhotoStore').getByIndex(this._setID,this._position,this._updateCallback);this._loadMoreIfNecessary(k>0,j.BUFFER_SIZE);this._log(c('SpotlightViewerLoggingEvents').PAGE_COMPLETE);};j.prototype.loadMoreForwardIfNecessary=function(k){'use strict';if(this._preventPreload)return;var l=c('PhotoStore').getAvailableRange(this._setID),m=l.offset+l.length-1,n=this._position+k;if(n>m&&!c('PhotoStore').hasLooped(this._setID)){var o=c('PhotoStore').getCursorByIndexImmediate(this._setID,m);c('PhotoStore').fetchForward(this._setID,o,k,this._fetchCallback.bind(this));}else this._preloadPhotosInRange(this._position+1,n);};j.prototype.loadMoreBackwardIfNecessary=function(k){'use strict';if(this._preventPreload)return;var l=c('PhotoStore').getAvailableRange(this._setID),m=this._position-k;if(m<l.offset&&!c('PhotoStore').hasLooped(this._setID)){var n=c('PhotoStore').getCursorByIndexImmediate(this._setID,l.offset);c('PhotoStore').fetchBackward(this._setID,n,k,this._fetchCallback.bind(this));}else this._preloadPhotosInRange(m,this._position-1);};j.prototype._loadMoreIfNecessary=function(k,l){'use strict';if(k){this.loadMoreForwardIfNecessary(l);}else this.loadMoreBackwardIfNecessary(l);};j.prototype.displayFirst=function(){'use strict';if(!this._viewer.isOpen())return;c('PhotoStore').setPreFetchCallback(this._setID,function(){this._log(c('SpotlightViewerLoggingEvents').DATA_FETCH_BEGIN);}.bind(this));var k=function(l){if(!this._isPreloaded(l))this._preload([l]);this._updateCallback(l);}.bind(this);c('PhotoStore').getByIndex(this._setID,this._position,k);if(this._reverse){this.loadMoreBackwardIfNecessary(j.BUFFER_SIZE);}else this.loadMoreForwardIfNecessary(j.BUFFER_SIZE);};j.prototype.backward=function(){'use strict';this._page(this._reverse?1:-1);};j.prototype.forward=function(){'use strict';this._page(this._reverse?-1:1);};j.prototype._log=function(k){'use strict';this._viewer.log(k);};Object.assign(j,{BUFFER_SIZE:4});f.exports=j;},null);
__d('SpotlightViewerImage',['cx','Image.react','React'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('React').createClass({displayName:'SpotlightViewerImage',render:function(){return (c('React').createElement(c('Image.react'),{className:"_4-od",src:this.props.src,style:{width:this.props.dimensions.x,height:this.props.dimensions.y}}));}});f.exports=i;},null);
__d('SpotlightViewerCoreMixin',['PhotoLogger','PhotoStore','PhotoUtils','PhotoViewState','React','SpotlightViewerImage','SpotlightViewerLoggingEvents'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={_displayFirstPhoto:function(){c('PhotoStore').executePostCreate(this.props.setid,this.viewState.displayFirst.bind(this.viewState));},_getInitialPosition:function(){var i;if(!this.props.clearcache)i=c('PhotoStore').getIndexForID(this.props.setid,this.props.photoid);if(i===undefined){c('PhotoStore').clearSetCache(this.props.setid);i=0;}return i;},__displayPhoto:function(){var i=this._getInitialPosition();this.viewState=new (c('PhotoViewState'))(this,this.props.setid,i,this._updatePhoto,this.props.reverse,this.__shouldPreventPhotoPreload);this.inform('open');this._displayFirstPhoto();},componentWillMount:function(){this._logger=new (c('PhotoLogger'))(this.getViewerID());this.log(c('SpotlightViewerLoggingEvents').OPEN_BEGIN);this.__displayPhoto();},componentDidMount:function(){this._enableSubscriptions&&this._enableSubscriptions();this.log(c('SpotlightViewerLoggingEvents').OPEN_COMPLETE);},isOpen:function(){return this.state.open;},close:function(){if(!this.isOpen())return;this.log(c('SpotlightViewerLoggingEvents').CLOSE_BEGIN);this.setState({open:false},function(){this.inform('close');this.log(c('SpotlightViewerLoggingEvents').CLOSE_COMPLETE);});},componentWillUnmount:function(){this.viewState=null;},_onClickViewport:function(i){i?this.viewState.forward():this.viewState.backward();},_getMedia:function(i,j){return (c('React').createElement(c('SpotlightViewerImage'),{ref:'image',src:i.uri,dimensions:j.imageDimensions}));},_getCurrentFBID:function(){return c('PhotoUtils').getFBIDFromData(this.state.photoData);},_updatePhoto:function(i){this.log(c('SpotlightViewerLoggingEvents').PHOTO_CHANGE_BEGIN);this.setState({photoData:i},function(){this.inform('photo_change',this.state.photoData);this.log(c('SpotlightViewerLoggingEvents').PHOTO_CHANGE_COMPLETE);});},getLogger:function(){return this._logger;},log:function(i){this._logger&&this._logger.logEvent(i);}};f.exports=h;},null);
__d('PhotoViewerDimensions',['Event','PhotoUtils','Vector'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={verticalPadding:'number',horizontalPadding:'number',normalResDim:'object'};function i(j){'use strict';for(var k in j){if(!h[k])throw new Error("Unsupported extraData value '"+k+"' should not be used");if(typeof j[k]===h[k])this['_'+k]=j[k];}this._listener=c('Event').listen(window,'resize',this._resetMaxStageDimensions.bind(this));}i.prototype.destroy=function(){'use strict';this._listener.remove();};i.prototype.getStageDimensions=function(j){'use strict';var k=this.getMaxStageDimensions(),l=new (c('Vector'))(Math.min(j.x,k.x),Math.min(j.y,k.y)),m=l.x/l.y,n=j.x/j.y;if(m<n){l.y=Math.round(l.x/n);}else l.x=Math.round(l.y*n);return l;};i.prototype.getImageDimensionsForStage=function(j,k){'use strict';var l=j.x,m=j.y,n=k.x,o=k.y;if(l>=n||m>=o){var p=l/m,q=n/o;if(q<p){l=n;m=Math.round(n/p);}else if(q>p){l=Math.round(o*p);m=o;}else{l=n;m=o;}}return new (c('Vector'))(l,m);};i.prototype.getMaxStageDimensions=function(){'use strict';if(!this._maxStageDimensions)this._maxStageDimensions=new (c('Vector'))(c('Vector').getViewportDimensions().x-this._horizontalPadding,c('Vector').getViewportDimensions().y-this._verticalPadding);return this._maxStageDimensions;};i.prototype._resetMaxStageDimensions=function(){'use strict';this._maxStageDimensions=null;};i.prototype.getBestFitImageFromPhoto=function(j,k){'use strict';var l=null,m=c('PhotoUtils').getImagesFromData(j);m=m.sort(function(o,p){return p.width-o.width;});if(window.devicePixelRatio&&window.devicePixelRatio>1)k=new (c('Vector'))(k.x*window.devicePixelRatio,k.y*window.devicePixelRatio);for(var n=0;n<m.length;n++)if(!l||m[n].width>=k.x||m[n].height>=k.y)l=m[n];return l;};i.prototype.getOriginalDimensionsFromPhoto=function(j){'use strict';var k=c('PhotoUtils').getOriginalImageFromData(j);return new (c('Vector'))(k.width,k.height);};i.prototype.getBestFitDimensionsFromPhoto=function(j,k){'use strict';var l=this.getBestFitImageFromPhoto(j,k);return new (c('Vector'))(l.width,l.height);};i.prototype.getVerticalPadding=function(){'use strict';return this._verticalPadding;};i.prototype.getHorizontalPadding=function(){'use strict';return this._horizontalPadding;};Object.assign(i.prototype,{_verticalPadding:40,_horizontalPadding:60,_normalResDim:{x:960,y:960}});f.exports=i;},null);
__d('SpotlightViewerStageResizer',['Event','SubscriptionsHandler','Vector'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=520;function i(j,k){'use strict';this._subscriptionsHandler=new (c('SubscriptionsHandler'))();this._subscriptionsHandler.addSubscriptions(c('Event').listen(window,'resize',this._resetStageDimensions.bind(this)));this._dimensions=j;this._minHeight=k.minHeight||h;this._minWidth=k.minWidth||h;this._resetStageDimensions();}i.prototype.destroy=function(){'use strict';this._dimensions=null;this._subscriptionsHandler.release();};i.prototype._resetStageDimensions=function(){'use strict';this._currentStageDimensions=new (c('Vector'))(this._minWidth,this._minHeight);};i.prototype.getImageAndStageDimensions=function(j){'use strict';var k=this._dimensions.getBestFitDimensionsFromPhoto(j,this._dimensions.getMaxStageDimensions()),l=this._dimensions.getStageDimensions(k);this._currentStageDimensions=new (c('Vector'))(Math.max(l.x,this._minWidth,this._currentStageDimensions.x),Math.max(l.y,this._minHeight,this._currentStageDimensions.y));var m=this._dimensions.getImageDimensionsForStage(k,this._currentStageDimensions);return {stageDimensions:this._currentStageDimensions,imageDimensions:m};};i.prototype.getCurrentStageDimensions=function(){'use strict';return this._currentStageDimensions;};f.exports=i;},null);
__d('SpotlightViewerDimensionMixin',['SpotlightViewerStageResizer','PhotoViewerDimensions'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={getInitialState:function(){this._dimensions=new (c('PhotoViewerDimensions'))({verticalPadding:this.props.verticalPadding,horizontalPadding:this.props.horizontalPadding});this._resizer=new (c('SpotlightViewerStageResizer'))(this._dimensions,{minHeight:this.props.minHeight,minWidth:this.props.minWidth});return {maxStageDimensions:this._dimensions.getMaxStageDimensions()};},componentWillUnmount:function(){this._resizer&&this._resizer.destroy();this._resizer=null;this._dimensions&&this._dimensions.destroy();this._dimensions=null;},getMedia:function(){if(this.state.photoData){var i=this._resizer.getImageAndStageDimensions(this.state.photoData),j=this._dimensions.getBestFitImageFromPhoto(this.state.photoData,this.state.maxStageDimensions);return this._getMedia(j,i);}else return null;},getDimensions:function(){return this._dimensions;},getStageDimensions:function(){if(this.state.photoData){return this._resizer.getImageAndStageDimensions(this.state.photoData).stageDimensions;}else return this._dimensions.getMaxStageDimensions();},getImageDimensions:function(){if(!this.state.photoData)return null;return this._resizer.getImageAndStageDimensions(this.state.photoData).imageDimensions;},onResize:function(){this.setState({maxStageDimensions:this._dimensions.getMaxStageDimensions()});}};f.exports=h;},null);
__d('SpotlightViewerPageWithKeys',['KeyEventController','SubscriptionsHandler'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){'use strict';this.$SpotlightViewerPageWithKeys1=i;}h.prototype.enable=function(){'use strict';this.$SpotlightViewerPageWithKeys2=new (c('SubscriptionsHandler'))();this.$SpotlightViewerPageWithKeys2.addSubscriptions(c('KeyEventController').registerKey('LEFT',function(){this.$SpotlightViewerPageWithKeys1.viewState.backward();return false;}.bind(this)),c('KeyEventController').registerKey('RIGHT',function(){this.$SpotlightViewerPageWithKeys1.viewState.forward();return false;}.bind(this)));};h.prototype.disable=function(){'use strict';this.$SpotlightViewerPageWithKeys2.release();delete this.$SpotlightViewerPageWithKeys2;};f.exports=h;},null);
__d('SpotlightViewerPagers',['cx','LeftRight.react','Link.react','React'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('React').createClass({displayName:'SpotlightViewerPagers',render:function(){return (c('React').createElement(c('LeftRight.react'),null,c('React').createElement(c('Link.react'),{className:"_4-oa _4-ob _50-m"}),c('React').createElement(c('Link.react'),{className:"_4-oa _4-oc _50-m"})));}});f.exports=i;},null);
__d('SpotlightViewerThumbnailMixin',['PhotoStore','Vector'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={_getInitialPhotoData:function(){var i=c('PhotoStore').getIndexForID(this.props.setid,this.props.photoid),j=c('PhotoStore').getByIndexImmediate(this.props.setid,i);return j?j:this._getThumbnailPhotoData();},_getThumbnailPhotoData:function(){if(!this.props.dimensions||!this.props.thumbsrc)return null;var i={id:this.props.photoid};for(var j=0;j<this.props.dimensions.length;++j){var k=c('Vector').deserialize(this.props.dimensions[j]);i['image'+j]={width:k.x,height:k.y,uri:this.props.thumbsrc};}return i;}};f.exports=h;},null);
__d('SpotlightViewport',['csx','cx','Locale','Parent','React','ReactDOM','Vector','joinClasses'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=c('React').PropTypes,k=c('React').createClass({displayName:'SpotlightViewport',propTypes:{stageDimensions:j.object.isRequired,useWidth:j.bool},PAGE_TO_PREV_PERCENTAGE:.2,sections:{NONE:null,FORWARD:1,BACKWARD:2},getInitialState:function(){return {currentActiveSection:this.sections.NONE,active:true};},_onMouseMove:function(event){var l=c('ReactDOM').findDOMNode(this),m=c('Vector').getEventPosition(event.nativeEvent),n=c('Vector').getElementPosition(l),o=this.props.useWidth?this.props.stageDimensions.x:c('Vector').getElementDimensions(l).x,p,q=m.x-n.x,r=q/o;if(c('Locale').isRTL()){p=r>1-this.PAGE_TO_PREV_PERCENTAGE;}else p=r<this.PAGE_TO_PREV_PERCENTAGE;if(p){this.setState({currentActiveSection:this.sections.BACKWARD});}else this.setState({currentActiveSection:this.sections.FORWARD});},_onClick:function(event){var l=this.state.currentActiveSection==this.sections.FORWARD,m=event.target;if(!c('Parent').bySelector(m,"._51an"))this.props.onClick&&this.props.onClick(l);},_onMouseEnter:function(){this.setState({active:true});},_onMouseLeave:function(){this.setState({active:false});},render:function(){var l="_4-of"+(!this.state.active&&!this.props.active?' '+"_50-l":'')+(this.state.currentActiveSection===this.sections.BACKWARD?' '+"_516a":'')+(this.state.currentActiveSection===this.sections.FORWARD?' '+"_516b":'')+(this.props.showLoadingIndicator?' '+"_51jp":'');if(this.props.className)l=c('joinClasses')(l,this.props.className);var m={};if(this.props.stageDimensions){m={height:this.props.stageDimensions.y};if(this.props.useWidth)m.width=this.props.stageDimensions.x;}return (c('React').createElement('div',{className:l,style:m,onClick:this._onClick,onMouseMove:this._onMouseMove,onMouseEnter:this._onMouseEnter,onMouseLeave:this._onMouseLeave},this.props.children,c('React').createElement('div',{className:"_4-og"},c('React').createElement('span',{className:"_4-oh"}),this.props.media,c('React').createElement('div',{className:"_4-oi"}))));}});f.exports=k;},null);
__d('SpotlightSnowflakePhotoViewer',['ArbiterMixin','React','SpotlightViewer','SpotlightViewerAutoResize','SpotlightViewerBehaviorsMixin','SpotlightViewerClose','SpotlightViewerCoreMixin','SpotlightViewerDimensionMixin','SpotlightViewerPagers','SpotlightViewerPageWithKeys','SpotlightViewerThumbnailMixin','SpotlightViewport','SubscriptionsHandler'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=c('React').createClass({displayName:'SpotlightSnowflakePhotoViewer',mixins:[c('ArbiterMixin'),c('SpotlightViewerBehaviorsMixin'),c('SpotlightViewerCoreMixin'),c('SpotlightViewerThumbnailMixin'),c('SpotlightViewerDimensionMixin')],behaviors:[c('SpotlightViewerPageWithKeys'),c('SpotlightViewerAutoResize')],getViewerID:function(){return 'photoviewer';},componentWillUnmount:function(){this._subscriptions&&this._subscriptions.release();this._subscriptions=null;},getInitialState:function(){this._subscriptions=new (c('SubscriptionsHandler'))();return {photoData:this._getInitialPhotoData(),open:true};},_enableSubscriptions:function(){this.props.useloadingindicator&&this._subscriptions.addSubscriptions(this.viewState.subscribe('photo_fetch',this.setState.bind(this,{photoData:null},null)));},render:function(){var i=this.getMedia(),j=this.getStageDimensions(),k=this.props.useloadingindicator&&!this.state.photoData;return (c('React').createElement(c('SpotlightViewer'),{open:this.state.open,onHide:this.close},c('React').createElement(c('SpotlightViewport'),{media:i,showLoadingIndicator:k,stageDimensions:j,onClick:this._onClickViewport},c('React').createElement(c('SpotlightViewerClose'),{onClick:this.close}),this.props.disablepaging?null:c('React').createElement(c('SpotlightViewerPagers'),null))));}});f.exports=h;},null);
__d('CampfireImageViewer',['DOM','Event','React','ReactDOM','SpotlightSnowflakePhotoViewer','ge'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h={registerPopup:function(i,j){c('Event').listen(i,'click',function(k){h.bootstrap({src:j.src,fbid:j.id,dimensions:[j.width,j.height].join(','),disablePaging:true});});},bootstrap:function(i){var j=c('React').createElement(c('SpotlightSnowflakePhotoViewer'),{dimensions:[i.dimensions],open:true,disablepaging:true,photoid:i.fbid,reverse:false,rootClassName:i.rootClassName,thumbsrc:i.src});h.render(j);},render:function(i){var j=c('ge')('campfire_viewer');if(!j){j=c('DOM').create('div',{id:'messages_viewer'});document.body.appendChild(j);}i=c('ReactDOM').render(i,j);i.subscribeOnce('close',function(){c('ReactDOM').unmountComponentAtNode(j);});}};f.exports=h;},null);