# AlzheimerApp

Aplicativo de assistência e monitoramento para pessoas com Alzheimer e seus cuidadores.

## Tecnologias
- Frontend: React Native com TypeScript
- Backend e Autenticação: Supabase
- Naveção: React Navigation
- Mapas: react-native-maps (a instalar)
- Build e Dev: Expo (Metro Bundler)
- Container: Docker (Docker Compose)

## Índice

1. Pré-requisitos
2. Instalação do Ambiente
3. Configuração de Variáveis de Ambiente
4. Validação do Setup
5. Executando o App
6. Estrutura do Projeto
7. Próximos Passos
8. Linters, Formatters e Testes
9. Fluxo de Trabalho Git
10. Funcionalidades Implementadas
11. Banco de Dados no Supabase
12. Ajustes de Código
13. Acessando o App em um Dispositivo Físico

---

## 1. Pré-requisitos
Antes de começar, garanta que você tenha as seguintes ferramentas instaladas no seu sistema Windows:

1. **Node.js (LTS)**
   - Baixe e instale de https://nodejs.org/
   - Após a instalação, abra o PowerShell e verifique:
     ```powershell
     node -v  # Exemplo: v20.5.1
     npm -v   # Exemplo: 9.8.1
     ```

2. **Git CLI**
   - Baixe e instale de https://git-scm.com/
   - Feche e reabra o terminal para atualizar o PATH.
   - Verifique:
     ```powershell
     git --version  # Exemplo: git version 2.49.0.windows.1
     ```

3. **GitHub CLI (gh)**
   - Opcional, mas recomendado para criar/manter o repositório remoto.
   - Instale via Winget:
     ```powershell
     winget install --id GitHub.cli -e --source winget
     ```
   - Feche e reabra o terminal.
   - Verifique:
     ```powershell
     gh --version  # Exemplo: gh version 2.72.0 (2025-04-30)
     ```

4. **Docker Desktop**
   - Baixe e instale de https://docker.com/products/docker-desktop
   - Garanta que o Docker esteja em execução.

5. **Android Studio + SDK/Platform-Tools**
   - Baixe e instale de https://developer.android.com/studio
   - Durante a instalação, marque *Android SDK* e *Android SDK Platform-Tools*.
   - Abra o AVD Manager e crie/execute um emulador.

6. **Expo CLI**
   - Opcionalmente instale globalmente (mas `npx expo` é preferido):
     ```powershell
     npm install -g expo-cli
     ```

---

## 2. Instalação do Ambiente
1. Clone ou copie este repositório em `C:\PROJETOS_DEV\AlzheimerApp`.
2. Abra o PowerShell neste diretório:
   ```powershell
   cd C:\PROJETOS_DEV\AlzheimerApp
   ```
3. Instale as dependências do projeto:
   ```powershell
   npm install
   ```

---

## 3. Configuração de Variáveis de Ambiente
1. **Crie um arquivo `.env`** na raiz (use o `.env.example` como modelo):
   ```ini
   SUPABASE_URL=https://seu-projeto.supabase.co
   SUPABASE_ANON_KEY=SEU_ANON_KEY
   ```
2. **Configurar `ANDROID_HOME` e `Path`:**
   - Abra *Editar variáveis de ambiente do sistema*.
   - Em *Variáveis de Sistema*, adicione:
     - `ANDROID_HOME` = `C:\Users\<seu-user>\AppData\Local\Android\Sdk`
   - No `Path`, inclua:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\tools`
     - `%ANDROID_HOME%\emulator`
   - Reinicie o PowerShell.

---

## 4. Validação do Setup
Execute cada comando abaixo e verifique se o resultado corresponde ao exemplo.

1. **Node.js e npm**
   ```powershell
   node -v   # v20.x.x
   npm -v    # 9.x.x
   ```

2. **Git**
   ```powershell
   .\validateGit.ps1
   ```
   - Esperado: sem erros, detecta repo, branch `main`, remote configurado e sem modificações.

3. **GitHub CLI**
   ```powershell
   gh --version
   ```
   - Exemplo de saída: `gh version 2.72.0 (2025-04-30)`.

4. **Supabase**
   ```powershell
   npm run validate:supabase
   ```
   - Exemplo: `Supabase session válida: null`.

5. **Android SDK / ADB**
   ```powershell
   echo $env:ANDROID_HOME
   adb devices
   ```
   - Deve mostrar o caminho do SDK e listar ao menos um emulador.

---

## 5. Executando o App
### 5.1 Com Expo Go (dispositivo ou emulador)
1. No PowerShell:
   ```powershell
   $env:NODE_TLS_REJECT_UNAUTHORIZED=0; npx expo start --host lan
   ```
2. No aplicativo Expo Go no seu celular, escaneie o QR code exibido.
3. Garanta que PC e celular estejam na mesma rede Wi-Fi e que as portas (19000-19002, 8081) estejam liberadas pelo firewall.

---

## 6. Estrutura do Projeto
```text
AlzheimerApp/
├── android/              # código nativo Android (apk, configuração Gradle)
├── ios/                  # código nativo iOS (Xcode project, gerado pelo prebuild)
├── src/                  # código fonte em TypeScript e assets React Native
│   ├── assets/           # imagens, fontes e outros recursos estáticos
│   ├── components/       # componentes React reutilizáveis
│   ├── constants/        # constantes de projeto (cores, chaves de API)
│   ├── contexts/         # React Contexts para estado global
│   ├── hooks/            # hooks customizados (ex: useLocation)
│   ├── navigation/       # definições de navegação (React Navigation)
│   ├── screens/          # telas do app organizadas por módulo
│   ├── services/         # serviços externos (ex: cliente Supabase)
│   ├── types/            # definições de tipos TypeScript
│   └── utils/            # funções utilitárias
├── .env                  # variáveis de ambiente reais (não commitar)
├── .env.example          # modelo das variáveis de ambiente
├── docker-compose.yml    # orquestra container de Metro Bundler
├── Dockerfile            # imagem com Metro Bundler em Docker
├── App.tsx               # componente raiz do aplicativo
├── app.json              # configuração do Expo
├── babel.config.js       # configuração do Babel
├── package.json          # dependências e scripts npm
├── tsconfig.json         # configuração TypeScript
├── validateGit.ps1       # script PowerShell para validar setup Git
├── validateSupabase.ts   # script para validar conexão com Supabase
└── README.md             # este guia de setup
```

---

## 7. Próximos Passos
- Configurar Supabase Auth
- Implementar mapas (react-native-maps)
- Geofencing e Monitoramento de Localização (Nova feature)
  - Pessoa Assistida:
    1. Definir locais seguros (zonas sem monitoramento).
    2. Registrar percurso fora das zonas seguras com envio automático para o cuidador.
    3. Histórico de localização para revisão posterior.
    4. Aprovar ou recusar vínculo com cuidadores.
    5. Configurar permissões para múltiplos cuidadores.
  - Cuidador:
    1. Receber alertas quando pessoa assistida ultrapassa zonas seguras.
    2. Histórico de localização das pessoas assistidas.
    3. Solicitar vínculo com pessoas assistidas (por ID/email).
    4. Monitorar múltiplas pessoas assistidas de forma separada.

---

## 8. Linters, Formatters e Testes
- ESLint & Prettier: a configurar
- Testes com Jest / React Testing Library

---

## 9. Fluxo de Trabalho Git
Este projeto usa o **GitHub Flow**, um modelo simples e eficiente para colaboração e versionamento.

### 9.1 O que é uma *branch*?
- Uma *branch* (ramo) é uma linha de desenvolvimento isolada. Evita que mudanças experimentais afetem o código estável em `main`.

### 9.2 Criando e trocando de branch
1. Sempre parta da `main`:
   ```powershell
   git checkout main
   git pull origin main
   ```
2. Crie uma branch de feature/correção:
   ```powershell
   git checkout -b feature/minha-feature
   ```
   - Use nomes claros: `feature/login`, `fix/crash-ao-abrir`

### 9.3 Trabalhando na sua branch
- 1. Edite o código nos arquivos necessários e salve.
- 2. Verifique o que mudou:
  ```powershell
  git status
  ```
  Mostra arquivos modificados e não rastreados.
- 3. Adicione mudanças ao stage:
  - Para arquivos específicos:
    ```powershell
    git add src/path/MeuComponente.tsx src/utils/helper.ts
    ```
  - Para todas as mudanças de uma vez:
    ```powershell
    git add .
    ```
- 4. Faça commits claros e atômicos:
  ```powershell
  git commit -m "feat(login): valida campo de senha e exibe mensagem de erro"
  ```
  Prefixos comuns: `feat:` (novas funcionalidades), `fix:` (correções), `docs:` (documentação), `chore:` (tarefas auxiliares).
- 5. Teste localmente sua feature antes de prosseguir.

### 9.4 Manter sua branch atualizada
Enquanto desenvolve, sincronize sua branch com a `main` para evitar conflitos:
```powershell
# volte à main e baixe alterações
git checkout main
git pull origin main
# volte à feature e incorpore as mudanças
git checkout feature/minha-feature
git merge main
```
Se houver conflitos, edite os arquivos marcados, teste e faça commit.

### 9.5 Enviando para o repositório remoto
Depois de alguns commits locais, envie sua branch:
```powershell
git push -u origin feature/minha-feature
```
A opção `-u` configura a branch remota como upstream.

### 9.6 Abrindo um Pull Request (PR)
1. No GitHub, acesse o repositório e clique em **Compare & pull request**.
2. Escolha `feature/minha-feature` como branch de origem e `main` como destino.
3. Adicione título e descrição claros (objetivo, mudanças principais, como testar).
4. Solicite revisão de colegas, se aplicável.

### 9.7 Revisão de Código e Aprovação
- Revisores podem comentar e solicitar ajustes.
- Faça correções na mesma branch, commit e push: o PR atualiza automaticamente.
- Quando aprovado e sem conflitos, prossiga para mesclar.

### 9.8 Mesclando o Pull Request
- Use o botão **Merge pull request** no GitHub.
- Selecione *Squash and merge* ou *Create a merge commit*, conforme sua preferência.
- Apague a branch remota clicando em **Delete branch**.

### 9.9 Limpeza das Branches Locais
Após o merge, exclua a branch local:
```powershell
git checkout main
git pull
git branch -d feature/minha-feature
```

### 9.10 Protegendo a branch `main`
No GitHub, vá em **Settings > Branches > Branch protection rules** e ative:
- Revisão obrigatória de PR antes de mesclar.
- Verificação automática de testes e lint.

Dessa forma você mantém o repositório organizado, evita erros na `main` e facilita o trabalho em equipe.

### 9.11 Automação com GitFlow (script)
Para tornar o fluxo de branches e Pull Requests mais rápido, criamos um pequeno script em `scripts/gitflow.js` usando Git e GitHub CLI.

1. Crie uma branch de feature:
   ```powershell
   npm run gitflow start <nome-da-feature>
   ```
   - O script:
     - Atualiza `main` (checkout + pull)
     - Cria e troca para `feature/<nome-da-feature>`

2. Envie a branch e abra Pull Request:
   ```powershell
   npm run gitflow pr <nome-da-feature>
   ```
   - O script:
     - Faz `git push --set-upstream origin feature/<nome-da-feature>`
     - Executa `gh pr create --fill --base main --head feature/<nome-da-feature>`

Pré-requisitos:
- Node.js + npm instalados
- Git CLI no PATH
- GitHub CLI autenticado (`gh auth login`)

---

## 10. Funcionalidades Implementadas
- Autenticação Fictícia (AuthContext) com perfis de Cuidador e Pessoa Assistida.
- Navegação condicional por perfil.
- Monitoramento de localização (MonitoringContext).
- Gerenciamento de Zonas Seguras (SafeZoneScreen):
  - Seleção de coordenadas tocando no mapa;
  - Visualização de zonas como círculos e marcadores;
  - Adicionar/remover zonas seguras.
- Registro de Rotas e Histórico (RouteHistoryScreen).
- Gestão de relacionamentos:
  - Solicitação de vínculo (RequestLinkScreen).
  - Aprovação/Rejeição e listagem de cuidadores (RelationshipScreen).
  - Listagem de pessoas assistidas vinculadas (CareRelationshipsScreen).

---

## 11. Banco de Dados no Supabase

Execute o script SQL abaixo no SQL Editor do Supabase para criar as tabelas necessárias:
```sql
-- Habilita extensão para UUIDs
create extension if not exists "pgcrypto";

-- Safe Zones
create table if not exists safe_zones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  center_lat double precision not null,
  center_lng double precision not null,
  radius double precision not null,
  created_at timestamp with time zone default now()
);

-- Histórico de Localização
create table if not exists location_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  latitude double precision not null,
  longitude double precision not null,
  recorded_at timestamp with time zone default now()
);

-- Solicitações de Vínculo
create table if not exists relationship_requests (
  id uuid primary key default gen_random_uuid(),
  caregiver_id uuid not null references auth.users(id) on delete cascade,
  patient_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  requested_at timestamp with time zone default now(),
  responded_at timestamp with time zone
);
```

---

## 12. Ajustes de Código
- Atualizado `src/services/supabase/client.ts` para inicializar o cliente apenas se as variáveis de ambiente estiverem definidas.
- Adicionados aliases `AuthProvider`/`useAuth` em `AuthContext.tsx` para compatibilidade.
- `react-native-screens` ativado em `App.tsx` via `enableScreens()` antes da navegação.
- Contextos de Monitoramento e Relacionamento preparados para usar as novas tabelas.

---

## 13. Acessando o App em um Dispositivo Físico

### 13.1 Preparação do Ambiente

1. **Certifique-se de que o computador e o celular estão na mesma rede Wi-Fi**
   - Ambos dispositivos devem conseguir se comunicar na rede local
   - Evite redes corporativas com firewalls restritivos

2. **Configure as variáveis de ambiente**
   - Crie o arquivo `.env` na raiz do projeto com:
     ```properties
     # IP da sua máquina na rede local
     REACT_NATIVE_PACKAGER_HOSTNAME=192.168.x.x
     
     # Credenciais do Supabase (necessárias para o app funcionar)
     EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
     EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
     ```
   - Substitua `192.168.x.x` pelo IP real da sua máquina na rede Wi-Fi
   - Descubra seu IP usando `ipconfig` no PowerShell

3. **Instale o aplicativo Expo Go no celular**
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)

### 13.2 Executando o App

1. **Inicie o servidor Metro em modo LAN**
   ```powershell
   cd C:\PROJETOS_DEV\AlzheimerApp
   $env:NODE_TLS_REJECT_UNAUTHORIZED=0; npx expo start -c --host lan
   ```

2. **Conecte-se pelo Expo Go**
   - Abra o Expo Go no celular
   - Escaneie o QR code exibido no terminal
   - Para iOS: use a câmera do aparelho
   - Para Android: use o scanner dentro do app Expo Go

3. **Requisitos de rede**
   - Certifique-se de que as portas `8081` e `19000-19002` estejam liberadas no firewall
   - Desabilite temporariamente antivírus que bloqueiem conexões locais

### 13.3 Resolução de Problemas

- **App não conecta ao servidor Metro**
  - Verifique se o HOSTNAME no `.env` está correto
  - Tente temporariamente desativar o firewall do Windows
  - Use o prompt `e` no terminal para enviar o link por email/SMS

- **Erro de certificado**
  - O uso de `NODE_TLS_REJECT_UNAUTHORIZED=0` é necessário em alguns ambientes de desenvolvimento
  - Esta configuração deve ser usada apenas em ambiente de desenvolvimento

- **App carrega mas ocorrem erros de API**
  - Verifique se as credenciais do Supabase estão corretas no `.env`
  - Confirme que as tabelas necessárias foram criadas no painel do Supabase

### 13.4 Resumo de Comandos Úteis

```powershell
# Verificar seu IP na rede (use o resultado no .env)
ipconfig

# Limpar cache e iniciar o servidor em modo LAN
$env:NODE_TLS_REJECT_UNAUTHORIZED=0; npx expo start -c --host lan

# Recarregar em caso de problemas
$env:NODE_TLS_REJECT_UNAUTHORIZED=0; npx expo start -c --host lan --clear
```

---
