import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'
import api from '../../services/api'

import {HiUser} from 'react-icons/hi'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function GetUsers() {
    let [users, setUsers] = useState([])

    let query = useQuery();

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()
    const filter = query.get("query")

    useEffect(() => {
        const getUsers = async () => {
          try {
            const {data} = await api.get(`users?username=${filter}`, {headers})
            const {users} = data
            setUsers(users)
          } catch(err) {
            console.log(err.response)
            alert(err.response.data[0].name)
          }
        }
    
        getUsers()
      }, [filter])

    return (
        <>
        <NavBar />
            <main>
                <Container>
                    <SearchBar />
                    <Aside />
                    <div className="content">
                        <div className='content__title__wrapper'> 
                          <h2 className="content__title">Resultados para: {filter}</h2>
                        </div>
                        <div className={users.length !== 0 ? "users__container" : "users__container any__user"}>
                            {
                              users.length > 0 ?
                                users.map((user, index)  => {
                                    return (
                                        <Link className='user__item'>
                                            <img src={`https://hakuna-1337.s3.amazonaws.com/${user.profilePic}`} className='user__img'/>
                                            <span className='user__name'>{user.username}</span>
                                            <span className='user__points'>{user.contributionPoints} pontos</span>
                                        </Link>
                                    )
                                }) : (
                                    <>
                                        <HiUser className="any__user__icon"/>
                                        <span>{`Nenhum usuário com o nome de "${filter}" foi encontrado`}</span>
                                    </>
                                ) 
                            }
                        </div>
                    </div>
                </Container >  
            </main>
        </>
    )
}
