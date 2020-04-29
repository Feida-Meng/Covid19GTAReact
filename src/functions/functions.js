
const getMonthShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const getDateString = date => {

	const dateObj = date ? new Date(date) : new Date();

	return `${dateObj.getFullYear()} ${getMonthShort[dateObj.getMonth()]}, ${dateObj.getDate()}`;
};


const colors = ['#FFFFFF','#f9c501','#fb9801','#c3723e','#eb3002','#9a0300', '#540002', '#d1d1d1'];


export const getHeatMapColor = (max, num) => {

	let color;
	if (num === 'NA') {
		color = colors[7];
	} else if (num === 0) {
		color = colors[0];
	} else if (num < 100) {
		color = colors[1];
	} else if (num < 200) {
		color = colors[2];
	} else if (num < 300) {
		color = colors[3];
	} else if (num < 500) {
		color = colors[4];
	} else if (num < 1000) {
		color = colors[5];
	} else {
		color = colors[6];
	}


	return color;

};




