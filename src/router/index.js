const Action = {
  Pop: "POP",
  Push: "PUSH",
}
const PopstateEventType = "popstate"
let action = Action.Pop

export function createHashHistory() {
  if (!window.location.hash) {
    window.location.hash = "/"
  }
  function getHashLocation(window, globalHistory) {
    const pathname = window.location.hash.substr(1)
    const state = globalHistory.state || {}
    return { pathname, state: state.usr }
  }
  function createHashHref(to) {
    let url = window.location.href
    let hashIndex = url.indexOf("#")
    // /user#xxx /user
    let href = hashIndex !== -1 ? url : url.slice(1, hashIndex)
    return href + "#" + to
  }
  return getUrlBashHistory(getHashLocation, createHashHref)
}
export function createBrowserHistory() {
  function getBrowserLocation(window, globalHistory) {
    const { pathname } = window.location
    const state = globalHistory.state || {}
    return { pathname, state: state.usr }
  }
  function createBrowserHref(to) {
    return to
  }
  return getUrlBashHistory(getBrowserLocation, createBrowserHref)
}

function getUrlBashHistory(getLocation, createHarf) {
  const globalHistory = window.history
  let listener = null
  let index = getIndex()
  if (index === null) {
    index = 0
    globalHistory.replaceState(
      {
        usr: globalHistory.state,
        idx: index, // 在原来的基础上添加一个索引
      },
      ""
    )
  }
  function getIndex() {
    let state = globalHistory.state || { idx: null }
    return state.idx
  }
  function handlePop() {
    action = Action.Pop
    const nextIndex = getIndex()
    index = nextIndex
    if (listener) {
      listener({ location: history.location })
    }
  }
  function push(to, state) {
    index = getIndex() + 1
    action = Action.Push
    const url = createHarf(to)
    globalHistory.pushState({ idx: index, usr: state }, "", url)
    if (listener) {
      listener({ location: history.location })
    }
  }
  let history = {
    get index() {
      return index
    },
    get action() {
      return action
    },
    get location() {
      return getLocation(window, globalHistory)
    },
    push,
    listen(fn) {
      window.addEventListener(PopstateEventType, handlePop)
      listener = fn
      return () => {
        window.removeEventListener(PopstateEventType, handlePop)
        listener = null
      }
    },
    go(n) {
      return globalHistory.go(n)
    },
  }
  return history
}
