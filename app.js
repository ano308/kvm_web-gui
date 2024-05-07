const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Statische Dateien aus dem "public" Verzeichnis bereitstellen
app.use(express.static('public'));

// Endpunkt für das Ausführen des Skripts
app.post('/execute-script', (req, res) => {
    // Hier kannst du den Befehl angeben, den du ausführen möchtest
    exec('bash create_vm.sh', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
    res.send('Skript wird ausgeführt...');
});

app.get('/submit', (req, res) => {
    // Lese die übergebenen Variablen aus dem Query-String
    const country = req.query.country;
    const name = req.query.name

    // Rufe das Bash-Skript mit den übergebenen Variablen auf
    exec(`./public/mein_skript.sh ${country} ${name}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Fehler beim Ausführen des Skripts: ${error}`);
            return;
        }
        console.log(`Ausgabe des Skripts: ${stdout}`);
    });
	res.sendFile(path.join(__dirname, 'verify.html'));
});


// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

