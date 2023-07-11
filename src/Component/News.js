import React, { Component } from 'react';
import ListNews from './ListNews';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    pageSize: 9,
    country: "us",
    // category : "general"
  }
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }
  Captilized = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
    }
    document.title = `${this.Captilized(this.props.category)} - NEWSIcON`
  }
  async updateNews() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b18705de426843659fbe767f021ee757&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30)
    let parseData = await data.json();
    this.props.setProgress(70)
    console.log(parseData)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }
  async componentDidMount() {
    this.updateNews();
  }
  handlePrevious = async () => {

    this.setState({page: this.state.page - 1})
    this.updateNews();
  }
  handleNext = async () => {
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }


  render() {

    return (

      <div className='container my-4'>
        <h1 className='text-center mb-3 ' style={{marginTop:'80px'}}> NEWSIcON - top {this.Captilized(this.props.category)} headlines</h1>
        {this.state.loading && <Spinner />}
        <div className='row my-4'>
          {/* this.state.loading == !true and it return show the div  */}
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4 mb-3'>
              <ListNews key={element.url} title={element.title} description={element.description} imgUrl={element.urlToImage ? element.urlToImage : "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/IJGYOJ26Z7AV2N3S6OWKIPV5QI_size-normalized.jpg&w=1440"} newsUrl={element.url} time={new Date(element.publishedAt).toGMTString()} author={!element.author ? "Unknown" : element.author} name={element.source.name} />
            </div>
          })
          }
        </div>

        <div className='container d-flex justify-content-between'>
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevious}> &larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
