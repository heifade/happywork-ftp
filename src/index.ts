import commander from "commander";

import { addSendFtpCommand } from "./ftpCommand";

addSendFtpCommand();

commander.parse(process.argv);
