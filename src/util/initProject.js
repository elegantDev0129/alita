/**
 * Copyright (c) Areslabs.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import path from 'path'
import fse from 'fs-extra'
import child_process from 'child_process'
import {successInfo} from './util'


export default function initProject(operands, typescript) {
    console.log(`alita init ${typescript ? 'typescript': ''} ...`.info)
    console.log('\n')
    const initIndex = operands.indexOf('init')
    const projectName = operands[initIndex + 1]

    if (!projectName) {
        console.log('alita初始化 请指定项目名！'.error)
        return
    }

    const targetpath = path.resolve(projectName)

    const tempDir = path.resolve(__dirname, '..', '..', typescript ? 'rn-typescript-template' : 'rn-template')
    fse.copySync(tempDir, targetpath)

    const appJSPath = path.resolve(targetpath, 'App.js')
    if (fse.existsSync(appJSPath)) {
        fse.unlinkSync(appJSPath)
    }

    if (fse.existsSync(path.resolve(targetpath, 'yarn.lock'))) {
        child_process.execSync('yarn add @areslabs/router', {
            cwd: targetpath,
        })
        child_process.execSync('yarn add @areslabs/wx-animated', {
            cwd: targetpath,
        })
        child_process.execSync('yarn add @areslabs/stringutil-rn', {
            cwd: targetpath,
        })

        if (typescript) {
            child_process.execSync('yarn add --dev  @types/react-native', {
                cwd: targetpath,
            })
        }
    } else {
        child_process.execSync('npm install --save @areslabs/router', {
            cwd: targetpath,
        })
        child_process.execSync('npm install --save @areslabs/wx-animated', {
            cwd: targetpath,
        })
        child_process.execSync('npm install --save @areslabs/stringutil-rn', {
            cwd: targetpath,
        })

        if (typescript) {
            child_process.execSync('npm install --save-dev @types/react-native', {
                cwd: targetpath,
            })
        }
    }

    console.log('  Run instructions for 小程序:'.blue)
    console.log(`    • alita -i ${projectName} -o [目标小程序目录]   （若需要监听文件修改添加参数：--watch）`.black)
}