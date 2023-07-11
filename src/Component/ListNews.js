import React, { Component } from 'react'

export default class ListNews extends Component {
    render() {
        let {title,description,imgUrl,newsUrl,author,time,name} = this.props;
        return (
            
            <div className="card" >
                <img src={imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                <span className="badge text-bg-danger mb-1">{name}</span>
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author} on {time}</small></p>
                    <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>

        )
    }
}
