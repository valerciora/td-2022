var api = require('./src/api.js').app;
const fs = require('fs');
const motorcyclesFilepath = './src/motorcycles.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/motorcycles', function (request, response) {
  response.json(getMotorcycles());
});

api.get('/motorcycles/:id', function (request, response) {
  let car = getMotorcycleById(request.params.id);
  if (car) response.json(car);
  response.json('not found');
});

api.put('/motorcycles', function (request, response) {
  saveMotorcycle(request.body);
  response.json('User was saved succesfully');
});

api.post('/motorcycles', function (request, response) {
  // in request o sa-mi vina un obiect de tip car care o sa aiba un anumit id
  // console.log(request.body);//un obiect de tipul car actualizat pe client
  // citim cars din fisier pe baza id-ului primit de la client
  let motorcycle = request.body;
  let motorcycles = getMotorcycles();// citire json din fisier
  // cautam daca exista id de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  for(let i=0; i < motorcycles.length; i++) {
    if (motorcycles[i].id === motorcycle.id) {
      motorcycles[i] = motorcycle;
    }
  }

  // salvam in fisier produsele actualizate
  try {
    fs.writeFileSync(motorcyclesFilepath, JSON.stringify(motorcycles));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }

  response.json('Motorcycle was updated succesfully');
});

api.delete('/motorcycles/:index', function (request, response) {
  // delete din fisier pe baza unui id
  // cars.splice(request.params.index, 1);
  console.log(request.params.index);
  response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getMotorcycles() {
  let motorcycles = [];
  try {
    motorcycles = JSON.parse(fs.readFileSync(motorcyclesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return motorcycles;
}

function saveMotorcycles(motorcycle) {
  let motorcycles = getMotorcycles();// citire json din fisier
  let maxId = getMaxId(motorcycles);  // get maximum id form cars array
  motorcycle.id = maxId+1;// generare id unic
  motorcycles.push(motorcycle);// adaugare motocicleta noua in array
  try {
    fs.writeFileSync(motorcyclesFilepath, JSON.stringify(motorcycles));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(motorcycles) {
  let max = 0;
  for (var i=0; i<motorcycles.length;i++) {
    if(max < motorcycles[i].id) {
      max = motorcycles[i].id;
    }
  }
  return max;
}

function getMotorcycleById(id){
  let motorcycles = getMotorcycles();// citire json din fisier
  let selectedMotorcycle = null;
  for(var i=0; i<motorcycles.length; i++) {
    if(id == motorcycles[i].id) selectedMotorcycle = motorcycles[i];
  }
  return selectedMotorcycle;
}
