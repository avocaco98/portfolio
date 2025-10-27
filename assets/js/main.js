$(function () {
  // ▼ 共通パーツ読み込みスクリプト ▼

  // ページ階層に応じてベースパスを決定
  const depth = location.pathname.split("/").filter(Boolean).length;
  const basePath = depth > 1 ? "../".repeat(depth - 1) : "./";

  // 共通パーツ一覧
  const parts = ["header", "contact", "footer", "toTop"];

  parts.forEach((part) => {
    fetch(`${basePath}partials/${part}.html`)
      .then((res) => res.text())
      .then((html) => {
        // 相対パスを補正（画像・リンク両方対応）
        const adjustedHtml = html.replace(
          /(src|href)="(?!https?:|mailto:)([^"]+)"/g,
          (match, attr, path) => `${attr}="${basePath}${path}"`
        );

        const target = document.getElementById(part);
        if (!target) return;
        target.innerHTML = adjustedHtml;

        // 読み込み後に初期化関数を実行
        if (part === "header") initHamburger();
        if (part === "toTop") initToTopBtn();
      })
      .catch((err) => console.error(`Failed to load ${part}:`, err));
  });

  // =========================
  // ハンバーガーメニュー
  // =========================
  function initHamburger() {
    $(".toggle-btn").on("click", function (e) {
      e.stopPropagation();
      $(this).toggleClass("open");
      $(".sp-menu").toggleClass("open");
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest(".sp-menu, .toggle-btn").length) {
        $(".sp-menu").removeClass("open");
        $(".toggle-btn").removeClass("open");
      }
    });
  }

  // ▼ ハンバーガーメニュー初期化関数 ▼
  function initHamburger() {
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
  }

  // =========================
// お問い合わせリンクのスムーススクロール
// =========================
$(document).on("click", 'a[href="#contact"]', function (e) {
  e.preventDefault();

  const $target = $("#contact");
  if ($target.length) {
    const position = $target.offset().top;
    $("html, body").animate({ scrollTop: position }, 600);
  }
});

  // =========================
  // トップへ戻るボタン
  // =========================
  function initToTopBtn() {
    const $btn = $("#toTopBtn");
    if ($btn.length === 0) return; // ← ここ追加！

    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        $btn.addClass("show");
      } else {
        $btn.removeClass("show");
      }
    });

    $btn.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
    });
  }

  // メッセージロゴのアニメーション
  // 全ての box-wrapper を監視
  const wrappers = document.querySelectorAll(".message__logo-box");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // box-wrapper 内の box に .animate を付与
          entry.target.querySelectorAll(".message__icon").forEach((box) => {
            box.classList.add("animate");
          });
          // 一度アニメーションしたら監視解除（リピートさせたくない場合）
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // 画面に30%見えたら発火
    }
  );

  // 監視スタート
  wrappers.forEach((wrapper) => observer.observe(wrapper));

  // 隠しメッセージ
  $(".about__more__btn").on("click", function (e) {
    e.stopPropagation();
    $(".about__more__message").toggleClass("active");
  });

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".about__more__message, .about__more__btn").length
    ) {
      $(".about__more__message").removeClass("active");
    }
  });

  $("#backBtn").on("click", function () {
    history.back();
  });

  //隠しメッセージのボタン
  $(".about__more__btn").on("touchstart mousedown", function () {
    $(this).addClass("pressed");
  });

  $(".about__more__btn").on("touchend mouseup mouseleave", function () {
    $(this).removeClass("pressed");
  });

});
