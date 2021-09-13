import { useEffect, useState, Fragment } from 'react'
import styles from './styles.module.scss'

import SharedLayout from '../../../components/SharedLayout'
import DateSpan from '../../../components/DateSpan'
import EditableTextInput from '../../../components/EditableTextInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuid } from 'uuid';

const url = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon'

function sortAlfabetically(dragonsList) {
  return dragonsList.sort((a, b) => a.name > b.name ? 1 : -1)
}

export default function DragonsIndex() {
  let [dragons, setDragons] = useState([])
  let [deletedDragonId, setDeletedDragonId] = useState(-1)

  function loadDragons() {
    fetch(url)
      .then(async response => {
        setDragons(sortAlfabetically(await response.json()))
      })
      .catch(console.error)

  }

  function updateField(value, dragon, field) {
    return dragon.created ? updateLocal(value, dragon.id, field) : updateRemote(value, dragon.id, field)
  }

  async function updateRemote(value, id, field) {
    let body = {}
    body[field] = value
    try {
    const response = await fetch(`${url}/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(body)
    })

    const updatedDragon = await response.json()

    setDragons(dragons.map(dragon => dragon.id === id ? updatedDragon : dragon))

    return true
    } catch(e) {
      console.error(e)
      return false
    }
  }

  async function updateLocal(value, id, field) {
    let body = {}
    body[field] = value

    const updatedDragons = dragons.map(dragon => dragon.id === id ? { ...dragon, ...body } : dragon)

    setDragons(updatedDragons)

    const dragon = updatedDragons.find(dragon => dragon.id === id )

    if(dragon.name && dragon.name !== '' && dragon.type && dragon.type !== '') {
      createDragon(dragon)
    }

    return true
  }

  async function deleteDragon(deletedDragon) {
    if(window.confirm(`Tem certeza que deseja deletar o grande ${deletedDragon.name}`)) {
      const response = await fetch(`${url}/${deletedDragon.id}`, {
          method: 'delete',
          headers: { 'Content-Type': 'application/json'   }
        })

        if(response.ok) {
        setDeletedDragonId(deletedDragon.id)
        setTimeout(function() {
          setDragons(dragons.filter(dragon => dragon.id !== deletedDragon.id))
          setDeletedDragonId(-1)
        }, 300)
      }
    }
  }

  function addEmptyDragon() {
    setDragons([{ id: uuid(), created: true, createdAt: new Date(), name: '', type: '' }, ...dragons])
  }

  async function createDragon({ id, createdAt, name, type }) {
    const response = await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ createdAt, name, type })
    })

    if(response.ok) {
      const newDragon = await response.json()

      setDragons(sortAlfabetically(dragons.map(dragon => dragon.id === id ? newDragon : dragon)))
    }
  }

  useEffect(loadDragons, [])

  return (
    <SharedLayout>
      <div className={styles.dragonsIndex}>
        <button className={styles.newDragonButton} onClick={addEmptyDragon}>Incluir Dragão</button>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Data de criação</th>
              <th>Nome</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {dragons.map(dragon => (
              <Fragment key={dragon.id}>
                <tr className={dragon.id === deletedDragonId ? styles.removingFromList : ''}>
                  <td>
                    {dragon.created
                      ? (
                          <div className={styles.rightButton} onClick={() => createDragon(dragon)}>
                            <FontAwesomeIcon icon={faSave} color="gray"/>
                          </div>
                        )
                      : (
                          <div className={styles.rightButton} onClick={() => deleteDragon(dragon)}>
                            <FontAwesomeIcon icon={faTrash} color="gray"/>
                          </div>
                        )
                    }
                  </td>
                  <td><DateSpan date={new Date(dragon.createdAt)}/></td>
                  <td>
                    <EditableTextInput
                      value={dragon.name}
                      onUpdate={value => updateField(value, dragon, 'name')}
                      editMode={!!dragon.created}
                    />
                  </td>
                  <td>
                    <EditableTextInput
                      value={dragon.type}
                      onUpdate={value => updateField(value, dragon, 'type')}
                      editMode={!!dragon.created}
                    />
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </SharedLayout>
  )
}
