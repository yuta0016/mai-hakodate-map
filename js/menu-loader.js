// menu-loader.js
function generateMenu(homePath = 'index.html', spotsPath = 'spots/', isDetailPage = false) {
  const aboutPath = isDetailPage ? '../about.html' : 'about.html';
  const contactPath = isDetailPage ? '../contact.html' : 'contact.html';
  const menuHTML = `
    <div class="header">
      <button class="hamburger" aria-label="メニュー" aria-controls="nav-menu" aria-expanded="false">
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
        <span class="hamburger__label">MENU</span>
      </button>

      <nav id="nav-menu" class="nav" aria-hidden="true">
        <ul class="nav__list">
          <li class="nav__item"><a href="${homePath}" class="nav__link">ホーム</a></li>
          <li class="nav__item"><a href="${aboutPath}" class="nav__link">about</a></li>
          
          <!-- スポット一覧（展開可能） -->
          <li class="nav__item nav__item--expandable">
            <button class="nav__link nav__link--toggle" data-target="spots-menu">
              <span class="nav__link-text">スポット一覧</span>
              <span class="nav__toggle-icon">+</span>
            </button>
            <ul class="nav__submenu" id="spots-menu">
              <li class="nav__subitem"><a href="${spotsPath}onuma.html" class="nav__sublink">大沼国定公園</a></li>
              <li class="nav__subitem"><a href="${spotsPath}lucky-pierrot.html" class="nav__sublink">ラッキーピエロ ベイエリア本店</a></li>
              <li class="nav__subitem"><a href="${spotsPath}romantico-romantica.html" class="nav__sublink">ROMANTiCO ROMANTiCA</a></li>
              <li class="nav__subitem"><a href="${spotsPath}hakodate-bierhall.html" class="nav__sublink">函館ビヤホール</a></li>
              <li class="nav__subitem"><a href="${spotsPath}hachiman-zaka.html" class="nav__sublink">八幡坂</a></li>
              <li class="nav__subitem"><a href="${spotsPath}hakodate-romankan.html" class="nav__sublink">函館浪漫館</a></li>
              <li class="nav__subitem"><a href="${spotsPath}hakodate-asaichi.html" class="nav__sublink">函館朝市ひろば</a></li>
              <li class="nav__subitem"><a href="${spotsPath}kaisenndokoro-hakodateyama.html" class="nav__sublink">海鮮処 函館山</a></li>
            </ul>
          </li>
          
          <li class="nav__item"><a href="${isDetailPage ? '../access.html' : 'access.html'}" class="nav__link">函館までのアクセス</a></li>
          <li class="nav__item"><a href="${isDetailPage ? '../tickets.html' : 'tickets.html'}" class="nav__link">お得な乗車券</a></li>
          <li class="nav__item"><a href="${contactPath}" class="nav__link">お問い合わせ</a></li>
        </ul>
      </nav>
    </div>
  `;

  // メニューを body の最初に挿入（ただし head の後）
  if (document.body.firstChild) {
    document.body.insertBefore(
      document.createRange().createContextualFragment(menuHTML),
      document.body.firstChild
    );
  } else {
    document.body.innerHTML = menuHTML + document.body.innerHTML;
  }
  
  // メニュー機能を初期化
  initializeMenu();
}

function initializeMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (!hamburger || !nav) return;

  // ハンバーガーメニューの開閉
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');

    // アクセシビリティ対応
    const isOpen = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    nav.setAttribute('aria-hidden', !isOpen);
  });

  // メニューの外側をクリックした時の処理
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && !e.target.closest('.hamburger') && nav.classList.contains('active')) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
      nav.setAttribute('aria-hidden', true);
    }
  });

  // サブメニューの展開/折りたたみ
  const toggleButtons = document.querySelectorAll('.nav__link--toggle');
  toggleButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-target');
      const submenu = document.getElementById(targetId);

      // ボタンのアクティブ状態を切り替え
      button.classList.toggle('active');

      // サブメニューのアクティブ状態を切り替え
      submenu.classList.toggle('active');
    });
  });
}

// DOMContentLoaded 時にメニューを生成
document.addEventListener('DOMContentLoaded', () => {
  // ホームページと詳細ページで異なるパスを設定
  const isDetailPage = window.location.pathname.includes('/spots/');
  const homePath = isDetailPage ? '../index.html' : 'index.html';
  const spotsPath = isDetailPage ? '' : 'spots/';
  
  generateMenu(homePath, spotsPath, isDetailPage);
});

