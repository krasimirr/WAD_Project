/*!CK:1438180451!*//*1458319469,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["TxIcT"]); }

__d('P2PMessageSellerConfirmationDialog.react',['cx','fbt','ix','Image.react','P2PButton.react','P2PDialog.react','P2PDialogBody.react','P2PDialogFooter.react','P2PListRow.react','P2PText.react','React','XUICloseButton.react'],function a(b,c,d,e,f,g,h,i,j){'use strict';if(c.__markCompiled)c.__markCompiled();var k=c('React').PropTypes,l=c('React').createClass({displayName:'P2PMessageSellerConfirmationDialog',propTypes:{onCancel:k.func.isRequired,onPay:k.func.isRequired},render:function(){return (c('React').createElement(c('P2PDialog.react'),{width:480},c('React').createElement(c('P2PDialogBody.react'),{className:"_4-ft"},c('React').createElement(c('XUICloseButton.react'),{className:"_4-fu",onClick:this.props.onCancel}),c('React').createElement(c('P2PListRow.react'),{offsetRight:16,offsetBottom:0},c('React').createElement(c('Image.react'),{height:100,src:j('/images/p2p/owl.png'),width:105}),c('React').createElement('div',null,c('React').createElement(c('P2PText.react'),{className:"_3-94",size:'large',type:'primary',weight:'bold'},i._("Connect with the seller before you pay")),c('React').createElement(c('P2PText.react'),{size:'medium',type:'primary'},i._("Make sure that you discuss price and logistics with the seller before you send payment for this item."))))),c('React').createElement(c('P2PDialogFooter.react'),null,c('React').createElement(c('P2PButton.react'),{label:i._("Start Conversation"),onClick:this.props.onCancel}),c('React').createElement(c('P2PButton.react'),{label:i._("Continue to Pay"),onClick:this.props.onPay,use:'confirm'}))));}});f.exports=l;},null);