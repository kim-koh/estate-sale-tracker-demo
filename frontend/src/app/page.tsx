import Dashboard from './home/page.jsx';
import LoginForm from './login/page.jsx';

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
