import * as React from "react";
import "./Pagination.scss";
import store from "../../store/index";
import { pagination } from "../../store/actions/ethers";

export default function Pagination(props) {
	const [route, setRoute] = React.useState(props.route);
	const [perPage, setPerPage] = React.useState(12);
	const [totalPages, setTotalPages] = React.useState(0);
	const [currentPage, setCurrentPage] = React.useState(1);

	React.useEffect(() => {
		store.subscribe(() => {
			let paginate = store.getState().ethers.paginate;
			setPerPage(paginate.perPage);
			setTotalPages(paginate.totalPages);
			setCurrentPage(paginate.currentPage);
		});
	}, [props, perPage]);

	const switchPage = (page, e) => {
		if (!(page > totalPages && page > 0) || page === currentPage) {
			if (currentPage > 0) {
				window.scrollTo(0, 0);
				const paginationOptions = {
					page: page,
					route: route,
				};
				store.dispatch(pagination(paginationOptions));
			}
		}
	};

	return (
		<div className="pagination">
			<span className="pagination-action" onClick={switchPage.bind(this, 1)}>
				{" "}
				first{" "}
			</span>
			<span
				className="pagination-action"
				onClick={switchPage.bind(this, currentPage - 1)}
			>
				{" "}
				prev{" "}
			</span>
			<span className="pagination-page">
				| page {currentPage} of {totalPages} |
			</span>
			<span
				className="pagination-action"
				onClick={switchPage.bind(this, currentPage + 1)}
			>
				{" "}
				next{" "}
			</span>
			<span
				className="pagination-action"
				onClick={switchPage.bind(this, totalPages)}
			>
				{" "}
				last{" "}
			</span>
		</div>
	);
}
