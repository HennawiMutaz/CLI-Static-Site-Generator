const logger = require('../logger')('commands:start');
const fs = require('fs');
const matter = require('gray-matter');
const marked = require('marked');
const mkdirp = require('mkdirp');
const glob = require('glob');
const { parse } = require('path');
module.exports = function start(config) {
  logger.highlight('  Starting the app  ');
  logger.debug('Received configuration', config);
  //* Welcome Banner
  logger.log(' __          __    _                              \r\n \\ \\        \/ \/   | |                             \r\n  \\ \\  \/\\  \/ \/___ | |  ___  ___   _ __ ___    ___ \r\n   \\ \\\/  \\\/ \/\/ _ \\| | \/ __|\/ _ \\ | \'_ ` _ \\  \/ _ \\\r\n    \\  \/\\  \/|  __\/| || (__| (_) || | | | | ||  __\/\r\n     \\\/  \\\/  \\___||_| \\___|\\___\/ |_| |_| |_| \\___|\r\n                                                  \r\n                                                  ');
  logger.log(' ____  ____  __  ____  __  ___    ____  __  ____  ____     ___  ____  __ _  ____  ____   __  ____  __  ____ \r\n\/ ___)(_  _)\/ _\\(_  _)(  )\/ __)  \/ ___)(  )(_  _)(  __)   \/ __)(  __)(  ( \\(  __)(  _ \\ \/ _\\(_  _)\/  \\(  _ \\\r\n\\___ \\  )( \/    \\ )(   )(( (__   \\___ \\ )(   )(   ) _)   ( (_ \\ ) _) \/    \/ ) _)  )   \/\/    \\ )( (  O ))   \/\r\n(____\/ (__)\\_\/\\_\/(__) (__)\\___)  (____\/(__) (__) (____)   \\___\/(____)\\_)__)(____)(__\\_)\\_\/\\_\/(__) \\__\/(__\\_)');

  // read the markdown file
  //      - process the headers
  //      - read content
  //      - return as object
  //      - inject into template (html)
  //      - save file

  const readFile = filename => {
    const rawFile = fs.readFileSync(filename, 'utf8');
    const parsed = matter(rawFile);
    const html = marked.parse(parsed.content);
    return {...parsed, html};
  }

  const templatize = (template, {date, title, content, author}) => 
    template
        .replace(/<!-- CONTENT -->/g, content)
        .replace(/<!-- TITLE -->/g, title)
        .replace(/<!-- PUBLISH_DATE -->/g, date)
        .replace(/<!-- AUTHOR -->/g, author)


  const saveFile = (fileName, contents) => {
    const dir = config.outPath;
    mkdirp.sync(dir);
    fs.writeFileSync(`${dir}/${fileName}`, contents);
  }

  const processFile = () => {
    const fileNames = glob.sync(config.srcPath + '/pages/**/**.md');
    const template = fs.readFileSync(config.template, 'utf8');
    fileNames.forEach(fileName => {
      const file = readFile(fileName);
      const templatized = templatize(template, {
        date: file.data.date,
        title: file.data.title,
        content: file.content,
        author: file.data.author,
      });
      saveFile(parse(fileName).name + '.html', templatized);
    });
    logger.success('\nCreated Site Successfully.');
    logger.log('Your files can be found in \'/dist\'');
  }




  //* FINAL
  processFile();


}