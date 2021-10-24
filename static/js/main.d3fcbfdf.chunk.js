(this.webpackJsonpchat_socket=this.webpackJsonpchat_socket||[]).push([[0],{29:function(n,e,t){"use strict";t.r(e);var o,i,c,r,s,a,l,d,u,p,h,j,x,b,g,f,v,m,O,w,y,S=t(1),k=t.n(S),M=t(16),_=t.n(M),C=t(5),z=t(2),L=t(3),N=t(17),U=t.n(N),F=t(8),I=t(18),T=t(0),Y=["400","600","800","1060"],J=Y.map((function(n){return"@media (max-width: ".concat(n,"px)")})),D=(Y.map((function(n){return"@media (min-width: ".concat(n,"px)")})),Object(I.a)(["@media(max-width: ".concat(Y[3],"px)"),"@media(max-width: ".concat(Y[2],"px)"),"@media(max-width: ".concat(Y[1],"px)"),"@media(max-width: ".concat(Y[0],"px)")]),{colors:{color1:"#b7410e",color2:"#f4f7be",color2Lighter:"rgba(244, 247, 191, 0.61)",color3:"#e5f77d",color4:"#deba6f",color5:"#1e000e"}}),P=function(){return Object(T.jsx)(F.a,{styles:function(n){return Object(F.b)(o||(o=Object(z.a)(['\n      * {\n        box-sizing: border-box;\n      }\n      html {\n        height: 100%;\n      }\n      body {\n        font-family: "Lato", sans-serif;\n        margin: 0;\n        padding: 0;\n        a {\n          text-decoration: none;\n          color: ',";\n        }\n      }\n    "])),(function(n){return n.theme.colors.color_1}))}})},R=L.a.div(i||(i=Object(z.a)(["\n  padding: 5px 5px;\n  /* background: ","; */\n"])),(function(n){return n.indexNum%2===0?n.theme.colors.color2Lighter:"none"})),E=L.a.span(c||(c=Object(z.a)(["\n  color: ",";\n  padding-right: 15px;\n  font-weight: ",";\n  font-size: 12px;\n"])),(function(n){return n.isYou&&n.theme.colors.color1}),(function(n){return n.isYou?"bolder":"bold"})),W=L.a.span(r||(r=Object(z.a)(["\n  color: ",";\n  font-size: 11px;\n"])),(function(n){return n.theme.colors.color4})),B=L.a.div(s||(s=Object(z.a)(["\n  padding: 0 0 5px;\n  font-size: 12px;\n"]))),A=L.a.form(a||(a=Object(z.a)(["\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  height: 60px;\n  margin: 0;\n  padding: 10px 0 0;\n  background: ",";\n"])),(function(n){return n.theme.colors.color2})),G=L.a.input(l||(l=Object(z.a)(["\n  width: calc(100% - 6px);\n  background: white;\n  border-radius: 3px;\n  padding: 10px 3px;\n  resize: none;\n  margin: 0 3px;\n"]))),q=L.a.div(d||(d=Object(z.a)(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  background: ",";\n"])),(function(n){return n.theme.colors.color2})),H=L.a.div(u||(u=Object(z.a)(["\n  display: flex;\n  border: 1px solid ",";\n  border-radius: 3px;\n  /* padding: 0 5px 0; */\n  margin: 0 5px;\n  background: white;\n  height: calc(100vh - 60px - 90px);\n"])),(function(n){return n.theme.colors.color1})),K=L.a.div(p||(p=Object(z.a)(["\n  width: calc(100% - 120px);\n  /* overflow: scroll; */\n  overflow-y: scroll;\n  display: flex;\n  flex-direction: column-reverse;\n  flex-grow: 1;\n"]))),Q=L.a.div(h||(h=Object(z.a)(["\n  width: 120px;\n  padding-left: 10px;\n  overflow: hidden;\n  border-left: "," 1px solid;\n  "," {\n    width: 75px;\n    font-size: 10px;\n  }\n"])),(function(n){return n.theme.colors.color4}),J[2]),V=L.a.div(j||(j=Object(z.a)(["\n  padding-top: 5px;\n  padding-bottom: 50px;\n  overflow-y: scroll;\n  /* overflow-x: hidden; */\n  height: 100%;\n  /* max-height: calc(100vh - 60px - 250px); */\n"]))),X=L.a.div(x||(x=Object(z.a)(["\n  font-size: 12px;\n  font-weight: ",";\n  /* text-decoration: ","; */\n  "," {\n    /* width: 75px; */\n    font-size: 10px;\n  }\n"])),(function(n){return n.isYou?"bold":"normal"}),(function(n){return n.isYou&&"underline"}),J[2]),Z=function(n){var e=n.ws,t=n.reconnectingMsg,o=n.allMessages,i=n.allUsers,c=n.signedInUser,r=Object(S.useState)(""),s=Object(C.a)(r,2),a=s[0],l=s[1];return Object(T.jsx)(q,{children:Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)(H,{children:[Object(T.jsx)(K,{children:(null===o||void 0===o?void 0:o.length)?null===o||void 0===o?void 0:o.map((function(n,e){var t=U.a.utc(null===n||void 0===n?void 0:n.time).local().format("h:mm:ss a, D MMM YY");return Object(T.jsx)(R,{indexNum:e,children:Object(T.jsxs)("div",{children:[Object(T.jsx)(E,{isYou:(null===n||void 0===n?void 0:n.name)===c,children:null===n||void 0===n?void 0:n.name}),Object(T.jsx)(W,{children:t}),Object(T.jsx)(B,{children:null===n||void 0===n?void 0:n.message})]},(null===n||void 0===n?void 0:n.time)+(null===n||void 0===n?void 0:n.message))},(null===n||void 0===n?void 0:n.message)+e+(null===n||void 0===n?void 0:n.time))})):t&&Object(T.jsxs)(R,{children:[Object(T.jsx)(E,{children:"From the server"}),Object(T.jsx)(B,{children:t})]})}),Object(T.jsx)(Q,{children:Object(T.jsx)(V,{children:c&&!(null===i||void 0===i?void 0:i.length)?Object(T.jsx)(X,{children:"...Nobody here"}):c||(null===i||void 0===i?void 0:i.length)?Object(T.jsx)(T.Fragment,{children:i.map((function(n,e){return Object(T.jsx)(X,{isYou:n===c,children:n===c?"\u2b50\ufe0f  ".concat(n):n},e+n)}))}):Object(T.jsx)(X,{children:"Please Login"})})})]}),Object(T.jsx)(A,{onSubmit:function(n){var t,o;n.preventDefault();var i=JSON.stringify({message:a});(null===e||void 0===e||null===(t=e.current)||void 0===t?void 0:t.send)&&(null===e||void 0===e||null===(o=e.current)||void 0===o||o.send(i)),l("")},children:Object(T.jsx)(G,{onChange:function(n){l(n.target.value)},placeholder:"write a message",value:a})})]})})},$="http:".concat("//68.183.138.33:8081"),nn=L.a.div(b||(b=Object(z.a)(["\n  color: ",";\n  font-size: 25px;\n  font-weight: bolder;\n  background: ",";\n  text-align: center;\n  /* padding: 10px 0; */\n  height: 40px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])),(function(n){return n.theme.colors.color1}),(function(n){return n.theme.colors.color2})),en=L.a.div(g||(g=Object(z.a)(["\n  width: 100%;\n  height: 90px;\n"]))),tn=L.a.div(f||(f=Object(z.a)(["\n  height: 50px;\n  background: ",';\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 10px;\n  font-size: 14px;\n\n  input[type="submit"],\n  button {\n    border-radius: 10px;\n    margin: 0 2px;\n    border: none;\n    background: ',";\n    color: ",";\n    padding: 4px 2px;\n    width: 45px;\n    font-size: 10px;\n  }\n  .alt {\n    background: ",";\n    color: ",";\n  }\n  "," {\n    flex-direction: column;\n    justify-content: space-between;\n    padding: 5px 0;\n  }\n"])),(function(n){return n.theme.colors.color2}),(function(n){return n.theme.colors.color1}),(function(n){return n.theme.colors.color2}),(function(n){return n.theme.colors.color4}),(function(n){return n.theme.colors.color2}),J[2]),on=L.a.div(v||(v=Object(z.a)(["\n  height: 15px;\n  display: flex;\n  align-items: center;\n"]))),cn=L.a.div(m||(m=Object(z.a)(["\n  display: flex;\n  align-items: center;\n  height: 20px;\n"]))),rn=L.a.div(O||(O=Object(z.a)(["\n  padding-right: 10px;\n"]))),sn=L.a.form(w||(w=Object(z.a)(['\n  display: flex;\n  align-items: center;\n  input[type="text"],\n  input[type="password"] {\n    height: 28px;\n    margin-right: 5px;\n    border-radius: 5px;\n    border: 1px solid black;\n    padding: 5px;\n    /* margin-top: 2px; */\n    font-size: 12px;\n    '," {\n      font-size: 10px;\n      width: 100px;\n      height: 20px;\n    }\n  }\n"])),J[2]),an=L.a.div(y||(y=Object(z.a)(["\n  padding-right: 5px;\n  "," {\n    width: 50px;\n    font-size: 10px;\n    text-align: right;\n  }\n"])),J[2]),ln=function(n){var e=n.ws,t=n.openSocket,o=(n.setReconnectingMsg,n.cleanUpReceived),i=(n.defaultConnectingMsg,n.signedInUser),c=(n.reconnectingMsg,n.wsMessage),r=n.setWsMessage,s=Object(S.useState)(""),a=Object(C.a)(s,2),l=a[0],d=a[1],u=Object(S.useState)(""),p=Object(C.a)(u,2),h=p[0],j=p[1],x=Object(S.useState)(!0),b=Object(C.a)(x,2),g=b[0],f=b[1],v=function(n){var t;null===e||void 0===e||null===(t=e.current)||void 0===t||t.close(),o(n)},m=function(){O(),v(),t()},O=function(){d(""),j("")};return Object(T.jsxs)(en,{children:[Object(T.jsx)(nn,{children:"Rusty Chat"}),Object(T.jsxs)(tn,{children:[Object(T.jsx)(on,{children:c&&Object(T.jsx)("div",{children:c})}),Object(T.jsx)(cn,{children:i?Object(T.jsxs)(T.Fragment,{children:[i&&Object(T.jsxs)(rn,{children:["Welcome, ",i]}),Object(T.jsx)("button",{onClick:function(n){n.preventDefault();fetch("".concat($,"/logout/"),{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then((function(n){v({isLogout:!0})}))},children:"Log out"})]}):Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)(an,{children:[g?"Login":"Sign Up",":"]}),Object(T.jsxs)(sn,{onSubmit:g?function(n){n.preventDefault();var e={method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({user_name:l,password:h})};fetch("".concat($,"/login/"),e).then((function(n){console.log(n),n.json().then((function(n){return r(n)})),m()})).catch((function(n){console.error("sign in error",n)}))}:function(n){n.preventDefault();var e={method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({user_name:l,password:h})};fetch("".concat($,"/signup/"),e).then((function(n){n.json().then((function(n){return r(n)})),m()}))},children:[Object(T.jsx)("input",{id:"userInput",type:"text",placeholder:"Name",autoComplete:"username",onChange:function(n){d(n.target.value)},value:l}),Object(T.jsx)("input",{id:"passwordInput",placeholder:"password",type:"password",autoComplete:g?"current-password":"new-password",onChange:function(n){j(n.target.value)},value:h}),Object(T.jsx)("input",{type:"submit",value:"Submit"})]}),Object(T.jsx)("button",{className:"alt",onClick:function(){O(),f(!g)},children:g?"Sign Up":"Login"})]})})]})]})},dn=t(4),un=function(){var n=Object(S.useState)(void 0),e=Object(C.a)(n,2),t=e[0],o=e[1],i=Object(S.useState)(void 0),c=Object(C.a)(i,2),r=c[0],s=c[1],a=Object(S.useState)([]),l=Object(C.a)(a,2),d=l[0],u=l[1],p=Object(S.useState)(void 0),h=Object(C.a)(p,2),j=h[0],x=h[1],b=Object(S.useState)([]),g=Object(C.a)(b,2),f=g[0],v=g[1],m=Object(S.useState)(void 0),O=Object(C.a)(m,2),w=O[0],y=O[1],k="Attempting to Connect",M="Please login or register",_=Object(S.useRef)(null),z=function(n){y(k),_.current=new WebSocket("wss:".concat("//68.183.138.33:8081","/wss/")),_.current&&(_.current.onopen=function(){console.log("ws opened"),s(void 0),y(void 0),(null===_||void 0===_?void 0:_.current)&&(_.current.onmessage=function(n){o(n.data)})},_.current.onclose=function(){console.log("ws closed"),r||s(M)}),y(void 0)};return Object(S.useEffect)((function(){z();var n=null===_||void 0===_?void 0:_.current;return function(){null===n||void 0===n||n.close()}}),[]),Object(S.useEffect)((function(){var n=t?JSON.parse(t):{};(null===n||void 0===n?void 0:n.all_messages)?u(JSON.parse(n.all_messages)):u([]),(null===n||void 0===n?void 0:n.message_to_client)?s(n.message_to_client):(null===n||void 0===n?void 0:n.is_update)||s(r),(null===n||void 0===n?void 0:n.user_name)?x(n.user_name):x(void 0),(null===n||void 0===n?void 0:n.all_online_users)?v(n.all_online_users):v([])}),[t]),Object(T.jsxs)("div",{children:[Object(T.jsx)(ln,{ws:_,openSocket:z,setReconnectingMsg:y,cleanUpReceived:function(n){var e=(n||{}).isLogout;o(void 0),u([]),x(void 0),v([]),s(e?M:void 0)},defaultConnectingMsg:k,reconnectingMsg:w,wsMessage:r,setWsMessage:s,signedInUser:j}),Object(T.jsx)(Z,{ws:_,reconnectingMsg:w,allMessages:d,allUsers:f,signedInUser:j})]})},pn=function(){return Object(T.jsxs)(dn.c,{theme:D,children:[Object(T.jsx)(P,{}),Object(T.jsx)(un,{})]})},hn=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,30)).then((function(e){var t=e.getCLS,o=e.getFID,i=e.getFCP,c=e.getLCP,r=e.getTTFB;t(n),o(n),i(n),c(n),r(n)}))};_.a.render(Object(T.jsx)(k.a.StrictMode,{children:Object(T.jsx)(pn,{})}),document.getElementById("root")),hn()}},[[29,1,2]]]);
//# sourceMappingURL=main.d3fcbfdf.chunk.js.map