import UserProfile from './UserProfile.js';

let userProfile = new UserProfile;
let usernameInputElement = document.getElementById("input");
let main = document.getElementById("main");
const userInfoRequestUrl = "https://api.github.com/users/"
let container = document.createElement('div');

usernameInputElement.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        let username = event.target.value;
        container.innerHTML = '';

        fetch(userInfoRequestUrl + username)
            .then(response => {
                if (!response.ok) {
                    failureHandler(`I can't found user...`);
                    return;
                }
                return response.json();
            })
            .then(jsonData => {
                successHandler(jsonData);
            });
    }
});

function successHandler(jsonData) {
    container.append(userProfile.makeUserProfile(jsonData));
    main.append(container);
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

