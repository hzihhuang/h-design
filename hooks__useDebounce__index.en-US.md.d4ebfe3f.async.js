"use strict";(self.webpackChunkHDesign=self.webpackChunkHDesign||[]).push([[5071],{1435:function(i,n,_){_.r(n);var s=_(72269),c=_(93359),h=_(61788),m=_(19977),E=_(78003),t=_(24268),D=_(96057),r=_(83213),o=_(53683),u=_(80936),l=_(67294),d=_(80828),e=_(85893);function a(){return(0,e.jsx)(o.dY,{children:(0,e.jsx)(l.Suspense,{fallback:(0,e.jsx)(u.Z,{}),children:(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)("div",{className:"markdown",children:[(0,e.jsxs)("h1",{id:"usedebounce",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#usedebounce",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"useDebounce"]}),(0,e.jsx)("p",{children:d.texts[0].value}),(0,e.jsx)(t.Z,{lang:"tsx",children:d.texts[1].value})]})})})})}n.default=a},80828:function(i,n,_){_.r(n),_.d(n,{texts:function(){return s}});const s=[{value:"A hook that debounce the execution of a function.",paraId:0,tocIndex:0},{value:`import { useDebounce } from 'HDesign';

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
