/**
 * Preloads an individual image from source URL
 *
 * @param {*} imgSrc
 */
function preloadImage(imgSrc) {
  const img = new Image();
  img.src = imgSrc;
}

/**
 * Preloads an array of image elements
 *
 * @param {*} els
 */
function preloadImageElements(els) {
  els.forEach((el) => preloadImage(el.src));
}

/**
 * Updates the gallery preview image from src URL
 * @param {*} src
 */
function updatePreviewSrc(src) {
  document.getElementById("preview").src = src;
}

/**
 * Iniitalizes mouseover and mouseout events for gallery items
 *
 * Satisfies: "Create rollover functionality for each of the thumbnails in your image gallery. Use appropriate images found in the images folder."
 */
function initializeGalleryItemRolloverEvents(element) {
  const src = element.getElementsByTagName("img")[0].src;

  // Set image source when hovering over thumbnail
  element.addEventListener("mouseover", () => updatePreviewSrc(src));

  // Clear when no longer hovering over thumbnail
  element.addEventListener("mouseout", () => updatePreviewSrc(""));
}

// Load the images on page load
// Satisfies: "Create an onpageload function to preload all of your images."
window.addEventListener("load", () => {
  const galleryEl = document.getElementById("gallery");
  // Set gallery thumbnail and `img` elements
  galleryElements = Array.from(galleryEl.getElementsByClassName("gallery"));
  imageElements = Array.from(galleryEl.getElementsByTagName("img"));

  // Preload gallery images
  // Satisfies: "Preload the gallery images."
  preloadImageElements(imageElements);

  // Initialize gallery rollover events
  galleryElements.forEach(initializeGalleryItemRolloverEvents);
});
