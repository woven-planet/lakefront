"use strict";(self.webpackChunk_toyota_research_institute_lakefront=self.webpackChunk_toyota_research_institute_lakefront||[]).push([[2935],{"./.storybook/DocBlock.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");const DocBlock=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Dx,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.QE,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.dk,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.fQ,{includePrimary:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed,{})]}),__WEBPACK_DEFAULT_EXPORT__=DocBlock;try{DocBlock.displayName="DocBlock",DocBlock.__docgenInfo={description:"",displayName:"DocBlock",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/DocBlock.tsx#DocBlock"]={docgenInfo:DocBlock.__docgenInfo,name:"DocBlock",path:".storybook/DocBlock.tsx#DocBlock"})}catch(__react_docgen_typescript_loader_error){}},"./src/stories/TextArea/TextArea.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Disabled:()=>Disabled,DisabledWithText:()=>DisabledWithText,Filled:()=>Filled,FilledAndHasError:()=>FilledAndHasError,FilledLabeledAndHasError:()=>FilledLabeledAndHasError,Placeholder:()=>Placeholder,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var src_components_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/TextArea/TextArea.tsx"),_storybook_DocBlock__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/DocBlock.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Lakefront/TextArea",component:src_components_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_0__.Z,argTypes:{onChange:{action:"changed",table:{disable:!0}},children:{table:{disable:!0}},disabled:{control:"boolean",table:{defaultValue:{summary:!1},type:{summary:"boolean"}},description:"HTML textarea element disabled prop."}},parameters:{docs:{page:_storybook_DocBlock__WEBPACK_IMPORTED_MODULE_1__.Z}}},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(src_components_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_0__.Z,{...args});Template.displayName="Template";const Placeholder=Template.bind({});Placeholder.args={placeholder:"Placeholder"};const Filled=Template.bind({});Filled.args={value:"Filled TextArea"};const FilledLabeledAndHasError=Template.bind({});FilledLabeledAndHasError.args={value:"Invalid TextArea",error:"Please try again.",label:"My textarea"};const FilledAndHasError=Template.bind({});FilledAndHasError.args={value:"Invalid TextArea",error:"Please try again."};const Disabled=Template.bind({});Disabled.args={value:"",label:"My textarea",disabled:!0};const DisabledWithText=Template.bind({});DisabledWithText.args={value:"Disabled TextArea",label:"My textarea",disabled:!0},Placeholder.parameters={...Placeholder.parameters,docs:{...Placeholder.parameters?.docs,source:{originalSource:"args => <TextArea {...args} />",...Placeholder.parameters?.docs?.source}}},Filled.parameters={...Filled.parameters,docs:{...Filled.parameters?.docs,source:{originalSource:"args => <TextArea {...args} />",...Filled.parameters?.docs?.source}}},FilledLabeledAndHasError.parameters={...FilledLabeledAndHasError.parameters,docs:{...FilledLabeledAndHasError.parameters?.docs,source:{originalSource:"args => <TextArea {...args} />",...FilledLabeledAndHasError.parameters?.docs?.source}}},FilledAndHasError.parameters={...FilledAndHasError.parameters,docs:{...FilledAndHasError.parameters?.docs,source:{originalSource:"args => <TextArea {...args} />",...FilledAndHasError.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"args => <TextArea {...args} />",...Disabled.parameters?.docs?.source}}},DisabledWithText.parameters={...DisabledWithText.parameters,docs:{...DisabledWithText.parameters?.docs,source:{originalSource:"args => <TextArea {...args} />",...DisabledWithText.parameters?.docs?.source}}};const __namedExportsOrder=["Placeholder","Filled","FilledLabeledAndHasError","FilledAndHasError","Disabled","DisabledWithText"]},"./src/components/TextArea/TextArea.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TextArea_TextArea});var react=__webpack_require__("./node_modules/react/index.js"),emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");const StyledLabel=emotion_styled_browser_esm.Z.label((({error,theme})=>({color:theme?.colors?.cinder,display:"flex",flexDirection:"column",fontSize:12,fontWeight:600,span:{marginBottom:4},div:{marginTop:4,minHeight:14},...error&&{color:theme?.colors?.red}}))),StyledTextArea=emotion_styled_browser_esm.Z.textarea((({error,theme,disabled})=>({border:`1px solid ${theme?.colors?.mercury}`,borderRadius:4,boxSizing:"border-box",color:theme?.colors?.cinder,fontSize:16,outline:"none",padding:12,height:200,width:300,":focus":{border:`1px solid ${theme?.colors?.cinder}`},"::placeholder":{color:theme?.colors?.mercury},cursor:disabled?"not-allowed":void 0,...error&&{border:`1px solid ${theme?.colors?.red}`,":focus":{border:`1px solid ${theme?.colors?.red}`}}})));var theme=__webpack_require__("./src/styles/theme.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TextArea=(0,react.forwardRef)((({label,error="",labelClassName,...props},ref)=>(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:(0,jsx_runtime.jsxs)(StyledLabel,{error,className:labelClassName,children:[label&&(0,jsx_runtime.jsx)("span",{children:label}),(0,jsx_runtime.jsx)(StyledTextArea,{ref,error,...props}),(0,jsx_runtime.jsx)("div",{children:error})]})}))),TextArea_TextArea=TextArea;try{TextArea.displayName="TextArea",TextArea.__docgenInfo={description:"TextArea Component\n\nThe TextArea component takes in native textarea props as well as its own TextAreaProps. The state is not managed\nin this component and should be handled in the consuming app.",displayName:"TextArea",props:{label:{defaultValue:null,description:"This shows a label above the TextArea when provided.",name:"label",required:!1,type:{name:"string"}},error:{defaultValue:{value:""},description:"If not empty, the TextArea component will be displayed in an error state with the provided error message.",name:"error",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"The classes to pass to the text area.",name:"className",required:!1,type:{name:"string"}},labelClassName:{defaultValue:null,description:"The classes to pass to the text area label.",name:"labelClassName",required:!1,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLTextAreaElement | null) => void) | RefObject<HTMLTextAreaElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/TextArea/TextArea.tsx#TextArea"]={docgenInfo:TextArea.__docgenInfo,name:"TextArea",path:"src/components/TextArea/TextArea.tsx#TextArea"})}catch(__react_docgen_typescript_loader_error){}}}]);