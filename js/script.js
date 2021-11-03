let list = document.querySelector('.list')
let numberPage = document.querySelector('.number-page')
let numberLastPage = document.querySelector('.number-last-page')
let listItem = document.querySelectorAll('.item')

const html = {
	get(element){return document.querySelector(element)}
}


let parPage = 4

const state = {
	page: 1,
	totalPage: Math.ceil(listItem.length / parPage),
}

const controls = {
	next() {
		state.page++

		if(state.page > state.totalPage){
			state.page--
		}

		render()
	},

	prev() {
		state.page--

		if(state.page < 1 ){
			state.page++
		}
		render()
	},

	goTo(page) {
		if(page == 1){
			state.page = 1
		} else {
			state.page = state.totalPage
		}
		render()
	},

	createEvent(){
		html.get('.btn-first').onclick = ()=>{controls.goTo(1)}

		html.get('.btn-last').onclick = ()=>{controls.goTo(undefined)}

		html.get('.btn-prev').onclick = ()=>{controls.prev()}

		html.get('.btn-next').onclick = ()=>{controls.next()}
	}
}


function listResult(){
	let listConvert = []

	listItem.forEach(element=>{
		listConvert.push(element)
	})

	list.innerHTML=""
	return listConvert;
}

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

render()
controls.createEvent()