const fs = require("fs");

fs.readFile("package.json", (err, data) => {
  if (err) throw err;
  let package_data = JSON.parse(data);
  console.log(package_data.version);
});
