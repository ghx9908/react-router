import { pathToRegexp } from "path-to-regexp"
// let regxp = pathToRegexp("/home", [], { end: true })
// console.log(regxp) //  /^\/home[\/#\?]?$/i

// console.log(regxp.test("/home")) //true
// console.log(regxp.test("/home?")) //true
// console.log(regxp.test("/home#")) //true
// console.log(regxp.test("/home/")) //true

// {end: false}
let regxp = pathToRegexp("/home", [], { end: false })
console.log(regxp)
// /^\/home(?:[\/#\?](?=[]|$))?(?=[\/#\?]|[]|$)/i
console.log(regxp.test("/home/aaa"))
