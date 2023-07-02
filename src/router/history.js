// 定义action类型
const Action = {
  Pop: "POP", // 默认action
  Push: "PUSH",
  Replace: "REPLACE",
}
// 定义popstate事件类型
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
    let href = hashIndex !== -1 ? url : url.slice(0, hashIndex)
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
/**
 * 创建路由history
 * @param {*} getLocation  获取当前 location 信息的函数
 * @param {*} createHarf 创建具体 href 的函数
 * @returns
 */
function getUrlBashHistory(getLocation, createHarf) {
  // 获取全局history对象
  const globalHistory = window.history
  // 存储监听函数
  let listener = null
  // 当前索引
  let index = getIndex()
  // 如果index为空,初始化为0
  if (index === null) {
    index = 0
    // 使用replaceState初始化
    globalHistory.replaceState(
      {
        usr: globalHistory.state,
        idx: index, // 在原来的基础上添加一个索引
      },
      ""
    )
  }
  // 获取索引的函数
  function getIndex() {
    let state = globalHistory.state || { idx: null }
    return state.idx
  }

  // popstate事件(也就是路由变化)时调用监听函数
  function handlePop() {
    // 设置action类型为 Pop
    action = Action.Pop
    // 获取最新索引
    let nextIndex = getIndex()
    // 计算索引变化量
    let delta = nextIndex == null ? null : nextIndex - index
    // 更新索引
    index = nextIndex
    // 调用监听函数,传递action、location和索引变化量
    if (listener) {
      listener({
        action,
        location: history.location,
        delta,
      })
    }
  }

  /**
   *  通过pushState()方法改变路由历史记录 调用监听函数,传入变更信息
   * @param {*} to
   * @param {*} state
   */
  function push(to, state) {
    // 将索引 +1
    index = getIndex() + 1
    // 设置action为Push类型
    action = Action.Push
    // 根据路径创建url
    const url = createHarf(to)
    // 使用pushState方法改变历史
    globalHistory.pushState({ idx: index, usr: state }, "", url)
    if (listener) {
      // 调用监听函数,传递action、location和变更索引(delta为1)
      listener({ action, location: history.location, delta: 1 })
    }
  }
  // 可以认为push()方法负责:
  //  - 记录路由历史
  //  -调用监听函数, 传递变更信息
  // 而监听函数则负责:
  //  -获取变更信息
  //  - 根据变更信息进行路由匹配和渲染

  function replace(to, state) {
    // 设置action为Replace类型
    action = Action.Replace
    // 获取当前索引
    index = getIndex()
    // 根据路径创建URL
    let url = history.createHref(to)
    // 使用replaceState()替换历史记录
    globalHistory.replaceState(
      {
        idx: index,
        usr: state,
      },
      "",
      url
    )
    // 如果有监听函数
    if (listener) {
      // 传递变更信息给监听函数
      listener({
        action,
        location: history.location,
        delta: 0,
      })
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
    replace,
    listen(fn) {
      // 订阅popstate事件
      window.addEventListener(PopstateEventType, handlePop)
      // 存储监听函数
      listener = fn
      // 返回移除监听功能的函数
      return () => {
        // 移除事件监听
        window.removeEventListener(PopstateEventType, handlePop)
        // 清空监听函数
        listener = null
      }
    },
    go(n) {
      return globalHistory.go(n)
    },
  }
  return history
}
