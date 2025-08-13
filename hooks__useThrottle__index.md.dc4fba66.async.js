"use strict";(self.webpackChunkHDesign=self.webpackChunkHDesign||[]).push([[6563],{66346:function(t,n,_){_.r(n);var s=_(72269),h=_(93359),m=_(61788),E=_(19977),r=_(78003),i=_(24268),c=_(96057),D=_(83213),l=_(53683),o=_(80936),u=_(67294),d=_(95917),e=_(85893);function a(){return(0,e.jsx)(l.dY,{children:(0,e.jsx)(u.Suspense,{fallback:(0,e.jsx)(o.Z,{}),children:(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)("div",{className:"markdown",children:[(0,e.jsxs)("h1",{id:"usethrottle",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#usethrottle",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"useThrottle"]}),(0,e.jsx)("p",{children:d.texts[0].value}),(0,e.jsx)(i.Z,{lang:"tsx",children:d.texts[1].value})]})})})})}n.default=a},95917:function(t,n,_){_.r(n),_.d(n,{texts:function(){return s}});const s=[{value:"\u8282\u6D41\u51FD\u6570",paraId:0,tocIndex:0},{value:`import { useThrottle } from 'HDesign';

function Demo() {
  // \u8282\u6D41\u51FD\u6570\uFF0C\u57281\u79D2\u5185\u6700\u591A\u6267\u884C\u4E00\u6B21
  const handlerClick = useThrottle(() => console.log('click'), 1000, []);

  return (
    <div>
      <button onClick={handlerClick}>click</button>
    </div>
  );
}
`,paraId:1,tocIndex:0}]}}]);
