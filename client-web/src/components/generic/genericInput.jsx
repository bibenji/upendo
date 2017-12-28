import React from 'react';

export default class GenericInput extends React.Component {
  
  capitalize(value) {
	  return value.charAt(0).toUpperCase() + value.slice(1);
  }
  
  render() {
	let id = '';
	let label = '';
	let placeholder = '';
	let input;
		
	if (this.props.name) {
		id = this.props.name;
		label = this.capitalize(this.props.name);
		
		placeholder = this.props.name;
	} else {
		id = this.props.id;
		label = this.props.label;
		placeholder = this.props.placeholder;
	}
	
	if (this.props.type && this.props.type === 'select' && this.props.options) {
		return (
			<div className="form-group row">
				<label htmlFor={id} className="col-sm-2 col-form-label">{label}</label>
				<div className="col-sm-10">
					<select id={id} className="form-control" value={this.props.value} onChange={this.props.onChange}>
						{this.props.options.map((element, index) => {
							let value = '';
							let displayValue = '';
							
							if (typeof element === 'string') {
								value = displayValue = element;
							} else {
								value = element.value;
								displayValue = element.displayValue;
							}
							
							return (
								<option key={index} value={value}>{this.capitalize(displayValue)}</option>
							);							
						})}
					</select>
				</div>
			</div>
		);
	}
	
    return (
		<div className="form-group row">
		
			<label htmlFor={id} className="col-sm-2 col-form-label">{label}</label>
			
			<div className="col-sm-10">
				<input
					type="text"
					className="form-control"
					id={id}
					placeholder={placeholder ? this.props.placeholder : ''}
					value={this.props.value ? this.props.value : ''}
					onChange={this.props.onChange}
				/>
			</div>
			
		</div>
	);
  }
}
