# AlzheimerApp

Aplicativo de assistência e monitoramento para pessoas com Alzheimer e seus cuidadores.

## Tecnologias

- **Frontend:** React Native com TypeScript
- **Backend e Autenticação:** Supabase
- **Navegação:** React Navigation
- **Mapas:** `react-native-maps` (a ser instalado)
- **Build e Desenvolvimento:** Expo (com foco em Development Builds)

## Configuração do Ambiente de Desenvolvimento

### ✅ Pré-requisitos (Concluído)

1.  **Node.js e npm:** Instale a versão LTS em [nodejs.org](https://nodejs.org/). **(OK)**
2.  **Git (CLI):** Você precisa do Git instalado localmente para usar os comandos `git` no terminal. Instale em [git-scm.com](https://git-scm.com/). **(OK)**
    * Após a instalação, **feche e reabra o VS Code** (ou use 'Developer: Reload Window') para que o novo PATH seja aplicado ao terminal integrado.
    * Ter uma conta no GitHub (github.com) é útil para hospedar repositórios remotos, mas não substitui a instalação do Git local para versionamento.
    * O próprio VS Code oferece integração visual de Git, mas ela depende do Git CLI instalado e disponível no `Path`. Sem Git instalado, os comandos de versionamento no VS Code não funcionarão.
    * Após a instalação, feche e reabra o terminal (ou o VS Code) para que a variável `Path` seja recarregada.
    * Após a instalação, abra um terminal e execute:
      ```powershell
      git --version
      ```
      para garantir que o comando seja reconhecido. Se der erro, verifique se `C:\Program Files\Git\cmd` está incluso no `Path` do sistema.
3.  **Docker Desktop:** Instale em [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop). **(OK)**
4.  **Android Studio:** Instale em [developer.android.com/studio](https://developer.android.com/studio). **(OK)**
    *   Durante a instalação, certifique-se de que o **Android SDK** e **Android SDK Platform-Tools** sejam instalados. **(OK)**
    *   Configure um emulador Android através do AVD Manager no Android Studio ou prepare um dispositivo físico para testes. **(OK)**
5.  **Expo CLI (opcional globalmente, mas `npx expo` é preferido):**
    ```bash
    npm install -g expo-cli
    ```
    **(OK, mas use preferencialmente npx expo ...)**

### ✅ Configuração das Variáveis de Ambiente (Windows) (Concluído)

1.  **Encontre o Local do Android SDK:**
    *   Abra o Android Studio.
    *   Vá em `File > Settings > Appearance & Behavior > System Settings > Android SDK`.
    *   Copie o caminho exibido em "Android SDK Location" (ex: `C:\Users\ricardo.l.junior\AppData\Local\Android\Sdk`). **(OK)**

2.  **Defina `ANDROID_HOME` como variável de sistema:**
    *   Pesquise por "variáveis de ambiente" no Windows e abra "Editar as variáveis de ambiente do sistema".
    *   Clique em "Variáveis de Ambiente...".
    *   Em "Variáveis do sistema", clique em "Novo..." ou "Editar...".
        *   Nome da variável: `ANDROID_HOME`
        *   Valor da variável: `C:\Users\ricardo.l.junior\AppData\Local\Android\Sdk`
    *   Clique OK. **(OK)**

3.  **Adicione o SDK Platform-Tools ao `Path` do sistema:**
    *   Em "Variáveis do sistema", selecione `Path` e clique em "Editar...".
    *   Certifique-se de que existam as seguintes entradas:
        - `%ANDROID_HOME%\platform-tools`
        - `%ANDROID_HOME%\tools`
        - `%ANDROID_HOME%\emulator`
    *   Clique OK em todas as janelas. **(OK)**

4.  **Reinicie o computador ou o PowerShell** para garantir que as variáveis sejam recarregadas. **(OK)**

### ✅ Testes de Ambiente (Concluído)

No PowerShell, execute:

```powershell
echo $env:ANDROID_HOME
adb version
node -v
npm -v
```

- O caminho do SDK deve aparecer corretamente.
- O comando `adb version` deve mostrar a versão do Android Debug Bridge.
- Node.js e npm devem mostrar versões válidas.

### ✅ Verificar emulador Android (Concluído)

- Abra o Android Studio > Virtual Device Manager e inicie um emulador.
- No PowerShell:
  ```powershell
  adb devices
  ```
  Deve listar pelo menos um dispositivo (emulador).

### ✅ Instalar dependências do projeto (Concluído)

No diretório do projeto:
```powershell
npm install
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/stack
npm install @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @supabase/supabase-js
npm install --save-dev @types/react @types/react-native
```

### ✅ Rodar o app com Expo Go (Recomendado)
1. No terminal, execute com workaround de SSL:
   ```powershell
   $env:NODE_TLS_REJECT_UNAUTHORIZED=0; npx expo start --host lan
   ```
2. No seu dispositivo ou emulador com Expo Go instalado (deve ser compatível com SDK 51):
   - Abra o Expo Go e escaneie o QR code exibido no terminal.
3. Acompanhe os logs no terminal do Metro Bundler. Você deverá ver uma linha como:
   ```
   Supabase session: { ... }
   ```

> Dica: se aparecer erro de incompatibilidade de SDK, instale a versão do Expo Go para SDK 51:
> https://expo.dev/go?sdkVersion=51&platform=android&device=true

### ✅ Docker Desktop e Metro Bundler (Concluído)

- O container Docker é criado e iniciado com o comando:
  ```powershell
  docker-compose up --build
  ```
- O Metro Bundler do Expo inicia normalmente dentro do container.
- Logs do container mostram:
  - "Starting Metro Bundler"
  - Aviso sobre NODE_TLS_REJECT_UNAUTHORIZED=0 (ignorar certificado SSL autoassinado)
  - Mensagem "Waiting on http://localhost:8081" (ou similar)
- As portas 19000, 19001, 19002 e 8081 estão expostas e acessíveis.
- O app pode ser conectado ao Metro Bundler do container normalmente.

---

## Estrutura do Projeto

```
AlzheimerApp/
├── android/                # Código nativo Android (gerado pelo prebuild)
├── ios/                    # Código nativo iOS (gerado pelo prebuild)
├── src/
│   ├── assets/             # Imagens, fontes, etc.
│   ├── components/         # Componentes React reutilizáveis
│   ├── constants/          # Constantes (cores, chaves de API)
│   ├── contexts/           # React Context API
│   ├── hooks/              # Custom React Hooks
│   ├── navigation/         # Configuração do React Navigation
│   ├── screens/            # Telas do aplicativo
│   ├── services/           # Lógica de Supabase, localização, etc.
│   ├── types/              # Definições TypeScript globais
│   └── utils/              # Funções utilitárias
├── .env                    # Variáveis de ambiente (NÃO versionar)
├── .env.example            # Exemplo de variáveis de ambiente
├── .gitignore
├── app.json                # Configuração do Expo
├── App.tsx                 # Componente raiz do aplicativo
├── babel.config.js
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

### ℹ️ Sobre arquivos `.env` e `.env.example`

- O arquivo `.env` deve conter **suas variáveis reais e sensíveis** (como SUPABASE_URL e SUPABASE_ANON_KEY). Ele **NÃO deve ser versionado** (já está no `.gitignore`).
- O arquivo `.env.example` é apenas um modelo de referência, mostrando quais variáveis são necessárias para rodar o projeto. Ele **NÃO deve conter dados reais**, apenas exemplos ou instruções.

Exemplo de `.env.example`:
```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_anon_key_aqui
```

Exemplo de `.env` (com seus dados reais):
```
SUPABASE_URL=https://oboxvhheuyjqkbmcaxyu.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Próximos Passos (Funcionalidades)

- [ ] Configurar Supabase Auth.
- [ ] Implementar rastreamento de localização com `react-native-maps`.
- [ ] Desenvolver Geofencing.
- [ ] Adicionar monitoramento de bateria.
- [ ] Criar botão de pânico.
- [ ] Configurar notificações push.
- [ ] Implementar gerenciamento de contatos de emergência.
- [ ] Focar na UI/UX e acessibilidade.

## Linters e Formatters (A Ser Configurado)

- ESLint
- Prettier

## Testes (A Ser Configurado)

- Jest
- React Testing Library
