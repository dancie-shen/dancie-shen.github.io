(function(){
  // ---- language ----
  var stored = null;
  try { stored = localStorage.getItem('site-lang'); } catch(e){}
  var lang = stored || 'en';
  document.documentElement.setAttribute('lang', lang);

  function updateToggleLabel(){
    var btn = document.getElementById('langToggle');
    if(!btn) return;
    btn.textContent = document.documentElement.getAttribute('lang') === 'zh' ? 'EN' : '中文';
  }
  updateToggleLabel();

  document.addEventListener('DOMContentLoaded', function(){
    var btn = document.getElementById('langToggle');
    if(btn){
      btn.addEventListener('click', function(){
        var current = document.documentElement.getAttribute('lang');
        var next = current === 'zh' ? 'en' : 'zh';
        document.documentElement.setAttribute('lang', next);
        try { localStorage.setItem('site-lang', next); } catch(e){}
        updateToggleLabel();
      });
    }

    // ---- nav active state ----
    var here = (window.location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav-links a').forEach(function(a){
      var href = a.getAttribute('href');
      if(href === here || (here === '' && href === 'index.html')){
        a.classList.add('active');
      }
    });

    // ---- term hover gloss ----
    var glossOut = document.getElementById('glossOut');
    var termRow = document.getElementById('termRow');
    if(glossOut && termRow){
      termRow.querySelectorAll('.term').forEach(function(term){
        term.addEventListener('mouseenter', function(){
          var key = document.documentElement.getAttribute('lang') === 'zh' ? 'glossZh' : 'glossEn';
          glossOut.textContent = term.dataset[key];
          glossOut.classList.add('show');
        });
      });
      termRow.addEventListener('mouseleave', function(){
        glossOut.classList.remove('show');
      });
    }

    // ---- scroll reveal ----
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, {threshold:.12});
      document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
    }
  });
})();
