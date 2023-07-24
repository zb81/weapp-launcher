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
exports.enquirerConfig = void 0;
const path_1 = require("path");
const consola_1 = require("consola");
const fs_extra_1 = require("fs-extra");
const enquirer_1 = require("enquirer");
function getAllScripts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const json = yield (0, fs_extra_1.readFile)((0, path_1.resolve)(process.cwd(), 'package.json'), { encoding: 'utf-8' });
            return Object.keys(JSON.parse(json).scripts);
        }
        catch (e) {
            consola_1.default.error('package.json 解析失败');
            process.exit(1);
        }
    });
}
function enquirerConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const choices = yield getAllScripts();
        const { script } = yield (0, enquirer_1.prompt)({
            name: 'script',
            type: 'select',
            message: '请选择运行脚本',
            required: true,
            choices,
        });
        let devtoolPath;
        while (true) {
            const { _path } = yield (0, enquirer_1.prompt)({
                name: '_path',
                type: 'input',
                message: '请输入微信开发者工具的安装路径',
                required: true,
            });
            if (!(0, fs_extra_1.existsSync)(_path)) {
                consola_1.default.error('该路径不存在，请重新输入');
            }
            else {
                devtoolPath = _path;
                break;
            }
        }
        const { appid } = yield (0, enquirer_1.prompt)({
            name: 'appid',
            type: 'input',
            required: true,
            message: '请输入 appid',
        });
        return { script, devtoolPath, appid };
    });
}
exports.enquirerConfig = enquirerConfig;
