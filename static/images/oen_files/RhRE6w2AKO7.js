/*!CK:343938251!*//*1458327585,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["ZToSb"]); }

__d('ChatTabComposerContainer.react',['ChatTabComposer.react','MercuryIDs','MercuryThreads','P2PGKValues','ReactComponentWithPureRenderMixin','React','StoreAndPropBasedStateMixin'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=c('React').createClass({displayName:'ChatTabComposerContainer',mixins:[c('ReactComponentWithPureRenderMixin'),c('StoreAndPropBasedStateMixin')(c('MercuryThreads'))],statics:{calculateState:function(i){var j=c('MercuryThreads').getForFBID(i.viewer),k=i.threadID?j.getOrFetch(i.threadID):null,l=c('P2PGKValues').P2PVisible&&i.viewer!==c('MercuryIDs').getUserIDFromThreadID(i.threadID)?i.p2pProps:null;return {thread:k,p2pProps:l,participantIDs:[],placeholder:i.placeholder};}},componentDidMount:function(){this.props.onMount(this);},render:function(){return (c('React').createElement(c('ChatTabComposer.react'),babelHelpers['extends']({ref:'composer',thread:this.state.thread},this.props,{p2pProps:this.state.p2pProps,participantIDs:this.state.participantIDs,placeholder:this.state.placeholder})));},onSend:function(){this.refs.composer.resetInput();},setPlaceholder:function(i){this.setState({placeholder:i});},setParticipantIDs:function(i){i=i||[];this.setState({participantIDs:i});},getInput:function(){return this.refs.composer.getInput();},isUploading:function(){return this.refs.composer.isUploading();}});f.exports=h;},null);