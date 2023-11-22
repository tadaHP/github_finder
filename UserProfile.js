export default class UserProfile {
    makeUserProfile(jsonData) {
        let userProfileContainer = document.createElement('div');
        userProfileContainer.classList.add('container', 'after-search', 'card', 'mb-3');
        userProfileContainer.id = 'user-info';

        let h3 = document.createElement('h3');
        h3.classList.add('card-header')
        h3.textContent = jsonData['login'];

        let userDetailContainer = document.createElement('div');
        userDetailContainer.id = 'user-details';

        userProfileContainer.append(h3, userDetailContainer);

        userDetailContainer.append(
            this.#makeUserProfileImageElement(jsonData),
            this.#makeUserProfileDetailElement(jsonData)
        );

        return userProfileContainer;
    }

    #makeLatestRepos(jsonData) {
        let repoContainer = document.createElement('div');
    }

    #makeUserProfileImageElement(jsonData) {
        let userProfileElement = document.createElement('div');
        userProfileElement.id = 'user-profile';

        let profileImageElement = document.createElement('img');
        profileImageElement.src = jsonData['avatar_url'];
        profileImageElement.style.width = '15vw';
        profileImageElement.style.height = '15vw';
        profileImageElement.alt = '프로필 사진';

        let viewProfileElement = document.createElement('button');
        viewProfileElement.classList.add('btn', 'btn-lg', 'btn-primary');
        viewProfileElement.type = 'button';
        viewProfileElement.textContent = 'View Profile';

        viewProfileElement.addEventListener('click', function () {
            window.open(jsonData['html_url'], '_blank');
        });

        userProfileElement.append(profileImageElement, viewProfileElement);

        return userProfileElement;
    }

    #makeUserProfileDetailElement(jsonData) {
        let container = document.createElement('div');

        //div
        let infoBadgeContainer = document.createElement('div');
        infoBadgeContainer.classList.add('button-container');

        //span
        let publicRepoBadge = document.createElement('span');
        publicRepoBadge.classList.add('badge', 'bg-primary');
        publicRepoBadge.textContent = 'Public Repos: ' + jsonData['public_repos'];

        let publicGistsBadge = document.createElement('span');
        publicGistsBadge.classList.add('badge', 'bg-secondary');
        publicGistsBadge.textContent = 'Public Gists: ' + jsonData['public_gists'];

        let followersBadge = document.createElement('span');
        followersBadge.classList.add('badge', 'bg-success');
        followersBadge.textContent = 'Followers: ' + jsonData['followers'];

        let followingBadge = document.createElement('span');
        followingBadge.classList.add('badge', 'bg-info');
        followingBadge.textContent = 'Following: ' + jsonData['following'];

        infoBadgeContainer.append(publicRepoBadge, publicGistsBadge, followersBadge, followingBadge);

        //ul
        let detailsListElement = document.createElement('ul');
        detailsListElement.classList.add('list-group');
        detailsListElement.id = 'user-details-list';

        // li
        let companyListElement = document.createElement('li');
        companyListElement.classList.add('list-group-item', 'd-flex', 'justify-content-between',
            'align-items-center', 'user-detail-info');
        companyListElement.textContent = 'Company: ' + jsonData['company'];

        let outerSiteListElement = document.createElement('li');
        outerSiteListElement.classList.add('list-group-item', 'd-flex', 'justify-content-between',
            'align-items-center', 'user-detail-info');
        outerSiteListElement.textContent = 'Website/Blog: ' + jsonData['blog'];

        let locationListElement = document.createElement('li');
        locationListElement.classList.add('list-group-item', 'd-flex', 'justify-content-between',
            'align-items-center', 'user-detail-info');
        locationListElement.textContent = 'Location: ' + jsonData['location'];

        let createdAtElement = document.createElement('li');
        createdAtElement.classList.add('list-group-item', 'd-flex', 'justify-content-between',
            'align-items-center', 'user-detail-info');
        createdAtElement.textContent = 'Member Since: ' + jsonData['created_at'];

        detailsListElement.append(companyListElement, outerSiteListElement, locationListElement, createdAtElement);

        container.append(infoBadgeContainer, detailsListElement);
        return container;
    }

}