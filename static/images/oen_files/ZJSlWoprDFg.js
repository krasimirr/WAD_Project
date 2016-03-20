/*!CK:1268539852!*//*1458315424,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["SIehO"]); }

/**
 * @generated SignedSource<<623c7cbcff19956af736c3d064fc689d>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright (C) 2010 by Johannes Baagoe <baagoe@baagoe.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @providesModule Alea
 * @preserve-header
 */__d('Alea',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(){var j=4022871197,k=function(l){l=l.toString();for(var m=0;m<l.length;m++){j+=l.charCodeAt(m);var o=.02519603282416938*j;j=o>>>0;o-=j;o*=j;j=o>>>0;o-=j;j+=o*4294967296;}return (j>>>0)*2.3283064365386963e-10;};k.version='Mash 0.9';return k;}function i(){return function(j){var k=0,l=0,m=0,n=1;if(j.length===0)j=[new Date()];var o=new h();k=o(' ');l=o(' ');m=o(' ');for(var p=0;p<j.length;p++){k-=o(j[p]);if(k<0)k+=1;l-=o(j[p]);if(l<0)l+=1;m-=o(j[p]);if(m<0)m+=1;}o=null;var q=function(){var r=2091639*k+n*2.3283064365386963e-10;k=l;l=m;m=r-(n=r|0);return m;};q.version='Alea 0.9';q.args=j;return q;}(Array.prototype.slice.call(arguments));}f.exports=i;},null);
__d('Random',['ServerNonce','Alea'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=4294967296,i=c('ServerNonce').ServerNonce,j=c('Alea')(i),k={random:function(){if(typeof window!=='undefined'&&typeof Uint32Array!=='undefined'){var l=new Uint32Array(1);if(window.crypto&&window.crypto.getRandomValues){return window.crypto.getRandomValues(l)[0]/h;}else if(window.msCrypto&&window.msCrypto.getRandomValues)return window.msCrypto.getRandomValues(l)[0]/h;}return j();},uint32:function(){return Math.floor(this.random()*h);}};f.exports=k;},null);
__d('UFIOrderingModeSelector.react',['cx','ix','BanzaiLogger','InlineBlock.react','Link.react','React','Image.react','Random','ReactXUIMenu','PopoverMenu.react','UFIConfig'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=c('React').PropTypes,k=c('ReactXUIMenu').SelectableMenu,l=c('ReactXUIMenu').SelectableItem,m=c('React').createClass({displayName:'UFIOrderingModeSelector',propTypes:{onOrderChanged:j.func,feedback:j.shape({orderingmodes:j.array.isRequired,commentstargetfbid:j.string.isRequired,ownerid:j.string.isRequired}).isRequired},getInitialState:function(){var n=null;this.props.feedback.orderingmodes.map(function(o){if(o.selected)n=o;});return {selectedMode:n};},onMenuItemClick:function(n,o){var p=o.item.getValue();if(this.props.feedback.orderingmodes&&c('UFIConfig').logChangeOrderingModeUsageSampleRate>c('Random').random())c('BanzaiLogger').log('CommentsOrderingModeSelectorUsageLoggerConfig',{start_order:this.state.selectedMode.value,end_order:p,post_fbid:this.props.feedback.commentstargetfbid,post_owner_fbid:this.props.feedback.ownerid,available_orders:this.props.feedback.orderingmodes.map(function(q){return q.value;})});this.props.feedback.orderingmodes.map(function(q){if(q.value===p)this.setState({selectedMode:q});}.bind(this));this.props.onOrderChanged(p);},render:function(){var n=c('React').createElement(k,{className:"_4tju",onItemClick:this.onMenuItemClick},this.props.feedback.orderingmodes.map(function(o){return (c('React').createElement(l,{key:o.value,value:o.value,label:o.name,selected:o.value===this.state.selectedMode.value},c('React').createElement('div',{className:"_3scm"},c('React').createElement('div',{className:"_3scn"},o.name),c('React').createElement('div',{className:"_3sco"},o.description))));}.bind(this)));return (c('React').createElement('div',{className:"_3scp"},c('React').createElement(c('InlineBlock.react'),null,c('React').createElement(c('PopoverMenu.react'),{className:"_3scs",menu:n,alignh:'right'},c('React').createElement(c('Link.react'),null,this.state.selectedMode.name,c('React').createElement(c('Image.react'),{className:"_3sct",src:i('/images/ui/xhp/link/more/down_caret.gif')}))))));}});f.exports=m;},null);
__d('XUIRadioInput.react',['cx','invariant','React','joinClasses'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=c('React').createClass({displayName:'XUIRadioInput',render:function(){!(!this.props.children||this.props.children.length===0)?i(0):undefined;var k=c('joinClasses')(this.props.className,"_55sh"),l=c('React').createElement('input',babelHelpers['extends']({},this.props,{className:null,type:'radio'}),undefined);return (c('React').createElement('label',{className:k},l,c('React').createElement('span',null)));}});f.exports=j;},null);