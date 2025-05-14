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
2. No Expo Go, escaneie o QR code.
3. Aguarde até ver no terminal:
   ```text
   Supabase session: { ... }
   ```

### 5.2 Com Docker (Metro Bundler em container)
1. Inicie o container:
   ```powershell
   docker-compose up --build
   ```
2. Conecte o app Expo Go ao Metro na porta exposta (19000, 19001, 19002 e 8081).
3. Workaround SSL: o script já define `NODE_TLS_REJECT_UNAUTHORIZED=0` para ignorar certificados autoassinados.

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
- Geofencing
- Monitoramento de bateria
- Botão de pânico
- Notificações push

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
- Faça alterações e **salve** arquivos localmente.
- Adicione as mudanças ao stage:
  ```powershell
  git add arquivo1 arquivo2
  ```
- Crie commits pequenos e descritivos:
  ```powershell
  git commit -m "feat(login): adicionar botão de logout"
  ```

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
