#!/bin/bash

# MADAS SaaS Platform - Push to GitHub with Token
# This script helps you push your code using a GitHub Personal Access Token

echo "🚀 MADAS SaaS Platform - Push to GitHub"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Please run this script from the sys directory"
    exit 1
fi

echo "📋 Current repository status:"
git status --short
echo ""

echo "🔐 To push to GitHub, you need a Personal Access Token"
echo ""
echo "📝 Steps to get a GitHub Personal Access Token:"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click 'Generate new token (classic)'"
echo "3. Give it a name: 'MADAS Platform'"
echo "4. Select scopes: 'repo' (full control of private repositories)"
echo "5. Click 'Generate token'"
echo "6. Copy the token (you won't see it again!)"
echo ""

read -p "Do you have a GitHub Personal Access Token? (y/n): " has_token

if [ "$has_token" = "y" ] || [ "$has_token" = "Y" ]; then
    echo ""
    echo "🔑 Enter your GitHub Personal Access Token:"
    read -s github_token
    
    if [ -n "$github_token" ]; then
        echo ""
        echo "🚀 Pushing to GitHub..."
        
        # Set the remote URL with token
        git remote set-url origin https://${github_token}@github.com/Hussein-Osamaa/Undo.git
        
        # Push the code
        if git push -u origin main; then
            echo ""
            echo "✅ Successfully pushed to GitHub!"
            echo ""
            echo "🎉 GitHub Actions should now be running!"
            echo "📊 Check your Actions tab: https://github.com/Hussein-Osamaa/Undo/actions"
            echo ""
            echo "🔧 Next steps:"
            echo "1. Add GitHub Secrets for Vercel deployment"
            echo "2. Monitor the deployment progress"
            echo "3. Configure environment variables"
        else
            echo ""
            echo "❌ Failed to push to GitHub"
            echo "Please check your token and try again"
        fi
    else
        echo "❌ No token provided"
    fi
else
    echo ""
    echo "📋 Alternative methods to push:"
    echo ""
    echo "1. 🌐 GitHub Web Interface:"
    echo "   - Go to: https://github.com/Hussein-Osamaa/Undo"
    echo "   - Upload files manually"
    echo ""
    echo "2. 🖥️ GitHub Desktop:"
    echo "   - Download GitHub Desktop"
    echo "   - Clone the repository"
    echo "   - Push changes"
    echo ""
    echo "3. 🔑 Personal Access Token:"
    echo "   - Run this script again after getting a token"
    echo ""
    echo "4. 🔐 SSH Key:"
    echo "   - Set up SSH keys for GitHub"
    echo "   - Use SSH URL instead of HTTPS"
fi

echo ""
echo "📚 For more help, see: GITHUB_ACTIONS_SETUP.md"
