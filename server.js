const express = require('express')
const { body, validationResult } = require('express-validator');
const app = express();
const port =3000;

//Middleware untuk membaca JSON
app.use(express.json());

//data product
let dataProduct = [
    {id: 1, name:"Buku Tulis", price: 3500, stock: 15},
    {id: 2, name:"Pensil", price: 1500, stock: 30},
    {id: 3, name:"Baju Pramuka", price: 80000, stock: 10},
    {id: 4, name:"Sendal", price: 25000, stock: 17},
];

//Mengambil semua data
app.get('/api/product', (req,res) => {
    res.json({ status: 'success',data: dataProduct });
});

//Menambahkan data baru
app.post('/api/product',[
      //validasi nama wajib diisi
        body('name').notEmpty().withMessage('Nama tidak boleh kosong'),
        
        //validasi harga angka harus positif
        body('price').notEmpty().withMessage('Harga tidak boleh negatif'),

        //validasi stock angka harus positif
        body('stock').notEmpty().withMessage('Stock tidak boleh negatif')
], (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        //Jika data Tidak Valid, kirim error
        return res.status(400).json({errors: errors.array() });      
    }

    //Jika data lolos
    const { name, price } = req.body;

    //Proses menambah data baru
    const productBaru = {
        id: dataProduct.length + 1,
        name: name,
        price: Number(price),
        stock: Number(stock)
    };

    dataProduct.push(productBaru);

    res.status(201).json({
        status: 'Produk berhasil ditambahkan', 
        data: productBaru
    });
});

//Menjalankan server
app.listen(3000, () => console.log('Server berjalan di port 3000'));
