$(function () {

  // =========================
  // 共通パーツ読み込み + 初期化
  // =========================
  let basePath = "./";
  const currentPath = location.pathname;

  // works/work-001.html や about/index.html のとき
  if (currentPath.includes("/works/") || currentPath.includes("/about/")) {
    basePath = "../";
  }

  const parts = ["header", "contact", "footer", "toTop"];

  parts.forEach((part) => {
    fetch(`${basePath}partials/${part}.html`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((html) => {
        // 相対パス補正
        const adjustedHtml = html.replace(
          /(src|href)="(?!https?:|mailto:|#)([^"]+)"/g,
          (match, attr, path) => `${attr}="${basePath}${path}"`
        );

        const target = document.getElementById(part);
        if (!target) return;
        target.innerHTML = adjustedHtml;

        // 読み込み後に初期化
        if (part === "header") initHeader();
        if (part === "toTop") initToTopBtn();
      })
      .catch((err) => console.error(`❌ Failed to load ${part}:`, err));
  });

  // =========================
  // ヘッダー初期化
  // =========================
  function initHeader() {
    $(".toggle-btn").on("click", function (e) {
      e.stopPropagation();
      $(this).toggleClass("open");
      $(".sp-menu").toggleClass("open");
      $("body").toggleClass("no-scroll");
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest(".sp-menu, .toggle-btn").length) {
        $(".sp-menu").removeClass("open");
        $(".toggle-btn").removeClass("open");
        $("body").removeClass("no-scroll");
      }
    });

    // #contact スムーズスクロール
    $(document).on("click", 'a[href="#contact"]', function (e) {
      e.preventDefault();
      const $target = $("#contact");
      if ($target.length) {
        const pos = $target.offset().top;
        $("html, body").animate({ scrollTop: pos }, 600);
        $(".sp-menu").removeClass("open");
        $(".toggle-btn").removeClass("open");
        $("body").removeClass("no-scroll");
      }
    });
  }

  // =========================
  // トップへ戻るボタン
  // =========================
  function initToTopBtn() {
    const $btn = $("#toTopBtn");
    if ($btn.length === 0) return;
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) $btn.addClass("show");
      else $btn.removeClass("show");
    });
    $btn.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
    });
  }

  // =========================
  // 隠しメッセージ + 戻るボタン + アニメーション
  // =========================
  $(".about__more__btn").on("click", function (e) {
    e.stopPropagation();
    $(".about__more__message").toggleClass("active");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".about__more__message, .about__more__btn").length) {
      $(".about__more__message").removeClass("active");
    }
  });

  $("#backBtn").on("click", function () {
    history.back();
  });

  $(".about__more__btn").on("touchstart mousedown", function () {
    $(this).addClass("pressed");
  });

  $(".about__more__btn").on("touchend mouseup mouseleave", function () {
    $(this).removeClass("pressed");
  });

  const wrappers = document.querySelectorAll(".message__logo-box");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".message__icon").forEach((box) => {
            box.classList.add("animate");
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  wrappers.forEach((wrapper) => observer.observe(wrapper));
});
