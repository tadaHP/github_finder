export default class UserRepo {
    makeLatestRepos(repoJsonData) {
        let repoContainer = document.createElement('div');
        repoContainer.classList.add('container', 'd-flex', 'after-search');
        repoContainer.id = 'latest-repo';

        let h2 = document.createElement('h2');
        h2.textContent = 'Latest Repos';

        let repoContainers = this.#makeRepoContainers(repoJsonData);

        repoContainer.append(h2, repoContainers);

        return repoContainers;
    }

    #makeRepoContainers(repoJsonData) {
        let container = document.createElement('div');
        let iter = repoJsonData.length < 5 ? repoJsonData.length : 5;

        for (let i = 0; i < iter; i++) {
            let repoContainer = document.createElement('div');
            repoContainer.classList.add('repo-info', 'd-flex', 'after-search');

            let repoName = document.createElement('p');
            repoName.textContent = repoJsonData[i]['name']

            let badgeContainer = document.createElement('div');
            badgeContainer.classList.add('repo-badge', 'after-search');

            let starBadge = document.createElement('span');
            starBadge.classList.add('badge', 'bg-primary');
            starBadge.textContent = 'Stars: ' + repoJsonData[i]['stargazers_count']
            let watchersBadge = document.createElement('span');
            watchersBadge.classList.add('badge', 'bg-secondary');
            watchersBadge.textContent = 'Watchers: ' + repoJsonData[i]['watchers'];
            let forksBadge = document.createElement('span');
            forksBadge.classList.add('badge', 'bg-success');
            forksBadge.textContent = 'Forks: ' + repoJsonData[i]['forks'];

            badgeContainer.append(starBadge, watchersBadge, forksBadge);

            repoContainer.append(repoName, badgeContainer);

            container.append(repoContainer);
        }

        return container;
    }
};