export const copyLink = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert("Link copied!"))
      .catch(err => alert("Failed to copy link: " + err));
  } else {
    alert("Clipboard API not supported.");
  }
};