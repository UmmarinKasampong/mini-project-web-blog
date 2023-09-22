import './Ownerheader.css'

const Ownerheader = ({OwnerImg , blogOwner}) => {

    const username  = localStorage.getItem('username');
    // const userImg = localStorage.getItem('userImg')

  return (
    <div className='owner-banner'>
    <div className="owner-container">
        <div className="owner-banner-title">
            <img src={OwnerImg} alt="" className='Owner-img' />
            <span className='owner-title-b'>{blogOwner}</span>
        </div>

        <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" className='owner-banner-img'/>
    </div>
</div>
  )
}

export default Ownerheader