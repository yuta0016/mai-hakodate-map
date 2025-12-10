// menu-loader.js
function generateMenu(homePath = 'index.html', spotsPath = 'spots/') {
  const menuHTML = `
    <div class="header">
      <button class="hamburger" aria-label="メニュー" aria-controls="nav-menu" aria-expanded="false">
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
      </button>

      <nav id="nav-menu" class="nav" aria-hidden="true">
        <ul class="nav__list">
          <li class="nav__item"><a href="${homePath}" class="nav__link">ホーム</a></li>
          <li class="nav__item"><a href="#" class="nav__link">about</a></li>
          
          <!-- スポット一覧（展開可能） -->
          <li class="nav__item nav__item--expandable">
            <button class="nav__link nav__link--toggle" data-target="spots-menu">
              <span class="nav__link-text">スポット一覧</span>
              <span class="nav__toggle-icon">+</span>
            </button>
            <ul class="nav__submenu" id="spots-menu">
              <li class="nav__subitem"><a href="${spotsPath}onuma.html" class="nav__sublink">大沼国定公園</a></li>
              <li class="nav__subitem"><a href="#" class="nav__sublink">スポット2</a></li>
              <li class="nav__subitem"><a href="#" class="nav__sublink">スポット3</a></li>
              <li class="nav__subitem"><a href="#" class="nav__sublink">スポット4</a></li>
            </ul>
          </li>
          
          <li class="nav__item"><a href="#" class="nav__link">函館までのアクセス</a></li>
          <li class="nav__item"><a href="#" class="nav__link">お問い合わせ</a></li>
        </ul>
      </nav>
    </div>
  `;

  // メニューを HTML に挿入
  document.body.insertAdjacentHTML('afterbegin', menuHTML);
  
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
  
  generateMenu(homePath, spotsPath);
});

