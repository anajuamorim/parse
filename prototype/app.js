const sample = "A solicitação deverá ser apresentada no prazo de 30 dias, contados a partir do recebimento desta comunicação. O requerente deverá anexar documento de identificação e comprovante de residência. Caso não apresente a documentação no prazo informado, o pedido poderá ser arquivado. Para acompanhar a solicitação, consulte o protocolo no canal oficial de atendimento.";
const source = document.querySelector("#sourceText");
const output = document.querySelector("#output");
const status = document.querySelector("#status");
const fileInput = document.querySelector("#fileInput");
const fileName = document.querySelector("#fileName");
const terms = [
  ["requerente","Pessoa que faz um pedido ou uma solicitação."],
  ["protocolo","Número usado para identificar e acompanhar uma solicitação."],
  ["arquivado","Quando o processo é encerrado ou guardado sem continuar em análise."],
  ["documentação","Conjunto de documentos necessários para comprovar uma informação."]
];
document.querySelector("#loadSample").addEventListener("click",()=>{source.value=sample;status.textContent="Exemplo fictício carregado. Você pode editar o texto antes de organizar.";});
fileInput.addEventListener("change",async()=>{const f=fileInput.files[0];if(!f)return;fileName.textContent=f.name;try{source.value=await f.text();status.textContent="Arquivo de texto carregado localmente.";}catch{status.textContent="Não foi possível ler esse arquivo.";}});

function findDates(text){
 const patterns=[/\b(?:em|até|dia)\s+\d{1,2}\/\d{1,2}(?:\/\d{2,4})?\b/gi,/\b\d+\s+dias?\b/gi,/\b\d+\s+mes(?:es)?\b/gi,/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g];
 return [...new Set(patterns.flatMap(p=>text.match(p)||[]))];
}
function simplify(text){
 let s=text.replace(/\s+/g," ").trim();
 const replacements=[[/deverá ser apresentada/g,"precisa ser enviada"],[/contados a partir do recebimento desta comunicação/g,"a partir do dia em que você recebeu este aviso"],[/o requerente deverá/g,"você precisa"],[/anexar/g,"enviar junto"],[/comprovante de residência/g,"documento que mostra onde você mora"],[/caso não apresente/g,"se você não enviar"],[/poderá ser arquivado/g,"pode ser encerrado"],[/consulte/g,"verifique"],[/canal oficial de atendimento/g,"canal oficial de atendimento"]];
 replacements.forEach(([a,b])=>s=s.replace(a,b));
 return s;
}
function listActions(text){
 const rules=[[/anex|envi|apresent|entreg/gi,"Separar e enviar os documentos solicitados."],[/acompanhar|consulte|verifique/gi,"Consultar o andamento pelo canal indicado."],[/prazo|dias|até/gi,"Conferir o prazo e não deixar a resposta para a última hora."]];
 return rules.filter(([re])=>re.test(text)).map(([,label])=>label);
}
function renderList(el,items,empty){el.innerHTML="";(items.length?items:[empty]).forEach(t=>{const li=document.createElement("li");li.textContent=t;el.append(li);});}
document.querySelector("#processBtn").addEventListener("click",()=>{
 const text=source.value.trim();
 if(text.length<20){status.textContent="Insira um texto fictício com pelo menos 20 caracteres.";return;}
 document.querySelector("#simpleText").textContent=simplify(text);
 renderList(document.querySelector("#datesList"),findDates(text),"Nenhum prazo identificado automaticamente.");
 renderList(document.querySelector("#actionsList"),listActions(text), "Nenhuma ação identificada pelas regras da demonstração.");
 const found=terms.filter(([word])=>new RegExp("\\b"+word+"\\b","i").test(text));
 const glossary=document.querySelector("#glossaryList");glossary.innerHTML="";
 if(!found.length){const span=document.createElement("span");span.className="glossary-item";span.textContent="Nenhum termo do glossário de exemplo encontrado.";glossary.append(span);}
 found.forEach(([word,meaning])=>{const span=document.createElement("span");span.className="glossary-item";const b=document.createElement("b");b.textContent=word+": ";span.append(b,document.createTextNode(meaning));glossary.append(span);});
 output.hidden=false;status.textContent="Demonstração concluída. Revise sempre o conteúdo com a fonte original.";output.scrollIntoView({behavior:"smooth",block:"nearest"});
});
document.querySelector("#speakBtn").addEventListener("click",()=>{
 if(!("speechSynthesis" in window)){document.querySelector("#speechStatus").textContent="Síntese de voz não disponível neste navegador.";return;}
 speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(document.querySelector("#simpleText").textContent);utterance.lang="pt-BR";speechSynthesis.speak(utterance);document.querySelector("#speechStatus").textContent="Reprodução iniciada.";
});
document.querySelector("#stopBtn").addEventListener("click",()=>{if("speechSynthesis" in window)speechSynthesis.cancel();document.querySelector("#speechStatus").textContent="Áudio interrompido.";});


// Cache local para permitir reabrir a demonstração após a primeira visita online.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      const status = document.querySelector("#status");
      if (status) status.textContent = "Modo offline indisponível neste navegador; a demonstração continua funcionando online.";
    });
  });
}
