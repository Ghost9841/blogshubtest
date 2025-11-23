export const copyLink = () =>
  navigator.clipboard.writeText(window.location.href).then(() => alert("Link copied!"));