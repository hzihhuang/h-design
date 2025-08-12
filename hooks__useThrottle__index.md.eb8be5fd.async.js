"use strict";(self.webpackChunkHDesign=self.webpackChunkHDesign||[]).push([[6563],{2903:function(a,d,_){_.r(d);var s=_(57445),u=_(38415),m=_(87387),r=_(1789),h=_(85683),t=_(16134),p=_(26920),E=_(59968),o=_(73574),l=_(72127),c=_(52136),n=_(34064),e=_(69979);function i(){return(0,e.jsx)(o.dY,{children:(0,e.jsx)(c.Suspense,{fallback:(0,e.jsx)(l.Z,{}),children:(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)("div",{className:"markdown",children:[(0,e.jsxs)("h1",{id:"usethrottle",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#usethrottle",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"useThrottle"]}),(0,e.jsx)("p",{children:n.texts[0].value}),(0,e.jsx)(t.Z,{lang:"tsx",children:n.texts[1].value})]})})})})}d.default=i},34064:function(a,d,_){_.r(d),_.d(d,{texts:function(){return s}});const s=[{value:"\u8282\u6D41\u51FD\u6570",paraId:0,tocIndex:0},{value:`import { useThrottle } from 'HDesign';

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
