import './HomeBanner.css'

const HomeBanner = () => {
  return (
    <div className='home-banner'>
        <div className="banner-container">
            <div className="banner-title">
                <span className='title-sm'>React & Node</span>
                <span className='title-b'>Blog</span>
            </div>

            <img src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className='banner-img'/>
        </div>
    </div>
  )
}

export default HomeBanner