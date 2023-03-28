const { createApp } = Vue

const app = createApp({
    data(){
        return {
            urlApi: 'https://hp-api.onrender.com/api/characters',
            personajes: [],
            backupPersonajes: [],
            texto: '',
            casas: [],
            casasSeleccionadas: [],
            favoritos: [],
            cargando: true,
        }
    },
    created(){
        this.manguearDatos()
        this.favoritos = JSON.parse(localStorage.getItem('favs')) || []
    },
    mounted(){

    },
    methods:{
        manguearDatos(){
            fetch(this.urlApi)
                .then(response => response.json())
                .then(datosApi =>{
                    this.personajes = datosApi
                    this.backupPersonajes = this.personajes
                    this.extraerCasas(datosApi)
                    this.cargando = false
                })
        },
        extraerCasas(array){
            array.forEach(elemento => {
                if(!this.casas.includes(elemento.house) && elemento.house){
                    this.casas.push(elemento.house)
                }
            })
        },
        agregarFavorito(personaje){
            if(!this.favoritos.includes(personaje)){
                this.favoritos.push(personaje)
                localStorage.setItem('favs',JSON.stringify(this.favoritos))
            }
        },
        eliminarFavorito(personaje){
            this.favoritos = this.favoritos.filter(personajeF => personajeF.name != personaje.name)
            localStorage.setItem('favs',JSON.stringify(this.favoritos))
        }
        /* filtrarPorTexto(){
            let texto = document.querySelector('input').value
            this.personajes = this.backupPersonajes.filter(personaje => personaje.name.toLowerCase().includes(texto.toLowerCase()))
        } */
    },
    computed:{
        /* filtrarPorTexto(){
            this.personajes = this.backupPersonajes.filter(personaje => personaje.name.toLowerCase().includes(this.texto.toLowerCase()))
        },
        filtrarPorCasa(){
            if(!this.casasSeleccionadas.length){
                this.personajes = this.backupPersonajes
            } else {
                this.personajes = this.backupPersonajes.filter(personaje => this.casasSeleccionadas.includes(personaje.house))
            }
        } */
        filtroDoble(){
            let primerFiltro = this.backupPersonajes.filter(personaje => personaje.name.toLowerCase().includes(this.texto.toLowerCase()))
            if(!this.casasSeleccionadas.length){
                this.personajes = primerFiltro
            } else {
                this.personajes = primerFiltro.filter(personaje => this.casasSeleccionadas.includes(personaje.house))
            }
        }
    }
}).mount('#app')