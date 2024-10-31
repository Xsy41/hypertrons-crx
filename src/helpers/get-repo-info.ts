import { metaStore } from '../api/common';

import $ from 'jquery';
import * as pageDetect from 'github-url-detection';
import elementReady from 'element-ready';
import { getRepositoryFullName } from '../api/githubApi';

export async function getRepoName() {
  const repoFullName = pageDetect.utils.getRepositoryInfo(window.location)!.nameWithOwner;
  // return repoFullName;
  const [owner, repo] = repoFullName.split('/');
  console.log(owner, repo);
  const tmp = await getRepositoryFullName(owner, repo);
  console.log('tmp', tmp);
  // return getRepositoryFullName(owner, repo)
  return tmp;
}

export function hasRepoContainerHeader() {
  const headerElement = $('#repository-container-header');
  return headerElement && !headerElement.attr('hidden');
}

export async function isRepoRoot() {
  return pageDetect.isRepoRoot();
}

/**
 * check if the repository is public
 */
export async function isPublicRepo() {
  const selector = 'meta[name="octolytics-dimension-repository_public"]';
  await elementReady(selector);
  // <meta name="octolytics-dimension-repository_public" content="true/false">
  const isPublic = $(selector).attr('content') === 'true';
  return pageDetect.isRepo() && isPublic;
}

export async function isPublicRepoWithMeta() {
  // console.log((await isPublicRepo()) && (await metaStore.has(await getRepoName())));
  return (await isPublicRepo()) && (await metaStore.has(await getRepoName()));
}
