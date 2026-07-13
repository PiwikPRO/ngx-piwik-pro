# Releasing

Maintainer guide for publishing a new version of `@piwikpro/ngx-piwik-pro` to npm.

> This is an Angular workspace. The publishable library lives in
> [`projects/ngx-piwik-pro/`](./projects/ngx-piwik-pro) and that is where its
> `package.json` (and version) lives — the repo-root `package.json` is the
> private workspace root (`0.0.0`). `CHANGELOG.md` and `README.md` live in the
> repo root.

## Prerequisites

- You have merge rights to `master` and your working tree is clean.
- CI on `master` is green.
- Publishing to npm is automated: it runs from `.github/workflows/main.yml`
  when a **GitHub Release** is published, using the `NPM_TOKEN` secret. You do
  not run `npm publish` by hand.

## Versioning

We follow [Semantic Versioning](https://semver.org):

- **patch** (`x.y.Z`) — bug fixes, dependency bumps, no public API change.
- **minor** (`x.Y.0`) — new backwards-compatible functionality.
- **major** (`X.0.0`) — breaking changes.

## The changelog

`CHANGELOG.md` (in the repo root) follows the
[Keep a Changelog](https://keepachangelog.com) convention and is generated from
git history by [auto-changelog](https://github.com/cookpete/auto-changelog) —
each entry comes from a merged pull request, so the quality of the changelog
depends on clear PR titles.

The changelog lists **released versions only** — there is no persistent
"Unreleased" section, since it would go stale between releases. The entry for a
new version is produced automatically as part of the release (see below), by the
`version` npm lifecycle hook — you never generate the changelog by hand. To
preview what will be in the next release at any time, use the GitHub compare
view (`<last-tag>...HEAD`), or run `npx auto-changelog --unreleased --stdout`
from `projects/ngx-piwik-pro/` (read-only, prints to the terminal without
touching the file).

## Release steps

Releases go through a pull request, like everything else — do **not** push the
version bump or a tag directly to `master`. The tag is created by the GitHub
Release **after** the PR is merged, so it points at the real squash-merge commit
on `master`.

1. Start a release branch from an up-to-date `master`:

   ```sh
   git checkout master && git pull
   git checkout -b release/x.y.z
   ```

2. Bump the version of the library workspace (run from the repo root — the `-w`
   flag targets `projects/ngx-piwik-pro`). This does **not** create a commit or
   tag — `projects/ngx-piwik-pro/.npmrc` sets `git-tag-version=false`, so
   `npm version` only edits `projects/ngx-piwik-pro/package.json`. The `version`
   npm lifecycle hook still runs (with the workspace as its working directory),
   so it also regenerates the root changelog (adds the new version heading +
   commits since the last release) and bakes the version into the build
   (`projects/ngx-piwik-pro/src/version.ts`):

   ```sh
   npm version <patch|minor|major> -w @piwikpro/ngx-piwik-pro
   ```

3. Commit and push the branch:

   ```sh
   git commit -am "chore(release): x.y.z"
   git push -u origin release/x.y.z
   ```

4. Open a pull request titled **`chore(release): x.y.z`** and squash-merge it
   into `master`. This is what lands the changelog and version bump on `master`.

5. On GitHub, create a **Release** with a **new tag** `x.y.z` targeting `master`.
   GitHub creates the tag on the merged commit. Use the matching `CHANGELOG.md`
   section as the release notes.

6. Publishing the GitHub Release triggers `main.yml`, which builds
   (`ng build ngx-piwik-pro`) and publishes `dist/ngx-piwik-pro` to npm. Verify
   at <https://www.npmjs.com/package/@piwikpro/ngx-piwik-pro>.

## Notes

- When you create the GitHub Release, type the tag **unprefixed** (`2.6.1`, not
  `v2.6.1`). This matches the existing tag history and the changelog compare
  links, which auto-changelog derives from the (unprefixed) `package.json`
  version. The tag is created by the GitHub Release, so this is a manual
  convention — nothing enforces it automatically.
- If a release fails to publish, fix the issue and re-publish the GitHub
  Release (or re-run the `main.yml` workflow); you do not need a new version
  for a failed publish.
