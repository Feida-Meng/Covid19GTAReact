
const getMonthShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const getDateString = date => {

	const dateObj = date ? new Date(date) : new Date();

	return `${dateObj.getFullYear()} ${getMonthShort[dateObj.getMonth()]}, ${dateObj.getDate()}`;
};







