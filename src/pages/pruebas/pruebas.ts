let resultado = '1. Guacamole:blablabla\n' +
    '2. Ensalada de tomate y cebolla:blablabla\n' +
    '3. Salsa de tomate y cebolla para tacos o fajitas:blablabla.'
console.log(resultado)

var separateLines = resultado.split(/\r?\n|\r|\n/g);
// console.log(resultado)
console.log(separateLines)
separateLines[0].pop()
console.log(separateLines)
// console.log(separateLines[0])
//
// var parteInicial = separateLines[0].split(':',1);
// console.log(parteInicial)
// console.log(separateLines)
//
// var parteFinal = separateLines[0].substring(separateLines[0].indexOf(':')+1)
// var parteFinal2 = separateLines[0].substring(separateLines[0].indexOf(':')+1,separateLines[0].indexOf('-'))
// console.log('final ' + parteFinal )

// const plateWithoutFood = new File(['PLATOSINCOMIDA.png'], 'image.png', {type: 'image/png'});
// console.log(plateWithoutFood)