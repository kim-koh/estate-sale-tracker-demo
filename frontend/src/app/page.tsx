import Dashboard from './home/page.jsx';
import LoginForm from './login/page.jsx';

// async function validatePin() {
//   const res = await axios.get( INSERT API ENDPT TO VALIDATE DEVICE W/ PIN); 

//   if (!res) {
//       throw new Error("Failed to fetch data");
//   } else {
//       return res.data <-- THIS DATA SHOULD REALLY JUST BE "AUTH'D DEVICE" OR "NOT AUTH'D DEVICE"
//   }
// }

export default function Home() { 
  if (false) { //this device has not yet entered the pin
    return <LoginForm/>
  } if (true) { //user has entered pin and is logged in
    return (
          <main>
            <Dashboard/>
          </main>
    )
  }
  
}
