import React from 'react'


import Notice from './Components/Notice/Notice';
import SideBar from './Components/SideBar/SideBar'
import MainPage from './Components/MainPage/MainPage'


function App() {


	return (
		<div className="fuild-containe">
			<Notice/>
			<div className="row m-0">
				<SideBar/>
				<MainPage/>
			</div>
		</div>
	)
}






export default App;
