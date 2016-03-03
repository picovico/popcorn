import React, { PropTypes, Component } from 'react'


class Pagination extends Component {

  paginate(url){
    const {actions} = this.props
    console.log(url)
    console.log(this.props)
    console.log("paginated")
    actions.paginate_video(url)
  }

  render() {
    const {paging} = this.props
    return (
        <div>
          <ul className={"pager"}>
            <li><a onClick={this.paginate.bind(this, paging.prev_url)}>Previous</a></li>
            <li><a onClick={this.paginate.bind(this, paging.next_url)}>Next</a></li>
            </ul>
        </div>
      )
  }
}

export default Pagination