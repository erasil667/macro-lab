const rate = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const inflation = document.getElementById('inflation');
const gdp = document.getElementById('gdp');
const inflationNote = document.getElementById('inflation-note');
const gdpNote = document.getElementById('gdp-note');
const summary = document.getElementById('summary');
const explanation = document.getElementById('sim-explanation');
const infLine = document.getElementById('line-inflation');
const gdpLine = document.getElementById('line-gdp');
const infDot = document.getElementById('inflation-dot');
const gdpDot = document.getElementById('gdp-dot');

function updateEconomy() {
  const r = Number(rate.value);
  const inf = Math.max(2.1, 8.6 - r * 0.35);
  const growth = Math.max(-1.8, 4.4 - r * 0.26);
  const infY = 188 - inf * 16;
  const gdpY = 190 - (growth + 2) * 22;
  rateValue.textContent = `${r.toFixed(1)}%`;
  inflation.textContent = `${inf.toFixed(1)}%`;
  gdp.textContent = `${growth.toFixed(1)}%`;
  infLine.setAttribute('d', `M20 54 C100 55, 135 88, 205 108 S340 135, 480 ${infY}`);
  gdpLine.setAttribute('d', `M20 164 C108 150, 172 125, 240 132 S360 116,480 ${gdpY}`);
  infDot.setAttribute('cy', infY); gdpDot.setAttribute('cy', gdpY);
  if (r < 6) { summary.textContent = 'перегрев'; inflationNote.textContent = 'ускоряется'; gdpNote.textContent = 'быстрый, но рискованный'; explanation.textContent = 'Дешёвые деньги подпитывают спрос: экономика растёт, но цены начинают ускоряться.'; }
  else if (r < 10) { summary.textContent = 'мягкое замедление'; inflationNote.textContent = 'ещё выше цели'; gdpNote.textContent = 'устойчивый'; explanation.textContent = 'Ставка выше нейтральной: цены остывают, а рост остаётся положительным.'; }
  else { summary.textContent = 'жёсткое охлаждение'; inflationNote.textContent = 'близко к цели'; gdpNote.textContent = growth < 0 ? 'экономика сжимается' : 'замедляется'; explanation.textContent = 'Высокая ставка давит на спрос и инфляцию, но увеличивает риск рецессии.'; }
}
rate.addEventListener('input', updateEconomy); updateEconomy();

const questions = [
  {q:'Что обычно происходит с потребительскими кредитами, когда центральный банк повышает ставку?', a:['Они становятся дешевле','Они обычно дорожают','Ничего не меняется'], c:1, f:'Верно. Банкам становится дороже занимать деньги, поэтому кредиты обычно дорожают.'},
  {q:'Если цены растут быстрее, чем зарплаты, что происходит с покупательной способностью?', a:['Она растёт','Она снижается','Она не меняется'], c:1, f:'Точно. На ту же сумму можно купить меньше товаров и услуг.'},
  {q:'Какой показатель чаще всего используют, чтобы оценить размер экономики страны?', a:['ВВП','Курс валюты','Индекс акций'], c:0, f:'Да. ВВП отражает стоимость произведённых в стране товаров и услуг.'}
];
let current = 0, score = 0;
const question = document.getElementById('question'), answers = document.getElementById('answers'), feedback = document.getElementById('feedback'), next = document.getElementById('next'), progress = document.getElementById('progress-text');
function renderQuestion(){const item=questions[current];question.textContent=item.q;answers.innerHTML=item.a.map((a,i)=>`<button data-index="${i}">${a}</button>`).join('');feedback.textContent='';next.hidden=true;progress.textContent=`${score} / 3`;answers.querySelectorAll('button').forEach(b=>b.addEventListener('click',answer));}
function answer(e){const chosen=Number(e.currentTarget.dataset.index), item=questions[current], all=answers.querySelectorAll('button');all.forEach((b,i)=>{b.disabled=true;if(i===item.c)b.classList.add('correct');});if(chosen===item.c){score++;feedback.textContent=item.f;}else{e.currentTarget.classList.add('wrong');feedback.textContent=`Почти. ${item.f}`;}progress.textContent=`${score} / 3`;next.hidden=false;next.textContent=current===2?'Посмотреть результат →':'Следующий вопрос →';}
next.addEventListener('click',()=>{
  if(current<2){
    current++;
    renderQuestion();
  }else{
    question.textContent=`Готово: ${score} из 3. Отличное начало!`;
    answers.innerHTML='<button disabled class="correct">Вернуться к урокам</button>';
    feedback.textContent='Ты уже видишь ключевые связи в экономике.';
    next.hidden=true;
  }
});
renderQuestion();

