"use strict";(self.webpackChunk_toyota_research_institute_lakefront=self.webpackChunk_toyota_research_institute_lakefront||[]).push([[6834],{"./node_modules/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:()=>_extends})},"./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;__webpack_require__.d(__webpack_exports__,{L:()=>useInsertionEffectAlwaysWithSyncFallback,j:()=>useInsertionEffectWithLayoutFallback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),useInsertionEffect=!!(react__WEBPACK_IMPORTED_MODULE_0___namespace_cache||(react__WEBPACK_IMPORTED_MODULE_0___namespace_cache=__webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__,2))).useInsertionEffect&&(react__WEBPACK_IMPORTED_MODULE_0___namespace_cache||(react__WEBPACK_IMPORTED_MODULE_0___namespace_cache=__webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__,2))).useInsertionEffect,useInsertionEffectAlwaysWithSyncFallback=useInsertionEffect||function syncFallback(create){return create()},useInsertionEffectWithLayoutFallback=useInsertionEffect||react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect},"./src/stories/SpeedInput/SpeedInput.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SpeedInput:()=>SpeedInput,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),src_components_SpeedInput_SpeedInput__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/SpeedInput/SpeedInput.tsx"),src_styles_lakefrontColors__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styles/lakefrontColors.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Lakefront/SpeedInput",component:src_components_SpeedInput_SpeedInput__WEBPACK_IMPORTED_MODULE_1__.ZP,argTypes:{value:{control:"VehicleSpeed",table:{defaultValue:{summary:"VehicleSpeed"},type:{summary:null}}},unitConversionRequired:{control:"boolean",table:{defaultValue:{summary:!0},type:{summary:"boolean"}}},allowNegativeInput:{control:"boolean",table:{defaultValue:{summary:!0},type:{summary:"boolean"}}},defaultUnits:{control:src_components_SpeedInput_SpeedInput__WEBPACK_IMPORTED_MODULE_1__.J_,table:{defaultValue:{summary:"Mph"},type:{summary:"string"}}},disabled:{control:"boolean",table:{defaultValue:{summary:!1},type:{summary:"boolean"}}}}},SpeedInput=(args=>{const[speedRange,setSpeedrange]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[showBanner,setShowBanner]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);let vehicleValue={min:speedRange?.min,max:speedRange?.max,unit:null,mode:src_components_SpeedInput_SpeedInput__WEBPACK_IMPORTED_MODULE_1__.AR.minmax};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[showBanner&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{style:{minHeight:20,backgroundColor:src_styles_lakefrontColors__WEBPACK_IMPORTED_MODULE_2__.Bz,padding:8,margin:"8px 0",textAlign:"center",width:"100%"},children:["The SpeedRange value is min = ",speedRange?.min||""," ",speedRange?.unit||""," and max = ",speedRange?.max||""," ",speedRange?.unit||"","."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(src_components_SpeedInput_SpeedInput__WEBPACK_IMPORTED_MODULE_1__.ZP,{...args,onChange:speedRange=>{setShowBanner(!0),setSpeedrange(speedRange),setTimeout((()=>{setShowBanner(!1)}),1e4)},value:vehicleValue})]})}).bind({});SpeedInput.args={unitConversionRequired:!0,allowNegativeInput:!0,defaultUnits:src_components_SpeedInput_SpeedInput__WEBPACK_IMPORTED_MODULE_1__.J_.milesPerHour,disabled:!1},SpeedInput.parameters={...SpeedInput.parameters,docs:{...SpeedInput.parameters?.docs,source:{originalSource:"args => {\n  const [speedRange, setSpeedrange] = useState<VehicleSpeed | null>(null);\n  const [showBanner, setShowBanner] = useState(false);\n  let vehicleValue: VehicleSpeed = {\n    min: speedRange?.min,\n    max: speedRange?.max,\n    unit: null,\n    mode: Mode.minmax\n  };\n  const handleUnitChange = (speedRange: VehicleSpeed | null) => {\n    setShowBanner(true);\n    setSpeedrange(speedRange);\n    setTimeout(() => {\n      setShowBanner(false);\n    }, 10000);\n  };\n  return <>\n            {showBanner && <div style={{\n      minHeight: 20,\n      backgroundColor: emerald,\n      padding: 8,\n      margin: '8px 0',\n      textAlign: 'center',\n      width: '100%'\n    }}>\n                The SpeedRange value is min = {speedRange?.min || ''} {speedRange?.unit || ''} and max = {speedRange?.max || ''} {speedRange?.unit || ''}.\n            </div>}\n            <SpeedInputComponent {...args} onChange={handleUnitChange} value={vehicleValue} />\n\n        </>;\n}",...SpeedInput.parameters?.docs?.source}}};const __namedExportsOrder=["SpeedInput"]},"./src/components/Filter/modules/DurationFilter/MinMaxInput.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),src_components_Input_Input__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Input/Input.tsx"),src_lib_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/hooks/useDebounce/index.ts"),_util_durationFilterUtil__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/Filter/util/durationFilterUtil.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const MinMaxInput=({value,onChange,allowNegativeInput})=>{const[min,setMin]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value&&void 0!==value.min?value.min.toString():"0"),[max,setMax]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value&&void 0!==value.max?value.max.toString():""),debouncedMin=(0,src_lib_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_2__.Z)(min,500),debouncedMax=(0,src_lib_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_2__.Z)(max,500);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{setMin(value&&void 0!==value.min?value.min.toString():"0"),setMax(value&&void 0!==value.max?value.max.toString():"")}),[value]);const checkValidNumber=num=>(0,_util_durationFilterUtil__WEBPACK_IMPORTED_MODULE_4__.m)(num,allowNegativeInput);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const minValue=(num=>{if(checkValidNumber(num)){if(!num||!max)return num;if(parseFloat(num)<parseFloat(max))return num}return""})(debouncedMin);setMin(minValue),submitSearch(minValue,max)}),[debouncedMin]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const maxValue=(num=>{if(checkValidNumber(num)){if(!num||!min)return num;if(parseFloat(num)>parseFloat(min))return num}return""})(debouncedMax);setMax(maxValue),submitSearch(min,maxValue)}),[debouncedMax]);const submitSearch=(min,max)=>{if(min||max){const output={};min&&(output.min=parseFloat(min)),max&&(output.max=parseFloat(max)),onChange(output)}else onChange(null)};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(src_components_Input_Input__WEBPACK_IMPORTED_MODULE_1__.Z,{"aria-label":"min-input",label:"Min",style:{width:"initial"},type:"number",onChange:e=>{setMin(e.target.value)},value:min}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(src_components_Input_Input__WEBPACK_IMPORTED_MODULE_1__.Z,{"aria-label":"max-input",label:"Max",style:{width:"initial"},type:"number",onChange:e=>{setMax(e.target.value)},value:max})]})};MinMaxInput.displayName="MinMaxInput";const __WEBPACK_DEFAULT_EXPORT__=MinMaxInput;try{MinMaxInput.displayName="MinMaxInput",MinMaxInput.__docgenInfo={description:"",displayName:"MinMaxInput",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"MinMax | null"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(value: MinMax | null) => void"}},allowNegativeInput:{defaultValue:null,description:"",name:"allowNegativeInput",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Filter/modules/DurationFilter/MinMaxInput.tsx#MinMaxInput"]={docgenInfo:MinMaxInput.__docgenInfo,name:"MinMaxInput",path:"src/components/Filter/modules/DurationFilter/MinMaxInput.tsx#MinMaxInput"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Filter/util/durationFilterUtil.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>getMinMaxFromKey,m:()=>validateNumber});const getMinMaxFromKey=key=>{const[min,max]=key.split("~");if(min||max)return{min,max}},validateNumber=(num,allowNegatives)=>{const parsed=Number(num);return!(!allowNegatives&&!isNaN(parsed))||num>=0}},"./src/components/Input/Input.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_emotion_react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),_inputStyles__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Input/inputStyles.ts"),src_styles_theme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/styles/theme.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Input=(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((({label,error="",required,labelClassName,...props},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_emotion_react__WEBPACK_IMPORTED_MODULE_4__.a,{theme:src_styles_theme__WEBPACK_IMPORTED_MODULE_2__.Z,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_inputStyles__WEBPACK_IMPORTED_MODULE_1__.ar,{error,className:labelClassName,children:[label&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span",{children:[label,required&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span",{className:"required-field",children:"*"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_inputStyles__WEBPACK_IMPORTED_MODULE_1__.Fy,{ref,error,...props}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:error})]})}))),__WEBPACK_DEFAULT_EXPORT__=Input;try{Input.displayName="Input",Input.__docgenInfo={description:"Input Component\n\nThe Input component takes in native input props as well as its own InputProps. The state is not managed\nin this component and should be handled in the consuming app.",displayName:"Input",props:{label:{defaultValue:null,description:"This shows a label above the input when provided.",name:"label",required:!1,type:{name:"string"}},error:{defaultValue:{value:""},description:"If not empty, the input component will be displayed in an error state with the provided error message.",name:"error",required:!1,type:{name:"string"}},required:{defaultValue:null,description:"If required is provided, the label of the input component will be displayed with a red asterisk at its end.",name:"required",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"The classes to pass to the input.",name:"className",required:!1,type:{name:"string"}},labelClassName:{defaultValue:null,description:"The classes to pass to the input label.",name:"labelClassName",required:!1,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLInputElement | null) => void) | RefObject<HTMLInputElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Input/Input.tsx#Input"]={docgenInfo:Input.__docgenInfo,name:"Input",path:"src/components/Input/Input.tsx#Input"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Input/inputStyles.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fy:()=>StyledInput,ar:()=>StyledLabel,d7:()=>INPUT_WIDTH});var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");const INPUT_WIDTH=300,StyledLabel=_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.Z.label((({error,theme})=>({color:theme?.colors?.cinder,display:"flex",flexDirection:"column",fontSize:12,fontWeight:600,span:{marginBottom:4,"&.required-field":{color:theme.colors.saturatedRed,marginLeft:4}},div:{marginTop:4,minHeight:14},...error&&{color:theme?.colors?.red}}))),StyledInput=_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.Z.input((({error,theme,disabled})=>({border:`1px solid ${theme?.colors?.mercury}`,borderRadius:4,boxSizing:"border-box",color:theme?.colors?.cinder,fontSize:16,outline:"none",paddingBottom:0,paddingLeft:12,paddingTop:0,height:40,width:INPUT_WIDTH,cursor:disabled?"not-allowed":void 0,":focus":{border:`1px solid ${theme?.colors?.cinder}`},"::placeholder":{color:theme?.colors?.mercury},...error&&{border:`1px solid ${theme?.colors?.red}`,":focus":{border:`1px solid ${theme?.colors?.red}`}}})))},"./src/components/RadioGroup/RadioGroup.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>RadioGroup_RadioGroup});var emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");const StyledLabel=emotion_styled_browser_esm.Z.label((({theme,disabled})=>({color:disabled?theme?.colors?.mercury:theme?.colors?.cinder,display:"flex",flexDirection:"row",fontSize:16,padding:0,marginBottom:41,alignItems:"center","div.label":{marginLeft:12,fontSize:16},svg:{color:disabled?theme?.colors?.mercury:theme?.colors?.white,marginLeft:2,"path:nth-of-type(2)":{fill:disabled?theme?.colors?.mercury:void 0}},cursor:disabled?"not-allowed":"auto"}))),StyledRadioGroup=emotion_styled_browser_esm.Z.input((({disabled})=>({display:"none",appearance:"none",WebkitAppearance:"none",cursor:disabled?"not-allowed":"pointer"})));var _path,_path2,react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function SvgRadioChecked(props){return react.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",height:24,viewBox:"0 0 24 24",width:24},props),_path||(_path=react.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),_path2||(_path2=react.createElement("path",{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"})))}var radioUnchecked_path,radioUnchecked_path2;function radioUnchecked_extends(){return radioUnchecked_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},radioUnchecked_extends.apply(this,arguments)}function SvgRadioUnchecked(props){return react.createElement("svg",radioUnchecked_extends({xmlns:"http://www.w3.org/2000/svg",height:24,viewBox:"0 0 24 24",width:24},props),radioUnchecked_path||(radioUnchecked_path=react.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),radioUnchecked_path2||(radioUnchecked_path2=react.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"})))}var theme=__webpack_require__("./src/styles/theme.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const RadioGroup=({name,options,value,disabled=!1,onChange=()=>null,labelClassName,...props})=>{const handleChange=event=>{disabled||onChange(event)};return(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:options.map((option=>{const icon=value===option.value?(0,jsx_runtime.jsx)(SvgRadioChecked,{}):(0,jsx_runtime.jsx)(SvgRadioUnchecked,{}),checked=value===option.value,disableOption=disabled||option.disabled;return(0,jsx_runtime.jsxs)(StyledLabel,{disabled:disableOption,className:labelClassName,children:[(0,jsx_runtime.jsx)(StyledRadioGroup,{...props,name,options,value:option.value,disabled:disableOption,onChange:disableOption?()=>null:handleChange,type:"radio",checked}),icon,option.label&&(0,jsx_runtime.jsx)("div",{className:"label",children:option.label})]})}))})};RadioGroup.displayName="RadioGroup";const RadioGroup_RadioGroup=RadioGroup;try{RadioGroup.displayName="RadioGroup",RadioGroup.__docgenInfo={description:"RadioGroup Component\n\nThe RadioGroup component takes in native radio button props as well as its own RadioGroupProps.",displayName:"RadioGroup",props:{name:{defaultValue:null,description:"The name of the radio button group.",name:"name",required:!1,type:{name:"string"}},options:{defaultValue:null,description:"The options of each radio button within the radio group.\nOptions include the `label` (appearance), `value` (returned on selection),\nand whether the individual option is `disabled`.",name:"options",required:!0,type:{name:"{ value: string | number; label: string | ReactElement<any, string | JSXElementConstructor<any>>; disabled?: boolean | undefined; }[]"}},value:{defaultValue:null,description:"The value of the selected radio button.",name:"value",required:!1,type:{name:"string | number | (string & readonly string[]) | (number & readonly string[])"}},disabled:{defaultValue:{value:"false"},description:"HTML input element disabled prop.",name:"disabled",required:!1,type:{name:"boolean"}},onChange:{defaultValue:{value:"() => null"},description:"The action that should be run when a radio button is selected.",name:"onChange",required:!1,type:{name:"(((event: ChangeEvent<HTMLInputElement>) => void) & ChangeEventHandler<HTMLInputElement>)"}},className:{defaultValue:null,description:"The classes to pass to the radio group.",name:"className",required:!1,type:{name:"string"}},labelClassName:{defaultValue:null,description:"The classes to pass to the radio group label.",name:"labelClassName",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/RadioGroup/RadioGroup.tsx#RadioGroup"]={docgenInfo:RadioGroup.__docgenInfo,name:"RadioGroup",path:"src/components/RadioGroup/RadioGroup.tsx#RadioGroup"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/SpeedInput/SpeedInput.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{AR:()=>Mode,J_:()=>SPEED_UNITS,ZP:()=>SpeedInput_SpeedInput});var react=__webpack_require__("./node_modules/react/index.js"),RadioGroup=__webpack_require__("./src/components/RadioGroup/RadioGroup.tsx"),MinMaxInput=__webpack_require__("./src/components/Filter/modules/DurationFilter/MinMaxInput.tsx");const RadioGroupWrapper=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js").Z.div((({theme})=>({label:{marginBottom:"8px",display:"flex",alignItems:"center","input[type=radio]:not(:checked) + svg + div":{color:theme?.colors?.pavement},"input[type=radio]:checked + svg":{fill:theme?.colors?.gunpowder}},svg:{height:"16px",width:"16px"}})));var emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");let Mode=function(Mode){return Mode.minmax="minmax",Mode.presets="presets",Mode}({}),SPEED_UNITS=function(SPEED_UNITS){return SPEED_UNITS.kilometersPerHour="kph",SPEED_UNITS.milesPerHour="mph",SPEED_UNITS.metersPerSecondSquared="m/s²",SPEED_UNITS}({});const unitOptions=[{value:SPEED_UNITS.kilometersPerHour,label:"Kph"},{value:SPEED_UNITS.milesPerHour,label:"Mph"}],SpeedInput=({value,onChange,unitConversionRequired,allowNegativeInput,defaultUnits,disabled})=>{const[unit,setUnit]=(0,react.useState)((()=>unitConversionRequired?value&&value.unit?value.unit:defaultUnits:SPEED_UNITS.metersPerSecondSquared));return(0,jsx_runtime.jsxs)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:[(0,jsx_runtime.jsx)(MinMaxInput.Z,{value,onChange:output=>{const min=output&&output?.min,max=output&&output?.max;if(min||max){let speedRange={min:min||0,max:max||void 0,unit,mode:Mode.minmax};onChange(speedRange)}else onChange(null)},allowNegativeInput}),unitConversionRequired&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("div",{className:"unitOfSpeed",children:"Unit of Speed"}),(0,jsx_runtime.jsx)(RadioGroupWrapper,{children:(0,jsx_runtime.jsx)(RadioGroup.Z,{name:"SpeedUnits",options:unitOptions,value:unit,disabled,onChange:event=>{const unitVal=event.target.value;setUnit(unitVal);const speedRange={...value,unit:unitVal,mode:Mode.minmax};(value?.min||0===value?.min)&&value?.max&&onChange(speedRange)}})})]})]})};SpeedInput.displayName="SpeedInput";const SpeedInput_SpeedInput=SpeedInput;try{SPEED_UNITS.displayName="SPEED_UNITS",SPEED_UNITS.__docgenInfo={description:"Enumerator for units of speed abbreviations",displayName:"SPEED_UNITS",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/SpeedInput/SpeedInput.tsx#SPEED_UNITS"]={docgenInfo:SPEED_UNITS.__docgenInfo,name:"SPEED_UNITS",path:"src/components/SpeedInput/SpeedInput.tsx#SPEED_UNITS"})}catch(__react_docgen_typescript_loader_error){}try{SpeedInput.displayName="SpeedInput",SpeedInput.__docgenInfo={description:"\nThe SpeedInput component takes in RadioGroup and MinMaxInput to create one component. \nThis component is used for input values also to toggle between radio buttons to convert input to a range.",displayName:"SpeedInput",props:{value:{defaultValue:null,description:"The value prop is assigned to 'VehicleSpeed', which is made up of a 'min', 'max' for the input values. A 'unit'(SPEED_UNITS) which is currently a toggle between 'kph', 'mph', or 'm/s²'. And 'mode' which uses 'minmax' for both input values.",name:"value",required:!0,type:{name:"VehicleSpeed | null"}},onChange:{defaultValue:null,description:"The function that should run when a radio button is selected.",name:"onChange",required:!0,type:{name:"(speedRange: VehicleSpeed | null) => void"}},unitConversionRequired:{defaultValue:null,description:"Toggle true, to have speed units validated for selected unit.",name:"unitConversionRequired",required:!0,type:{name:"boolean"}},allowNegativeInput:{defaultValue:null,description:"Toggle to accept negative input values or not.",name:"allowNegativeInput",required:!0,type:{name:"boolean"}},defaultUnits:{defaultValue:null,description:"We can set our defaultUnits with (kilometersPerHour(kph), milesPerHour(mph), metersPerSecondSquared(m/s²)). \nThese values determine if the unitConversionRequired needs to validate the conversion or not.",name:"defaultUnits",required:!0,type:{name:"enum",value:[{value:'"kph"'},{value:'"mph"'},{value:'"m/s²"'}]}},disabled:{defaultValue:null,description:"If true, this prop will disable the radio buttons.",name:"disabled",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/SpeedInput/SpeedInput.tsx#SpeedInput"]={docgenInfo:SpeedInput.__docgenInfo,name:"SpeedInput",path:"src/components/SpeedInput/SpeedInput.tsx#SpeedInput"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/hooks/useDebounce/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>hooks_useDebounce});var react=__webpack_require__("./node_modules/react/index.js");const hooks_useDebounce=(value,delay)=>{const[debouncedValue,setDebouncedValue]=(0,react.useState)(value);return(0,react.useEffect)((()=>{const id=setTimeout((()=>{setDebouncedValue(value)}),delay);return()=>clearTimeout(id)}),[value,delay]),debouncedValue}}}]);