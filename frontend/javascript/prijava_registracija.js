
/*
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const ime = document.getElementById('name').value;
    const priimek = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const geslo = document.getElementById('password').value;

    const adminEmails = ['kaja.vidmar@gmail.com', 'sanja.mursic@gmail.com', 'tara.sedovsek@gmail.com']; 
    const admin = adminEmails.includes(email.toLowerCase());


    const uporabnik = {
        ime: ime,
        priimek: priimek,
        email: email,
        username: username,
        geslo: geslo,
        admin: admin
    };

    fetch('http://localhost:8080/api/uporabniki')
    .then(response => response.json())
    .then(data => console.log(data));

    // Pošlji zahtevo na backend
    fetch('http://localhost:8080/api/uporabniki/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uporabnik)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(text => { throw new Error(text); });
        }
    })
    .then(data => {
        document.getElementById('result').innerHTML = `<p style="color: green;">Uporabnik ${data.username} uspešno registriran!</p>`;
    })
    .catch(error => {
        document.getElementById('result').innerHTML = `<p style="color: red;">Napaka: ${error.message}</p>`;
    });
});*/


//PRIKAZ VSEH UPORABNIKOV DELA
/*
fetch('http://localhost:8080/api/uporabniki')
    .then(response => {
        if (!response.ok) {
            throw new Error('Napaka pri pridobivanju uporabnikov');
        }
        return response.json();
    })
    .then(data => {
        console.log('Shranjeni uporabniki:', data);
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        data.forEach(user => {
            userList.innerHTML += `
                <p>Uporabnik: ${user.ime} ${user.priimek}, Email: ${user.email}, Uporabniško ime: ${user.username}</p>
            `;
        });
    })
    .catch(error => console.error('Napaka:', error));
    */
/*
    document.getElementById('prijava').addEventListener('submit', async function (event) {
        event.preventDefault();
    
        // Pridobimo vrednosti iz vnosnih polj
        const email = document.getElementById('email').value.trim();
        const geslo = document.getElementById('password').value.trim();
    
        // Ustvarimo objekt z uporabniškimi podatki za prijavo
        const uporabnik = {
            email: email,
            geslo: geslo
        };
    
        // Pridobimo element za prikaz napak
        const error_div = document.getElementById('result');
        error_div.innerHTML = ''; // Počistimo prejšnja sporočila
    
        try {
            // Pošljemo zahtevek na API za prijavo
            const response = await fetch('http://localhost:8080/api/uporabniki/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uporabnik)
            });
    
            if (!response.ok) {
                // Če odgovor ni uspešen, prikažemo napako
                const errorText = await response.text();
                console.error('Napaka pri prijavi:', errorText);
                error_div.innerHTML = `<p style="color: red;">Napaka pri prijavi: ${errorText}</p>`;
            } else {
                // Če je prijava uspešna, pridobimo podatke o uporabniku
                const user = await response.json();
                console.log('Prijava uspešna:', user);
    
                // Shrani uporabnika v localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(user));
    
                // Prikaz sporočila o uspešni prijavi
                error_div.innerHTML = `<p style="color: green;">Prijava uspešna! Dobrodošli, ${user.username}!</p>`;
    
                // Preusmeritev na index.html
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        } catch (error) {
            // Prikaz napake, če pride do težav s povezavo ali drugim problemom
            console.error('Napaka:', error);
            error_div.innerHTML = `<p style="color: red;">Napaka pri prijavi: ${error.message}</p>`;
        }
    });
    */
   /*
    document.getElementById('registracija').addEventListener('submit', async function (event) {
        event.preventDefault();
    
        // Pridobimo vrednosti iz obrazca
        const ime = document.getElementById('name').value.trim();
        const priimek = document.getElementById('surname').value.trim();
        const email = document.getElementById('email').value.trim();
        const username = document.getElementById('username').value.trim();
        const geslo = document.getElementById('password').value.trim();
    
        // Ustvarimo objekt uporabnika
        const uporabnik = {
            ime: ime,
            priimek: priimek,
            email: email,
            username: username,
            geslo: geslo,
            admin: false
        };
    
        // Pošljemo zahtevek na backend
        try {
            const response = await fetch('http://localhost:8080/api/uporabniki/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uporabnik)
            });
    
            if (!response.ok) {
                // Če je prišlo do napake
                const errorText = await response.text();
                document.getElementById('result').innerHTML = `<p style="color: red;">Napaka pri registraciji: ${errorText}</p>`;
            } else {
                // Če je registracija uspešna
                const data = await response.json();
                document.getElementById('result').innerHTML = `<p style="color: green;">Registracija uspešna! Dobrodošli, ${data.username}!</p>`;
            }
        } catch (error) {
            // Prikaz napake v primeru težav s povezavo
            console.error('Napaka pri registraciji:', error);
            document.getElementById('result').innerHTML = `<p style="color: red;">Napaka pri registraciji: ${error.message}</p>`;
        }
    });*/

    document.getElementById('registracija').addEventListener('submit', async function (event) {
        event.preventDefault();
    
        // Pridobimo vrednosti iz obrazca
        const ime = document.getElementById('name').value.trim();
        const priimek = document.getElementById('surname').value.trim();
        const email = document.getElementById('email').value.trim();
        const username = document.getElementById('username').value.trim();
        const geslo = document.getElementById('password').value.trim();
    
        // Pripravimo podatke za pošiljanje
        const uporabnik = {
            ime: ime,
            priimek: priimek,
            email: email,
            username: username,
            geslo: geslo
        };
    
        // Pošljemo zahtevek na backend
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = ''; // Počistimo prejšnja sporočila
    
        try {
            const response = await fetch('http://localhost:8080/api/uporabniki/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(uporabnik),
            });
    
            if (response.ok) {
                const data = await response.json();
                resultDiv.innerHTML = `<p style="color: green;">Registracija uspešna! Dobrodošli, ${data.username}.</p>`;
            } else {
                const errorText = await response.text();
                resultDiv.innerHTML = `<p style="color: red;">Napaka pri registraciji: ${errorText}</p>`;
            }
        } catch (error) {
            console.error('Napaka:', error);
            resultDiv.innerHTML = `<p style="color: red;">Napaka pri povezavi s strežnikom: ${error.message}</p>`;
        }
    });
    