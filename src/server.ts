import AppWideConfig from "./AppWideConfig";
import {container} from "tsyringe";
import Logger from "./util/Logger";
import {environment, port} from "./config/Config";

const appWideConfig: AppWideConfig = container.resolve(AppWideConfig);


appWideConfig.getConfiguredApp().listen(port, () => {
    Logger.info(`server running on port : ${port}`);
    Logger.info("App Running for profile: " + environment);
}).on('error', (e: any) => Logger.error(e));