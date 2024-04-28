document.getElementById('getJoke').addEventListener('click', getJoke);
document.getElementById('saveJoke').addEventListener('click', saveJoke);

async function getJoke() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        showJoke(data.value);
    } catch (error) {
        console.error('Fail to get Joke:', error);
    }
}

function showJoke(joke) {
    document.getElementById('joke').innerText = joke;
}

async function saveJoke() {
    let joke = document.getElementById('joke').innerText;

    // Verificar si hay un chiste en pantalla
    if (!joke.trim()) {
        alert("There are no jokes to add to favorites.");
        return;
    }

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Verificar si el chiste ya está en la lista de favoritos
    if (!favorites.includes(joke)) {
        favorites.push(joke);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteList();
        
        // Mostrar la notificación con SweetAlert2
        await Swal.fire({
            title: 'Joke added to Favorites!',
            imageUrl: 'https://media.giphy.com/media/4Z3DdOZRTcXPa/giphy.gif',
            imageAlt: 'Chuck Norris approves',
            confirmButtonText: 'Ok'
        });
    } else {
        // Mostrar la notificación con SweetAlert2
        await Swal.fire({
            title: 'This joke is already in your favorites!',
            imageUrl: 'https://media.giphy.com/media/L0HIznJ2hn4WndRshY/giphy.gif',
            imageAlt: 'Chuck Norris Watches You',
            confirmButtonText: 'Aw...'
        });
    }
}

async function removeJoke(index){
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Verificar si hay elementos en la lista de favoritos
    if (favorites.length === 0) {
        alert("No jokes to remove from favorites.");
        return;
    }

    const { value: confirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: "You are about to remove this joke from your favorites.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      });

    if (confirmed) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteList();
        
        Swal.fire(
            'Removed!',
            'The joke has been removed from your favorites.',
            'success'
        );
    }
}

function updateFavoriteList() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let favoriteList = document.getElementById('favorites');
    favoriteList.innerHTML = '';
    favorites.forEach((joke, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = joke;
        favoriteList.appendChild(listItem);
        listItem.textContent = joke;

        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => removeJoke(index));

        listItem.appendChild(removeButton);
        favoriteList.appendChild(listItem);
    });
}

window.addEventListener('load', updateFavoriteList);

document.getElementById('startButton').addEventListener('click', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar.style.display === 'none') {
        navbar.style.display = 'block'; 
    } else {
        navbar.style.display = 'none'; 
    }
});
