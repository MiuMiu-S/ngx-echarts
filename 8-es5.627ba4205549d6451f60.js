function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function _createClass(n,t,e){return t&&_defineProperties(n.prototype,t),e&&_defineProperties(n,e),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{GGkF:function(n,t,e){"use strict";e.r(t),t.default="import { Component, AfterViewInit } from '@angular/core';\nimport { getInstanceByDom, connect } from 'echarts';\ndeclare const require: any; // DEMO IGNORE\n\n@Component({\n  selector: 'app-connect-charts',\n  templateUrl: './connect-charts.component.html',\n  styleUrls: ['./connect-charts.component.scss'],\n})\nexport class ConnectChartsComponent implements AfterViewInit {\n  html = require('!!html-loader?-minimize!./connect-charts.component.html'); // DEMO IGNORE\n  component = require('!!raw-loader!./connect-charts.component.ts').default; // DEMO IGNORE\n  options = {\n    color: ['#3398DB'],\n    tooltip: {\n      trigger: 'axis',\n      axisPointer: {\n        type: 'shadow',\n      },\n    },\n    grid: {\n      left: '3%',\n      right: '4%',\n      bottom: '3%',\n      containLabel: true,\n    },\n    xAxis: [\n      {\n        type: 'category',\n        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],\n        axisTick: {\n          alignWithLabel: true,\n        },\n      },\n    ],\n    yAxis: [\n      {\n        type: 'value',\n      },\n    ],\n    series: [\n      {\n        name: 'Counters',\n        type: 'bar',\n        barWidth: '60%',\n        data: [10, 52, 200, 334, 390, 330, 220],\n      },\n    ],\n  };\n  constructor() {}\n\n  ngAfterViewInit() {\n    setTimeout(() => {\n      const chartElement1 = document.getElementById('chart1');\n      const chartElement2 = document.getElementById('chart2');\n      const chart1 = getInstanceByDom(chartElement1);\n      const chart2 = getInstanceByDom(chartElement2);\n      connect([chart1, chart2]);\n    });\n  }\n}\n"},IHCD:function(n,t){n.exports='\x3c!-- DEMO START --\x3e\n<div nz-row>\n  <div nz-col nzSpan="12">\n    <h5> id=chart1 </h5>\n    <div id="chart1" echarts [options]="options" theme="macarons" class="demo-chart"></div>\n  </div>\n  <div nz-col nzSpan="12">\n    <h5> id=chart2 </h5>\n    <div id="chart2" echarts [options]="options" theme="macarons" class="demo-chart"></div>\n  </div>\n</div>\n\x3c!-- DEMO END --\x3e\n\n<code-block\n  [html]="html"\n  [component]="component">\n</code-block>'},LXru:function(n,t){n.exports='\x3c!-- DEMO START --\x3e\n<div echarts (chartInit)="onChartReady($event)" [options]="options" style="height: 600px;"></div>\n\x3c!-- DEMO END --\x3e\n\n<code-block\n  [html]="html"\n  [component]="component">\n</code-block>'},lYPZ:function(n,t,e){"use strict";e.r(t),t.default="import { Component, OnDestroy } from '@angular/core';\nimport * as echarts from 'echarts';\ndeclare const require: any; // DEMO IGNORE\n\nconst SymbolSize = 20;\nconst Data = [\n  [15, 0],\n  [-50, 10],\n  [-56.5, 20],\n  [-46.5, 30],\n  [-22.1, 40],\n];\n\n@Component({\n  selector: 'app-line-draggable',\n  templateUrl: './line-draggable.component.html',\n  styleUrls: ['./line-draggable.component.scss'],\n})\nexport class LineDraggableComponent implements OnDestroy {\n  html = require('!!html-loader?-minimize!./line-draggable.component.html'); // DEMO IGNORE\n  component = require('!!raw-loader!./line-draggable.component.ts').default; // DEMO IGNORE\n  updatePosition: () => void;\n  options = {\n    title: {\n      text: 'Try Dragging these Points',\n    },\n    tooltip: {\n      triggerOn: 'none',\n      formatter: (params) =>\n        'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2),\n    },\n    grid: {},\n    xAxis: {\n      min: -100,\n      max: 80,\n      type: 'value',\n      axisLine: { onZero: false },\n    },\n    yAxis: {\n      min: -30,\n      max: 60,\n      type: 'value',\n      axisLine: { onZero: false },\n    },\n    dataZoom: [\n      {\n        type: 'slider',\n        xAxisIndex: 0,\n        filterMode: 'empty',\n      },\n      {\n        type: 'slider',\n        yAxisIndex: 0,\n        filterMode: 'empty',\n      },\n      {\n        type: 'inside',\n        xAxisIndex: 0,\n        filterMode: 'empty',\n      },\n      {\n        type: 'inside',\n        yAxisIndex: 0,\n        filterMode: 'empty',\n      },\n    ],\n    series: [\n      {\n        id: 'a',\n        type: 'line',\n        smooth: true,\n        symbolSize: SymbolSize,\n        data: Data,\n      },\n    ],\n  };\n  constructor() {}\n\n  ngOnDestroy() {\n    if (this.updatePosition) {\n      window.removeEventListener('resize', this.updatePosition);\n    }\n  }\n\n  onChartReady(myChart: echarts.ECharts) {\n    const onPointDragging = function(dataIndex) {\n      Data[dataIndex] = myChart.convertFromPixel({ gridIndex: 0 }, this.position) as number[];\n\n      // Update data\n      myChart.setOption({\n        series: [\n          {\n            id: 'a',\n            data: Data,\n          },\n        ],\n      });\n    };\n\n    const showTooltip = (dataIndex) => {\n      myChart.dispatchAction({\n        type: 'showTip',\n        seriesIndex: 0,\n        dataIndex,\n      });\n    };\n\n    const hideTooltip = () => {\n      myChart.dispatchAction({\n        type: 'hideTip',\n      });\n    };\n\n    const updatePosition = () => {\n      myChart.setOption({\n        graphic: echarts.util.map(Data, (item) => ({\n          position: myChart.convertToPixel({ gridIndex: 0 }, item),\n        })),\n      });\n    };\n\n    window.addEventListener('resize', updatePosition);\n    myChart.on('dataZoom', updatePosition);\n\n    // save handler and remove it on destroy\n    this.updatePosition = updatePosition;\n\n    setTimeout(() => {\n      myChart.setOption({\n        graphic: echarts.util.map(Data, (item, dataIndex) => {\n          return {\n            type: 'circle',\n            position: myChart.convertToPixel({ gridIndex: 0 }, item),\n            shape: {\n              cx: 0,\n              cy: 0,\n              r: SymbolSize / 2,\n            },\n            invisible: true,\n            draggable: true,\n            ondrag: echarts.util.curry(onPointDragging, dataIndex),\n            onmousemove: echarts.util.curry(showTooltip, dataIndex),\n            onmouseout: echarts.util.curry(hideTooltip, dataIndex),\n            z: 100,\n          };\n        }),\n      });\n    }, 0);\n  }\n}\n"},ptf5:function(n,t,e){"use strict";e.r(t),e.d(t,"DemoAdvancedModule",(function(){return E}));var o,i,a=e("ofXK"),r=e("giWl"),c=e("PCNd"),s=e("tyNb"),d=e("fXoL"),l=e("jPNr"),p=e("yNE/"),m=e("5vDB"),h=e("oyxB"),u=e("MT78"),y=e("B+r4"),b=e("7DxU"),x=((o=function(){function n(){_classCallCheck(this,n),this.html=e("IHCD"),this.component=e("GGkF").default,this.options={color:["#3398DB"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value"}],series:[{name:"Counters",type:"bar",barWidth:"60%",data:[10,52,200,334,390,330,220]}]}}return _createClass(n,[{key:"ngAfterViewInit",value:function(){setTimeout((function(){var n=document.getElementById("chart1"),t=document.getElementById("chart2"),e=Object(u.getInstanceByDom)(n),o=Object(u.getInstanceByDom)(t);Object(u.connect)([e,o])}))}}]),n}()).\u0275fac=function(n){return new(n||o)},o.\u0275cmp=d.Nb({type:o,selectors:[["app-connect-charts"]],decls:10,vars:4,consts:[["nz-row",""],["nz-col","","nzSpan","12"],["id","chart1","echarts","","theme","macarons",1,"demo-chart",3,"options"],["id","chart2","echarts","","theme","macarons",1,"demo-chart",3,"options"],[3,"html","component"]],template:function(n,t){1&n&&(d.Zb(0,"div",0),d.Zb(1,"div",1),d.Zb(2,"h5"),d.Kc(3," id=chart1 "),d.Yb(),d.Ub(4,"div",2),d.Yb(),d.Zb(5,"div",1),d.Zb(6,"h5"),d.Kc(7," id=chart2 "),d.Yb(),d.Ub(8,"div",3),d.Yb(),d.Yb(),d.Ub(9,"code-block",4)),2&n&&(d.Db(4),d.sc("options",t.options),d.Db(4),d.sc("options",t.options),d.Db(1),d.sc("html",t.html)("component",t.component))},directives:[y.c,y.a,r.a,b.a],styles:[""]}),o),g=[[15,0],[-50,10],[-56.5,20],[-46.5,30],[-22.1,40]],f=((i=function(){function n(){_classCallCheck(this,n),this.html=e("LXru"),this.component=e("lYPZ").default,this.options={title:{text:"Try Dragging these Points"},tooltip:{triggerOn:"none",formatter:function(n){return"X: "+n.data[0].toFixed(2)+"<br>Y: "+n.data[1].toFixed(2)}},grid:{},xAxis:{min:-100,max:80,type:"value",axisLine:{onZero:!1}},yAxis:{min:-30,max:60,type:"value",axisLine:{onZero:!1}},dataZoom:[{type:"slider",xAxisIndex:0,filterMode:"empty"},{type:"slider",yAxisIndex:0,filterMode:"empty"},{type:"inside",xAxisIndex:0,filterMode:"empty"},{type:"inside",yAxisIndex:0,filterMode:"empty"}],series:[{id:"a",type:"line",smooth:!0,symbolSize:20,data:g}]}}return _createClass(n,[{key:"ngOnDestroy",value:function(){this.updatePosition&&window.removeEventListener("resize",this.updatePosition)}},{key:"onChartReady",value:function(n){var t=function(t){g[t]=n.convertFromPixel({gridIndex:0},this.position),n.setOption({series:[{id:"a",data:g}]})},e=function(t){n.dispatchAction({type:"showTip",seriesIndex:0,dataIndex:t})},o=function(){n.dispatchAction({type:"hideTip"})},i=function(){n.setOption({graphic:u.util.map(g,(function(t){return{position:n.convertToPixel({gridIndex:0},t)}}))})};window.addEventListener("resize",i),n.on("dataZoom",i),this.updatePosition=i,setTimeout((function(){n.setOption({graphic:u.util.map(g,(function(i,a){return{type:"circle",position:n.convertToPixel({gridIndex:0},i),shape:{cx:0,cy:0,r:10},invisible:!0,draggable:!0,ondrag:u.util.curry(t,a),onmousemove:u.util.curry(e,a),onmouseout:u.util.curry(o,a),z:100}}))})}),0)}}]),n}()).\u0275fac=function(n){return new(n||i)},i.\u0275cmp=d.Nb({type:i,selectors:[["app-line-draggable"]],decls:2,vars:3,consts:[["echarts","",2,"height","600px",3,"options","chartInit"],[3,"html","component"]],template:function(n,t){1&n&&(d.Zb(0,"div",0),d.hc("chartInit",(function(n){return t.onChartReady(n)})),d.Yb(),d.Ub(1,"code-block",1)),2&n&&(d.sc("options",t.options),d.Db(1),d.sc("html",t.html)("component",t.component))},directives:[r.a,b.a],styles:[""]}),i);function v(n,t){1&n&&d.Ub(0,"app-connect-charts")}function I(n,t){1&n&&d.Ub(0,"app-line-draggable")}var C,D,w,z=[{path:"",redirectTo:"advanced-usage",pathMatch:"full"},{path:"advanced-usage",component:(C=function(){function n(){_classCallCheck(this,n)}return _createClass(n,[{key:"ngOnInit",value:function(){}}]),n}(),C.\u0275fac=function(n){return new(n||C)},C.\u0275cmp=d.Nb({type:C,selectors:[["app-advanced"]],decls:13,vars:1,consts:[["nzTitle","Advanced"],["nz-page-header-breadcrumb",""],["routerLink","/welcome"],[2,"margin-top","8px",3,"nzTabPosition"],["nzTitle","Connect Charts"],["nz-tab",""],["nzTitle","Draggable Chart"]],template:function(n,t){1&n&&(d.Zb(0,"nz-page-header",0),d.Zb(1,"nz-breadcrumb",1),d.Zb(2,"nz-breadcrumb-item"),d.Zb(3,"a",2),d.Kc(4,"Home"),d.Yb(),d.Yb(),d.Zb(5,"nz-breadcrumb-item"),d.Kc(6,"Advanced"),d.Yb(),d.Yb(),d.Yb(),d.Ub(7,"nz-divider"),d.Zb(8,"nz-tabset",3),d.Zb(9,"nz-tab",4),d.Ic(10,v,1,0,"ng-template",5),d.Yb(),d.Zb(11,"nz-tab",6),d.Ic(12,I,1,0,"ng-template",5),d.Yb(),d.Yb()),2&n&&(d.Db(8),d.sc("nzTabPosition","left"))},directives:[l.b,p.a,l.a,p.b,s.g,m.a,h.c,h.a,h.b,x,f],styles:[""]}),C)}],T=((w=function n(){_classCallCheck(this,n)}).\u0275mod=d.Rb({type:w}),w.\u0275inj=d.Qb({factory:function(n){return new(n||w)},imports:[[s.h.forChild(z)],s.h]}),w),E=((D=function n(){_classCallCheck(this,n)}).\u0275mod=d.Rb({type:D}),D.\u0275inj=d.Qb({factory:function(n){return new(n||D)},imports:[[a.c,c.a,r.b,T]]}),D)}}]);