  ## Desafio MSK Desenvolvimento de Sistemas #

  Foi desenvolvido usando Redis e em memória com variáveis os testes unitários com cada para cada rota do sistema
  Vale dizer que possuo experiência desenvolvendo testes automatizado (e2e, integração, uniátario)
  Normalmente não uso o Redis para esse tipo de caso, mas como foi pedido o uso, decidi usar dessa maneira
  Neste desafio, usei para os testes o vitest, mas também sei usar o Jest, e caso necessário, posso usar os do próprio node

   Possuo longo conhecimento com Java, pois trabalho com Java a cerca de 5 anos. Comecei com 14 anos codando em Java e acabou ficando por um bom tempo
   Possuo conhecimento em desenvolvimento backend com Spring, mas também, Node.js e frameworks como (Nest, Fastify, Express, e node nativo), além de frameworks frontend
   Possuo conhecimento dos conceitos de SOLID, KISS, DRY
   Possuo conhecimento com Orquestradores como Kubernetes
   Possuo conhecimento em ORMS e Query Builder como TypeORM, Prisma, Knex, Hibernate, porém uso com mais frequência o Prisma, e em Java uso Hibernate
   Possuo conhecimento em Arquitetura de Software bem como Design Pattern
   Possuo conhecimento em Docker
   Tenho outros conhecimentos, mas para não deixar esse arquivo muito longo. Por favor, mas ler mais sobre minhas capacidades, leia meu currículo ;)

  Para acessar o Swagger use, no caso de rodar localmente: http://localhost:3333/api#/ (3333 é a porta padrão)

  Leia o código se for testar localmente, pois as chaves private e public estão em RS256 e é necessário criptografar para base64 no caso de uso.

  Outro detalhe, eu não gerei as migrations do orm para controle, por que julguei não necessário, mas sei fazer caso precise.

  # O deploy foi feito no Render, segue o Link:
  https://nest-catalog.onrender.com

    # Requisitos Funcionais
  - [X] Deve ser possível se registrar
  - [X] deve ser possível se autenticar
  - [X] deve ser possível criar um catálogo de filmes
  - [X] deve ser possível deletar filmes
  - [X] deve ser possível alterar filmes existentes
  - [X] deve ser possível listar todos os filmes
  - [X] deve ser possível receber erros de cada falha nas rotas
  - [X] deve existir um swagger listando os endpoints

  # Pode usar essas chaves para fins de test:

  PrivateKey 
  "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tDQpNSUlFdlFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLY3dnZ1NqQWdFQUFvSUJBUUN6RENlaW54Z1RhcXA2DQpXbHpOaEwrNE5xTTZkNG5MdWFDQzR2aXlsZjBWZ21MdkZUTUtFdURCeDZEd3Mvb05mdlFhN2tQVmJDWEViTnluDQorYTFBQVYxS2JaN2Fka2NBR0QzOW83R0ZhSGkyeFFWUzVHTnZYQTlqVm50ZTNmNmJlb2hQVWRnNytrWGRZUFR4DQpRTXdoMVg4ZUg4TUhaa2pXSklJd1lnWEk0S29kdTYzYjJKUkhFUGdmS1BjdC92RUlEbEhSa3NRSnkwZ1dFR05VDQpRV29kZGtXZ2Rxd1lKV04yQU5wRVFLL1BId0JCVWxPMzU4Y1UrSFV4SDY5Vi9qQVNWS1ZYcUVVUktlTXRtUlBHDQo3T0lBZk1aUWxoOTFZMHUzTmFXYndzSGsvWjNiNDFzeW9aK1pJN00rYi96VzBHVlV0THVrbDlrckNGQWF5d1ZqDQpwbm9WSVh0ZkFnTUJBQUVDZ2dFQUNGRDBObFYxWk5GN2dadFkzQ0xpVk1nVTVNNVFsQ25YRHIxRUYrZG5qZXcwDQpkQzVqNUgvaitKd3hHWDBDakVYdFNLTHdlNlUrUzlWU21tcTZaVktxNXA0WTFzVFBuMjJBMDVzYXo3dCtmOTYrDQoxSTdQSDRrREhmWVNYT0dxeGNYM050ZnlWemJVcitlaytOK3RtNVN6QnM4cTI5a2dZUEhwS2g0amJxVWd3YWkyDQpEM0RLYkxXSWVmU0NGWU5QS0RRbFdFbmd4UmF1OUl0dWQ5VE5mQ0FzRllwUTVUdVpoOWFGNHBwSmJ4WlFsdkNaDQpzQ2NqWXgwbUdTTFhCWks5Nkk3ZGtXZk96aGIyZndWRVYrV3lXSExMbmpRbTVBK3oxQjhzV3NibkZ4NWFBQ2NXDQo1OFZwVTUyYU5NbUpHSlgyak04TnM4K21Xb21ieXM1bXJXREo3YVlTb1FLQmdRRGViM0R3UW5PcjRyTU5HZ21IDQo5c3phdENGV3F4b3VNYW5jV2x0dU9JckdrMXZZRHYxVzAwOFN3YmJWK0tHNkNYWW93WVhjSnpCV2xvdUNpZFE0DQpnT2h6VmpjM2R0UmhkREtlbDcvL2JPUXR6dFdUL0djYTJ5eGRwY0N1NWEzV2Q5a3BoSDVyLytsZVpzd2xaRFFKDQpXTVVqNUFVRldjcE9pQy9FVEZXcFBGZlU5UUtCZ1FET0VLb1hSdU9CYmlvNG9CNjdNSmw0d3E0NS9OaDB5UE9QDQp5TmhxMC9Yb00wQ2k5WnFIZC9lYkFyRTA0dlVQUjVJYmJMbkJzdDNpTWpkUXdleHpGZVloS2JHZnh1MHNjc2E0DQpzK0d0NnZiSU1Ra2RjN2lWZFM2VTFScDViZDJsTkMzdWZ3UFM5eXhpeFNqbHZBWmwxODVxR083Um5YQ2JSYmtSDQpyV1VPNERBNmd3S0JnUUNLZ2VoWW8zaDF1dGQxdkJYZFJUQXdxMlBySE9aVGgzZFhFQ2pJeklxVnRtTEZlaWdFDQpyZFlhUHVmRCsydHhkYnpQQ2hwNWlTbVBjWFR6MXpGLzhiMU5QSTFyaXlJYWdRbVlPYlJEc0NHeDZJNlQ5T0tiDQpGWWxkMHYzVnFvMkI4K1VVOWp6bXNWYzNBbG55bXAvUWhpZFQvd09sWGxFY2I2OFcwOVd2YVRUa0ZRS0JnQmNxDQp1SFMxZTQ1cG5FV1JldU1BcThCdjRyYVNQcU9pay85dVRTWjFmZ2dFK3hkWEZYQjFoRmpoREpzdGlPK1cxRTVSDQpBdkZMOHJZamZ5U05LTkFuZmgvc1dCUG1nWE9sMDhHZ041Y2QrM0MyVXBnRkVwTjdBU21xYTdlTEtvZ1FQYm02DQpmZXVSN21PTVZ2UzlGdHNNVUNDTmZRd0Q3MDBGb2JEakZhRitndTJSQW9HQVU3ZzBtRHhEc2tkRys3NUUxdDlqDQpRTkZ3YlhNRm81KytaSDdLaDBqdzZwSTQwVkxGTVRUM2NVQWZDbmNiblovUFhieVdESWRCM1JsVHBxUXNQZ3pCDQpQeitTNHhZbVpVTmRHUUFTMnVUcXRJdGdvZkR0bUhOdjFmTkxBZFFoaFVIaG1UQzhYR0NuMHRrV1hrSE5haDlvDQp2eTdjVTdkUXNzS3hZa2pzN3phSXEzQT0NCi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0="

  Public 
  Key"LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBc3d3bm9wOFlFMnFxZWxwY3pZUy8NCnVEYWpPbmVKeTdtZ2d1TDRzcFg5RllKaTd4VXpDaExnd2NlZzhMUDZEWDcwR3U1RDFXd2x4R3pjcC9tdFFBRmQNClNtMmUyblpIQUJnOS9hT3hoV2g0dHNVRlV1UmpiMXdQWTFaN1h0MyttM3FJVDFIWU8vcEYzV0QwOFVETUlkVi8NCkhoL0RCMlpJMWlTQ01HSUZ5T0NxSGJ1dDI5aVVSeEQ0SHlqM0xmN3hDQTVSMFpMRUNjdElGaEJqVkVGcUhYWkYNCm9IYXNHQ1ZqZGdEYVJFQ3Z6eDhBUVZKVHQrZkhGUGgxTVIrdlZmNHdFbFNsVjZoRkVTbmpMWmtUeHV6aUFIekcNClVKWWZkV05MdHpXbG04TEI1UDJkMitOYk1xR2ZtU096UG0vODF0QmxWTFM3cEpmWkt3aFFHc3NGWTZaNkZTRjcNClh3SURBUUFCDQotLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0="


