import React, { useEffect } from 'react';

const onScroll = ref => {
	// console.log('city list onScroll');

	if (ref.current.scrollTop < 10) {
		ref.current.scrollTop = 10 + ((ref.current.children.length - 1)/3 * 40);
	} else if (ref.current.scrollTop > (ref.current.children.length - 1) * 40 - 10 - ref.current.offsetHeight) {
		ref.current.scrollTop = 10 + ( 2 * (ref.current.children.length - 1)/3 * 40 - ref.current.offsetHeight);
	}
};

const setRef = (hasKey, index, ref, length) => {
	if (hasKey) {
		return ref;
	} else {
		if ((index > (length/3 -1) && index < (2 * length/3))) {
			return ref;
		}
	}
};

export const CityList = React.forwardRef((props, ref) => {

	const cityList = props.searchKey ? props.cityList : [...props.cityList, ...props.cityList, ...props.cityList];
	// console.log('props.cityRefs', this.state.scrolling);

	useEffect(() => {
		if (props.cityRefs?.[cityList?.[0]?.city]?.current) {


			props.scrollToCity?.(cityList[0].city);
		}
	},[]);

	return (

		<dl
			id={'list'}
			ref={ref}
			onScroll={() => props.searchKey ? null : onScroll(ref)}
		>

			{cityList.map( (city, index) =>
				City(
					city,
					index,
					props.mouseHoveredCity,
					props.setMouseHoveredCity,
					setRef(props.searchKey,index,props.cityRefs?.[city.city], cityList.length)
				)
			)}

			<dd className={'city-case spacefiller'}>
				<div className={'cityDiv'}>Whitchurch-Stouffville</div>
				<div>Case</div>
			</dd>
		</dl>

	);
});

const onMouseOver = (e, setMouseHoveredCity, city) => {

	e.preventDefault();
	setMouseHoveredCity(city)
};


const City = (city, index, mouseHoveredCity, setMouseHoveredCity, ref ) => {

	// console.log('index', index, 'City ref', ref);

	return (
		<dd
			key={city.city+index}
			ref={ref}
			className={`city-case ${mouseHoveredCity === city.city ? 'hoveredCity' : 'city'}`}
			onMouseOver={e => onMouseOver(e, setMouseHoveredCity, city.city)}
		>
			<div className={'cityDiv'}>{city.city}</div>
			<div>{city.cases}</div>
		</dd>
	);
};

