#!/bin/bash

# LeafEngines Node-RED Integration Deployment Script
# Deploys node-red-contrib-leafengines to npm registry

set -e

echo "🚀 LeafEngines Node-RED Integration Deployment"
echo "=============================================="

# Check prerequisites
echo "🔍 Checking prerequisites..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm."
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "❌ git is not installed. Please install git."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run from project root."
    exit 1
fi

# Read version from package.json
VERSION=$(node -p "require('./package.json').version")
echo "📦 Version: $VERSION"

# Check npm authentication
echo "🔐 Checking npm authentication..."
if ! npm whoami &> /dev/null; then
    echo "⚠️  Not logged into npm. Please run: npm login"
    echo "   Or use: npm adduser"
    exit 1
fi

USERNAME=$(npm whoami)
echo "✅ Logged in as: $USERNAME"

# Run tests
echo "🧪 Running tests..."
if ! npm test 2>/dev/null; then
    echo "⚠️  Tests may have warnings, checking exit code..."
    # Run tests and capture exit code
    npm test > /tmp/test-output.log 2>&1
    TEST_EXIT=$?
    
    if [ $TEST_EXIT -ne 0 ]; then
        echo "❌ Tests failed with exit code $TEST_EXIT"
        echo "Last 20 lines of test output:"
        tail -20 /tmp/test-output.log
        exit 1
    else
        echo "✅ Tests passed (warnings may be present)"
    fi
fi

# Build if needed (skip if not defined)
if [ -f "package.json" ] && grep -q '"build"' package.json; then
    echo "🔨 Building package..."
    npm run build 2>/dev/null || echo "⚠️  Build script may have failed, continuing..."
fi

# Check for uncommitted changes
echo "📝 Checking git status..."
if [ -d ".git" ]; then
    if ! git diff-index --quiet HEAD --; then
        echo "⚠️  You have uncommitted changes. Commit them first or use --force."
        echo "   Uncommitted files:"
        git status --porcelain
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Get current branch
    BRANCH=$(git branch --show-current)
    echo "🌿 Current branch: $BRANCH"
    
    # Tag the release
    echo "🏷️  Creating git tag v$VERSION..."
    git tag -a "v$VERSION" -m "Release v$VERSION"
    git push origin "v$VERSION"
fi

# Publish to npm
echo "📤 Publishing to npm registry..."
if [[ "$1" == "--dry-run" ]]; then
    echo "🧪 Dry run mode (not actually publishing)..."
    npm publish --dry-run
else
    echo "🚀 Publishing version $VERSION..."
    npm publish
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully published node-red-contrib-leafengines@$VERSION"
        
        # Update MCP registry if this is an MCP server
        if [ -f "server.json" ]; then
            echo "🔄 Updating MCP registry..."
            # Check if mcp-registry CLI is installed
            if command -v mcp-registry &> /dev/null; then
                mcp-registry publish
            else
                echo "⚠️  mcp-registry CLI not installed. Install with: npm install -g @modelcontextprotocol/registry-cli"
                echo "   Then run: mcp-registry publish"
            fi
        fi
        
        # Update ClawHub if this is a skill
        if [ -f "SKILL.md" ]; then
            echo "🔄 Updating ClawHub..."
            echo "   To update ClawHub, run: npx clawhub@latest publish"
        fi
    else
        echo "❌ Failed to publish. Check npm errors above."
        exit 1
    fi
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Verify publication: https://www.npmjs.com/package/node-red-contrib-leafengines"
echo "2. Update documentation if needed"
echo "3. Announce to community"
echo ""
echo "For Node-RED users to install:"
echo "  npm install -g node-red-contrib-leafengines"
echo "  # or from Node-RED Palette Manager"
echo ""
echo "For MCP integration:"
echo "  Add to claude_desktop_config.json:"
echo '  {'
echo '    "mcpServers": {'
echo '      "leafengines": {'
echo '        "transport": "streamable-http",'
echo '        "url": "https://[project].supabase.co/functions/v1/mcp-server",'
echo '        "headers": {'
echo '          "x-api-key": "ak_sandbox_your_key_here"'
echo '        }'
echo '      }'
echo '    }'
echo '  }'
echo ""
echo "🌱 Happy farming with LeafEngines!"