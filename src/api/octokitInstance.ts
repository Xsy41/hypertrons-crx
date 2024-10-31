import { Octokit } from '@octokit/rest';

let octokit = new Octokit();

export function updateGithubToken(newToken: string) {
  octokit = new Octokit({
    auth: newToken,
  });
}

export function getOctokitInstance() {
  return octokit;
}
