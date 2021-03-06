import chalk from "chalk";
import { stdout as singleLineLog } from "single-line-log";
import ftp from "basic-ftp";

export interface UploadProps {
  host: string;
  port: number;
  user: string;
  password: string;
  sourcePath: string;
  ftpPath: string;
}

export async function upload(pars: UploadProps) {
  let client = new ftp.Client(600 * 1000);
  // client.ftp.verbose = true;

  try {
    await client.access({
      host: pars.host,
      port: pars.port,
      user: pars.user,
      password: pars.password,
      secure: false
    });

    client.trackProgress((info: any) => {
      singleLineLog(`正在上传文件:${info.name}, 已上传:${info.bytesOverall}\n`);
    });

    await client.ensureDir(pars.ftpPath);
    await client.clearWorkingDir();
    await client.uploadDir(pars.sourcePath);

    client.trackProgress();

    singleLineLog(chalk.green("上传完成!") + "\n");
  } catch (err) {
    singleLineLog(chalk.red("上传失败！", err) + "\n");
  }

  await client.close();
}
