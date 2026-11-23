# PARSE — Porque entender é um direito

> Plataforma CitizenTech proposta para tornar documentos complexos mais compreensíveis e acessíveis.

A PARSE é uma proposta de solução que recebe documentos e organiza seu conteúdo em uma experiência de leitura mais simples, destacando informações importantes para que as pessoas possam compreender melhor o que precisam fazer.

## Protótipo navegável

O protótipo estático pode ser executado localmente: abra `prototype/index.html` em um navegador ou publique o repositório com GitHub Pages.

### O que esta demonstração permite explorar
- Inserir texto ou carregar um arquivo de texto (`.txt` / `.md`).
- Visualizar uma demonstração de organização do conteúdo em linguagem simples.
- Identificar datas, prazos e ações mencionados no texto.
- Consultar um glossário de termos.
- Ouvir o texto apresentado usando a síntese de voz disponível no navegador.
- Consultar um painel com dados fictícios para demonstrar a visão institucional.

**Importante — limites da demonstração:** esta versão é um protótipo front-end. A análise de texto é baseada em regras locais e exemplos; não há integração real com OCR, LLM, API, banco de dados, armazenamento seguro, links temporários ou painel institucional conectado. A leitura em voz alta depende do suporte do navegador. Não envie documentos pessoais, médicos, jurídicos ou outros dados sensíveis.

## Arquitetura conceitual

O fluxo de dados descrito no material de arquitetura da PARSE está organizado em quatro camadas:

1. **Entrada e ingestão:** envio por foto, PDF ou texto, transporte criptografado TLS 1.3 e registro obrigatório de consentimento.
2. **Processamento efêmero:** OCR, classificação, extração de entidades, tradução para Leitura Fácil, portão de fidelidade, processamento em memória volátil e log auditável.
3. **Armazenamento mínimo:** persistência da tradução somente quando solicitada pelo titular, hash SHA-256 para auditoria, metadados agregados e anonimizados e descarte do original.
4. **Saída e distribuição:** entrega por link temporário e painel institucional com dados agregados.

Controles transversais previstos: LGPD (art. 46), descarte de buffers, criptografia AES-256 em repouso, trilha append-only e pseudonimização.

Consulte [Arquitetura](docs/architecture.md), [Governança e privacidade](docs/governance-privacy.md) e o [fluxo em JSON](docs/data-flow.json).

## Executar localmente

1. Baixe ou clone este repositório.
2. Abra `prototype/index.html` no navegador.
3. Use o texto de exemplo ou cole um texto fictício no campo de entrada.

Não é necessário instalar dependências ou configurar servidor.

## Publicar com GitHub Pages

No GitHub, acesse **Settings → Pages**, escolha **Deploy from a branch**, selecione `main` e a pasta `/ (root)` caso queira publicar a página inicial do repositório. Se preferir publicar diretamente a pasta do protótipo, mova os arquivos para a raiz ou configure a estrutura de publicação de acordo com o Pages.

## Próximas etapas para uma implementação real

- Implementar serviço de OCR para imagens e PDFs.
- Integrar um serviço de PLN/LLM com avaliação de fidelidade e revisão humana.
- Construir API e camada de persistência com controles de acesso.
- Implementar gestão de consentimento, retenção, descarte e trilhas de auditoria verificáveis.
- Criar mecanismo real de links temporários, com expiração e revogação.
- Construir painel institucional conectado a dados agregados e protegidos.
- Realizar testes de acessibilidade, segurança, privacidade e qualidade da simplificação.

## Escopo acadêmico

Projeto desenvolvido no contexto da Global Solution 2026.2 — CitizenTech, FIAP. Este repositório separa a arquitetura proposta do que está efetivamente implementado no protótipo demonstrativo.
