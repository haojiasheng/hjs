(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{197:function(t,e,n){(e=t.exports=n(8)(!1)).push([t.i,".postEdit__postEdit--3P0Zq {\n  width: 100%; }\n  .postEdit__postEdit--3P0Zq input {\n    width: 100%;\n    height: 1rem;\n    font-size: 0.46rem;\n    padding: 0.5rem;\n    border: none;\n    outline: none;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  .postEdit__postEdit--3P0Zq .postEdit__content--1fIWs {\n    width: 100%;\n    font-size: 0.46rem;\n    padding: 0.5rem;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    outline: none;\n    border: none;\n    height: 80vh; }\n",""]),e.locals={postEdit:"postEdit__postEdit--3P0Zq",content:"postEdit__content--1fIWs"}},231:function(t,e,n){"use strict";n.r(e);var o=n(0),s=n.n(o),a=n(27),i=n.n(a),r=n(7);e.default=Object(r.b)(t=>({path:t.path,user:t.user}),function(t){return{pageChange(e){t({type:"pageChange",path:e})},createPost(e){t({type:"createPost",post:e})}}})(class extends o.Component{constructor(t){super(t),this.rightCallback=(()=>{this.postCreate()}),this.userCallback=(()=>{App.checkCompetence.checkLogin(this,!0)}),App.getNextData(this,{header:{content:"发布",show:!0,left:{back:!0},right:{content:"发布",callbackState:1,callback:null},userCallbackState:2,userCallback:null}}),this.state={title:"",content:""}}render(){return s.a.createElement("div",{className:i.a.postEdit},s.a.createElement("input",{onChange:this.titleChange.bind(this),placeholder:"请输入标题"}),s.a.createElement("textarea",{onChange:this.contentChange.bind(this),placeholder:"来吧，尽情发挥吧...",className:i.a.content}))}titleChange(t){this.setState({title:t.target.value})}contentChange(t){this.setState({content:t.target.value})}postCreate(){const{history:t,createPost:e,user:n}=this.props,{content:o,title:s}=this.state,a={title:s,content:o,author:this.props.user._id};App.api.post("/post/create",a).then(o=>{if(App.prompt(o.msg),0===o.code){const s=o.data;s.author=n,s.commentCount=0,s.likeCount=0,e(s),t.goBack()}})}})},27:function(t,e,n){var o=n(197);"string"==typeof o&&(o=[[t.i,o,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};n(9)(o,s);o.locals&&(t.exports=o.locals)}}]);