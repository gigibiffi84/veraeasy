function ProfileCard({title, handle, logo, description}) {
    return(
        <div className="card">
        <div className="card-image">
          <figure className="image is-1by1">
            <img src={logo} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
              <div className="media-content">
              <p className="title is-4">{title}</p>
              <p className="subtitle is-6">{handle}</p>
            </div>
          </div>

          <div className="content">
            {description} <a>@bulmaio</a>.
            <a href="#">#css</a> <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div>
    )
}

export default ProfileCard;