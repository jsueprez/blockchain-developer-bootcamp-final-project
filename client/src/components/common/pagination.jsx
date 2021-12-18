import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChanged }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;

    let classes = 'page-item';


    const pages = _.range(1, pagesCount + 1);
    return (

        <nav >
            <ul className="pagination">
                {pages.map(page => (
                    < li
                        key={page}
                        className={page === currentPage ? classes + ' active' :
                            classes}>
                        <button style={{ cursor: 'pointer' }} className="page-link" onClick={() => onPageChanged(page)}>{page}</button>
                    </li>
                ))}

            </ul>
        </nav >);;
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired
}
export default Pagination;