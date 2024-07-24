"use strict";(self.webpackChunkHDesign=self.webpackChunkHDesign||[]).push([[1232],{88900:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(66164),d={}},49553:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(59702),d={}},61591:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(61563),d={}},86758:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(17248),d={}},3746:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(39876),d={}},25865:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(62104),d={}},49788:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(39613),d={}},95194:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(68556),d={}},16734:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(66164);const a=[{value:"\u4E0B\u8F7D base64 \u5DE5\u5177\u51FD\u6570",paraId:0,tocIndex:0},{value:`import { downloadBase64Imgs } from 'HDesign';

downloadBase64Imgs(['base64-1', 'base64-2', 'base64...')
`,paraId:1,tocIndex:0}]},96375:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(59702);const a=[{value:"\u83B7\u53D6 base64 \u7C7B\u578B",paraId:0,tocIndex:0}]},23443:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(61563);const a=[{value:"\u83B7\u53D6\u67E5\u8BE2\u53C2\u6570\u5BF9\u8C61",paraId:0,tocIndex:0},{value:`import { getParms } from 'HDesign';

getParms(); // \u4E3A\u4F20\u9012\u53C2\u6570\uFF0C\u9ED8\u8BA4 url = window.location.href

getParms('http://www.baidu.com'); // {}
getParms("http://www.baidu.com?name='hzh'"); // { name: "hzh" }
getParms('http://www.baidu.com?name=hzh'); // { name: "hzh" }
getParms('http://www.baidu.com?name=hzh&age=18'); // { name: "hzh", age: 18 }
getParms('http://www.baidu.com?name=hzh&age="18"'); // { name: "hzh", age: "18" }

getParms('?name=hzh&age=18&sex=\u7537&sex=\u5973'); // { name: 'hzh', age: 18, sex: ['\u7537', '\u5973']}
getParms('name=hzh&age=18&sex=\u7537&sex=\u5973'); // \u9519\u8BEF\uFF0C\u4E0D\u662F\u67E5\u8BE2\u53C2\u6570
`,paraId:1,tocIndex:0}]},52500:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(17248);const a=[{value:"\u83B7\u53D6\u67E5\u8BE2\u53C2\u6570\u5BF9\u8C61\u7684\u67D0\u4E00\u9879",paraId:0,tocIndex:0},{value:`import { getQuery } from 'HDesign';

getQuery('name'); // \u4E3A\u4F20\u9012\u53C2\u6570\uFF0C\u9ED8\u8BA4 url = window.location.href

getQuery('name', "http://www.baidu.com?name='hzh'"); // 'hzh'
getQuery('name', 'http://www.baidu.com?name=hzh'); // 'hzh'

getQuery('age', 'http://www.baidu.com?age=18'); // 18
getQuery('age', "http://www.baidu.com?age='18'"); // '18'
getQuery('age', "http://www.baidu.com?age='18'&age=18"); // ['18', 18]
`,paraId:1,tocIndex:0}]},95174:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(39876);const a=[{value:"\u5224\u65AD\u8BE5\u5B57\u7B26\u4E32\u662F\u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4",paraId:0,tocIndex:0},{value:`import { isArrayString } from 'HDesign';

isArrayString('[1, 2, 3]'); // true
isArrayString('[]'); // true
isArrayString('[1, "string", [1,2], {"key": "value"}, true, null]'); // true
isArrayString('1, 2, 3'); // false
isArrayString('{1, 2, 3}'); // false
isArrayString('[1, 2, 3'); // false
isArrayString('[1, 2, 3, undefined]'); // false
isArrayString('[1, 2, 3, function(){}]'); // false
`,paraId:1,tocIndex:0}]},49768:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(62104);const a=[{value:"\u5224\u65AD\u8BE5\u5B57\u7B26\u662F\u5426\u4E3A base64 \u56FE\u7247\u5B57\u7B26\u4E32",paraId:0,tocIndex:0},{value:`import { isBase64Image } from 'HDesign';

isBase64Image('data:image/png;base64,...'); // true
isBase64Image('data:image/jpg;base64,...'); // true
isBase64Image('data:image/gif;base64,...'); // true
isBase64Image('data:image/jpeg;base64,...'); // true
isBase64Image('data:image/svg+xml;base64,...'); // true
isBase64Image('data:image/webp;base64,...'); // true
`,paraId:1,tocIndex:0}]},30874:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(39613);const a=[{value:"\u5224\u65AD\u8BE5\u5B57\u7B26\u4E32\u662F\u4E0D\u662F\u4E00\u4E2A\u5BF9\u8C61",paraId:0,tocIndex:0},{value:`import { isObjectString } from 'HDesign';

isObjectString('{}'); // true
isObjectString('{"key": "value"}'); // true
isObjectString('{key: "value"}'); // false
isObjectString('[1, 2, 3]'); // false
isObjectString('{}}'); // false
`,paraId:1,tocIndex:0}]},5341:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(68556);const a=[{value:"\u5224\u65AD\u8BE5\u5B57\u7B26\u4E32\u80FD\u5426\u4E3A\u53D8\u91CF\u540D",paraId:0,tocIndex:0},{value:`import { isValidVariableName } from 'HDesign';

isValidVariableName('_name'); // true
isValidVariableName('name'); // true
isValidVariableName('$name'); // true
isValidVariableName('1name'); // false \u4E0D\u80FD\u6570\u5B57\u5F00\u5934
isValidVariableName('class'); // false \u5173\u952E\u5B57\u3001\u4FDD\u7559\u5B57
`,paraId:1,tocIndex:0}]}}]);
