(() => {
  const assetMap = {
    "photo-1535025075092-5a1cf795130b.avif": {
      hash: "245644d559f6ddeacbbd31191ceb93298f16461d4c7e00571abd16e63fb29fda",
      path: "docs/assets/photo-1535025075092-5a1cf795130b.avif"
    },
    "photo-1599940824219-e6aa9be5fba2.avif": {
      hash: "df664937fcfaaf1bc1b4aa3cbe1e667b8ebff0f2d07a669520adc5e071f435d3",
      path: "docs/assets/photo-1599940824219-e6aa9be5fba2.avif"
    },
    "premium_photo-1664526284288-8c48dd6c38a7.avif": {
      hash: "38da1171bdcd17689e53281fa0d1ba5c41b802d9b116febee3a07b51c69d10ba",
      path: "docs/assets/premium_photo-1664526284288-8c48dd6c38a7.avif"
    }
  };

  function getWindowsPath(src) {
    const decodedSrc = decodeURIComponent(src ?? "");
    return /^[A-Za-z]:[\\/]/.test(decodedSrc) ? decodedSrc : null;
  }

  function getReplacementSrc(windowsPath) {
    const filename = windowsPath.replace(/\\/g, "/").split("/").pop();
    const asset = assetMap[filename];
    if (asset == null) {
      return null;
    }

    if (window.location.hostname.includes("localhost")) {
      const localPath = windowsPath.replace(/\\/g, "/").replace(/^[A-Za-z]:/, "");
      return `/_local${localPath}`;
    }

    return `https://files.buildwithfern.com/${window.location.host}/${asset.hash}/${asset.path}`;
  }

  function fixLocalImages() {
    document.querySelectorAll("img").forEach((image) => {
      const windowsPath = getWindowsPath(image.getAttribute("src"));
      if (windowsPath == null) {
        return;
      }

      const replacementSrc = getReplacementSrc(windowsPath);
      if (replacementSrc != null && image.getAttribute("src") !== replacementSrc) {
        image.setAttribute("src", replacementSrc);
      }
    });
  }

  function removeAskAiControls() {
    document.querySelectorAll('#fern-ask-ai-button, [data-mode="ask-ai"]').forEach((element) => {
      element.remove();
    });

    document.querySelectorAll('[role="menuitem"], [data-radix-collection-item]').forEach((element) => {
      const text = element.textContent ?? "";
      if (text.includes("Ask a question") || text.includes("Connect to Claude Code")) {
        element.remove();
      }
    });
  }

  function syncPage() {
    fixLocalImages();
    removeAskAiControls();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncPage, { once: true });
  } else {
    syncPage();
  }

  window.addEventListener("load", syncPage);
  new MutationObserver(syncPage).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
