import qs from "qs"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://giv-back.herokuapp.com"
  }${path}`
}

//process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
//https://giv-back.herokuapp.com/api/articles
///http://giv-back.herokuapp.com

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  // const requestUrl = `${getStrapiURL(
  // `/api${path}${queryString ? `?${queryString}` : ""}`
  //)}`

  const requestUrl = `${path}${queryString ? `?${queryString}` : ""}`

  //const requestUrl = `https://giv-back.herokuapp.com/api${path}`
  //console.log("DADASDASd")

  //const requestUrl = `https://giv-back.herokuapp.com/api/global`

  //console.log("DADASDASd")

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    //throw new Error(`An error occured please try again`)
    throw new Error(path + " " + response.statusText)
  }
  const data = await response.json()
  return data
}

/*

export async function fetchAPI2(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = path

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    //throw new Error(`An error occured please try again`)
    throw new Error(response.statusText)
  }
  const data = await response.json()
  return data
}
*/
