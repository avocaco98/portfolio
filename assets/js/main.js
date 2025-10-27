$(function () {
// =========================
// ページ階層に応じたベースパス設定
// =========================
const depth = location.pathname.split("/").filter(Boolean).length;
const basePath = depth > 1 ? "../".repeat(depth - 1) : "./";

// =========================
// 共通パーツ読み込み
// =========================
const parts = ["header", "contact", "footer", "toTop"];

parts.forEach((part) => {
  fetch(`${basePath}partials/${part}.html`)
    .then((res) => res.text())
    .then((html) => {
      // 相対パスを補正（画像・リンク両方）
      const adjustedHtml = html.replace(
        /(src|href)="(?!https?:|mailto:)([^"]+)"/g,
        (match, attr, path) => `${attr}="${basePath}${path}"`
      );

      const target = document.getElementById(part);
      if (!target) return;
      target.innerHTML = adjustedHtml;

      // パーツ読み込み後に初期化関数を実行
      if (part === "header") initHamburger();
      if (part === "toTop") initToTopBtn();
      if (part === "contact") initContactLinks(); // #contactリンク初期化
    })
    .catch((err) => console.error(`Failed to load ${part}:`, err));
});

// =========================
// ハンバーガーメニュー初期化
// =========================
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
// トップへ戻るボタン初期化
// =========================
function initToTopBtn() {
  const $btn = $("#toTopBtn");
  if ($btn.length === 0) return;

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

  // =========================
// #contactリンクのスムーズスクロール（共通）
// =========================
function initContactLinks() {
  // headerもSPメニューもまとめて処理
  $(document).on("click", 'a[href="#contact"]', function (e) {
    e.preventDefault();

    const $target = $("#contact");
    if ($target.length) {
      const position = $target.offset().top;
      $("html, body").animate({ scrollTop: position }, 600);

      // SPメニューが開いていたら閉じる
      $(".sp-menu").removeClass("open");
      $(".toggle-btn").removeClass("open");
      $("body").removeClass("no-scroll");
    }
  });
}

// // =========================
// // お問い合わせリンク（共通・PC/SP共通対応）
// // =========================
// $(document).on("click", 'a[href="#contact"]', function (e) {
//   e.preventDefault();

//   const $target = $("#contact");
//   if ($target.length) {
//     // SPメニューが開いている場合は閉じる
//     $(".sp-menu").removeClass("open");
//     $(".toggle-btn").removeClass("open");
//     $("body").removeClass("no-scroll");

//     // 同じページ内にスクロール
//     const position = $target.offset().top;
//     $("html, body").animate({ scrollTop: position }, 600);
//   }
//   // もし $target が存在しなければ何もしない
// });


// // =========================
// // #contactリンク初期化（スムーズスクロール）
// // =========================
// function initContactLinks() {
//   $(document).on("click", 'a[href="#contact"]', function (e) {
//     e.preventDefault();
//     const $target = $("#contact");
//     if ($target.length) {
//       const position = $target.offset().top;
//       $("html, body").animate({ scrollTop: position }, 600);
//     }
//   });
// }

  
//   // =========================
// // 共通パーツ読み込み
// // =========================

// // ページ階層に応じてベースパスを決定
// const depth = location.pathname.split("/").filter(Boolean).length;
// const basePath = depth > 1 ? "../".repeat(depth - 1) : "./";

// // 読み込む共通パーツ一覧
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
//       if (part === "header") initHamburger();
//       if (part === "toTop") initToTopBtn();
//     })
//     .catch((err) => console.error(`Failed to load ${part}:`, err));
// });

// // =========================
// // ハンバーガーメニュー
// // =========================
// function initHamburger() {
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

// // =========================
// // お問い合わせリンク（共通）
// // =========================
// $(document).on("click", 'a[href="#contact"]', function (e) {
//   e.preventDefault();

//   const $target = $("#contact");
//   if ($target.length) {
//     // 同じページ内にある場合はスクロール
//     const position = $target.offset().top;
//     $("html, body").animate({ scrollTop: position }, 600);
//   }
// });

  
//   // ▼ 共通パーツ読み込みスクリプト ▼

//   // ページ階層に応じてベースパスを決定
//   const depth = location.pathname.split("/").filter(Boolean).length;
//   const basePath = depth > 1 ? "../".repeat(depth - 1) : "./";

//   // 共通パーツ一覧
//   const parts = ["header", "contact", "footer", "toTop"];

//   parts.forEach((part) => {
//     fetch(`${basePath}partials/${part}.html`)
//       .then((res) => res.text())
//       .then((html) => {
//         // 相対パスを補正（画像・リンク両方対応）
//         const adjustedHtml = html.replace(
//           /(src|href)="(?!https?:|mailto:)([^"]+)"/g,
//           (match, attr, path) => `${attr}="${basePath}${path}"`
//         );

//         const target = document.getElementById(part);
//         if (!target) return;
//         target.innerHTML = adjustedHtml;

//         // 読み込み後に初期化関数を実行
//         if (part === "header") initHamburger();
//         if (part === "toTop") initToTopBtn();
//       })
//       .catch((err) => console.error(`Failed to load ${part}:`, err));
//   });

//   // =========================
//   // ハンバーガーメニュー
//   // =========================
//   function initHamburger() {
//     $(".toggle-btn").on("click", function (e) {
//       e.stopPropagation();
//       $(this).toggleClass("open");
//       $(".sp-menu").toggleClass("open");
//     });

//     $(document).on("click", function (e) {
//       if (!$(e.target).closest(".sp-menu, .toggle-btn").length) {
//         $(".sp-menu").removeClass("open");
//         $(".toggle-btn").removeClass("open");
//       }
//     });
//   }

  
// // =========================
// // お問い合わせリンク（共通）
// // =========================
// $(document).on("click", 'a[href="#contact"]', function (e) {
//   e.preventDefault();

//   const $target = $("#contact");
//   if ($target.length) {
//     const position = $target.offset().top;
//     $("html, body").animate({ scrollTop: position }, 600);
//   }
// });

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
