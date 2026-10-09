#!/usr/bin/env bash
# Publish the already-built dist/ directory to a branch cPanel deploys.
# Fast-forward only. Do not force-push or orphan an existing branch:
# cPanel Git cannot Update from Remote unless the remote branch is a
# descendant of the checkout it already has.
set -euo pipefail

branch="${1:?branch name required}"
message="Publish built site from ${GITHUB_SHA:0:7} to ${branch}"

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

rm -rf /tmp/ge-dist
mkdir /tmp/ge-dist
cp -a dist/. /tmp/ge-dist/

if git fetch --depth=1 origin "refs/heads/${branch}:refs/remotes/origin/${branch}"; then
  git checkout -B "$branch" "origin/$branch"
else
  git checkout --orphan "$branch"
  git rm -rf --cached . >/dev/null 2>&1 || true
fi

find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -a /tmp/ge-dist/. .

# cPanel's YAML parser rejects CRLF, and git add will keep the old CRLF blob
# unless this file is rewritten and added with autocrlf off.
printf '%s\n' '---' 'deployment:' '  tasks:' '    - /bin/echo deployed' > .cpanel.yml

git add -A
git -c core.autocrlf=false add --renormalize -- .cpanel.yml
if git diff --cached --quiet; then
  git commit --allow-empty -m "$message"
else
  git commit -m "$message"
fi
git push origin "HEAD:${branch}"
