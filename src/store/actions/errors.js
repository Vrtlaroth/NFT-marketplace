export const handleError = (err) => {
	let error = {
		message: null,
		severity: null,
	};

	console.log(err);
	return { type: "ERROR_MESSAGE", message: error };
};

export const handleNewNetworkError = (err) => {
	let error = {
		message: err.message,
		severity: "error",
	};
	return error;
};

export const connectError = (err) => {
	let error = {
		message: err.message,
		severity: "error",
	};
	return error;
};

export const getGhostsError = (err) => {
	let error = {
		message: err.message,
		severity: "error",
	};
	return error;
};

export const listGhostError = (err) => {
	let error = {
		message: err.message,
		severity: "error",
	};
	return error;
};

export const editListingError = (err) => {
	let error = {
		message: err.message,
		severity: "error",
	};
	return error;
};

export const cancelListingError = (err) => {
	let error = {
		message: err.message,
		severity: "error",
	};
	return error;
};

export const purchaseGhostError = (err) => {
	let error = {
		message: err.message,
		severity: "error",
	};
	return error;
};

export const getMarketplaceItemsError = (err) => {
	let error = {
		message: err.message,
		severity: "error",
	};
	return error;
};

export const purchaseError = (err) => {
	let error = {
		message: err.message,
		severity: "error",
	};
	return error;
};
