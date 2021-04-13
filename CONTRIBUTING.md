# Contributing

## Adding New Components
Currently there is no automated solution to verify components are exported and added to the documentation. Please update the following locations before submitting a pull request:
 - [Index](src/index.ts) - **Alphabetically** add your component to the list of exported components in the following format:
 
 
    `export { default as ComponentName } from './path/to/ComponentName';`

 - [README => Components](README.md#components) - **Alphabetically** add a storybook link to your component. The url should be in the following format:
 
 
    `https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-path--to-your-component`
 
    Note: You can find the the `path--to-your-component` to your component by running the project locally, navigating to your component, and copying it from the url.

## Adding New Github Workflow Files
❗❗**Caution:** When adding new workflow files, note that github may attempt to run the workflow as soon as you push it up to github.

## Versioning
We use `semantic versioning`. While you can update the version number manually, we recommend you use our [automated versioning](.github/workflows/versionBumpCheck.yml) workflow for updating the version.

To trigger an automatic version update, add either a `patch`, `minor`, or `major keyword` to at least one of your commit messages. Once you push it up to github, the versioning will be handled for you. If none of the `keywords` above are added, a patch version update will be applied during the PR and you will be required to pull that change down before submitting any new commits.

Examples of the `keywords` include:

    patch-wording:  'patch,Patch,PATCH,patches,Patches,PATCHES,fix,Fix,FIX,fixes,Fixes,FIXES'
    
    minor-wording:  'minor,Minor,MINOR,add,Adds,ADD,ADDS,new,New,NEW,feat,Feat,FEAT,feature,Feature,FEATURE,features,Features,FEATURES'
    
    major-wording:  'major,MAJOR,cut-major,Cut-Major,break,Break,BREAK,breaking,Breaking,BREAKING'

For the most up to date list of keywords, see the [Version Bump Check](.github/workflows/versionBumpCheck.yml) workflow file.

## Submitting Pull requests
When opening a pull request, do not push `node_modules` and `dist` folders (which are ignored by default). Use Typescript `(.ts, .tsx)` files whenever possible

Automated testing will run when submitting a pull request to test component and compile errors. If you'd like to check whether your code compiles (or not) before submitting the pull request, you can do so by running the `npm run build` script. It will compile your code in the `dist` folder.

## Creating Issues
If you have a problem with this action and/or want a new feature to be added, please open a new issue from [here](https://github.com/ToyotaResearchInstitute/lakefront/issues/new).

If you're reporting a bug please be specific and include any helpful log/workflow snippet, as this will make the process easier for everyone. 

If you're asking for a new feature to be added, please be specific about what you want it to do and which use cases are you thinking to.
