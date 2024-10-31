// import { getGithubToken, saveGithubToken } from '../helpers/github-token';

// export const githubRequest = async (endpoint: string, options: RequestInit = {}): Promise<any | null> => {
//   const token = await getGithubToken();
//   if (!token) {
//     return null;
//   }

//   try {
//     const response = await fetch(`https://api.github.com${endpoint}`, {
//       ...options,
//     });
//     return response.json();
//   } catch (error) {
//     return null;
//   }
// };

// export { saveGithubToken, getGithubToken };

import { getOctokitInstance } from './octokitInstance';

async function getGithubDeveloper() {
  try {
    let octokit = getOctokitInstance();
    const { data } = await octokit.rest.users.getAuthenticated();
    return data;
  } catch (error) {
    return null;
  }
}

async function getRepositoryFullName(owner: string, repo: string) {
  const cacheKey = `repoFullName_${owner}_${repo}`;
  const cachedData = await getFromLocalCache(cacheKey);
  if (cachedData) {
    // console.log('使用缓存数据');
    return cachedData;
  }
  let octokit = getOctokitInstance();
  const { data } = await octokit.search.repos({
    q: `repo:${owner}/${repo}`,
  });
  saveToLocalCache(cacheKey, data.items[0].full_name);
  return data.items[0].full_name;
}

async function getFromLocalCache(key: string): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key] || null);
    });
  });
}

// 将数据存储到 chrome.storage.local
function saveToLocalCache(key: string, data: string) {
  chrome.storage.local.set({ [key]: data }, () => {
    // console.log('缓存数据成功', key, data);
  });
}

export { getGithubDeveloper, getRepositoryFullName };
