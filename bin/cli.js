#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const child_process_1 = require("child_process");
const os_1 = require("os");
const fs_extra_1 = require("fs-extra");
const consola_1 = require("consola");
const config_1 = require("./config");
const configPath = (0, path_1.resolve)(process.cwd(), 'weapp-launcher.config.json');
let openDevtool = true;
function cli() {
    return __awaiter(this, void 0, void 0, function* () {
        let config;
        let devCliPath;
        try {
            // get existed config in cwd
            if (yield (0, fs_extra_1.exists)(configPath)) {
                config = JSON.parse(yield (0, fs_extra_1.readFile)(configPath, { encoding: 'utf-8' }));
            }
            else {
                // enquirer and save
                config = yield (0, config_1.enquirerConfig)();
                (0, fs_extra_1.writeFile)(configPath, JSON.stringify(config, null, 2));
            }
            // exec script
            // open devtool
            if ((0, os_1.platform)() === 'win32') {
                // windows
                devCliPath = (0, path_1.resolve)(config.devtoolPath, 'cli.bat');
            }
            else if ((0, os_1.platform)() === 'darwin') {
                // MacOS
                devCliPath = (0, path_1.resolve)(config.devtoolPath, 'Contents/MacOS/cli');
            }
            else {
                consola_1.default.error('只支持 Windows 或 MacOS');
                throw new Error('Unknown os');
            }
            const buildSp = (0, child_process_1.exec)(`npm run ${config.script}`);
            buildSp.stdout.on('data', (data) => {
                const info = data.toString();
                consola_1.default.info(info);
                if (info.includes('Compiled successfully') && openDevtool) {
                    (0, child_process_1.exec)(`${devCliPath} open --project ${(0, path_1.resolve)(process.cwd(), 'dist', 'dev', 'mp-weixin')}`);
                    openDevtool = false;
                }
            });
        }
        catch (e) {
            consola_1.default.error('Error');
            process.exit(1);
        }
    });
}
cli();
