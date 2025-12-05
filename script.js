// Dados do sorteio
const sorteio = {
  daniel: "Samuel",
  lucas: "Milson",
  jeane: "Zeza",
  sandro: "Lucas",
  mayara: "Malu",
  milson: "Amanda",
  júlia: "Lili",
  marcos: "Nadinho",
  zeza: "Júlia",
  samuel: "Andressa",
  lili: "Mayara",
  nadinho: "Allyson",
  xande: "Daniel",
  malu: "Cícera",
  cícera: "Xande",
  andressa: "Sandro",
  amanda: "Alícia",
  alícia: "Jeane",
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
  const nomeNormalizado = normalizarNome(nome)
  const pessoa = Object.keys(sorteio).find((chave) => normalizarNome(chave) === nomeNormalizado)

  console.log("[v0] ========== DEBUG ROTEAMENTO ==========")
  console.log("[v0] Nome original da URL:", nome)
  console.log("[v0] Nome normalizado:", nomeNormalizado)
  console.log(
    "[v0] Chaves disponíveis normalizadas:",
    Object.keys(sorteio).map((chave) => normalizarNome(chave)),
  )
  console.log("[v0] Pessoa encontrada:", pessoa)
  console.log("[v0] =====================================")

  if (!pessoa) {
    renderizarErro()
    return
  }

  const tirou = sorteio[pessoa]
  const frase = frases[Math.floor(Math.random() * frases.length)]
  const nomePessoa = pessoa.charAt(0).toUpperCase() + pessoa.slice(1)

  const container = document.querySelector(".container")
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

function revelarResposta(nome, botao) {
  const answer = document.getElementById("answer")
  const message = document.getElementById("message")

  answer.textContent = nome
  message.textContent = frases[Math.floor(Math.random() * frases.length)]

  botao.style.display = "none"
  answer.style.animation = "fadeIn 0.5s ease-in"
}

function renderizarErro() {
  const container = document.querySelector(".container")
  container.innerHTML = `
        <div class="error-page">
            <div class="error-icon">❌</div>
            <div class="error-title">Página Não Encontrada</div>
            <div class="error-message">Desculpe, este link não é válido.<br>Verifique se o nome está correto!</div>
        </div>
    `
}

function rotear() {
  console.log("[v0] ========== INICIANDO ROTEAMENTO ==========")
  console.log("[v0] URL Completa:", window.location.href)
  console.log("[v0] Pathname:", window.location.pathname)
  console.log("[v0] Search:", window.location.search)
  console.log("[v0] Hash:", window.location.hash)

  let nome = null

  const pathname = window.location.pathname
  const search = window.location.search
  const hash = window.location.hash

  // Verificar no search/query string (ex: ?natal/amanda)
  if (search.includes("natal/")) {
    nome = search.split("natal/")[1]?.split("&")[0]
    console.log("[v0] Nome encontrado no SEARCH:", nome)
  }
  // Verificar no hash (ex: #natal/amanda)
  else if (hash.includes("natal/")) {
    nome = hash.split("natal/")[1]?.split("&")[0]
    console.log("[v0] Nome encontrado no HASH:", nome)
  }
  // Verificar no pathname (ex: /natal/amanda ou /repo/natal/amanda)
  else if (pathname.includes("natal/")) {
    nome = pathname.split("natal/")[1]
    console.log("[v0] Nome encontrado no PATHNAME:", nome)
  }

  if (nome) {
    nome = nome.trim()
    console.log("[v0] Nome após trim:", nome)
    console.log("[v0] Nome normalizado:", normalizarNome(nome))
  }

  console.log("[v0] ========== VALIDANDO NO SORTEIO ==========")
  console.log("[v0] Nomes disponíveis:", Object.keys(sorteio))
  console.log(
    "[v0] Nomes normalizados:",
    Object.keys(sorteio).map((chave) => normalizarNome(chave)),
  )

  if (nome) {
    renderizarPaginaResultado(nome)
  } else {
    console.log("[v0] Nenhum nome encontrado - renderizando página principal")
    renderizarPaginaPrincipal()
  }

  console.log("[v0] ========== FIM ROTEAMENTO ==========")
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  adicionarFlocos()
  adicionarDecoracoes()
  rotear()
})

// Atualizar ao mudar a URL
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
