# Plano de Implementação: PokéIdle (Angular 22)

Este documento detalha o plano arquitetural e visual para a implementação da aplicação web **PokéIdle** em Angular 22, reproduzindo com fidelidade todas as telas, regras de negócio e estados apresentados nos prints de referência.

---

## 1. Análise dos Prints e Especificação de Requisitos

A partir da análise detalhada das 5 capturas de tela fornecidas:

### 1.1. Layout Geral e Estrutura (Mobile-first Frame)
- **Container Central**: Formato de aplicativo mobile (largura máx. ~420px), centralizado na tela com cantos arredondados (`rounded-3xl`), sombra suave e fundo branco (`#ffffff`), sobre um fundo escuro elegante.
- **Header Superior (Status Bar)**:
  - Logotipo **`PokéIdle`** à esquerda (*Poké* em vermelho vibrante `#ef4444`, *Idle* em azul marinho itálico e negrito `#1e293b`).
  - Badges de moedas e atributos à direita:
    - **PokéDólares**: Ícone de saquinho de dinheiro 💰 + contador (ex.: `50`, `110`, `250`).
    - **Energia**: Ícone de raio ⚡ + contador (ex.: `100`, `0`).
- **Navegação Inferior (Bottom Bar)**:
  - 3 abas fixas com ícones e rótulos:
    1. **GINÁSIO** (🥊 Luva de boxe) - Aba ativa: pill com fundo vermelho suave (`#fee2e2`) e texto/ícone vermelho.
    2. **LOJA** (🛒 Carrinho de compras) - Aba ativa: pill com fundo azul suave (`#e0f2fe`) e texto/ícone azul.
    3. **CENTRO** (🏥 Centro Pokémon) - Aba ativa: pill com fundo rosa suave (`#fce7f3`) e texto/ícone rosa.
  - Abas inativas com ícone e texto em cinza neutro (`#94a3b8`).

---

### 1.2. Telas e Estados Específicos

#### 🥊 Aba 1: Arena de Treino (Ginásio)
- **Título**: `Arena de Treino` (azul marinho negrito).
- **Subtítulo**: `Treine para ganhar PokéDólares!` (cinza suave).
- **Sprite Central**: Bulbasaur em pixel art (`image-rendering: pixelated`).
- **Ação Principal**: Botão `Batalhar (-10 ⚡)`.
  - **Estado Disponível (Energia >= 10)**: Botão vermelho vibrante `#ef4444` com texto branco e ícone de raio.
    - Efeito ao clicar: consome **10 de Energia** e concede **+20 PokéDólares** *(conforme deduzido da progressão das imagens: 100 energia -> 0 energia resultou em 50 -> 250 PokéDólares)*.
  - **Estado Exausto (Energia < 10)**:
    - Botão desabilitado em cinza claro `#cbd5e1`.
    - Card de alerta exibido abaixo do botão:
      - Fundo amarelo suave (`#fef9c3`), borda lateral esquerda laranja (`border-l-4 border-amber-500`).
      - Título em negrito: `Pokémon Exausto!`
      - Mensagem: `Vá ao Centro Pokémon para descansar.`

#### 🛒 Aba 2: PokéMart (Loja)
- **Título**: `PokéMart` (azul vivo `#2563eb`).
- **Grade de Itens (2 Colunas)**:
  1. **Net Ball** - Preço: `💰 35`
  2. **Dive Ball** - Preço: `💰 70`
  3. **Nest Ball** - Preço: `💰 105`
  4. **Repeat Ball** - Preço: `💰 140`
  5. **Timer Ball** - Preço: `💰 175`
  6. **Luxury Ball** - Preço: `💰 210`
- **Estados dos Botões**:
  - Se `PokéDólares >= Preço`: Botão azul `COMPRAR`.
  - Se `PokéDólares < Preço`: Botão cinza desabilitado `SEM GRANA`.
- **Seção "SUA MOCHILA"**:
  - Título com contador dinâmico: `SUA MOCHILA (X)`.
  - Tags/pills escuras (`#1e293b`) exibindo os itens comprados (ex.: `🎒 Nest Ball`, `🎒 Net Ball`).

#### 🏥 Aba 3: Centro Pokémon
- **Título**: `Centro Pokémon` (rosa `#ec4899`).
- **Subtítulo**: `A Enfermeira Joy está esperando.`
- **Sprite Central**: Chansey em pixel art.
- **Barra de Progresso (Energia do Time)**:
  - Cabeçalho: `ENERGIA DO TIME` à esquerda e valor numérico à direita (ex.: `0` ou `100`).
  - Trilho com barra de progresso suave em verde `#22c55e` (0% quando esgotado, 100% quando cheia).
- **Ação Principal**:
  - **Quando Energia < 100**: Botão rosa vibrante `💖 Recuperar Saúde`.
    - Ao clicar: restaura instantaneamente a energia para `100`.
  - **Quando Energia == 100**: Botão desabilitado em cinza/azul claro `Energia Cheia`.

---

## 2. Decisões Arquiteturais e Tecnológicas

1. **Angular 22 com Signals**:
   - Utilização de `signal()`, `computed()` e `effect()` para gerenciar reativamente e com alta performance todo o estado do jogo.
2. **Serviço Centralizado (`GameService`)**:
   - Responsável por:
     - `pokeDollars: WritableSignal<number>` (inicia em 50)
     - `energy: WritableSignal<number>` (inicia em 100, máx 100)
     - `backpack: WritableSignal<ShopItem[]>`
     - `activeTab: WritableSignal<'gym' | 'shop' | 'center'>`
     - Métodos: `battle()`, `heal()`, `buyItem(item)`, `switchTab(tab)`
     - Persistência automática em `localStorage` para não perder o progresso após recarregar a página.
3. **Sprites Oficiais da PokéAPI**:
   - Bulbasaur: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`
   - Chansey: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png`
   - Pokébolas oficiais do repositório da PokéAPI:
     - `net-ball.png`, `dive-ball.png`, `nest-ball.png`, `repeat-ball.png`, `timer-ball.png`, `luxury-ball.png`.
   - Adição de fallbacks e pré-carregamento para garantir estabilidade visual.
4. **Tailwind CSS v4 & Estilização**:
   - Aproveitamento do Tailwind CSS v4 já instalado no projeto para reproduzir com exatidão sombras, bordas, cores, fontes arredondadas e micro-animações (ex: click effect `active:scale-95`, animação sutil de pulso ao curar ou batalhar).

---

## 3. Estrutura de Arquivos Proposta

```
src/
├── app/
│   ├── models/
│   │   └── game.models.ts          # Interfaces (ShopItem, TabType, GameState)
│   ├── services/
│   │   └── game.service.ts         # Estado global reativo com Signals e LocalStorage
│   ├── components/
│   │   ├── top-bar/                # Cabeçalho com logo e contadores de moedas/energia
│   │   │   ├── top-bar.component.ts
│   │   │   └── top-bar.component.html
│   │   ├── gym-view/               # Arena de Treino (Bulbasaur, botão de batalha, alerta)
│   │   │   ├── gym-view.component.ts
│   │   │   └── gym-view.component.html
│   │   ├── shop-view/              # PokéMart (grid de itens, botões comprar/sem grana, mochila)
│   │   │   ├── shop-view.component.ts
│   │   │   └── shop-view.component.html
│   │   ├── center-view/            # Centro Pokémon (Chansey, barra de energia, botão curar)
│   │   │   ├── center-view.component.ts
│   │   │   └── center-view.component.html
│   │   └── bottom-nav/             # Barra de navegação inferior com 3 abas estilizadas
│   │       ├── bottom-nav.component.ts
│   │       └── bottom-nav.component.html
│   ├── app.ts                      # Container mobile e orquestrador
│   ├── app.html                    # Layout do app
│   └── app.css                     # Estilos utilitários específicos
└── styles.css                      # Regras globais (fontes, resets, pixelated rendering)
```

---

## 4. Plano de Verificação

### 4.1. Verificação Automatizada
- Executar `cmd.exe /c "npm run build"` para certificar que todos os componentes, tipagens e templates compilam sem nenhum erro ou aviso.

### 4.2. Verificação Visual e Interativa
- Iniciar o servidor de desenvolvimento (`cmd.exe /c "npm start"`).
- Testar interações e estados com o subagente de navegador:
  1. **Aba Ginásio**:
     - Batalhar 10 vezes consecutivas (100 -> 0 energia), confirmando ganho de PokéDólares (50 -> 250).
     - Verificar se o botão fica desabilitado ao atingir 0 energia e se o banner *"Pokémon Exausto!"* surge com as cores corretas.
  2. **Aba Loja**:
     - Verificar se itens que custam mais do que o saldo atual exibem o botão *"SEM GRANA"*.
     - Comprar itens com saldo disponível (ex: Net Ball por 35 e Nest Ball por 105) e validar se o saldo diminui e os itens aparecem em *"SUA MOCHILA"*.
  3. **Aba Centro Pokémon**:
     - Acessar com 0 de energia, validar a barra vazia e o botão ativo *"💖 Recuperar Saúde"*.
     - Clicar em recuperar e verificar a transição da barra para 100 (verde) e o botão mudando para *"Energia Cheia"*.
  4. **Fidelidade Visual**:
     - Comparar posicionamento, tipografia, ícones, cores e espaçamentos lado a lado com os 5 prints fornecidos.
