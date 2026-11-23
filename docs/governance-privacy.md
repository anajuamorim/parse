# Governança, privacidade e segurança

## Princípios registrados na arquitetura

A proposta da PARSE prevê consentimento obrigatório antes do processamento, processamento efêmero, armazenamento mínimo, descarte do documento original, pseudonimização do titular, trilha de auditoria append-only e metadados agregados e anonimizados.

## Controles previstos

| Controle | Objetivo na proposta | Situação neste repositório |
|---|---|---|
| Consentimento | Registrar autorização antes do processamento | Não implementado; protótipo não recebe documentos reais |
| TLS 1.3 | Proteger o transporte | Não configurado neste front-end estático |
| Processamento efêmero | Evitar gravação do original em disco | A demonstração roda localmente no navegador; não é uma garantia de segurança de produção |
| Persistência sob solicitação | Guardar a tradução apenas quando solicitada pelo titular | Não implementada |
| SHA-256 | Apoiar o registro de auditoria | Não implementado |
| AES-256 em repouso | Proteger dados armazenados | Não implementado |
| Log append-only | Rastrear acessos e eventos | Não implementado |
| Pseudonimização | Reduzir exposição da identidade | Não implementada |
| Descarte de buffers | Reduzir retenção de conteúdo temporário | Não implementado como controle verificável |
| Link temporário | Distribuir tradução com acesso limitado | Não implementado |

## Cuidados de uso

- Não utilize documentos pessoais, prontuários, contratos, dados de identificação ou qualquer informação sensível no protótipo.
- A simplificação automática demonstrativa não substitui o documento original, orientação profissional ou revisão humana.
- Datas e ações são identificadas por padrões simples e podem ser omitidas ou interpretadas incorretamente.
- Indicadores do painel são dados fictícios.
- A síntese de voz utiliza a funcionalidade disponível no navegador e não é um serviço de TTS integrado à plataforma.

## Antes de produção

A implementação deverá passar por avaliação de impacto à proteção de dados quando aplicável, definição de base legal e transparência, gestão de consentimento, controle de acesso, criptografia com gestão de chaves, retenção e descarte verificáveis, auditoria, testes de segurança, acessibilidade e validação humana da fidelidade do conteúdo. A adequação à LGPD deve ser avaliada com responsáveis jurídicos e de privacidade; este documento não constitui parecer jurídico.
