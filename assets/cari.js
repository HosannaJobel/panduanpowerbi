(function(){
  var q=document.getElementById('q'), info=document.getElementById('info');
  if(!q) return;
  var secs=[].slice.call(document.querySelectorAll('main section'));
  secs.forEach(function(s){s._html=s.innerHTML;});
  function esc(t){return t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
  q.addEventListener('input',function(){
    var v=q.value.trim(), n=0;
    secs.forEach(function(s){
      s.innerHTML=s._html;
      if(!v){s.classList.remove('hide');return;}
      var hit=s.textContent.toLowerCase().indexOf(v.toLowerCase())>-1;
      s.classList.toggle('hide',!hit);
      if(!hit) return;
      n++;
      var test=new RegExp(esc(v),'i'), re=new RegExp('('+esc(v)+')','gi');
      var w=document.createTreeWalker(s,NodeFilter.SHOW_TEXT,null,false),nodes=[],x;
      while(x=w.nextNode()) if(test.test(x.nodeValue)) nodes.push(x);
      nodes.forEach(function(t){
        var span=document.createElement('span');
        span.innerHTML=t.nodeValue.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(re,'<mark>$1</mark>');
        t.parentNode.replaceChild(span,t);
      });
    });
    info.textContent=v?(n+' bagian cocok'):'';
  });
})();
