import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { HiLogout, HiUsers } from "react-icons/hi"
import { BsFillCameraVideoFill, BsFillGearFill, BsThreeDots } from "react-icons/bs";
import { AiFillDislike, AiFillLike, AiOutlineLike, AiOutlineDislike, AiFillDelete } from "react-icons/ai";
import { MdEdit, MdDownload } from "react-icons/md";
import {FaBook, FaCommentAlt, FaRegCommentAlt} from 'react-icons/fa'
import { CgFeed } from "react-icons/cg";

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'
import FileButton from '../../components/FileDownloadButton';
import setFileButtonProperties from '../../utils/setFileButtonProperties';

const getFileTypeIcon = (filename) => {
    const [, ext] = filename.split('.')
    const {icon} = setFileButtonProperties(ext)
    return icon
}

export default function Files() {
    
    return (
        <>
        <NavBar />
            <main>
                <Container>
                <SearchBar />
                <Aside />
                <div className="content">
                    <h2 className="content__title">Materiais</h2>
                    <div className='files__container'>
                        <table className='files__table'>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th>Data de criação</th>
                                <th>Ações</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Maria Anders</td>
                                <td>{getFileTypeIcon('batata.pdf')}</td>
                                <td>18/11/1997</td>
                                <td><button className='download__file__btn'><MdDownload className='download__file__icon'/>download</button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Maria Anders</td>
                                <td>{getFileTypeIcon('batata.docx')}</td>
                                <td>18/11/1997</td>
                                <td><button className='download__file__btn'><MdDownload className='download__file__icon'/>download</button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Maria Anders</td>
                                <td>{getFileTypeIcon('batata.png')}</td>
                                <td>18/11/1997</td>
                                <td><button className='download__file__btn'><MdDownload className='download__file__icon'/>download</button></td>
                            </tr>
                        </table>
                    </div>
                </div>
                </Container >  
            </main>
        </>
    )
}
