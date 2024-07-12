import express from 'express';
import cors from 'cors';
import { searchRouter } from './routes/search';
const app = express();
app.use(cors());
const port = 3001;
app.use('/search', searchRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

