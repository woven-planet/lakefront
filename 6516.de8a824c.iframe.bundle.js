"use strict";(self.webpackChunk_toyota_research_institute_lakefront=self.webpackChunk_toyota_research_institute_lakefront||[]).push([[6516],{"./src/components/Card/Card.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Card_Card});var emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),Button=__webpack_require__("./src/components/Button/Button.tsx"),lakefrontColors=__webpack_require__("./src/styles/lakefrontColors.ts");const CardContentContainer=emotion_styled_browser_esm.Z.div((()=>({display:"inline-grid",gridTemplateColumns:"1fr auto",gridTemplateRows:"55px auto auto",width:250,height:"auto",border:`1px solid ${lakefrontColors.ZP.alto}`,borderRadius:3,padding:10}))),StyledH1Title=emotion_styled_browser_esm.Z.h1((()=>({fontSize:18,height:"min-content"}))),StyledDescription=emotion_styled_browser_esm.Z.p((()=>({gridArea:"2",marginTop:"unset",fontSize:14}))),StyledContentContainer=emotion_styled_browser_esm.Z.div((()=>({gridArea:"3/1"}))),StyledMoreDetailsButton=(0,emotion_styled_browser_esm.Z)(Button.Z)((()=>({gridArea:"1/2"})));var _path,react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function SvgMoreDetails(props){return react.createElement("svg",_extends({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},props),_path||(_path=react.createElement("path",{d:"M15.038 6.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z",fill:"currentColor"})))}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Card=({title,onClick,description,className,children,content=children,topRightComponent,disabled})=>(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:(0,jsx_runtime.jsxs)(CardContentContainer,{className,children:[(0,jsx_runtime.jsx)(StyledH1Title,{children:title}),(0,jsx_runtime.jsx)(StyledDescription,{children:description}),(0,jsx_runtime.jsx)(StyledContentContainer,{children:content||children}),topRightComponent||(0,jsx_runtime.jsx)(StyledMoreDetailsButton,{disabled,onClick:disabled?void 0:onClick,type:"button",icon:(0,jsx_runtime.jsx)(SvgMoreDetails,{})})]})});Card.displayName="Card";const Card_Card=Card;try{Card.displayName="Card",Card.__docgenInfo={description:"The Card Component is used to render a single Card, or a collection of Cards.",displayName:"Card",props:{title:{defaultValue:null,description:"This will set the cards h1 heading.",name:"title",required:!0,type:{name:"string"}},onClick:{defaultValue:null,description:"This is the callback that is fired when the top-right arrow button is clicked.",name:"onClick",required:!1,type:{name:"(() => void)"}},description:{defaultValue:null,description:"Description of the card's intent.",name:"description",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"Display content as a child node.",name:"children",required:!1,type:{name:"ReactNode"}},content:{defaultValue:null,description:"This takes in any ReactNode to be displayed in the main content area of the card.",name:"content",required:!1,type:{name:"ReactNode"}},disabled:{defaultValue:null,description:"If the button should or shouldn't be disabled.",name:"disabled",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"This is to set the class of the Card component.",name:"className",required:!1,type:{name:"string"}},topRightComponent:{defaultValue:null,description:"This takes in any ReactNode to be displayed in the top right content area of the card.",name:"topRightComponent",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Card/Card.tsx#Card"]={docgenInfo:Card.__docgenInfo,name:"Card",path:"src/components/Card/Card.tsx#Card"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Snackbar/Snackbar.util.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{oK:()=>MESSAGE_TYPES,a_:()=>createDefaultAction,zP:()=>generateAnchorOrigin,q7:()=>getIcon});var _path,lakefrontColors=__webpack_require__("./src/styles/lakefrontColors.ts"),react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function SvgCheckCircle(props){return react.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",height:24,width:24},props),_path||(_path=react.createElement("path",{d:"M10.6 16.6l7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4zM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22z"})))}var error_path;function error_extends(){return error_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},error_extends.apply(this,arguments)}function SvgError(props){return react.createElement("svg",error_extends({xmlns:"http://www.w3.org/2000/svg",height:24,width:24},props),error_path||(error_path=react.createElement("path",{d:"M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17zm-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22z"})))}var info_path;function info_extends(){return info_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},info_extends.apply(this,arguments)}function SvgInfo(props){return react.createElement("svg",info_extends({xmlns:"http://www.w3.org/2000/svg",height:24,width:24},props),info_path||(info_path=react.createElement("path",{d:"M11 17h2v-6h-2zm1-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9zm0 13q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22z"})))}var closeIcon_path,snackbarStyles=__webpack_require__("./src/components/Snackbar/snackbarStyles.ts");function closeIcon_extends(){return closeIcon_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},closeIcon_extends.apply(this,arguments)}function SvgCloseIcon(props){return react.createElement("svg",closeIcon_extends({xmlns:"http://www.w3.org/2000/svg",height:24,width:24},props),closeIcon_path||(closeIcon_path=react.createElement("path",{d:"M6.4 18.65L5.35 17.6l5.6-5.6-5.6-5.6L6.4 5.35l5.6 5.6 5.6-5.6 1.05 1.05-5.6 5.6 5.6 5.6-1.05 1.05-5.6-5.6z"})))}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");let MESSAGE_TYPES=function(MESSAGE_TYPES){return MESSAGE_TYPES.INFO="info",MESSAGE_TYPES.ERROR="error",MESSAGE_TYPES.SUCCESS="success",MESSAGE_TYPES}({});const createDefaultAction=onClose=>(0,jsx_runtime.jsx)(snackbarStyles.W3,{alternate:!0,className:"closeIcon","aria-label":"Close",onClick:()=>onClose?onClose("timeout"):void 0,icon:(0,jsx_runtime.jsx)(SvgCloseIcon,{})},"close");createDefaultAction.displayName="createDefaultAction";const generateAnchorOrigin=(anchorOrigin,portal)=>{"left"===anchorOrigin.horizontal&&(portal.style.left="24px"),"center"===anchorOrigin.horizontal&&(portal.style.left="40%"),"right"===anchorOrigin.horizontal&&(portal.style.right="24px"),"bottom"===anchorOrigin.vertical&&(portal.style.bottom="24px"),"top"===anchorOrigin.vertical&&(portal.style.top="24px")},getIcon=type=>{switch(type){case MESSAGE_TYPES.ERROR:return(0,jsx_runtime.jsx)(SvgError,{style:{fill:lakefrontColors.ZP.saturatedRed}});case MESSAGE_TYPES.SUCCESS:return(0,jsx_runtime.jsx)(SvgCheckCircle,{style:{fill:lakefrontColors.ZP.saturatedBlue}});case MESSAGE_TYPES.INFO:default:return(0,jsx_runtime.jsx)(SvgInfo,{style:{fill:lakefrontColors.ZP.white}})}};try{createDefaultAction.displayName="createDefaultAction",createDefaultAction.__docgenInfo={description:"",displayName:"createDefaultAction",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Snackbar/Snackbar.util.tsx#createDefaultAction"]={docgenInfo:createDefaultAction.__docgenInfo,name:"createDefaultAction",path:"src/components/Snackbar/Snackbar.util.tsx#createDefaultAction"})}catch(__react_docgen_typescript_loader_error){}try{getIcon.displayName="getIcon",getIcon.__docgenInfo={description:"",displayName:"getIcon",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Snackbar/Snackbar.util.tsx#getIcon"]={docgenInfo:getIcon.__docgenInfo,name:"getIcon",path:"src/components/Snackbar/Snackbar.util.tsx#getIcon"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Snackbar/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>components_Snackbar});var emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),react=__webpack_require__("./node_modules/react/index.js"),theme=__webpack_require__("./src/styles/theme.ts"),Snackbar_util=__webpack_require__("./src/components/Snackbar/Snackbar.util.tsx"),snackbarStyles=__webpack_require__("./src/components/Snackbar/snackbarStyles.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const SnackbarContent=(0,react.forwardRef)((({action,message,type,...props},ref)=>{const icon=(0,Snackbar_util.q7)(type);return(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:(0,jsx_runtime.jsx)("div",{...props,children:(0,jsx_runtime.jsxs)(snackbarStyles.bM,{className:"snackbarContent",ref,children:[(0,jsx_runtime.jsx)(snackbarStyles.tT,{className:"snackbarMessage",children:message}),(0,jsx_runtime.jsx)(snackbarStyles.SG,{className:"snackbarIcon",children:icon}),action]})})})})),Snackbar_SnackbarContent=SnackbarContent;try{SnackbarContent.displayName="SnackbarContent",SnackbarContent.__docgenInfo={description:"",displayName:"SnackbarContent",props:{action:{defaultValue:null,description:"The action to display. It renders after the message, at the end of the snackbar.",name:"action",required:!1,type:{name:"ReactNode"}},message:{defaultValue:null,description:"The message to display.",name:"message",required:!1,type:{name:"ReactNode"}},type:{defaultValue:null,description:"Message types used to determine icon color and icon to render.",name:"type",required:!0,type:{name:"enum",value:[{value:'"info"'},{value:'"error"'},{value:'"success"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Snackbar/SnackbarContent.tsx#SnackbarContent"]={docgenInfo:SnackbarContent.__docgenInfo,name:"SnackbarContent",path:"src/components/Snackbar/SnackbarContent.tsx#SnackbarContent"})}catch(__react_docgen_typescript_loader_error){}var usePopover=__webpack_require__("./src/lib/hooks/usePopover/index.ts");const Snackbar=({anchorOrigin={vertical:"bottom",horizontal:"left"},open,autoHideDuration=4e3,onClose,className,message,type=Snackbar_util.oK.INFO,portalId,renderInPortal=!1,action=(0,Snackbar_util.a_)((()=>onClose?onClose("timeout"):void 0))})=>{const[snackbarWrapperElement,setSnackbarWrapperElement]=(0,react.useState)(null),snackbarContentRef=(0,react.useRef)(null),{portal,update}=(0,usePopover.ZP)({popoverContainer:snackbarWrapperElement,portalId,renderInPortal});(0,react.useEffect)((()=>{toggleSnackbarOpen();let hideDuration=autoHideDuration;if(null===hideDuration)return;void 0===hideDuration&&(hideDuration=4e3);const timer=setTimeout((()=>{toggleSnackbarOpen((()=>{onClose&&onClose("timeout")}))}),hideDuration);return()=>{clearTimeout(timer)}}),[open,autoHideDuration]),(0,react.useEffect)((()=>{snackbarWrapperElement&&portal&&((0,Snackbar_util.zP)(anchorOrigin,portal),portal.style.padding="4px 16px",portal.className=snackbarWrapperElement.className)}),[update,portal]);const toggleSnackbarOpen=callback=>{if(snackbarContentRef.current){const newClass=snackbarContentRef.current.classList.contains("snackbarOpen")?"snackbarClosed":"snackbarOpen";"snackbarOpen"===newClass&&snackbarContentRef.current.classList.remove("snackbarClosed"),"snackbarClosed"===newClass&&snackbarContentRef.current.classList.remove("snackbarOpen"),snackbarContentRef.current.className=`${snackbarContentRef.current.className} ${newClass}`,callback&&setTimeout((()=>{callback()}),snackbarStyles.bZ)}};return(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:(0,jsx_runtime.jsx)(snackbarStyles.kP,{className,ref:node=>{setSnackbarWrapperElement(node)},anchorOrigin,children:(0,jsx_runtime.jsx)(usePopover.yk,{portal,deps:[open],children:open&&(0,jsx_runtime.jsx)("div",{className:"content-snackbar-wrapper",children:(0,jsx_runtime.jsx)(Snackbar_SnackbarContent,{id:"snackbar-content",ref:snackbarContentRef,action,message,type})})})})})};Snackbar.displayName="Snackbar";const Snackbar_Snackbar=Snackbar;try{Snackbar.displayName="Snackbar",Snackbar.__docgenInfo={description:"Snackbar Component\n\nThe Snackbar component is a UI informational overlay.\nThis can be used to display messages, as well as provide an action with an allocated type that has it's own corresponding icon and styling.\nThe state is not managed inside this component and visibility (via the `open` prop) needs to be maintained in the parent component.\nThe `renderInPortal` prop can be used to append a div to the body.",displayName:"Snackbar",props:{action:{defaultValue:{value:"createDefaultAction(() => onClose ? onClose('timeout') : undefined)"},description:"The action to display. It renders after the message, at the end of the snackbar.",name:"action",required:!1,type:{name:"ReactNode"}},anchorOrigin:{defaultValue:{value:"{ vertical: 'bottom', horizontal: 'left' }"},description:"The anchor of the `Snackbar`.",name:"anchorOrigin",required:!1,type:{name:"SnackbarOrigin"}},autoHideDuration:{defaultValue:{value:"4000"},description:"The number of milliseconds to wait before automatically calling the\n`onClose` function. `onClose` should then set the state of the `open`\nprop to hide the Snackbar. This behavior is disabled by default with\nthe `null` value. If left undefined will auto hide after 4000ms.",name:"autoHideDuration",required:!1,type:{name:"number | null"}},message:{defaultValue:null,description:"The message to display.",name:"message",required:!1,type:{name:"string"}},onClose:{defaultValue:null,description:'Callback fired when the component requests to be closed.\nTypically `onClose` is used to set state in the parent component,\nwhich is used to control the `Snackbar` `open` prop.\nThe `reason` parameter can optionally be used to control the response to `onClose`,\nfor example ignoring `clickaway`.\n@param reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`.',name:"onClose",required:!1,type:{name:'((reason: "timeout") => void)'}},open:{defaultValue:null,description:"If `true`, `Snackbar` is open.",name:"open",required:!1,type:{name:"boolean"}},type:{defaultValue:{value:"MESSAGE_TYPES.INFO"},description:"Message types used to determine icon color and icon to render.",name:"type",required:!1,type:{name:"enum",value:[{value:'"info"'},{value:'"error"'},{value:'"success"'}]}},portalId:{defaultValue:null,description:"This is the id to assign to the appended div when rendering in a portal.\nThis defaults to `lakefront-portal-container`.",name:"portalId",required:!1,type:{name:"string"}},renderInPortal:{defaultValue:{value:"false"},description:'When true, the component will mount a div to the body and render the popover through it.\nThis is useful when the popover would be inside a scrollable container or one with "overflow: hidden"\nso it doesn\'t get cut off. Uses IntersectionObserver and needs a polyfill if IE compatibility is needed.',name:"renderInPortal",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"The classes to pass to the snackbar.",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Snackbar/Snackbar.tsx#Snackbar"]={docgenInfo:Snackbar.__docgenInfo,name:"Snackbar",path:"src/components/Snackbar/Snackbar.tsx#Snackbar"})}catch(__react_docgen_typescript_loader_error){}const components_Snackbar=Snackbar_Snackbar},"./src/components/Snackbar/snackbarStyles.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{SG:()=>StyledMessageTypeIcons,W3:()=>StyledSnackbarCloseButton,Zq:()=>StyledSnackbarButton,bM:()=>StyledSnackbarContent,bZ:()=>TRANSITION_CLOSE_TIME,kP:()=>SnackbarWrapper,tT:()=>StyledSnackbarMessage});var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),src_styles_lakefrontColors__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/styles/lakefrontColors.ts"),src_components_Button_Button__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Button/Button.tsx"),src_styles_theme__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/styles/theme.ts"),_Snackbar_util__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/Snackbar/Snackbar.util.tsx");const TRANSITION_CLOSE_TIME=0,SnackbarWrapper=_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.Z.div((({anchorOrigin})=>{const portal={style:{left:"",bottom:"",right:"",top:""}};(0,_Snackbar_util__WEBPACK_IMPORTED_MODULE_4__.zP)(anchorOrigin,portal);const snackbarStyles={zIndex:src_styles_theme__WEBPACK_IMPORTED_MODULE_3__.Z.zIndex.snackbar,position:"fixed",left:portal.style.left||"auto",top:portal.style.top||"auto",right:portal.style.right||"auto",bottom:portal.style.bottom||"auto"};return{...snackbarStyles,".content-snackbar-wrapper":{...snackbarStyles,display:"flex",alignItems:"center",marginTop:4},".snackbarOpen":{opacity:1,transform:"scale(1.02, 1.0404)",transition:"opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"},".snackbarClosed":{opacity:0,transition:"opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 130ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",transform:"none"}}})),StyledSnackbarCloseButton=(0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.Z)(src_components_Button_Button__WEBPACK_IMPORTED_MODULE_2__.Z)({alignSelf:"center",transform:"scale(0.8)"}),StyledSnackbarButton=_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.Z.span((()=>({display:"inline-flex",backgroundColor:src_styles_lakefrontColors__WEBPACK_IMPORTED_MODULE_1__.ZP.black,color:src_styles_lakefrontColors__WEBPACK_IMPORTED_MODULE_1__.ZP.white,borderRadius:5,padding:5}))),StyledSnackbarContent=_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.Z.div((()=>({display:"flex",alignItems:"center",minWidth:80,borderRadius:4,backgroundColor:"rgb(44, 44, 53)",padding:"4px 16px",justifyContent:"space-between"}))),StyledSnackbarMessage=_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.Z.div((()=>({color:"rgb(255, 255, 255)",alignSelf:"center"}))),StyledMessageTypeIcons=_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.Z.span((Icon=>({display:"flex",marginLeft:10,position:"initial"})))}}]);