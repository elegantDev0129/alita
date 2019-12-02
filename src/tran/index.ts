/**
 * Copyright (c) Areslabs.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {geneReactCode} from '../util/uast'
import funcCompToClassComp from './funcCompToClassComp'
import childrenToTemplate from './childrenToTemplate'
import compPreHandle from './compPreHandle'
import addTempName from './addTempName'
import handleImportExpre from './handleImportExpre'
import geneJS from './geneJS'
import geneWxml from './geneWxml'
import geneWxss from './geneWxss'
import geneJSON from './geneJSON'
import geneAllTemplate from "./geneAllTemplate";
import compOutElementToBlock from './compOutElementToBlock'
import addEventHandler from './addEventHandler'
import addWXPrefixHandler from './addWXPrefixHandler'
import cptCompHandler from './cptCompHandler'
import literalTemplate from './literalTemplate'
import classNameHandler from './classNameHandler'

import allFilepaths from './allFilepaths'

export default function (ast, filepath, isFuncComp, isPageComp, webpackContext) {
    const info = {
        filepath: filepath,
        templates: [],
        childTemplates: [],
        outComp: [
            'render'
        ],
        json: {
            component: true,
            usingComponents: {},
            componentGenerics: {},
            disableScroll: true
        },

        isPageComp,
        isFuncComp,

        webpackContext,
    }

    if (isFuncComp) {
        ast = funcCompToClassComp(ast, info)
    }

    ast = compPreHandle(ast, info)

    ast = addWXPrefixHandler(ast, info)

    ast = cptCompHandler(ast, info)

    ast = compOutElementToBlock(ast, info)

    ast = addTempName(ast, info)

    ast = handleImportExpre(ast, info)

    ast = childrenToTemplate(ast, info)

    const reactCode = geneReactCode(ast)

    ast = literalTemplate(ast, info)

    ast = addEventHandler(ast, info)

    ast = classNameHandler(ast, info)

    ast = geneAllTemplate(ast, info)

    geneWxml(info)
    geneJSON(info)
    geneJS(info)
    geneWxss(info)


    return {
        code: reactCode,
        allFiles: allFilepaths(info)
    }
}