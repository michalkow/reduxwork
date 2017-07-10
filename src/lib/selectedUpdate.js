export default function selectedUpdate(config, state, items) {
	var update = {};
	if(state.selected && state.selected[config.keyName]) 
		update.selected = _.find(items, (item) => item[config.keyName] == state.selected[config.keyName]);
	return update;
}