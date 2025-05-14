# validateGit.ps1
Write-Host 'Validando Git setup...'

# Verificar versão do Git
git --version

# Verificar se estamos dentro de um repositório Git
if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
    Write-Error 'Este diretório não é um repositório Git.'
    exit 1
} else {
    Write-Host 'Repositório Git detectado.'
}

# Verificar branch atual
$branch = git branch --show-current
Write-Host 'Branch atual:' $branch

# Verificar origem remota
try {
    $remote = git remote get-url origin
    Write-Host 'Remote origin:' $remote
} catch {
    Write-Warning 'Remote origin não configurado.'
}

# Verificar se há modificações não commitadas
$status = git status --porcelain
if ($status) {
    Write-Warning 'Existem modificações não commitadas:'
    Write-Host $status
} else {
    Write-Host 'Sem modificações não commitadas.'
}

# Verificar .gitignore
$gitignore = Get-Content '.gitignore'
if ($gitignore -match 'node_modules') { Write-Host '.gitignore inclui node_modules.' } else { Write-Warning '.gitignore não inclui node_modules.' }
if ($gitignore -match '\.env')      { Write-Host '.gitignore inclui .env.' }           else { Write-Warning '.gitignore não inclui .env.' }

Write-Host 'Validação Git concluída.'