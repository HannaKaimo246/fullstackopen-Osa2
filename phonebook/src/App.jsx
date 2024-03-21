import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import personService from './services/persons'
import './index.css'


const Filter = ({handleFilter}) => {
  return (
        <div>
          filter shown with: <input placeholder="Type to seach..." type="text" onChange={handleFilter}/>
        </div>
         )
  }

const PersonName = ({handleChange, newName}) => {
  return (
    <div>
    name: <input placeholder='Name' type="text" value={newName} onChange={handleChange}/>
  </div>
  )
}

const PersonNumber = ({handleChange2, newNumber}) => {
 return (
    <div>
    number: <input placeholder='Number' value={newNumber} onChange={handleChange2} />
   </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(persons)
  const [informationMessage, setInformationMessage] = useState('')
  const [informationMessage2, setInformationMessage2] = useState('')

  

  useEffect(() => {
    personService
    .get()
    .then(response => {
      setPersons(response.data)
    })
  }, [])
    

  const handleChange = (event) => {

    setNewName(event.target.value)

  }

  const handleChange2 = (event) => {

    setNewNumber(event.target.value)

  }


 const handleAdd = () => {

    const maxId = persons.reduce((max, person) => (person.id > max ? person.id : max), 0)
    const id = maxId + 1;
    const newPerson = { id, name: newName, number: newNumber };


    if(persons.some(person => person.name === newName)) {
      setInformationMessage(`Person is already added to the list.`)
      setTimeout(() => {
        setInformationMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    }else{
      personService
      .post(newPerson)
      .then(() => {
        setPersons([...persons, newPerson])
        setFilteredUsers([...persons, newPerson])
        setInformationMessage2(`Person added`);
        setTimeout(() => {
          setInformationMessage2(null);
        }, 5000);
      setNewName('')
      setNewNumber('')
      })
      .catch(error => console.log(error))
       }
       
   }

   const handleFilter = (event) => {

   const value = event.target.value
   const filtered = persons.filter(user => user.name.toLowerCase().startsWith(value))
   setFilteredUsers(filtered)

  }

  const deletePerson = (id) => {

   if(window.confirm(`Do you really want to delete person with this id: ${id} ?`)) {

    personService
    .deleteItem(id)
    .then(() => {
      setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
      setFilteredUsers(prevFilteredUsers => prevFilteredUsers.filter(person =>person.id !== id))
      setInformationMessage2(`Information of person: ${id} is deleted`)
      setTimeout(() => {
        setInformationMessage2(null)
      }, 5000)
      setNewName('')
      setNewNumber('');
    })
    .catch(error => 
      console.log(error))
        
      }
    }

    const Notification = ({ message }) => {
      if (!message) {
        return null
      } 
    
      return (
        <div className="notification">
          {message}
        </div>
      )
     
    }

    const Notification2 = ({ message }) => {
      if (!message) {
        return null
      }
    
      return (
        <div className="notification2">
          {message}
        </div>
      )

    }
  

  useEffect(() => {
    setFilteredUsers(persons)
  }, [persons])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={informationMessage} />
      <Notification2 message={informationMessage2} />
        <Filter handleFilter={handleFilter}/>
      <form>
        <h2>add a new</h2>
        <PersonName handleChange={handleChange} newName={newName}/>
        <PersonNumber handleChange2={handleChange2} newNumber={newNumber}/>
        <div>
          <button type="button" onClick={handleAdd}>Add</button>
        </div>
       <h2>Numbers</h2>
          <ul>
          {filteredUsers.map((person, index) => (
            <li key={person.id}>
              {person.name} {person.number} 
               <button type ="button" onClick={() => deletePerson(person.id)}>delete</button>
            </li>
          ))}
          </ul>
      </form>
    </div>
  )

}

export default App