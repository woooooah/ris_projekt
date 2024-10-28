const express = require('express');
const app = express();
const path = require('path');

// Servirajte statične datoteke iz trenutne mape
app.use(express.static(path.join(__dirname)));

// Zaženite strežnik na portu 3000
app.listen(3000, () => {
    console.log('Frontend server running on http://localhost:3000');
});
