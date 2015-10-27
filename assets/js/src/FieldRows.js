var r = {};

r.label = function(config) {
	// label row
	return m("div", [
		m("label", "Field Label"),
		m("input.widefat", {
			type: "text",
			value: config.label(),
			onchange: m.withAttr('value', config.label)
		} )
	]);
};

r.defaultValue = function(config) {
	return m("div", [
		m("label", "Default Value"),
		m("input.widefat", {
			type: "text",
			value: config.value(),
			oninput: m.withAttr('value', config.value)
		} )
	]);
};


r.isRequired = function(config) {
	return m('div', [
		m('label.cb-wrap', [
			m('input', {
				type: 'checkbox',
				checked: config.required(),
				onchange: m.withAttr( 'checked', config.required )
			}),
			"Is this field required?"
		])
	]);
};

r.usePlaceholder = function(config) {

	if( config.value().length > 0 ) {
		return m("div", [
			m("label.cb-wrap", [
				m("input", {
					type    : 'checkbox',
					checked : config.placeholder(),
					onchange: m.withAttr('checked', config.placeholder)
				}),
				"Use \"" + config.value() + "\" as placeholder for the field."
			])
		]);
	}
};

r.useParagraphs = function(config) {
	return m('div', [
		m('label.cb-wrap', [
			m('input', {
				type: 'checkbox',
				checked: config.wrap(),
				onchange: m.withAttr( 'checked', config.wrap )
			}),
			"Wrap in paragraph tags?"
		])
	]);
};

r.choiceType = function(config) {
	return m('div', [
		m('label', "Choice Type"),
		m('select', {
			value: config.type(),
			onchange: m.withAttr('value', config.type )
		}, [
			m('option', {
				value: 'select',
				selected: config.type() === 'select' ? 'selected' : false
			}, 'Dropdown'),
			m('option', {
				value: 'radio',
				selected: config.type() === 'radio' ? 'selected' : false
			}, 'Radio Button'),
			m('option', {
				value: 'checkbox',
				selected: config.type() === 'checkbox' ? 'selected' : false
			}, 'Checkboxes')
		])
	]);
};

r.choices = function(config) {


	return m('div',[
		m('label', "Choices"),
		m( 'div.limit-height', [
			m( "table", [

				// table body
				config.choices().map(function(choice, index) {
					return m('tr', {
						'data-id': index
					}, [
						m( 'td.cb', m('input', {
								name: 'selected',
								type: (config.type() === 'checkbox' ) ? 'checkbox' : 'radio',
								onchange: m.withAttr('checked', choice.selected)
							})
						),
						m('td.stretch', m('input.widefat', {
							type: 'text',
							value: choice.label(),
							onchange: m.withAttr('value', choice.label)
						}) ),
						m('td', m('span', {
							class: 'dashicons dashicons-no-alt hover-activated',
							onclick: function(key) { this.choices().splice(key, 1); }.bind(config, index)
						}, ''))
					] )
				})
			]) // end of table
		]) // end of limit-height div
	]);
};

module.exports = r;