/**
 * Copyright (c) Areslabs.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
 
const OBJECT = {}
const FUNC = function () {
    return OBJECT
}

export default {
    array: OBJECT,
    bool: OBJECT,
    func: OBJECT,
    number: OBJECT,
    object: OBJECT,
    string: OBJECT,
    symbol: OBJECT,

    any: FUNC,
    arrayOf: FUNC,
    element: FUNC,
    instanceOf: FUNC,
    node: FUNC,
    objectOf: FUNC,
    oneOf: FUNC,
    oneOfType: FUNC,
    shape: FUNC,
    exact: FUNC
}