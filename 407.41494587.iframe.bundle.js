"use strict";(self.webpackChunk_toyota_research_institute_lakefront=self.webpackChunk_toyota_research_institute_lakefront||[]).push([[407],{"./src/components/BoundingBoxes/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>components_BoundingBoxes});var react=__webpack_require__("./node_modules/react/index.js");const BoundingBoxesContainer=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js").Z.canvas({position:"absolute",top:0,left:0,zIndex:1}),drawSingleBox=(ctx,bboxItem)=>{const{color,items,name}=bboxItem;ctx.strokeStyle=color,ctx.lineWidth=3,items.forEach((item=>{const bbox=item.bbox,leftX=bbox[0][0],topY=bbox[0][1],width=bbox[1][0]-bbox[0][0],height=bbox[1][1]-bbox[0][1];ctx.strokeRect(leftX,topY,width,height),ctx.font="bold 36px sans-serif",ctx.fillStyle=color,ctx.fillText(name,leftX,topY-10)}))},getImageOffsetRatio=(imageWidth,imageHeight,outputWidth,outputHeight)=>{if(0!==imageWidth&&0!==outputWidth){const imageRatio=imageWidth/imageHeight,outputRatio=outputWidth/outputHeight;if(imageRatio<outputRatio){const desiredWidth=imageRatio*outputHeight;return{left:Math.abs(outputWidth-desiredWidth)/2,top:0,ratio:1/(imageHeight/outputHeight)}}if(imageRatio>outputRatio){const desiredHeight=outputWidth/imageRatio;return{left:0,top:Math.abs(outputHeight-desiredHeight)/2,ratio:1/(imageWidth/outputWidth)}}}return{left:0,top:0,ratio:1}};try{drawSingleBox.displayName="drawSingleBox",drawSingleBox.__docgenInfo={description:"Draws a single bounding box given a 2D canvas rendering context and the bounding box item.",displayName:"drawSingleBox",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/BoundingBoxes/boundingBoxesUtil.tsx#drawSingleBox"]={docgenInfo:drawSingleBox.__docgenInfo,name:"drawSingleBox",path:"src/components/BoundingBoxes/boundingBoxesUtil.tsx#drawSingleBox"})}catch(__react_docgen_typescript_loader_error){}try{getImageOffsetRatio.displayName="getImageOffsetRatio",getImageOffsetRatio.__docgenInfo={description:"Get ratio and image offset for scaling the image in a container.",displayName:"getImageOffsetRatio",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/BoundingBoxes/boundingBoxesUtil.tsx#getImageOffsetRatio"]={docgenInfo:getImageOffsetRatio.__docgenInfo,name:"getImageOffsetRatio",path:"src/components/BoundingBoxes/boundingBoxesUtil.tsx#getImageOffsetRatio"})}catch(__react_docgen_typescript_loader_error){}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const BoundingBoxes=({activeBBox,boundingBoxItems,className,imageWidth,imageHeight,outputWidth,outputHeight})=>{const canvasRef=(0,react.useRef)(null);(0,react.useEffect)((()=>{(()=>{const currentCanvas=canvasRef.current;if(!currentCanvas)return;const ctx=currentCanvas.getContext("2d");if(ctx&&(ctx.clearRect(0,0,currentCanvas.width,currentCanvas.height),boundingBoxItems.length>0))if(""===activeBBox)boundingBoxItems.forEach((bboxItem=>{drawSingleBox(ctx,bboxItem)}));else{const activeItem=boundingBoxItems.find((item=>item.name===activeBBox));activeItem&&drawSingleBox(ctx,activeItem)}})()}),[activeBBox,boundingBoxItems]);const offsetRatio=(0,react.useMemo)((()=>getImageOffsetRatio(imageWidth,imageHeight,outputWidth,outputHeight)),[imageWidth,imageHeight,outputWidth,outputHeight]);return(0,jsx_runtime.jsx)(BoundingBoxesContainer,{style:{left:offsetRatio.left,top:offsetRatio.top,transform:`scale(${offsetRatio.ratio})`,WebkitTransformOrigin:"top left"},className,width:imageWidth,height:imageHeight,ref:canvasRef})};BoundingBoxes.displayName="BoundingBoxes";const BoundingBoxes_BoundingBoxes=BoundingBoxes;try{BoundingBoxes.displayName="BoundingBoxes",BoundingBoxes.__docgenInfo={description:"BoundingBoxes Component\n\nThe BoundingBoxes component is intended to draw boxes on top of specified areas\nof an image. This can be used to direct attention to key aspects or items within an image\nwhile also maintaining the proper aspect ratio and location offset(s) as the image is resized.",displayName:"BoundingBoxes",props:{activeBBox:{defaultValue:null,description:"The name of the currently active item. When specified, only\nbounding boxes included in the first item with the matching name will be drawn.",name:"activeBBox",required:!0,type:{name:"string"}},boundingBoxItems:{defaultValue:null,description:"A list of bounding box items to draw including the name of the item,\nthe color of the boxes, and a list of bounding boxes to draw.",name:"boundingBoxItems",required:!0,type:{name:"BoundingBoxItemProp[]"}},className:{defaultValue:null,description:"The classes to pass to the bounding boxes container.",name:"className",required:!1,type:{name:"string"}},imageWidth:{defaultValue:null,description:"The width of the image.",name:"imageWidth",required:!0,type:{name:"number"}},imageHeight:{defaultValue:null,description:"The height of the image.",name:"imageHeight",required:!0,type:{name:"number"}},outputWidth:{defaultValue:null,description:"The desired width to display the image. This will likely be observed in the\nparent component, changing often to allow the image to resize.",name:"outputWidth",required:!0,type:{name:"number"}},outputHeight:{defaultValue:null,description:"The desired height to display the image. This will likely be observed in the\nparent component, changing often to allow the image to resize.",name:"outputHeight",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/BoundingBoxes/BoundingBoxes.tsx#BoundingBoxes"]={docgenInfo:BoundingBoxes.__docgenInfo,name:"BoundingBoxes",path:"src/components/BoundingBoxes/BoundingBoxes.tsx#BoundingBoxes"})}catch(__react_docgen_typescript_loader_error){}const components_BoundingBoxes=BoundingBoxes_BoundingBoxes},"./src/components/Loading/Loading.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Loading_Loading});var emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");const spinAnimation=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js").F4`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`,StyledLoadingContainer=emotion_styled_browser_esm.Z.div((({theme,animated,labelPosition,svg,spinDirection})=>({display:"flex",flexDirection:"BOTTOM"===labelPosition?"column":"row",alignItems:"center",svg:{...animated&&{animation:`${spinAnimation} 2s linear infinite`},..."LEFT"===spinDirection&&{animationDirection:"reverse"},marginLeft:5,marginRight:10,path:{...!svg&&{fill:theme?.colors?.pavement}}},div:{color:theme?.colors?.pavement,paddingTop:"BOTTOM"===labelPosition?8:0}})));var _g,emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts"),react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function SvgTriLogoMonochrome(props){return react.createElement("svg",_extends({width:175,height:154,viewBox:"0 0 175 154",xmlns:"http://www.w3.org/2000/svg"},props),_g||(_g=react.createElement("g",{fill:"#9393a2",fillRule:"evenodd"},react.createElement("path",{d:"M39.91 145.08s2.82 4.8 5.63 6.43 8.36 1.65 8.36 1.65h78.62S101 152.16 59.1 128C17.2 103.84.61 77 .61 77l39.3 68.08zM171.84 85.08s2.74-4.84 2.74-8.08-2.74-8.07-2.74-8.07L132.52.84S147.44 28.67 147.44 77s-14.92 76.16-14.92 76.16l39.32-68.08zM53.91.84s-5.56 0-8.37 1.66c-2.81 1.66-5.63 6.42-5.63 6.42L.61 77S17.25 50.16 59.1 26 132.52.84 132.52.84H53.91z"}))))}var _path;function woven_logo_extends(){return woven_logo_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},woven_logo_extends.apply(this,arguments)}function SvgWovenLogo(props){return react.createElement("svg",woven_logo_extends({xmlns:"http://www.w3.org/2000/svg",width:184,height:161.333,viewBox:"0 0 138 121"},props),_path||(_path=react.createElement("path",{d:"M34.1 3.7C30.2 7.7 19 28.2 19 31.4c0 1.5 1.1 3.7 2.5 5.1 4.8 4.9 6.7 4.2 41.8-16.1C81 10.2 95.7 1.6 95.9 1.4c.2-.2-13-.4-29.3-.4H36.8l-2.7 2.7zM89.3 10.3c-7.8 4.5-14.2 8.5-14.3 8.9 0 1.3 28.5 16.9 28.9 15.7 1-3.2 6-7.2 10.3-8.3l4.6-1.1-6.7-11.4c-3.6-6.3-7.1-11.6-7.6-11.7-.6-.2-7.4 3.4-15.2 7.9zM110.5 33.5l-2.5 2.4v39.3c.1 30.3.3 38.8 1.2 37.3C136 66.2 137 64.4 137 60.8c0-2.7-1.7-6.6-6.5-15-3.6-6.2-7.5-12.1-8.6-13.1-3.1-2.5-8.5-2.2-11.4.8zM7.8 47.8c-5.2 9-6.5 11.9-5.5 12.8C3.6 61.8 29.8 77 30.6 77c.2 0 .4-7.4.4-16.5V44h-3c-3.9 0-8.2-2.2-10.8-5.5-1.1-1.4-2.1-2.5-2.3-2.5-.2 0-3.4 5.3-7.1 11.8zM5.6 70c1.1 1.9 7.8 13.5 14.9 25.8 9.4 16.3 13.6 22.7 15.6 23.8 2.1 1 6.6 1.4 17.4 1.4 14.2 0 14.7-.1 17-2.5 3.3-3.2 3.4-9.3.3-12.2-1.3-1.2-15.3-9.6-31.3-18.8C23.5 78.3 8.9 69.8 7 68.7l-3.5-2.1L5.6 70zM88.3 94.2l-14.1 8.1 1.9 3.6c2.3 4.3 2.4 7 .5 11.6l-1.5 3.5H103v-17.5c0-9.6-.1-17.5-.3-17.5-.1 0-6.6 3.7-14.4 8.2z"})))}const iconOptions_primary={"aria-details":"woven-loading-spinner"},iconOptions_secondary={"aria-details":"tri-loading-spinner"};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Loading=({animated=!0,spinDirection="RIGHT",label,labelPosition="BOTTOM",height=24,width=24,svg,iconVariant="primary",className,...logoProps})=>{const Svg=svg||("secondary"===iconVariant?SvgTriLogoMonochrome:SvgWovenLogo);const ariaDetails="secondary"===iconVariant?iconOptions_secondary["aria-details"]:iconOptions_primary["aria-details"];return(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:(0,jsx_runtime.jsxs)(StyledLoadingContainer,{className,animated,spinDirection,labelPosition,children:[(0,jsx_runtime.jsx)(Svg,{height,"aria-label":"loading","aria-details":svg?void 0:ariaDetails,width,...logoProps}),label&&(0,jsx_runtime.jsx)("div",{children:label})]})})};Loading.displayName="Loading";const Loading_Loading=Loading;try{Loading.displayName="Loading",Loading.__docgenInfo={description:"",displayName:"Loading",props:{animated:{defaultValue:{value:"true"},description:"Determines if the component should rotate.",name:"animated",required:!1,type:{name:"boolean"}},spinDirection:{defaultValue:{value:"RIGHT"},description:"The direction of the default animation.",name:"spinDirection",required:!1,type:{name:"enum",value:[{value:'"LEFT"'},{value:'"RIGHT"'}]}},labelPosition:{defaultValue:{value:"BOTTOM"},description:"Label position in relation to the SVG.",name:"labelPosition",required:!1,type:{name:"enum",value:[{value:'"RIGHT"'},{value:'"BOTTOM"'}]}},label:{defaultValue:null,description:"The text or element that shows next to the svg.",name:"label",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},height:{defaultValue:{value:"24"},description:"The height of the loading image.",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"24"},description:"The width of the loading image.",name:"width",required:!1,type:{name:"number"}},svg:{defaultValue:null,description:"The SVG image to be shown when loading.",name:"svg",required:!1,type:{name:"ElementType<any>"}},iconVariant:{defaultValue:{value:"primary"},description:"The icon variant to display if svg isn't provided.",name:"iconVariant",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"Additional styles.",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Loading/Loading.tsx#Loading"]={docgenInfo:Loading.__docgenInfo,name:"Loading",path:"src/components/Loading/Loading.tsx#Loading"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/MaskableImage/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>components_MaskableImage});var _path,_path2,react=__webpack_require__("./node_modules/react/index.js"),BoundingBoxes=__webpack_require__("./src/components/BoundingBoxes/index.ts"),Loading=__webpack_require__("./src/components/Loading/Loading.tsx"),resizeObserver=__webpack_require__("./src/lib/hooks/resizeObserver.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}const MaskableImageContainer=emotion_styled_browser_esm.Z.div((({heightToWidthRatio,theme})=>({display:"flex",justifyContent:"center",backgroundColor:theme?.colors?.dolphin,position:"relative",height:0,overflow:"hidden",width:"100%",paddingBottom:heightToWidthRatio}))),MaskedImage=emotion_styled_browser_esm.Z.img((({imageLoaded,allLoading,showSpinnerOnLoad})=>({position:"absolute",top:0,left:0,height:"100.5%",width:"100%",...(!imageLoaded||allLoading)&&showSpinnerOnLoad&&{visibility:"hidden"},objectFit:"contain"}))),DisplayImage=emotion_styled_browser_esm.Z.img((({imageLoaded,allLoading,showSpinnerOnLoad})=>({position:"absolute",top:0,left:0,height:"100.5%",width:"100%",...imageLoaded||!allLoading&&{visibility:"hidden"},...imageLoaded&&showSpinnerOnLoad&&{display:"none"}}))),LoadingSpinner=emotion_styled_browser_esm.Z.div((()=>({position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)"}))),HighlightedImageStyle=emotion_styled_browser_esm.Z.div((({highlighted})=>({...highlighted&&{backgroundColor:"rgba(55, 143, 238,0.5)",position:"absolute",top:0,left:0,height:"100%",width:"100%"},...!highlighted&&{display:"none"}}))),CheckOutlinedIconStyle=(0,emotion_styled_browser_esm.Z)((function SvgCheckedOutline(props){return react.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",height:24,viewBox:"0 0 24 24",width:24},props),_path||(_path=react.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"})),_path2||(_path2=react.createElement("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"})))}))((({selectable,selected,hovered,individuallySelected,theme})=>({...selectable&&{position:"absolute",bottom:"15px",right:"15px",fill:theme?.colors?.akoya,borderRadius:"50%"},...(!selectable||!selected&&!hovered&&!individuallySelected)&&{display:"none"},...selectable&&(selected||individuallySelected)&&{background:theme?.colors?.pastelGreen,border:"1px solid",borderColor:theme?.colors?.akoya}})));var emotion_element_6a883da9_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const MaskableImage=({className,url,fullSizeDimensions,alt="",selectable=!1,selected=!1,onSelect,highlighted=!1,boundingBoxTags,showSpinner=!1,showSpinnerOnLoad=!1,heightToWidthRatio=.625,innerWidth})=>{const[imageLoaded,setImageLoaded]=(0,react.useState)(!1),[boundingBoxDimensions,setBoundingBoxDimensions]=(0,react.useState)({}),[hovered,setHovered]=(0,react.useState)(!1),[individuallySelected,setIndividuallySelected]=(0,react.useState)(!1),[allLoading,setAllLoading]=(0,react.useState)(!1),[observedElement,setObservedElement]=(0,react.useState)(null),imageRef=(0,react.useRef)(null),containerRef=(0,react.useCallback)((node=>{if(node&&boundingBoxTags){const{height,width}=node.getBoundingClientRect();setBoundingBoxDimensions({height,width})}setAllLoading(showSpinner||showSpinnerOnLoad&&!imageLoaded)}),[imageLoaded,innerWidth,fullSizeDimensions,observedElement]);(0,react.useEffect)((()=>{const graphResizeObserver=(0,resizeObserver.Z)((entries=>{setObservedElement(entries)}));return graphResizeObserver.observe(imageRef.current),()=>{graphResizeObserver.disconnect()}}),[]),(0,react.useEffect)((()=>{setImageLoaded(!1),setAllLoading(showSpinner||showSpinnerOnLoad&&!imageLoaded)}),[url]),(0,react.useEffect)((()=>{setIndividuallySelected(!1)}),[selected]);return(0,jsx_runtime.jsx)(emotion_element_6a883da9_browser_esm.a,{theme:theme.Z,children:(0,jsx_runtime.jsxs)(MaskableImageContainer,{onMouseEnter:()=>{selectable&&setHovered(!0)},onMouseLeave:()=>{selectable&&setHovered(!1)},ref:containerRef,className,heightToWidthRatio:100*heightToWidthRatio+"%",children:[boundingBoxTags&&imageLoaded&&!allLoading&&(0,jsx_runtime.jsx)(BoundingBoxes.ZP,{activeBBox:"",boundingBoxItems:boundingBoxTags,imageWidth:fullSizeDimensions.width,imageHeight:fullSizeDimensions.height,outputWidth:boundingBoxDimensions.width,outputHeight:boundingBoxDimensions.height}),allLoading&&(0,jsx_runtime.jsx)(LoadingSpinner,{children:(0,jsx_runtime.jsx)(Loading.Z,{animated:!0,height:24,label:"Loading",labelPosition:"RIGHT",width:24})}),(0,jsx_runtime.jsx)(DisplayImage,{imageLoaded,allLoading,showSpinnerOnLoad,src:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",alt:"Loading"}),(0,jsx_runtime.jsx)(MaskedImage,{imageLoaded,allLoading,showSpinnerOnLoad,onLoad:()=>{setImageLoaded(!0)},src:url,alt,ref:imageRef}),(0,jsx_runtime.jsx)(HighlightedImageStyle,{highlighted}),(0,jsx_runtime.jsx)(CheckOutlinedIconStyle,{onClick:event=>{event.stopPropagation();const selectedState=!individuallySelected;setIndividuallySelected(selectedState),onSelect&&onSelect(selectedState)},selectable,selected,hovered,individuallySelected})]})})};MaskableImage.displayName="MaskableImage";const MaskableImage_MaskableImage=MaskableImage;try{MaskableImage.displayName="MaskableImage",MaskableImage.__docgenInfo={description:"Maskable Image Component\n \nThis Component is used to render an image. The image can be selected and highlighted. The showSpinnerOnLoad when set\nto true will show the loading spinner until the image is loaded.",displayName:"MaskableImage",props:{url:{defaultValue:null,description:"The url to set the image source.",name:"url",required:!0,type:{name:"string"}},fullSizeDimensions:{defaultValue:null,description:"This is to set the full size dimension of the image.",name:"fullSizeDimensions",required:!0,type:{name:"{ height: number; width: number; }"}},alt:{defaultValue:{value:""},description:"This is to set the alternate text of the image.",name:"alt",required:!1,type:{name:"string"}},selectable:{defaultValue:{value:"false"},description:"This will enable or disable the selection of the image when check icon is clicked.",name:"selectable",required:!1,type:{name:"boolean"}},selected:{defaultValue:{value:"false"},description:"This will set the selection of the image by default.",name:"selected",required:!1,type:{name:"boolean"}},onSelect:{defaultValue:null,description:"This is an event that would be called when the image is selected.",name:"onSelect",required:!1,type:{name:"((selected: boolean) => void)"}},highlighted:{defaultValue:{value:"false"},description:"This is to set the default property that would highlight the image.",name:"highlighted",required:!1,type:{name:"boolean"}},boundingBoxTags:{defaultValue:null,description:"This is to set the bounding box tags.",name:"boundingBoxTags",required:!1,type:{name:"ImageTagProps[]"}},showSpinner:{defaultValue:{value:"false"},description:"This will set the show spinner property bey default.",name:"showSpinner",required:!1,type:{name:"boolean"}},showSpinnerOnLoad:{defaultValue:{value:"false"},description:"If set to true,This will show spinner when the image is still loading.",name:"showSpinnerOnLoad",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"This will add the class to the image component.",name:"className",required:!1,type:{name:"string"}},heightToWidthRatio:{defaultValue:{value:"10 / 16"},description:"This will specify the heightToWidthRatio of the image.",name:"heightToWidthRatio",required:!1,type:{name:"number"}},innerWidth:{defaultValue:null,description:"This is to set the inner width of the image.",name:"innerWidth",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MaskableImage/MaskableImage.tsx#MaskableImage"]={docgenInfo:MaskableImage.__docgenInfo,name:"MaskableImage",path:"src/components/MaskableImage/MaskableImage.tsx#MaskableImage"})}catch(__react_docgen_typescript_loader_error){}const components_MaskableImage=MaskableImage_MaskableImage}}]);
//# sourceMappingURL=407.41494587.iframe.bundle.js.map