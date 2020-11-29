import app from './../app';

const port = process.env.PORT || 3000;
const IP = process.env.IP || '';

app.listen(Number(port), IP, () => {
    console.log('*****************************');
    console.log(`${process.env.PROJECT_NAME} - ${process.env.NODE_ENV}`);
    console.log(`app listening - ${IP || 'localhost'}:${port}`);
    console.log('*****************************');
});
