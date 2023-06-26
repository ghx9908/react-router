import React from "react"
export const LocationContext = React.createContext(null)
export const NavigationContext = React.createContext(null)
export const RouteContext = React.createContext({
  outlet: null,
  matches: [],
})
