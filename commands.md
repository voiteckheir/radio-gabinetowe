
# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.17.0 create --template minimal --types ts --add prettier eslint tailwindcss="plugins:typography,forms" --install npm stronav1
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.




* https://git-scm.com/cheat-sheet

* https://git-scm.com/cheat-sheet.pdf

# Getting Started
### Start a new repo:
* git init
### Clone an existing repo:
* git clone <url>

# Prepare to Commit
### Add untracked file or unstaged changes:
* git add <file>
### Add all untracked files and unstaged changes:
* git add .
### Choose which parts of a file to stage:
* git add -p
### Move file:
*git mv <old> <new>
### Delete file:
* git rm <file>
### Tell Git to forget about a file without deleting it:
* git rm --cached <file>
### Unstage one file:
* git reset <file>
### Unstage everything:
* git reset
### Check what you added:
* git status

# Make Commits
### Make a commit (and open text editor to write message):
* git commit
### Make a commit:
* git commit -m 'message'
### Commit all unstaged changes:
* git commit -am 'message

# Move Between Branches
### Switch branches:
* git switch <name>
### OR
* git checkout <name>
### Create a branch:
* git switch -c <name>
### OR
* git checkout -b <name>
### List branches:
* git branch
### List branches by most recently committed to:
* git branch --sort=-committerdate
### Delete a branch:
* git branch -d <name>
### Force delete a branch:
* git branch -D <name>


# Ways to refer to a commit
### Every time we say <commit>, you can use any of these:
★ a branch
* main
★ a tag
* v0.1
★ a commit ID 
* 3e887ab
★ a remote branch
* origin/main
★ current commit 
* HEAD
★ 3 commits ago
* HEAD^^^ or HEAD~3

# Discard Your Changes
### Delete unstaged changes to one file:
* git restore <file>
### OR
* git checkout <file>
### Delete all staged and unstaged changes to one file:
* git restore --staged --worktree <file>
### OR
* git checkout HEAD <file>
### Delete all staged and unstaged changes:
* git reset --hard
### Delete untracked files:
* git clean
### 'Stash' all staged and unstaged changes:
* git stash
