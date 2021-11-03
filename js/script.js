let list = document.querySelector('.list') // <= lista de items que serão paginados
let numberPage = document.querySelector('.number-page') // <= numero da página actual
let numberLastPage = document.querySelector('.number-last-page') //<= numero da quantidade de páginas 
let listItem = document.querySelectorAll('.item') // <= lista de itens tratados



let parPage = 4 // <= quantos items por página?

// função para pegar elementos html
const html = {
	
	get(element){return document.querySelector(element)}
}

// inicialize os valores aqui

const state = {
	page: 1, // <= página actual

	totalPage: Math.ceil(listItem.length / parPage), // total de páginas
}

const controls = {
	// função avançar
	next() {
		state.page++

		if(state.page > state.totalPage){
			state.page--
		}

		render()
	},

	// função voltar
	prev() {
		state.page--

		if(state.page < 1 ){
			state.page++
		}
		render()
	},

	// função ir para...(primeiro ou ultimo)
	goTo(page) {
		if(page == 1){
			state.page = 1
		} else {
			state.page = state.totalPage
		}
		render()
	},

	// função de adicionar eventos nos botões
	createEvent(){
		html.get('.btn-first').onclick = ()=>{controls.goTo(1)}

		html.get('.btn-last').onclick = ()=>{controls.goTo(undefined)}

		html.get('.btn-prev').onclick = ()=>{controls.prev()}

		html.get('.btn-next').onclick = ()=>{controls.next()}
	}
}

// função para recuperar e tratar dos items que serão apresentados
function listResult(){
	let listConvert = []

	listItem.forEach(element=>{
		listConvert.push(element)
	})

	list.innerHTML=""
	return listConvert;
}

// função para  apresentar os items tratados na tela
function render(){
	let data = listResult()

	let itemEnd = state.page * parPage
	let itemStart = itemEnd - parPage
	
	let dataRender = data.slice(itemStart,itemEnd)

	dataRender.forEach(element=> {
		list.appendChild(element)
	})

	numberPage.innerHTML=state.page;
	numberLastPage.innerHTML=state.totalPage
}


// função para inicializar a paginação
function init(){
	render()
	controls.createEvent()
}

// inicializando a paginação
init()