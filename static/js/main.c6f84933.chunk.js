(this.webpackJsonpchat_socket=this.webpackJsonpchat_socket||[]).push([[0],{29:function(n,e,t){"use strict";t.r(e);var o,i,c,r,s,a,l,d,u,p,h,j,x,b,g,f,v,m,O,w,y,S=t(1),_=t.n(S),k=t(16),M=t.n(k),C=t(5),D=t(2),z=t(3),E=t(17),N=t.n(E),R=t(8),L=t(18),F=t(0),U=["400","600","800","1060"],I=U.map((function(n){return"@media (max-width: ".concat(n,"px)")})),T=(U.map((function(n){return"@media (min-width: ".concat(n,"px)")})),Object(L.a)(["@media(max-width: ".concat(U[3],"px)"),"@media(max-width: ".concat(U[2],"px)"),"@media(max-width: ".concat(U[1],"px)"),"@media(max-width: ".concat(U[0],"px)")]),{colors:{color1:"#b7410e",color2:"#f4f7be",color2Lighter:"rgba(244, 247, 191, 0.61)",color3:"#e5f77d",color4:"#deba6f",color5:"#1e000e"}}),Y=function(){return Object(F.jsx)(R.a,{styles:function(n){return Object(R.b)(o||(o=Object(D.a)(['\n      * {\n        box-sizing: border-box;\n      }\n      html {\n        height: 100%;\n      }\n      body {\n        font-family: "Lato", sans-serif;\n        margin: 0;\n        padding: 0;\n        a {\n          text-decoration: none;\n          color: ',";\n        }\n      }\n    "])),(function(n){return n.theme.colors.color_1}))}})},J=z.a.div(i||(i=Object(D.a)(["\n  padding: 0 5px;\n  /* background: ","; */\n"])),(function(n){return n.indexNum%2===0?n.theme.colors.color2Lighter:"none"})),P=z.a.span(c||(c=Object(D.a)(["\n  color: ",";\n  font-weight: ",";\n  font-size: 12px;\n  padding: 15px 15px 0 0;\n  display: inline-block;\n"])),(function(n){return n.isYou&&n.theme.colors.color1}),(function(n){return n.isYou?"bolder":"bold"})),A=z.a.span(r||(r=Object(D.a)(["\n  color: ",";\n  font-size: 11px;\n"])),(function(n){return n.theme.colors.color4})),W=z.a.div(s||(s=Object(D.a)(["\n  padding: 2px 0;\n  font-size: 12px;\n  line-height: 15px;\n"]))),B=z.a.form(a||(a=Object(D.a)(["\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  height: 60px;\n  margin: 0;\n  padding: 10px 0 0;\n  background: ",";\n"])),(function(n){return n.theme.colors.color2})),V=z.a.input(l||(l=Object(D.a)(["\n  width: calc(100% - 6px);\n  background: white;\n  border-radius: 3px;\n  padding: 10px 3px;\n  resize: none;\n  margin: 0 3px;\n"]))),G=z.a.div(d||(d=Object(D.a)(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  background: ",";\n"])),(function(n){return n.theme.colors.color2})),q=z.a.div(u||(u=Object(D.a)(["\n  display: flex;\n  border: 1px solid ",";\n  border-radius: 3px;\n  /* padding: 0 5px 0; */\n  margin: 0 5px;\n  background: white;\n  height: calc(100vh - 60px - 90px);\n"])),(function(n){return n.theme.colors.color1})),H=z.a.div(p||(p=Object(D.a)(["\n  width: calc(100% - 120px);\n  /* overflow: scroll; */\n  overflow-y: scroll;\n  display: flex;\n  flex-direction: column-reverse;\n  flex-grow: 1;\n"]))),K=z.a.div(h||(h=Object(D.a)(["\n  width: 120px;\n  padding-left: 10px;\n  overflow: hidden;\n  border-left: "," 1px solid;\n  "," {\n    width: 75px;\n    font-size: 10px;\n  }\n"])),(function(n){return n.theme.colors.color4}),I[2]),Q=z.a.div(j||(j=Object(D.a)(["\n  padding-top: 5px;\n  padding-bottom: 50px;\n  overflow-y: scroll;\n  /* overflow-x: hidden; */\n  height: 100%;\n  /* max-height: calc(100vh - 60px - 250px); */\n"]))),X=z.a.div(x||(x=Object(D.a)(["\n  font-size: 12px;\n  font-weight: ",";\n  /* text-decoration: ","; */\n  "," {\n    /* width: 75px; */\n    font-size: 10px;\n  }\n"])),(function(n){return n.isYou?"bold":"normal"}),(function(n){return n.isYou&&"underline"}),I[2]),Z=function(n){var e=n.ws,t=n.reconnectingMsg,o=n.allMessages,i=n.allUsers,c=n.signedInUser,r=Object(S.useState)(""),s=Object(C.a)(r,2),a=s[0],l=s[1];return Object(F.jsx)(G,{children:Object(F.jsxs)(F.Fragment,{children:[Object(F.jsxs)(q,{children:[Object(F.jsx)(H,{children:(null===o||void 0===o?void 0:o.length)?null===o||void 0===o?void 0:o.map((function(n,e){var t,i=(null===(t=o[e+1])||void 0===t?void 0:t.name)===n.name,r=N.a.utc(null===n||void 0===n?void 0:n.time).local().format("h:mm:ss a, D MMM YY");return Object(F.jsx)(J,{indexNum:e,children:Object(F.jsxs)("div",{children:[!i&&Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(P,{isYou:(null===n||void 0===n?void 0:n.name)===c,children:null===n||void 0===n?void 0:n.name}),Object(F.jsx)(A,{children:r})]}),Object(F.jsx)(W,{children:null===n||void 0===n?void 0:n.message})]},(null===n||void 0===n?void 0:n.time)+(null===n||void 0===n?void 0:n.message))},(null===n||void 0===n?void 0:n.message)+e+(null===n||void 0===n?void 0:n.time))})):t&&Object(F.jsxs)(J,{children:[Object(F.jsx)(P,{children:"From the server"}),Object(F.jsx)(W,{children:t})]})}),Object(F.jsx)(K,{children:Object(F.jsx)(Q,{children:c&&!(null===i||void 0===i?void 0:i.length)?Object(F.jsx)(X,{children:"...Nobody here"}):c||(null===i||void 0===i?void 0:i.length)?Object(F.jsx)(F.Fragment,{children:i.map((function(n,e){return Object(F.jsx)(X,{isYou:n===c,children:n===c?"\u2b50\ufe0f  ".concat(n):n},e+n)}))}):Object(F.jsx)(X,{children:"Please Login"})})})]}),Object(F.jsx)(B,{onSubmit:function(n){var t,o;n.preventDefault();var i=JSON.stringify({message:a});(null===e||void 0===e||null===(t=e.current)||void 0===t?void 0:t.send)&&(null===e||void 0===e||null===(o=e.current)||void 0===o||o.send(i)),l("")},children:Object(F.jsx)(V,{onChange:function(n){l(n.target.value)},placeholder:"write a message",value:a})})]})})},$=z.a.div(b||(b=Object(D.a)(["\n  color: ",";\n  font-size: 25px;\n  font-weight: bolder;\n  background: ",";\n  text-align: center;\n  /* padding: 10px 0; */\n  height: 40px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])),(function(n){return n.theme.colors.color1}),(function(n){return n.theme.colors.color2})),nn=z.a.div(g||(g=Object(D.a)(["\n  width: 100%;\n  height: 90px;\n"]))),en=z.a.div(f||(f=Object(D.a)(["\n  height: 50px;\n  background: ",';\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 10px;\n  font-size: 14px;\n\n  input[type="submit"],\n  button {\n    border-radius: 10px;\n    margin: 0 2px;\n    border: none;\n    background: ',";\n    color: ",";\n    padding: 4px 2px;\n    width: 45px;\n    font-size: 10px;\n  }\n  .alt {\n    background: ",";\n    color: ",";\n  }\n  "," {\n    flex-direction: column;\n    justify-content: space-between;\n    padding: 5px 0;\n  }\n"])),(function(n){return n.theme.colors.color2}),(function(n){return n.theme.colors.color1}),(function(n){return n.theme.colors.color2}),(function(n){return n.theme.colors.color4}),(function(n){return n.theme.colors.color2}),I[2]),tn=z.a.div(v||(v=Object(D.a)(["\n  height: 15px;\n  display: flex;\n  align-items: center;\n"]))),on=z.a.div(m||(m=Object(D.a)(["\n  display: flex;\n  align-items: center;\n  height: 20px;\n"]))),cn=z.a.div(O||(O=Object(D.a)(["\n  padding-right: 10px;\n"]))),rn=z.a.form(w||(w=Object(D.a)(['\n  display: flex;\n  align-items: center;\n  input[type="text"],\n  input[type="password"] {\n    height: 28px;\n    margin-right: 5px;\n    border-radius: 5px;\n    border: 1px solid black;\n    padding: 5px;\n    /* margin-top: 2px; */\n    font-size: 12px;\n    '," {\n      font-size: 10px;\n      width: 100px;\n      height: 20px;\n    }\n  }\n"])),I[2]),sn=z.a.div(y||(y=Object(D.a)(["\n  padding-right: 5px;\n  "," {\n    width: 50px;\n    font-size: 10px;\n    text-align: right;\n  }\n"])),I[2]),an=function(n){var e=n.ws,t=n.openSocket,o=(n.setReconnectingMsg,n.cleanUpReceived),i=(n.defaultConnectingMsg,n.signedInUser),c=(n.reconnectingMsg,n.wsMessage),r=n.setWsMessage,s=n.AMENDED_SERVER_ADDRESS,a=Object(S.useState)(""),l=Object(C.a)(a,2),d=l[0],u=l[1],p=Object(S.useState)(""),h=Object(C.a)(p,2),j=h[0],x=h[1],b=Object(S.useState)(!0),g=Object(C.a)(b,2),f=g[0],v=g[1],m=function(n){var t;null===e||void 0===e||null===(t=e.current)||void 0===t||t.close(),o(n)},O=function(){w(),m(),t()},w=function(){u(""),x("")};return Object(F.jsxs)(nn,{children:[Object(F.jsx)($,{children:"Rusty Chat"}),Object(F.jsxs)(en,{children:[Object(F.jsx)(tn,{children:c&&Object(F.jsx)("div",{children:c})}),Object(F.jsx)(on,{children:i?Object(F.jsxs)(F.Fragment,{children:[i&&Object(F.jsxs)(cn,{children:["Welcome, ",i]}),Object(F.jsx)("button",{onClick:function(n){n.preventDefault();fetch("".concat(s,"/logout/"),{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then((function(n){m({isLogout:!0})}))},children:"Log out"})]}):Object(F.jsxs)(F.Fragment,{children:[Object(F.jsxs)(sn,{children:[f?"Login":"Sign Up",":"]}),Object(F.jsxs)(rn,{onSubmit:f?function(n){n.preventDefault();var e={method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({user_name:d,password:j})};fetch("".concat(s,"/login/"),e).then((function(n){console.log(n);var e=n.json();console.log({jsonData:e}),e.then((function(n){return r(n)})),O()})).catch((function(n){console.error("sign in error",n)}))}:function(n){n.preventDefault();var e={method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({user_name:d,password:j})};fetch("".concat(s,"/signup/"),e).then((function(n){n.json().then((function(n){return r(n)})),O()}))},children:[Object(F.jsx)("input",{id:"userInput",type:"text",placeholder:"Name",autoComplete:"username",onChange:function(n){u(n.target.value)},value:d}),Object(F.jsx)("input",{id:"passwordInput",placeholder:"password",type:"password",autoComplete:f?"current-password":"new-password",onChange:function(n){x(n.target.value)},value:j}),Object(F.jsx)("input",{type:"submit",value:"Submit"})]}),Object(F.jsx)("button",{className:"alt",onClick:function(){w(),v(!f)},children:f?"Sign Up":"Login"})]})})]})]})},ln=t(4),dn=function(){var n=Object(S.useState)(void 0),e=Object(C.a)(n,2),t=e[0],o=e[1],i=Object(S.useState)(void 0),c=Object(C.a)(i,2),r=c[0],s=c[1],a=Object(S.useState)([]),l=Object(C.a)(a,2),d=l[0],u=l[1],p=Object(S.useState)(void 0),h=Object(C.a)(p,2),j=h[0],x=h[1],b=Object(S.useState)([]),g=Object(C.a)(b,2),f=g[0],v=g[1],m=Object(S.useState)(void 0),O=Object(C.a)(m,2),w=O[0],y=O[1],_="Attempting to Connect",k="Please login or register",M="//127.0.0.1:8081",D="ws:".concat(M,"/ws/"),z="http:".concat(M),E=Object(S.useRef)(null),N=function(n){y(_),E.current=new WebSocket(D),E.current&&(E.current.onopen=function(){console.log("ws opened"),s(void 0),y(void 0),(null===E||void 0===E?void 0:E.current)&&(E.current.onmessage=function(n){o(n.data)})},E.current.onclose=function(){console.log("ws closed"),r||s(k)}),y(void 0)};return Object(S.useEffect)((function(){N();var n=null===E||void 0===E?void 0:E.current;return function(){null===n||void 0===n||n.close()}}),[]),Object(S.useEffect)((function(){var n=t?JSON.parse(t):{};(null===n||void 0===n?void 0:n.all_messages)?u(JSON.parse(n.all_messages)):u([]),(null===n||void 0===n?void 0:n.message_to_client)?s(n.message_to_client):(null===n||void 0===n?void 0:n.is_update)||s(r),(null===n||void 0===n?void 0:n.user_name)?x(n.user_name):x(void 0),(null===n||void 0===n?void 0:n.all_online_users)?v(n.all_online_users):v([])}),[t]),Object(F.jsxs)("div",{children:[Object(F.jsx)(an,{ws:E,openSocket:N,setReconnectingMsg:y,cleanUpReceived:function(n){var e=(n||{}).isLogout;o(void 0),u([]),x(void 0),v([]),s(e?k:void 0)},defaultConnectingMsg:_,reconnectingMsg:w,wsMessage:r,setWsMessage:s,signedInUser:j,AMENDED_SERVER_ADDRESS:z}),Object(F.jsx)(Z,{ws:E,reconnectingMsg:w,allMessages:d,allUsers:f,signedInUser:j})]})},un=function(){return Object(F.jsxs)(ln.c,{theme:T,children:[Object(F.jsx)(Y,{}),Object(F.jsx)(dn,{})]})},pn=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,30)).then((function(e){var t=e.getCLS,o=e.getFID,i=e.getFCP,c=e.getLCP,r=e.getTTFB;t(n),o(n),i(n),c(n),r(n)}))};M.a.render(Object(F.jsx)(_.a.StrictMode,{children:Object(F.jsx)(un,{})}),document.getElementById("root")),pn()}},[[29,1,2]]]);
//# sourceMappingURL=main.c6f84933.chunk.js.map