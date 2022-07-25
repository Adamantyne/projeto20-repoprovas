import chalk from "chalk";
import app from "./app.js";
var port = +process.env.PORT || 5000;
app.listen(port, function () {
    console.log(chalk.blue("Server is up on port: ".concat(port)));
});
