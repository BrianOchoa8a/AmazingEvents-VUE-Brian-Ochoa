//Estructura de tarjetas html
function estructuraTarjeta (datos){
    return `<div class="card col-md-4 stile-card" style="width: 18rem;">
    <img src="${datos.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${datos.name}</h5>
      <p class="card-text">${datos.description}</p>
      <div  class="d-flex justify-content-between">            
        <h6>$${datos.price}</h6>
        <a href="./pages/details.html?parametro=${datos._id}" class="btn btn-primary">Details</a></div>
     </div>
    </div>`
    }

//lista de tarjetas
export function listaEstructura (tarjetas){
      let tarjeteros="";
      for (let individual of tarjetas) {
              tarjeteros = tarjeteros + estructuraTarjeta(individual);
      }
      return tarjeteros;
}

//Estructura de tarjetas past and upcoming
function estructuraTarjetaUpPast (datos){
  return `<div class="card col-md-4 stile-card" style="width: 18rem;">
  <img src="${datos.image}" class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${datos.name}</h5>
    <p class="card-text">${datos.description}</p>
    <div  class="d-flex justify-content-between">            
      <h6>$${datos.price}</h6>
      <a href="./details.html?parametro=${datos._id}" class="btn btn-primary">Details</a></div>
   </div>
  </div>`
  }

//estructura 
export function listaEstructuraUpPast (tarjetas){
    let tarjeteros="";
    for (let individual of tarjetas) {
            tarjeteros = tarjeteros + estructuraTarjetaUpPast(individual);
    }
    return tarjeteros;
}

 //Estructura de Check   
function estructuracheck (datos){
    return `<div>
    <div class="d-flex">
      <label>
        <input type="checkbox" id="${datos}" name="${datos}" value="${datos}"/>
        ${datos}
      </label>
      </div>
    </div>`
}

//lista de tarjetas cheked
export function lista (tarjetas){
    let tarjetero="";
    for (let individual of tarjetas) {
        tarjetero = tarjetero + estructuracheck(individual);
    }
return tarjetero;
}

  //filtrado por check
function filtroPorCheck(array){
     const nodeListCheck = document.querySelectorAll("input[type=checkbox]:checked");
     const arrayChech = Array.from(nodeListCheck);
     const arrayValores = arrayChech.map( input => input.value);
     const filtradosCheck = array.filter(evento=>(arrayValores.includes(evento.category))|| arrayValores.length==0);
     return(filtradosCheck);
}

// filtro search
function filtroSearch(array, input){
    let tarjetaFiltrada = array.filter(tarjetas => tarjetas.name.toLowerCase().includes(input.toLowerCase()))
    return tarjetaFiltrada;
};
  
  //filtro cruzado
export function filtrosCruzados(api, input, contenedor){
    let filtroTotal = filtroSearch(filtroPorCheck(api), input.value)
    contenedor.innerHTML=listaEstructura(filtroTotal);
};

  //filtro cruzado pastAndUpcoming
  export function filtrosCruzadosPastUp(api, input, contenedor){
    let filtroTotal = filtroSearch(filtroPorCheck(api), input.value)
    contenedor.innerHTML=listaEstructuraUpPast(filtroTotal);
};

//Filtro fecha Past events
 export function filtroFecha (listaSinFiltro,fechaCurrent){
  let filtradas = listaSinFiltro.filter(tarjeta => tarjeta.date <= fechaCurrent)
  return filtradas;
}

//Filtro fecha Upcoming events
export function filtroFechaUpcoming (listaSinFiltro,fechaCurrent){
  let filtradas = listaSinFiltro.filter(tarjeta => tarjeta.date >= fechaCurrent)
  return filtradas;
}

//Estructura details
export function crearTarjeta(tarjeta){
  return `<img src=${tarjeta.image} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${tarjeta.name}</h5>
    <p class="card-text">${tarjeta.description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">category: ${tarjeta.category}</li>
    <li class="list-group-item">Place: ${tarjeta.place}</li>
    <li class="list-group-item">Capacity: ${tarjeta.capacity}</li>
    <li class="list-group-item">Estimate: 900</li>
    <li class="list-group-item">Price: $${tarjeta.price}</li>
  </ul>`
}
//primera tabla mayor
export function maxAsistencia(eventos){
  let porcentajeMayor = 1;
  let eventoMayor;
  eventos.forEach(evento =>{
    let calculo = (evento.assistance*100)/evento.capacity
    if(calculo > porcentajeMayor){
      porcentajeMayor = calculo;
      eventoMayor = evento;
    }
  });
  return `${eventoMayor.name} ${porcentajeMayor.toFixed(1)}%`;
}
//primera tabla menor
export function minAsistencia(eventos){
  let porcentajeMenor = 9999;
  let eventoMenor;
  eventos.forEach(evento =>{
    let calculo = (evento.assistance*100)/evento.capacity
    if(calculo < porcentajeMenor){
      porcentajeMenor = calculo;
      eventoMenor = evento;
    }
  });
  return `${eventoMenor.name} ${porcentajeMenor.toFixed(1)}%`;
}

//primera mayor capacidad
export function maxCapacidad (eventos){
  let capacidadMayor = 1;
  let eventoCapacidad;
  eventos.forEach(evento =>{
    let calculo = (evento.capacity)
    if(calculo > capacidadMayor){
      capacidadMayor = calculo;
      eventoCapacidad = evento;
    }
  });
  return `${eventoCapacidad.name} ${capacidadMayor}`;
}

//segunda tabla
export function segundaTabla(categorias, eventos){
  let tabla =
  `<tr>
          <td>Categories</td>
          <td>Revenues</td>
          <td>Percentage of assistance</td>
      </tr>`;
  categorias.forEach(categoria => {
      let eventoPorCat = eventos.filter(evento => evento.category == categoria)
      let ganancia = 0;
      let porcentaje = 0;
      eventoPorCat.forEach(e => {
              ganancia += (e.estimate * e.price)
              porcentaje += (e.estimate * 100 / e.capacity)/(eventoPorCat.length)
      })
      tabla += 
      `<tr>
          <td class="text-bg-success">${categoria}</td>
          <td class="text-bg-success">$${ganancia.toLocaleString()}</td>
          <td class="text-bg-success">${porcentaje.toFixed(2)}%</td>
      </tr>`
  });
  return tabla;
}

//segunda tabla
export function tercerTabla(categorias, eventos){
  let tabla =
  `<tr>
          <td>Categories</td>
          <td>Revenues</td>
          <td>Percentage of assistance</td>
      </tr>`;
      categorias.forEach(categoria => {
      let eventoPorasis = eventos.filter(evento => evento.category == categoria)
      let ganancia = 0;
      let porcentaje = 0;
      eventoPorasis.forEach(e => {
              ganancia += (e.assistance * e.price)
              porcentaje += (e.assistance * 100 / e.capacity)/(eventoPorasis.length)
      })
      tabla += 
      `<tr>
          <td class="text-bg-success">${categoria}</td>
          <td class="text-bg-success">$${ganancia.toLocaleString()}</td>
          <td class="text-bg-success">${porcentaje.toFixed(2)}%</td>
      </tr>`
  });
  return tabla;
}