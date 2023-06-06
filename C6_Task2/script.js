const btn = document.querySelector('.j-btn-getsize');

const outputText = document.querySelector('#outputText');

btn.addEventListener('click', () => {
 
//   window.screen.width и window.screen.height.
//   Размер экрана с учётом полосы прокрутки. Для этого используются свойства window.innerWidth и window.innerHeight.
// Размер экрана без учёта полосы прокрутки. Тут можно использовать document.documentElement.clientWidth и document.documentElement.clientHeight.
  let resText = 
    `window.screen.width=${window.screen.width}\n
    window.screen.height=${window.screen.height}\n
    window.innerWidth=${window.innerWidth}\n
    window.innerHeight=${window.innerHeight}\n
    document.documentElement.clientWidth=${document.documentElement.clientWidth}\n
    document.documentElement.clientHeight=${document.documentElement.clientHeight}\n
  `;
  
  window.alert(resText);
  outputText.innerHTML = 
   `window.screen.width=${window.screen.width}<br>
    window.screen.height=${window.screen.height}<br>
    window.innerWidth=${window.innerWidth}<br>
    window.innerHeight=${window.innerHeight}<br>
    document.documentElement.clientWidth=${document.documentElement.clientWidth}<br>
    document.documentElement.clientHeight=${document.documentElement.clientHeight}<br>
  `;
});