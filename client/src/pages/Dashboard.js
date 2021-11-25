import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
	const history = useNavigate()
	const [myArray, setMyArray] = useState([]);
	const [value,setValue] = useState([]);
	const [quote, setQuote] = useState('')
	const [tempQuote, setTempQuote] = useState('')
	
	async function populateQuote() {
		const req = await fetch('http://localhost:1337/api/quote', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			
			setQuote(data.quote)
			setMyArray(data.quote);
			
			var val='';
			myArray.map((data)=>val+=(data+'\n'));
			setValue(val)
			console.log(val)
		} else {
			alert(data.error)
		}
	}
	useEffect(() => {

		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/login')
			} else {
				populateQuote()
			}
		}
	}, [])

	async function updateQuote(event) {
		event.preventDefault()

		const req = await fetch('http://localhost:1337/api/quote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				quote: myArray,
			}),
		})
		
		const data = await req.json()
		if (data.status === 'ok') {
			
			setQuote(tempQuote)
			setMyArray(oldArray => [...oldArray, tempQuote]);
			var val='';
			myArray.map((data)=>
			val+= ( (data) + '\n')
			
			);
			console.log(val)
			console.log(myArray)
			setTempQuote('')
			setValue(val)
		} else {
			alert(data.error)
		}
	}
	
	return (
		<div>
			<form onSubmit={updateQuote}>
				<input
					type="text"
					placeholder="Quote"
					value={tempQuote}
					onChange={(e) => setTempQuote(e.target.value)}
				/>
				<input type="submit" value="Update quote" />
			</form>
			<h1>Your quote: </h1>
			<textarea height="1000" width="1000" value={value}></textarea>
		</div>
	)
}

export default Dashboard