---
title: Oh My ZSH 配置
---

## zsh 配置

```shell
// ~/.zshrc

# 代理
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
# brew 镜像
export HOMEBREW_PIP_INDEX_URL="https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple"
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
export HOMEBREW_INSTALL_FROM_API=1
# golang proxy
export GOPROXY=https://mirrors.aliyun.com/goproxy/
# nvm node 镜像
# export NVM_NODEJS_ORG_MIRROR=https://mirrors.aliyun.com/nodejs-release/
# fnm node 镜像
# export FNM_NODE_DIST_MIRROR=https://mirrors.aliyun.com/nodejs-release/
# mise node 镜像
# export MISE_NODE_MIRROR_URL=https://mirrors.aliyun.com/nodejs-release/
export MISE_NODE_MIRROR_URL=https://nodejs.org/dist/
# qwen cli
export OPENAI_API_KEY="sk-xxx"
export OPENAI_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
export OPENAI_MODEL="qwen3-coder-plus"

# alias Start
alias zshconfig="mate ~/.zshrc"
alias ohmyzsh="mate ~/.oh-my-zsh"
alias gcr="git checkout release-pre"
alias gcpay="git checkout release-pay"
alias gcva="git checkout release-va"
alias gcmx="git checkout release-mx"
alias gb="git branch --sort=-committerdate --format='%(color:cyan)%(authordate:short) %(color:bold blue)%(refname:short)'"
alias gbc="gb --contains"
alias gsta='git stash save -u'
alias codei="code-insiders"
alias vscode="code-insiders"
alias br="bun run"
alias brs="bun run start"
alias brd="bun run dev"
alias ws="webstorm"
alias yarniv="yarn install --verbose"
alias upall="brew update && brew upgrade && brew cu -a -y && brew cleanup && mas upgrade"
alias upall2="brew update && brew upgrade && brew upgrade --cask --greedy && brew cleanup && mas upgrade"
alias c="cursor"
alias py="python3"
alias gstl='git stash list --pretty=format:"%C(yellow)%h%Creset %C(cyan)%ad%Creset %C(magenta)%gs%Creset %C(green)%s%Creset" --date=format:"%Y-%m-%d %H:%M"'
alias claude='claude --allow-dangerously-skip-permissions'
# alias End

plugins=(
    git
    zsh-completions
    zsh-autosuggestions
    zsh-syntax-highlighting
    mise
)

# 更新所有 Homebrew 管理的软件（包括命令行工具和图形界面App）
function update_brew() {
  echo "==> 正在更新 Homebrew 本身..."
  brew update

  echo "\n==> 正在升级所有 Homebrew 软件包 (Formulae)..."
  brew upgrade

  echo "\n==> 正在升级所有 Homebrew 安装的应用程序 (Casks)..."
  # 我们加入 --greedy 参数来确保所有应用都被检查更新，即使它们有自动更新功能
  brew upgrade --cask --greedy

  echo "\n==> 正在清理旧版本的软件包和缓存..."
  brew cleanup

  echo "\n==> 正在检查您的系统是否存在问题..."
  brew doctor

  echo "\n✅ Homebrew 更新和维护完成！"
}

# 更新 Mac App Store 应用程序
function update_mas() {
  echo "正在更新 Mac App Store 应用程序..."
  mas upgrade
  echo "Mac App Store 应用程序更新完成！"
}

# 更新所有软件
function upall() {
  update_brew
  update_mas
}

```
