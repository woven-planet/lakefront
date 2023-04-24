/*! For license information please see stories-RefreshToolbar-RefreshToolbar-stories.0636b7a3.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_toyota_research_institute_lakefront=self.webpackChunk_toyota_research_institute_lakefront||[]).push([[8362],{"./node_modules/@emotion/react/dist/emotion-react.browser.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F4:()=>keyframes,iv:()=>css,tZ:()=>jsx});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__("./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js"),__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js")),_emotion_serialize__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"),__webpack_require__("./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js")),jsx=(__webpack_require__("./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js"),function jsx(type,props){var args=arguments;if(null==props||!_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__.h.call(props,"css"))return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(void 0,args);var argsLength=args.length,createElementArgArray=new Array(argsLength);createElementArgArray[0]=_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__.E,createElementArgArray[1]=(0,_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__.c)(type,props);for(var i=2;i<argsLength;i++)createElementArgArray[i]=args[i];return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(null,createElementArgArray)});function css(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];return(0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_3__.O)(args)}var keyframes=function keyframes(){var insertable=css.apply(void 0,arguments),name="animation-"+insertable.name;return{name,styles:"@keyframes "+name+"{"+insertable.styles+"}",anim:1,toString:function toString(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}}},"./.storybook/DocBlock.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");const DocBlock=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Dx,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.QE,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.dk,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.fQ,{includePrimary:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed,{})]}),__WEBPACK_DEFAULT_EXPORT__=DocBlock;try{DocBlock.displayName="DocBlock",DocBlock.__docgenInfo={description:"",displayName:"DocBlock",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/DocBlock.tsx#DocBlock"]={docgenInfo:DocBlock.__docgenInfo,name:"DocBlock",path:".storybook/DocBlock.tsx#DocBlock"})}catch(__react_docgen_typescript_loader_error){}},"./src/stories/RefreshToolbar/RefreshToolbar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{RefreshToolbar:()=>RefreshToolbar,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),src_components_RefreshToolbar__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/RefreshToolbar/index.ts"),src_components_Button_Button__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Button/Button.tsx"),_storybook_DocBlock__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/DocBlock.tsx"),src_styles_lakefrontColors__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/styles/lakefrontColors.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Lakefront/RefreshToolbar",component:src_components_RefreshToolbar__WEBPACK_IMPORTED_MODULE_1__.Z,parameters:{docs:{page:_storybook_DocBlock__WEBPACK_IMPORTED_MODULE_3__.Z}}},Template=args=>{const[count,setCount]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),[showBanner,setShowBanner]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),refreshToolbarRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{refreshToolbarRef.current&&setShowBanner(!0);const timer=setTimeout((()=>{setShowBanner(!1)}),3e3);return()=>{clearTimeout(timer)}}),[count]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{ref:refreshToolbarRef,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{style:{minHeight:20,backgroundColor:showBanner&&src_styles_lakefrontColors__WEBPACK_IMPORTED_MODULE_4__.Bz,padding:8,margin:"8px 0",textAlign:"center",width:"100%"},children:[showBanner&&count>0&&`Refresh clicked ${count} times.`,showBanner&&0===count&&"Refresh counter reset to 0"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("section",{style:{display:"inline-flex"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(src_components_RefreshToolbar__WEBPACK_IMPORTED_MODULE_1__.Z,{handleRefresh:()=>{setCount((count=>count+1))},className:args.className,standalone:args.standalone,isRefreshing:args.isRefreshing,lastUpdated:args.lastUpdated,refreshProgressLabel:args.refreshProgressLabel,rightComp:args.rightComp,rightSideText:args.rightSideText,refreshButton:args.refreshButton}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(src_components_Button_Button__WEBPACK_IMPORTED_MODULE_2__.Z,{color:"secondary",onClick:()=>{setCount(0)},style:{marginTop:"10px",marginLeft:"10px"},children:"Reset"})]})]})};Template.displayName="Template";const RefreshToolbar=Template.bind({});RefreshToolbar.args={isRefreshing:!1,refreshProgressLabel:"Loading...",refreshTooltipText:"Refresh LogSync File Details",lastUpdated:"11:28:22 AM",rightSideText:"Last Updated: 11:28:22 AM EST"},RefreshToolbar.parameters={...RefreshToolbar.parameters,docs:{...RefreshToolbar.parameters?.docs,source:{originalSource:"args => {\n  const [count, setCount] = useState(0);\n  const [showBanner, setShowBanner] = useState(false);\n  const refreshToolbarRef = useRef(null);\n  const handleRefresh = () => {\n    setCount(count => count + 1);\n  };\n  const resetCount = () => {\n    setCount(0);\n  };\n  useEffect(() => {\n    if (refreshToolbarRef.current) {\n      setShowBanner(true);\n    }\n    const timer = setTimeout(() => {\n      setShowBanner(false);\n    }, 3000);\n    return () => {\n      clearTimeout(timer);\n    };\n  }, [count]);\n  return <div ref={refreshToolbarRef}>\n            <div style={{\n      minHeight: 20,\n      backgroundColor: showBanner && emerald,\n      padding: 8,\n      margin: '8px 0',\n      textAlign: 'center',\n      width: '100%'\n    }}>\n                {showBanner && count > 0 && `Refresh clicked ${count} times.`}\n                {showBanner && count === 0 && `Refresh counter reset to 0`}\n            </div>\n            <section style={{\n      display: 'inline-flex'\n    }}>\n                <RefreshToolbarComponent handleRefresh={handleRefresh} className={args.className} standalone={args.standalone} isRefreshing={args.isRefreshing} lastUpdated={args.lastUpdated} refreshProgressLabel={args.refreshProgressLabel} rightComp={args.rightComp} rightSideText={args.rightSideText} refreshButton={args.refreshButton} />\n                <Button color='secondary' onClick={resetCount} style={{\n        marginTop: '10px',\n        marginLeft: '10px'\n      }}>Reset</Button>\n            </section>\n        </div>;\n}",...RefreshToolbar.parameters?.docs?.source}}};const __namedExportsOrder=["RefreshToolbar"]},"./src/components/Loading/Loading.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Loading_Loading});var emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");const spinAnimation=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js").F4`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`,StyledLoadingContainer=emotion_styled_browser_esm.Z.div((({theme,animated,labelPosition,svg,spinDirection})=>({display:"flex",flexDirection:"BOTTOM"===labelPosition?"column":"row",alignItems:"center",svg:{...animated&&{animation:`${spinAnimation} 2s linear infinite`},..."LEFT"===spinDirection&&{animationDirection:"reverse"},marginLeft:5,marginRight:10,path:{...!svg&&{fill:theme?.colors?.pavement}}},div:{color:theme?.colors?.pavement,paddingTop:"BOTTOM"===labelPosition?8:0}})));var _g,emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts"),react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function SvgTriLogoMonochrome(props){return react.createElement("svg",_extends({width:175,height:154,viewBox:"0 0 175 154",xmlns:"http://www.w3.org/2000/svg"},props),_g||(_g=react.createElement("g",{fill:"#9393a2",fillRule:"evenodd"},react.createElement("path",{d:"M39.91 145.08s2.82 4.8 5.63 6.43 8.36 1.65 8.36 1.65h78.62S101 152.16 59.1 128C17.2 103.84.61 77 .61 77l39.3 68.08zM171.84 85.08s2.74-4.84 2.74-8.08-2.74-8.07-2.74-8.07L132.52.84S147.44 28.67 147.44 77s-14.92 76.16-14.92 76.16l39.32-68.08zM53.91.84s-5.56 0-8.37 1.66c-2.81 1.66-5.63 6.42-5.63 6.42L.61 77S17.25 50.16 59.1 26 132.52.84 132.52.84H53.91z"}))))}var _path;function woven_logo_extends(){return woven_logo_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},woven_logo_extends.apply(this,arguments)}function SvgWovenLogo(props){return react.createElement("svg",woven_logo_extends({xmlns:"http://www.w3.org/2000/svg",width:184,height:161.333,viewBox:"0 0 138 121"},props),_path||(_path=react.createElement("path",{d:"M34.1 3.7C30.2 7.7 19 28.2 19 31.4c0 1.5 1.1 3.7 2.5 5.1 4.8 4.9 6.7 4.2 41.8-16.1C81 10.2 95.7 1.6 95.9 1.4c.2-.2-13-.4-29.3-.4H36.8l-2.7 2.7zM89.3 10.3c-7.8 4.5-14.2 8.5-14.3 8.9 0 1.3 28.5 16.9 28.9 15.7 1-3.2 6-7.2 10.3-8.3l4.6-1.1-6.7-11.4c-3.6-6.3-7.1-11.6-7.6-11.7-.6-.2-7.4 3.4-15.2 7.9zM110.5 33.5l-2.5 2.4v39.3c.1 30.3.3 38.8 1.2 37.3C136 66.2 137 64.4 137 60.8c0-2.7-1.7-6.6-6.5-15-3.6-6.2-7.5-12.1-8.6-13.1-3.1-2.5-8.5-2.2-11.4.8zM7.8 47.8c-5.2 9-6.5 11.9-5.5 12.8C3.6 61.8 29.8 77 30.6 77c.2 0 .4-7.4.4-16.5V44h-3c-3.9 0-8.2-2.2-10.8-5.5-1.1-1.4-2.1-2.5-2.3-2.5-.2 0-3.4 5.3-7.1 11.8zM5.6 70c1.1 1.9 7.8 13.5 14.9 25.8 9.4 16.3 13.6 22.7 15.6 23.8 2.1 1 6.6 1.4 17.4 1.4 14.2 0 14.7-.1 17-2.5 3.3-3.2 3.4-9.3.3-12.2-1.3-1.2-15.3-9.6-31.3-18.8C23.5 78.3 8.9 69.8 7 68.7l-3.5-2.1L5.6 70zM88.3 94.2l-14.1 8.1 1.9 3.6c2.3 4.3 2.4 7 .5 11.6l-1.5 3.5H103v-17.5c0-9.6-.1-17.5-.3-17.5-.1 0-6.6 3.7-14.4 8.2z"})))}const iconOptions_primary={"aria-details":"woven-loading-spinner"},iconOptions_secondary={"aria-details":"tri-loading-spinner"};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Loading=({animated=!0,spinDirection="RIGHT",label,labelPosition="BOTTOM",height=24,width=24,svg,iconVariant="primary",className,...logoProps})=>{const Svg=svg||("secondary"===iconVariant?SvgTriLogoMonochrome:SvgWovenLogo);const ariaDetails="secondary"===iconVariant?iconOptions_secondary["aria-details"]:iconOptions_primary["aria-details"];return(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:(0,jsx_runtime.jsxs)(StyledLoadingContainer,{className,animated,spinDirection,labelPosition,children:[(0,jsx_runtime.jsx)(Svg,{height,"aria-label":"loading","aria-details":svg?void 0:ariaDetails,width,...logoProps}),label&&(0,jsx_runtime.jsx)("div",{children:label})]})})};Loading.displayName="Loading";const Loading_Loading=Loading;try{Loading.displayName="Loading",Loading.__docgenInfo={description:"",displayName:"Loading",props:{animated:{defaultValue:{value:"true"},description:"Determines if the component should rotate.",name:"animated",required:!1,type:{name:"boolean"}},spinDirection:{defaultValue:{value:"RIGHT"},description:"The direction of the default animation.",name:"spinDirection",required:!1,type:{name:"enum",value:[{value:'"LEFT"'},{value:'"RIGHT"'}]}},labelPosition:{defaultValue:{value:"BOTTOM"},description:"Label position in relation to the SVG.",name:"labelPosition",required:!1,type:{name:"enum",value:[{value:'"RIGHT"'},{value:'"BOTTOM"'}]}},label:{defaultValue:null,description:"The text or element that shows next to the svg.",name:"label",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},height:{defaultValue:{value:"24"},description:"The height of the loading image.",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"24"},description:"The width of the loading image.",name:"width",required:!1,type:{name:"number"}},svg:{defaultValue:null,description:"The SVG image to be shown when loading.",name:"svg",required:!1,type:{name:"ElementType<any>"}},iconVariant:{defaultValue:{value:"primary"},description:"The icon variant to display if svg isn't provided.",name:"iconVariant",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"Additional styles.",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Loading/Loading.tsx#Loading"]={docgenInfo:Loading.__docgenInfo,name:"Loading",path:"src/components/Loading/Loading.tsx#Loading"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/RefreshToolbar/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>components_RefreshToolbar});var emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),Loading=__webpack_require__("./src/components/Loading/Loading.tsx");const ToolbarContainer=emotion_styled_browser_esm.Z.div((({standalone,theme})=>({alignItems:"center",backgroundColor:theme?.colors?.white,boxSizing:"border-box",display:"flex",height:"50px",zIndex:1,padding:"0 16px",...standalone&&{borderBottom:"1px solid",borderColor:theme?.colors?.mercury}}))),LogoLoadingSpinner=(0,emotion_styled_browser_esm.Z)(Loading.Z)((({width,height,theme})=>({"svg path":{fill:"currentColor",width,height}}))),RefreshProgressContainer=emotion_styled_browser_esm.Z.div((({theme})=>({alignItems:"center",color:theme?.colors?.pavement,display:"inline-flex",fontSize:"13px",paddingTop:"3px","@keyframes spin":{"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}},img:{animation:"spin 2s linear infinite",height:"24px",width:"24px",marginLeft:"5px",marginRight:"10px"},span:{paddingTop:"4px"}}))),ToolbarAdditionalContent=emotion_styled_browser_esm.Z.div((({theme})=>({display:"inline-grid",gridTemplateColumns:"1fr minmax(225px, max-content)",width:"100%",zIndex:"inherit"}))),ButtonContainer=emotion_styled_browser_esm.Z.div((({theme})=>({display:"flex",alignItems:"center",button:{border:0,borderRadius:"50%",height:"40px",width:"40px",minWidth:"40px",padding:0,margin:"0 8px",svg:{color:theme?.colors?.dolphin},"&:hover":{backgroundColor:theme?.colors?.selago,"svg path":{color:theme?.colors?.storm}},"&:disabled":{svg:{fill:theme?.colors?.mercury}}}}))),RightSideContainer=emotion_styled_browser_esm.Z.div((({theme})=>({alignItems:"center",color:theme?.colors?.pavement,display:"inline-flex",fontSize:"13px",paddingTop:"3px",justifyContent:"flex-end"})));var _path,_path2,react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function SvgRefreshIcon(props){return react.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",height:24,viewBox:"0 0 24 24",width:24},props),_path||(_path=react.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"})),_path2||(_path2=react.createElement("path",{d:"M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"})))}var Button=__webpack_require__("./src/components/Button/Button.tsx"),emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const RefreshToolbar=props=>{const{handleRefresh,className,children,standalone=!0,lastUpdated="",isRefreshing=!1,refreshProgressLabel="Updating...",rightComp,rightSideText,refreshButton}=props;return(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:(0,jsx_runtime.jsxs)(ToolbarContainer,{className,standalone,children:[(0,jsx_runtime.jsxs)("div",{children:[isRefreshing&&(0,jsx_runtime.jsx)(RefreshProgressContainer,{children:(0,jsx_runtime.jsx)(LogoLoadingSpinner,{animated:!0,height:24,label:refreshProgressLabel,labelPosition:"RIGHT",width:24})}),!isRefreshing&&(refreshButton||(0,jsx_runtime.jsx)(Button.Z,{icon:(0,jsx_runtime.jsx)(SvgRefreshIcon,{}),onClick:handleRefresh}))]}),(0,jsx_runtime.jsxs)(ToolbarAdditionalContent,{children:[(0,jsx_runtime.jsx)(ButtonContainer,{children:!isRefreshing&&children}),(0,jsx_runtime.jsxs)(RightSideContainer,{children:[rightComp,lastUpdated&&rightSideText]})]})]})})};RefreshToolbar.displayName="RefreshToolbar";const RefreshToolbar_RefreshToolbar=RefreshToolbar;try{RefreshToolbar.displayName="RefreshToolbar",RefreshToolbar.__docgenInfo={description:"Refresh toolbar component that can be used as an additional header row.\n\nSet [standalone] to false if you want to apply your own container styling (with className\nprop or a wrapper). Set [standalone] to true to add full-width behavior with margins and\na bottom border (to function as a standalone header). Defaults to true.",displayName:"RefreshToolbar",props:{handleRefresh:{defaultValue:null,description:"This is called when the refresh button is clicked.",name:"handleRefresh",required:!0,type:{name:"() => void"}},className:{defaultValue:null,description:"This is to set the Refresh toolbar class.",name:"className",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"The additional content to display if desired.",name:"children",required:!1,type:{name:"ReactNode"}},standalone:{defaultValue:null,description:"This is to set to false if you want to apply your own container styling (with className prop or a wrapper)",name:"standalone",required:!1,type:{name:"boolean"}},isRefreshing:{defaultValue:null,description:"Set this to true if you want to display the loading image.",name:"isRefreshing",required:!1,type:{name:"boolean"}},lastUpdated:{defaultValue:null,description:"This is to set the last updated text.",name:"lastUpdated",required:!1,type:{name:"string | null"}},refreshProgressLabel:{defaultValue:null,description:"This is to display the loading image label.",name:"refreshProgressLabel",required:!1,type:{name:"string"}},rightComp:{defaultValue:null,description:"This is to render right side components.",name:"rightComp",required:!1,type:{name:"ReactNode"}},rightSideText:{defaultValue:null,description:"This is to set right side text.",name:"rightSideText",required:!1,type:{name:"string"}},refreshButton:{defaultValue:null,description:"This is to render a custom refresh button.",name:"refreshButton",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/RefreshToolbar/RefreshToolbar.tsx#RefreshToolbar"]={docgenInfo:RefreshToolbar.__docgenInfo,name:"RefreshToolbar",path:"src/components/RefreshToolbar/RefreshToolbar.tsx#RefreshToolbar"})}catch(__react_docgen_typescript_loader_error){}const components_RefreshToolbar=RefreshToolbar_RefreshToolbar},"./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":(module,__unused_webpack_exports,__webpack_require__)=>{var reactIs=__webpack_require__("./node_modules/react-is/index.js"),REACT_STATICS={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},KNOWN_STATICS={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},MEMO_STATICS={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},TYPE_STATICS={};function getStatics(component){return reactIs.isMemo(component)?MEMO_STATICS:TYPE_STATICS[component.$$typeof]||REACT_STATICS}TYPE_STATICS[reactIs.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},TYPE_STATICS[reactIs.Memo]=MEMO_STATICS;var defineProperty=Object.defineProperty,getOwnPropertyNames=Object.getOwnPropertyNames,getOwnPropertySymbols=Object.getOwnPropertySymbols,getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,getPrototypeOf=Object.getPrototypeOf,objectPrototype=Object.prototype;module.exports=function hoistNonReactStatics(targetComponent,sourceComponent,blacklist){if("string"!=typeof sourceComponent){if(objectPrototype){var inheritedComponent=getPrototypeOf(sourceComponent);inheritedComponent&&inheritedComponent!==objectPrototype&&hoistNonReactStatics(targetComponent,inheritedComponent,blacklist)}var keys=getOwnPropertyNames(sourceComponent);getOwnPropertySymbols&&(keys=keys.concat(getOwnPropertySymbols(sourceComponent)));for(var targetStatics=getStatics(targetComponent),sourceStatics=getStatics(sourceComponent),i=0;i<keys.length;++i){var key=keys[i];if(!(KNOWN_STATICS[key]||blacklist&&blacklist[key]||sourceStatics&&sourceStatics[key]||targetStatics&&targetStatics[key])){var descriptor=getOwnPropertyDescriptor(sourceComponent,key);try{defineProperty(targetComponent,key,descriptor)}catch(e){}}}}return targetComponent}},"./node_modules/react-is/cjs/react-is.production.min.js":(__unused_webpack_module,exports)=>{var b="function"==typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;function z(a){if("object"==typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l,exports.ConcurrentMode=m,exports.ContextConsumer=k,exports.ContextProvider=h,exports.Element=c,exports.ForwardRef=n,exports.Fragment=e,exports.Lazy=t,exports.Memo=r,exports.Portal=d,exports.Profiler=g,exports.StrictMode=f,exports.Suspense=p,exports.isAsyncMode=function(a){return A(a)||z(a)===l},exports.isConcurrentMode=A,exports.isContextConsumer=function(a){return z(a)===k},exports.isContextProvider=function(a){return z(a)===h},exports.isElement=function(a){return"object"==typeof a&&null!==a&&a.$$typeof===c},exports.isForwardRef=function(a){return z(a)===n},exports.isFragment=function(a){return z(a)===e},exports.isLazy=function(a){return z(a)===t},exports.isMemo=function(a){return z(a)===r},exports.isPortal=function(a){return z(a)===d},exports.isProfiler=function(a){return z(a)===g},exports.isStrictMode=function(a){return z(a)===f},exports.isSuspense=function(a){return z(a)===p},exports.isValidElementType=function(a){return"string"==typeof a||"function"==typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"==typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)},exports.typeOf=z},"./node_modules/react-is/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react-is/cjs/react-is.production.min.js")}}]);
//# sourceMappingURL=stories-RefreshToolbar-RefreshToolbar-stories.0636b7a3.iframe.bundle.js.map