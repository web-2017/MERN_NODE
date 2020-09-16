import React from 'react'
import Sidebar from './Sidebar'
import SidebarMenu from './SidebarMenu'

export default function MainContainer(props) {
  return (
    <div className='container-fluid mt-3'>
      <div className='row'>
        <Sidebar>
          <SidebarMenu />
        </Sidebar>
        <div className='col-md-9'>{props.children}</div>
      </div>
    </div>
  )
}
