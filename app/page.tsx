import {Link} from './components/Polyfills';
import { Routes } from './config/routes';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Viora</h1>
      <Link to={{screen: Routes.Login}}>Get started</Link>
    </div>
  )
}
