import { pathToRegexp } from "path-to-regexp"
let params = []

const regexp = pathToRegexp("/user/:name/:age", params)
// /^\/user(?:\/([^\/#\?]+?))(?:\/([^\/#\?]+?))[\/#\?]?$/i
console.log("regexp=>", regexp)
let result = "/user/ghx/16".match(regexp)
console.log("result=>", result)
console.log("params=>", params)
let paramNames = params.map((item) => item.name)
let paramValues = result.slice(1)
const matchedParams = {}
paramNames.forEach((key, index) => {
  matchedParams[key] = paramValues[index]
})
console.log("matchedParams=>", matchedParams)
