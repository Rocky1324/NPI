(function(){
  function $(s){ return document.querySelector(s); }
  function $all(s){ return Array.from(document.querySelectorAll(s)); }

  function evaluate(){
    const answers = {
      q1: 'b', // Orientation export
      q2: 'c', // 4 vagues (selon notre cours)
      q3: 'a', // État développeur
      q4: 'd', // IDE (investissement direct étranger)
      q5: 'b', // Corée du Sud ~4-5% R&D
    };
    let score = 0;
    Object.keys(answers).forEach(qid=>{
      const val = ($(`input[name=${qid}]:checked`)||{}).value;
      if(val === answers[qid]) score++;
    });
    const out = $('#quizResult');
    out.textContent = `Score: ${score}/5`;
    out.className = 'quiz-result ' + (score>=4 ? 'ok' : score>=2 ? 'mid' : 'low');
  }

  document.addEventListener('DOMContentLoaded', function(){
    const btn = $('#quizSubmit');
    if(btn) btn.addEventListener('click', evaluate);
  });
})();
