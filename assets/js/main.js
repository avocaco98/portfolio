$(function () {
  $(function () {

  // =========================
  // 共通パーツ読み込み + 初期化
  // =========================
  const pathParts = location.pathname.replace(/^\/+/, "").split("/").filter(Boolean);
  let basePath = "./";
  if (pathParts.length === 2) {
    // works/work-001.html の場合
    basePath = "../";
  } else if (pathParts.length === 1 && pathParts[0] !== "index.html") {
    // about/index.html の場合
    basePath = "../";
  }

  const parts = ["header", "contact", "footer", "toTop"];

  parts.forEach((part) => {
    fetch(`${basePath}partials/${part}.html`)
      .then((res) => res.text())
      .then((html) => {
        const adjustedHtml = html.replace(
          /(src|href)="(?!https?:|mailto:|#)([^"]+)"/g,
          (match, attr, path) => `${attr}="${basePath}${path}"`
        );

        const target = document.getElementById(part);
        if (!target) return;
        target.innerHTML = adjustedHtml;

        if (part === "header") initHeader();
        if (part === "toTop") initToTopBtn();
      })
      .catch((err) => console.error(`Failed to load ${part}:`, err));
  });

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
});


  // // =========================
  // // 共通パーツ読み込み + 初期化
  // // =========================
  // const pathParts = location.pathname.replace(/^\/+/, "").split("/").filter(Boolean);
  // const depth = pathParts.length;
  // const basePath = depth > 1 ? "../".repeat(depth - 1) : "./";

  // const parts = ["header", "contact", "footer", "toTop"];

  // parts.forEach((part) => {
  //   fetch(`${basePath}partials/${part}.html`)
  //     .then((res) => res.text())
  //     .then((html) => {
  //       // 画像・リンクの相対パス補正（#や絶対URLは除外）
  //       const adjustedHtml = html.replace(
  //         /(src|href)="(?!https?:|mailto:|#)([^"]+)"/g,
  //         (match, attr, path) => `${attr}="${basePath}${path}"`
  //       );

  //       const target = document.getElementById(part);
  //       if (!target) return;
  //       target.innerHTML = adjustedHtml;

  //       // 初期化関数
  //       if (part === "header") initHeader();
  //       if (part === "toTop") initToTopBtn();
  //     })
  //     .catch((err) => console.error(`Failed to load ${part}:`, err));
  // });

  // // =========================
  // // ヘッダー初期化（ハンバーガー + #contactリンク）
  // // =========================
  // function initHeader() {
  //   // ハンバーガーメニュー
  //   $(".toggle-btn").on("click", function (e) {
  //     e.stopPropagation();
  //     $(this).toggleClass("open");
  //     $(".sp-menu").toggleClass("open");
  //     $("body").toggleClass("no-scroll");
  //   });

  //   $(document).on("click", function (e) {
  //     if (!$(e.target).closest(".sp-menu, .toggle-btn").length) {
  //       $(".sp-menu").removeClass("open");
  //       $(".toggle-btn").removeClass("open");
  //       $("body").removeClass("no-scroll");
  //     }
  //   });

  //   // #contactリンク スムーズスクロール（PC/SP共通）
  //   $(document).on("click", 'a[href="#contact"]', function (e) {
  //     e.preventDefault();
  //     const $target = $("#contact");
  //     if ($target.length) {
  //       const position = $target.offset().top;
  //       $("html, body").animate({ scrollTop: position }, 600);

  //       // SPメニューが開いていたら閉じる
  //       $(".sp-menu").removeClass("open");
  //       $(".toggle-btn").removeClass("open");
  //       $("body").removeClass("no-scroll");
  //     }
  //   });
  // }

  // // =========================
  // // トップへ戻るボタン
  // // =========================
  // function initToTopBtn() {
  //   const $btn = $("#toTopBtn");
  //   if ($btn.length === 0) return;

  //   $(window).on("scroll", function () {
  //     if ($(this).scrollTop() > 300) {
  //       $btn.addClass("show");
  //     } else {
  //       $btn.removeClass("show");
  //     }
  //   });

  //   $btn.on("click", function () {
  //     $("html, body").animate({ scrollTop: 0 }, 600);
  //   });
  // }

  // =========================
  // 隠しメッセージのトグル
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

  // =========================
  // IntersectionObserverでロゴアニメーション
  // =========================
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
