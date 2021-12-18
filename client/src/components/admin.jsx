import React, { Component } from 'react';
import Table from './common/table'
import ListGroup from './common/listGroup'
import Pagination from './common/pagination'
import { paginate } from '../utils/paginate'
import { Link } from 'react-router-dom';

class Admin extends Component {
  state = {
    pageSize: 8,
    currentPage: 1,
    selectedTokenState: { _id: '5', name: 'Any State' }
  }

  getLabel(state) {
    if (state === '0') return 'List in Marketplace'
    if (state === '2') return 'Mark as shipped'
    return null;
  }

  columns = [
    { path: 'id', label: 'Token Id' },
    { path: 'state', label: 'State' },
    { path: 'price', label: 'Price' },
    {
      key: 'changeNftState', content: nft =>
        this.getLabel(nft.state) &&
        <button className="btn btn-danger"
          onClick={() => this.props.onChangeNftState(nft.id, nft.price, nft.state)}>
          {this.getLabel(nft.state)}
        </button>
    }
  ]

  states = [
    { _id: '5', name: 'Any State' },
    { _id: '0', name: 'NotListed' },
    { _id: '1', name: 'ForSale' },
    { _id: '2', name: 'Locked' },
    { _id: '3', name: 'Shipped' },
    { _id: '4', name: 'Unlocked' }
  ]

  handleTokenStateSelect = tokenState => {
    this.setState({ selectedTokenState: tokenState, currentPage: 1 });
  }

  handlePageChanged = pageNumber => {
    this.setState({ currentPage: pageNumber });
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedTokenState
    } = this.state;

    const filtered = selectedTokenState && selectedTokenState._id !== '5'
      ? this.props.data.filter(m => m.state === selectedTokenState._id)
      : this.props.data;

    const data = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data }
  }

  render() {
    const {
      pageSize,
      currentPage,
      selectedTokenState
    } = this.state;

    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <ListGroup
                items={this.states}
                onItemSelect={this.handleTokenStateSelect}
                selectedItem={selectedTokenState}
              ></ListGroup>
            </div>
            <div className="col-8">
              <p> There are {totalCount} tokens {selectedTokenState._id === '5' ? 'minted' : selectedTokenState.name}...
              </p>
              <Table
                data={data}
                columns={this.columns}
              ></Table>

              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                onPageChanged={this.handlePageChanged}
                currentPage={currentPage}>
              </Pagination>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;