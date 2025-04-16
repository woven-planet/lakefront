"use strict";(self.webpackChunk_woven_planet_lakefront=self.webpackChunk_woven_planet_lakefront||[]).push([[5154],{"./src/stories/Filter/MinMaxFilter/MinMaxFilter.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MinMaxFilter:()=>MinMaxFilter,__namedExportsOrder:()=>__namedExportsOrder,default:()=>MinMaxFilter_stories});var FilterPage=__webpack_require__("./src/stories/Filter/components/FilterPage/index.ts"),DocBlock=__webpack_require__("./.storybook/DocBlock.tsx");const MIN_MAX_FILTER_SOURCE_CODE=(0,__webpack_require__("./src/stories/Filter/filterStoriesUtil.ts").M)("{\n    MinMaxFilter: MinMaxFilter(\n        'Vehicle Speed',\n        'Min Max Filter is a input control to be used to filter according to the minimum and maximum input. (ex: speed)',\n        'm/hr'\n    )\n}"),MinMaxFilterDocs=()=>null,MinMaxFilter_MinMaxFilterDocs=MinMaxFilterDocs;try{MIN_MAX_FILTER_SOURCE_CODE.displayName="MIN_MAX_FILTER_SOURCE_CODE",MIN_MAX_FILTER_SOURCE_CODE.__docgenInfo={description:"Example of text filter source code.",displayName:"MIN_MAX_FILTER_SOURCE_CODE",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/Filter/MinMaxFilter/MinMaxFilterDocs.tsx#MIN_MAX_FILTER_SOURCE_CODE"]={docgenInfo:MIN_MAX_FILTER_SOURCE_CODE.__docgenInfo,name:"MIN_MAX_FILTER_SOURCE_CODE",path:"src/stories/Filter/MinMaxFilter/MinMaxFilterDocs.tsx#MIN_MAX_FILTER_SOURCE_CODE"})}catch(__react_docgen_typescript_loader_error){}try{MinMaxFilterDocs.displayName="MinMaxFilterDocs",MinMaxFilterDocs.__docgenInfo={description:"Min Max Filter Component\n\nThe Min Max Filter Component meant to be used to filter according to the minimum and maximum input.\nYou can specify the minimum value and maximum value in the input control. The default value for Min is set as 0.",displayName:"MinMaxFilterDocs",props:{label:{defaultValue:null,description:"The label to display for the duration filter component.",name:"label",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"The description/help text to display above the duration filter component.",name:"description",required:!1,type:{name:"string"}},unitsOfMeasurement:{defaultValue:null,description:"The units of measurement to display within the filter label.",name:"unitsOfMeasurement",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/Filter/MinMaxFilter/MinMaxFilterDocs.tsx#MinMaxFilterDocs"]={docgenInfo:MinMaxFilterDocs.__docgenInfo,name:"MinMaxFilterDocs",path:"src/stories/Filter/MinMaxFilter/MinMaxFilterDocs.tsx#MinMaxFilterDocs"})}catch(__react_docgen_typescript_loader_error){}var modules=__webpack_require__("./src/components/Filter/modules/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const MinMaxFilter_stories={title:"Lakefront/Filter/MinMaxFilter",component:MinMaxFilter_MinMaxFilterDocs,argTypes:{label:{control:"text",description:"The label to display for the min max filter component."},description:{control:"text",description:"The description/help text to display above the min max filter component."},unitsOfMeasurement:{control:"text",description:"The units of measurement text to display within the bar label section fo the filter"}},parameters:{docs:{page:DocBlock.Z,source:{code:MIN_MAX_FILTER_SOURCE_CODE}}}},MinMaxFilterTemplate=args=>{const pageFilters={minMaxFilter:(0,modules.fU)({...args})};return(0,jsx_runtime.jsx)(FilterPage.ZP,{pageFilters})};MinMaxFilterTemplate.displayName="MinMaxFilterTemplate";const MinMaxFilter=MinMaxFilterTemplate.bind({});MinMaxFilter.args={label:"Vehicle Speed",description:"Min Max Filter is a input control to be used to filter according to the minimum and maximum input. (ex: speed)",unitsOfMeasurement:"m/hr"},MinMaxFilter.parameters={...MinMaxFilter.parameters,docs:{...MinMaxFilter.parameters?.docs,source:{originalSource:"(args: MinMaxFilterArgs) => {\n  const pageFilters = {\n    minMaxFilter: MinMaxFilterFunction({\n      ...args\n    })\n  };\n  return <FilterPage pageFilters={pageFilters} />;\n}",...MinMaxFilter.parameters?.docs?.source}}};const __namedExportsOrder=["MinMaxFilter"]},"./src/stories/Filter/filterStoriesUtil.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>createFilterSourceCode});const createFilterSourceCode=filtersObjectString=>`\nconst FILTERS = ${filtersObjectString};\n\nconst filterHooks = useFilter(FILTERS, true, {}, () => null);\n\nreturn (\n    <Filter filterHooks={filterHooks}>\n        Page Body\n  </Filter>\n);\n`}}]);