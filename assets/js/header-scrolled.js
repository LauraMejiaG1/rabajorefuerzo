document.addEventListener("scroll", function () {
    const header = document.getElementById("mainHeader");
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });
  