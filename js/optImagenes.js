const sharp = require('sharp');
const fs = require('fs');

// const inputImage = '../img/AlitasPollo.webp';
const files = fs.readdirSync('../img/');
const outputDir = '../imgOptim/';
const sizes = [480, 768, 1080];
const formats = ['webp'];

if(!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, {recursive: true});
}

function resize(rutaCompleta, nombre){
    if(nombre.substr(nombre.length - 3) != "svg"){
        nombre = nombre.slice(0, -5);
        sizes.forEach(size => {
            formats.forEach(format => {
                sharp(rutaCompleta).resize(size).toFormat(format, {
                    quality: 80,
                })
                .toFile(`${outputDir}${nombre}-${size}.${format}`, (err, info) => {
                    if(err){
                        console.error("ERROR al generar la imagen ${size}px en formato ${format}:", err);
                    }else{
                        console.log(`Generada imagen ${size}px en formato ${format}:`, info);
                    }
                });
            });
        });
    }
    
}

const promises = files.map(imagen => resize('../img/'+imagen, imagen));

Promise.all(promises)
  .then(() => console.log('Done'))
  .catch(e => console.error(e));
