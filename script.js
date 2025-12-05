// Dados do sorteio
const sorteio = {
  daniel: "Samuel",
  lucas: "Milson",
  jeane: "Zeza",
  sandro: "Lucas",
  mayara: "Malu",
  milson: "Amanda",
  julia: "Elis",
  marcos: "Nadinho",
  zeza: "Julia",
  samuel: "Andressa",
  elis: "Mayara",
  nadinho: "Allyson",
  xande: "Daniel",
  malu: "Cicera",
  cicera: "Xande",
  andressa: "Sandro",
  amanda: "Alicia",
  alicia: "Jeane",
  allyson: "Marcos",
}

// Frases de amigo secreto
const frases = [
  "Guarde bem este segredo! 🤫",
  "Este é seu segredo natalino! 🎁",
  "Não esqueça de guardar silêncio! 🤐",
  "Mantenha este mistério! ✨",
  "Seu segredo está protegido! 🎄",
  "Só você sabe! 🌟",
  "Misterioso até o fim! 🎅",
]

function normalizarNome(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}

function adicionarFlocos() {
  const app = document.getElementById("app")
  if (!app) return; // Segurança caso o app não exista ainda
  
  const posicoes = ["left: 5%", "left: 15%", "left: 50%", "right: 10%", "right: 20%"]

  posicoes.forEach((pos, index) => {
    const floco = document.createElement("div")
    floco.className = "snowflake"
    floco.textContent = "❄️"
    floco.style.cssText = `${pos}; animation: fall ${10 + index * 2}s linear infinite ${index * 1.5}s;`
    app.appendChild(floco)
  })
}

function adicionarDecoracoes() {
  const app = document.getElementById("app")
  if (!app) return;

  const decoracoes = [
    { classe: "tree-left", emoji: "🎄" },
    { classe: "tree-center", emoji: "🎄" },
    { classe: "santa-left", emoji: "⛄" },
    { classe: "girl-right", emoji: "👧" },
    { classe: "gift-right", emoji: "🎁" },
  ]

  decoracoes.forEach((dec) => {
    const el = document.createElement("div")
    el.className = `decoration ${dec.classe}`
    el.textContent = dec.emoji
    app.appendChild(el)
  })
}

function renderizarPaginaPrincipal() {
  const container = document.querySelector(".container")
  if (!container) return;
  
  container.innerHTML = `
        <div class="welcome-page">
            <h1 class="title">AMIGO SECRETO</h1>
            <div class="divider"></div>
            <h2 class="subtitle">🎄 Natal Mágico 2024 🎄</h2>
            <p class="tagline">Bem-vindo! Você está pronto para descobrir seu segredo natalino?</p>
            <p style="color: #999; font-size: 0.95em;">Use o link pessoal enviado para você para descobrir quem você tirou 🎅</p>
        </div>
    `
}

function renderizarPaginaResultado(nome) {
  const pessoa = sorteio[nome]

  if (!pessoa) {
    renderizarErro()
    return
  }

  const tirou = pessoa
  const nomePessoa = nome.charAt(0).toUpperCase() + nome.slice(1)

  const container = document.querySelector(".container")
  if (!container) return;

  container.innerHTML = `
        <div class="result-page">
            <div class="card-red">
                <div class="gift-icon">🎁</div>
                <div class="greeting">Olá, ${nomePessoa}!</div>
                <div class="greeting-message">Descubra seu segredo natalino...</div>
            </div>
            <div class="card-white">
                <div class="question">Você está pronto para descobrir?</div>
                <button class="btn-reveal" onclick="revelarResposta('${tirou}', this)">
                    🎁 Revelar Resposta
                </button>
                <div class="answer" id="answer"></div>
                <div class="secret-message" id="message"></div>
            </div>
        </div>
    `
}

// Tornando a função global para o onclick funcionar
window.revelarResposta = function(nome, botao) {
  const answer = document.getElementById("answer")
  const message = document.getElementById("message")

  answer.textContent = nome
  message.textContent = frases[Math.floor(Math.random() * frases.length)]

  botao.style.display = "none"
  answer.style.animation = "fadeIn 0.5s ease-in"
}

function renderizarErro() {
  const container = document.querySelector(".container")
  if (!container) return;

  container.innerHTML = `
        <div class="error-page">
            <div class="error-icon">❌</div>
            <div class="error-title">Página Não Encontrada</div>
            <div class="error-message">Desculpe, este link não é válido.<br>Verifique se o nome está correto!</div>
            <br>
            <a href="/" style="text-decoration: underline; color: #fff;">Voltar ao início</a>
        </div>
    `
}

function rotear() {
  let nome = null

  // Pega a URL completa
  const pathname = window.location.pathname
  const search = window.location.search
  const hash = window.location.hash
  
  let rawName = null;

  // Lógica de extração mais robusta
  if (search.includes("natal/")) {
    rawName = search.split("natal/")[1];
  } else if (hash.includes("natal/")) {
    rawName = hash.split("natal/")[1];
  } else if (pathname.includes("natal/")) {
    rawName = pathname.split("natal/")[1];
  }

  // Limpeza profunda do nome
  if (rawName) {
    // 1. Remove parâmetros extras do Google ou Facebook (ex: &fbclid=...)
    rawName = rawName.split("&")[0];
    
    // 2. Decodifica caracteres de URL (ex: %20 vira espaço)
    try {
        rawName = decodeURIComponent(rawName);
    } catch (e) {
        console.error("Erro ao decodificar URI", e);
    }

    // 3. Remove caracteres especiais, mantém apenas letras e números
    // Isso remove a barra "/" final se ela existir
    nome = rawName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^a-z0-9]/g, "")       // Remove símbolos (incluindo /)
            .trim();
  }

  console.log("--- DEBUG ---");
  console.log("URL bruta:", window.location.href);
  console.log("Nome extraído:", rawName);
  console.log("Nome limpo:", nome);
  console.log("Encontrado no sorteio?", !!sorteio[nome]);
  console.log("-------------");

  // Roteamento Final
  if (nome) {
    // Se extraiu um nome, verifica se existe
    if (sorteio[nome]) {
        renderizarPaginaResultado(nome)
    } else {
        // Se tem nome na URL mas não tá na lista -> ERRO
        console.warn("Nome não encontrado na lista:", nome);
        renderizarErro()
    }
  } else {
    // Se não tem nome na URL -> HOME
    renderizarPaginaPrincipal()
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  adicionarFlocos()
  adicionarDecoracoes()
  rotear()
})

// Atualizar ao mudar a URL (voltar/avançar)
window.addEventListener("popstate", rotear)

// Estilo para animação
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`
document.head.appendChild(style)
