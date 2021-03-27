const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');
const fs = require('fs');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./public/test', (err) => {
    if (err) console.error(err);
});

let sql = 'SELECT * FROM "table"';

db.all(sql, (err, rows) => {
    if (err) throw err;
    rows.forEach((row) => {
        console.log(row);
    });
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('perform-action', (event, ...args) => {
    console.log(args);
});

ipcMain.handle('save', (event, data) => {
    fs.appendFile('file.txt', data, (err) => {
        if (err) throw err;
    })
})

// function fileHandler() {
//     fs.readFile('file.txt', 'utf8', (err, data) => {
//         if (err) throw err;
//         console.log(data);
//     });
// }

// function addToFile(data) {
//     fs.appendFile('file.txt', data, (err) => {
//         if (err) throw err;
//     })
// }

// addToFile('new line');
// fileHandler();

