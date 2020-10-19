/**
 * Gets all cookies, decodes them, and returns them as an object
 *
 * @param {*} names
 */
function getAllCookies(names) {
  const cookies = document.cookie.split(";");

  return cookies.reduce((o, entry) => {
    const [name, value] = entry.split("=");
    return { ...o, [name]: JSON.parse(decodeURIComponent(value)) };
  }, {});
}

/**
 * Encodes the given value and stores it in a named cookie
 *
 * @param {*} name
 * @param {*} value
 * @param {*} expires
 */
function setCookie(
  name,
  value,
  // Default to 30 days from now
  expires = new Date(Date.now() + 30 * 24 * 3600 * 1000)
) {
  document.cookie =
    name +
    "=" +
    encodeURIComponent(JSON.stringify(value)) +
    "; path=/; expires=" +
    expires.toGMTString();
}
