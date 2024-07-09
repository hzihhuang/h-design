"use strict";(self.webpackChunkHDesign=self.webpackChunkHDesign||[]).push([[1232],{51718:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(35057),d={}},10456:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(85484),d={}},39228:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(9978),d={}},77643:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(42033),d={}},14932:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(4583),d={}},86762:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(91496),d={}},34953:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(13328),d={}},95996:function(s,t,n){n.r(t),n.d(t,{demos:function(){return d}});var e=n(75271),a=n(41370),d={}},42746:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(35057);const a=[{value:"\u4E0B\u8F7D base64 \u5DE5\u5177\u51FD\u6570",paraId:0,tocIndex:0},{value:`import { downloadBase64Imgs } from 'HDesign';

downloadBase64Imgs(['base64-1', 'base64-2', 'base64...')
`,paraId:1,tocIndex:0}]},95957:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(85484);const a=[{value:"\u83B7\u53D6 base64 \u7C7B\u578B",paraId:0,tocIndex:0}]},85480:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(9978);const a=[{value:"\u83B7\u53D6\u67E5\u8BE2\u53C2\u6570\u5BF9\u8C61",paraId:0,tocIndex:0},{value:`import { getParms } from 'HDesign';

getParms(); // \u4E3A\u4F20\u9012\u53C2\u6570\uFF0C\u9ED8\u8BA4 url = window.location.href

getParms('http://www.baidu.com'); // {}
getParms("http://www.baidu.com?name='hzh'"); // { name: "hzh" }
getParms('http://www.baidu.com?name=hzh'); // { name: "hzh" }
getParms('http://www.baidu.com?name=hzh&age=18'); // { name: "hzh", age: 18 }
getParms('http://www.baidu.com?name=hzh&age="18"'); // { name: "hzh", age: "18" }

getParms('?name=hzh&age=18&sex=\u7537&sex=\u5973'); // { name: 'hzh', age: 18, sex: ['\u7537', '\u5973']}
getParms('name=hzh&age=18&sex=\u7537&sex=\u5973'); // \u9519\u8BEF\uFF0C\u4E0D\u662F\u67E5\u8BE2\u53C2\u6570
`,paraId:1,tocIndex:0}]},18602:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(42033);const a=[{value:"\u83B7\u53D6\u67E5\u8BE2\u53C2\u6570\u5BF9\u8C61\u7684\u67D0\u4E00\u9879",paraId:0,tocIndex:0},{value:`import { getQuery } from 'HDesign';

getQuery('name'); // \u4E3A\u4F20\u9012\u53C2\u6570\uFF0C\u9ED8\u8BA4 url = window.location.href

getQuery('name', "http://www.baidu.com?name='hzh'"); // 'hzh'
getQuery('name', 'http://www.baidu.com?name=hzh'); // 'hzh'

getQuery('age', 'http://www.baidu.com?age=18'); // 18
getQuery('age', "http://www.baidu.com?age='18'"); // '18'
getQuery('age', "http://www.baidu.com?age='18'&age=18"); // ['18', 18]
`,paraId:1,tocIndex:0}]},29109:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(4583);const a=[{value:"\u5224\u65AD\u8BE5\u5B57\u7B26\u4E32\u662F\u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4",paraId:0,tocIndex:0},{value:`import { isArrayString } from 'HDesign';

isArrayString('[1, 2, 3]'); // true
isArrayString('[]'); // true
isArrayString('[1, "string", [1,2], {"key": "value"}, true, null]'); // true
isArrayString('1, 2, 3'); // false
isArrayString('{1, 2, 3}'); // false
isArrayString('[1, 2, 3'); // false
isArrayString('[1, 2, 3, undefined]'); // false
isArrayString('[1, 2, 3, function(){}]'); // false
`,paraId:1,tocIndex:0}]},79747:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(91496);const a=[{value:"\u5224\u65AD\u8BE5\u5B57\u7B26\u662F\u5426\u4E3A base64 \u56FE\u7247\u5B57\u7B26\u4E32",paraId:0,tocIndex:0},{value:`import { isBase64Image } from 'HDesign';

isBase64Image('data:image/png;base64,...'); // true
isBase64Image('data:image/jpg;base64,...'); // true
isBase64Image('data:image/gif;base64,...'); // true
isBase64Image('data:image/jpeg;base64,...'); // true
isBase64Image('data:image/svg+xml;base64,...'); // true
isBase64Image('data:image/webp;base64,...'); // true
`,paraId:1,tocIndex:0}]},75538:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(13328);const a=[{value:"\u5224\u65AD\u8BE5\u5B57\u7B26\u4E32\u662F\u4E0D\u662F\u4E00\u4E2A\u5BF9\u8C61",paraId:0,tocIndex:0},{value:`import { isObjectString } from 'HDesign';

isObjectString('{}'); // true
isObjectString('{"key": "value"}'); // true
isObjectString('{key: "value"}'); // false
isObjectString('[1, 2, 3]'); // false
isObjectString('{}}'); // false
`,paraId:1,tocIndex:0}]},50701:function(s,t,n){n.r(t),n.d(t,{texts:function(){return a}});var e=n(41370);const a=[{value:"\u5224\u65AD\u8BE5\u5B57\u7B26\u4E32\u80FD\u5426\u4E3A\u53D8\u91CF\u540D",paraId:0,tocIndex:0},{value:`import { isValidVariableName } from 'HDesign';

isValidVariableName('_name'); // true
isValidVariableName('name'); // true
isValidVariableName('$name'); // true
isValidVariableName('1name'); // false \u4E0D\u80FD\u6570\u5B57\u5F00\u5934
isValidVariableName('class'); // false \u5173\u952E\u5B57\u3001\u4FDD\u7559\u5B57
`,paraId:1,tocIndex:0}]}}]);
