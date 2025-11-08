import './global.css'
import Header from "./components/Header/Header.jsx"
import SearchInput from './components/Search/SearchInput.jsx'
import FetchData from './components/FetchData/FetchData.jsx'
import { useWeather } from './hooks/useWeather'


function App() {
   const { city, setCity, data, loading, error } = useWeather()

  return (
    <div className='container'>
      <Header />
      <SearchInput setCity={setCity} />
      <FetchData city={city} data={data} loading={loading} error={error}/>
    </div>
  )
}

export default App
