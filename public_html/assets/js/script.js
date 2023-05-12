// ハンバーガーメニュー
$(function () {
  var toggleClass = function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer").toggleClass("is-active");
    $(".js-drawer__list").toggleClass("is-active");
    $("body").toggleClass("is-fixed");
    if ($(".js-drawer").hasClass("is-active")) {
      $(".hamburger__dot span, .hamburger__line span").css(
        "background-color",
        "#fcfcfc"
      );
    } else {
      $(".hamburger__dot span, .hamburger__line span").css(
        "background-color",
        "#f45f5f"
      );
    }
    const drawer = document.querySelector(".js-drawer");

    if (drawer.classList.contains("is-active")) {
      backfaceFixed(true);
    } else {
      backfaceFixed(false);
    }
  };

  $(".js-hamburger").click(function () {
    toggleClass();
  });

  $(".drawer__link").click(function () {
    toggleClass();
  });
});

// スワイパー1
window.addEventListener("DOMContentLoaded", function () {
  const swiper01 = new Swiper(".fv__swiper", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
});

// スワイパー2
window.addEventListener("DOMContentLoaded", function () {
  const swiper02 = new Swiper(".voice__slider", {
    loop: true,
    spaceBetween: 15,
    navigation: {
      nextEl: ".swiper-button-next.swiper-button-next--custom",
      prevEl: ".swiper-button-prev.swiper-button-prev--custom",
    },
    speed: 3000,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    breakpoints: {
      769: {
        paginationClickable: false,

        navigation: {
          nextEl: null,
          prevEl: null,
        },
        autoplay: {
          delay: 0,
        },
        speed: 8000,
        slidesPerView: 6,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 30,
      },
    },
    on: {
      resize: function () {
        swiper02.autoplay.start();
      },
    },
  });
});

// モーダル
window.addEventListener("load", function () {
  //------モーダル開く定義--------

  var modalTrigger = document.querySelector(".js-modal-trigger");
  modalTrigger.addEventListener("click", function () {
    var modalID = modalTrigger.getAttribute("data-modal-trigger");

    var modal = document.getElementById(modalID);
    // -------------

    // -----モーダル閉じる定義------
    var modalCloseButtons = document.querySelectorAll(".js-modal-close");
    // --------------

    // 実行

    modal.classList.add("is-active");
    modal.addEventListener("click", (event) => {
      if (event.target.closest(".modal__content") === null) {
        modal.classList.remove("is-active");
      }
    });
  });
});

// アコーディオン
window.addEventListener("load", function () {
  // スライドできるようにする関数--------------
  // slideUp
  function slideUp(el, duration = 500) {
    el.style.height = el.offsetHeight + "px";
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    setTimeout(() => {
      el.style.display = "none";
      el.style.removeProperty("height");
      el.style.removeProperty("padding-top");
      el.style.removeProperty("padding-bottom");
      el.style.removeProperty("margin-top");
      el.style.removeProperty("margin-bottom");
      el.style.removeProperty("overflow");
      el.style.removeProperty("transition-duration");
      el.style.removeProperty("transition-property");
      el.style.removeProperty("transition-timing-function");
    }, duration);
  }

  // slideDown
  function slideDown(el, duration = 500) {
    el.style.removeProperty("display");
    let display = window.getComputedStyle(el).display;
    if (display === "none") {
      display = "block";
    }
    el.style.display = display;
    let height = el.offsetHeight;
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.height = height + "px";
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    setTimeout(() => {
      el.style.removeProperty("height");
      el.style.removeProperty("overflow");
      el.style.removeProperty("transition-duration");
      el.style.removeProperty("transition-property");
      el.style.removeProperty("transition-timing-function");
    }, duration);
  }

  // slideToggle
  function slideToggle(el, duration = 500) {
    if (window.getComputedStyle(el).display === "none") {
      return slideDown(el, duration);
    } else {
      return slideUp(el, duration);
    }
  }

  // ----------------------

  // 同じ階層(並列or兄弟)の要素全て取得する関数-------
  function getSiblings(e) {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
      return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;

    // collecting siblings
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  }

  // ---------------------

  //親要素の同じ階層の要素すべて取得する関数--------
  function getParents(element) {
    var parent = element.parentNode;
    // 親要素の兄弟要素（ひとつめクリックしたら二つ目三つ目の親要素）を取得（叔母ポジ）
    return getSiblings(parent);
  }

  // ---------------------

  // タイトル３つとも取得
  var accordionTitle = document.querySelectorAll(".accordion__title");
  // コンテンツ３つとも取得
  var accordionContent = document.querySelectorAll(".accordion__content");
  // それぞれのタイトルにインデックス番号をつける
  accordionTitle.forEach((accordionTitle) => {
    accordionTitle.addEventListener("click", function () {
      // クリックしたものに対してプラスマイナスの付け替え
      accordionTitle.classList.toggle("is-active");
      // タイトルの兄弟要素であるコンテンツをスライドして表示
      slideToggle(accordionTitle.nextElementSibling);

      // 常に開いているアコーディオンは一つの状態に保つ-------
      var accordionItems = getParents(accordionTitle);
      accordionItems.forEach((accordionItem) => {
        // ターゲットとなるタイトルとコンテンツをそれぞれ取得
        var targetTitle = accordionItem.querySelector(".accordion__title");
        var targetContent = accordionItem.querySelector(".accordion__content");
        // コンテンツをスライドして隠す
        slideUp(targetContent);
        // ターゲットのプラスをマイナスに切り替え
        targetTitle.classList.remove("is-active");
      });
    });
  });

  // -----------------
});

// ページトップボタン
window.addEventListener("DOMContentLoaded", function () {
  var pageTopBtn = document.querySelector(".pageTopButton");
  pageTopBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 100) {
      pageTopBtn.classList.add("is-visible");
    } else {
      pageTopBtn.classList.remove("is-visible");
    }
  });
});

// バリデーションチェック
const form = document.getElementById("entry-form");
const input = form.querySelector(".form__input-text");
const error = form.querySelector(".error-message");

input.addEventListener(".form__input-text", (event) => {
  if (input.checkValidity()) {
    input.classList.remove("invalid");
    error.style.display = "none";
  } else {
    input.classList.add("invalid");
    error.style.display = "block";
  }
});

form.addEventListener("submit", (event) => {
  if (!input.checkValidity()) {
    event.preventDefault();
    input.classList.add("invalid");
    error.style.display = "block";
  }
});
