"use strict";(self.webpackChunkHDesign=self.webpackChunkHDesign||[]).push([[5096],{9733:function(a,t,n){n.r(t),n.d(t,{demos:function(){return _}});var s=n(75271),e=n(64130),_={}},71070:function(a,t,n){n.r(t),n.d(t,{demos:function(){return _}});var s=n(75271),e=n(29464),_={}},40552:function(a,t,n){n.r(t),n.d(t,{demos:function(){return _}});var s=n(75271),e=n(76592),_={}},92368:function(a,t,n){n.r(t),n.d(t,{demos:function(){return _}});var s=n(75271),e=n(98078),_={}},37999:function(a,t,n){n.r(t),n.d(t,{demos:function(){return _}});var s=n(75271),e=n(44258),_={}},80118:function(a,t,n){n.r(t),n.d(t,{demos:function(){return _}});var s=n(75271),e=n(88823),_={}},66163:function(a,t,n){n.r(t),n.d(t,{demos:function(){return _}});var s=n(75271),e=n(6953),_={}},8923:function(a,t,n){n.r(t),n.d(t,{demos:function(){return _}});var s=n(75271),e=n(33049),_={}},23488:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var s=n(64130);const e=[{value:"Download base64 tool functions",paraId:0,tocIndex:0},{value:`import { downloadBase64Imgs } from 'HDesign';

downloadBase64Imgs(['base64-1', 'base64-2', 'base64...')
`,paraId:1,tocIndex:0}]},68277:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var s=n(29464);const e=[{value:"\u83B7\u53D6 base64 \u56FE\u7247\u7C7B\u578B",paraId:0,tocIndex:0},{value:"",paraId:1,tocIndex:0}]},24143:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var s=n(76592);const e=[{value:"get query parameter object",paraId:0,tocIndex:0},{value:`import { getParms } from 'HDesign';

getParms(); // \u4E3A\u4F20\u9012\u53C2\u6570\uFF0C\u9ED8\u8BA4 url = window.location.href

getParms('http://www.baidu.com'); // {}
getParms("http://www.baidu.com?name='hzh'"); // { name: "hzh" }
getParms('http://www.baidu.com?name=hzh'); // { name: "hzh" }
getParms('http://www.baidu.com?name=hzh&age=18'); // { name: "hzh", age: 18 }
getParms('http://www.baidu.com?name=hzh&age="18"'); // { name: "hzh", age: "18" }

getParms('?name=hzh&age=18&sex=\u7537&sex=\u5973'); // { name: 'hzh', age: 18, sex: ['\u7537', '\u5973']}
getParms('name=hzh&age=18&sex=\u7537&sex=\u5973'); // \u9519\u8BEF\uFF0C\u4E0D\u662F\u67E5\u8BE2\u53C2\u6570
`,paraId:1,tocIndex:0}]},20632:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var s=n(98078);const e=[{value:"get a certain item of the query parameter object",paraId:0,tocIndex:0},{value:`import { getQuery } from 'HDesign';

getQuery('name'); // \u4E3A\u4F20\u9012\u53C2\u6570\uFF0C\u9ED8\u8BA4 url = window.location.href

getQuery('name', "http://www.baidu.com?name='hzh'"); // 'hzh'
getQuery('name', 'http://www.baidu.com?name=hzh'); // 'hzh'

getQuery('age', 'http://www.baidu.com?age=18'); // 18
getQuery('age', "http://www.baidu.com?age='18'"); // '18'
getQuery('age', "http://www.baidu.com?age='18'&age=18"); // ['18', 18]
`,paraId:1,tocIndex:0}]},50533:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var s=n(44258);const e=[{value:"Determine if the string is an array",paraId:0,tocIndex:0},{value:`import { isArrayString } from 'HDesign';

isArrayString('[1, 2, 3]'); // true
isArrayString('[]'); // true
isArrayString('[1, "string", [1,2], {"key": "value"}, true, null]'); // true
isArrayString('1, 2, 3'); // false
isArrayString('{1, 2, 3}'); // false
isArrayString('[1, 2, 3'); // false
isArrayString('[1, 2, 3, undefined]'); // false
isArrayString('[1, 2, 3, function(){}]'); // false
`,paraId:1,tocIndex:0}]},22421:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var s=n(88823);const e=[{value:"\u5224\u65AD\u8BE5\u5B57\u7B26\u662F\u5426\u4E3A base64 \u56FE\u7247\u5B57\u7B26\u4E32",paraId:0,tocIndex:0},{value:"",paraId:1,tocIndex:0}]},88931:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var s=n(6953);const e=[{value:"Determine if the string is an object",paraId:0,tocIndex:0},{value:`import { isObjectString } from 'HDesign';

isObjectString('{}'); // true
isObjectString('{"key": "value"}'); // true
isObjectString('{key: "value"}'); // false
isObjectString('[1, 2, 3]'); // false
isObjectString('{}}'); // false
`,paraId:1,tocIndex:0}]},89440:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var s=n(33049);const e=[{value:"determine if the string can be a variable name",paraId:0,tocIndex:0},{value:`import { isValidVariableName } from 'HDesign';

isValidVariableName('_name'); // true
isValidVariableName('name'); // true
isValidVariableName('$name'); // true
isValidVariableName('1name'); // false \u4E0D\u80FD\u6570\u5B57\u5F00\u5934
isValidVariableName('class'); // false \u5173\u952E\u5B57\u3001\u4FDD\u7559\u5B57
`,paraId:1,tocIndex:0}]}}]);
