const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static("public"));
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const server = app.listen(PORT, ()=>{
    console.log("servidor levantado!");
})

const productos = [];

router.get("/", (req, res)=>{
    res.json({ productos });
})

router.get("/:id", (req, res)=>{
    const id = req.params.id;
    const productoId = productos.find( p => p.id === id );
    if(productoId == undefined){
        res.json({Mensaje: "No existe el producto con ese id"})
    } else {
        res.json(productoId);
    }
})

router.post("/", (req, res)=>{
    
    productos.push({...req.body, id : productos.length + 1});
    res.json({mensaje: "Se agrego correctamente el producto!"});
})

app.use("/api/productos", router);