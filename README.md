# cli-static-site-generator

![image](https://user-images.githubusercontent.com/81875051/199852562-161079f5-99fc-46ac-b84f-2a04165ad6f4.png)


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
1. Add or Edit .md files in /tool/src/pages

2. Install the dependencies and/or devDependencies and start the app.

```sh
cd testProject
tool start
```

This will create a /dist directory with html files

commands: **tool [CMD]**

```sh
tool help
tool start
```
