import { useState } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import axios from 'axios'

function App() {

  // State pour le départ
  const [departInputValue, setDepartInputValue] = useState('')
  const [departSuggestion, setDepartSuggestion] = useState([])
  const [departValue, setDepartValue] = useState('')


  const [isFocused, setIsFocused] = useState('')
  const [popularArrivee, setPopularArrivee] = useState([])

  // State pour l'arrivée
  const [arriveeInputValue, setArriveeInputValue] = useState('')
  const [arriveeSuggestion, setArriveeSuggestion] = useState([])
  const [arriveeValue, setArriveeValue] = useState('')

  // Listener de modifications de l'input depart
  const handleDepartValue = (e) => {
    const value = e.target.value;
    setDepartInputValue(value)
    setDepartValue('')
    setPopularArrivee('')
    if (e.target.value.length >= 2) {
      getDepartSuggestion(value)
    }
  }
  // Listener de modifications de l'input arrivée
  const handleArriveeValue = (e) => {
    const value = e.target.value;
    setArriveeInputValue(value)
    setArriveeValue('')
    if (e.target.value.length >= 2) {
      getArriveeSuggestion(value)
    }
  }
  // Récupérer les destinations populaires depuis la ville de départ
  const getPopularCitiesFrom = (startCity) => {
    axios.get(`https://api.comparatrip.eu/cities/popular/from/${startCity}/5`)
      .then((res) => { setPopularArrivee(res.data) })
  }
  // Récupérer les autocomplétions pour le départ
  const getDepartSuggestion = (value) => {
    axios.get(`https://api.comparatrip.eu/cities/autocomplete/?q=${value}`)
      .then((res) => setDepartSuggestion(res.data))
  }
  // Récupérer les autocomplétions pour l'arrivée
  const getArriveeSuggestion = (value) => {
    axios.get(`https://api.comparatrip.eu/cities/autocomplete/?q=${value}`)
      .then((res) => setArriveeSuggestion(res.data))
  }
  // Sélectionner une ville de départ et récupérer les destinations populaires
  const selectDepart = (suggestion) => {
    setDepartInputValue(suggestion.local_name)
    setDepartValue(suggestion.unique_name)
    getPopularCitiesFrom(suggestion.unique_name)
  }
  // Sélectionner une arrivée
  const selectArrivee = (suggestion) => {
    setArriveeInputValue(suggestion.local_name)
    setArriveeValue(suggestion.unique_name)
  }
  // Inverser les valeurs onClick sur la flèche
  const invertDepartArrivee = () => {
    setDepartValue(arriveeValue)
    setArriveeValue(departValue)

    setDepartInputValue(arriveeInputValue)
    setArriveeInputValue(departInputValue)
  }

  return (
    <div className="App">
      <div className='container-search'>
        <div className='content-search'>
          <img src={logo} alt="logo tictactrip" className='logo' />

          <div className='container-input'>

            <div className='flex-container-column'>

              <div className="container-input-item">
                <div className='content-input-item depart'>
                  <p>Départ : </p>
                  <input type="text" placeholder="D'où partons-nous ?" onChange={handleDepartValue} value={departInputValue} onFocus={() => setIsFocused('depart')} />
                </div>
              </div>

              <hr className='split' />

              <div className='container-input-item '>
                <div className='content-input-item arrivee'>
                  <p>Arrivée : </p>
                  <input type="text" placeholder="Où allons-nous ?" onChange={handleArriveeValue} value={arriveeInputValue} onFocus={() => setIsFocused('arrivee')} />
                </div>

              </div>

              <div className='switch' onClick={invertDepartArrivee}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="arrow-switch"><path d="M18.4609 16.8848C18.461 16.9504 18.4481 17.0155 18.423 17.0762C18.3978 17.1368 18.361 17.192 18.3146 17.2384C18.2681 17.2848 18.213 17.3217 18.1523 17.3468C18.0916 17.3719 18.0266 17.3848 17.9609 17.3848H6.89209L10.6538 21.1465C10.701 21.1927 10.7386 21.2479 10.7643 21.3087C10.7901 21.3696 10.8035 21.4349 10.8038 21.501C10.8042 21.5671 10.7914 21.6326 10.7663 21.6937C10.7411 21.7548 10.7041 21.8103 10.6574 21.8571C10.6107 21.9038 10.5552 21.9408 10.494 21.9659C10.4329 21.9911 10.3674 22.0038 10.3014 22.0035C10.2353 22.0032 10.1699 21.9897 10.1091 21.964C10.0482 21.9382 9.99306 21.9007 9.94681 21.8535L5.936 17.8428C5.68226 17.5885 5.53976 17.244 5.53976 16.8848C5.53976 16.5256 5.68226 16.181 5.936 15.9268L9.94678 11.916C10.0409 11.8238 10.1675 11.7725 10.2992 11.7731C10.431 11.7738 10.5571 11.8264 10.6502 11.9196C10.7434 12.0127 10.796 12.1388 10.7967 12.2705C10.7973 12.4023 10.746 12.5289 10.6538 12.623L6.89209 16.3848H17.9609C18.0266 16.3847 18.0916 16.3976 18.1523 16.4228C18.213 16.4479 18.2681 16.4847 18.3146 16.5311C18.361 16.5776 18.3978 16.6327 18.423 16.6934C18.4481 16.7541 18.461 16.8191 18.4609 16.8848ZM6.03906 7.61572H17.1084L13.3462 11.3774C13.299 11.4237 13.2614 11.4788 13.2357 11.5397C13.2099 11.6006 13.1965 11.6659 13.1962 11.732C13.1958 11.7981 13.2086 11.8636 13.2337 11.9247C13.2589 11.9858 13.2959 12.0413 13.3426 12.088C13.3893 12.1348 13.4449 12.1718 13.506 12.1969C13.5671 12.222 13.6326 12.2348 13.6986 12.2345C13.7647 12.2341 13.8301 12.2207 13.8909 12.1949C13.9518 12.1692 14.0069 12.1316 14.0532 12.0844L18.0649 8.0737C18.3183 7.8192 18.4604 7.4747 18.4604 7.1156C18.4603 6.7565 18.3179 6.41207 18.0644 6.1577L14.0532 2.14648C13.9591 2.05429 13.8325 2.00294 13.7008 2.00361C13.569 2.00427 13.4429 2.05689 13.3498 2.15003C13.2566 2.24317 13.204 2.36931 13.2033 2.50103C13.2027 2.63274 13.254 2.7594 13.3462 2.85348L17.1079 6.61568H6.03906C5.90645 6.61568 5.77928 6.66836 5.68551 6.76213C5.59174 6.85589 5.53906 6.98307 5.53906 7.11568C5.53906 7.24829 5.59174 7.37547 5.68551 7.46923C5.77928 7.563 5.90645 7.61568 6.03906 7.61568V7.61572Z"></path></svg>
              </div>


            </div>


            <div className="container-suggestions">
              {
                popularArrivee !== [] && arriveeInputValue.length < 2 && departValue !== "" && isFocused === 'arrivee' ? popularArrivee.map((suggestion) => {
                  return (<li key={suggestion.city_id} onClick={() => selectArrivee(suggestion)}> {suggestion.local_name}</li>)
                }) :
                  arriveeInputValue.length >= 2 && isFocused === 'arrivee' ? (
                    arriveeValue === "" ? arriveeSuggestion.map((suggestion) => {
                      return (<li key={suggestion.city_id} onClick={() => selectArrivee(suggestion)}> {suggestion.local_name}</li>)
                    }) : ""

                  ) : ""
              }
              {
                departInputValue.length >= 2 && isFocused === "depart" ? (
                  departValue === "" ? departSuggestion.map((suggestion) => {
                    return (<li key={suggestion.city_id} onClick={() => selectDepart(suggestion)}> {suggestion.local_name}</li>)
                  }) : ""

                ) : ""
              }
            </div>

          </div>

        </div>

      </div>
      <div className='batman'>
      </div>
    </div >
  );
}

export default App;
