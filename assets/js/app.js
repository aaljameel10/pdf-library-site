/*
 * الملف: app.js
 * يحتوي على وظائف بسيطة مثل تحديث سنة الفوتر، تشغيل قائمة الجوال،
 * وتفعيل البحث والتصفية في صفحات المؤلفات ومقاطع الفيديو.
 */

document.addEventListener("DOMContentLoaded", function () {
  // تحديث سنة الحقوق في الفوتر
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // القائمة في الجوال
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // البحث والتصفية في صفحة المؤلفات
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const yearFilter = document.getElementById("yearFilter");
  const booksList = document.getElementById("booksList");

  if (booksList) {
    const books = Array.from(booksList.getElementsByClassName("book-card"));

    function filterBooks() {
      const searchValue = (searchInput?.value || "").toLowerCase().trim();
      const categoryValue = categoryFilter?.value || "";
      const yearValue = yearFilter?.value || "";

      books.forEach((book) => {
        const title = (book.dataset.title || "").toLowerCase();
        const category = book.dataset.category || "";
        const year = book.dataset.year || "";

        const matchesSearch = !searchValue || title.includes(searchValue);
        const matchesCategory = !categoryValue || category === categoryValue;
        const matchesYear = !yearValue || year === yearValue;

        if (matchesSearch && matchesCategory && matchesYear) {
          book.style.display = "";
        } else {
          book.style.display = "none";
        }
      });
    }

    searchInput?.addEventListener("input", filterBooks);
    categoryFilter?.addEventListener("change", filterBooks);
    yearFilter?.addEventListener("change", filterBooks);
  }

  // البحث في صفحة الفيديو
  const videoSearchInput = document.getElementById("videoSearchInput");
  const videosList = document.getElementById("videosList");

  if (videosList && videoSearchInput) {
    const videos = Array.from(videosList.getElementsByClassName("video-card"));

    function filterVideos() {
      const searchValue = videoSearchInput.value.toLowerCase().trim();

      videos.forEach((video) => {
        const title = (video.dataset.title || "").toLowerCase();
        const matchesSearch = !searchValue || title.includes(searchValue);
        video.style.display = matchesSearch ? "" : "none";
      });
    }

    videoSearchInput.addEventListener("input", filterVideos);
  }
});
