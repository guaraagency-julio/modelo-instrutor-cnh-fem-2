'use strict';
// Insira somente dígitos (DDI + DDD + número) para ativar o WhatsApp real.
// O número permanece vazio em uma demonstração para não captar leads de terceiros.
const WHATSAPP_NUMBER = '';
const topics = {
  retomar: {
    title:'Voltar ao volante pode começar devagar.',
    description:'Primeiro, reconhecer os comandos, ajustar sua posição e praticar em locais adequados. Depois, avançar para o trânsito conforme sua segurança e seu domínio evoluem.',
    steps:['Retomar os comandos','Praticar percursos simples','Ampliar os desafios'],
    message:'Faz tempo que não dirijo e quero voltar a praticar com calma.'
  },
  baliza: {
    title:'A garagem e a vaga podem entrar no treino.',
    description:'Com referências visuais, repetição orientada e exercícios em locais apropriados, é possível trabalhar manobras de ré, baliza e posicionamento do carro.',
    steps:['Entender os pontos de referência','Praticar manobras sem pressa','Repetir em situações reais'],
    message:'Tenho insegurança para estacionar e quero praticar baliza e garagem.'
  },
  transito: {
    title:'O trânsito pode ser trabalhado por etapas.',
    description:'O percurso pode evoluir de vias calmas para ruas e avenidas movimentadas conforme suas habilidades. A instrutora orienta antecipação, conversões e decisões.',
    steps:['Começar em vias tranquilas','Treinar atenção e conversões','Avançar conforme a evolução'],
    message:'Tenho medo de dirigir em avenidas e no trânsito intenso.'
  },
  pressao: {
    title:'Você pode aprender fazendo perguntas e repetindo.',
    description:'A proposta é ouvir o que te deixa nervosa, explicar os movimentos com clareza e retomar os exercícios sem gritos, cobranças pessoais ou comparações.',
    steps:['Conversar sobre as inseguranças','Praticar com instruções claras','Reforçar os pontos difíceis'],
    message:'Fico nervosa com críticas e gostaria de aprender com uma instrutora paciente.'
  },
  rotina: {
    title:'Vamos usar sua rotina para escolher objetivos.',
    description:'Ir ao mercado, buscar alguém ou chegar ao trabalho pode orientar os treinos. Cada trajeto envolve habilidades específicas que podem ser praticadas progressivamente.',
    steps:['Escolher os trajetos importantes','Mapear manobras e dificuldades','Treinar por situações'],
    message:'Quero praticar trajetos da rotina para dirigir com mais autonomia.'
  }
};
let activeTopic = 'retomar';
const dialog=document.getElementById('message-dialog');
const messageField=document.getElementById('message-text');
const copyStatus=document.getElementById('copy-status');
const topicButtons=[...document.querySelectorAll('[data-topic]')];
function contact(rawMessage){
  const text=(rawMessage || 'Olá! Tenho CNH e gostaria de saber mais sobre as aulas de direção para mulheres.').trim();
  if(/^\d{12,15}$/.test(WHATSAPP_NUMBER)){
    window.open('https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');
  }else{
    messageField.value=text;
    copyStatus.textContent='';
    if(typeof dialog.showModal==='function')dialog.showModal();else{dialog.setAttribute('open','');messageField.focus();}
  }
}
document.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',()=>contact(button.getAttribute('data-contact'))));
function setTopic(key){
  if(!topics[key])return;
  activeTopic=key;
  const data=topics[key];
  document.getElementById('result-title').textContent=data.title;
  document.getElementById('result-description').textContent=data.description;
  data.steps.forEach((step,index)=>document.getElementById('result-step-'+(index+1)).textContent=step);
  topicButtons.forEach(button=>{
    const isActive=button.dataset.topic===key;
    button.classList.toggle('active',isActive);
    button.setAttribute('aria-pressed',String(isActive));
  });
}
topicButtons.forEach(button=>button.addEventListener('click',()=>setTopic(button.dataset.topic)));
document.getElementById('plan-contact').addEventListener('click',()=>contact('Olá! Tenho CNH e quero conversar com uma instrutora. Minha situação hoje: '+topics[activeTopic].message+' Como funcionam as aulas?'));
document.getElementById('contact-form').addEventListener('submit',(event)=>{
  event.preventDefault();
  const form=event.currentTarget;
  if(!form.reportValidity())return;
  const name=form.elements.name.value.trim();
  const objective=form.elements.objective.value.trim();
  const region=form.elements.region.value.trim();
  let text='Olá! Meu nome é '+name+'. Tenho CNH e gostaria de conversar com uma instrutora sobre aulas de direção. Meu objetivo é: '+objective+'.';
  if(region)text+=' Minha região é '+region+'.';
  text+=' Você poderia me explicar o formato das aulas, a disponibilidade e os valores?';
  contact(text);
});
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
document.getElementById('copy-message').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(messageField.value);copyStatus.textContent='Mensagem copiada. Agora você pode colar na conversa.';}
  catch{messageField.focus();messageField.select();copyStatus.textContent='Selecione a mensagem acima e copie manualmente.';}
});
const menuButton=document.querySelector('.menu-button');
const menu=document.getElementById('menu-mobile');
function setMenu(open){menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar navegação':'Abrir navegação');}
menuButton.addEventListener('click',()=>setMenu(menu.hidden));
menu.querySelectorAll('a,button').forEach(el=>el.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false);});
window.matchMedia('(min-width: 861px)').addEventListener('change',event=>{if(event.matches)setMenu(false);});
document.getElementById('year').textContent=new Date().getFullYear();