import { getSetting } from './interface'

export function isSystemPage(tab) {
  return tab.active && isSystemLink(tab.url)
}

export function isSystemLink(link) {
  return (
    link.startsWith('chrome://') ||
    link.startsWith('chrome-extension://') ||
    link.startsWith('chrome-search://')
  )
}

export async function getAccessToken() {
  return await getSetting('access_token')
}

export function getCurrentLanguageCode() {
  var language = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage

  language = typeof language !== 'undefined' ? language.toLowerCase() : 'en'

  if (language.indexOf('en') === 0) return 'en' // English
  if (language.indexOf('de') === 0) return 'de' // German
  if (language.indexOf('fr') === 0) return 'fr' // French
  if (language.indexOf('it') === 0) return 'it' // Italian
  if (language.indexOf('es_419') === 0) return 'es_419' // Spanish (Latin America and Caribbean)
  if (language.indexOf('es') === 0) return 'es' // Spanish
  if (language.indexOf('ja') === 0) return 'ja' // Japanese
  if (language.indexOf('ru') === 0) return 'ru' // Russian
  if (language.indexOf('ko') === 0) return 'ko' // Korean
  if (language.indexOf('nl') === 0) return 'nl' // Dutch
  if (language.indexOf('pl') === 0) return 'pl' // Polish
  if (language.indexOf('pt_BR') === 0) return 'pt_BR' // Portuguese Brazil
  if (language.indexOf('pt_PT') === 0) return 'pt_PT' // Portuguese Portugal
  if (language.indexOf('zh_CN') === 0) return 'zh_CN' // Chinese Simplified
  if (language.indexOf('zh_TW') === 0) return 'zh_TW' // Chinese Traditional
  return 'en' // Default is English
}

export function checkDuplicate(list, tagValue) {
  return list.filter((tag) => tag.name === tagValue).length
}

export function closeLoginPage() {
  chrome.tabs.query(
    { url: '*://getpocket.com/extension_login_success' },
    (tabs) => {
      chrome.tabs.remove(tabs.map((tab) => tab.id))
    },
  )
}

export function deriveItemData(item) {
  return {
    itemId: item?.item_id,
    title: displayTitle(item),
    thumbnail: displayThumbnail(item),
    publisher: displayPublisher(item)
  }
}

/** TITLE
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The most appropriate title to show
 */
 export function displayTitle(item) {
  return (
    item?.title ||
    item?.resolved_title ||
    item?.given_title ||
    item?.display_url ||
    displayPublisher(item) ||
    null
  )
}

/** PUBLISHER
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The best text to display as the publisher of this item
 */
 export function displayPublisher(item) {
  const urlToUse = item?.given_url || item?.resolved_url
  const derivedDomain = domainForUrl(urlToUse)
  return (
    item?.domain_metadata?.name ||
    item?.domain ||
    derivedDomain ||
    null
  )
}

/**
 * DOMAIN FOR URL
 * Get the base domain for a given url
 * @param {url} url Url to get domain from
 * @return {string} parsed domain
 */
 export function domainForUrl(url) {
  if (!url) return false
  const match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im)
  return match[1]
}

/** THUMBNAIL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string:url} The most appropriate image to show as a thumbnail
 */
 export function displayThumbnail(item) {
  return (
    item?.top_image_url ||
    item?.image?.src ||
    item?.images?.[Object.keys(item.images)[0]]?.src ||
    null
  )
}

/**
 * Helper function to figure out what the CSS class name should be based on the
 * mode name that maps to the current OS color mode.
 * @return  {String}  Formatted CSS class name
 */
 export function getOSModeClass() {
  if (!window.matchMedia) return 'light'

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
  const isNotSpecified = window.matchMedia(
    '(prefers-color-scheme: no-preference)'
  ).matches
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified
  let mode

  if (isLightMode) {
    mode = 'light'
  }
  if (isDarkMode) {
    mode = 'dark'
  }
  // fallback if no system setting
  if (isNotSpecified || hasNoSupport) {
    mode = 'light'
  }

  return mode
}
