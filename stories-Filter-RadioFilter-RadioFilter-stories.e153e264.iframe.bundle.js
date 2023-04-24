"use strict";(self.webpackChunk_toyota_research_institute_lakefront=self.webpackChunk_toyota_research_institute_lakefront||[]).push([[1036],{"./src/stories/Filter/RadioFilter/RadioFilter.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{RadioFilter:()=>RadioFilter,__namedExportsOrder:()=>__namedExportsOrder,default:()=>RadioFilter_stories});var FilterPage=__webpack_require__("./src/stories/Filter/components/FilterPage/index.ts");const RADIO_FILTER_SOURCE_CODE=(0,__webpack_require__("./src/stories/Filter/filterStoriesUtil.ts").M)("{\n    radioFilter: RadioFilter(\n        {\n            label: 'Radio Filter',\n            initialValue: 'north',\n            defaultValue: '',\n            options: [\n                { label: 'North', value: 'north' },\n                ...additionalRadioGroupOptions\n            ],\n            description: 'RadioFilter is a radio group control meant to single select a value.'\n        },\n        {\n            getFilterBarLabel: (value: string) => `Radio Filter: ${value}`,\n            ...additionalRadioFilterOptions\n        }\n    )\n}"),RadioFilterDocs=()=>null,RadioFilter_RadioFilterDocs=RadioFilterDocs;try{RADIO_FILTER_SOURCE_CODE.displayName="RADIO_FILTER_SOURCE_CODE",RADIO_FILTER_SOURCE_CODE.__docgenInfo={description:"Example of radio filter source code.",displayName:"RADIO_FILTER_SOURCE_CODE",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/Filter/RadioFilter/RadioFilterDocs.tsx#RADIO_FILTER_SOURCE_CODE"]={docgenInfo:RADIO_FILTER_SOURCE_CODE.__docgenInfo,name:"RADIO_FILTER_SOURCE_CODE",path:"src/stories/Filter/RadioFilter/RadioFilterDocs.tsx#RADIO_FILTER_SOURCE_CODE"})}catch(__react_docgen_typescript_loader_error){}try{RadioFilterDocs.displayName="RadioFilterDocs",RadioFilterDocs.__docgenInfo={description:"RadioFilter Component\n\nThe RadioFilter component is a filter by use of radio group. While the default\nbehaviour should suffice, any valid `FilterModule` property (excluding label) can\nbe supplied via the `radioFilterOptions` parameter to change how the filter looks and acts.",displayName:"RadioFilterDocs",props:{radioFilterProps:{defaultValue:null,description:"The props required to be supplied as the first argument of\nthe RadioFilter component.",name:"radioFilterProps",required:!0,type:{name:"RadioFilterProps"}},radioFilterOptions:{defaultValue:null,description:"Any valid `FilterModule` property (excluding description and label)\nwhich will override default radio filter behaviour.",name:"radioFilterOptions",required:!1,type:{name:"RadioFilterOptions"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/Filter/RadioFilter/RadioFilterDocs.tsx#RadioFilterDocs"]={docgenInfo:RadioFilterDocs.__docgenInfo,name:"RadioFilterDocs",path:"src/stories/Filter/RadioFilter/RadioFilterDocs.tsx#RadioFilterDocs"})}catch(__react_docgen_typescript_loader_error){}var DocBlock=__webpack_require__("./.storybook/DocBlock.tsx"),modules=__webpack_require__("./src/components/Filter/modules/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const RadioFilter_stories={title:"Lakefront/Filter/RadioFilter",component:RadioFilter_RadioFilterDocs,argTypes:{radioFilterProps:{control:{type:"object"},description:"The props required to be supplied as the first argument of the RadioFilter component."},radioFilterOptions:{control:!1,description:"Any valid `FilterModule` property (excluding description and label) which will override default radio filter behaviour."}},parameters:{docs:{page:DocBlock.Z,source:{code:RADIO_FILTER_SOURCE_CODE}}}},RADIO_FILTER_OPTIONS=[{label:"North",value:"north"},{label:"East",value:"east"},{label:"South",value:"south"},{label:"West",value:"west"}],RadioFilterTemplate=args=>{const pageFilters={radioFilter:(0,modules.dQ)(args.radioFilterProps,{})};return(0,jsx_runtime.jsx)(FilterPage.ZP,{pageFilters})};RadioFilterTemplate.displayName="RadioFilterTemplate";const RadioFilter=RadioFilterTemplate.bind({});RadioFilter.args={radioFilterProps:{label:"Radio Filter",initialValue:RADIO_FILTER_OPTIONS[0].value,defaultValue:"",options:RADIO_FILTER_OPTIONS,description:"RadioFilter is a radio group control meant to single select a value."}},RadioFilter.parameters={...RadioFilter.parameters,docs:{...RadioFilter.parameters?.docs,source:{originalSource:"(args: RadioFilterArgs) => {\n  const pageFilters = {\n    radioFilter: RadioFilterFunction(args.radioFilterProps, {})\n  };\n  return <FilterPage pageFilters={pageFilters} />;\n}",...RadioFilter.parameters?.docs?.source}}};const __namedExportsOrder=["RadioFilter"]},"./src/stories/Filter/filterStoriesUtil.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>createFilterSourceCode});const createFilterSourceCode=filtersObjectString=>`\nconst FILTERS = ${filtersObjectString};\n\nconst filterHooks = useFilter(FILTERS, true, {}, () => null);\n\nreturn (\n    <Filter filterHooks={filterHooks}>\n        Page Body\n  </Filter>\n);\n`}}]);