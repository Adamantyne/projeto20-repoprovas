import chalk from "chalk";

import app from "./app.js";

const port:number = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.blue(`Server is up on port: ${port}`));
});