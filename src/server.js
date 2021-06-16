import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
    user: 'bootcamp_role',
    host: 'localhost',
    port: 5432,
    database:'pratica_gerenciador_financeiro_9560838b',
    password:'senha_super_hiper_ultra_secreta_do_role_do_bootcamp'
});

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/finances', (req, res) => {
const {value, description, event_type} = req.body;
const query = connection.query('INSERT INTO financial_events ("value", "description", "event_type") VALUES ($1, $2, $3)', [value, description, event_type]);

query.then(result => {
    console.log(result.rows);
});

  // connection.query('INSERT INTO financial_events (value, description, event_type) VALUE ($1, $2, $3)');.then(result => {
  //   res.send(result.rows);
  // });
});


app.get('/api/finances', (req, res) => {
    connection.query('SELECT * FROM financial_events').then(result => {
      res.send(result.rows); //testar com const result= await connectio...
    });
  });


app.listen(4000, () => {
    console.log('Server listening on port 4000 .');
  });

