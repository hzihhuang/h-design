"use strict";(self.webpackChunkHDesign=self.webpackChunkHDesign||[]).push([[5071],{33779:function(a,n,_){_.r(n);var d=_(57445),i=_(38415),m=_(87387),r=_(1789),h=_(85683),o=_(16134),p=_(26920),E=_(59968),t=_(73574),c=_(72127),u=_(52136),s=_(10259),e=_(69979);function l(){return(0,e.jsx)(t.dY,{children:(0,e.jsx)(u.Suspense,{fallback:(0,e.jsx)(c.Z,{}),children:(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)("div",{className:"markdown",children:[(0,e.jsxs)("h1",{id:"usedebounce",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#usedebounce",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"useDebounce"]}),(0,e.jsx)("p",{children:s.texts[0].value}),(0,e.jsx)(o.Z,{lang:"tsx",children:s.texts[1].value})]})})})})}n.default=l},10259:function(a,n,_){_.r(n),_.d(n,{texts:function(){return d}});const d=[{value:"A hook that debounce the execution of a function.",paraId:0,tocIndex:0},{value:`import { useDebounce } from 'HDesign';

function Demo() {
  // Anti shake function, executed only once within 1 second
  const handlerClick = useDebounce(() => console.log('click'), 1000, []);

  return (
    <div>
      <button onClick={handlerClick}>click</button>
    </div>
  );
}
`,paraId:1,tocIndex:0}]}}]);
