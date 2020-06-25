document.addEventListener('DOMContentLoaded', ready)

function ready() {
	startTable()
}

function startTable() {
	XMLRequest('users.json').then((data) => {
		$('#table-users').DataTable({
			data : data,
			columns : [
				{data: 'id'},
				{data : 'first name'},
				{data : 'last name'},
				{data : 'address'},
				{data : 'date of birth'},
				{data : 'age'},
				{data : 'printed'},
			],
			'rowCallback': function( row, data ) {
				if(data['printed'] == '1') {
					row.classList.add('printed-done')
				}
			},
			columnDefs: [
				{
					targets: 0,
					width: '10%',
				},
	            {
	                targets: [3],
	                visible: false,
	                searchable: false
	            },
	            {
	                targets: [4],
	                visible: false,
	                searchable: false
	            },
	            {
	                targets: [5],
	                visible: false,
	            	searchable: false
	            },
	            {
	                targets: [6],
	                visible: false,
	                searchable: false
	            }
        	]
		})		
	
		writeToList(data)
		printId()
	})

}

function writeToList(data) {
	const users = []
	const tableUsers = document.getElementById('table-users')
		.getElementsByTagName('tbody')[0]

	tableUsers.addEventListener('click', function(event) {
		const id = event.target.closest('tr')
			.getElementsByTagName('td')[0]
			.textContent

		if(! users.some((user) => user.id == id)) {
			const user = data.find(value => value.id == id)
			users.push(user)
		}

		console.log(users)
	})

}

function printId() {
	const btnPrint = document.getElementById('btn-print')
	btnPrint.addEventListener('click', function() {
		console.log('nice')
	})
}

function XMLRequest(url) {
	return new Promise(function(resolve, reject) {
		const xhr = new XMLHttpRequest()

		xhr.onload = function() {
			if(this.readyState == 4 && this.status == 200){
				const response = JSON.parse(this.responseText)
				resolve(response)
			}
		}

		xhr.onerror = function() {
			reject(new Error('Network Error'))
		}

		xhr.open('GET', url, true)
		xhr.send()
	})	
}

