function ProfileCard({title, handle, logo, description, id}) {
    return(
        <div key={id} className="card">
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
          </div>
        </div>
      </div>
    )
}

export default ProfileCard;