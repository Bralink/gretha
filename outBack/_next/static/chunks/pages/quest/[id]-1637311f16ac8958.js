(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[853],{9061:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/quest/[id]",function(){return t(9210)}])},9210:function(e,n,t){"use strict";t.r(n),t.d(n,{QuestPage:function(){return k},__N_SSG:function(){return S},default:function(){return q}});var r=t(4051),s=t.n(r),i=t(5893),a=t(682),o=t(1608),u=t(1555),c=t(7346),l=t(5005),d=t(1163),h=t(7294),f=t(6897);function x(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var p=function e(){x(this,e),this.id=0,this.name="",this.questions=0,this.user_answers=0,this.is_answered=0,this.created=new Date,this.modified=new Date,this.published=0,this.published_text="No Publicada",this.from=new Date,this.to=new Date},j=function e(){x(this,e),this.id=0,this.evaluation=0,this.question="",this.type="Opci\xf3n Multiple",this.type_value={id:0,text:""},this.answers=[],this.haveCorrectAnswer=!1},w=function e(){x(this,e),this.evaluation=0,this.question=0,this.answer=0,this.answer_text=""},m=t(1881),v=t(1664),y=t.n(v);function g(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function Z(e,n,t,r,s,i,a){try{var o=e[i](a),u=o.value}catch(c){return void t(c)}o.done?n(u):Promise.resolve(u).then(r,s)}function b(e){return function(){var n=this,t=arguments;return new Promise((function(r,s){var i=e.apply(n,t);function a(e){Z(i,r,s,a,o,"next",e)}function o(e){Z(i,r,s,a,o,"throw",e)}a(void 0)}))}}function _(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,s,i=[],a=!0,o=!1;try{for(t=t.call(e);!(a=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);a=!0);}catch(u){o=!0,s=u}finally{try{a||null==t.return||t.return()}finally{if(o)throw s}}return i}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return g(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return g(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var S=!0,k=function(e){var n=e.id,t=(0,d.useRouter)(),r=h.useContext(m.kn).getGlobalState,x=new f.Z,v=_(h.useState(""),2),g=v[0],Z=v[1],S=_(h.useState(!1),2),k=S[0],q=S[1],A=_(h.useState(new p),2),E=A[0],z=A[1],C=_(h.useState(new j),2),D=C[0],N=C[1],P=_(h.useState(1),2),I=P[0],O=P[1],T=_(h.useState(new w),2),Q=T[0],R=T[1],M=_(h.useState({questions:0,answers:0}),2),B=M[0],G=M[1],H=function(){var e=b(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==r().username){e.next=4;break}t.push("/login"),e.next=6;break;case 4:return e.next=6,x.sendData("evaluation","getCompleteQuest",{idEvaluation:n}).then((function(e){e.status?z(e.data):-1===e.error&&t.push("/login")}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),X=function(){var e=b(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(I<=E.questions&&E.user_answers<=E.questions)){e.next=5;break}return e.next=3,x.sendData("evaluation","getQuestion",{idEvaluation:n}).then((function(e){e.status?(N(e.data),O(e.data.user_answers+1)):-1===e.error?t.push("/login"):console.log(e.error)}));case 3:e.next=6;break;case 5:O(E.questions);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var e=b(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.sendData("evaluation","getResults",{idEvaluation:n}).then((function(e){e.status&&G({questions:e.data.questions,answers:e.data.corrects})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(){var e=b(s().mark((function e(n){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),0===Q.answer||""===Q.answer_text){e.next=6;break}return e.next=4,x.sendData("evaluation","saveAnswer",Q).then((function(e){e.status&&(X(),O(e.data.total))}));case 4:e.next=7;break;case 6:Z("Debes seleccionar una respuesta");case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),U=function(){var e=b(s().mark((function e(n){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,x.sendData("evaluation","finishQuest",Q).then((function(e){e.status&&(q(!0),F())}));case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,h.useEffect)((function(){n>0&&0===E.id&&H()}),[]),(0,h.useEffect)((function(){X()}),[E]),(0,h.useEffect)((function(){null===D.id&&3===E.is_answered&&(q(!0),F())}),[D]),(0,i.jsxs)(a.Z,{children:[!k&&(0,i.jsxs)(o.Z,{style:{paddingBottom:"10px"},children:[(0,i.jsx)(u.Z,{md:1}),(0,i.jsxs)(u.Z,{md:10,style:{border:"1px solid lightgray",borderRadius:"1.75em",padding:"20px"},children:[(0,i.jsxs)(o.Z,{children:[(0,i.jsx)(u.Z,{md:3,children:(0,i.jsx)("p",{style:{fontSize:"11px",color:"gray"},children:(0,i.jsxs)("b",{children:["Pregunta ",I," de ",E.questions]})})}),(0,i.jsxs)(u.Z,{md:6,style:{textAlign:"center",fontSize:"14px",color:"gray"},children:[" Intento ",E.is_answered+1]}),(0,i.jsx)(u.Z,{md:3,children:(0,i.jsx)("p",{style:{fontSize:"14px",textAlign:"right",color:"#027ab8"},children:(0,i.jsx)("b",{children:E.name})})})]}),(0,i.jsx)(o.Z,{children:(0,i.jsxs)(u.Z,{children:[" ",(0,i.jsx)("p",{style:{fontSize:"18px"},children:(0,i.jsx)("b",{children:D.question})})]})}),(0,i.jsx)(o.Z,{children:(0,i.jsxs)(u.Z,{children:[" ",(0,i.jsx)("p",{style:{fontSize:"15px",color:"red"},children:(0,i.jsx)("b",{children:g})})]})}),(0,i.jsx)(o.Z,{children:(0,i.jsx)(u.Z,{children:(0,i.jsx)(c.Z,{children:D.answers.map((function(e){return(0,i.jsx)(c.Z.Check,{type:"radio",name:D.question,style:{fontSize:"15px"},id:"answer-"+e.id,onChange:function(){return function(e,n,t,r){R({evaluation:e,question:n,answer:t,answer_text:r}),Z("")}(e.evaluation,e.question,e.id," ")},label:e.answer},e.id)}))})})}),(0,i.jsxs)(o.Z,{children:[(0,i.jsx)(u.Z,{md:5}),I===E.questions?(0,i.jsx)(u.Z,{md:3,children:(0,i.jsx)(l.Z,{variant:"success",onClick:U,children:"Finalizar"})}):(0,i.jsx)(u.Z,{md:3,children:(0,i.jsx)(l.Z,{variant:"primary",onClick:L,children:"Siguiente"})}),(0,i.jsx)(u.Z,{md:4})]})]}),(0,i.jsx)(u.Z,{md:2})]}),k&&(0,i.jsxs)(o.Z,{style:{paddingBottom:"10px"},children:[(0,i.jsx)(u.Z,{md:1}),(0,i.jsxs)(u.Z,{md:10,style:{border:"1px solid lightgray",borderRadius:"1.75em",padding:"20px"},children:[(0,i.jsxs)(o.Z,{children:[(0,i.jsx)(u.Z,{md:3}),(0,i.jsx)(u.Z,{md:6,children:(0,i.jsx)("p",{style:{fontSize:"16px",textAlign:"center",color:"green"},children:(0,i.jsx)("b",{children:"Evaluaci\xf3n Concluida"})})}),(0,i.jsx)(u.Z,{md:3})]}),(0,i.jsx)(o.Z,{children:(0,i.jsxs)(u.Z,{children:[(0,i.jsx)("p",{style:{color:"#e63a52",textAlign:"center"},children:"\xa1Ha finalizado la evaluaci\xf3n!"}),(0,i.jsx)("p",{style:{color:"#11426a",textAlign:"center",fontSize:"17px"},children:"Su Puntaje es:"}),(0,i.jsxs)("p",{style:{color:"#11426a",textAlign:"center",fontSize:"17px",fontWeight:"bold"},children:[B.answers," correctas de ",B.questions," preguntas"]}),(0,i.jsxs)("p",{style:{color:"#e63a52",textAlign:"center"},children:["Ha realizado ",E.is_answered+1," de 3 intentos"]}),(0,i.jsx)("p",{style:{color:"#e63a52",textAlign:"center"},children:"Le recordamos que tiene 3 intentos para lograr mejor puntaje"})]})}),(0,i.jsxs)(o.Z,{children:[(0,i.jsx)(u.Z,{md:5}),(0,i.jsx)(u.Z,{md:4,children:(0,i.jsx)(y(),{href:"/modulos",children:(0,i.jsx)("a",{href:"",className:"toTopics",children:" Ir a M\xf3dulos"})})}),(0,i.jsx)(u.Z,{md:3})]})]}),(0,i.jsx)(u.Z,{md:2})]})]})},q=k}},function(e){e.O(0,[571,657,774,888,179],(function(){return n=9061,e(e.s=n);var n}));var n=e.O();_N_E=n}]);