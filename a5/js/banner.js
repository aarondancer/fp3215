let imageElements = [];
let currentBannerIndex = 0;
let paused = false;

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
 * Cycles to the next banner image when not paused
 *
 * Satisfies: "Create a modularized function to cycle the homepage banner."
 */
function cycleBanner() {
  // When true, banner cycling will pause
  // Satisfies: "Create a cycling two-state banner that cycles every three seconds."
  if (paused === false) {
    // Increment the index or reset to 0
    currentBannerIndex =
      currentBannerIndex === imageElements.length - 1
        ? 0
        : currentBannerIndex + 1;

    // Set the visibility state for all banner image elements
    imageElements.forEach((el, index) => {
      el.style.display = index === currentBannerIndex ? "block" : "none";
    });
  }
}

/**
 * Iniitalizes mouseover and mouseout events for banner for pausing banner cycle
 *
 * Satisfies: "Create a cycling two-state banner..."
 */
function initializeBannerRolloverEvents(element) {
  // Pause when hovering over banners
  element.addEventListener("mouseover", () => {
    paused = true;
  });

  // Resume when no longer hovering over banners
  element.addEventListener("mouseout", () => {
    paused = false;
  });
}

// Load the images on page load
// Satisfies: "Create an onpageload function to preload all of your images."
window.addEventListener("load", () => {
  const bannerEl = document.getElementById("bannerImages");
  // Set banner `img` elements
  imageElements = Array.from(bannerEl.getElementsByTagName("img"));

  // Preload banner images
  // Satisfies: "Preload the images (banner1.jpg, banner2.jpg and banner3.jpg found in the images folder) for the banner at the top of the page."
  preloadImageElements(imageElements);

  // Begin cycling banner every 3 seconds
  cycleBanner();
  setInterval(cycleBanner, 3000);

  // Initialize banner rollover events
  initializeBannerRolloverEvents(bannerEl);
});
