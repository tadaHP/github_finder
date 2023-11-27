import UserProfile from './UserProfile.js';
import UserRepo from "./UserRepo.js";

let userProfile = new UserProfile();
let userRepo = new UserRepo();
let usernameInputElement = document.getElementById("input");
let main = document.getElementById("main");
const userInfoRequestUrl = "https://api.github.com/users/"
let container = document.createElement('div');

let loadingIndicator = document.createElement("div");
loadingIndicator.classList.add('loader', 'loader-black', 'loader-1');

usernameInputElement.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        let username = event.target.value;
        container.innerHTML = '';
        console.log(username);

        main.append(loadingIndicator);
        document.querySelector('.loader').style.display = 'inline-block';

        fetch(userInfoRequestUrl + username)
            .then(response => {
                if (!response.ok) {
                    document.querySelector('.loader').style.display = 'none';
                    failureHandler(`I can't found user...`);
                    return;
                }
                return response.json();
            })
            .then(jsonData => {
                document.querySelector('.loader').style.display = 'none';
                successHandler(jsonData);
            });
    }
});

function successHandler(jsonData) {
    let latestRepoContainer


    fetch(jsonData['repos_url'])
        .then(response => {
            return response.json();
        })
        .then(responseJsonData => {
            latestRepoContainer = userRepo.makeLatestRepos(responseJsonData);
            container.append(userProfile.makeUserProfile(jsonData), latestRepoContainer);
            main.append(container);
        });


}




function failureHandler(message) {
    container.classList.add("error");

    let errorImage = document.createElement('img');
    errorImage.src = "img/404NotFound.svg";

    let h1ErrorMessage = document.createElement('h1');
    h1ErrorMessage.textContent = message;

    container.append(errorImage, h1ErrorMessage);
    main.append(container);
}

