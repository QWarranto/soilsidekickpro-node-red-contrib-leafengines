#!/bin/bash
# Manage dual GitHub repositories for LeafEngines Node-RED package

set -e

REPO1="https://github.com/QWarranto/node-red-contrib-leafengines.git"
REPO2="https://github.com/QWarranto/soilsidekickpro-node-red-contrib-leafengines.git"
LOCAL_DIR="/Users/reginaldrice/.openclaw/workspace/node-red-contrib-leafengines"

echo "🌱 LeafEngines Dual Repository Manager"
echo "======================================"

case "$1" in
    init)
        echo "📦 Initializing both repositories..."
        
        # Clean up and fresh clone
        echo "Cleaning up old directories..."
        rm -rf /tmp/repo1 /tmp/repo2 2>/dev/null || true
        
        # Clone repo1
        echo "Cloning repo1..."
        git clone "$REPO1" /tmp/repo1
        
        # Clone repo2
        echo "Cloning repo2..."
        git clone "$REPO2" /tmp/repo2
        
        echo "✅ Both repositories freshly cloned"
        ;;
        
    sync)
        echo "🔄 Syncing local changes to both repositories..."
        
        # Copy all files to both repos, excluding .git
        rsync -av --exclude='.git' "$LOCAL_DIR/" /tmp/repo1/ 2>/dev/null || true
        rsync -av --exclude='.git' "$LOCAL_DIR/" /tmp/repo2/ 2>/dev/null || true
        
        echo "✅ Files copied to both repositories (excluding .git)"
        ;;
        
    commit)
        echo "💾 Committing changes to both repositories..."
        
        if [ -z "$2" ]; then
            echo "❌ Please provide a commit message"
            echo "Usage: $0 commit \"Your message\""
            exit 1
        fi
        
        # Commit repo1
        cd /tmp/repo1
        git add .
        git commit -m "$2" || echo "No changes in repo1"
        
        # Commit repo2
        cd /tmp/repo2
        git add .
        git commit -m "$2" || echo "No changes in repo2"
        
        echo "✅ Changes committed to both repositories"
        ;;
        
    push)
        echo "🚀 Pushing to both repositories..."
        
        # Push repo1
        cd /tmp/repo1
        echo "Pushing to repo1..."
        git push origin main || echo "Failed to push repo1"
        
        # Push repo2
        cd /tmp/repo2
        echo "Pushing to repo2..."
        git push origin main || echo "Failed to push repo2"
        
        echo "✅ Pushed to both repositories (if changes exist)"
        ;;
        
    status)
        echo "📊 Repository Status:"
        
        echo ""
        echo "Repo1: $REPO1"
        if [ -d "/tmp/repo1" ]; then
            cd /tmp/repo1
            echo "  Local: $(pwd)"
            echo "  Branch: $(git branch --show-current 2>/dev/null || echo 'Not a git repo')"
            echo "  Changes: $(git status --porcelain 2>/dev/null | wc -l) files"
        else
            echo "  Not cloned locally"
        fi
        
        echo ""
        echo "Repo2: $REPO2"
        if [ -d "/tmp/repo2" ]; then
            cd /tmp/repo2
            echo "  Local: $(pwd)"
            echo "  Branch: $(git branch --show-current 2>/dev/null || echo 'Not a git repo')"
            echo "  Changes: $(git status --porcelain 2>/dev/null | wc -l) files"
        else
            echo "  Not cloned locally"
        fi
        ;;
        
    web)
        echo "🌐 Opening repository web pages..."
        open "https://github.com/QWarranto/node-red-contrib-leafengines"
        open "https://github.com/QWarranto/soilsidekickpro-node-red-contrib-leafengines"
        echo "✅ Browser tabs opened"
        ;;
        
    *)
        echo "Usage: $0 {init|sync|commit|push|status|web}"
        echo ""
        echo "Commands:"
        echo "  init     - Clone both repositories"
        echo "  sync     - Copy local files to both repos"
        echo "  commit   - Commit changes to both repos (provide message)"
        echo "  push     - Push changes to both repos"
        echo "  status   - Show status of both repos"
        echo "  web      - Open both repos in browser"
        echo ""
        echo "Example:"
        echo "  $0 init"
        echo "  $0 sync"
        echo "  $0 commit \"Update documentation\""
        echo "  $0 push"
        exit 1
        ;;
esac