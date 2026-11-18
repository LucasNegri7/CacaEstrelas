# 🚀 Caça Estelar

Mini-jogo de reflexo feito com **HTML, CSS e JavaScript puro** (sem bibliotecas ou frameworks). Clique nos alvos espaciais antes que desapareçam, mas cuidado com as bombas 💣: elas tiram pontos!

### 👉 [Jogar agora](https://lucasnegri7.github.io/CacaEstrelas/)

## 🎮 Como jogar

1. Clique em **Iniciar**.
2. Você tem **30 segundos** para fazer o máximo de pontos.
3. Clique nos alvos (🚀 👾 🛸) antes que sumam: cada acerto vale **+1 ponto**.
4. Evite as bombas 💣: clicar nelas **tira 3 pontos** (a pontuação nunca fica negativa).
5. Quando o tempo acabar, veja sua pontuação final e clique em **Jogar novamente**.

## ✨ Funcionalidades

- Céu estrelado animado, com estrelas que piscam e têm cores sorteadas
- Quantidade de estrelas proporcional ao tamanho da tela (recriadas ao redimensionar a janela)
- Alvos em posições aleatórias, sempre dentro da área visível e abaixo do placar
- Placar fixo no topo com pontos e tempo restante
- Tela inicial e tela de fim de jogo
- Botão de reiniciar sem recarregar a página
- Efeito sonoro gerado por código (não precisa de arquivo de áudio)
- Alvos com animação de pulsar e efeito de brilho ao passar o mouse

### Bônus implementados

- **Dificuldade progressiva:** quanto mais pontos, menos tempo o alvo fica na tela (de 1500 ms até o mínimo de 600 ms)
- **Alvo proibido:** 20% de chance de aparecer uma bomba que desconta pontos
- **Estrelas coloridas:** cor sorteada de um array
- **Estrelas responsivas:** quantidade calculada conforme a área da tela

## 🛠️ Tecnologias

- HTML5
- CSS3 (flexbox, animações com `@keyframes`, gradiente radial)
- JavaScript (ES6+, manipulação do DOM, `setInterval` e `setTimeout`)

## 📁 Estrutura do projeto

```
CacaEstrelas/
├── index.html   # Estrutura da página: placar, tela inicial e tela final
├── style.css    # Estilos, animações e layout
└── script.js    # Lógica do jogo
```

## ▶️ Como executar

Não é preciso instalar nada.

1. Clone o repositório:
   ```bash
   git clone https://github.com/LucasNegri7/CacaEstrelas.git
   ```
2. Entre na pasta do projeto:
   ```bash
   cd CacaEstrelas
   ```
3. Abra o arquivo `index.html` no navegador (clique duas vezes nele ou use a extensão **Live Server** do VS Code).

## ⚙️ Personalização

As configurações principais ficam no topo do `script.js`:

| Constante | O que controla | Valor atual |
|---|---|---|
| `TEMPO_INICIAL` | Duração da partida (segundos) | `30` |
| `TAMANHO_ALVO` | Tamanho do alvo (px) | `50` |
| `ALTURA_PLACAR` | Área reservada ao placar (px) | `70` |
| `EMOJIS_ALVO` | Emojis dos alvos normais | `🚀 👾 🛸` |
| `CORES_ESTRELAS` | Cores possíveis das estrelas | branco, amarelo, azul, rosa |

Outros ajustes simples:

- **Chance da bomba:** altere `0.2` em `Math.random() < 0.2` dentro de `criarAlvo()`.
- **Penalidade da bomba:** altere o `3` em `pontos - 3`.
- **Velocidade dos alvos:** ajuste `1500`, `600` e `40` na função `duracaoDoAlvo()`.

## 🧠 Como funciona (resumo técnico)

- **Loop do jogo:** um `setInterval` de 1 segundo controla o cronômetro, e um `setTimeout` faz cada alvo sumir sozinho caso não seja clicado.
- **Posicionamento:** `posicaoAleatoria()` sorteia `x` e `y` descontando o tamanho do alvo e a altura do placar, para o alvo nunca sair da tela.
- **Som:** `criarSom()` monta um arquivo WAV em memória (um bipe que sobe de tom), converte para base64 e o usa em um objeto `Audio`. O som toca no clique do botão **Iniciar** para respeitar a política de autoplay dos navegadores.
- **Reuso de código:** a função `iniciarJogo()` serve tanto para o botão "Iniciar" quanto para "Jogar novamente".

## 📌 Possíveis melhorias

- Salvar o recorde com `localStorage`
- Níveis de dificuldade selecionáveis
- Mais tipos de alvo (ex.: bônus de tempo)
- Suporte a toque otimizado para celular

## 👨‍💻 Autor

Desenvolvido por [Lucas Negri](https://github.com/LucasNegri7).
