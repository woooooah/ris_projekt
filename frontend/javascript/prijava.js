document.addEventListener('DOMContentLoaded', function () {
    const prijavaForm = document.getElementById('prijava');
    if (prijavaForm) {
        prijavaForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            console.log('Obrazec prijava oddan');
            
            const email = document.getElementById('email').value.trim();
            const geslo = document.getElementById('password').value.trim();
            
            const uporabnik = { email, geslo };
            
            try {
                const response = await fetch('http://localhost:8080/api/uporabniki/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(uporabnik)
                });
                
                if (!response.ok) {
                    const errorText = await response.text();
                    document.getElementById('result').innerHTML = `<p style="color: red;">Napaka pri prijavi: ${errorText}</p>`;
                } else {
                    const data = await response.json();

                    // Prikaz sporočila o uspešni prijavi
                    document.getElementById('result').innerHTML = `<p style="color: green;">Prijava uspešna! Dobrodošli, ${data.username}!</p>`;

                    // Shranimo podatke uporabnika v localStorage
                    localStorage.setItem('loggedInUser', JSON.stringify(data));

                    // Dodamo gumb za odjavo v div z ID "odjava"
                    dodajGumbZaOdjavo(data.username);

                    // Preusmeritev na index.html
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                }
            } catch (error) {
                document.getElementById('result').innerHTML = `<p style="color: red;">Napaka pri povezavi: ${error.message}</p>`;
            }
        });
    } else {
        console.error('Obrazec prijava ne obstaja');
    }

    // Preverimo, ali je uporabnik že prijavljen
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        dodajGumbZaOdjavo(loggedInUser.username);
    }
});

// Funkcija za dodajanje gumba za odjavo
function dodajGumbZaOdjavo(username) {
    const odjavaDiv = document.getElementById('odjava');

    if (!odjavaDiv) {
        console.error('Div z ID "odjava" ne obstaja.');
        return;
    }

    // Počistimo vsebino odjavaDiv, da preprečimo podvajanje
    odjavaDiv.innerHTML = '';

    // Ustvarimo gumb za odjavo
    const logoutButton = document.createElement('button');
    logoutButton.className = 'btn btn-outline-danger';
    logoutButton.id = 'logoutButton';
    logoutButton.textContent = `Odjava`;

    // Dodamo gumb v odjavaDiv
    odjavaDiv.appendChild(logoutButton);

    // Dodamo dogodkovno obravnavo za odjavo
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('loggedInUser'); // Odstranimo podatke o prijavi
        location.reload(); // Osvežimo stran
    });
}
