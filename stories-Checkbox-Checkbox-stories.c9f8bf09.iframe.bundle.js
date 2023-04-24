"use strict";(self.webpackChunk_toyota_research_institute_lakefront=self.webpackChunk_toyota_research_institute_lakefront||[]).push([[8749],{"./.storybook/DocBlock.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");const DocBlock=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Dx,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.QE,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.dk,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.fQ,{includePrimary:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed,{})]}),__WEBPACK_DEFAULT_EXPORT__=DocBlock;try{DocBlock.displayName="DocBlock",DocBlock.__docgenInfo={description:"",displayName:"DocBlock",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/DocBlock.tsx#DocBlock"]={docgenInfo:DocBlock.__docgenInfo,name:"DocBlock",path:".storybook/DocBlock.tsx#DocBlock"})}catch(__react_docgen_typescript_loader_error){}},"./src/stories/Checkbox/Checkbox.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Checkbox:()=>Checkbox_stories_Checkbox,CheckboxWithLabel:()=>CheckboxWithLabel,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Checkbox_stories});var react=__webpack_require__("./node_modules/react/index.js"),Checkbox=__webpack_require__("./src/components/Checkbox/Checkbox.tsx"),DocBlock=__webpack_require__("./.storybook/DocBlock.tsx"),chunk_KKE3V3AL=__webpack_require__("./node_modules/@storybook/addon-actions/dist/chunk-KKE3V3AL.mjs"),jsx_runtime=(__webpack_require__("./node_modules/@storybook/addon-actions/dist/chunk-VWCVBQ22.mjs"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const Checkbox_stories={title:"Lakefront/Checkbox",component:Checkbox.Z,argTypes:{checked:{control:!1},checkedIcon:{table:{disable:!0}},onChange:{control:!1}},parameters:{docs:{page:DocBlock.Z,source:{transform:source=>source.replace("onChange={function noRefCheck() {}}","").replace(/\n/g,"").replace(/[ ]{2}/g," ")}}}},Template=args=>{const[isChecked,setIsChecked]=(0,react.useState)(!1);return(0,jsx_runtime.jsx)(Checkbox.Z,{checked:isChecked,onChange:event=>{setIsChecked((prevState=>!prevState)),(0,chunk_KKE3V3AL.aD)(`Checked changed to ${!isChecked}`)(event)},label:args.label,indeterminate:args.indeterminate,checkedIcon:args.checkedIcon,disabled:args.disabled})};Template.displayName="Template";const Checkbox_stories_Checkbox=Template.bind({}),CheckboxWithLabel=Template.bind({});CheckboxWithLabel.args={label:"Checkbox"},Checkbox_stories_Checkbox.parameters={...Checkbox_stories_Checkbox.parameters,docs:{...Checkbox_stories_Checkbox.parameters?.docs,source:{originalSource:"args => {\n  const [isChecked, setIsChecked] = useState(false);\n  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {\n    setIsChecked(prevState => !prevState);\n    action(`Checked changed to ${!isChecked}`)(event);\n  };\n  return <CheckboxComponent checked={isChecked} onChange={handleClick} label={args.label} indeterminate={args.indeterminate} checkedIcon={args.checkedIcon} disabled={args.disabled} />;\n}",...Checkbox_stories_Checkbox.parameters?.docs?.source}}},CheckboxWithLabel.parameters={...CheckboxWithLabel.parameters,docs:{...CheckboxWithLabel.parameters?.docs,source:{originalSource:"args => {\n  const [isChecked, setIsChecked] = useState(false);\n  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {\n    setIsChecked(prevState => !prevState);\n    action(`Checked changed to ${!isChecked}`)(event);\n  };\n  return <CheckboxComponent checked={isChecked} onChange={handleClick} label={args.label} indeterminate={args.indeterminate} checkedIcon={args.checkedIcon} disabled={args.disabled} />;\n}",...CheckboxWithLabel.parameters?.docs?.source}}};const __namedExportsOrder=["Checkbox","CheckboxWithLabel"]},"./src/components/Checkbox/Checkbox.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Checkbox_Checkbox});var emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");const StyledLabel=emotion_styled_browser_esm.Z.label((({theme,disabled,indeterminate})=>{const disabledSvgColor=indeterminate?theme?.colors?.white:theme?.colors?.mercury;return{color:disabled?theme?.colors?.mercury:theme?.colors?.cinder,display:"inline-grid",gridTemplateColumns:"32px auto",gridTemplateRows:"auto",fontSize:16,padding:0,alignItems:"center",span:{gridColumn:"2 / span 1",gridRow:"1 / span 1"},svg:{gridColumn:"1 / span 1",gridRow:"1 / span 1",color:disabled?disabledSvgColor:theme?.colors?.white,marginLeft:2},cursor:disabled?"not-allowed":"auto"}})),StyledCheckbox=emotion_styled_browser_esm.Z.input((({theme,checked,indeterminate,disabled,color})=>{const backgroundColor=indeterminate||checked?theme?.colors?.storm:theme?.colors?.white,disabledBackgroundColor=indeterminate?theme?.colors?.mercury:theme?.colors?.white;return{border:`2px solid ${color||(disabled?theme?.colors?.mercury:theme?.colors?.storm)}`,borderRadius:2,WebkitAppearance:"none",backgroundColor:color||(disabled?disabledBackgroundColor:backgroundColor),fontSize:16,outline:"none",height:20,width:20,gridColumn:"1 / span 1",gridRow:"1 / span 1",cursor:disabled?"not-allowed":"pointer"}}));var _path,react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function SvgCheck(props){return react.createElement("svg",_extends({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},props),_path||(_path=react.createElement("path",{d:"M10.586 13.414l-2.829-2.828L6.343 12l4.243 4.243 7.07-7.071-1.413-1.415-5.657 5.657z",fill:"currentColor"})))}var indeterminate_path;function indeterminate_extends(){return indeterminate_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},indeterminate_extends.apply(this,arguments)}function SvgIndeterminate(props){return react.createElement("svg",indeterminate_extends({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},props),indeterminate_path||(indeterminate_path=react.createElement("path",{d:"M4 12a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z",fill:"currentColor"})))}var theme=__webpack_require__("./src/styles/theme.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Checkbox=({checked=!1,checkedIcon,indeterminate=!1,label="",disabled=!1,onChange=()=>null,labelClassName,...props})=>{const showIcon=indeterminate||checked,icon=indeterminate?(0,jsx_runtime.jsx)(SvgIndeterminate,{}):checkedIcon||(0,jsx_runtime.jsx)(SvgCheck,{});return(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:(0,jsx_runtime.jsxs)(StyledLabel,{disabled,indeterminate,className:labelClassName,children:[(0,jsx_runtime.jsx)(StyledCheckbox,{...props,indeterminate,disabled,onChange:event=>{disabled||onChange(event)},checked,type:"checkbox"}),showIcon&&icon,label&&(0,jsx_runtime.jsx)("span",{children:label})]})})};Checkbox.displayName="Checkbox";const Checkbox_Checkbox=Checkbox;try{Checkbox.displayName="Checkbox",Checkbox.__docgenInfo={description:"Checkbox Component\n\nThe Checkbox component takes in native checkbox props as well as its own CheckboxProps.\nThe `checked` state is not managed in the component and should be received\nvia the `checked` prop from the consuming app.",displayName:"Checkbox",props:{checked:{defaultValue:{value:"false"},description:"The value to control whether the checkbox should be checked or not.",name:"checked",required:!1,type:{name:"boolean"}},checkedIcon:{defaultValue:null,description:"The svg icon to display when checked is true. If left undefined, a check mark will be displayed.",name:"checkedIcon",required:!1,type:{name:"ReactElement<SVGElement, string | JSXElementConstructor<any>>"}},indeterminate:{defaultValue:{value:"false"},description:"A display state in which it is unknown whether checked should be true or false.",name:"indeterminate",required:!1,type:{name:"boolean"}},label:{defaultValue:{value:""},description:"The (optional) label for the checkbox.",name:"label",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},disabled:{defaultValue:{value:"false"},description:"HTML input element disabled prop.",name:"disabled",required:!1,type:{name:"boolean"}},onChange:{defaultValue:{value:"() => null"},description:"The action that should be run when the checked state changes.",name:"onChange",required:!1,type:{name:"(((event: ChangeEvent<HTMLInputElement>) => void) & ChangeEventHandler<HTMLInputElement>)"}},className:{defaultValue:null,description:"The classes to pass to the checkbox.",name:"className",required:!1,type:{name:"string"}},labelClassName:{defaultValue:null,description:"The classes to pass to the checkbox label.",name:"labelClassName",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Checkbox/Checkbox.tsx#Checkbox"]={docgenInfo:Checkbox.__docgenInfo,name:"Checkbox",path:"src/components/Checkbox/Checkbox.tsx#Checkbox"})}catch(__react_docgen_typescript_loader_error){}}}]);