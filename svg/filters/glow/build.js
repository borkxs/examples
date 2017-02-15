var fs = require("fs")
var path = require("path")
var makeTemplate = require("lodash").template

const SVG_FOLDER = path.resolve(__dirname, "filter_examples")

fs.readdir(SVG_FOLDER, function (err, fileList) {
  if (err) return console.error(err)
  readFiles(fileList, function (err, filesMap) {
    writeIndex(Array
      .from(filesMap.keys())
      .sort()
      .map(x => filesMap.get(x))
      .map((svg, i) => toSVGPartial(svg, parseComments(svg), i))
      .join("\n")
    )
  })
})

function writeIndex(files) {
  return fs.writeFile(
    path.resolve(__dirname, "index.html"),
    template(files)
  )
}

function readFiles(listOfFiles, callback) {
  var results = new Map()
  listOfFiles.forEach(fileName => {
    fs.readFile(
      path.resolve(SVG_FOLDER, fileName),
    function (err, fileData) {
      if (err) return callback(err)
      results.set(fileName, fileData)
      if (results.size === listOfFiles.length) {
        callback(null, results)
      }
    })
  })
}

function parseComments(svg) {
  // const commentExp = /^\<\!\-\-[\s|\S](.?)*[\s\S]\-\-\>/g
  const svgString = svg.toString()
  return svg.toString()
            .split("<!--")
            .map(x => x.split("-->")[0])
            .filter(x => !!x)
            .filter(x => x != svg)
            .map(x => x.trim())
}

function svgTemplate(contents, idx) {
  const formatted = makeTemplate(contents)({
    radius: 3
  })
  return `<svg>
    <filter id="blur-me-${idx}">
      ${formatted}
    </filter>
    <g filter="url(#blur-me-${idx})">
      <circle cx="60"  cy="60" r="50" fill="green"></circle>
      <circle cx="120"  cy="60" r="50" fill="yellow"></circle>
      <circle cx="170" cy="60" r="50" fill="red"></circle>
    </g>
  </svg>`
}

function toSVGPartial(svg, comments, idx) {
  return `<div style="display: flex;">
    <div>
      ${svgTemplate(svg, idx)}
    </div>
    <pre>${comments && comments.map(escapeHtml).join("\n")}</pre>
  </div>`
}

function template(content) {
  return (
`<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
<p><a href="https://drafts.fxtf.org/filters/#feFloodElement">More Info https://drafts.fxtf.org/filters/#feFloodElement</a></p>
${content}
</body>
</html>`
  )
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
