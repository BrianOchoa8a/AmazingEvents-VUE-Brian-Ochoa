const {createApp} = Vue;


createApp({
    //crear propiedades reactivas
    data(){
        return{
            eventos:[],
            checkboxs:[],
            inputSearchValue: "",
            filtros:[],
            checkOn: []
        };
    },

    //es parte de el ciclo de vida de la app de vue y es un book
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(({events, currentDate}) => {
            this.eventos = events.filter(tarjeta => tarjeta.date <= currentDate);
            this.checkboxs= [...new Set(events.map(event => event.category))];
            this.filtros = this.eventos;
        })
        .catch(err => console.log(err));
    },

    //Donde declaro funciones
    methods:{
        filtroSearch(eventos,inputSearchValue){
            return eventos.filter(evento => evento.name.toLowerCase().includes(inputSearchValue.toLowerCase()))
        },
        filtrosCheck(eventos, checkOn){
            if(checkOn.length == 0){
                return eventos;
            }
        return eventos.filter(evento => checkOn.includes(evento.category));
        },
        filtroCruzado(){
            const filtradoSearch = this.filtroSearch(this.eventos, this.inputSearchValue);
            const filtradoPorCheck = this.filtrosCheck(filtradoSearch, this.checkOn)
            this.filtros = filtradoPorCheck;
        }
    } 
}).mount('#app')