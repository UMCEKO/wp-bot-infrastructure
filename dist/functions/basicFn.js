"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFileAbsDirs = exports.getAllFileRelDirs = exports.getArgs = void 0;
const fs = require("fs");
const path = require("path");
function getArgs(message) {
    const [, ...args] = message.body.split(/\s| |\n/);
    return args;
}
exports.getArgs = getArgs;
function getAllFileAbsDirs(folderPath) {
    let folder = fs.readdirSync(folderPath);
    let fileDirs = [];
    for (let file of folder) {
        let filePath = path.join(folderPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            fileDirs.push(...getAllFileAbsDirs(filePath));
        }
        else {
            fileDirs.push(filePath);
        }
    }
    return fileDirs;
}
exports.getAllFileAbsDirs = getAllFileAbsDirs;
function getAllFileRelDirs(folderPath) {
    const fileDirs = getAllFileAbsDirs(folderPath);
    for (let i in fileDirs)
        fileDirs[i] = path.relative(__dirname, fileDirs[i]);
    return fileDirs;
}
exports.getAllFileRelDirs = getAllFileRelDirs;
//# sourceMappingURL=basicFn.js.map