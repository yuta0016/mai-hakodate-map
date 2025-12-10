// menu-loader.js
async function loadMenu(homePath = 'index.html', spotsPath = 'spots/') {
  try {
    const response = await fetch(new URL('menu.html', window.location.href).href);
    let menuHTML = await response.text();
    
    // パスを置き換え
    menuHTML = menuHTML.replace('{HOME_PATH}', homePath);
    menuHTML = menuHTML.replace('{SPOTS_PATH}', spotsPath);
    
    // メニューを HTML に挿入
    const header = document.querySelector('body');
    header.insertAdjacentHTML('afterbegin', menuHTML);
    
    // メニュー機能を初期化
    initializeMenu();
  } catch (error) {
    console.error('Failed to load menu:', error);
  }
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

// DOMContentLoaded 時にメニューを読み込む
document.addEventListener('DOMContentLoaded', () => {
  // ホームページと詳細ページで異なるパスを設定
  const isDetailPage = window.location.pathname.includes('/spots/');
  const homePath = isDetailPage ? '../index.html' : 'index.html';
  const spotsPath = isDetailPage ? '' : 'spots/';
  
  loadMenu(homePath, spotsPath);
});
