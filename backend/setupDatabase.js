const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'rishith', 
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');


  connection.query('CREATE DATABASE IF NOT EXISTS auth_login', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists.');

    // Use the database
    connection.query('USE auth_login', (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        return;
      }

      // Create the users table
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;

      connection.query(createUsersTable, (err) => {
        if (err) {
          console.error('Error creating users table:', err);
          return;
        }
        console.log('Users table created or already exists.');
        connection.end();
      });
    });
  });
});
