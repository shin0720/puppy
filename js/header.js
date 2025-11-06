$(function () {
  // 햄버거 클릭 시 메뉴 토글
  $(".header_mbnav").on("click", function () {
    $(".header_nav ul").toggleClass("show");
  });

  // 화면 크기 변경 시 초기화 (800px 이상이면 항상 메뉴 보이게)
  $(window).on("resize", function () {
    if ($(window).width() > 800) {
      $(".header_nav ul").removeClass("show").attr("style", "");
    }
  });
});