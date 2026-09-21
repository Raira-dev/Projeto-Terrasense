# TerraSense

Protótipo funcional do TerraSense, app de controle de grama e gramíneas em rodovias, desenvolvido em React Native + Expo + JavaScript. A ideia é usar sensores para medir a altura da grama e câmeras para conferir o resultado, indicando quais trechos precisam de manutenção.

## Integrantes

Nome: Anna Luiza

Nome: Gislene Muñoz

Nome: Larissa Machado

Nome: Raira T. Costa

Nome: Sofia Franken


## O que o app faz

- Login e cadastro de usuário
- Dashboard com indicadores de vegetação
- Menu lateral
- Mapa de segurança com níveis de risco
- Visualização 2D/3D simulada
- Monitoramento de câmera e sensores
- Solicitação de manutenção
- Relatórios por trecho
- Configurações e modo escuro
- Dados mockados para apresentação acadêmica

  
## Estrutura

```
TerraSense-JavaScript/
├── App.js
├── app.json
├── package.json
├── README.md
├── docs/
│   ├── TESTES_MANUAIS.md
│   └── ROTEIRO_VIDEO.md
├── assets/
│   ├── logo.png
│   └── road-camera.jpg
└── src/
    ├── components/
    │   ├── DonutChart.js
    │   ├── Header.js
    │   ├── MapaTrecho.js
    │   ├── ScreenShell.js
    │   └── SideMenu.js
    ├── data/
    │   └── mock.js
    ├── screens/
    │   ├── LoginScreen.js
    │   ├── CadastroScreen.js
    │   ├── HomeScreen.js
    │   ├── SegurancaScreen.js
    │   ├── ManutencaoScreen.js
    │   ├── RelatorioScreen.js
    │   └── ConfiguracoesScreen.js
    └── styles/
        └── colors.js
```

## Como executar

```
npm install
npx expo install react-native-webview
npx expo start
```

Para abrir no navegador: `npx expo start --web`. Para limpar o cache: `npx expo start -c`.

## Mapa 2D/3D

O componente `src/components/MapaTrecho.js` exibe o trecho da rodovia sobre o OpenStreetMap usando MapLibre GL JS dentro de uma WebView (iframe na versão web). Recebe uma `grade` (linhas de grama e pista, com níveis 1 = baixa, 2 = média, 3 = alta, 4 = urgente e X = sem leitura) e o `modo` (`'2d'` ou `'3d'`). No 3D, a altura de cada bloco representa o nível da grama. Tem estados de carregamento, erro (sem internet, com botão "Tentar novamente") e sem dados.

## Status das funcionalidades

> Revise esta tabela depois de rodar o documento de testes (`docs/TESTES_MANUAIS.md`) e ajuste o status conforme o resultado real.

| Funcionalidade | Status | Observação |
|----------------|--------|------------|
| Login e cadastro | Implementado (mock) | Sem backend; usuários não persistem |
| Dashboard com indicadores | Implementado (mock) | Dados mockados |
| Menu lateral e navegação | Implementado | |
| Mapa de segurança 2D/3D | Implementado | OSM + MapLibre; depende de internet |
| Estados do mapa (carregando, erro, vazio) | Implementado | |
| Monitoramento de câmera e sensores | Implementado (simulado) | Imagem estática e leituras mockadas |
| Solicitação de manutenção | Implementado (mock) | Não envia a nenhum servidor |
| Relatórios por trecho | Implementado (mock) | |
| Configurações e modo escuro | Implementado | |

## Pendências identificadas

- Coordenadas do trecho no mapa são de exemplo (mock), não de sensores reais.
- Mapa depende de internet e usa os tiles públicos do OpenStreetMap, sem previsão de uso pesado.
- Sem backend: cadastro, manutenção e relatórios não são persistidos.
- Câmeras e sensores são simulados; não há integração com hardware.

## Plano de ajustes para a Sprint 4

1. Corrigir as falhas encontradas nos testes manuais.
2. Trocar os tiles públicos do OSM por um provedor adequado (ou cache offline) para uso em produção.
3. Persistir usuários, solicitações e relatórios (backend ou armazenamento local).
4. Ler dados de sensores e câmeras de uma fonte de dados (API simulada ou real) em vez de mock fixo.
5. Posicionar as células do mapa a partir das coordenadas reais dos trechos.
6. Revisar consistência visual e modo escuro em todas as telas.

## Observação

Sensores, gráficos e registros são simulados localmente. Não há backend conectado.

## Observação

O mapa, sensores, gráficos e registros são simulados localmente para o protótipo. Não há backend conectado.
