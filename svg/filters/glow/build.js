var fs = require("fs")
var path = require("path")

const SVG_FOLDER = path.resolve(__dirname, "public")

fs.readdir(SVG_FOLDER, function (err, fileList) {
  if (err) return console.error(err)
  readFiles(fileList, function (err, filesMap) {
    writeIndex(
      Array.from(filesMap.keys())
        .sort()
        .map(x => filesMap.get(x))
        .map((svg) => toSVGPartial(svg, parseComments(svg)))
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
      if (err) return console.error(err)
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
  const matches = svg.toString()
                     .split("<!--")
                     .map(x => x.split("-->")[0])
                     .filter(x => !!x)
                     .filter(x => x != svg)
                     .map(x => x.trim())

  return matches
}

function toSVGPartial(svg, comments) {
  console.log("comments", comments)
  return `<div style="display: flex;">
    <div>${svg}</div>
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
