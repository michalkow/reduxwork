export default function selectedUpdate(state, items) {
	var update = {};
	if(state.selected && state.selected[config.keyName]) 
		update.selected = _.find(action.data, (item) => item[config.keyName] == state.selected[config.keyName]);
	return update;
}