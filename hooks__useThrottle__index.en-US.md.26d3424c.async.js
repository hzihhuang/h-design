"use strict";(self.webpackChunkHDesign=self.webpackChunkHDesign||[]).push([[4716],{94102:function(t,s,_){_.r(s);var d=_(57445),u=_(38415),m=_(87387),r=_(1789),h=_(85683),a=_(16134),p=_(26920),E=_(59968),o=_(73574),l=_(72127),c=_(52136),n=_(25889),e=_(69979);function i(){return(0,e.jsx)(o.dY,{children:(0,e.jsx)(c.Suspense,{fallback:(0,e.jsx)(l.Z,{}),children:(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)("div",{className:"markdown",children:[(0,e.jsxs)("h1",{id:"usethrottle",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#usethrottle",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"useThrottle"]}),(0,e.jsx)("p",{children:n.texts[0].value}),(0,e.jsx)(a.Z,{lang:"tsx",children:n.texts[1].value})]})})})})}s.default=i},25889:function(t,s,_){_.r(s),_.d(s,{texts:function(){return d}});const d=[{value:"A hook that throttles the execution of a function.",paraId:0,tocIndex:0},{value:`import { useThrottle } from 'HDesign';

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
