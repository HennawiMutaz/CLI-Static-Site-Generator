# cli-static-site-generator

Convert .md files into a static site (.html)
Import/Edit .md files and watch them magically convert to html
## Tech

This Project uses a number of open source libraries to work properly:

- node.js - used for cli commands and file proccessing
- ajv - schema validation
- better-avg-errors - provide relevant errors messages
- chalk - style text in cli
- arg - cli argument parser
- cosmiconfig - load config files
- glob - match files using patterns
- gray-matter - parse front-matter from a string or file
- mkdirp - file manager

## Installation

Install the dependencies and/or devDependencies and start the app.

```sh
cd testProject
npm i
tool start
```

This will create a /dist directory with html files

commands: **tool [CMD]**

```sh
tool help
tool start
```
