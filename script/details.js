const {createApp} = Vue;

createApp({
    //crear propiedades reactivas
    data(){
        return{
            eventos:[]
        };
    },
created(){
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(({events}) => {
        let idEvento = new URLSearchParams(location.search).get("parametro");
        this.eventos = events.find(evento => evento._id == idEvento);
    })
    .catch(err => console.log(err))
}
}).mount('#app')