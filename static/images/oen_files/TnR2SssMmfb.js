/*!CK:3495991078!*//*1458223071,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["BhfPI"]); }

__d('createIxElement',['invariant','DOM','joinClasses'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(j,k){var l='img',m;!(j.sprited||j.uri)?h(0):undefined;if(j.sprited){l=c('joinClasses')(l,j.spriteMapCssClass,j.spriteCssClass);m=c('DOM').create('i',{className:l});if(k!=null)c('DOM').setContent(m,c('DOM').create('u',null,k));}else if(j.uri){m=c('DOM').create('img',{className:l,src:j.uri});if(k!=null)m.setAttribute('alt',k);if(j.width)m.setAttribute('width',j.width);if(j.height)m.setAttribute('height',j.height);}return m;}f.exports=i;},null);
__d('TypeaheadFacepile',['DOM'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(){}h.render=function(i){var j=[c('DOM').create('span',{className:'splitpic leftpic'},[c('DOM').create('img',{alt:'',src:i[0]})]),c('DOM').create('span',{className:'splitpic'+(i[2]?' toppic':'')},[c('DOM').create('img',{alt:'',src:i[1]})])];if(i[2])j.push(c('DOM').create('span',{className:'splitpic bottompic'},[c('DOM').create('img',{alt:'',src:i[2]})]));return c('DOM').create('span',{className:'splitpics clearfix'},j);};f.exports=h;},null);
__d('BasicTypeaheadRenderer',['BadgeHelper','DOM'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=' \u00B7 ';function i(j,k){var l=[];if(j.icon)l.push(c('DOM').create('img',{alt:'',src:j.icon}));var m=j.debug_info;if(m)l.push(c('DOM').create('span',{className:'debugInfo'},m));if(j.text){var n=[j.text];if(j.is_verified)n.push(c('BadgeHelper').renderBadge('xsmall','verified'));l.push(c('DOM').create('span',{className:'text'},n));}if(j.subtext){var o=[j.subtext];if(j.saved_context){var p=c('DOM').create('span',{className:'saved'},[j.saved_context]);o.unshift(p,h);}l.push(c('DOM').create('span',{className:'subtext'},o));}var q=c('DOM').create('li',{className:j.type||''},l);if(j.text){q.setAttribute('title',j.text);q.setAttribute('aria-label',j.text);}return q;}i.className='basic';f.exports=i;},null);
__d('TypeaheadView',['ix','$','ArbiterMixin','BasicTypeaheadRenderer','CSS','DOM','Event','Parent','createIxElement','emptyFunction','getElementText','getOrCreateDOMID','mixin'],function a(b,c,d,e,f,g,h){var i,j;if(c.__markCompiled)c.__markCompiled();i=babelHelpers.inherits(k,c('mixin')(c('ArbiterMixin')));j=i&&i.prototype;function k(l,m){'use strict';j.constructor.call(this);this.element=this.content=c('$')(l);Object.assign(this,m);}k.prototype.init=function(){'use strict';this.init=c('emptyFunction');this.initializeEvents();this.reset();};k.prototype.initializeEvents=function(){'use strict';c('Event').listen(this.element,{mouseup:this.mouseup.bind(this),mouseover:this.mouseover.bind(this)});};k.prototype.setTypeahead=function(l){'use strict';this.typeahead=l;};k.prototype.setAccessibilityControlElement=function(l){'use strict';this.accessibilityElement=l;};k.prototype.getElement=function(){'use strict';return this.element;};k.prototype.mouseup=function(event){'use strict';if(event.button!=2){this.select(true);event.prevent();}};k.prototype.mouseover=function(event){'use strict';if(this.ignoreMouseover){this.ignoreMouseover=false;return;}if(this.visible)this.highlight(this.getIndex(event));};k.prototype.reset=function(l){'use strict';if(!l)this.disableAutoSelect=false;this.index=-1;this.items=[];this.results=[];this.value='';this.content.innerHTML='';this.inform('reset');return this;};k.prototype.getIndex=function(event){'use strict';return this.items.indexOf(c('Parent').byTag(event.getTarget(),'li'));};k.prototype.getSelection=function(){'use strict';var l=this.results[this.index]||null;return this.visible?l:null;};k.prototype.isEmpty=function(){'use strict';return !this.results.length;};k.prototype.isVisible=function(){'use strict';return !!this.visible;};k.prototype.show=function(){'use strict';c('CSS').show(this.element);if(this.results&&this.results.length)if(this.autoSelect&&this.accessibilityElement&&this.selected)this.accessibilityElement.setAttribute('aria-activedescendant',c('getOrCreateDOMID')(this.selected));this.accessibilityElement&&this.accessibilityElement.setAttribute('aria-expanded','true');this.visible=true;return this;};k.prototype.hide=function(){'use strict';c('CSS').hide(this.element);if(this.accessibilityElement){this.accessibilityElement.setAttribute('aria-expanded','false');this.accessibilityElement.removeAttribute('aria-activedescendant');}this.visible=false;return this;};k.prototype.render=function(l,m,n){'use strict';this.value=l;if(!m.length){this.accessibilityElement&&this.accessibilityElement.removeAttribute('aria-activedescendant');this.reset(true);return;}var o={results:m,value:l};this.inform('beforeRender',o);m=o.results;var p=n&&this.index!=-1?this.index:this.getDefaultIndex(m);this.results=m;c('DOM').setContent(this.content,this.buildResults(m));this.items=this.getItems();this.highlight(p,false);this.inform('render',this.results);};k.prototype.getItems=function(){'use strict';return c('DOM').scry(this.content,'li');};k.prototype.buildResults=function(l){'use strict';var m,n=null;if(typeof this.renderer=='function'){m=this.renderer;n=this.renderer.className||'';}else{m=b.TypeaheadRenderers[this.renderer];n=this.renderer;}m=m.bind(this);var o=l.map(function(q,r){var s=q.node||m(q,r);s.setAttribute('role','option');return s;}),p=c('DOM').create('ul',{className:n,id:'typeahead_list_'+(this.typeahead?c('getOrCreateDOMID')(this.typeahead):c('getOrCreateDOMID')(this.element))},o);p.setAttribute('role','listbox');return p;};k.prototype.showLoadingIndicator=function(){'use strict';var l=c('createIxElement')(h('/images/loaders/indicator_blue_small.gif')),m=c('DOM').create('li',{className:'typeaheadViewInternalLoading'},l),n=c('DOM').create('ul',{role:'listbox'},m);c('DOM').setContent(this.content,n);};k.prototype.getDefaultIndex=function(){'use strict';var l=this.autoSelect&&!this.disableAutoSelect;return this.index<0&&!l?-1:0;};k.prototype.next=function(){'use strict';this.highlight(this.index+1);this.inform('next',this.selected);};k.prototype.prev=function(){'use strict';this.highlight(this.index-1);this.inform('prev',this.selected);};k.prototype.getItemText=function(l){'use strict';var m='';if(l){m=l.getAttribute('aria-label');if(!m){m=c('getElementText')(l);l.setAttribute('aria-label',m);}}return m;};k.prototype.setIsViewingSelectedItems=function(l){'use strict';this.viewingSelected=l;return this;};k.prototype.getIsViewingSelectedItems=function(){'use strict';return !!this.viewingSelected;};k.prototype.highlight=function(l,m){'use strict';if(this.selected){c('CSS').removeClass(this.selected,'selected');this.selected.setAttribute('aria-selected','false');}if(l>this.items.length-1){l=-1;}else if(l<-1)l=this.items.length-1;if(l>=0&&l<this.items.length){this.selected=this.items[l];c('CSS').addClass(this.selected,'selected');this.selected.setAttribute('aria-selected','true');if(this.accessibilityElement)setTimeout(function(){this.accessibilityElement.setAttribute('aria-activedescendant',c('getOrCreateDOMID')(this.selected));}.bind(this),0);}else this.accessibilityElement&&this.accessibilityElement.removeAttribute('aria-activedescendant');this.index=l;this.disableAutoSelect=l==-1;if(m!==false)this.inform('highlight',{index:l,selected:this.results[l],element:this.selected});};k.prototype.select=function(l){'use strict';if(this.headerIndex&&l)return;var m=this.index,n=this.results[m],o=this.element.getAttribute('id');if(n){var p=function(q){this.inform('select',{index:m,clicked:!!l,selected:q,id:o,query:this.value});this.inform('afterSelect');}.bind(this);if(this.shouldValidateTypeaheadSelection(n)){this.validateTypeaheadSelection(n,p);}else p(n);}};k.prototype.shouldValidateTypeaheadSelection=function(l){'use strict';return false;};k.prototype.validateTypeaheadSelection=function(l,m){'use strict';};Object.assign(k.prototype,{events:['highlight','render','reset','select','beforeRender','next','prev'],renderer:c('BasicTypeaheadRenderer'),autoSelect:false,ignoreMouseover:false});f.exports=k;},null);
__d('BucketedTypeaheadView',['fbt','DOM','TypeaheadView'],function a(b,c,d,e,f,g,h){var i,j;if(c.__markCompiled)c.__markCompiled();i=babelHelpers.inherits(k,c('TypeaheadView'));j=i&&i.prototype;k.prototype.render=function(l,m,n,o){'use strict';var p=m.length>0;for(var q=0;q<m.length;++q)if(m[q].type!=='hashtag')p=false;if(!p)m=this.buildBuckets(l,m);if(n&&o){var r=this.results.length-this.index;this.index=m.length-r;}return j.render.call(this,l,m,n);};k.prototype.highlight=function(l,m){'use strict';this.headerIndex=false;if(l==-1&&this.index!==0)l=this.index;while(l>=0&&l<this.items.length&&!this.isHighlightable(this.results[l])){l=l+1;this.headerIndex=true;}j.highlight.call(this,l,m);};k.prototype.buildBuckets=function(l,m){'use strict';if(!this.typeObjects||!m||!m.length)return m;var n=[],o={};for(var p=0;p<m.length;++p){var q=m[p],r=q.render_type||q.type;if(!o.hasOwnProperty(r)){o[r]=n.length;n.push([this.buildBucketHeader(r)]);}q.classNames=q.classNames||r;q.groupIndex=o[r];q.indexInGroup=n[q.groupIndex].length-1;q.globalIndex=p;n[q.groupIndex].push(q);}for(r in this.typeObjects)if(!o.hasOwnProperty(r)&&this.typeObjects[r].show_always){o[r]=n.length;n.push([this.buildBucketHeader(r)]);q=this.buildNoResultsEntry();q.classNames=q.type;q.groupIndex=o[r];q.indexInGroup=n[q.groupIndex].length-1;n[q.groupIndex].push(q);}var s=[];if(this.typeObjectsOrder){for(var t=0;t<this.typeObjectsOrder.length;++t){var u=this.typeObjectsOrder[t];if(o.hasOwnProperty(u))s=s.concat(n[o[u]]);}}else for(var v=0;v<n.length;++v)s=s.concat(n[v]);return s;};k.prototype.buildNoResultsEntry=function(){'use strict';return {uid:'disabled_result',type:'disabled_result',text:h._("No Results")};};k.prototype.buildBucketHeader=function(l){'use strict';var m=this.typeObjects[l];if(m===undefined)throw new Error(l+" is undefined in "+JSON.stringify(this.typeObjects));if(m.markup){m.text=m.markup;delete m.markup;}return this.typeObjects[l];};k.prototype.buildResults=function(l){'use strict';var m=j.buildResults.call(this,l);if(this.typeObjects){return c('DOM').create('div',{className:'bucketed'},[m]);}else return m;};k.prototype.isHighlightable=function(l){'use strict';return l.type!='header'&&l.type!='disabled_result';};k.prototype.select=function(l){'use strict';var m=this.results[this.index];if(m&&this.isHighlightable(m))j.select.call(this,l);};k.prototype.updateResults=function(l){'use strict';this.results=l;};k.prototype.normalizeIndex=function(l){'use strict';var m=this.results.length;if(m===0){return -1;}else if(l<-1){return l%m+m+1;}else if(l>=m){return l%m-1;}else return l;};k.prototype.getDefaultIndex=function(l){'use strict';var m=this.autoSelect&&!this.disableAutoSelect;if(this.index<0&&!m)return -1;if(l.length===0)return -1;var n=0;while(!this.isHighlightable(l)&&n<l.length)n++;return n;};k.prototype.prev=function(){'use strict';var l=this.results[this.normalizeIndex(this.index-1)];while(l&&!this.isHighlightable(l)){this.index=this.normalizeIndex(this.index-1);l=this.results[this.normalizeIndex(this.index-1)];}return j.prev.call(this);};k.prototype.next=function(){'use strict';var l=this.results[this.normalizeIndex(this.index+1)];while(l&&!this.isHighlightable(l)){this.index=this.normalizeIndex(this.index+1);l=this.results[this.normalizeIndex(this.index+1)];}return j.next.call(this);};function k(){'use strict';i.apply(this,arguments);}f.exports=k;},null);
__d('ContextualTypeaheadView',['BucketedTypeaheadView','CSS','ContextualLayer','ContextualLayerAutoFlip','ContextualLayerHideOnScroll','DOM','DOMDimensions','Style'],function a(b,c,d,e,f,g){var h,i;if(c.__markCompiled)c.__markCompiled();h=babelHelpers.inherits(j,c('BucketedTypeaheadView'));i=h&&h.prototype;j.prototype.init=function(){'use strict';this.initializeLayer();i.init.call(this);};j.prototype.initializeLayer=function(){'use strict';this.context=this.getContext();this.wrapper=c('DOM').create('div');c('DOM').appendContent(this.wrapper,this.element);c('CSS').addClass(this.element,'uiContextualTypeaheadView');this.layer=new (c('ContextualLayer'))({context:this.context,position:'below',alignment:this.alignment,causalElement:this.causalElement,permanent:true,shouldSetARIAProperties:false},this.wrapper);this.layer.enableBehavior(c('ContextualLayerHideOnScroll'));if(c('Style').isFixed(this.context)||this.autoflip)this.layer.enableBehavior(c('ContextualLayerAutoFlip'));this.subscribe('render',this.renderLayer.bind(this));};j.prototype.show=function(){'use strict';if(this.minWidth){c('Style').set(this.wrapper,'min-width',this.minWidth+'px');}else if(this.width){c('Style').set(this.wrapper,'width',this.width+'px');}else c('Style').set(this.wrapper,'width',c('DOMDimensions').getElementDimensions(this.context).width+'px');var k=i.show.call(this);this.layer.show();this.inform('show');return k;};j.prototype.hide=function(){'use strict';this.layer.hide();this.inform('hide');return i.hide.call(this);};j.prototype.renderLayer=function(){'use strict';if(!this.isVisible())return;if(this.layer.isShown()){this.layer.updatePosition();}else this.layer.show();};j.prototype.clearText=function(){'use strict';this.layer.getCausalElement().value='';};j.prototype.getContext=function(){'use strict';return this.element.parentNode;};function j(){'use strict';h.apply(this,arguments);}f.exports=j;},null);
__d('Typeahead',['ArbiterMixin','BehaviorsMixin','DataStore','DOM','Event','Parent','Run','Style','emptyFunction','ge','mixin'],function a(b,c,d,e,f,g){var h,i;if(c.__markCompiled)c.__markCompiled();h=babelHelpers.inherits(j,c('mixin')(c('ArbiterMixin'),c('BehaviorsMixin')));i=h&&h.prototype;function j(k,l,m,n){'use strict';i.constructor.call(this);this.args={data:k,view:l,core:m};c('DataStore').set(n,'Typeahead',this);this.element=n;}j.prototype.init=function(k){'use strict';this.init=c('emptyFunction');this.getCore();this.getView().setAccessibilityControlElement(this.getCore().getElement());this.proxyEvents();this.initBehaviors(k||[]);this.inform('init',this);this.data.bootstrap();this.core.focus();};j.prototype.getData=function(){'use strict';if(!this.data){var k=this.args.data;this.data=k;this.data.init();}return this.data;};j.prototype.getView=function(){'use strict';if(!this.view){var k=this.args.view,l=k.node||c('ge')(k.node_id);if(!l){l=c('DOM').create('div',{className:'uiTypeaheadView'});c('DOM').appendContent(this.element,l);}if(typeof k.ctor==='string'){this.view=new window[k.ctor](l,k.options||{});}else this.view=new k.ctor(l,k.options||{});this.view.init();this.view.setTypeahead(this.element);}return this.view;};j.prototype.getCore=function(){'use strict';if(!this.core){var k=this.args.core;if(typeof k.ctor==='string'){this.core=new window[k.ctor](k.options||{});}else this.core=new k.ctor(k.options||{});this.core.init(this.getData(),this.getView(),this.getElement());}return this.core;};j.prototype.getElement=function(){'use strict';return this.element;};j.prototype.setHeight=function(k){'use strict';if(k!=='auto')k=k+'px';c('Style').set(this.element,'height',k);};j.prototype.swapData=function(k){'use strict';return this.$Typeahead1(k,true);};j.prototype.swapDataNoCoreReset=function(k){'use strict';return this.$Typeahead1(k,false);};j.prototype.$Typeahead1=function(k,l){'use strict';var m=this.core;this.data=this.args.data=k;k.init();if(m){m.data=k;m.initData();if(l)m.reset();this.proxyEvents();}k.bootstrap();return k;};j.prototype.proxyEvents=function(){'use strict';[this.data,this.view,this.core].forEach(function(k){k.subscribe(k.events,this.inform.bind(this));},this);};j.prototype.initBehaviors=function(k){'use strict';k.forEach(function(l){if(typeof l==='string'){if(b.TypeaheadBehaviors&&b.TypeaheadBehaviors[l]){b.TypeaheadBehaviors[l](this);}else c('Run').onLoad(function(){if(b.TypeaheadBehaviors)(b.TypeaheadBehaviors[l]||c('emptyFunction'))(this);}.bind(this));}else this.enableBehavior(l);},this);};j.getInstance=function(k){'use strict';var l=c('Parent').byClass(k,'uiTypeahead');return l?c('DataStore').get(l,'Typeahead'):null;};j.initNow=function(k,l,m){'use strict';if(m)m.init(k);k.init(l);};j.init=function(k,l,m,n){'use strict';if(!c('DOM').isNodeOfType(k,['input','textarea']))k=c('DOM').scry(k,'input')[0]||c('DOM').scry(k,'textarea')[0];var o=false;try{o=document.activeElement===k;}catch(p){}if(o){j.initNow(l,m,n);}else var q=c('Event').listen(k,'focus',function(){j.initNow(l,m,n);q.remove();});};f.exports=j;},null);
__d('StickyPlaceholderInput',['Event','CSS','DOM','Input','Parent','emptyFunction','getElementText'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(l){return c('Parent').byClass(l,'uiStickyPlaceholderInput');}function i(l){return c('DOM').scry(l,'.placeholder')[0];}function j(l){l=l||window.event;var m=l.target||l.srcElement;if(c('DOM').isNodeOfType(m,['input','textarea'])){var n=h(m);if(n)setTimeout(function(){c('CSS').conditionClass(n,'uiStickyPlaceholderEmptyInput',!m.value.length);},0);}}var k={init:function(){k.init=c('emptyFunction');c('Event').listen(document.documentElement,{keydown:j,keyup:j,paste:j,focusout:j});},registerInput:function(l){k.init();var m=l.getAttribute('placeholder')||'';if(m.length)if(document.activeElement===l){var n=c('Event').listen(l,'blur',function(){k.manipulateInput(l,m);n.remove();});}else k.manipulateInput(l,m);},manipulateInput:function(l,m){var n=c('DOM').create('div',{className:'placeholder','aria-hidden':'true'},m),o=c('DOM').create('div',{className:'uiStickyPlaceholderInput'},n);if(c('DOM').isNodeOfType(l,'textarea'))c('CSS').addClass(o,'uiStickyPlaceholderTextarea');c('Event').listen(n,'click',function(){l.focus();});if(l.value===m)l.value='';l.setAttribute('placeholder','');c('DOM').replace(l,o);c('DOM').appendContent(o,l);c('CSS').conditionClass(o,'uiStickyPlaceholderEmptyInput',!l.value.length);},setPlaceholderText:function(l,m){var n=h(l);if(!n){c('Input').setPlaceholder(l,m);}else{var o=i(n);o&&c('DOM').setContent(o,m);}},getPlaceholderText:function(l){var m=h(l),n=i(m);return n&&c('getElementText')(n);},update:function(l){var m=h(l);if(m)c('CSS').conditionClass(m,'uiStickyPlaceholderEmptyInput',!l.value.length);},getVisibleText:function(l){var m=h(l);if(c('CSS').hasClass(m,'uiStickyPlaceholderEmptyInput')){var n=i(m);return n&&c('getElementText')(n);}else return l.value;}};f.exports=k;},null);
__d('TypeaheadCore',['Arbiter','ArbiterMixin','CSS','DOM','Event','Focus','Input','InputSelection','Keys','StickyPlaceholderInput','UserAgent_DEPRECATED','bind','emptyFunction','mixin'],function a(b,c,d,e,f,g){var h,i;if(c.__markCompiled)c.__markCompiled();h=babelHelpers.inherits(j,c('mixin')(c('ArbiterMixin')));i=h&&h.prototype;function j(k){'use strict';i.constructor.call(this);Object.assign(this,k);}j.prototype.init=function(k,l,m){'use strict';this.init=c('emptyFunction');this.data=k;this.view=l;this.root=m;this.initInput();this.inputWrap=c('DOM').find(m,'div.wrap');this.hiddenInput=c('DOM').find(m,'input.hiddenInput');this.value='';this.nextQuery=null;this.selectedText=null;if(this.setValueOnSelect&&c('CSS').hasClass(this.inputWrap,'selected'))this.selectedText=this.getValue();this.initView();this.initData();this.initEvents();this.initToggle();this._exclusions=[];};j.prototype.initInput=function(){'use strict';this.element=c('DOM').find(this.root,'.textInput');var k=c('DOM').scry(this.element,'input')[0];if(k)this.element=k;};j.prototype.initView=function(){'use strict';this.view.subscribe('highlight',c('Focus').set.bind(null,this.element));this.view.subscribe('select',function(k,l){this.select(l.selected);}.bind(this));this.view.subscribe('afterSelect',function(){this.afterSelect();}.bind(this));};j.prototype.initData=function(){'use strict';this.data.subscribe('notify',function(k,l){if(this.root.id==l.rootid&&!this.element.disabled&&l.value==this.getValue())this.view.render(l.value,l.results,l.isAsync);}.bind(this));this.data.subscribe('respond',function(k,l){if(l.forceDisplay||l.value==this.getValue()&&!this.element.disabled&&(this.element.getAttribute('singlestate')!=='true'||l.nullState))this.view.render(l.value,l.results,l.isAsync);}.bind(this));this.data.subscribe('activity',function(k,l){this.fetching=l.activity;if(!this.fetching)this.nextQuery&&this.performQuery();if(this.loading!=this.fetching){this.loading=this.fetching;this.inform('loading',{loading:this.loading});}}.bind(this));};j.prototype.initEvents=function(){'use strict';c('Event').listen(this.view.getElement(),{mouseup:this.viewMouseup.bind(this),mousedown:this.viewMousedown.bind(this)});var k={blur:c('bind')(this,'blur'),focus:c('bind')(this,'focus'),click:c('bind')(this,'click'),keyup:c('bind')(this,'keyup'),keydown:c('bind')(this,'keydown'),keypress:c('bind')(this,'keypress')};if(c('UserAgent_DEPRECATED').firefox())k.input=k.keyup;c('Event').listen(this.element,k);};j.prototype.initToggle=function(){'use strict';this.subscribe('blur',this.view.hide.bind(this.view));this.subscribe('focus',this.view.show.bind(this.view));};j.prototype.viewMousedown=function(){'use strict';this.selecting=true;};j.prototype.viewMouseup=function(){'use strict';this.selecting=false;};j.prototype.blur=function(){'use strict';if(this.selecting){this.selecting=false;return;}this.inform('blur');};j.prototype.click=function(){'use strict';var k=c('InputSelection').get(this.element);if(k.start==k.end)this.element.select();this.inform('click');};j.prototype.focus=function(){'use strict';this.checkValue();this.inform('focus');};j.prototype.keyup=function(){'use strict';if(this.resetOnKeyup&&!this.getValue())this.view.reset();this.checkValue();if(this.getValue().length===0)this.inform('change',null);};j.prototype.keydown=function(event){'use strict';if(!this.view.isVisible()||this.view.isEmpty()){setTimeout(this.checkValue.bind(this),0);return;}switch(c('Event').getKeyCode(event)){case c('Keys').TAB:this.handleTab(event);return;case c('Keys').UP:this.view.prev();break;case c('Keys').DOWN:this.view.next();break;case c('Keys').ESC:this.view.reset();break;default:setTimeout(this.checkValue.bind(this),0);return;}event.kill();};j.prototype.keypress=function(event){'use strict';if(this.view.getSelection()&&c('Event').getKeyCode(event)==c('Keys').RETURN){this.view.select();event.kill();}};j.prototype.handleTab=function(event){'use strict';if(this.preventFocusChangeOnTab)if(this.view.getSelection()){event.kill();}else event.prevent();this.view.select();};j.prototype.select=function(k){'use strict';if(k&&this.setValueOnSelect){var l=k.orig_text||k.text;this.setValue(l);this.setHiddenValue(k.uid);this.selectedText=l;c('CSS').addClass(this.inputWrap,'selected');}};j.prototype.afterSelect=function(){'use strict';this.keepFocused?c('Focus').set(this.element):this.element.blur();this.resetOnSelect?this.reset():this.view.reset();};j.prototype.unselect=function(){'use strict';if(this.setValueOnSelect){this.selectedText=null;c('CSS').removeClass(this.inputWrap,'selected');}this.setHiddenValue();this.inform('unselect',this);};j.prototype.setEnabled=function(k){'use strict';var l=k===false;this.element.disabled=l;c('CSS').conditionClass(this.root,'uiTypeaheadDisabled',l);};j.prototype.reset=function(){'use strict';this.unselect();this.setValue();!this.keepFocused&&c('Input').reset(this.element);this.view.reset();this.inform('reset');};j.prototype.getElement=function(){'use strict';return this.element;};j.prototype.setExclusions=function(k){'use strict';this._exclusions=k.map(String);};j.prototype.getExclusions=function(){'use strict';return this._exclusions;};j.prototype.setValue=function(k){'use strict';this.value=this.nextQuery=k||'';c('Input').setValue(this.element,this.value);c('StickyPlaceholderInput').update(this.element);this.inform('change',k);};j.prototype.setHiddenValue=function(k){'use strict';this.hiddenInput.value=k||k===0?k:'';c('Arbiter').inform('Form/change',{node:this.hiddenInput});};j.prototype.getValue=function(){'use strict';return c('Input').getValue(this.element);};j.prototype.getHiddenValue=function(){'use strict';return this.hiddenInput.value||'';};j.prototype.checkValue=function(){'use strict';var k=this.getValue();if(k==this.value)return;if(this.selectedText&&this.selectedText!=k)this.unselect();var l=Date.now(),m=l-this.time;this.time=l;this.value=this.nextQuery=k;this.performQuery(m);};j.prototype.performQuery=function(k){'use strict';if(this.selectedText)return;k=k||0;if(this.fetching&&k<this.queryTimeout){this.data.query(this.nextQuery,true,this._exclusions,k);}else{this.data.query(this.nextQuery,false,this._exclusions,k);this.nextQuery=null;}};j.prototype.updateHeight=function(){'use strict';};Object.assign(j.prototype,{events:['blur','focus','click','unselect','loading'],keepFocused:true,resetOnSelect:false,resetOnKeyup:true,setValueOnSelect:false,queryTimeout:250,preventFocusChangeOnTab:false});f.exports=j;},null);
__d('CompactTypeaheadRenderer',['BadgeHelper','DOM','emojiAndEmote','TypeaheadFacepile'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i,j){var k=[];if(i.xhp)return c('DOM').create('li',{className:'raw'},i.xhp);var l=i.photos||i.photo;if(l){if(l instanceof Array){l=c('TypeaheadFacepile').render(l);}else l=c('DOM').create('img',{alt:'',src:l});k.push(l);}var m=i.debug_info;if(m)k.push(c('DOM').create('span',{className:'debugInfo'},m));if(i.text){var n=c('emojiAndEmote')(i.text);if(i.is_verified){n.push(c('BadgeHelper').renderBadge('xsmall','verified'));}else if(i.is_work_user){n.push(c('BadgeHelper').renderBadge('xsmall','work'));}else if(i.is_trending_hashtag)n.push(c('BadgeHelper').renderBadge('xsmall','trending'));k.push(c('DOM').create('span',{className:'text'},n));}var o=i.subtext,p=i.category;if(o||p){var q=[];o&&q.push(o);o&&p&&q.push(" \u00b7 ");p&&q.push(p);k.push(c('DOM').create('span',{className:'subtext'},q));}var r=c('DOM').create('li',{className:i.type||''},k);if(i.text){r.setAttribute('title',i.text);r.setAttribute('aria-label',i.text);}return r;}h.className='compact';f.exports=h;},null);