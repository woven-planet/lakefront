"use strict";(self.webpackChunk_toyota_research_institute_lakefront=self.webpackChunk_toyota_research_institute_lakefront||[]).push([[7129],{"./.storybook/DocBlock.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");const DocBlock=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Dx,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.QE,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.dk,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.fQ,{includePrimary:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed,{})]}),__WEBPACK_DEFAULT_EXPORT__=DocBlock;try{DocBlock.displayName="DocBlock",DocBlock.__docgenInfo={description:"",displayName:"DocBlock",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/DocBlock.tsx#DocBlock"]={docgenInfo:DocBlock.__docgenInfo,name:"DocBlock",path:".storybook/DocBlock.tsx#DocBlock"})}catch(__react_docgen_typescript_loader_error){}},"./src/stories/StepFunctionRenderer/StepFunctionRenderer.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{StepFunctionRenderer:()=>StepFunctionRenderer,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_DocBlock__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/DocBlock.tsx"),src_components_StepFunctionRenderer_StepFunctionRenderer__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/StepFunctionRenderer/StepFunctionRenderer.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Lakefront/StepFunctionRenderer",component:src_components_StepFunctionRenderer_StepFunctionRenderer__WEBPACK_IMPORTED_MODULE_2__.Z,argTypes:{},parameters:{docs:{page:_storybook_DocBlock__WEBPACK_IMPORTED_MODULE_1__.Z}}},Template=args=>{const[json,setJson]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(args.stepFunctionJSON);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{setJson(args.stepFunctionJSON)}),[args.stepFunctionJSON]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(src_components_StepFunctionRenderer_StepFunctionRenderer__WEBPACK_IMPORTED_MODULE_2__.Z,{stepFunctionJSON:json})})};Template.displayName="Template";const StepFunctionRenderer=Template.bind({});StepFunctionRenderer.args={stepFunctionJSON:{Comment:"Parallel Example.",StartAt:"LookupCustomerInfo",States:{LookupCustomerInfo:{Type:"Parallel",End:!0,Branches:[{StartAt:"LookupAddress",States:{LookupAddress:{Type:"Task",Resource:"abc",End:!0}}},{StartAt:"LookupPhone",States:{LookupPhone:{Type:"Task",Resource:"arn:aws:lambda:us-east-1:123456789012:function:PhoneFinder",End:!0}}}]}}}},StepFunctionRenderer.parameters={...StepFunctionRenderer.parameters,docs:{...StepFunctionRenderer.parameters?.docs,source:{originalSource:"args => {\n  const [json, setJson] = useState(args.stepFunctionJSON);\n  useEffect(() => {\n    setJson(args.stepFunctionJSON);\n  }, [args.stepFunctionJSON]);\n  return <div>\n            <StepFunctionRendererComponent stepFunctionJSON={(json as StepFunction)} />\n        </div>;\n}",...StepFunctionRenderer.parameters?.docs?.source}}};const __namedExportsOrder=["StepFunctionRenderer"]},"./src/components/StepFunctionRenderer/StepFunctionRenderer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>StepFunctionRenderer_StepFunctionRenderer});var react=__webpack_require__("./node_modules/react/index.js"),dagre_d3=__webpack_require__("./node_modules/dagre-d3/index.js"),src_select=__webpack_require__("./node_modules/d3-selection/src/select.js"),src=__webpack_require__("./node_modules/d3-zoom/src/index.js"),util=__webpack_require__("./src/components/StepFunctionRenderer/util/index.ts"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");const StepFunctionRendererContainer=emotion_styled_browser_esm.Z.div((({theme})=>({height:700,width:"100%",maxWidth:1e3,".svgWrapper":{width:"100%",height:"100%",boxSizing:"border-box"},".clusters rect":{fill:theme?.colors?.white,stroke:theme?.colors?.bombay,strokeWidth:1.5},text:{fontWeight:300,fontSize:14},".node rect, .node circle":{stroke:theme?.colors?.bombay,fill:theme?.colors?.white,strokeWidth:1.5},".edgePath path":{stroke:theme?.colors?.storm,strokeWidth:1.5},"table, td, tr":{border:"none",borderCollapse:"collapse"},td:{padding:5},"div.renderError":{color:theme?.colors?.red,display:"flex",width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}}))),OuterSvg=emotion_styled_browser_esm.Z.svg({width:"100%",height:"100%"});var graphStyles=__webpack_require__("./src/components/StepFunctionRenderer/util/graphStyles.ts"),emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const StepFunctionRenderer=({stepFunctionJSON,handleContextClickNode,handleCloseContextMenu,handleSelectedNode,onGraphCreate,className})=>{const[renderError,setRenderError]=(0,react.useState)(!1),containerRef=(0,react.useRef)(null),outerSvgRef=(0,react.useRef)(null),innerGroupRef=(0,react.useRef)(null),data={serializedGraph:(0,util.yw)(stepFunctionJSON),states:(0,util.Pz)(stepFunctionJSON)};return(0,react.useEffect)((()=>{if(setRenderError(!1),containerRef.current&&innerGroupRef.current&&outerSvgRef.current){const{serializedGraph,states}=data,g=dagre_d3.graphlib.json.read((0,graphStyles.RJ)(JSON.parse(serializedGraph))),graph=g.graph();onGraphCreate&&onGraphCreate(g,states);const container=(0,src_select.Z)(containerRef.current),svg=(0,src_select.Z)(outerSvgRef.current),inner=(0,src_select.Z)(innerGroupRef.current);inner.html("");const zoom=(0,src.sP)().on("zoom",(function(event){inner.attr("transform",event.transform)}));svg.call(zoom).on("dblclick.zoom",null);const graphRenderer=new dagre_d3.render;try{graph.transition=function(selection){return selection.transition().duration(500)},graphRenderer(inner,g),container.on("click",((event,eventData)=>{handleCloseContextMenu&&handleCloseContextMenu()})),inner.selectAll("g.node").style("cursor","pointer").on("click",((event,eventData)=>{if("string"==typeof eventData){event.stopPropagation();const node=states[eventData];handleSelectedNode&&handleSelectedNode(eventData,node),handleCloseContextMenu&&handleCloseContextMenu()}})).on("contextmenu",((event,eventData)=>{if("string"==typeof eventData){const node=states[eventData];handleContextClickNode&&node&&(event.stopPropagation(),event.preventDefault(),handleContextClickNode(eventData,node,event,outerSvgRef.current))}}));const initialScale=1,svgWidth=+svg.style("width").slice(0,-2),svgHeight=+svg.style("height").slice(0,-2);svg.call(zoom.transform,src.CR.translate((svgWidth-graph.width*initialScale)/2,(svgHeight-graph.height*initialScale)/2).scale(initialScale))}catch(error){setRenderError(!0)}}}),[containerRef,innerGroupRef,outerSvgRef,stepFunctionJSON]),(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:(0,jsx_runtime.jsxs)(StepFunctionRendererContainer,{ref:containerRef,className,children:[!renderError&&(0,jsx_runtime.jsx)(OuterSvg,{ref:outerSvgRef,children:(0,jsx_runtime.jsx)("g",{ref:innerGroupRef})}),renderError&&(0,jsx_runtime.jsx)("div",{className:"renderError",children:"Error encountered rendering step function"})]})})};StepFunctionRenderer.displayName="StepFunctionRenderer";const StepFunctionRenderer_StepFunctionRenderer=StepFunctionRenderer;try{StepFunctionRenderer.displayName="StepFunctionRenderer",StepFunctionRenderer.__docgenInfo={description:"Step Function Renderer Component\n\nThe Step Function Renderer takes AWS Step Function JSON and renders an interactive 2D visualization of how its states connect together.\nIt can be panned by clicking in empty space and moving the mouse. The scroll wheel can be used for zoom-in and zoom-out functionality.\nThis component does not allow cycles, or nodes that connect such that a circular path is formed.",displayName:"StepFunctionRenderer",props:{handleContextClickNode:{defaultValue:null,description:"Handle a right-click on any drawn node. This will send data stored with each node from the parsing step on click inside of any drawn node.\nUse this to configure a context menu.",name:"handleContextClickNode",required:!1,type:{name:"((key: string, node: any, e: PointerEvent, graphContainer: SVGElement | null) => void)"}},handleCloseContextMenu:{defaultValue:null,description:"Action to run when a node context menu is closed.",name:"handleCloseContextMenu",required:!1,type:{name:"(() => void)"}},handleSelectedNode:{defaultValue:null,description:"Handle a left-click on any drawn node. This will send data stored with each node from the parsing step on click inside of any drawn node.",name:"handleSelectedNode",required:!1,type:{name:"((key: string, node: any) => void)"}},onGraphCreate:{defaultValue:null,description:"Returns the graph object.",name:"onGraphCreate",required:!1,type:{name:"((graph: any, states: any) => void)"}},stepFunctionJSON:{defaultValue:null,description:"This is AWS Step Function JSON contained in an object. See the Storybook Canvas for detailed examples of what\nshould be provided.",name:"stepFunctionJSON",required:!0,type:{name:"StepFunction"}},className:{defaultValue:null,description:"The classes to pass to the step function renderer container.",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/StepFunctionRenderer/StepFunctionRenderer.tsx#StepFunctionRenderer"]={docgenInfo:StepFunctionRenderer.__docgenInfo,name:"StepFunctionRenderer",path:"src/components/StepFunctionRenderer/StepFunctionRenderer.tsx#StepFunctionRenderer"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/StepFunctionRenderer/util/graphStyles.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{RJ:()=>enhanceWithCurvedEgdes,SF:()=>getNodeOptions,tI:()=>getClusterOptions,tm:()=>getMissingStyle,uo:()=>getEdgeOptions});var d3_shape__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/d3-shape/src/curve/basis.js");const getNodeOptions=state=>{switch(state.Type){case"Fail":return{style:"stroke: #a80d35;"};case"Succeed":return{style:"stroke: #2BD62E;"};default:return{}}},getClusterOptions=state=>{switch(state.Type){case"Parallel":return{label:"Parallel",style:"stroke: #999; stroke-width: 2px; stroke-dasharray: 8, 4; rx: 5;",clusterLabelPos:"top"};case"Map":return{label:"Map",style:"stroke: #999; stroke-width: 2px; stroke-dasharray: 16, 4; rx: 5;",clusterLabelPos:"top"};case"Choice":return{label:"Choice",style:"fill: #d9dddc; rx: 5;",clusterLabelPos:"top"};default:return{}}},getEdgeOptions=()=>({labelStyle:"font-style: italic;"}),getMissingStyle=()=>"fill: #ff0000;",enhanceWithCurvedEgdes=graph=>((graph.edges||[]).forEach((edge=>{edge.value={...edge.value,curve:d3_shape__WEBPACK_IMPORTED_MODULE_0__.ZP}})),graph)},"./src/components/StepFunctionRenderer/util/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{yw:()=>buildGraph,lf:()=>findTerminalNodeKey,Pz:()=>getStates});var dagre_d3=__webpack_require__("./node_modules/dagre-d3/index.js"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),es=__webpack_require__("./node_modules/ramda/es/index.js");function stringifyChoiceOperator(operator){const traverse=operator=>{if((operator=>Boolean(operator.Variable))(operator))return(operator=>{const{Variable,...rest}=operator,conditionName=Object.keys(rest)[0],conditionValue=rest[conditionName];return`(${stringifyVariable(operator.Variable||"")} ${stringifyOperatorName(conditionName)} ${conditionValue})`})(operator);{const{Next,...rest}=operator,operatorName=Object.keys(rest)[0];if(Array.isArray(rest[operatorName])){return`(${rest[operatorName].map(traverse).join(` ${operatorName} `)})`}{const childOperator=rest[operatorName];return`(${operatorName} (${traverse(childOperator)}))`}}},stringifyVariable=variable=>variable.slice(2),stringifyOperatorName=operatorName=>{switch(!0){case/.*GreaterThanEquals$/.test(operatorName):return">=";case/.*LessThanEquals$/.test(operatorName):return"<=";case/.*GreaterThan$/.test(operatorName):return">";case/.*LessThan$/.test(operatorName):return"<";case/.*Equals$/.test(operatorName):return"=";default:return operatorName}};try{return traverse(operator)}catch(error){return""}}function getStates(stepFunction){const states={};return traverseStepFunction(stepFunction,((stateName,state)=>{states[stateName]=function oneLevelDeepClone(object,includeAdditionalData=!1){return Object.keys(object).reduce(((acc,key)=>{if((Array.isArray(object[key])||"object"==typeof object[key])&&!isDirectionalData(key))return acc;if(!includeAdditionalData&&isDirectionalData(key))return acc;if(isDirectionalData(key))return acc[key]=object[key],acc;const shortenedValue=`${object[key]}`.length>25?`${object[key]}`.slice(0,25)+"...":object[key];return acc[key]=shortenedValue,acc}),{})}(state,!0)})),states}const DIRECTIONAL_DATA_KEYS=["Branches","Choices","Iterator","Metadata"],isDirectionalData=key=>DIRECTIONAL_DATA_KEYS.includes(key);function traverseStepFunction(stepFunction,callback){Object.keys(stepFunction.States).forEach((stateName=>{const state=stepFunction.States[stateName];switch(callback(stateName,state),state.Type){case"Parallel":state.Branches.forEach((branch=>{traverseStepFunction(branch,callback)}));break;case"Map":traverseStepFunction(state.Iterator,callback)}}))}var graphStyles=__webpack_require__("./src/components/StepFunctionRenderer/util/graphStyles.ts");const makeNodeName=()=>`Node_${(0,v4.Z)()}`,createMissingNodes=g=>{const makeLabel=edgePointer=>`${edgePointer} (Missing)`;return g.edges().forEach((edge=>{g.node(edge.v)||g.setNode(edge.v,{label:makeLabel(edge.v),style:(0,graphStyles.tm)()}),g.node(edge.w)||g.setNode(edge.w,{label:makeLabel(edge.w),style:(0,graphStyles.tm)()})})),g},roundNodes=g=>(g.nodes().forEach((function(v){const node=g.node(v);node&&(node.rx=5,node.ry=5)})),g),serializeGraph=es.qCK(JSON.stringify,dagre_d3.graphlib.json.write),makeCluster=(g,state,parentClusterName)=>{const clusterName=`Group_${(0,v4.Z)()}`;return g.setNode(clusterName,(0,graphStyles.tI)(state)),parentClusterName&&g.setParent(clusterName,parentClusterName),clusterName},buildGraph=stepFunction=>{const g=new dagre_d3.graphlib.Graph({compound:!0,multigraph:!0}).setGraph({}).setDefaultEdgeLabel((()=>({}))),startNodeName=makeNodeName(),endNodeName=makeNodeName();g.setNode(startNodeName,{label:"Start",shape:"circle",style:"fill: #fcba03;"}),g.setNode(endNodeName,{label:"End",shape:"circle",style:"fill: #fcba03;"});const traverse=(stepFunction,g,parentClusterName,fromState,nextState)=>{const startAtName=stepFunction.StartAt,isRootLevel=!parentClusterName;fromState&&g.setEdge(fromState,startAtName),parentClusterName&&g.setParent(startAtName,parentClusterName);const statesToAddToParent=new Set(Object.keys(stepFunction.States));return es.Zpf(stepFunction.States).forEach((([stateName,state])=>{switch(g.setNode(stateName,{label:stateName,...(0,graphStyles.SF)(state)}),stateName===startAtName&&isRootLevel&&g.setEdge(startNodeName,stateName),state.Type){case"Parallel":{const clusterName=makeCluster(g,state,parentClusterName);state.Branches.forEach((branch=>{traverse(branch,g,clusterName,stateName,state.Next)}));break}case"Map":{const clusterName=makeCluster(g,state,parentClusterName);traverse(state.Iterator,g,clusterName,stateName,state.Next);break}case"Choice":if(state.Choices){const clusterName=makeCluster(g,state,parentClusterName);if(state.Choices.forEach((choice=>{const label=stringifyChoiceOperator(choice);g.setEdge(stateName,choice.Next,{label,...(0,graphStyles.uo)()}),g.setParent(choice.Next,clusterName),statesToAddToParent.delete(choice.Next)})),state.Default){const label="Default";g.setEdge(stateName,state.Default,{label,...(0,graphStyles.uo)()}),g.setParent(state.Default,clusterName),statesToAddToParent.delete(state.Default)}}break;default:(state=>state.End&&"Parallel"!==state.Type&&"Map"!==state.Type||"Fail"===state.Type||"Succeed"===state.Type)(state)&&g.setEdge(stateName,nextState||endNodeName),state.Next&&g.setEdge(stateName,state.Next)}if(state.Catch&&state.Catch.forEach((catcher=>{const label=(catcher.ErrorEquals||[]).join(" or ");g.setEdge(stateName,catcher.Next,{label,...(0,graphStyles.uo)()})})),state.Retry){const conditionsLength=(state.Retry||[]).length,label=`(${conditionsLength} condition${conditionsLength>1?"s":""})`;g.setEdge(stateName,stateName,{label,...(0,graphStyles.uo)()})}})),parentClusterName&&[...statesToAddToParent].forEach((stateName=>{g.setParent(stateName,parentClusterName)})),g};return es.qCK(serializeGraph,roundNodes,createMissingNodes,traverse)(stepFunction,g)},findTerminalNodeKey=(type,graph)=>{if(!graph)return"";const vertexKey="Start"===type?"v":"w",terminalEdge=graph.edges().find((edge=>graph.node(edge[vertexKey]).label===type));return terminalEdge?terminalEdge[vertexKey]:""}}}]);