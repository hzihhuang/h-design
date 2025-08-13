"use strict";(self.webpackChunkHDesign=self.webpackChunkHDesign||[]).push([[4716],{81477:function(d,n,_){_.r(n);var s=_(72269),h=_(93359),m=_(61788),r=_(19977),E=_(78003),o=_(24268),c=_(96057),D=_(83213),i=_(53683),l=_(80936),u=_(67294),t=_(73041),e=_(85893);function a(){return(0,e.jsx)(i.dY,{children:(0,e.jsx)(u.Suspense,{fallback:(0,e.jsx)(l.Z,{}),children:(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)("div",{className:"markdown",children:[(0,e.jsxs)("h1",{id:"usethrottle",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#usethrottle",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"useThrottle"]}),(0,e.jsx)("p",{children:t.texts[0].value}),(0,e.jsx)(o.Z,{lang:"tsx",children:t.texts[1].value})]})})})})}n.default=a},73041:function(d,n,_){_.r(n),_.d(n,{texts:function(){return s}});const s=[{value:"A hook that throttles the execution of a function.",paraId:0,tocIndex:0},{value:`import { useThrottle } from 'HDesign';

function Demo() {
  // Throttle the execution of the function to 1 second
  const handlerClick = useThrottle(() => console.log('click'), 1000, []);

  return (
    <div>
      <button onClick={handlerClick}>click</button>
    </div>
  );
}
`,paraId:1,tocIndex:0}]}}]);
