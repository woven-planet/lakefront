"use strict";(self.webpackChunk_toyota_research_institute_lakefront=self.webpackChunk_toyota_research_institute_lakefront||[]).push([[2477],{"./.storybook/DocBlock.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");const DocBlock=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Dx,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.QE,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.dk,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.fQ,{includePrimary:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed,{})]}),__WEBPACK_DEFAULT_EXPORT__=DocBlock;try{DocBlock.displayName="DocBlock",DocBlock.__docgenInfo={description:"",displayName:"DocBlock",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/DocBlock.tsx#DocBlock"]={docgenInfo:DocBlock.__docgenInfo,name:"DocBlock",path:".storybook/DocBlock.tsx#DocBlock"})}catch(__react_docgen_typescript_loader_error){}},"./src/stories/Select/Select.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MultiSelect:()=>MultiSelect,Select:()=>Select,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),src_components_Select__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Select/index.ts"),_storybook_DocBlock__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/DocBlock.tsx"),src_styles_lakefrontColors__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/styles/lakefrontColors.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Lakefront/Select",component:src_components_Select__WEBPACK_IMPORTED_MODULE_1__.ZP,parameters:{docs:{page:_storybook_DocBlock__WEBPACK_IMPORTED_MODULE_2__.Z}}},Template=args=>{const[value,setValue]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(args.value),areValuesSelected=()=>args.isMulti?null!=value&&value.length>0:void 0!==value;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{style:{minHeight:20,backgroundColor:areValuesSelected()&&src_styles_lakefrontColors__WEBPACK_IMPORTED_MODULE_3__.Bz,padding:8,margin:"8px 0",textAlign:"center",width:"100%"},children:[areValuesSelected()&&!args.isMulti&&`The selected value is ${value}`,areValuesSelected()&&value.length>0&&args.isMulti&&`The selected values are: ${value.map((v=>` ${v}`))}`]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("section",{style:{display:"inline-flex",height:"150px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(src_components_Select__WEBPACK_IMPORTED_MODULE_1__.ZP,{options:args.options,value,onChange:event=>{setValue(event.target.value)},id:args.id,isSearchable:args.isSearchable,disabled:args.disabled,className:args.className,autoFocus:args.autoFocus,isMulti:args.isMulti})})]})},Select=Template.bind({});Select.args={options:[{label:"Km",value:"metric"},{label:"Mi",value:"imperial"}],value:"imperial",isMulti:!1};const MultiSelect=Template.bind({});MultiSelect.args={options:[{label:"Km",value:"metric"},{label:"Mi",value:"imperial"},{label:"Made up system",value:"made up"}],value:"",isMulti:!0},Select.parameters={...Select.parameters,docs:{...Select.parameters?.docs,source:{originalSource:"args => {\n  const [value, setValue] = useState(args.value);\n  const handleOnChange = event => {\n    setValue(event.target.value);\n  };\n  const areValuesSelected = () => {\n    if (!args.isMulti) {\n      return value !== undefined;\n    } else {\n      return value != undefined && value.length > 0;\n    }\n  };\n  return <>\n            <div style={{\n      minHeight: 20,\n      backgroundColor: areValuesSelected() && emerald,\n      padding: 8,\n      margin: '8px 0',\n      textAlign: 'center',\n      width: '100%'\n    }}>\n                {areValuesSelected() && !args.isMulti && `The selected value is ${value}`}\n                {areValuesSelected() && value.length > 0 && args.isMulti && `The selected values are: ${value.map(v => ` ${v}`)}`}\n            </div>\n            <section style={{\n      display: 'inline-flex',\n      height: '150px'\n    }}>\n                <SelectComponent options={args.options} value={value} onChange={handleOnChange} id={args.id} isSearchable={args.isSearchable} disabled={args.disabled} className={args.className} autoFocus={args.autoFocus} isMulti={args.isMulti} />\n            </section>\n        </>;\n}",...Select.parameters?.docs?.source}}},MultiSelect.parameters={...MultiSelect.parameters,docs:{...MultiSelect.parameters?.docs,source:{originalSource:"args => {\n  const [value, setValue] = useState(args.value);\n  const handleOnChange = event => {\n    setValue(event.target.value);\n  };\n  const areValuesSelected = () => {\n    if (!args.isMulti) {\n      return value !== undefined;\n    } else {\n      return value != undefined && value.length > 0;\n    }\n  };\n  return <>\n            <div style={{\n      minHeight: 20,\n      backgroundColor: areValuesSelected() && emerald,\n      padding: 8,\n      margin: '8px 0',\n      textAlign: 'center',\n      width: '100%'\n    }}>\n                {areValuesSelected() && !args.isMulti && `The selected value is ${value}`}\n                {areValuesSelected() && value.length > 0 && args.isMulti && `The selected values are: ${value.map(v => ` ${v}`)}`}\n            </div>\n            <section style={{\n      display: 'inline-flex',\n      height: '150px'\n    }}>\n                <SelectComponent options={args.options} value={value} onChange={handleOnChange} id={args.id} isSearchable={args.isSearchable} disabled={args.disabled} className={args.className} autoFocus={args.autoFocus} isMulti={args.isMulti} />\n            </section>\n        </>;\n}",...MultiSelect.parameters?.docs?.source}}};const __namedExportsOrder=["Select","MultiSelect"]},"./src/components/Select/Select.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Select_Select});var selectStyles=__webpack_require__("./src/components/Select/selectStyles.ts"),react=__webpack_require__("./node_modules/react/index.js"),react_select_esm=__webpack_require__("./node_modules/react-select/dist/react-select.esm.js"),theme=__webpack_require__("./src/styles/theme.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const SelectOverlay=({isSearchable=!1,disabled,id,options,onChange,value,isMulti,...rest})=>{const[multiValues,setMultiValues]=(0,react.useState)([]),{currentValue,defaultValue,selectId}=(0,react.useMemo)((()=>({currentValue:isMulti?multiValues:options.find((option=>option.value===value)),defaultValue:options[0],selectId:id?`select-overlay-${id}`:void 0})),[options,value,multiValues]);return(0,jsx_runtime.jsx)(react_select_esm.ZP,{isDisabled:disabled,id:selectId,defaultValue,value:currentValue,options,onChange:option=>{if(isMulti){const eventTargetValues=option.map((o=>o.value));onChange({target:{value:eventTargetValues},currentTarget:{value:eventTargetValues}}),setMultiValues(option)}else{const newValue=option?.value;onChange({target:{value:newValue},currentTarget:{value:newValue}})}},styles:selectStyles.x_,theme:defaultTheme=>({...defaultTheme,colors:{...defaultTheme.colors,...theme.Z.colors,primary:theme.Z.colors.white,primary25:disabled?theme.Z.colors.white:theme.Z.colors.mercury}}),isSearchable,isMulti,...rest})};SelectOverlay.displayName="SelectOverlay";const Select_SelectOverlay=SelectOverlay;try{SelectOverlay.displayName="SelectOverlay",SelectOverlay.__docgenInfo={description:"",displayName:"SelectOverlay",props:{options:{defaultValue:null,description:"This is to set the options of the dropdown.",name:"options",required:!0,type:{name:"SelectOption[]"}},onChange:{defaultValue:null,description:"This is called when an dropdown change event.",name:"onChange",required:!0,type:{name:"(event: any) => void"}},onBlur:{defaultValue:null,description:"This is called on dropdown blur event.",name:"onBlur",required:!1,type:{name:"((event: any) => void)"}},autoFocus:{defaultValue:null,description:"This is to set the autofocus of the dropdown.",name:"autoFocus",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"This is to set the dropdown class.",name:"className",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"This is to set the id of the dropdown.",name:"id",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"This is to enable/disable the dropdown by default.",name:"disabled",required:!1,type:{name:"boolean"}},isSearchable:{defaultValue:{value:"false"},description:"This is to set the searchable property of the dropdown.\nIf set to true, the user can type the value to search from the available options.",name:"isSearchable",required:!1,type:{name:"boolean"}},isMulti:{defaultValue:null,description:"This is to specify if multiple options can be selected.",name:"isMulti",required:!1,type:{name:"boolean"}},closeMenuOnSelect:{defaultValue:null,description:"This is to leave the select menu open upon selection.",name:"closeMenuOnSelect",required:!1,type:{name:"boolean"}},styles:{defaultValue:null,description:"This is to overwrite defaulted styles",name:"styles",required:!1,type:{name:"Partial<GetStyles<SelectOption, true, GroupBase<SelectOption>>>"}},placeholder:{defaultValue:null,description:"This is the default text before an option is selected.",name:"placeholder",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string | number | any[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Select/SelectOverlay.tsx#SelectOverlay"]={docgenInfo:SelectOverlay.__docgenInfo,name:"SelectOverlay",path:"src/components/Select/SelectOverlay.tsx#SelectOverlay"})}catch(__react_docgen_typescript_loader_error){}const Select=({options,className,isMulti,...rest})=>(0,jsx_runtime.jsxs)(selectStyles.WK,{children:[(0,jsx_runtime.jsx)(selectStyles.VE,{className,multiple:isMulti,...rest,children:options.map((option=>(0,jsx_runtime.jsx)("option",{value:option.value,children:option.label},`${option.label}${option.value??""}`)))}),(0,jsx_runtime.jsx)(Select_SelectOverlay,{...rest,options,isMulti})]});Select.displayName="Select";const Select_Select=Select;try{Select.displayName="Select",Select.__docgenInfo={description:"The select component is used to render a dropdown with options. The user can set a selected option by default.\nThe isSearchable property allows user to find the value from the options available.",displayName:"Select",props:{options:{defaultValue:null,description:"This is to set the options of the dropdown.",name:"options",required:!0,type:{name:"SelectOption[]"}},onChange:{defaultValue:null,description:"This is called when an dropdown change event.",name:"onChange",required:!0,type:{name:"(event: any) => void"}},onBlur:{defaultValue:null,description:"This is called on dropdown blur event.",name:"onBlur",required:!1,type:{name:"((event: any) => void)"}},autoFocus:{defaultValue:null,description:"This is to set the autofocus of the dropdown.",name:"autoFocus",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"This is to set the dropdown class.",name:"className",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"This is to set the id of the dropdown.",name:"id",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"This is to enable/disable the dropdown by default.",name:"disabled",required:!1,type:{name:"boolean"}},isSearchable:{defaultValue:null,description:"This is to set the searchable property of the dropdown.\nIf set to true, the user can type the value to search from the available options.",name:"isSearchable",required:!1,type:{name:"boolean"}},isMulti:{defaultValue:null,description:"This is to specify if multiple options can be selected.",name:"isMulti",required:!1,type:{name:"boolean"}},closeMenuOnSelect:{defaultValue:null,description:"This is to leave the select menu open upon selection.",name:"closeMenuOnSelect",required:!1,type:{name:"boolean"}},styles:{defaultValue:null,description:"This is to overwrite defaulted styles",name:"styles",required:!1,type:{name:"Partial<GetStyles<SelectOption, true, GroupBase<SelectOption>>>"}},placeholder:{defaultValue:null,description:"This is the default text before an option is selected.",name:"placeholder",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string | number | any[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Select/Select.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/components/Select/Select.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Select/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var _Select__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/Select/Select.tsx");__webpack_require__("./src/components/Select/selectStyles.ts");const __WEBPACK_DEFAULT_EXPORT__=_Select__WEBPACK_IMPORTED_MODULE_0__.Z},"./src/components/Select/selectStyles.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{x_:()=>SELECT_OVERLAY_STYLES,VE:()=>SelectStyledComponent,WK:()=>SelectStyles});var _path,_path2,emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),stylesUtil=__webpack_require__("./src/styles/stylesUtil.ts"),react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var theme=__webpack_require__("./src/styles/theme.ts");const SelectStyles=emotion_styled_browser_esm.Z.div({select:{display:"none"}}),SELECT_OVERLAY_STYLES={control:(defaultStyles,state)=>({...defaultStyles,flexWrap:void 0,display:"flex",color:state.theme.colors.storm,backgroundColor:state.selectProps.isDisabled?(0,stylesUtil._)(state.theme.colors.white,theme.Z?.DARKEN_MOST):state.theme.colors.white,cursor:state.selectProps.isDisabled?"not-allowed":"pointer",alignItems:"center",minWidth:160,height:36,padding:"0px 6px",borderRadius:4,border:`1px solid ${state.theme.colors.mercury}`,fontWeight:400,justifyContent:"space-between",boxShadow:"inset 0 1px 2px 0 rgb(0 0 0 / 20%), inset 0 0 0 1px rgb(0 0 0 / 20%)",...state.isFocused&&{border:`1px solid ${state.theme.colors.storm}`,outline:0},":hover":{backgroundColor:(0,stylesUtil._)(state.theme?.colors?.white,theme.Z?.DARKEN_LEAST),border:`1px solid ${state.theme.colors.storm}`,outline:0}}),valueContainer:defaultStyles=>({...defaultStyles,padding:"2px 4px"}),menu:(defaultStyles,state)=>({...defaultStyles,backgroundColor:state.theme.colors.white,border:`1px solid ${state.theme?.colors?.cinder}`,borderRadius:4,display:"flex",flexDirection:"column",marginTop:8,zIndex:9999}),menuList:defaultStyles=>({...defaultStyles,overflowY:"auto",overflowX:"hidden",maxHeight:void 0}),option:(defaultStyles,state)=>({...defaultStyles,alignItems:"center",color:state.selectProps.isDisabled?(0,stylesUtil._)(state.theme?.colors?.white,theme.Z?.DARKEN_MOST):state.theme?.colors?.storm,cursor:"pointer",display:"flex",fontSize:16,height:40,minWidth:160,padding:"0 12px",userSelect:"none",...state.isSelected&&{backgroundColor:state.theme?.colors?.white,":hover":{backgroundColor:state.selectProps.isDisabled?state.theme?.colors?.white:state.theme?.colors?.mercury,cursor:state.selectProps.isDisabled?"not-allowed":void 0}},...state.isFocused&&{backgroundColor:state.theme?.colors?.mercury}})},SelectStyledComponent=emotion_styled_browser_esm.Z.select({overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",WebkitAppearance:"none",borderRadius:"2px",boxShadow:"inset 0 1px 2px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.2)",border:"solid 1px #9393a2",backgroundColor:theme.Z?.colors?.white,color:"#000000",fontSize:"16px",minWidth:"200px",padding:"12px 32px 12px 12px",backgroundImage:`url(${function SvgBaselineExpandMore24Px(props){return react.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24"},props),_path||(_path=react.createElement("path",{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})),_path2||(_path2=react.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})))}})`,backgroundPosition:"97% center",backgroundRepeat:"no-repeat"})},"./src/styles/stylesUtil.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>lightenDarkenColor,o:()=>hexToRgb});const lightenDarkenColor=(hexColor="",percent)=>{let usePound=!1;const amt=(percent>=0?Math.min(percent,100):Math.max(percent,-100))/100*256;"#"===hexColor[0]&&(hexColor=hexColor.slice(1),usePound=!0);const parsedNum=parseInt(hexColor,16),num=isNaN(parsedNum)?0:parsedNum,r=Math.max(Math.min((num>>16)+amt,255),0),b=Math.max(Math.min((num>>8&255)+amt,255),0),value=(usePound?"#":"")+(Math.max(Math.min((255&num)+amt,255),0)|b<<8|r<<16).toString(16),outputLength=usePound?7:6;return value.length===outputLength?value:value.padEnd(outputLength,"0")},hexToRgb=(hex,opacity)=>{const result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),rgb=result?{r:parseInt(result[1],16),g:parseInt(result[2],16),b:parseInt(result[3],16)}:null;return rgb?`${opacity?"rgba(":"rgb("}${`${rgb?.r},${rgb?.g},${rgb?.b}`}${opacity?","+opacity:""})`:""}}}]);