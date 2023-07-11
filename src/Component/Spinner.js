import React, { Component } from 'react'
import SpinnerImg from './Fading lines.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={SpinnerImg} alt=''/>
      </div>
    )
  }
}
