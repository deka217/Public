function encryptURL(url) {
    // Simple encryption function (replace this with a stronger algorithm if needed)
    return btoa(url); // Using Base64 encoding for simplicity
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Get the hyperlink element with ID "myHiddenLink"
    var linkElement = document.getElementById("myHiddenLink");

    // Encryption of URL and replace it in the hyperlink element
    linkElement.href = encryptURL("https://vivichronia.com/controller.html");

    // Adding click event listener to the button with ID "myButton"
    document.getElementById("myButton").addEventListener("click", function () {
      // Decrypt the URL (replace this with the corresponding decryption logic if needed)
      var decryptedURL = atob(linkElement.href);

      // Redirect to the decrypted URL
      window.location.href = decryptedURL;
    });
  });    