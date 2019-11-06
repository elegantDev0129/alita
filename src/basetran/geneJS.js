/**
 * Copyright (c) Areslabs.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
 
import fse from "fs-extra"
import {miscNameToJSName} from '../util/util'
const prettier = require("prettier")
const path = require('path')


export default function (code, info) {
    let {filepath} = info
    filepath = miscNameToJSName(filepath)

    const prettierCode = prettier.format(code, {
        semi: false,
        parser: "babylon",
        tabWidth: 4,
    })

    const dirname = path.dirname(filepath)
    fse.mkdirsSync(dirname)


    fse.writeFileSync(
        filepath,
        prettierCode,
    )
}